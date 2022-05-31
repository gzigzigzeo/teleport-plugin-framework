package internal

import (
	"fmt"
	"os"
	"path"
	"reflect"
	"strings"

	"github.com/ettle/strcase"
	"github.com/gogo/protobuf/jsonpb"
	"github.com/gogo/protobuf/proto"
	"github.com/gravitational/teleport-plugin-framework/lib/wasm"
	"github.com/gravitational/teleport/api/types/events"
	"github.com/gravitational/teleport/api/types/wrappers"
)

var (
	// mockStrings string fields values
	mockStrings = map[string]string{
		"Metadata.ID":                                      "{{ uuid }}",
		"Metadata.ClusterName":                             "test-cluster",
		"Metadata.Code":                                    "{{ uuid }}",
		"UserMetadata.User":                                "foo",
		"UserMetadata.Login":                               "foo",
		"UserMetadata.Impersonator":                        "foo",
		"UserMetadata.AWSRoleARN":                          "arn:aws:iam::account:root",
		"SessionMetadata.SessionID":                        "{{ uuid }}",
		"SessionMetadata.WithMFA":                          "{{ uuid }}",
		"ServerMetadata.ServerNamespace":                   "default",
		"ServerMetadata.ServerID":                          "{{ uuid }}",
		"ServerMetadata.ServerHostname":                    "localhost",
		"ServerMetadata.ServerAddr":                        "127.0.0.1",
		"ConnectionMetadata.LocalAddr":                     "127.0.0.1",
		"ConnectionMetadata.RemoteAddr":                    "192.168.0.1",
		"ConnectionMetadata.Protocol":                      "https",
		"Status.Error":                                     "An error occured",
		"Status.UserMessage":                               "Access denied",
		"DatabaseMetadata.DatabaseService":                 "foo",
		"DatabaseMetadata.DatabaseProtocol":                "postgres",
		"DatabaseMetadata.DatabaseURI":                     "localhost:3251",
		"DatabaseMetadata.DatabaseName":                    "foo",
		"DatabaseMetadata.DatabaseUser":                    "foo",
		"DatabaseMetadata.DatabaseAWSRegion":               "eu-west-1",
		"DatabaseMetadata.DatabaseAWSRedshiftClusterID":    "test-aws-cluster",
		"DatabaseMetadata.DatabaseGCPProjectID":            "test-project",
		"DatabaseMetadata.DatabaseGCPInstanceID":           "{{ uuid }}",
		"MFADeviceMetadata.DeviceName":                     "foo",
		"MFADeviceMetadata.DeviceID":                       "{{ uuid }}",
		"MFADeviceMetadata.DeviceType":                     "U2F",
		"CommandMetadata.Command":                          "ls -la",
		"CommandMetadata.ExitCode":                         "1",
		"CommandMetadata.Error":                            "Segmentation fault",
		"KubernetesClusterMetadata.KubernetesCluster":      "test-kube-cluster",
		"AppMetadata.AppURI":                               "http://localhost:3000",
		"AppMetadata.AppPublicAddr":                        "test.test.teleport.sh",
		"AppMetadata.AppName":                              "test",
		"UserLogin.Method":                                 "web",
		"KubernetesPodMetadata.KubernetesPodName":          "test/pod",
		"KubernetesPodMetadata.KubernetesPodNamespace":     "default",
		"KubernetesPodMetadata.KubernetesContainerName":    "test/container",
		"KubernetesPodMetadata.KubernetesContainerImage":   "test-image:latest",
		"KubernetesPodMetadata.KubernetesNodeName":         "test-node",
		"SessionReject.Reason":                             "Access denied",
		"SessionDisk.Path":                                 "/tmp/session-1",
		"PostgresParse.StatementName":                      "test",
		"PostgresParse.Query":                              "SELECT * FROM test",
		"PostgresClose.StatementName":                      "test",
		"PostgresClose.PortalName":                         "test",
		"PostgresBind.StatementName":                       "test",
		"PostgresBind.PortalName":                          "test",
		"UserCreate.Connector":                             "github",
		"CertificateCreate.CertificateType":                "local",
		"Identity.User":                                    "foo",
		"Identity.Impersonator":                            "foo",
		"AppSessionStart.PublicAddr":                       "192.168.0.1",
		"AppSessionChunk.SessionChunkID":                   "{{ uuid }}",
		"DesktopClipboardSend.DesktopAddr":                 "10.0.0.1",
		"SessionUpload.UID":                                "{{ uuid }}",
		"SessionUpload.SessionURL":                         "https://test.teleport.sh/session-1",
		"AppSessionRequest.Path":                           "/test",
		"AppSessionRequest.RawQuery":                       "/test?test=1",
		"AppSessionRequest.Method":                         "GET",
		"KubeRequest.RequestPath":                          "/test",
		"KubeRequest.Verb":                                 "POST",
		"KubeRequest.ResourceAPIGroup":                     "test",
		"KubeRequest.ResourceNamespace":                    "default",
		"KubeRequest.ResourceKind":                         "user",
		"KubeRequest.ResourceName":                         "foo",
		"Subsystem.Name":                                   "test",
		"Subsystem.Error":                                  "Failed to locate subsystem",
		"AccessRequestDelete.RequestID":                    "{{ uuid }}",
		"AccessRequestCreate.RequestID":                    "{{ uuid }}",
		"AccessRequestCreate.RequestState":                 "PENDING",
		"AccessRequestCreate.Delegator":                    "bar",
		"AccessRequestCreate.Reason":                       "Needs access to hack",
		"BPFMetadata.Program":                              "block",
		"SessionCommand.Path":                              "/usr/local/bin/teleport",
		"PostgresExecute.PortalName":                       "default",
		"SessionStart.TerminalSize":                        "80:24",
		"Resize.TerminalSize":                              "80:24",
		"SessionStart.SessionRecording":                    "off",
		"SessionEnd.SessionRecording":                      "off",
		"SessionNetwork.SrcAddr":                           "10.0.0.1",
		"SessionNetwork.DstAddr":                           "10.0.0.2",
		"PortForward.Addr":                                 "10.0.0.1",
		"SCP.Path":                                         "/tmp/session",
		"SCP.Action":                                       "download",
		"WindowsDesktopSessionStart.WindowsDesktopService": "rdp-service",
		"WindowsDesktopSessionStart.DesktopAddr":           "10.0.0.1",
		"WindowsDesktopSessionStart.Domain":                "local",
		"WindowsDesktopSessionStart.WindowsUser":           "Administrator",
		"WindowsDesktopSessionStart.DesktopName":           "foo-Desktop",
		"WindowsDesktopSessionEnd.WindowsDesktopService":   "rdp-service",
		"WindowsDesktopSessionEnd.DesktopAddr":             "10.0.0.1",
		"WindowsDesktopSessionEnd.Domain":                  "local",
		"WindowsDesktopSessionEnd.WindowsUser":             "Administrator",
		"WindowsDesktopSessionEnd.DesktopName":             "foo-Desktop",
		"Identity.RouteToCluster":                          "test-cluster",
		"Identity.KubernetesCluster":                       "kube-cluster",
		"Identity.MFADeviceUUID":                           "{{ uuid }}",
		"Identity.ClientIP":                                "10.0.0.1",
		"Identity.TeleportCluster":                         "test-cluster",
		"DesktopClipboardReceive.DesktopAddr":              "10.0.0.1",
		"MySQLStatementPrepare.Query":                      "SELECT * FROM test",
		"AccessRequestCreate.Reviewer":                     "bar",
		"AccessRequestCreate.ProposedState":                "APPROVED",
		"ClientDisconnect.Reason":                          "Connection timeout",
		"DatabaseSessionQuery.DatabaseQuery":               "SELECT * FROM test",
		"RouteToApp.Name":                                  "app-route",
		"RouteToApp.SessionID":                             "{{ uuid }}",
		"RouteToApp.PublicAddr":                            "10.0.0.1",
		"RouteToApp.ClusterName":                           "test-cluster",
		"RouteToApp.AWSRoleARN":                            "arn:aws:iam::account:root",
		"RouteToDatabase.ServiceName":                      "db",
		"RouteToDatabase.Protocol":                         "postgres",
		"RouteToDatabase.Username":                         "root",
		"RouteToDatabase.Database":                         "test",
		"Unknown.UnknownType":                              "unknown.event",
		"Unknown.UnknownCode":                              "999",
		"Unknown.Data":                                     "no data",
	}

	// mockStringSlices slice values
	mockStringSlices = map[string][]string{
		"UserCreate.Roles":                             {"foo", "bar"},
		"UserMetadata.AccessRequests":                  {"{{ uuid }}"},
		"DatabaseSessionQuery.DatabaseQueryParameters": {"foo", "bar"},
		"PostgresFunctionCall.FunctionArgs":            {"foo", "bar"},
		"MySQLStatementBulkExecute.Parameters":         {"foo", "bar"},
		"MySQLStatementExecute.Parameters":             {"foo", "bar"},
		"PostgresBind.Parameters":                      {"foo", "bar"},
		"SessionCommand.Argv":                          {"-la"},
		"Identity.Roles":                               {"foo", "bar"},
		"Identity.Usage":                               {"baz"},
		"Identity.Logins":                              {"foo"},
		"Identity.KubernetesGroups":                    {"foo", "bar"},
		"Identity.KubernetesUsers":                     {"foo", "bar"},
		"Identity.AWSRoleARNs":                         {"arn:aws:iam::account:root"},
		"Identity.AccessRequests":                      {"{{ uuid }}", "{{ uuid }}"},
		"Identity.DatabaseNames":                       {"db1", "db2"},
		"Identity.DatabaseUsers":                       {"postgres", "root"},
		"AccessRequestCreate.Roles":                    {"foo"},
		"KubernetesClusterMetadata.KubernetesUsers":    {"kube-foo", "kube-bar"},
		"KubernetesClusterMetadata.KubernetesGroups":   {"kube-group"},
		"SessionEnd.Participants":                      {"foo", "bar"},
		"WindowsDesktopSessionEnd.Participants":        {"Administrator"},
		"SessionStart.InitialCommand":                  {"ls", "-la"},
		"SessionEnd.InitialCommand":                    {"ls", "-la"},
	}

	verbs = []string{"Create", "Delete", "Update", "Upsert"}

	replacements = map[string]string{
		`"Time": "0001-01-01T00:00:00Z"`:    `"Time": "{{ time }}"`,
		`"Expires": "0001-01-01T00:00:00Z"`: `"Expires": "{{ expires }}"`,
		`"Success": true`:                   `"Success": false`,
	}
)

