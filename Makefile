OS ?= $(shell go env GOOS)
ARCH ?= $(shell go env GOARCH)

# Absolute path to Makefile location
LOCALDIR := $(dir $(CURDIR)/$(word $(words $(MAKEFILE_LIST)),$(MAKEFILE_LIST)))

BUILDDIR ?= build
BUILDFLAGS ?=
CGOFLAG ?= CGO_ENABLED=1

CUSTOM_WASMER_RUNTIME_DIR ?= $(LOCALDIR)wasmer-go

# If a custom wasmer runtime exists - use it
ifneq ($(wildcard $(CUSTOM_WASMER_RUNTIME_DIR)/.*),)
	CGO_CFLAGS ?= "-I$(CUSTOM_WASMER_RUNTIME_DIR)/wasmer/packaged/include/"
	CGO_LDFLAGS ?= "-Wl,-rpath,$(CUSTOM_WASMER_RUNTIME_DIR)/target/release/ -L$(CUSTOM_WASMER_RUNTIME_DIR)/target/release/ -lwasmer_go"
	TAGS ?= --tags custom_wasmer_runtime 
endif

# Download and build custom wasmer runtime (required for Mac M1)
.PHONY: get-custom-wasmer-runtime
get-custom-wasmer-runtime:
	git clone git@github.com:wasmerio/wasmer-go.git && cd wasmer-go && cargo build --release && cd ..

.PHONY: build
build: clean
	GOOS=$(OS) GOARCH=$(ARCH) $(CGOFLAG) CGO_CFLAGS=$(CGO_CFLAGS) CGO_LDFLAGS=$(CGO_LDFLAGS) go build -o $(BUILDDIR)/teleport-plugin-framework $(BUILDFLAGS) $(TAGS)

.PHONY: clean
clean:
	rm -rf build/*
	go clean

# test examples
EXAMPLES := $(wildcard boilerplate/examples/*)
.PHONY: $(EXAMPLES)
test_examples: $(EXAMPLES)
$(EXAMPLES): build
	yarn run asc $(@)/assembly/event_handler.test.ts --outFile build/$(notdir $(@)).wasm --textFile build/$(notdir $(@)).wat --target test	
	./build/teleport-plugin-framework test -f $(@)/fixtures -b build/$(notdir $(@)).wasm

.PHONY: test
test: test_examples
	yarn asbuild:dev
	go test ./... -v

# Builds AssemblyScript files
.PHONY: asbuild
asbuild: clean
	yarn asbuild
	
CUSTOM_IMPORTS_TMP_DIR ?= /tmp/protoc-gen-terraform/custom-imports

# Generates AssemblyScript protobuf definitions
.PHONY: gen-vendor-teleport
gen-vendor-teleport:
	$(eval API_MOD_PATH := $(shell go mod download --json github.com/gravitational/teleport/api | jq .Dir))
	$(eval PROTOBUF_MOD_PATH := $(shell go mod download --json github.com/gogo/protobuf | jq .Dir))

	@rm -rf $(CUSTOM_IMPORTS_TMP_DIR)
	@mkdir -p $(CUSTOM_IMPORTS_TMP_DIR)/github.com/gravitational/teleport/api/types/wrappers
	@cp $(API_MOD_PATH)/types/wrappers/wrappers.proto $(CUSTOM_IMPORTS_TMP_DIR)/github.com/gravitational/teleport/api/types/wrappers

	@protoc \
		-I$(LOCALDIR)/lib/wasm \
		-I$(LOCALDIR)/lib/plugin \
		-I$(API_MOD_PATH)/types \
		-I$(PROTOBUF_MOD_PATH) \
		-I$(CUSTOM_IMPORTS_TMP_DIR) \
		--plugin=./node_modules/protobuf-as/bin/protoc-gen-as \
		--as_out=boilerplate/vendor/teleport \
		--as_opt=config=protobuf-as.json \
		types.proto events/events.proto interop.proto

	@protoc \
		-I$(LOCALDIR)/lib/wasm \
		-I$(LOCALDIR)/lib/plugin \
		-I$(API_MOD_PATH)/types \
		-I$(PROTOBUF_MOD_PATH) \
		-I$(CUSTOM_IMPORTS_TMP_DIR) \
		--gogofast_out=plugins=grpc,Mevents/events.proto=github.com/gravitational/teleport/api/types/events:./lib/plugin \
		interop.proto