// GenMockTemplates generates the required template files in lib/wasm/fixtures
func GenMockTemplates() {
	fmt.Println("Generating event fixture template files...")

	eventTypes := proto.GetProperties(reflect.TypeOf(events.OneOf{})).OneofTypes

	for typeName, props := range eventTypes {
		base := reflect.Zero(props.Type.Elem())
		field := base.FieldByIndex([]int{0})
		fieldType := field.Type().Elem()

		auditEvent := reflect.New(fieldType)
		mock(auditEvent.Elem())

		event := auditEvent.Interface().(events.AuditEvent)
		oneOf := events.MustToOneOf(event)

		m := jsonpb.Marshaler{Indent: "    "}
		s, err := m.MarshalToString(oneOf)
		if err != nil {
			bail("Error proto marshalling: %v", err)
		}

		s = replaceWithMacros(s)

		f := wasm.Fixture{Data: []byte(s), Type: "types.OneOf"}

		json, err := f.ToJSON()
		if err != nil {
			bail("Error encoding to JSON: %v", err)
		}

		fn := path.Clean(path.Join("lib/wasm/fixtures", "events."+strcase.ToSnake(typeName)+".json"))

		_, err = os.Stat(fn)
		if os.IsNotExist(err) {
			err = os.WriteFile(fn, json, perms)
			if err != nil {
				bail("Error writing %v : %v", fn, err)
			}
			fmt.Printf("%v created!\n", fn)
		}
	}
}

// mock fills event with mock data
func mock(value reflect.Value) reflect.Value {
	for n := 0; n < value.NumField(); n++ {
		field := value.Field(n)
		fieldKey := value.Type().Field(n).Name
		fieldName := value.Type().Name() + "." + fieldKey

		if !field.CanSet() || strings.HasPrefix(fieldKey, "XXX_") {
			continue
		}

		switch field.Type().Name() {
		case "Struct":
			s := events.MustEncodeMap(map[string]interface{}{"test": "yes"}).Struct
			field.Set(reflect.ValueOf(s))
			continue

		case "Traits":
			s := wrappers.Traits{"test": []string{"foo", "bar"}}
			field.Set(reflect.ValueOf(s))
			continue

		case "ResourceMetadata":
			field.Set(resourceMetadataFor(value))
			continue
		}

		// Set all fields to non-default values
		switch field.Kind() {
		case reflect.Bool:
			field.SetBool(true)
		case reflect.Int, reflect.Int8, reflect.Int16, reflect.Int32, reflect.Int64:
			if fieldName == "AppSessionRequest.StatusCode" {
				field.SetInt(404)
			} else {
				field.SetInt(1)
			}
		case reflect.Float32, reflect.Float64:
			field.SetFloat(1)
		case reflect.Complex64, reflect.Complex128:
			field.SetComplex(1)
		case reflect.String:
			v := fakeStringValue(fieldName)
			field.SetString(v)
		case reflect.Struct:
			m := mock(reflect.New(field.Type()).Elem())
			field.Set(m)
		case reflect.Ptr:
			z := reflect.New(field.Type().Elem())
			m := mock(z.Elem())
			field.Set(m.Addr())
		case reflect.Map:
			m := fakeMapValue(fieldName)
			field.Set(m)
		case reflect.Slice:
			m := fakeSliceValue(fieldName)
			field.Set(m)
		}
	}

	return value
}

// fakeStringValue returns fake string value or empty string if not defined
func fakeStringValue(fieldName string) string {
	if fieldName == "Metadata.Type" {
		return "METADATA_TYPE_PLACEHOLDER"
	}

	v, ok := mockStrings[fieldName]
	if !ok {
		return ""
	}

	return v
}

// fakeMapValue returns fake map value
func fakeMapValue(fieldName string) reflect.Value {
	switch fieldName {
	case "DatabaseMetadata.DatabaseLabels", "ServerMetadata.ServerLabels", "AppMetadata.AppLabels":
		return reflect.ValueOf(map[string]string{"test": "true"})
	}

	return reflect.ValueOf(map[string]string{})
}

// fakeSliceValue returns fake map value
func fakeSliceValue(fieldName string) reflect.Value {
	if fieldName == "DesktopRecording.Message" || fieldName == "SessionPrint.Data" {
		return reflect.ValueOf([]byte{1, 2, 3})
	}

	v, ok := mockStringSlices[fieldName]
	if ok {
		return reflect.ValueOf(v)
	}

	return reflect.ValueOf([]string{})
}

// resourceMetadataFor returns ResourceMetadata for a resource
func resourceMetadataFor(value reflect.Value) reflect.Value {
	name := value.Type().Name()

	for _, verb := range verbs {
		name = strings.ReplaceAll(name, verb, "")
	}

	return reflect.ValueOf(events.ResourceMetadata{
		Name:      name,
		UpdatedBy: "bar",
		TTL:       "10h",
	})
}

// replaceWithMacros replaces time with {{ time }} macro
func replaceWithMacros(s string) string {
	for what, with := range replacements {
		s = strings.ReplaceAll(s, what, with)
	}
	return s
}
