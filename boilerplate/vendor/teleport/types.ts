import * as __proto from "./__proto";

import * as google from "./google";
import * as wrappers from "./wrappers";
/**
 * DatabaseTLSMode represents the level of TLS verification performed by
 *  DB agent when connecting to a database.
 */
export enum DatabaseTLSMode {
  // VERIFY_FULL performs full certificate validation.
  VERIFY_FULL = 0,
  // VERIFY_CA works the same as VERIFY_FULL, but it skips the hostname check.
  VERIFY_CA = 1,
  // INSECURE accepts any certificate provided by server. This is the least secure option.
  INSECURE = 2,
} // DatabaseTLSMode
// PrivateKeyType is the storage type of a private key.
export enum PrivateKeyType {
  // RAW is a plaintext private key.
  RAW = 0,
  // PKCS11 is a private key backed by a PKCS11 device such as HSM.
  PKCS11 = 1,
} // PrivateKeyType
// ProxyListenerMode represents the cluster proxy listener mode.
export enum ProxyListenerMode {
  /**
   * Separate is the proxy listener mode indicating that proxies are running
   *  in separate listener mode where Teleport Proxy services use different listeners.
   */
  Separate = 0,
  /**
   * Multiplex is the proxy listener mode indicating the proxy should use multiplex mode
   *  where all proxy services are multiplexed on a single proxy port.
   */
  Multiplex = 1,
} // ProxyListenerMode
// RoutingStrategy determines the strategy used to route to nodes.
export enum RoutingStrategy {
  // UnambiguousMatch only routes to distinct nodes.
  UNAMBIGUOUS_MATCH = 0,
  // MostRecent routes to the most recently heartbeated node if duplicates are present.
  MOST_RECENT = 1,
} // RoutingStrategy
// UserTokenUsage contains additional information about the intended usage of a user token.
export enum UserTokenUsage {
  // Default value that implies token usage was not set.
  USER_TOKEN_USAGE_UNSPECIFIED = 0,
  // USER_TOKEN_RECOVER_PASSWORD is a request to recover password.
  USER_TOKEN_RECOVER_PASSWORD = 1,
  // USER_TOKEN_RECOVER_MFA is a request to recover a MFA.
  USER_TOKEN_RECOVER_MFA = 2,
  /**
   * USER_TOKEN_RENEWAL_BOT is a request to generate certificates
   *  for a bot user.
   */
  USER_TOKEN_RENEWAL_BOT = 3,
} // UserTokenUsage
// RequestState represents the state of a request for escalated privilege.
export enum RequestState {
  /**
   * NONE variant exists to allow RequestState to be explicitly omitted
   *  in certain circumstances (e.g. in an AccessRequestFilter).
   */
  NONE = 0,
  // PENDING variant is the default for newly created requests.
  PENDING = 1,
  /**
   * APPROVED variant indicates that a request has been accepted by
   *  an administrating party.
   */
  APPROVED = 2,
  /**
   * DENIED variant indicates that a request has been rejected by
   *  an administrating party.
   */
  DENIED = 3,
} // RequestState
// CertExtensionMode specifies the type of extension to use in the cert.
export enum CertExtensionMode {
  /**
   * EXTENSION represents a cert extension that may or may not be
   *  honored by the server.
   */
  EXTENSION = 0,
} // CertExtensionMode
/**
 * CertExtensionType represents the certificate type the extension is for.
 *  Currently only ssh is supported.
 */
export enum CertExtensionType {
  // SSH is used when extending an ssh certificate
  SSH = 0,
} // CertExtensionType
// SessionState represents the state of a session.
export enum SessionState {
  /**
   * Pending variant represents a session that is waiting on participants to fulfill the criteria
   *  to start the session.
   */
  SessionStatePending = 0,
  /**
   * Running variant represents a session that has had it's criteria for starting
   *  fulfilled at least once and has transitioned to a RUNNING state.
   */
  SessionStateRunning = 1,
  // Terminated variant represents a session that is no longer running and due for removal.
  SessionStateTerminated = 2,
} // SessionState
export class KeepAlive {
  // Name of the resource to keep alive.
  public Name: string = "";
  // Namespace is the namespace of the resource.
  public Namespace: string = "";
  // LeaseID is ID of the lease.
  public LeaseID: i64;
  // Expires is set to update expiry time of the resource.
  public Expires: google.protobuf.Timestamp = new google.protobuf.Timestamp();
  public Type: u32;
  // HostID is an optional UUID of the host the resource belongs to.
  public HostID: string = "";

  // Decodes KeepAlive from an ArrayBuffer
  static decode(buf: ArrayBuffer): KeepAlive {
    return KeepAlive.decodeDataView(new DataView(buf));
  }

  // Decodes KeepAlive from a DataView
  static decodeDataView(view: DataView): KeepAlive {
    const decoder = new __proto.Decoder(view);
    const obj = new KeepAlive();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Name = decoder.string();
          break;
        }
        case 2: {
          obj.Namespace = decoder.string();
          break;
        }
        case 3: {
          obj.LeaseID = decoder.int64();
          break;
        }
        case 4: {
          const length = decoder.uint32();
          obj.Expires = google.protobuf.Timestamp.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 9: {
          obj.Type = decoder.uint32();
          break;
        }
        case 10: {
          obj.HostID = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode KeepAlive

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Name.length > 0
        ? 1 + __proto.Sizer.varint64(this.Name.length) + this.Name.length
        : 0;
    size +=
      this.Namespace.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.Namespace.length) +
          this.Namespace.length
        : 0;
    size += this.LeaseID == 0 ? 0 : 1 + __proto.Sizer.int64(this.LeaseID);

    if (this.Expires != null) {
      const f: google.protobuf.Timestamp = this
        .Expires as google.protobuf.Timestamp;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size += this.Type == 0 ? 0 : 1 + __proto.Sizer.uint32(this.Type);
    size +=
      this.HostID.length > 0
        ? 1 + __proto.Sizer.varint64(this.HostID.length) + this.HostID.length
        : 0;

    return size;
  }

  // Encodes KeepAlive to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes KeepAlive to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Name.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Name.length);
      encoder.string(this.Name);
    }
    if (this.Namespace.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.Namespace.length);
      encoder.string(this.Namespace);
    }
    if (this.LeaseID != 0) {
      encoder.uint32(0x18);
      encoder.int64(this.LeaseID);
    }

    if (this.Expires != null) {
      const f = this.Expires as google.protobuf.Timestamp;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Type != 0) {
      encoder.uint32(0x48);
      encoder.uint32(this.Type);
    }
    if (this.HostID.length > 0) {
      encoder.uint32(0x52);
      encoder.uint32(this.HostID.length);
      encoder.string(this.HostID);
    }

    return buf;
  } // encode KeepAlive
} // KeepAlive

/**
 * Type is the type of keep alive, used by servers. At the moment only
 *  "node", "app" and "database" are supported.
 */
export enum KeepAlive_KeepAliveType {
  UNKNOWN = 0,
  NODE = 1,
  APP = 2,
  DATABASE = 3,
  WINDOWS_DESKTOP = 4,
  KUBERNETES = 5,
} // KeepAlive_KeepAliveType
/**
 * ServerV2List is a list of servers.
 *  DELETE IN 8.0.0 only used in deprecated GetNodes rpc
 */
export class Metadata {
  // Name is an object name
  public Name: string = "";
  /**
   * Namespace is object namespace. The field should be called "namespace"
   *  when it returns in Teleport 2.4.
   */
  public Namespace: string = "";
  // Description is object description
  public Description: string = "";
  // Labels is a set of labels
  public Labels: Map<string, string> = new Map<string, string>();
  /**
   * Expires is a global expiry time header can be set on any resource in the
   *  system.
   */
  public Expires: google.protobuf.Timestamp = new google.protobuf.Timestamp();
  // ID is a record ID
  public ID: i64;

  // Decodes Metadata from an ArrayBuffer
  static decode(buf: ArrayBuffer): Metadata {
    return Metadata.decodeDataView(new DataView(buf));
  }

  // Decodes Metadata from a DataView
  static decodeDataView(view: DataView): Metadata {
    const decoder = new __proto.Decoder(view);
    const obj = new Metadata();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Name = decoder.string();
          break;
        }
        case 2: {
          obj.Namespace = decoder.string();
          break;
        }
        case 3: {
          obj.Description = decoder.string();
          break;
        }
        case 5: {
          const length = decoder.uint32();
          __decodeMap_string_string(decoder, length, obj.Labels);
          decoder.skip(length);

          break;
        }
        case 6: {
          const length = decoder.uint32();
          obj.Expires = google.protobuf.Timestamp.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 7: {
          obj.ID = decoder.int64();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode Metadata

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Name.length > 0
        ? 1 + __proto.Sizer.varint64(this.Name.length) + this.Name.length
        : 0;
    size +=
      this.Namespace.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.Namespace.length) +
          this.Namespace.length
        : 0;
    size +=
      this.Description.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.Description.length) +
          this.Description.length
        : 0;

    if (this.Labels.size > 0) {
      const keys = this.Labels.keys();

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = this.Labels.get(key);
        const itemSize = __sizeMapEntry_string_string(key, value);
        if (itemSize > 0) {
          size += 1 + __proto.Sizer.varint64(itemSize) + itemSize;
        }
      }
    }

    if (this.Expires != null) {
      const f: google.protobuf.Timestamp = this
        .Expires as google.protobuf.Timestamp;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size += this.ID == 0 ? 0 : 1 + __proto.Sizer.int64(this.ID);

    return size;
  }

  // Encodes Metadata to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes Metadata to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Name.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Name.length);
      encoder.string(this.Name);
    }
    if (this.Namespace.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.Namespace.length);
      encoder.string(this.Namespace);
    }
    if (this.Description.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Description.length);
      encoder.string(this.Description);
    }

    if (this.Labels.size > 0) {
      const keys = this.Labels.keys();
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = this.Labels.get(key);
        const size = __sizeMapEntry_string_string(key, value);
        if (size > 0) {
          encoder.uint32(0x2a);
          encoder.uint32(size);
          if (key.length > 0) {
            encoder.uint32(0xa);
            encoder.uint32(key.length);
            encoder.string(key);
          }
          if (value.length > 0) {
            encoder.uint32(0x12);
            encoder.uint32(value.length);
            encoder.string(value);
          }
        }
      }
    }

    if (this.Expires != null) {
      const f = this.Expires as google.protobuf.Timestamp;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x32);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.ID != 0) {
      encoder.uint32(0x38);
      encoder.int64(this.ID);
    }

    return buf;
  } // encode Metadata
} // Metadata

/**
 * CommandLabelV2 is a label that has a value as a result of the
 *  output generated by running command, e.g. hostname
 */
export class Rotation {
  // State could be one of "init" or "in_progress".
  public State: string = "";
  // Phase is the current rotation phase.
  public Phase: string = "";
  // Mode sets manual or automatic rotation mode.
  public Mode: string = "";
  /**
   * CurrentID is the ID of the rotation operation
   *  to differentiate between rotation attempts.
   */
  public CurrentID: string = "";
  /**
   * Started is set to the time when rotation has been started
   *  in case if the state of the rotation is "in_progress".
   */
  public Started: google.protobuf.Timestamp = new google.protobuf.Timestamp();
  /**
   * GracePeriod is a period during which old and new CA
   *  are valid for checking purposes, but only new CA is issuing certificates.
   */
  public GracePeriod: i64;
  // LastRotated specifies the last time of the completed rotation.
  public LastRotated: google.protobuf.Timestamp =
    new google.protobuf.Timestamp();
  /**
   * Schedule is a rotation schedule - used in
   *  automatic mode to switch beetween phases.
   */
  public Schedule: RotationSchedule = new RotationSchedule();

  // Decodes Rotation from an ArrayBuffer
  static decode(buf: ArrayBuffer): Rotation {
    return Rotation.decodeDataView(new DataView(buf));
  }

  // Decodes Rotation from a DataView
  static decodeDataView(view: DataView): Rotation {
    const decoder = new __proto.Decoder(view);
    const obj = new Rotation();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.State = decoder.string();
          break;
        }
        case 2: {
          obj.Phase = decoder.string();
          break;
        }
        case 3: {
          obj.Mode = decoder.string();
          break;
        }
        case 4: {
          obj.CurrentID = decoder.string();
          break;
        }
        case 5: {
          const length = decoder.uint32();
          obj.Started = google.protobuf.Timestamp.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 6: {
          obj.GracePeriod = decoder.int64();
          break;
        }
        case 7: {
          const length = decoder.uint32();
          obj.LastRotated = google.protobuf.Timestamp.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 8: {
          const length = decoder.uint32();
          obj.Schedule = RotationSchedule.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode Rotation

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.State.length > 0
        ? 1 + __proto.Sizer.varint64(this.State.length) + this.State.length
        : 0;
    size +=
      this.Phase.length > 0
        ? 1 + __proto.Sizer.varint64(this.Phase.length) + this.Phase.length
        : 0;
    size +=
      this.Mode.length > 0
        ? 1 + __proto.Sizer.varint64(this.Mode.length) + this.Mode.length
        : 0;
    size +=
      this.CurrentID.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.CurrentID.length) +
          this.CurrentID.length
        : 0;

    if (this.Started != null) {
      const f: google.protobuf.Timestamp = this
        .Started as google.protobuf.Timestamp;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.GracePeriod == 0 ? 0 : 1 + __proto.Sizer.int64(this.GracePeriod);

    if (this.LastRotated != null) {
      const f: google.protobuf.Timestamp = this
        .LastRotated as google.protobuf.Timestamp;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Schedule != null) {
      const f: RotationSchedule = this.Schedule as RotationSchedule;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes Rotation to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes Rotation to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.State.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.State.length);
      encoder.string(this.State);
    }
    if (this.Phase.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.Phase.length);
      encoder.string(this.Phase);
    }
    if (this.Mode.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Mode.length);
      encoder.string(this.Mode);
    }
    if (this.CurrentID.length > 0) {
      encoder.uint32(0x22);
      encoder.uint32(this.CurrentID.length);
      encoder.string(this.CurrentID);
    }

    if (this.Started != null) {
      const f = this.Started as google.protobuf.Timestamp;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.GracePeriod != 0) {
      encoder.uint32(0x30);
      encoder.int64(this.GracePeriod);
    }

    if (this.LastRotated != null) {
      const f = this.LastRotated as google.protobuf.Timestamp;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x3a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Schedule != null) {
      const f = this.Schedule as RotationSchedule;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x42);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode Rotation
} // Rotation

// ProvisionTokenV2List is a list of provisioning tokens.
export class RotationSchedule {
  // UpdateClients specifies time to switch to the "Update clients" phase
  public UpdateClients: google.protobuf.Timestamp =
    new google.protobuf.Timestamp();
  // UpdateServers specifies time to switch to the "Update servers" phase.
  public UpdateServers: google.protobuf.Timestamp =
    new google.protobuf.Timestamp();
  // Standby specifies time to switch to the "Standby" phase.
  public Standby: google.protobuf.Timestamp = new google.protobuf.Timestamp();

  // Decodes RotationSchedule from an ArrayBuffer
  static decode(buf: ArrayBuffer): RotationSchedule {
    return RotationSchedule.decodeDataView(new DataView(buf));
  }

  // Decodes RotationSchedule from a DataView
  static decodeDataView(view: DataView): RotationSchedule {
    const decoder = new __proto.Decoder(view);
    const obj = new RotationSchedule();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          const length = decoder.uint32();
          obj.UpdateClients = google.protobuf.Timestamp.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 2: {
          const length = decoder.uint32();
          obj.UpdateServers = google.protobuf.Timestamp.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 3: {
          const length = decoder.uint32();
          obj.Standby = google.protobuf.Timestamp.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode RotationSchedule

  public size(): u32 {
    let size: u32 = 0;

    if (this.UpdateClients != null) {
      const f: google.protobuf.Timestamp = this
        .UpdateClients as google.protobuf.Timestamp;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.UpdateServers != null) {
      const f: google.protobuf.Timestamp = this
        .UpdateServers as google.protobuf.Timestamp;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Standby != null) {
      const f: google.protobuf.Timestamp = this
        .Standby as google.protobuf.Timestamp;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes RotationSchedule to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes RotationSchedule to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.UpdateClients != null) {
      const f = this.UpdateClients as google.protobuf.Timestamp;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.UpdateServers != null) {
      const f = this.UpdateServers as google.protobuf.Timestamp;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Standby != null) {
      const f = this.Standby as google.protobuf.Timestamp;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode RotationSchedule
} // RotationSchedule

/**
 * ClusterNetworkingConfigSpecV2 is the actual data we care about
 *  for ClusterNetworkingConfig.
 */
export class ResourceHeader {
  // Kind is a resource kind
  public Kind: string = "";
  // SubKind is an optional resource sub kind, used in some resources
  public SubKind: string = "";
  // Version is version
  public Version: string = "";
  // Metadata is resource metadata
  public Metadata: Metadata = new Metadata();

  // Decodes ResourceHeader from an ArrayBuffer
  static decode(buf: ArrayBuffer): ResourceHeader {
    return ResourceHeader.decodeDataView(new DataView(buf));
  }

  // Decodes ResourceHeader from a DataView
  static decodeDataView(view: DataView): ResourceHeader {
    const decoder = new __proto.Decoder(view);
    const obj = new ResourceHeader();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Kind = decoder.string();
          break;
        }
        case 2: {
          obj.SubKind = decoder.string();
          break;
        }
        case 3: {
          obj.Version = decoder.string();
          break;
        }
        case 4: {
          const length = decoder.uint32();
          obj.Metadata = Metadata.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode ResourceHeader

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Kind.length > 0
        ? 1 + __proto.Sizer.varint64(this.Kind.length) + this.Kind.length
        : 0;
    size +=
      this.SubKind.length > 0
        ? 1 + __proto.Sizer.varint64(this.SubKind.length) + this.SubKind.length
        : 0;
    size +=
      this.Version.length > 0
        ? 1 + __proto.Sizer.varint64(this.Version.length) + this.Version.length
        : 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes ResourceHeader to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes ResourceHeader to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Kind.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Kind.length);
      encoder.string(this.Kind);
    }
    if (this.SubKind.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.SubKind.length);
      encoder.string(this.SubKind);
    }
    if (this.Version.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Version.length);
      encoder.string(this.Version);
    }

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode ResourceHeader
} // ResourceHeader

// NamespaceSpec is a namespace specificateion
export class DatabaseServerV3 {
  // Kind is the database server resource kind.
  public Kind: string = "";
  // SubKind is an optional resource subkind.
  public SubKind: string = "";
  // Version is the resource version.
  public Version: string = "";
  // Metadata is the database server metadata.
  public Metadata: Metadata = new Metadata();
  // Spec is the database server spec.
  public Spec: DatabaseServerSpecV3 = new DatabaseServerSpecV3();

  // Decodes DatabaseServerV3 from an ArrayBuffer
  static decode(buf: ArrayBuffer): DatabaseServerV3 {
    return DatabaseServerV3.decodeDataView(new DataView(buf));
  }

  // Decodes DatabaseServerV3 from a DataView
  static decodeDataView(view: DataView): DatabaseServerV3 {
    const decoder = new __proto.Decoder(view);
    const obj = new DatabaseServerV3();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Kind = decoder.string();
          break;
        }
        case 2: {
          obj.SubKind = decoder.string();
          break;
        }
        case 3: {
          obj.Version = decoder.string();
          break;
        }
        case 4: {
          const length = decoder.uint32();
          obj.Metadata = Metadata.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 5: {
          const length = decoder.uint32();
          obj.Spec = DatabaseServerSpecV3.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode DatabaseServerV3

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Kind.length > 0
        ? 1 + __proto.Sizer.varint64(this.Kind.length) + this.Kind.length
        : 0;
    size +=
      this.SubKind.length > 0
        ? 1 + __proto.Sizer.varint64(this.SubKind.length) + this.SubKind.length
        : 0;
    size +=
      this.Version.length > 0
        ? 1 + __proto.Sizer.varint64(this.Version.length) + this.Version.length
        : 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Spec != null) {
      const f: DatabaseServerSpecV3 = this.Spec as DatabaseServerSpecV3;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes DatabaseServerV3 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes DatabaseServerV3 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Kind.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Kind.length);
      encoder.string(this.Kind);
    }
    if (this.SubKind.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.SubKind.length);
      encoder.string(this.SubKind);
    }
    if (this.Version.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Version.length);
      encoder.string(this.Version);
    }

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Spec != null) {
      const f = this.Spec as DatabaseServerSpecV3;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode DatabaseServerV3
} // DatabaseServerV3

// AccessRequestFilter encodes filter params for access requests.
export class DatabaseServerSpecV3 {
  /**
   * Description is a free-form text describing this database server.
   *
   *  DEPRECATED: Moved to DatabaseSpecV3. DELETE IN 9.0.
   */
  public Description: string = "";
  /**
   * Protocol is the database type e.g. postgres, mysql, etc.
   *
   *  DEPRECATED: Moved to DatabaseSpecV3. DELETE IN 9.0.
   */
  public Protocol: string = "";
  /**
   * URI is the database connection address.
   *
   *  DEPRECATED: Moved to DatabaseSpecV3. DELETE IN 9.0.
   */
  public URI: string = "";
  /**
   * CACert is an optional base64-encoded database CA certificate.
   *
   *  DEPRECATED: Moved to DatabaseSpecV3. DELETE IN 9.0.
   */
  public CACert: Array<u8> = new Array<u8>();
  /**
   * AWS contains AWS specific settings for RDS/Aurora databases.
   *
   *  DEPRECATED: Moved to DatabaseSpecV3. DELETE IN 9.0.
   */
  public AWS: AWS = new AWS();
  // Version is the Teleport version that the server is running.
  public Version: string = "";
  // Hostname is the database server hostname.
  public Hostname: string = "";
  // HostID is the ID of the host the database server is running on.
  public HostID: string = "";
  /**
   * DynamicLabels is the database server dynamic labels.
   *
   *  DEPRECATED: Moved to DatabaseSpecV3. DELETE IN 9.0.
   */
  public DynamicLabels: Map<string, CommandLabelV2> = new Map<
    string,
    CommandLabelV2
  >();
  // Rotation contains the server CA rotation information.
  public Rotation: Rotation = new Rotation();
  /**
   * GCP contains parameters specific to GCP Cloud SQL databases.
   *
   *  DEPRECATED: Moved to DatabaseSpecV3. DELETE IN 9.0.
   */
  public GCP: GCPCloudSQL = new GCPCloudSQL();
  // Database is the database proxied by this database server.
  public Database: DatabaseV3 = new DatabaseV3();

  // Decodes DatabaseServerSpecV3 from an ArrayBuffer
  static decode(buf: ArrayBuffer): DatabaseServerSpecV3 {
    return DatabaseServerSpecV3.decodeDataView(new DataView(buf));
  }

  // Decodes DatabaseServerSpecV3 from a DataView
  static decodeDataView(view: DataView): DatabaseServerSpecV3 {
    const decoder = new __proto.Decoder(view);
    const obj = new DatabaseServerSpecV3();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Description = decoder.string();
          break;
        }
        case 2: {
          obj.Protocol = decoder.string();
          break;
        }
        case 3: {
          obj.URI = decoder.string();
          break;
        }
        case 4: {
          obj.CACert = decoder.bytes();
          break;
        }
        case 5: {
          const length = decoder.uint32();
          obj.AWS = AWS.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 6: {
          obj.Version = decoder.string();
          break;
        }
        case 7: {
          obj.Hostname = decoder.string();
          break;
        }
        case 8: {
          obj.HostID = decoder.string();
          break;
        }
        case 9: {
          const length = decoder.uint32();
          __decodeMap_string_CommandLabelV2(decoder, length, obj.DynamicLabels);
          decoder.skip(length);

          break;
        }
        case 10: {
          const length = decoder.uint32();
          obj.Rotation = Rotation.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 11: {
          const length = decoder.uint32();
          obj.GCP = GCPCloudSQL.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 12: {
          const length = decoder.uint32();
          obj.Database = DatabaseV3.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode DatabaseServerSpecV3

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Description.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.Description.length) +
          this.Description.length
        : 0;
    size +=
      this.Protocol.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.Protocol.length) +
          this.Protocol.length
        : 0;
    size +=
      this.URI.length > 0
        ? 1 + __proto.Sizer.varint64(this.URI.length) + this.URI.length
        : 0;
    size +=
      this.CACert.length > 0
        ? 1 + __proto.Sizer.varint64(this.CACert.length) + this.CACert.length
        : 0;

    if (this.AWS != null) {
      const f: AWS = this.AWS as AWS;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.Version.length > 0
        ? 1 + __proto.Sizer.varint64(this.Version.length) + this.Version.length
        : 0;
    size +=
      this.Hostname.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.Hostname.length) +
          this.Hostname.length
        : 0;
    size +=
      this.HostID.length > 0
        ? 1 + __proto.Sizer.varint64(this.HostID.length) + this.HostID.length
        : 0;

    if (this.DynamicLabels.size > 0) {
      const keys = this.DynamicLabels.keys();

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = this.DynamicLabels.get(key);
        const itemSize = __sizeMapEntry_string_CommandLabelV2(key, value);
        if (itemSize > 0) {
          size += 1 + __proto.Sizer.varint64(itemSize) + itemSize;
        }
      }
    }

    if (this.Rotation != null) {
      const f: Rotation = this.Rotation as Rotation;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.GCP != null) {
      const f: GCPCloudSQL = this.GCP as GCPCloudSQL;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Database != null) {
      const f: DatabaseV3 = this.Database as DatabaseV3;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes DatabaseServerSpecV3 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes DatabaseServerSpecV3 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Description.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Description.length);
      encoder.string(this.Description);
    }
    if (this.Protocol.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.Protocol.length);
      encoder.string(this.Protocol);
    }
    if (this.URI.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.URI.length);
      encoder.string(this.URI);
    }
    if (this.CACert.length > 0) {
      encoder.uint32(0x22);
      encoder.uint32(this.CACert.length);
      encoder.bytes(this.CACert);
    }

    if (this.AWS != null) {
      const f = this.AWS as AWS;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Version.length > 0) {
      encoder.uint32(0x32);
      encoder.uint32(this.Version.length);
      encoder.string(this.Version);
    }
    if (this.Hostname.length > 0) {
      encoder.uint32(0x3a);
      encoder.uint32(this.Hostname.length);
      encoder.string(this.Hostname);
    }
    if (this.HostID.length > 0) {
      encoder.uint32(0x42);
      encoder.uint32(this.HostID.length);
      encoder.string(this.HostID);
    }

    if (this.DynamicLabels.size > 0) {
      const keys = this.DynamicLabels.keys();
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = this.DynamicLabels.get(key);
        const size = __sizeMapEntry_string_CommandLabelV2(key, value);
        if (size > 0) {
          encoder.uint32(0x4a);
          encoder.uint32(size);
          if (key.length > 0) {
            encoder.uint32(0xa);
            encoder.uint32(key.length);
            encoder.string(key);
          }

          const messageSize = value.size();

          if (messageSize > 0) {
            encoder.uint32(0x12);
            encoder.uint32(messageSize);
            value.encodeU8Array(encoder);
          }
        }
      }
    }

    if (this.Rotation != null) {
      const f = this.Rotation as Rotation;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x52);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.GCP != null) {
      const f = this.GCP as GCPCloudSQL;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x5a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Database != null) {
      const f = this.Database as DatabaseV3;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x62);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode DatabaseServerSpecV3
} // DatabaseServerSpecV3

// RoleOptions is a set of role options
export class DatabaseV3List {
  // Databases is a list of database resources.
  public Databases: Array<DatabaseV3> = new Array<DatabaseV3>();

  // Decodes DatabaseV3List from an ArrayBuffer
  static decode(buf: ArrayBuffer): DatabaseV3List {
    return DatabaseV3List.decodeDataView(new DataView(buf));
  }

  // Decodes DatabaseV3List from a DataView
  static decodeDataView(view: DataView): DatabaseV3List {
    const decoder = new __proto.Decoder(view);
    const obj = new DatabaseV3List();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          const length = decoder.uint32();
          obj.Databases.push(
            DatabaseV3.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length
              )
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode DatabaseV3List

  public size(): u32 {
    let size: u32 = 0;

    for (let n: i32 = 0; n < this.Databases.length; n++) {
      const messageSize = this.Databases[n].size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes DatabaseV3List to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes DatabaseV3List to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    for (let n: i32 = 0; n < this.Databases.length; n++) {
      const messageSize = this.Databases[n].size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        this.Databases[n].encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode DatabaseV3List
} // DatabaseV3List

/**
 * ImpersonateConditions specifies whether users are allowed
 *  to issue certificates for other users or groups.
 */
export class DatabaseV3 {
  // Kind is the database resource kind.
  public Kind: string = "";
  // SubKind is an optional resource subkind.
  public SubKind: string = "";
  // Version is the resource version.
  public Version: string = "";
  // Metadata is the database metadata.
  public Metadata: Metadata = new Metadata();
  // Spec is the database spec.
  public Spec: DatabaseSpecV3 = new DatabaseSpecV3();
  // Status is the database runtime information.
  public Status: DatabaseStatusV3 = new DatabaseStatusV3();

  // Decodes DatabaseV3 from an ArrayBuffer
  static decode(buf: ArrayBuffer): DatabaseV3 {
    return DatabaseV3.decodeDataView(new DataView(buf));
  }

  // Decodes DatabaseV3 from a DataView
  static decodeDataView(view: DataView): DatabaseV3 {
    const decoder = new __proto.Decoder(view);
    const obj = new DatabaseV3();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Kind = decoder.string();
          break;
        }
        case 2: {
          obj.SubKind = decoder.string();
          break;
        }
        case 3: {
          obj.Version = decoder.string();
          break;
        }
        case 4: {
          const length = decoder.uint32();
          obj.Metadata = Metadata.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 5: {
          const length = decoder.uint32();
          obj.Spec = DatabaseSpecV3.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 6: {
          const length = decoder.uint32();
          obj.Status = DatabaseStatusV3.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode DatabaseV3

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Kind.length > 0
        ? 1 + __proto.Sizer.varint64(this.Kind.length) + this.Kind.length
        : 0;
    size +=
      this.SubKind.length > 0
        ? 1 + __proto.Sizer.varint64(this.SubKind.length) + this.SubKind.length
        : 0;
    size +=
      this.Version.length > 0
        ? 1 + __proto.Sizer.varint64(this.Version.length) + this.Version.length
        : 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Spec != null) {
      const f: DatabaseSpecV3 = this.Spec as DatabaseSpecV3;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Status != null) {
      const f: DatabaseStatusV3 = this.Status as DatabaseStatusV3;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes DatabaseV3 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes DatabaseV3 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Kind.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Kind.length);
      encoder.string(this.Kind);
    }
    if (this.SubKind.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.SubKind.length);
      encoder.string(this.SubKind);
    }
    if (this.Version.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Version.length);
      encoder.string(this.Version);
    }

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Spec != null) {
      const f = this.Spec as DatabaseSpecV3;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Status != null) {
      const f = this.Status as DatabaseStatusV3;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x32);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode DatabaseV3
} // DatabaseV3

// U2FDevice holds the U2F-specific fields of MFADevice.
export class DatabaseSpecV3 {
  // Protocol is the database protocol: postgres, mysql, mongodb, etc.
  public Protocol: string = "";
  // URI is the database connection endpoint.
  public URI: string = "";
  /**
   * CACert is the PEM-encoded database CA certificate.
   *
   *  DEPRECATED: Moved to TLS.CACert. DELETE IN 10.0.
   */
  public CACert: string = "";
  // DynamicLabels is the database dynamic labels.
  public DynamicLabels: Map<string, CommandLabelV2> = new Map<
    string,
    CommandLabelV2
  >();
  // AWS contains AWS specific settings for RDS/Aurora/Redshift databases.
  public AWS: AWS = new AWS();
  // GCP contains parameters specific to GCP Cloud SQL databases.
  public GCP: GCPCloudSQL = new GCPCloudSQL();
  // Azure contains Azure specific database metadata.
  public Azure: Azure = new Azure();
  /**
   * TLS is the TLS configuration used when establishing connection to target database.
   *  Allows to provide custom CA cert or override server name.
   */
  public TLS: DatabaseTLS = new DatabaseTLS();
  // AD is the Active Directory configuration for the database.
  public AD: AD = new AD();

  // Decodes DatabaseSpecV3 from an ArrayBuffer
  static decode(buf: ArrayBuffer): DatabaseSpecV3 {
    return DatabaseSpecV3.decodeDataView(new DataView(buf));
  }

  // Decodes DatabaseSpecV3 from a DataView
  static decodeDataView(view: DataView): DatabaseSpecV3 {
    const decoder = new __proto.Decoder(view);
    const obj = new DatabaseSpecV3();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Protocol = decoder.string();
          break;
        }
        case 2: {
          obj.URI = decoder.string();
          break;
        }
        case 3: {
          obj.CACert = decoder.string();
          break;
        }
        case 4: {
          const length = decoder.uint32();
          __decodeMap_string_CommandLabelV2(decoder, length, obj.DynamicLabels);
          decoder.skip(length);

          break;
        }
        case 5: {
          const length = decoder.uint32();
          obj.AWS = AWS.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 6: {
          const length = decoder.uint32();
          obj.GCP = GCPCloudSQL.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 7: {
          const length = decoder.uint32();
          obj.Azure = Azure.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 8: {
          const length = decoder.uint32();
          obj.TLS = DatabaseTLS.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 9: {
          const length = decoder.uint32();
          obj.AD = AD.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode DatabaseSpecV3

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Protocol.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.Protocol.length) +
          this.Protocol.length
        : 0;
    size +=
      this.URI.length > 0
        ? 1 + __proto.Sizer.varint64(this.URI.length) + this.URI.length
        : 0;
    size +=
      this.CACert.length > 0
        ? 1 + __proto.Sizer.varint64(this.CACert.length) + this.CACert.length
        : 0;

    if (this.DynamicLabels.size > 0) {
      const keys = this.DynamicLabels.keys();

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = this.DynamicLabels.get(key);
        const itemSize = __sizeMapEntry_string_CommandLabelV2(key, value);
        if (itemSize > 0) {
          size += 1 + __proto.Sizer.varint64(itemSize) + itemSize;
        }
      }
    }

    if (this.AWS != null) {
      const f: AWS = this.AWS as AWS;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.GCP != null) {
      const f: GCPCloudSQL = this.GCP as GCPCloudSQL;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Azure != null) {
      const f: Azure = this.Azure as Azure;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.TLS != null) {
      const f: DatabaseTLS = this.TLS as DatabaseTLS;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.AD != null) {
      const f: AD = this.AD as AD;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes DatabaseSpecV3 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes DatabaseSpecV3 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Protocol.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Protocol.length);
      encoder.string(this.Protocol);
    }
    if (this.URI.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.URI.length);
      encoder.string(this.URI);
    }
    if (this.CACert.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.CACert.length);
      encoder.string(this.CACert);
    }

    if (this.DynamicLabels.size > 0) {
      const keys = this.DynamicLabels.keys();
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = this.DynamicLabels.get(key);
        const size = __sizeMapEntry_string_CommandLabelV2(key, value);
        if (size > 0) {
          encoder.uint32(0x22);
          encoder.uint32(size);
          if (key.length > 0) {
            encoder.uint32(0xa);
            encoder.uint32(key.length);
            encoder.string(key);
          }

          const messageSize = value.size();

          if (messageSize > 0) {
            encoder.uint32(0x12);
            encoder.uint32(messageSize);
            value.encodeU8Array(encoder);
          }
        }
      }
    }

    if (this.AWS != null) {
      const f = this.AWS as AWS;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.GCP != null) {
      const f = this.GCP as GCPCloudSQL;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x32);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Azure != null) {
      const f = this.Azure as Azure;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x3a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.TLS != null) {
      const f = this.TLS as DatabaseTLS;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x42);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.AD != null) {
      const f = this.AD as AD;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x4a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode DatabaseSpecV3
} // DatabaseSpecV3

// AcquireSemaphoreRequest holds semaphore lease acquisition parameters.
export class DatabaseStatusV3 {
  // CACert is the auto-downloaded cloud database CA certificate.
  public CACert: string = "";
  // AWS is the auto-discovered AWS cloud database metadata.
  public AWS: AWS = new AWS();

  // Decodes DatabaseStatusV3 from an ArrayBuffer
  static decode(buf: ArrayBuffer): DatabaseStatusV3 {
    return DatabaseStatusV3.decodeDataView(new DataView(buf));
  }

  // Decodes DatabaseStatusV3 from a DataView
  static decodeDataView(view: DataView): DatabaseStatusV3 {
    const decoder = new __proto.Decoder(view);
    const obj = new DatabaseStatusV3();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.CACert = decoder.string();
          break;
        }
        case 2: {
          const length = decoder.uint32();
          obj.AWS = AWS.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode DatabaseStatusV3

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.CACert.length > 0
        ? 1 + __proto.Sizer.varint64(this.CACert.length) + this.CACert.length
        : 0;

    if (this.AWS != null) {
      const f: AWS = this.AWS as AWS;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes DatabaseStatusV3 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes DatabaseStatusV3 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.CACert.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.CACert.length);
      encoder.string(this.CACert);
    }

    if (this.AWS != null) {
      const f = this.AWS as AWS;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode DatabaseStatusV3
} // DatabaseStatusV3

/**
 * KubernetesCluster is a named kubernetes API endpoint handled by a Server.
 *
 *  TODO: deprecate and convert all usage to KubernetesClusterV3
 */
export class AWS {
  // Region is a AWS cloud region.
  public Region: string = "";
  // Redshift contains Redshift specific metadata.
  public Redshift: Redshift = new Redshift();
  // RDS contains RDS specific metadata.
  public RDS: RDS = new RDS();
  // AccountID is the AWS account ID this database belongs to.
  public AccountID: string = "";

  // Decodes AWS from an ArrayBuffer
  static decode(buf: ArrayBuffer): AWS {
    return AWS.decodeDataView(new DataView(buf));
  }

  // Decodes AWS from a DataView
  static decodeDataView(view: DataView): AWS {
    const decoder = new __proto.Decoder(view);
    const obj = new AWS();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Region = decoder.string();
          break;
        }
        case 2: {
          const length = decoder.uint32();
          obj.Redshift = Redshift.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 3: {
          const length = decoder.uint32();
          obj.RDS = RDS.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 4: {
          obj.AccountID = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode AWS

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Region.length > 0
        ? 1 + __proto.Sizer.varint64(this.Region.length) + this.Region.length
        : 0;

    if (this.Redshift != null) {
      const f: Redshift = this.Redshift as Redshift;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.RDS != null) {
      const f: RDS = this.RDS as RDS;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.AccountID.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.AccountID.length) +
          this.AccountID.length
        : 0;

    return size;
  }

  // Encodes AWS to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes AWS to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Region.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Region.length);
      encoder.string(this.Region);
    }

    if (this.Redshift != null) {
      const f = this.Redshift as Redshift;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.RDS != null) {
      const f = this.RDS as RDS;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.AccountID.length > 0) {
      encoder.uint32(0x22);
      encoder.uint32(this.AccountID.length);
      encoder.string(this.AccountID);
    }

    return buf;
  } // encode AWS
} // AWS

// ResourceWithSecretsRequest is a request relating to a named resource with secrets.
export class Redshift {
  // ClusterID is the Redshift cluster identifier.
  public ClusterID: string = "";

  // Decodes Redshift from an ArrayBuffer
  static decode(buf: ArrayBuffer): Redshift {
    return Redshift.decodeDataView(new DataView(buf));
  }

  // Decodes Redshift from a DataView
  static decodeDataView(view: DataView): Redshift {
    const decoder = new __proto.Decoder(view);
    const obj = new Redshift();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.ClusterID = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode Redshift

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.ClusterID.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.ClusterID.length) +
          this.ClusterID.length
        : 0;

    return size;
  }

  // Encodes Redshift to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes Redshift to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.ClusterID.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.ClusterID.length);
      encoder.string(this.ClusterID);
    }

    return buf;
  } // encode Redshift
} // Redshift

// AttributeMapping maps a SAML attribute statement to teleport roles.
export class RDS {
  // InstanceID is the RDS instance identifier.
  public InstanceID: string = "";
  // ClusterID is the RDS cluster (Aurora) identifier.
  public ClusterID: string = "";
  // ResourceID is the RDS instance resource identifier (db-xxx).
  public ResourceID: string = "";
  // IAMAuth indicates whether database IAM authentication is enabled.
  public IAMAuth: bool;

  // Decodes RDS from an ArrayBuffer
  static decode(buf: ArrayBuffer): RDS {
    return RDS.decodeDataView(new DataView(buf));
  }

  // Decodes RDS from a DataView
  static decodeDataView(view: DataView): RDS {
    const decoder = new __proto.Decoder(view);
    const obj = new RDS();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.InstanceID = decoder.string();
          break;
        }
        case 2: {
          obj.ClusterID = decoder.string();
          break;
        }
        case 3: {
          obj.ResourceID = decoder.string();
          break;
        }
        case 4: {
          obj.IAMAuth = decoder.bool();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode RDS

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.InstanceID.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.InstanceID.length) +
          this.InstanceID.length
        : 0;
    size +=
      this.ClusterID.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.ClusterID.length) +
          this.ClusterID.length
        : 0;
    size +=
      this.ResourceID.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.ResourceID.length) +
          this.ResourceID.length
        : 0;
    size += this.IAMAuth == 0 ? 0 : 1 + 1;

    return size;
  }

  // Encodes RDS to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes RDS to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.InstanceID.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.InstanceID.length);
      encoder.string(this.InstanceID);
    }
    if (this.ClusterID.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.ClusterID.length);
      encoder.string(this.ClusterID);
    }
    if (this.ResourceID.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.ResourceID.length);
      encoder.string(this.ResourceID);
    }
    if (this.IAMAuth != 0) {
      encoder.uint32(0x20);
      encoder.bool(this.IAMAuth);
    }

    return buf;
  } // encode RDS
} // RDS

// LockSpecV2 is a Lock specification.
export class GCPCloudSQL {
  // ProjectID is the GCP project ID the Cloud SQL instance resides in.
  public ProjectID: string = "";
  // InstanceID is the Cloud SQL instance ID.
  public InstanceID: string = "";

  // Decodes GCPCloudSQL from an ArrayBuffer
  static decode(buf: ArrayBuffer): GCPCloudSQL {
    return GCPCloudSQL.decodeDataView(new DataView(buf));
  }

  // Decodes GCPCloudSQL from a DataView
  static decodeDataView(view: DataView): GCPCloudSQL {
    const decoder = new __proto.Decoder(view);
    const obj = new GCPCloudSQL();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.ProjectID = decoder.string();
          break;
        }
        case 2: {
          obj.InstanceID = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode GCPCloudSQL

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.ProjectID.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.ProjectID.length) +
          this.ProjectID.length
        : 0;
    size +=
      this.InstanceID.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.InstanceID.length) +
          this.InstanceID.length
        : 0;

    return size;
  }

  // Encodes GCPCloudSQL to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes GCPCloudSQL to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.ProjectID.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.ProjectID.length);
      encoder.string(this.ProjectID);
    }
    if (this.InstanceID.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.InstanceID.length);
      encoder.string(this.InstanceID);
    }

    return buf;
  } // encode GCPCloudSQL
} // GCPCloudSQL

/**
 * RegisterUsingTokenRequest is a request to register with the auth server using
 *  an authentication token
 */
export class Azure {
  // Name is the Azure database server name.
  public Name: string = "";

  // Decodes Azure from an ArrayBuffer
  static decode(buf: ArrayBuffer): Azure {
    return Azure.decodeDataView(new DataView(buf));
  }

  // Decodes Azure from a DataView
  static decodeDataView(view: DataView): Azure {
    const decoder = new __proto.Decoder(view);
    const obj = new Azure();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Name = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode Azure

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Name.length > 0
        ? 1 + __proto.Sizer.varint64(this.Name.length) + this.Name.length
        : 0;

    return size;
  }

  // Encodes Azure to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes Azure to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Name.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Name.length);
      encoder.string(this.Name);
    }

    return buf;
  } // encode Azure
} // Azure

// SortBy defines a sort criteria.
export class AD {
  // KeytabFile is the path to the Kerberos keytab file.
  public KeytabFile: string = "";
  // Krb5File is the path to the Kerberos configuration file. Defaults to /etc/krb5.conf.
  public Krb5File: string = "";
  // Domain is the Active Directory domain the database resides in.
  public Domain: string = "";
  // SPN is the service principal name for the database.
  public SPN: string = "";

  // Decodes AD from an ArrayBuffer
  static decode(buf: ArrayBuffer): AD {
    return AD.decodeDataView(new DataView(buf));
  }

  // Decodes AD from a DataView
  static decodeDataView(view: DataView): AD {
    const decoder = new __proto.Decoder(view);
    const obj = new AD();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.KeytabFile = decoder.string();
          break;
        }
        case 2: {
          obj.Krb5File = decoder.string();
          break;
        }
        case 3: {
          obj.Domain = decoder.string();
          break;
        }
        case 4: {
          obj.SPN = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode AD

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.KeytabFile.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.KeytabFile.length) +
          this.KeytabFile.length
        : 0;
    size +=
      this.Krb5File.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.Krb5File.length) +
          this.Krb5File.length
        : 0;
    size +=
      this.Domain.length > 0
        ? 1 + __proto.Sizer.varint64(this.Domain.length) + this.Domain.length
        : 0;
    size +=
      this.SPN.length > 0
        ? 1 + __proto.Sizer.varint64(this.SPN.length) + this.SPN.length
        : 0;

    return size;
  }

  // Encodes AD to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes AD to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.KeytabFile.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.KeytabFile.length);
      encoder.string(this.KeytabFile);
    }
    if (this.Krb5File.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.Krb5File.length);
      encoder.string(this.Krb5File);
    }
    if (this.Domain.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Domain.length);
      encoder.string(this.Domain);
    }
    if (this.SPN.length > 0) {
      encoder.uint32(0x22);
      encoder.uint32(this.SPN.length);
      encoder.string(this.SPN);
    }

    return buf;
  } // encode AD
} // AD

// DatabaseTLS contains TLS configuration options.
export class DatabaseTLS {
  // Mode is a TLS connection mode. See DatabaseTLSMode for details.
  public Mode: u32;
  /**
   * CACert is an optional user provided CA certificate used for verifying
   *  database TLS connection.
   */
  public CACert: string = "";
  /**
   * ServerName allows to provide custom hostname. This value will override the
   *  servername/hostname on a certificate during validation.
   */
  public ServerName: string = "";

  // Decodes DatabaseTLS from an ArrayBuffer
  static decode(buf: ArrayBuffer): DatabaseTLS {
    return DatabaseTLS.decodeDataView(new DataView(buf));
  }

  // Decodes DatabaseTLS from a DataView
  static decodeDataView(view: DataView): DatabaseTLS {
    const decoder = new __proto.Decoder(view);
    const obj = new DatabaseTLS();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Mode = decoder.uint32();
          break;
        }
        case 2: {
          obj.CACert = decoder.string();
          break;
        }
        case 3: {
          obj.ServerName = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode DatabaseTLS

  public size(): u32 {
    let size: u32 = 0;

    size += this.Mode == 0 ? 0 : 1 + __proto.Sizer.uint32(this.Mode);
    size +=
      this.CACert.length > 0
        ? 1 + __proto.Sizer.varint64(this.CACert.length) + this.CACert.length
        : 0;
    size +=
      this.ServerName.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.ServerName.length) +
          this.ServerName.length
        : 0;

    return size;
  }

  // Encodes DatabaseTLS to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes DatabaseTLS to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Mode != 0) {
      encoder.uint32(0x8);
      encoder.uint32(this.Mode);
    }
    if (this.CACert.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.CACert.length);
      encoder.string(this.CACert);
    }
    if (this.ServerName.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.ServerName.length);
      encoder.string(this.ServerName);
    }

    return buf;
  } // encode DatabaseTLS
} // DatabaseTLS

// ServerV2 represents a Node, App, Database, Proxy or Auth server in a Teleport cluster.
export class ServerV2 {
  // Kind is a resource kind
  public Kind: string = "";
  // SubKind is an optional resource sub kind, used in some resources
  public SubKind: string = "";
  // Version is version
  public Version: string = "";
  // Metadata is resource metadata
  public Metadata: Metadata = new Metadata();
  // Spec is a server spec
  public Spec: ServerSpecV2 = new ServerSpecV2();

  // Decodes ServerV2 from an ArrayBuffer
  static decode(buf: ArrayBuffer): ServerV2 {
    return ServerV2.decodeDataView(new DataView(buf));
  }

  // Decodes ServerV2 from a DataView
  static decodeDataView(view: DataView): ServerV2 {
    const decoder = new __proto.Decoder(view);
    const obj = new ServerV2();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Kind = decoder.string();
          break;
        }
        case 2: {
          obj.SubKind = decoder.string();
          break;
        }
        case 3: {
          obj.Version = decoder.string();
          break;
        }
        case 4: {
          const length = decoder.uint32();
          obj.Metadata = Metadata.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 5: {
          const length = decoder.uint32();
          obj.Spec = ServerSpecV2.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode ServerV2

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Kind.length > 0
        ? 1 + __proto.Sizer.varint64(this.Kind.length) + this.Kind.length
        : 0;
    size +=
      this.SubKind.length > 0
        ? 1 + __proto.Sizer.varint64(this.SubKind.length) + this.SubKind.length
        : 0;
    size +=
      this.Version.length > 0
        ? 1 + __proto.Sizer.varint64(this.Version.length) + this.Version.length
        : 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Spec != null) {
      const f: ServerSpecV2 = this.Spec as ServerSpecV2;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes ServerV2 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes ServerV2 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Kind.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Kind.length);
      encoder.string(this.Kind);
    }
    if (this.SubKind.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.SubKind.length);
      encoder.string(this.SubKind);
    }
    if (this.Version.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Version.length);
      encoder.string(this.Version);
    }

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Spec != null) {
      const f = this.Spec as ServerSpecV2;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode ServerV2
} // ServerV2

/**
 * ServerV2List is a list of servers.
 *  DELETE IN 8.0.0 only used in deprecated GetNodes rpc
 */
export class ServerV2List {
  // Servers is a list of servers.
  public Servers: Array<ServerV2> = new Array<ServerV2>();

  // Decodes ServerV2List from an ArrayBuffer
  static decode(buf: ArrayBuffer): ServerV2List {
    return ServerV2List.decodeDataView(new DataView(buf));
  }

  // Decodes ServerV2List from a DataView
  static decodeDataView(view: DataView): ServerV2List {
    const decoder = new __proto.Decoder(view);
    const obj = new ServerV2List();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          const length = decoder.uint32();
          obj.Servers.push(
            ServerV2.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length
              )
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode ServerV2List

  public size(): u32 {
    let size: u32 = 0;

    for (let n: i32 = 0; n < this.Servers.length; n++) {
      const messageSize = this.Servers[n].size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes ServerV2List to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes ServerV2List to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    for (let n: i32 = 0; n < this.Servers.length; n++) {
      const messageSize = this.Servers[n].size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        this.Servers[n].encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode ServerV2List
} // ServerV2List

// ServerSpecV2 is a specification for V2 Server
export class ServerSpecV2 {
  // Addr is server host:port address
  public Addr: string = "";
  // PublicAddr is the public address this cluster can be reached at.
  public PublicAddr: string = "";
  // Hostname is server hostname
  public Hostname: string = "";
  // CmdLabels is server dynamic labels
  public CmdLabels: Map<string, CommandLabelV2> = new Map<
    string,
    CommandLabelV2
  >();
  // Rotation specifies server rotation
  public Rotation: Rotation = new Rotation();
  /**
   * UseTunnel indicates that connections to this server should occur over a
   *  reverse tunnel.
   */
  public UseTunnel: bool;
  // TeleportVersion is the teleport version that the server is running on
  public Version: string = "";
  /**
   * Apps is a list of applications this server is proxying.
   *
   *  DELETE IN 9.0. Deprecated, moved to AppServerSpecV3.
   */
  public Apps: Array<App> = new Array<App>();
  /**
   * KubernetesClusters is a list of kubernetes clusters provided by this
   *  Proxy or KubeService server.
   *
   *  Important: jsontag must not be "kubernetes_clusters", because a
   *  different field with that jsontag existed in 4.4:
   *  https://github.com/gravitational/teleport/issues/4862
   */
  public KubernetesClusters: Array<KubernetesCluster> =
    new Array<KubernetesCluster>();

  // Decodes ServerSpecV2 from an ArrayBuffer
  static decode(buf: ArrayBuffer): ServerSpecV2 {
    return ServerSpecV2.decodeDataView(new DataView(buf));
  }

  // Decodes ServerSpecV2 from a DataView
  static decodeDataView(view: DataView): ServerSpecV2 {
    const decoder = new __proto.Decoder(view);
    const obj = new ServerSpecV2();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Addr = decoder.string();
          break;
        }
        case 2: {
          obj.PublicAddr = decoder.string();
          break;
        }
        case 3: {
          obj.Hostname = decoder.string();
          break;
        }
        case 4: {
          const length = decoder.uint32();
          __decodeMap_string_CommandLabelV2(decoder, length, obj.CmdLabels);
          decoder.skip(length);

          break;
        }
        case 5: {
          const length = decoder.uint32();
          obj.Rotation = Rotation.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 6: {
          obj.UseTunnel = decoder.bool();
          break;
        }
        case 7: {
          obj.Version = decoder.string();
          break;
        }
        case 9: {
          const length = decoder.uint32();
          obj.Apps.push(
            App.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length
              )
            )
          );
          decoder.skip(length);

          break;
        }
        case 10: {
          const length = decoder.uint32();
          obj.KubernetesClusters.push(
            KubernetesCluster.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length
              )
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode ServerSpecV2

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Addr.length > 0
        ? 1 + __proto.Sizer.varint64(this.Addr.length) + this.Addr.length
        : 0;
    size +=
      this.PublicAddr.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.PublicAddr.length) +
          this.PublicAddr.length
        : 0;
    size +=
      this.Hostname.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.Hostname.length) +
          this.Hostname.length
        : 0;

    if (this.CmdLabels.size > 0) {
      const keys = this.CmdLabels.keys();

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = this.CmdLabels.get(key);
        const itemSize = __sizeMapEntry_string_CommandLabelV2(key, value);
        if (itemSize > 0) {
          size += 1 + __proto.Sizer.varint64(itemSize) + itemSize;
        }
      }
    }

    if (this.Rotation != null) {
      const f: Rotation = this.Rotation as Rotation;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size += this.UseTunnel == 0 ? 0 : 1 + 1;
    size +=
      this.Version.length > 0
        ? 1 + __proto.Sizer.varint64(this.Version.length) + this.Version.length
        : 0;

    for (let n: i32 = 0; n < this.Apps.length; n++) {
      const messageSize = this.Apps[n].size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    for (let n: i32 = 0; n < this.KubernetesClusters.length; n++) {
      const messageSize = this.KubernetesClusters[n].size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes ServerSpecV2 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes ServerSpecV2 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Addr.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Addr.length);
      encoder.string(this.Addr);
    }
    if (this.PublicAddr.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.PublicAddr.length);
      encoder.string(this.PublicAddr);
    }
    if (this.Hostname.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Hostname.length);
      encoder.string(this.Hostname);
    }

    if (this.CmdLabels.size > 0) {
      const keys = this.CmdLabels.keys();
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = this.CmdLabels.get(key);
        const size = __sizeMapEntry_string_CommandLabelV2(key, value);
        if (size > 0) {
          encoder.uint32(0x22);
          encoder.uint32(size);
          if (key.length > 0) {
            encoder.uint32(0xa);
            encoder.uint32(key.length);
            encoder.string(key);
          }

          const messageSize = value.size();

          if (messageSize > 0) {
            encoder.uint32(0x12);
            encoder.uint32(messageSize);
            value.encodeU8Array(encoder);
          }
        }
      }
    }

    if (this.Rotation != null) {
      const f = this.Rotation as Rotation;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.UseTunnel != 0) {
      encoder.uint32(0x30);
      encoder.bool(this.UseTunnel);
    }
    if (this.Version.length > 0) {
      encoder.uint32(0x3a);
      encoder.uint32(this.Version.length);
      encoder.string(this.Version);
    }

    for (let n: i32 = 0; n < this.Apps.length; n++) {
      const messageSize = this.Apps[n].size();

      if (messageSize > 0) {
        encoder.uint32(0x4a);
        encoder.uint32(messageSize);
        this.Apps[n].encodeU8Array(encoder);
      }
    }

    for (let n: i32 = 0; n < this.KubernetesClusters.length; n++) {
      const messageSize = this.KubernetesClusters[n].size();

      if (messageSize > 0) {
        encoder.uint32(0x52);
        encoder.uint32(messageSize);
        this.KubernetesClusters[n].encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode ServerSpecV2
} // ServerSpecV2

// AppServerV3 represents a single proxied web app.
export class AppServerV3 {
  // Kind is the app server resource kind. Always "app_server".
  public Kind: string = "";
  // SubKind is an optional resource subkind.
  public SubKind: string = "";
  // Version is the resource version.
  public Version: string = "";
  // Metadata is the app server metadata.
  public Metadata: Metadata = new Metadata();
  // Spec is the app server spec.
  public Spec: AppServerSpecV3 = new AppServerSpecV3();

  // Decodes AppServerV3 from an ArrayBuffer
  static decode(buf: ArrayBuffer): AppServerV3 {
    return AppServerV3.decodeDataView(new DataView(buf));
  }

  // Decodes AppServerV3 from a DataView
  static decodeDataView(view: DataView): AppServerV3 {
    const decoder = new __proto.Decoder(view);
    const obj = new AppServerV3();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Kind = decoder.string();
          break;
        }
        case 2: {
          obj.SubKind = decoder.string();
          break;
        }
        case 3: {
          obj.Version = decoder.string();
          break;
        }
        case 4: {
          const length = decoder.uint32();
          obj.Metadata = Metadata.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 5: {
          const length = decoder.uint32();
          obj.Spec = AppServerSpecV3.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode AppServerV3

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Kind.length > 0
        ? 1 + __proto.Sizer.varint64(this.Kind.length) + this.Kind.length
        : 0;
    size +=
      this.SubKind.length > 0
        ? 1 + __proto.Sizer.varint64(this.SubKind.length) + this.SubKind.length
        : 0;
    size +=
      this.Version.length > 0
        ? 1 + __proto.Sizer.varint64(this.Version.length) + this.Version.length
        : 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Spec != null) {
      const f: AppServerSpecV3 = this.Spec as AppServerSpecV3;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes AppServerV3 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes AppServerV3 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Kind.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Kind.length);
      encoder.string(this.Kind);
    }
    if (this.SubKind.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.SubKind.length);
      encoder.string(this.SubKind);
    }
    if (this.Version.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Version.length);
      encoder.string(this.Version);
    }

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Spec != null) {
      const f = this.Spec as AppServerSpecV3;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode AppServerV3
} // AppServerV3

// AppServerSpecV3 is the app access server spec.
export class AppServerSpecV3 {
  // Version is the Teleport version that the server is running.
  public Version: string = "";
  // Hostname is the app server hostname.
  public Hostname: string = "";
  // HostID is the app server host uuid.
  public HostID: string = "";
  // Rotation contains the app server CA rotation information.
  public Rotation: Rotation = new Rotation();
  // App is the app proxied by this app server.
  public App: AppV3 = new AppV3();

  // Decodes AppServerSpecV3 from an ArrayBuffer
  static decode(buf: ArrayBuffer): AppServerSpecV3 {
    return AppServerSpecV3.decodeDataView(new DataView(buf));
  }

  // Decodes AppServerSpecV3 from a DataView
  static decodeDataView(view: DataView): AppServerSpecV3 {
    const decoder = new __proto.Decoder(view);
    const obj = new AppServerSpecV3();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Version = decoder.string();
          break;
        }
        case 2: {
          obj.Hostname = decoder.string();
          break;
        }
        case 3: {
          obj.HostID = decoder.string();
          break;
        }
        case 4: {
          const length = decoder.uint32();
          obj.Rotation = Rotation.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 5: {
          const length = decoder.uint32();
          obj.App = AppV3.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode AppServerSpecV3

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Version.length > 0
        ? 1 + __proto.Sizer.varint64(this.Version.length) + this.Version.length
        : 0;
    size +=
      this.Hostname.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.Hostname.length) +
          this.Hostname.length
        : 0;
    size +=
      this.HostID.length > 0
        ? 1 + __proto.Sizer.varint64(this.HostID.length) + this.HostID.length
        : 0;

    if (this.Rotation != null) {
      const f: Rotation = this.Rotation as Rotation;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.App != null) {
      const f: AppV3 = this.App as AppV3;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes AppServerSpecV3 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes AppServerSpecV3 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Version.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Version.length);
      encoder.string(this.Version);
    }
    if (this.Hostname.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.Hostname.length);
      encoder.string(this.Hostname);
    }
    if (this.HostID.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.HostID.length);
      encoder.string(this.HostID);
    }

    if (this.Rotation != null) {
      const f = this.Rotation as Rotation;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.App != null) {
      const f = this.App as AppV3;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode AppServerSpecV3
} // AppServerSpecV3

// AppV3List represents a list of app resources.
export class AppV3List {
  // Apps is a list of app resources.
  public Apps: Array<AppV3> = new Array<AppV3>();

  // Decodes AppV3List from an ArrayBuffer
  static decode(buf: ArrayBuffer): AppV3List {
    return AppV3List.decodeDataView(new DataView(buf));
  }

  // Decodes AppV3List from a DataView
  static decodeDataView(view: DataView): AppV3List {
    const decoder = new __proto.Decoder(view);
    const obj = new AppV3List();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          const length = decoder.uint32();
          obj.Apps.push(
            AppV3.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length
              )
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode AppV3List

  public size(): u32 {
    let size: u32 = 0;

    for (let n: i32 = 0; n < this.Apps.length; n++) {
      const messageSize = this.Apps[n].size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes AppV3List to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes AppV3List to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    for (let n: i32 = 0; n < this.Apps.length; n++) {
      const messageSize = this.Apps[n].size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        this.Apps[n].encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode AppV3List
} // AppV3List

// AppV3 represents an app resource.
export class AppV3 {
  // Kind is the app resource kind. Always "app".
  public Kind: string = "";
  // SubKind is an optional resource subkind.
  public SubKind: string = "";
  // Version is the resource version.
  public Version: string = "";
  // Metadata is the app resource metadata.
  public Metadata: Metadata = new Metadata();
  // Spec is the app resource spec.
  public Spec: AppSpecV3 = new AppSpecV3();

  // Decodes AppV3 from an ArrayBuffer
  static decode(buf: ArrayBuffer): AppV3 {
    return AppV3.decodeDataView(new DataView(buf));
  }

  // Decodes AppV3 from a DataView
  static decodeDataView(view: DataView): AppV3 {
    const decoder = new __proto.Decoder(view);
    const obj = new AppV3();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Kind = decoder.string();
          break;
        }
        case 2: {
          obj.SubKind = decoder.string();
          break;
        }
        case 3: {
          obj.Version = decoder.string();
          break;
        }
        case 4: {
          const length = decoder.uint32();
          obj.Metadata = Metadata.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 5: {
          const length = decoder.uint32();
          obj.Spec = AppSpecV3.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode AppV3

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Kind.length > 0
        ? 1 + __proto.Sizer.varint64(this.Kind.length) + this.Kind.length
        : 0;
    size +=
      this.SubKind.length > 0
        ? 1 + __proto.Sizer.varint64(this.SubKind.length) + this.SubKind.length
        : 0;
    size +=
      this.Version.length > 0
        ? 1 + __proto.Sizer.varint64(this.Version.length) + this.Version.length
        : 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Spec != null) {
      const f: AppSpecV3 = this.Spec as AppSpecV3;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes AppV3 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes AppV3 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Kind.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Kind.length);
      encoder.string(this.Kind);
    }
    if (this.SubKind.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.SubKind.length);
      encoder.string(this.SubKind);
    }
    if (this.Version.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Version.length);
      encoder.string(this.Version);
    }

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Spec != null) {
      const f = this.Spec as AppSpecV3;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode AppV3
} // AppV3

// AppSpecV3 is the AppV3 resource spec.
export class AppSpecV3 {
  // URI is the web app endpoint.
  public URI: string = "";
  // PublicAddr is the public address the application is accessible at.
  public PublicAddr: string = "";
  // DynamicLabels are the app's command labels.
  public DynamicLabels: Map<string, CommandLabelV2> = new Map<
    string,
    CommandLabelV2
  >();
  // InsecureSkipVerify disables app's TLS certificate verification.
  public InsecureSkipVerify: bool;
  // Rewrite is a list of rewriting rules to apply to requests and responses.
  public Rewrite: Rewrite = new Rewrite();

  // Decodes AppSpecV3 from an ArrayBuffer
  static decode(buf: ArrayBuffer): AppSpecV3 {
    return AppSpecV3.decodeDataView(new DataView(buf));
  }

  // Decodes AppSpecV3 from a DataView
  static decodeDataView(view: DataView): AppSpecV3 {
    const decoder = new __proto.Decoder(view);
    const obj = new AppSpecV3();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.URI = decoder.string();
          break;
        }
        case 2: {
          obj.PublicAddr = decoder.string();
          break;
        }
        case 3: {
          const length = decoder.uint32();
          __decodeMap_string_CommandLabelV2(decoder, length, obj.DynamicLabels);
          decoder.skip(length);

          break;
        }
        case 4: {
          obj.InsecureSkipVerify = decoder.bool();
          break;
        }
        case 5: {
          const length = decoder.uint32();
          obj.Rewrite = Rewrite.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode AppSpecV3

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.URI.length > 0
        ? 1 + __proto.Sizer.varint64(this.URI.length) + this.URI.length
        : 0;
    size +=
      this.PublicAddr.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.PublicAddr.length) +
          this.PublicAddr.length
        : 0;

    if (this.DynamicLabels.size > 0) {
      const keys = this.DynamicLabels.keys();

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = this.DynamicLabels.get(key);
        const itemSize = __sizeMapEntry_string_CommandLabelV2(key, value);
        if (itemSize > 0) {
          size += 1 + __proto.Sizer.varint64(itemSize) + itemSize;
        }
      }
    }

    size += this.InsecureSkipVerify == 0 ? 0 : 1 + 1;

    if (this.Rewrite != null) {
      const f: Rewrite = this.Rewrite as Rewrite;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes AppSpecV3 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes AppSpecV3 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.URI.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.URI.length);
      encoder.string(this.URI);
    }
    if (this.PublicAddr.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.PublicAddr.length);
      encoder.string(this.PublicAddr);
    }

    if (this.DynamicLabels.size > 0) {
      const keys = this.DynamicLabels.keys();
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = this.DynamicLabels.get(key);
        const size = __sizeMapEntry_string_CommandLabelV2(key, value);
        if (size > 0) {
          encoder.uint32(0x1a);
          encoder.uint32(size);
          if (key.length > 0) {
            encoder.uint32(0xa);
            encoder.uint32(key.length);
            encoder.string(key);
          }

          const messageSize = value.size();

          if (messageSize > 0) {
            encoder.uint32(0x12);
            encoder.uint32(messageSize);
            value.encodeU8Array(encoder);
          }
        }
      }
    }

    if (this.InsecureSkipVerify != 0) {
      encoder.uint32(0x20);
      encoder.bool(this.InsecureSkipVerify);
    }

    if (this.Rewrite != null) {
      const f = this.Rewrite as Rewrite;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode AppSpecV3
} // AppSpecV3

/**
 * App is a specific application that a server proxies.
 *
 *  DELETE IN 9.0. Deprecated, use AppV3.
 */
export class App {
  // Name is the name of the application.
  public Name: string = "";
  // URI is the internal address the application is available at.
  public URI: string = "";
  // PublicAddr is the public address the application is accessible at.
  public PublicAddr: string = "";
  /**
   * StaticLabels is map of static labels associated with an application.
   *  Used for RBAC.
   */
  public StaticLabels: Map<string, string> = new Map<string, string>();
  /**
   * DynamicLabels is map of dynamic labels associated with an application.
   *  Used for RBAC.
   */
  public DynamicLabels: Map<string, CommandLabelV2> = new Map<
    string,
    CommandLabelV2
  >();
  // InsecureSkipVerify disables app's TLS certificate verification.
  public InsecureSkipVerify: bool;
  // Rewrite is a list of rewriting rules to apply to requests and responses.
  public Rewrite: Rewrite = new Rewrite();
  // Description is an optional free-form app description.
  public Description: string = "";

  // Decodes App from an ArrayBuffer
  static decode(buf: ArrayBuffer): App {
    return App.decodeDataView(new DataView(buf));
  }

  // Decodes App from a DataView
  static decodeDataView(view: DataView): App {
    const decoder = new __proto.Decoder(view);
    const obj = new App();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Name = decoder.string();
          break;
        }
        case 2: {
          obj.URI = decoder.string();
          break;
        }
        case 3: {
          obj.PublicAddr = decoder.string();
          break;
        }
        case 4: {
          const length = decoder.uint32();
          __decodeMap_string_string(decoder, length, obj.StaticLabels);
          decoder.skip(length);

          break;
        }
        case 5: {
          const length = decoder.uint32();
          __decodeMap_string_CommandLabelV2(decoder, length, obj.DynamicLabels);
          decoder.skip(length);

          break;
        }
        case 6: {
          obj.InsecureSkipVerify = decoder.bool();
          break;
        }
        case 7: {
          const length = decoder.uint32();
          obj.Rewrite = Rewrite.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 8: {
          obj.Description = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode App

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Name.length > 0
        ? 1 + __proto.Sizer.varint64(this.Name.length) + this.Name.length
        : 0;
    size +=
      this.URI.length > 0
        ? 1 + __proto.Sizer.varint64(this.URI.length) + this.URI.length
        : 0;
    size +=
      this.PublicAddr.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.PublicAddr.length) +
          this.PublicAddr.length
        : 0;

    if (this.StaticLabels.size > 0) {
      const keys = this.StaticLabels.keys();

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = this.StaticLabels.get(key);
        const itemSize = __sizeMapEntry_string_string(key, value);
        if (itemSize > 0) {
          size += 1 + __proto.Sizer.varint64(itemSize) + itemSize;
        }
      }
    }

    if (this.DynamicLabels.size > 0) {
      const keys = this.DynamicLabels.keys();

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = this.DynamicLabels.get(key);
        const itemSize = __sizeMapEntry_string_CommandLabelV2(key, value);
        if (itemSize > 0) {
          size += 1 + __proto.Sizer.varint64(itemSize) + itemSize;
        }
      }
    }

    size += this.InsecureSkipVerify == 0 ? 0 : 1 + 1;

    if (this.Rewrite != null) {
      const f: Rewrite = this.Rewrite as Rewrite;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.Description.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.Description.length) +
          this.Description.length
        : 0;

    return size;
  }

  // Encodes App to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes App to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Name.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Name.length);
      encoder.string(this.Name);
    }
    if (this.URI.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.URI.length);
      encoder.string(this.URI);
    }
    if (this.PublicAddr.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.PublicAddr.length);
      encoder.string(this.PublicAddr);
    }

    if (this.StaticLabels.size > 0) {
      const keys = this.StaticLabels.keys();
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = this.StaticLabels.get(key);
        const size = __sizeMapEntry_string_string(key, value);
        if (size > 0) {
          encoder.uint32(0x22);
          encoder.uint32(size);
          if (key.length > 0) {
            encoder.uint32(0xa);
            encoder.uint32(key.length);
            encoder.string(key);
          }
          if (value.length > 0) {
            encoder.uint32(0x12);
            encoder.uint32(value.length);
            encoder.string(value);
          }
        }
      }
    }

    if (this.DynamicLabels.size > 0) {
      const keys = this.DynamicLabels.keys();
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = this.DynamicLabels.get(key);
        const size = __sizeMapEntry_string_CommandLabelV2(key, value);
        if (size > 0) {
          encoder.uint32(0x2a);
          encoder.uint32(size);
          if (key.length > 0) {
            encoder.uint32(0xa);
            encoder.uint32(key.length);
            encoder.string(key);
          }

          const messageSize = value.size();

          if (messageSize > 0) {
            encoder.uint32(0x12);
            encoder.uint32(messageSize);
            value.encodeU8Array(encoder);
          }
        }
      }
    }

    if (this.InsecureSkipVerify != 0) {
      encoder.uint32(0x30);
      encoder.bool(this.InsecureSkipVerify);
    }

    if (this.Rewrite != null) {
      const f = this.Rewrite as Rewrite;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x3a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Description.length > 0) {
      encoder.uint32(0x42);
      encoder.uint32(this.Description.length);
      encoder.string(this.Description);
    }

    return buf;
  } // encode App
} // App

// Rewrite is a list of rewriting rules to apply to requests and responses.
export class Rewrite {
  /**
   * Redirect defines a list of hosts which will be rewritten to the public
   *  address of the application if they occur in the "Location" header.
   */
  public Redirect: Array<string> = new Array<string>();
  /**
   * Headers is a list of headers to inject when passing the request over
   *  to the application.
   */
  public Headers: Array<Header> = new Array<Header>();

  // Decodes Rewrite from an ArrayBuffer
  static decode(buf: ArrayBuffer): Rewrite {
    return Rewrite.decodeDataView(new DataView(buf));
  }

  // Decodes Rewrite from a DataView
  static decodeDataView(view: DataView): Rewrite {
    const decoder = new __proto.Decoder(view);
    const obj = new Rewrite();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Redirect.push(decoder.string());
          break;
        }
        case 2: {
          const length = decoder.uint32();
          obj.Headers.push(
            Header.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length
              )
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode Rewrite

  public size(): u32 {
    let size: u32 = 0;

    size += __size_string_repeated(this.Redirect);

    for (let n: i32 = 0; n < this.Headers.length; n++) {
      const messageSize = this.Headers[n].size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes Rewrite to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes Rewrite to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Redirect.length > 0) {
      for (let n: i32 = 0; n < this.Redirect.length; n++) {
        encoder.uint32(0xa);
        encoder.uint32(this.Redirect[n].length);
        encoder.string(this.Redirect[n]);
      }
    }

    for (let n: i32 = 0; n < this.Headers.length; n++) {
      const messageSize = this.Headers[n].size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        this.Headers[n].encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode Rewrite
} // Rewrite

// Header represents a single http header passed over to the proxied application.
export class Header {
  // Name is the http header name.
  public Name: string = "";
  // Value is the http header value.
  public Value: string = "";

  // Decodes Header from an ArrayBuffer
  static decode(buf: ArrayBuffer): Header {
    return Header.decodeDataView(new DataView(buf));
  }

  // Decodes Header from a DataView
  static decodeDataView(view: DataView): Header {
    const decoder = new __proto.Decoder(view);
    const obj = new Header();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Name = decoder.string();
          break;
        }
        case 2: {
          obj.Value = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode Header

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Name.length > 0
        ? 1 + __proto.Sizer.varint64(this.Name.length) + this.Name.length
        : 0;
    size +=
      this.Value.length > 0
        ? 1 + __proto.Sizer.varint64(this.Value.length) + this.Value.length
        : 0;

    return size;
  }

  // Encodes Header to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes Header to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Name.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Name.length);
      encoder.string(this.Name);
    }
    if (this.Value.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.Value.length);
      encoder.string(this.Value);
    }

    return buf;
  } // encode Header
} // Header

/**
 * CommandLabelV2 is a label that has a value as a result of the
 *  output generated by running command, e.g. hostname
 */
export class CommandLabelV2 {
  // Period is a time between command runs
  public Period: i64;
  // Command is a command to run
  public Command: Array<string> = new Array<string>();
  // Result captures standard output
  public Result: string = "";

  // Decodes CommandLabelV2 from an ArrayBuffer
  static decode(buf: ArrayBuffer): CommandLabelV2 {
    return CommandLabelV2.decodeDataView(new DataView(buf));
  }

  // Decodes CommandLabelV2 from a DataView
  static decodeDataView(view: DataView): CommandLabelV2 {
    const decoder = new __proto.Decoder(view);
    const obj = new CommandLabelV2();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Period = decoder.int64();
          break;
        }
        case 2: {
          obj.Command.push(decoder.string());
          break;
        }
        case 3: {
          obj.Result = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode CommandLabelV2

  public size(): u32 {
    let size: u32 = 0;

    size += this.Period == 0 ? 0 : 1 + __proto.Sizer.int64(this.Period);

    size += __size_string_repeated(this.Command);

    size +=
      this.Result.length > 0
        ? 1 + __proto.Sizer.varint64(this.Result.length) + this.Result.length
        : 0;

    return size;
  }

  // Encodes CommandLabelV2 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes CommandLabelV2 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Period != 0) {
      encoder.uint32(0x8);
      encoder.int64(this.Period);
    }

    if (this.Command.length > 0) {
      for (let n: i32 = 0; n < this.Command.length; n++) {
        encoder.uint32(0x12);
        encoder.uint32(this.Command[n].length);
        encoder.string(this.Command[n]);
      }
    }

    if (this.Result.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Result.length);
      encoder.string(this.Result);
    }

    return buf;
  } // encode CommandLabelV2
} // CommandLabelV2

// SSHKeyPair is an SSH CA key pair.
export class SSHKeyPair {
  // PublicKey is the SSH public key.
  public PublicKey: Array<u8> = new Array<u8>();
  // PrivateKey is the SSH private key.
  public PrivateKey: Array<u8> = new Array<u8>();
  // PrivateKeyType is the type of the PrivateKey.
  public PrivateKeyType: u32;

  // Decodes SSHKeyPair from an ArrayBuffer
  static decode(buf: ArrayBuffer): SSHKeyPair {
    return SSHKeyPair.decodeDataView(new DataView(buf));
  }

  // Decodes SSHKeyPair from a DataView
  static decodeDataView(view: DataView): SSHKeyPair {
    const decoder = new __proto.Decoder(view);
    const obj = new SSHKeyPair();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.PublicKey = decoder.bytes();
          break;
        }
        case 2: {
          obj.PrivateKey = decoder.bytes();
          break;
        }
        case 3: {
          obj.PrivateKeyType = decoder.uint32();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode SSHKeyPair

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.PublicKey.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.PublicKey.length) +
          this.PublicKey.length
        : 0;
    size +=
      this.PrivateKey.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.PrivateKey.length) +
          this.PrivateKey.length
        : 0;
    size +=
      this.PrivateKeyType == 0
        ? 0
        : 1 + __proto.Sizer.uint32(this.PrivateKeyType);

    return size;
  }

  // Encodes SSHKeyPair to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes SSHKeyPair to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.PublicKey.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.PublicKey.length);
      encoder.bytes(this.PublicKey);
    }
    if (this.PrivateKey.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.PrivateKey.length);
      encoder.bytes(this.PrivateKey);
    }
    if (this.PrivateKeyType != 0) {
      encoder.uint32(0x18);
      encoder.uint32(this.PrivateKeyType);
    }

    return buf;
  } // encode SSHKeyPair
} // SSHKeyPair

// TLSKeyPair is a TLS key pair
export class TLSKeyPair {
  // Cert is a PEM encoded TLS cert
  public Cert: Array<u8> = new Array<u8>();
  // Key is a PEM encoded TLS key
  public Key: Array<u8> = new Array<u8>();
  // KeyType is the type of the Key.
  public KeyType: u32;

  // Decodes TLSKeyPair from an ArrayBuffer
  static decode(buf: ArrayBuffer): TLSKeyPair {
    return TLSKeyPair.decodeDataView(new DataView(buf));
  }

  // Decodes TLSKeyPair from a DataView
  static decodeDataView(view: DataView): TLSKeyPair {
    const decoder = new __proto.Decoder(view);
    const obj = new TLSKeyPair();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Cert = decoder.bytes();
          break;
        }
        case 2: {
          obj.Key = decoder.bytes();
          break;
        }
        case 3: {
          obj.KeyType = decoder.uint32();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode TLSKeyPair

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Cert.length > 0
        ? 1 + __proto.Sizer.varint64(this.Cert.length) + this.Cert.length
        : 0;
    size +=
      this.Key.length > 0
        ? 1 + __proto.Sizer.varint64(this.Key.length) + this.Key.length
        : 0;
    size += this.KeyType == 0 ? 0 : 1 + __proto.Sizer.uint32(this.KeyType);

    return size;
  }

  // Encodes TLSKeyPair to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes TLSKeyPair to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Cert.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Cert.length);
      encoder.bytes(this.Cert);
    }
    if (this.Key.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.Key.length);
      encoder.bytes(this.Key);
    }
    if (this.KeyType != 0) {
      encoder.uint32(0x18);
      encoder.uint32(this.KeyType);
    }

    return buf;
  } // encode TLSKeyPair
} // TLSKeyPair

// JWTKeyPair is a PEM encoded keypair used for signing JWT tokens.
export class JWTKeyPair {
  // PublicKey is a PEM encoded public key.
  public PublicKey: Array<u8> = new Array<u8>();
  // PrivateKey is a PEM encoded private key.
  public PrivateKey: Array<u8> = new Array<u8>();
  // PrivateKeyType is the type of the PrivateKey.
  public PrivateKeyType: u32;

  // Decodes JWTKeyPair from an ArrayBuffer
  static decode(buf: ArrayBuffer): JWTKeyPair {
    return JWTKeyPair.decodeDataView(new DataView(buf));
  }

  // Decodes JWTKeyPair from a DataView
  static decodeDataView(view: DataView): JWTKeyPair {
    const decoder = new __proto.Decoder(view);
    const obj = new JWTKeyPair();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.PublicKey = decoder.bytes();
          break;
        }
        case 2: {
          obj.PrivateKey = decoder.bytes();
          break;
        }
        case 3: {
          obj.PrivateKeyType = decoder.uint32();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode JWTKeyPair

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.PublicKey.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.PublicKey.length) +
          this.PublicKey.length
        : 0;
    size +=
      this.PrivateKey.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.PrivateKey.length) +
          this.PrivateKey.length
        : 0;
    size +=
      this.PrivateKeyType == 0
        ? 0
        : 1 + __proto.Sizer.uint32(this.PrivateKeyType);

    return size;
  }

  // Encodes JWTKeyPair to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes JWTKeyPair to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.PublicKey.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.PublicKey.length);
      encoder.bytes(this.PublicKey);
    }
    if (this.PrivateKey.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.PrivateKey.length);
      encoder.bytes(this.PrivateKey);
    }
    if (this.PrivateKeyType != 0) {
      encoder.uint32(0x18);
      encoder.uint32(this.PrivateKeyType);
    }

    return buf;
  } // encode JWTKeyPair
} // JWTKeyPair

// CertAuthorityV2 is version 2 resource spec for Cert Authority
export class CertAuthorityV2 {
  // Kind is a resource kind
  public Kind: string = "";
  // SubKind is an optional resource sub kind, used in some resources
  public SubKind: string = "";
  // Version is version
  public Version: string = "";
  // Metadata is connector metadata
  public Metadata: Metadata = new Metadata();
  // Spec contains cert authority specification
  public Spec: CertAuthoritySpecV2 = new CertAuthoritySpecV2();

  // Decodes CertAuthorityV2 from an ArrayBuffer
  static decode(buf: ArrayBuffer): CertAuthorityV2 {
    return CertAuthorityV2.decodeDataView(new DataView(buf));
  }

  // Decodes CertAuthorityV2 from a DataView
  static decodeDataView(view: DataView): CertAuthorityV2 {
    const decoder = new __proto.Decoder(view);
    const obj = new CertAuthorityV2();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Kind = decoder.string();
          break;
        }
        case 2: {
          obj.SubKind = decoder.string();
          break;
        }
        case 3: {
          obj.Version = decoder.string();
          break;
        }
        case 4: {
          const length = decoder.uint32();
          obj.Metadata = Metadata.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 5: {
          const length = decoder.uint32();
          obj.Spec = CertAuthoritySpecV2.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode CertAuthorityV2

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Kind.length > 0
        ? 1 + __proto.Sizer.varint64(this.Kind.length) + this.Kind.length
        : 0;
    size +=
      this.SubKind.length > 0
        ? 1 + __proto.Sizer.varint64(this.SubKind.length) + this.SubKind.length
        : 0;
    size +=
      this.Version.length > 0
        ? 1 + __proto.Sizer.varint64(this.Version.length) + this.Version.length
        : 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Spec != null) {
      const f: CertAuthoritySpecV2 = this.Spec as CertAuthoritySpecV2;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes CertAuthorityV2 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes CertAuthorityV2 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Kind.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Kind.length);
      encoder.string(this.Kind);
    }
    if (this.SubKind.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.SubKind.length);
      encoder.string(this.SubKind);
    }
    if (this.Version.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Version.length);
      encoder.string(this.Version);
    }

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Spec != null) {
      const f = this.Spec as CertAuthoritySpecV2;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode CertAuthorityV2
} // CertAuthorityV2

/**
 * CertAuthoritySpecV2 is a host or user certificate authority that
 *  can check and if it has private key stored as well, sign it too
 */
export class CertAuthoritySpecV2 {
  // Type is either user or host certificate authority
  public Type: string = "";
  /**
   * DELETE IN(2.7.0) this field is deprecated,
   *  as resource name matches cluster name after migrations.
   *  and this property is enforced by the auth server code.
   *  ClusterName identifies cluster name this authority serves,
   *  for host authorities that means base hostname of all servers,
   *  for user authorities that means organization name
   */
  public ClusterName: string = "";
  /**
   * Checkers is a list of SSH public keys that can be used to check
   *  certificate signatures
   *
   *  DEPRECATED: use ActiveKeys and AdditionalTrustedKeys instead.
   */
  public CheckingKeys: Array<Array<u8>> = new Array<Array<u8>>();
  /**
   * SigningKeys is a list of private keys used for signing
   *
   *  DEPRECATED: use ActiveKeys instead.
   */
  public SigningKeys: Array<Array<u8>> = new Array<Array<u8>>();
  // Roles is a list of roles assumed by users signed by this CA
  public Roles: Array<string> = new Array<string>();
  // RoleMap specifies role mappings to remote roles
  public RoleMap: Array<RoleMapping> = new Array<RoleMapping>();
  /**
   * TLS is a list of TLS key pairs
   *
   *  DEPRECATED: use ActiveKeys and AdditionalTrustedKeys instead.
   */
  public TLSKeyPairs: Array<TLSKeyPair> = new Array<TLSKeyPair>();
  // Rotation is a status of the certificate authority rotation
  public Rotation: Rotation = new Rotation();
  public SigningAlg: u32;
  /**
   * JWTKeyPair is a list of JWT key pairs.
   *
   *  DEPRECATED: use ActiveKeys and AdditionalTrustedKeys instead.
   */
  public JWTKeyPairs: Array<JWTKeyPair> = new Array<JWTKeyPair>();
  // ActiveKeys are the CA key sets used to sign any new certificates.
  public ActiveKeys: CAKeySet = new CAKeySet();
  /**
   * AdditionalTrustedKeys are additional CA key sets that can be used to
   *  verify certificates. Certificates should be verified with
   *  AdditionalTrustedKeys and ActiveKeys combined.
   */
  public AdditionalTrustedKeys: CAKeySet = new CAKeySet();

  // Decodes CertAuthoritySpecV2 from an ArrayBuffer
  static decode(buf: ArrayBuffer): CertAuthoritySpecV2 {
    return CertAuthoritySpecV2.decodeDataView(new DataView(buf));
  }

  // Decodes CertAuthoritySpecV2 from a DataView
  static decodeDataView(view: DataView): CertAuthoritySpecV2 {
    const decoder = new __proto.Decoder(view);
    const obj = new CertAuthoritySpecV2();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Type = decoder.string();
          break;
        }
        case 2: {
          obj.ClusterName = decoder.string();
          break;
        }
        case 3: {
          obj.CheckingKeys.push(decoder.bytes());
          break;
        }
        case 4: {
          obj.SigningKeys.push(decoder.bytes());
          break;
        }
        case 5: {
          obj.Roles.push(decoder.string());
          break;
        }
        case 6: {
          const length = decoder.uint32();
          obj.RoleMap.push(
            RoleMapping.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length
              )
            )
          );
          decoder.skip(length);

          break;
        }
        case 7: {
          const length = decoder.uint32();
          obj.TLSKeyPairs.push(
            TLSKeyPair.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length
              )
            )
          );
          decoder.skip(length);

          break;
        }
        case 8: {
          const length = decoder.uint32();
          obj.Rotation = Rotation.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 9: {
          obj.SigningAlg = decoder.uint32();
          break;
        }
        case 10: {
          const length = decoder.uint32();
          obj.JWTKeyPairs.push(
            JWTKeyPair.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length
              )
            )
          );
          decoder.skip(length);

          break;
        }
        case 11: {
          const length = decoder.uint32();
          obj.ActiveKeys = CAKeySet.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 12: {
          const length = decoder.uint32();
          obj.AdditionalTrustedKeys = CAKeySet.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode CertAuthoritySpecV2

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Type.length > 0
        ? 1 + __proto.Sizer.varint64(this.Type.length) + this.Type.length
        : 0;
    size +=
      this.ClusterName.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.ClusterName.length) +
          this.ClusterName.length
        : 0;

    size += __size_bytes_repeated(this.CheckingKeys);

    size += __size_bytes_repeated(this.SigningKeys);

    size += __size_string_repeated(this.Roles);

    for (let n: i32 = 0; n < this.RoleMap.length; n++) {
      const messageSize = this.RoleMap[n].size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    for (let n: i32 = 0; n < this.TLSKeyPairs.length; n++) {
      const messageSize = this.TLSKeyPairs[n].size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Rotation != null) {
      const f: Rotation = this.Rotation as Rotation;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.SigningAlg == 0 ? 0 : 1 + __proto.Sizer.uint32(this.SigningAlg);

    for (let n: i32 = 0; n < this.JWTKeyPairs.length; n++) {
      const messageSize = this.JWTKeyPairs[n].size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.ActiveKeys != null) {
      const f: CAKeySet = this.ActiveKeys as CAKeySet;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.AdditionalTrustedKeys != null) {
      const f: CAKeySet = this.AdditionalTrustedKeys as CAKeySet;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes CertAuthoritySpecV2 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes CertAuthoritySpecV2 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Type.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Type.length);
      encoder.string(this.Type);
    }
    if (this.ClusterName.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.ClusterName.length);
      encoder.string(this.ClusterName);
    }

    if (this.CheckingKeys.length > 0) {
      for (let n: i32 = 0; n < this.CheckingKeys.length; n++) {
        encoder.uint32(0x1a);
        encoder.uint32(this.CheckingKeys[n].length);
        encoder.bytes(this.CheckingKeys[n]);
      }
    }

    if (this.SigningKeys.length > 0) {
      for (let n: i32 = 0; n < this.SigningKeys.length; n++) {
        encoder.uint32(0x22);
        encoder.uint32(this.SigningKeys[n].length);
        encoder.bytes(this.SigningKeys[n]);
      }
    }

    if (this.Roles.length > 0) {
      for (let n: i32 = 0; n < this.Roles.length; n++) {
        encoder.uint32(0x2a);
        encoder.uint32(this.Roles[n].length);
        encoder.string(this.Roles[n]);
      }
    }

    for (let n: i32 = 0; n < this.RoleMap.length; n++) {
      const messageSize = this.RoleMap[n].size();

      if (messageSize > 0) {
        encoder.uint32(0x32);
        encoder.uint32(messageSize);
        this.RoleMap[n].encodeU8Array(encoder);
      }
    }

    for (let n: i32 = 0; n < this.TLSKeyPairs.length; n++) {
      const messageSize = this.TLSKeyPairs[n].size();

      if (messageSize > 0) {
        encoder.uint32(0x3a);
        encoder.uint32(messageSize);
        this.TLSKeyPairs[n].encodeU8Array(encoder);
      }
    }

    if (this.Rotation != null) {
      const f = this.Rotation as Rotation;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x42);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.SigningAlg != 0) {
      encoder.uint32(0x48);
      encoder.uint32(this.SigningAlg);
    }

    for (let n: i32 = 0; n < this.JWTKeyPairs.length; n++) {
      const messageSize = this.JWTKeyPairs[n].size();

      if (messageSize > 0) {
        encoder.uint32(0x52);
        encoder.uint32(messageSize);
        this.JWTKeyPairs[n].encodeU8Array(encoder);
      }
    }

    if (this.ActiveKeys != null) {
      const f = this.ActiveKeys as CAKeySet;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x5a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.AdditionalTrustedKeys != null) {
      const f = this.AdditionalTrustedKeys as CAKeySet;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x62);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode CertAuthoritySpecV2
} // CertAuthoritySpecV2

/**
 * SigningAlg is the algorithm used for signing new SSH certificates using
 *  SigningKeys.
 */
export enum CertAuthoritySpecV2_SigningAlgType {
  UNKNOWN = 0,
  RSA_SHA1 = 1,
  RSA_SHA2_256 = 2,
  RSA_SHA2_512 = 3,
} // CertAuthoritySpecV2_SigningAlgType
// CAKeySet is the set of CA keys.
export class CAKeySet {
  // SSH contains SSH CA key pairs.
  public SSH: Array<SSHKeyPair> = new Array<SSHKeyPair>();
  // TLS contains TLS CA key/cert pairs.
  public TLS: Array<TLSKeyPair> = new Array<TLSKeyPair>();
  // JWT contains JWT signing key pairs.
  public JWT: Array<JWTKeyPair> = new Array<JWTKeyPair>();

  // Decodes CAKeySet from an ArrayBuffer
  static decode(buf: ArrayBuffer): CAKeySet {
    return CAKeySet.decodeDataView(new DataView(buf));
  }

  // Decodes CAKeySet from a DataView
  static decodeDataView(view: DataView): CAKeySet {
    const decoder = new __proto.Decoder(view);
    const obj = new CAKeySet();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          const length = decoder.uint32();
          obj.SSH.push(
            SSHKeyPair.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length
              )
            )
          );
          decoder.skip(length);

          break;
        }
        case 2: {
          const length = decoder.uint32();
          obj.TLS.push(
            TLSKeyPair.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length
              )
            )
          );
          decoder.skip(length);

          break;
        }
        case 3: {
          const length = decoder.uint32();
          obj.JWT.push(
            JWTKeyPair.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length
              )
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode CAKeySet

  public size(): u32 {
    let size: u32 = 0;

    for (let n: i32 = 0; n < this.SSH.length; n++) {
      const messageSize = this.SSH[n].size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    for (let n: i32 = 0; n < this.TLS.length; n++) {
      const messageSize = this.TLS[n].size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    for (let n: i32 = 0; n < this.JWT.length; n++) {
      const messageSize = this.JWT[n].size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes CAKeySet to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes CAKeySet to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    for (let n: i32 = 0; n < this.SSH.length; n++) {
      const messageSize = this.SSH[n].size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        this.SSH[n].encodeU8Array(encoder);
      }
    }

    for (let n: i32 = 0; n < this.TLS.length; n++) {
      const messageSize = this.TLS[n].size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        this.TLS[n].encodeU8Array(encoder);
      }
    }

    for (let n: i32 = 0; n < this.JWT.length; n++) {
      const messageSize = this.JWT[n].size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        this.JWT[n].encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode CAKeySet
} // CAKeySet

/**
 * RoleMapping provides mapping of remote roles to local roles
 *  for trusted clusters
 */
export class RoleMapping {
  // Remote specifies remote role name to map from
  public Remote: string = "";
  // Local specifies local roles to map to
  public Local: Array<string> = new Array<string>();

  // Decodes RoleMapping from an ArrayBuffer
  static decode(buf: ArrayBuffer): RoleMapping {
    return RoleMapping.decodeDataView(new DataView(buf));
  }

  // Decodes RoleMapping from a DataView
  static decodeDataView(view: DataView): RoleMapping {
    const decoder = new __proto.Decoder(view);
    const obj = new RoleMapping();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Remote = decoder.string();
          break;
        }
        case 2: {
          obj.Local.push(decoder.string());
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode RoleMapping

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Remote.length > 0
        ? 1 + __proto.Sizer.varint64(this.Remote.length) + this.Remote.length
        : 0;

    size += __size_string_repeated(this.Local);

    return size;
  }

  // Encodes RoleMapping to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes RoleMapping to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Remote.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Remote.length);
      encoder.string(this.Remote);
    }

    if (this.Local.length > 0) {
      for (let n: i32 = 0; n < this.Local.length; n++) {
        encoder.uint32(0x12);
        encoder.uint32(this.Local[n].length);
        encoder.string(this.Local[n]);
      }
    }

    return buf;
  } // encode RoleMapping
} // RoleMapping

// ProvisionTokenV1 is a provisioning token V1
export class ProvisionTokenV1 {
  /**
   * Roles is a list of roles associated with the token,
   *  that will be converted to metadata in the SSH and X509
   *  certificates issued to the user of the token
   */
  public Roles: Array<string> = new Array<string>();
  /**
   * Expires is a global expiry time header can be set on any resource in the
   *  system.
   */
  public Expires: google.protobuf.Timestamp = new google.protobuf.Timestamp();
  // Token is a token name
  public Token: string = "";

  // Decodes ProvisionTokenV1 from an ArrayBuffer
  static decode(buf: ArrayBuffer): ProvisionTokenV1 {
    return ProvisionTokenV1.decodeDataView(new DataView(buf));
  }

  // Decodes ProvisionTokenV1 from a DataView
  static decodeDataView(view: DataView): ProvisionTokenV1 {
    const decoder = new __proto.Decoder(view);
    const obj = new ProvisionTokenV1();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Roles.push(decoder.string());
          break;
        }
        case 2: {
          const length = decoder.uint32();
          obj.Expires = google.protobuf.Timestamp.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 3: {
          obj.Token = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode ProvisionTokenV1

  public size(): u32 {
    let size: u32 = 0;

    size += __size_string_repeated(this.Roles);

    if (this.Expires != null) {
      const f: google.protobuf.Timestamp = this
        .Expires as google.protobuf.Timestamp;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.Token.length > 0
        ? 1 + __proto.Sizer.varint64(this.Token.length) + this.Token.length
        : 0;

    return size;
  }

  // Encodes ProvisionTokenV1 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes ProvisionTokenV1 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Roles.length > 0) {
      for (let n: i32 = 0; n < this.Roles.length; n++) {
        encoder.uint32(0xa);
        encoder.uint32(this.Roles[n].length);
        encoder.string(this.Roles[n]);
      }
    }

    if (this.Expires != null) {
      const f = this.Expires as google.protobuf.Timestamp;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Token.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Token.length);
      encoder.string(this.Token);
    }

    return buf;
  } // encode ProvisionTokenV1
} // ProvisionTokenV1

// ProvisionTokenV2 specifies provisioning token
export class ProvisionTokenV2 {
  // Kind is a resource kind
  public Kind: string = "";
  // SubKind is an optional resource sub kind, used in some resources
  public SubKind: string = "";
  // Version is version
  public Version: string = "";
  // Metadata is resource metadata
  public Metadata: Metadata = new Metadata();
  // Spec is a provisioning token V2 spec
  public Spec: ProvisionTokenSpecV2 = new ProvisionTokenSpecV2();

  // Decodes ProvisionTokenV2 from an ArrayBuffer
  static decode(buf: ArrayBuffer): ProvisionTokenV2 {
    return ProvisionTokenV2.decodeDataView(new DataView(buf));
  }

  // Decodes ProvisionTokenV2 from a DataView
  static decodeDataView(view: DataView): ProvisionTokenV2 {
    const decoder = new __proto.Decoder(view);
    const obj = new ProvisionTokenV2();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Kind = decoder.string();
          break;
        }
        case 2: {
          obj.SubKind = decoder.string();
          break;
        }
        case 3: {
          obj.Version = decoder.string();
          break;
        }
        case 4: {
          const length = decoder.uint32();
          obj.Metadata = Metadata.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 5: {
          const length = decoder.uint32();
          obj.Spec = ProvisionTokenSpecV2.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode ProvisionTokenV2

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Kind.length > 0
        ? 1 + __proto.Sizer.varint64(this.Kind.length) + this.Kind.length
        : 0;
    size +=
      this.SubKind.length > 0
        ? 1 + __proto.Sizer.varint64(this.SubKind.length) + this.SubKind.length
        : 0;
    size +=
      this.Version.length > 0
        ? 1 + __proto.Sizer.varint64(this.Version.length) + this.Version.length
        : 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Spec != null) {
      const f: ProvisionTokenSpecV2 = this.Spec as ProvisionTokenSpecV2;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes ProvisionTokenV2 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes ProvisionTokenV2 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Kind.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Kind.length);
      encoder.string(this.Kind);
    }
    if (this.SubKind.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.SubKind.length);
      encoder.string(this.SubKind);
    }
    if (this.Version.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Version.length);
      encoder.string(this.Version);
    }

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Spec != null) {
      const f = this.Spec as ProvisionTokenSpecV2;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode ProvisionTokenV2
} // ProvisionTokenV2

// ProvisionTokenV2List is a list of provisioning tokens.
export class ProvisionTokenV2List {
  // ProvisionTokens is a list of provisioning tokens.
  public ProvisionTokens: Array<ProvisionTokenV2> =
    new Array<ProvisionTokenV2>();

  // Decodes ProvisionTokenV2List from an ArrayBuffer
  static decode(buf: ArrayBuffer): ProvisionTokenV2List {
    return ProvisionTokenV2List.decodeDataView(new DataView(buf));
  }

  // Decodes ProvisionTokenV2List from a DataView
  static decodeDataView(view: DataView): ProvisionTokenV2List {
    const decoder = new __proto.Decoder(view);
    const obj = new ProvisionTokenV2List();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          const length = decoder.uint32();
          obj.ProvisionTokens.push(
            ProvisionTokenV2.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length
              )
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode ProvisionTokenV2List

  public size(): u32 {
    let size: u32 = 0;

    for (let n: i32 = 0; n < this.ProvisionTokens.length; n++) {
      const messageSize = this.ProvisionTokens[n].size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes ProvisionTokenV2List to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes ProvisionTokenV2List to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    for (let n: i32 = 0; n < this.ProvisionTokens.length; n++) {
      const messageSize = this.ProvisionTokens[n].size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        this.ProvisionTokens[n].encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode ProvisionTokenV2List
} // ProvisionTokenV2List

/**
 * TokenRule is a rule that a joining node must match in order to use the
 *  associated token.
 */
export class TokenRule {
  // AWSAccount is the AWS account ID.
  public AWSAccount: string = "";
  /**
   * AWSRegions is used for the EC2 join method and is a list of AWS regions a
   *  node is allowed to join from.
   */
  public AWSRegions: Array<string> = new Array<string>();
  /**
   * AWSRole is used for the EC2 join method and is the the ARN of the AWS
   *  role that the auth server will assume in order to call the ec2 API.
   */
  public AWSRole: string = "";
  /**
   * AWSARN is used for the IAM join method, the AWS identity of joining nodes
   *  must match this ARN. Supports wildcards "*" and "?".
   */
  public AWSARN: string = "";

  // Decodes TokenRule from an ArrayBuffer
  static decode(buf: ArrayBuffer): TokenRule {
    return TokenRule.decodeDataView(new DataView(buf));
  }

  // Decodes TokenRule from a DataView
  static decodeDataView(view: DataView): TokenRule {
    const decoder = new __proto.Decoder(view);
    const obj = new TokenRule();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.AWSAccount = decoder.string();
          break;
        }
        case 2: {
          obj.AWSRegions.push(decoder.string());
          break;
        }
        case 3: {
          obj.AWSRole = decoder.string();
          break;
        }
        case 4: {
          obj.AWSARN = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode TokenRule

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.AWSAccount.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.AWSAccount.length) +
          this.AWSAccount.length
        : 0;

    size += __size_string_repeated(this.AWSRegions);

    size +=
      this.AWSRole.length > 0
        ? 1 + __proto.Sizer.varint64(this.AWSRole.length) + this.AWSRole.length
        : 0;
    size +=
      this.AWSARN.length > 0
        ? 1 + __proto.Sizer.varint64(this.AWSARN.length) + this.AWSARN.length
        : 0;

    return size;
  }

  // Encodes TokenRule to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes TokenRule to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.AWSAccount.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.AWSAccount.length);
      encoder.string(this.AWSAccount);
    }

    if (this.AWSRegions.length > 0) {
      for (let n: i32 = 0; n < this.AWSRegions.length; n++) {
        encoder.uint32(0x12);
        encoder.uint32(this.AWSRegions[n].length);
        encoder.string(this.AWSRegions[n]);
      }
    }

    if (this.AWSRole.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.AWSRole.length);
      encoder.string(this.AWSRole);
    }
    if (this.AWSARN.length > 0) {
      encoder.uint32(0x22);
      encoder.uint32(this.AWSARN.length);
      encoder.string(this.AWSARN);
    }

    return buf;
  } // encode TokenRule
} // TokenRule

// ProvisionTokenSpecV2 is a specification for V2 token
export class ProvisionTokenSpecV2 {
  /**
   * Roles is a list of roles associated with the token,
   *  that will be converted to metadata in the SSH and X509
   *  certificates issued to the user of the token
   */
  public Roles: Array<string> = new Array<string>();
  /**
   * Allow is a list of TokenRules, nodes using this token must match one
   *  allow rule to use this token.
   */
  public Allow: Array<TokenRule> = new Array<TokenRule>();
  /**
   * AWSIIDTTL is the TTL to use for AWS EC2 Instance Identity Documents used
   *  to join the cluster with this token.
   */
  public AWSIIDTTL: i64;
  /**
   * JoinMethod is the joining method required in order to use this token.
   *  Supported joining methods include "token", "ec2", and "iam".
   */
  public JoinMethod: string = "";
  // BotName is the name of the bot this token grants access to, if any
  public BotName: string = "";

  // Decodes ProvisionTokenSpecV2 from an ArrayBuffer
  static decode(buf: ArrayBuffer): ProvisionTokenSpecV2 {
    return ProvisionTokenSpecV2.decodeDataView(new DataView(buf));
  }

  // Decodes ProvisionTokenSpecV2 from a DataView
  static decodeDataView(view: DataView): ProvisionTokenSpecV2 {
    const decoder = new __proto.Decoder(view);
    const obj = new ProvisionTokenSpecV2();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Roles.push(decoder.string());
          break;
        }
        case 2: {
          const length = decoder.uint32();
          obj.Allow.push(
            TokenRule.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length
              )
            )
          );
          decoder.skip(length);

          break;
        }
        case 3: {
          obj.AWSIIDTTL = decoder.int64();
          break;
        }
        case 4: {
          obj.JoinMethod = decoder.string();
          break;
        }
        case 5: {
          obj.BotName = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode ProvisionTokenSpecV2

  public size(): u32 {
    let size: u32 = 0;

    size += __size_string_repeated(this.Roles);

    for (let n: i32 = 0; n < this.Allow.length; n++) {
      const messageSize = this.Allow[n].size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size += this.AWSIIDTTL == 0 ? 0 : 1 + __proto.Sizer.int64(this.AWSIIDTTL);
    size +=
      this.JoinMethod.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.JoinMethod.length) +
          this.JoinMethod.length
        : 0;
    size +=
      this.BotName.length > 0
        ? 1 + __proto.Sizer.varint64(this.BotName.length) + this.BotName.length
        : 0;

    return size;
  }

  // Encodes ProvisionTokenSpecV2 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes ProvisionTokenSpecV2 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Roles.length > 0) {
      for (let n: i32 = 0; n < this.Roles.length; n++) {
        encoder.uint32(0xa);
        encoder.uint32(this.Roles[n].length);
        encoder.string(this.Roles[n]);
      }
    }

    for (let n: i32 = 0; n < this.Allow.length; n++) {
      const messageSize = this.Allow[n].size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        this.Allow[n].encodeU8Array(encoder);
      }
    }

    if (this.AWSIIDTTL != 0) {
      encoder.uint32(0x18);
      encoder.int64(this.AWSIIDTTL);
    }
    if (this.JoinMethod.length > 0) {
      encoder.uint32(0x22);
      encoder.uint32(this.JoinMethod.length);
      encoder.string(this.JoinMethod);
    }
    if (this.BotName.length > 0) {
      encoder.uint32(0x2a);
      encoder.uint32(this.BotName.length);
      encoder.string(this.BotName);
    }

    return buf;
  } // encode ProvisionTokenSpecV2
} // ProvisionTokenSpecV2

// StaticTokensV2 implements the StaticTokens interface.
export class StaticTokensV2 {
  // Kind is a resource kind
  public Kind: string = "";
  // SubKind is an optional resource sub kind, used in some resources
  public SubKind: string = "";
  // Version is version
  public Version: string = "";
  // Metadata is resource metadata
  public Metadata: Metadata = new Metadata();
  // Spec is a provisioning token V2 spec
  public Spec: StaticTokensSpecV2 = new StaticTokensSpecV2();

  // Decodes StaticTokensV2 from an ArrayBuffer
  static decode(buf: ArrayBuffer): StaticTokensV2 {
    return StaticTokensV2.decodeDataView(new DataView(buf));
  }

  // Decodes StaticTokensV2 from a DataView
  static decodeDataView(view: DataView): StaticTokensV2 {
    const decoder = new __proto.Decoder(view);
    const obj = new StaticTokensV2();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Kind = decoder.string();
          break;
        }
        case 2: {
          obj.SubKind = decoder.string();
          break;
        }
        case 3: {
          obj.Version = decoder.string();
          break;
        }
        case 4: {
          const length = decoder.uint32();
          obj.Metadata = Metadata.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 5: {
          const length = decoder.uint32();
          obj.Spec = StaticTokensSpecV2.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode StaticTokensV2

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Kind.length > 0
        ? 1 + __proto.Sizer.varint64(this.Kind.length) + this.Kind.length
        : 0;
    size +=
      this.SubKind.length > 0
        ? 1 + __proto.Sizer.varint64(this.SubKind.length) + this.SubKind.length
        : 0;
    size +=
      this.Version.length > 0
        ? 1 + __proto.Sizer.varint64(this.Version.length) + this.Version.length
        : 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Spec != null) {
      const f: StaticTokensSpecV2 = this.Spec as StaticTokensSpecV2;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes StaticTokensV2 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes StaticTokensV2 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Kind.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Kind.length);
      encoder.string(this.Kind);
    }
    if (this.SubKind.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.SubKind.length);
      encoder.string(this.SubKind);
    }
    if (this.Version.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Version.length);
      encoder.string(this.Version);
    }

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Spec != null) {
      const f = this.Spec as StaticTokensSpecV2;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode StaticTokensV2
} // StaticTokensV2

// StaticTokensSpecV2 is the actual data we care about for StaticTokensSpecV2.
export class StaticTokensSpecV2 {
  /**
   * StaticTokens is a list of tokens that can be used to add nodes to the
   *  cluster.
   */
  public StaticTokens: Array<ProvisionTokenV1> = new Array<ProvisionTokenV1>();

  // Decodes StaticTokensSpecV2 from an ArrayBuffer
  static decode(buf: ArrayBuffer): StaticTokensSpecV2 {
    return StaticTokensSpecV2.decodeDataView(new DataView(buf));
  }

  // Decodes StaticTokensSpecV2 from a DataView
  static decodeDataView(view: DataView): StaticTokensSpecV2 {
    const decoder = new __proto.Decoder(view);
    const obj = new StaticTokensSpecV2();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          const length = decoder.uint32();
          obj.StaticTokens.push(
            ProvisionTokenV1.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length
              )
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode StaticTokensSpecV2

  public size(): u32 {
    let size: u32 = 0;

    for (let n: i32 = 0; n < this.StaticTokens.length; n++) {
      const messageSize = this.StaticTokens[n].size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes StaticTokensSpecV2 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes StaticTokensSpecV2 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    for (let n: i32 = 0; n < this.StaticTokens.length; n++) {
      const messageSize = this.StaticTokens[n].size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        this.StaticTokens[n].encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode StaticTokensSpecV2
} // StaticTokensSpecV2

// ClusterNameV2 implements the ClusterName interface.
export class ClusterNameV2 {
  // Kind is a resource kind
  public Kind: string = "";
  // SubKind is an optional resource sub kind, used in some resources
  public SubKind: string = "";
  // Version is version
  public Version: string = "";
  // Metadata is resource metadata
  public Metadata: Metadata = new Metadata();
  // Spec is a cluster name V2 spec
  public Spec: ClusterNameSpecV2 = new ClusterNameSpecV2();

  // Decodes ClusterNameV2 from an ArrayBuffer
  static decode(buf: ArrayBuffer): ClusterNameV2 {
    return ClusterNameV2.decodeDataView(new DataView(buf));
  }

  // Decodes ClusterNameV2 from a DataView
  static decodeDataView(view: DataView): ClusterNameV2 {
    const decoder = new __proto.Decoder(view);
    const obj = new ClusterNameV2();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Kind = decoder.string();
          break;
        }
        case 2: {
          obj.SubKind = decoder.string();
          break;
        }
        case 3: {
          obj.Version = decoder.string();
          break;
        }
        case 4: {
          const length = decoder.uint32();
          obj.Metadata = Metadata.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 5: {
          const length = decoder.uint32();
          obj.Spec = ClusterNameSpecV2.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode ClusterNameV2

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Kind.length > 0
        ? 1 + __proto.Sizer.varint64(this.Kind.length) + this.Kind.length
        : 0;
    size +=
      this.SubKind.length > 0
        ? 1 + __proto.Sizer.varint64(this.SubKind.length) + this.SubKind.length
        : 0;
    size +=
      this.Version.length > 0
        ? 1 + __proto.Sizer.varint64(this.Version.length) + this.Version.length
        : 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Spec != null) {
      const f: ClusterNameSpecV2 = this.Spec as ClusterNameSpecV2;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes ClusterNameV2 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes ClusterNameV2 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Kind.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Kind.length);
      encoder.string(this.Kind);
    }
    if (this.SubKind.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.SubKind.length);
      encoder.string(this.SubKind);
    }
    if (this.Version.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Version.length);
      encoder.string(this.Version);
    }

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Spec != null) {
      const f = this.Spec as ClusterNameSpecV2;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode ClusterNameV2
} // ClusterNameV2

// ClusterNameSpecV2 is the actual data we care about for ClusterName.
export class ClusterNameSpecV2 {
  /**
   * ClusterName is the name of the cluster. Changing this value once the
   *  cluster is setup can and will cause catastrophic problems.
   */
  public ClusterName: string = "";
  /**
   * ClusterID is the unique cluster ID that is set once during the first
   *  auth server startup.
   */
  public ClusterID: string = "";

  // Decodes ClusterNameSpecV2 from an ArrayBuffer
  static decode(buf: ArrayBuffer): ClusterNameSpecV2 {
    return ClusterNameSpecV2.decodeDataView(new DataView(buf));
  }

  // Decodes ClusterNameSpecV2 from a DataView
  static decodeDataView(view: DataView): ClusterNameSpecV2 {
    const decoder = new __proto.Decoder(view);
    const obj = new ClusterNameSpecV2();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.ClusterName = decoder.string();
          break;
        }
        case 2: {
          obj.ClusterID = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode ClusterNameSpecV2

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.ClusterName.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.ClusterName.length) +
          this.ClusterName.length
        : 0;
    size +=
      this.ClusterID.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.ClusterID.length) +
          this.ClusterID.length
        : 0;

    return size;
  }

  // Encodes ClusterNameSpecV2 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes ClusterNameSpecV2 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.ClusterName.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.ClusterName.length);
      encoder.string(this.ClusterName);
    }
    if (this.ClusterID.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.ClusterID.length);
      encoder.string(this.ClusterID);
    }

    return buf;
  } // encode ClusterNameSpecV2
} // ClusterNameSpecV2

// ClusterAuditConfigV2 represents audit log settings in the cluster.
export class ClusterAuditConfigV2 {
  // Kind is a resource kind
  public Kind: string = "";
  // SubKind is an optional resource sub kind, used in some resources
  public SubKind: string = "";
  // Version is a resource version
  public Version: string = "";
  // Metadata is resource metadata
  public Metadata: Metadata = new Metadata();
  // Spec is a ClusterAuditConfig specification
  public Spec: ClusterAuditConfigSpecV2 = new ClusterAuditConfigSpecV2();

  // Decodes ClusterAuditConfigV2 from an ArrayBuffer
  static decode(buf: ArrayBuffer): ClusterAuditConfigV2 {
    return ClusterAuditConfigV2.decodeDataView(new DataView(buf));
  }

  // Decodes ClusterAuditConfigV2 from a DataView
  static decodeDataView(view: DataView): ClusterAuditConfigV2 {
    const decoder = new __proto.Decoder(view);
    const obj = new ClusterAuditConfigV2();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Kind = decoder.string();
          break;
        }
        case 2: {
          obj.SubKind = decoder.string();
          break;
        }
        case 3: {
          obj.Version = decoder.string();
          break;
        }
        case 4: {
          const length = decoder.uint32();
          obj.Metadata = Metadata.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 5: {
          const length = decoder.uint32();
          obj.Spec = ClusterAuditConfigSpecV2.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode ClusterAuditConfigV2

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Kind.length > 0
        ? 1 + __proto.Sizer.varint64(this.Kind.length) + this.Kind.length
        : 0;
    size +=
      this.SubKind.length > 0
        ? 1 + __proto.Sizer.varint64(this.SubKind.length) + this.SubKind.length
        : 0;
    size +=
      this.Version.length > 0
        ? 1 + __proto.Sizer.varint64(this.Version.length) + this.Version.length
        : 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Spec != null) {
      const f: ClusterAuditConfigSpecV2 = this.Spec as ClusterAuditConfigSpecV2;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes ClusterAuditConfigV2 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes ClusterAuditConfigV2 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Kind.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Kind.length);
      encoder.string(this.Kind);
    }
    if (this.SubKind.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.SubKind.length);
      encoder.string(this.SubKind);
    }
    if (this.Version.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Version.length);
      encoder.string(this.Version);
    }

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Spec != null) {
      const f = this.Spec as ClusterAuditConfigSpecV2;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode ClusterAuditConfigV2
} // ClusterAuditConfigV2

/**
 * ClusterAuditConfigSpecV2 is the actual data we care about
 *  for ClusterAuditConfig.
 */
export class ClusterAuditConfigSpecV2 {
  // Type is audit backend type
  public Type: string = "";
  // Region is a region setting for audit sessions used by cloud providers
  public Region: string = "";
  // AuditSessionsURI is a parameter where to upload sessions
  public AuditSessionsURI: string = "";
  /**
   * AuditEventsURI is a parameter with all supported outputs
   *  for audit events
   */
  public AuditEventsURI: wrappers.StringValues = new wrappers.StringValues();
  // EnableContinuousBackups is used to enable (or disable) PITR (Point-In-Time Recovery).
  public EnableContinuousBackups: bool;
  // EnableAutoScaling is used to enable (or disable) auto scaling policy.
  public EnableAutoScaling: bool;
  // ReadMaxCapacity is the maximum provisioned read capacity.
  public ReadMaxCapacity: i64;
  // ReadMinCapacity is the minimum provisioned read capacity.
  public ReadMinCapacity: i64;
  // ReadTargetValue is the ratio of consumed read to provisioned capacity.
  public ReadTargetValue: f64;
  // WriteMaxCapacity is the maximum provisioned write capacity.
  public WriteMaxCapacity: i64;
  // WriteMinCapacity is the minimum provisioned write capacity.
  public WriteMinCapacity: i64;
  // WriteTargetValue is the ratio of consumed write to provisioned capacity.
  public WriteTargetValue: f64;
  // RetentionPeriod is the retention period for audit events.
  public RetentionPeriod: i64;

  // Decodes ClusterAuditConfigSpecV2 from an ArrayBuffer
  static decode(buf: ArrayBuffer): ClusterAuditConfigSpecV2 {
    return ClusterAuditConfigSpecV2.decodeDataView(new DataView(buf));
  }

  // Decodes ClusterAuditConfigSpecV2 from a DataView
  static decodeDataView(view: DataView): ClusterAuditConfigSpecV2 {
    const decoder = new __proto.Decoder(view);
    const obj = new ClusterAuditConfigSpecV2();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Type = decoder.string();
          break;
        }
        case 2: {
          obj.Region = decoder.string();
          break;
        }
        case 3: {
          obj.AuditSessionsURI = decoder.string();
          break;
        }
        case 4: {
          const length = decoder.uint32();
          obj.AuditEventsURI = wrappers.StringValues.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 6: {
          obj.EnableContinuousBackups = decoder.bool();
          break;
        }
        case 7: {
          obj.EnableAutoScaling = decoder.bool();
          break;
        }
        case 8: {
          obj.ReadMaxCapacity = decoder.int64();
          break;
        }
        case 9: {
          obj.ReadMinCapacity = decoder.int64();
          break;
        }
        case 10: {
          obj.ReadTargetValue = decoder.double();
          break;
        }
        case 11: {
          obj.WriteMaxCapacity = decoder.int64();
          break;
        }
        case 12: {
          obj.WriteMinCapacity = decoder.int64();
          break;
        }
        case 13: {
          obj.WriteTargetValue = decoder.double();
          break;
        }
        case 14: {
          obj.RetentionPeriod = decoder.int64();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode ClusterAuditConfigSpecV2

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Type.length > 0
        ? 1 + __proto.Sizer.varint64(this.Type.length) + this.Type.length
        : 0;
    size +=
      this.Region.length > 0
        ? 1 + __proto.Sizer.varint64(this.Region.length) + this.Region.length
        : 0;
    size +=
      this.AuditSessionsURI.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.AuditSessionsURI.length) +
          this.AuditSessionsURI.length
        : 0;

    if (this.AuditEventsURI != null) {
      const f: wrappers.StringValues = this
        .AuditEventsURI as wrappers.StringValues;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size += this.EnableContinuousBackups == 0 ? 0 : 1 + 1;
    size += this.EnableAutoScaling == 0 ? 0 : 1 + 1;
    size +=
      this.ReadMaxCapacity == 0
        ? 0
        : 1 + __proto.Sizer.int64(this.ReadMaxCapacity);
    size +=
      this.ReadMinCapacity == 0
        ? 0
        : 1 + __proto.Sizer.int64(this.ReadMinCapacity);
    size += this.ReadTargetValue == 0 ? 0 : 1 + 8;
    size +=
      this.WriteMaxCapacity == 0
        ? 0
        : 1 + __proto.Sizer.int64(this.WriteMaxCapacity);
    size +=
      this.WriteMinCapacity == 0
        ? 0
        : 1 + __proto.Sizer.int64(this.WriteMinCapacity);
    size += this.WriteTargetValue == 0 ? 0 : 1 + 8;
    size +=
      this.RetentionPeriod == 0
        ? 0
        : 1 + __proto.Sizer.int64(this.RetentionPeriod);

    return size;
  }

  // Encodes ClusterAuditConfigSpecV2 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes ClusterAuditConfigSpecV2 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Type.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Type.length);
      encoder.string(this.Type);
    }
    if (this.Region.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.Region.length);
      encoder.string(this.Region);
    }
    if (this.AuditSessionsURI.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.AuditSessionsURI.length);
      encoder.string(this.AuditSessionsURI);
    }

    if (this.AuditEventsURI != null) {
      const f = this.AuditEventsURI as wrappers.StringValues;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.EnableContinuousBackups != 0) {
      encoder.uint32(0x30);
      encoder.bool(this.EnableContinuousBackups);
    }
    if (this.EnableAutoScaling != 0) {
      encoder.uint32(0x38);
      encoder.bool(this.EnableAutoScaling);
    }
    if (this.ReadMaxCapacity != 0) {
      encoder.uint32(0x40);
      encoder.int64(this.ReadMaxCapacity);
    }
    if (this.ReadMinCapacity != 0) {
      encoder.uint32(0x48);
      encoder.int64(this.ReadMinCapacity);
    }
    if (this.ReadTargetValue != 0) {
      encoder.uint32(0x51);
      encoder.double(this.ReadTargetValue);
    }
    if (this.WriteMaxCapacity != 0) {
      encoder.uint32(0x58);
      encoder.int64(this.WriteMaxCapacity);
    }
    if (this.WriteMinCapacity != 0) {
      encoder.uint32(0x60);
      encoder.int64(this.WriteMinCapacity);
    }
    if (this.WriteTargetValue != 0) {
      encoder.uint32(0x69);
      encoder.double(this.WriteTargetValue);
    }
    if (this.RetentionPeriod != 0) {
      encoder.uint32(0x70);
      encoder.int64(this.RetentionPeriod);
    }

    return buf;
  } // encode ClusterAuditConfigSpecV2
} // ClusterAuditConfigSpecV2

// ClusterNetworkingConfigV2 contains cluster-wide networking configuration.
export class ClusterNetworkingConfigV2 {
  // Kind is a resource kind
  public Kind: string = "";
  // SubKind is an optional resource sub kind, used in some resources
  public SubKind: string = "";
  // Version is a resource version
  public Version: string = "";
  // Metadata is resource metadata
  public Metadata: Metadata = new Metadata();
  // Spec is a ClusterNetworkingConfig specification
  public Spec: ClusterNetworkingConfigSpecV2 =
    new ClusterNetworkingConfigSpecV2();

  // Decodes ClusterNetworkingConfigV2 from an ArrayBuffer
  static decode(buf: ArrayBuffer): ClusterNetworkingConfigV2 {
    return ClusterNetworkingConfigV2.decodeDataView(new DataView(buf));
  }

  // Decodes ClusterNetworkingConfigV2 from a DataView
  static decodeDataView(view: DataView): ClusterNetworkingConfigV2 {
    const decoder = new __proto.Decoder(view);
    const obj = new ClusterNetworkingConfigV2();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Kind = decoder.string();
          break;
        }
        case 2: {
          obj.SubKind = decoder.string();
          break;
        }
        case 3: {
          obj.Version = decoder.string();
          break;
        }
        case 4: {
          const length = decoder.uint32();
          obj.Metadata = Metadata.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 5: {
          const length = decoder.uint32();
          obj.Spec = ClusterNetworkingConfigSpecV2.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode ClusterNetworkingConfigV2

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Kind.length > 0
        ? 1 + __proto.Sizer.varint64(this.Kind.length) + this.Kind.length
        : 0;
    size +=
      this.SubKind.length > 0
        ? 1 + __proto.Sizer.varint64(this.SubKind.length) + this.SubKind.length
        : 0;
    size +=
      this.Version.length > 0
        ? 1 + __proto.Sizer.varint64(this.Version.length) + this.Version.length
        : 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Spec != null) {
      const f: ClusterNetworkingConfigSpecV2 = this
        .Spec as ClusterNetworkingConfigSpecV2;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes ClusterNetworkingConfigV2 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes ClusterNetworkingConfigV2 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Kind.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Kind.length);
      encoder.string(this.Kind);
    }
    if (this.SubKind.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.SubKind.length);
      encoder.string(this.SubKind);
    }
    if (this.Version.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Version.length);
      encoder.string(this.Version);
    }

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Spec != null) {
      const f = this.Spec as ClusterNetworkingConfigSpecV2;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode ClusterNetworkingConfigV2
} // ClusterNetworkingConfigV2

/**
 * ClusterNetworkingConfigSpecV2 is the actual data we care about
 *  for ClusterNetworkingConfig.
 */
export class ClusterNetworkingConfigSpecV2 {
  /**
   * ClientIdleTimeout sets global cluster default setting for client idle
   *  timeouts.
   */
  public ClientIdleTimeout: i64;
  /**
   * KeepAliveInterval is the interval at which the server sends keep-alive messages
   *  to the client.
   */
  public KeepAliveInterval: i64;
  /**
   * KeepAliveCountMax is the number of keep-alive messages that can be
   *  missed before the server disconnects the connection to the client.
   */
  public KeepAliveCountMax: i64;
  /**
   * SessionControlTimeout is the session control lease expiry and defines
   *  the upper limit of how long a node may be out of contact with the auth
   *  server before it begins terminating controlled sessions.
   */
  public SessionControlTimeout: i64;
  // ClientIdleTimeoutMessage is the message sent to the user when a connection times out.
  public ClientIdleTimeoutMessage: string = "";
  /**
   * WebIdleTimeout sets global cluster default setting for the web UI idle
   *  timeouts.
   */
  public WebIdleTimeout: i64;
  // ProxyListenerMode is proxy listener mode used by Teleport Proxies.
  public ProxyListenerMode: u32;
  // RoutingStrategy determines the strategy used to route to nodes.
  public RoutingStrategy: u32;

  // Decodes ClusterNetworkingConfigSpecV2 from an ArrayBuffer
  static decode(buf: ArrayBuffer): ClusterNetworkingConfigSpecV2 {
    return ClusterNetworkingConfigSpecV2.decodeDataView(new DataView(buf));
  }

  // Decodes ClusterNetworkingConfigSpecV2 from a DataView
  static decodeDataView(view: DataView): ClusterNetworkingConfigSpecV2 {
    const decoder = new __proto.Decoder(view);
    const obj = new ClusterNetworkingConfigSpecV2();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.ClientIdleTimeout = decoder.int64();
          break;
        }
        case 2: {
          obj.KeepAliveInterval = decoder.int64();
          break;
        }
        case 3: {
          obj.KeepAliveCountMax = decoder.int64();
          break;
        }
        case 4: {
          obj.SessionControlTimeout = decoder.int64();
          break;
        }
        case 5: {
          obj.ClientIdleTimeoutMessage = decoder.string();
          break;
        }
        case 6: {
          obj.WebIdleTimeout = decoder.int64();
          break;
        }
        case 7: {
          obj.ProxyListenerMode = decoder.uint32();
          break;
        }
        case 8: {
          obj.RoutingStrategy = decoder.uint32();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode ClusterNetworkingConfigSpecV2

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.ClientIdleTimeout == 0
        ? 0
        : 1 + __proto.Sizer.int64(this.ClientIdleTimeout);
    size +=
      this.KeepAliveInterval == 0
        ? 0
        : 1 + __proto.Sizer.int64(this.KeepAliveInterval);
    size +=
      this.KeepAliveCountMax == 0
        ? 0
        : 1 + __proto.Sizer.int64(this.KeepAliveCountMax);
    size +=
      this.SessionControlTimeout == 0
        ? 0
        : 1 + __proto.Sizer.int64(this.SessionControlTimeout);
    size +=
      this.ClientIdleTimeoutMessage.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.ClientIdleTimeoutMessage.length) +
          this.ClientIdleTimeoutMessage.length
        : 0;
    size +=
      this.WebIdleTimeout == 0
        ? 0
        : 1 + __proto.Sizer.int64(this.WebIdleTimeout);
    size +=
      this.ProxyListenerMode == 0
        ? 0
        : 1 + __proto.Sizer.uint32(this.ProxyListenerMode);
    size +=
      this.RoutingStrategy == 0
        ? 0
        : 1 + __proto.Sizer.uint32(this.RoutingStrategy);

    return size;
  }

  // Encodes ClusterNetworkingConfigSpecV2 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes ClusterNetworkingConfigSpecV2 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.ClientIdleTimeout != 0) {
      encoder.uint32(0x8);
      encoder.int64(this.ClientIdleTimeout);
    }
    if (this.KeepAliveInterval != 0) {
      encoder.uint32(0x10);
      encoder.int64(this.KeepAliveInterval);
    }
    if (this.KeepAliveCountMax != 0) {
      encoder.uint32(0x18);
      encoder.int64(this.KeepAliveCountMax);
    }
    if (this.SessionControlTimeout != 0) {
      encoder.uint32(0x20);
      encoder.int64(this.SessionControlTimeout);
    }
    if (this.ClientIdleTimeoutMessage.length > 0) {
      encoder.uint32(0x2a);
      encoder.uint32(this.ClientIdleTimeoutMessage.length);
      encoder.string(this.ClientIdleTimeoutMessage);
    }
    if (this.WebIdleTimeout != 0) {
      encoder.uint32(0x30);
      encoder.int64(this.WebIdleTimeout);
    }
    if (this.ProxyListenerMode != 0) {
      encoder.uint32(0x38);
      encoder.uint32(this.ProxyListenerMode);
    }
    if (this.RoutingStrategy != 0) {
      encoder.uint32(0x40);
      encoder.uint32(this.RoutingStrategy);
    }

    return buf;
  } // encode ClusterNetworkingConfigSpecV2
} // ClusterNetworkingConfigSpecV2

// SessionRecordingConfigV2 contains session recording configuration.
export class SessionRecordingConfigV2 {
  // Kind is a resource kind
  public Kind: string = "";
  // SubKind is an optional resource sub kind, used in some resources
  public SubKind: string = "";
  // Version is a resource version
  public Version: string = "";
  // Metadata is resource metadata
  public Metadata: Metadata = new Metadata();
  // Spec is a SessionRecordingConfig specification
  public Spec: SessionRecordingConfigSpecV2 =
    new SessionRecordingConfigSpecV2();

  // Decodes SessionRecordingConfigV2 from an ArrayBuffer
  static decode(buf: ArrayBuffer): SessionRecordingConfigV2 {
    return SessionRecordingConfigV2.decodeDataView(new DataView(buf));
  }

  // Decodes SessionRecordingConfigV2 from a DataView
  static decodeDataView(view: DataView): SessionRecordingConfigV2 {
    const decoder = new __proto.Decoder(view);
    const obj = new SessionRecordingConfigV2();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Kind = decoder.string();
          break;
        }
        case 2: {
          obj.SubKind = decoder.string();
          break;
        }
        case 3: {
          obj.Version = decoder.string();
          break;
        }
        case 4: {
          const length = decoder.uint32();
          obj.Metadata = Metadata.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 5: {
          const length = decoder.uint32();
          obj.Spec = SessionRecordingConfigSpecV2.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode SessionRecordingConfigV2

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Kind.length > 0
        ? 1 + __proto.Sizer.varint64(this.Kind.length) + this.Kind.length
        : 0;
    size +=
      this.SubKind.length > 0
        ? 1 + __proto.Sizer.varint64(this.SubKind.length) + this.SubKind.length
        : 0;
    size +=
      this.Version.length > 0
        ? 1 + __proto.Sizer.varint64(this.Version.length) + this.Version.length
        : 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Spec != null) {
      const f: SessionRecordingConfigSpecV2 = this
        .Spec as SessionRecordingConfigSpecV2;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes SessionRecordingConfigV2 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes SessionRecordingConfigV2 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Kind.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Kind.length);
      encoder.string(this.Kind);
    }
    if (this.SubKind.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.SubKind.length);
      encoder.string(this.SubKind);
    }
    if (this.Version.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Version.length);
      encoder.string(this.Version);
    }

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Spec != null) {
      const f = this.Spec as SessionRecordingConfigSpecV2;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode SessionRecordingConfigV2
} // SessionRecordingConfigV2

/**
 * SessionRecordingConfigSpecV2 is the actual data we care about
 *  for SessionRecordingConfig.
 */
export class SessionRecordingConfigSpecV2 {
  // Mode controls where (or if) the session is recorded.
  public Mode: string = "";
  /**
   * ProxyChecksHostKeys is used to control if the proxy will check host keys
   *  when in recording mode.
   */
  public ProxyChecksHostKeys: BoolValue = new BoolValue();

  // Decodes SessionRecordingConfigSpecV2 from an ArrayBuffer
  static decode(buf: ArrayBuffer): SessionRecordingConfigSpecV2 {
    return SessionRecordingConfigSpecV2.decodeDataView(new DataView(buf));
  }

  // Decodes SessionRecordingConfigSpecV2 from a DataView
  static decodeDataView(view: DataView): SessionRecordingConfigSpecV2 {
    const decoder = new __proto.Decoder(view);
    const obj = new SessionRecordingConfigSpecV2();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Mode = decoder.string();
          break;
        }
        case 2: {
          const length = decoder.uint32();
          obj.ProxyChecksHostKeys = BoolValue.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode SessionRecordingConfigSpecV2

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Mode.length > 0
        ? 1 + __proto.Sizer.varint64(this.Mode.length) + this.Mode.length
        : 0;

    if (this.ProxyChecksHostKeys != null) {
      const f: BoolValue = this.ProxyChecksHostKeys as BoolValue;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes SessionRecordingConfigSpecV2 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes SessionRecordingConfigSpecV2 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Mode.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Mode.length);
      encoder.string(this.Mode);
    }

    if (this.ProxyChecksHostKeys != null) {
      const f = this.ProxyChecksHostKeys as BoolValue;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode SessionRecordingConfigSpecV2
} // SessionRecordingConfigSpecV2

// AuthPreferenceV2 implements the AuthPreference interface.
export class AuthPreferenceV2 {
  // Kind is a resource kind
  public Kind: string = "";
  // SubKind is an optional resource sub kind, used in some resources
  public SubKind: string = "";
  // Version is a resource version
  public Version: string = "";
  // Metadata is resource metadata
  public Metadata: Metadata = new Metadata();
  // Spec is an AuthPreference specification
  public Spec: AuthPreferenceSpecV2 = new AuthPreferenceSpecV2();

  // Decodes AuthPreferenceV2 from an ArrayBuffer
  static decode(buf: ArrayBuffer): AuthPreferenceV2 {
    return AuthPreferenceV2.decodeDataView(new DataView(buf));
  }

  // Decodes AuthPreferenceV2 from a DataView
  static decodeDataView(view: DataView): AuthPreferenceV2 {
    const decoder = new __proto.Decoder(view);
    const obj = new AuthPreferenceV2();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Kind = decoder.string();
          break;
        }
        case 2: {
          obj.SubKind = decoder.string();
          break;
        }
        case 3: {
          obj.Version = decoder.string();
          break;
        }
        case 4: {
          const length = decoder.uint32();
          obj.Metadata = Metadata.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 5: {
          const length = decoder.uint32();
          obj.Spec = AuthPreferenceSpecV2.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode AuthPreferenceV2

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Kind.length > 0
        ? 1 + __proto.Sizer.varint64(this.Kind.length) + this.Kind.length
        : 0;
    size +=
      this.SubKind.length > 0
        ? 1 + __proto.Sizer.varint64(this.SubKind.length) + this.SubKind.length
        : 0;
    size +=
      this.Version.length > 0
        ? 1 + __proto.Sizer.varint64(this.Version.length) + this.Version.length
        : 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Spec != null) {
      const f: AuthPreferenceSpecV2 = this.Spec as AuthPreferenceSpecV2;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes AuthPreferenceV2 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes AuthPreferenceV2 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Kind.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Kind.length);
      encoder.string(this.Kind);
    }
    if (this.SubKind.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.SubKind.length);
      encoder.string(this.SubKind);
    }
    if (this.Version.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Version.length);
      encoder.string(this.Version);
    }

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Spec != null) {
      const f = this.Spec as AuthPreferenceSpecV2;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode AuthPreferenceV2
} // AuthPreferenceV2

// AuthPreferenceSpecV2 is the actual data we care about for AuthPreference.
export class AuthPreferenceSpecV2 {
  // Type is the type of authentication.
  public Type: string = "";
  // SecondFactor is the type of second factor.
  public SecondFactor: string = "";
  /**
   * ConnectorName is the name of the OIDC or SAML connector. If this value is
   *  not set the first connector in the backend will be used.
   */
  public ConnectorName: string = "";
  // U2F are the settings for the U2F device.
  public U2F: U2F = new U2F();
  /**
   * RequireSessionMFA causes all sessions in this cluster to require MFA
   *  checks.
   */
  public RequireSessionMFA: bool;
  /**
   * DisconnectExpiredCert provides disconnect expired certificate setting -
   *  if true, connections with expired client certificates will get disconnected
   */
  public DisconnectExpiredCert: BoolValue = new BoolValue();
  // AllowLocalAuth is true if local authentication is enabled.
  public AllowLocalAuth: BoolValue = new BoolValue();
  public MessageOfTheDay: string = "";
  // LockingMode is the cluster-wide locking mode default.
  public LockingMode: string = "";
  // Webauthn are the settings for server-side Web Authentication support.
  public Webauthn: Webauthn = new Webauthn();

  // Decodes AuthPreferenceSpecV2 from an ArrayBuffer
  static decode(buf: ArrayBuffer): AuthPreferenceSpecV2 {
    return AuthPreferenceSpecV2.decodeDataView(new DataView(buf));
  }

  // Decodes AuthPreferenceSpecV2 from a DataView
  static decodeDataView(view: DataView): AuthPreferenceSpecV2 {
    const decoder = new __proto.Decoder(view);
    const obj = new AuthPreferenceSpecV2();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Type = decoder.string();
          break;
        }
        case 2: {
          obj.SecondFactor = decoder.string();
          break;
        }
        case 3: {
          obj.ConnectorName = decoder.string();
          break;
        }
        case 4: {
          const length = decoder.uint32();
          obj.U2F = U2F.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 5: {
          obj.RequireSessionMFA = decoder.bool();
          break;
        }
        case 6: {
          const length = decoder.uint32();
          obj.DisconnectExpiredCert = BoolValue.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 7: {
          const length = decoder.uint32();
          obj.AllowLocalAuth = BoolValue.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 8: {
          obj.MessageOfTheDay = decoder.string();
          break;
        }
        case 9: {
          obj.LockingMode = decoder.string();
          break;
        }
        case 10: {
          const length = decoder.uint32();
          obj.Webauthn = Webauthn.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode AuthPreferenceSpecV2

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Type.length > 0
        ? 1 + __proto.Sizer.varint64(this.Type.length) + this.Type.length
        : 0;
    size +=
      this.SecondFactor.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.SecondFactor.length) +
          this.SecondFactor.length
        : 0;
    size +=
      this.ConnectorName.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.ConnectorName.length) +
          this.ConnectorName.length
        : 0;

    if (this.U2F != null) {
      const f: U2F = this.U2F as U2F;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size += this.RequireSessionMFA == 0 ? 0 : 1 + 1;

    if (this.DisconnectExpiredCert != null) {
      const f: BoolValue = this.DisconnectExpiredCert as BoolValue;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.AllowLocalAuth != null) {
      const f: BoolValue = this.AllowLocalAuth as BoolValue;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.MessageOfTheDay.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.MessageOfTheDay.length) +
          this.MessageOfTheDay.length
        : 0;
    size +=
      this.LockingMode.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.LockingMode.length) +
          this.LockingMode.length
        : 0;

    if (this.Webauthn != null) {
      const f: Webauthn = this.Webauthn as Webauthn;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes AuthPreferenceSpecV2 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes AuthPreferenceSpecV2 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Type.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Type.length);
      encoder.string(this.Type);
    }
    if (this.SecondFactor.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.SecondFactor.length);
      encoder.string(this.SecondFactor);
    }
    if (this.ConnectorName.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.ConnectorName.length);
      encoder.string(this.ConnectorName);
    }

    if (this.U2F != null) {
      const f = this.U2F as U2F;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.RequireSessionMFA != 0) {
      encoder.uint32(0x28);
      encoder.bool(this.RequireSessionMFA);
    }

    if (this.DisconnectExpiredCert != null) {
      const f = this.DisconnectExpiredCert as BoolValue;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x32);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.AllowLocalAuth != null) {
      const f = this.AllowLocalAuth as BoolValue;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x3a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.MessageOfTheDay.length > 0) {
      encoder.uint32(0x42);
      encoder.uint32(this.MessageOfTheDay.length);
      encoder.string(this.MessageOfTheDay);
    }
    if (this.LockingMode.length > 0) {
      encoder.uint32(0x4a);
      encoder.uint32(this.LockingMode.length);
      encoder.string(this.LockingMode);
    }

    if (this.Webauthn != null) {
      const f = this.Webauthn as Webauthn;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x52);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode AuthPreferenceSpecV2
} // AuthPreferenceSpecV2

// U2F defines settings for U2F device.
export class U2F {
  // AppID returns the application ID for universal second factor.
  public AppID: string = "";
  /**
   * Facets returns the facets for universal second factor.
   *  DELETE IN 11.0, time to sunset U2F (codingllama).
   */
  public Facets: Array<string> = new Array<string>();
  /**
   * DeviceAttestationCAs contains the trusted attestation CAs for U2F
   *  devices.
   *  DELETE IN 11.0, time to sunset U2F (codingllama).
   */
  public DeviceAttestationCAs: Array<string> = new Array<string>();

  // Decodes U2F from an ArrayBuffer
  static decode(buf: ArrayBuffer): U2F {
    return U2F.decodeDataView(new DataView(buf));
  }

  // Decodes U2F from a DataView
  static decodeDataView(view: DataView): U2F {
    const decoder = new __proto.Decoder(view);
    const obj = new U2F();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.AppID = decoder.string();
          break;
        }
        case 2: {
          obj.Facets.push(decoder.string());
          break;
        }
        case 3: {
          obj.DeviceAttestationCAs.push(decoder.string());
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode U2F

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.AppID.length > 0
        ? 1 + __proto.Sizer.varint64(this.AppID.length) + this.AppID.length
        : 0;

    size += __size_string_repeated(this.Facets);

    size += __size_string_repeated(this.DeviceAttestationCAs);

    return size;
  }

  // Encodes U2F to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes U2F to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.AppID.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.AppID.length);
      encoder.string(this.AppID);
    }

    if (this.Facets.length > 0) {
      for (let n: i32 = 0; n < this.Facets.length; n++) {
        encoder.uint32(0x12);
        encoder.uint32(this.Facets[n].length);
        encoder.string(this.Facets[n]);
      }
    }

    if (this.DeviceAttestationCAs.length > 0) {
      for (let n: i32 = 0; n < this.DeviceAttestationCAs.length; n++) {
        encoder.uint32(0x1a);
        encoder.uint32(this.DeviceAttestationCAs[n].length);
        encoder.string(this.DeviceAttestationCAs[n]);
      }
    }

    return buf;
  } // encode U2F
} // U2F

/**
 * Webauthn defines user-visible settings for server-side Web Authentication
 *  support.
 */
export class Webauthn {
  /**
   * RPID is the ID of the Relying Party.
   *  It should be set to the domain name of the Teleport installation.
   *
   *  IMPORTANT: RPID must never change in the lifetime of the cluster, because
   *  it's recorded in the registration data on the WebAuthn device. If the
   *  RPID changes, all existing WebAuthn key registrations will become invalid
   *  and all users who use WebAuthn as the second factor will need to
   *  re-register.
   */
  public RPID: string = "";
  /**
   * Allow list of device attestation CAs in PEM format.
   *  If present, only devices whose attestation certificates match the
   *  certificates specified here may be registered (existing registrations are
   *  unchanged).
   *  If supplied in conjunction with AttestationDeniedCAs, then both
   *  conditions need to be true for registration to be allowed (the device
   *  MUST match an allowed CA and MUST NOT match a denied CA).
   *  By default all devices are allowed.
   */
  public AttestationAllowedCAs: Array<string> = new Array<string>();
  /**
   * Deny list of device attestation CAs in PEM format.
   *  If present, only devices whose attestation certificates don't match the
   *  certificates specified here may be registered (existing registrations are
   *  unchanged).
   *  If supplied in conjunction with AttestationAllowedCAs, then both
   *  conditions need to be true for registration to be allowed (the device
   *  MUST match an allowed CA and MUST NOT match a denied CA).
   *  By default no devices are denied.
   */
  public AttestationDeniedCAs: Array<string> = new Array<string>();

  // Decodes Webauthn from an ArrayBuffer
  static decode(buf: ArrayBuffer): Webauthn {
    return Webauthn.decodeDataView(new DataView(buf));
  }

  // Decodes Webauthn from a DataView
  static decodeDataView(view: DataView): Webauthn {
    const decoder = new __proto.Decoder(view);
    const obj = new Webauthn();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.RPID = decoder.string();
          break;
        }
        case 2: {
          obj.AttestationAllowedCAs.push(decoder.string());
          break;
        }
        case 3: {
          obj.AttestationDeniedCAs.push(decoder.string());
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode Webauthn

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.RPID.length > 0
        ? 1 + __proto.Sizer.varint64(this.RPID.length) + this.RPID.length
        : 0;

    size += __size_string_repeated(this.AttestationAllowedCAs);

    size += __size_string_repeated(this.AttestationDeniedCAs);

    return size;
  }

  // Encodes Webauthn to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes Webauthn to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.RPID.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.RPID.length);
      encoder.string(this.RPID);
    }

    if (this.AttestationAllowedCAs.length > 0) {
      for (let n: i32 = 0; n < this.AttestationAllowedCAs.length; n++) {
        encoder.uint32(0x12);
        encoder.uint32(this.AttestationAllowedCAs[n].length);
        encoder.string(this.AttestationAllowedCAs[n]);
      }
    }

    if (this.AttestationDeniedCAs.length > 0) {
      for (let n: i32 = 0; n < this.AttestationDeniedCAs.length; n++) {
        encoder.uint32(0x1a);
        encoder.uint32(this.AttestationDeniedCAs[n].length);
        encoder.string(this.AttestationDeniedCAs[n]);
      }
    }

    return buf;
  } // encode Webauthn
} // Webauthn

// Namespace represents namespace resource specification
export class Namespace {
  // Kind is a resource kind
  public Kind: string = "";
  // SubKind is an optional resource sub kind, used in some resources
  public SubKind: string = "";
  // Version is version
  public Version: string = "";
  // Metadata is resource metadata
  public Metadata: Metadata = new Metadata();
  // Spec is a namespace spec
  public Spec: NamespaceSpec = new NamespaceSpec();

  // Decodes Namespace from an ArrayBuffer
  static decode(buf: ArrayBuffer): Namespace {
    return Namespace.decodeDataView(new DataView(buf));
  }

  // Decodes Namespace from a DataView
  static decodeDataView(view: DataView): Namespace {
    const decoder = new __proto.Decoder(view);
    const obj = new Namespace();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Kind = decoder.string();
          break;
        }
        case 2: {
          obj.SubKind = decoder.string();
          break;
        }
        case 3: {
          obj.Version = decoder.string();
          break;
        }
        case 4: {
          const length = decoder.uint32();
          obj.Metadata = Metadata.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 5: {
          const length = decoder.uint32();
          obj.Spec = NamespaceSpec.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode Namespace

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Kind.length > 0
        ? 1 + __proto.Sizer.varint64(this.Kind.length) + this.Kind.length
        : 0;
    size +=
      this.SubKind.length > 0
        ? 1 + __proto.Sizer.varint64(this.SubKind.length) + this.SubKind.length
        : 0;
    size +=
      this.Version.length > 0
        ? 1 + __proto.Sizer.varint64(this.Version.length) + this.Version.length
        : 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Spec != null) {
      const f: NamespaceSpec = this.Spec as NamespaceSpec;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes Namespace to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes Namespace to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Kind.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Kind.length);
      encoder.string(this.Kind);
    }
    if (this.SubKind.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.SubKind.length);
      encoder.string(this.SubKind);
    }
    if (this.Version.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Version.length);
      encoder.string(this.Version);
    }

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Spec != null) {
      const f = this.Spec as NamespaceSpec;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode Namespace
} // Namespace

// NamespaceSpec is a namespace specificateion
export class NamespaceSpec {
  // Decodes NamespaceSpec from an ArrayBuffer
  static decode(buf: ArrayBuffer): NamespaceSpec {
    return NamespaceSpec.decodeDataView(new DataView(buf));
  }

  // Decodes NamespaceSpec from a DataView
  static decodeDataView(view: DataView): NamespaceSpec {
    const decoder = new __proto.Decoder(view);
    const obj = new NamespaceSpec();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode NamespaceSpec

  public size(): u32 {
    let size: u32 = 0;

    return size;
  }

  // Encodes NamespaceSpec to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes NamespaceSpec to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    return buf;
  } // encode NamespaceSpec
} // NamespaceSpec

export class UserTokenV3 {
  // Kind is a resource kind
  public Kind: string = "";
  // SubKind is a resource sub kind, used to define the type of user token.
  public SubKind: string = "";
  // Version is version
  public Version: string = "";
  // Metadata is resource metadata
  public Metadata: Metadata = new Metadata();
  // Spec is an resource specification
  public Spec: UserTokenSpecV3 = new UserTokenSpecV3();

  // Decodes UserTokenV3 from an ArrayBuffer
  static decode(buf: ArrayBuffer): UserTokenV3 {
    return UserTokenV3.decodeDataView(new DataView(buf));
  }

  // Decodes UserTokenV3 from a DataView
  static decodeDataView(view: DataView): UserTokenV3 {
    const decoder = new __proto.Decoder(view);
    const obj = new UserTokenV3();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Kind = decoder.string();
          break;
        }
        case 2: {
          obj.SubKind = decoder.string();
          break;
        }
        case 3: {
          obj.Version = decoder.string();
          break;
        }
        case 4: {
          const length = decoder.uint32();
          obj.Metadata = Metadata.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 5: {
          const length = decoder.uint32();
          obj.Spec = UserTokenSpecV3.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode UserTokenV3

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Kind.length > 0
        ? 1 + __proto.Sizer.varint64(this.Kind.length) + this.Kind.length
        : 0;
    size +=
      this.SubKind.length > 0
        ? 1 + __proto.Sizer.varint64(this.SubKind.length) + this.SubKind.length
        : 0;
    size +=
      this.Version.length > 0
        ? 1 + __proto.Sizer.varint64(this.Version.length) + this.Version.length
        : 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Spec != null) {
      const f: UserTokenSpecV3 = this.Spec as UserTokenSpecV3;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes UserTokenV3 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes UserTokenV3 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Kind.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Kind.length);
      encoder.string(this.Kind);
    }
    if (this.SubKind.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.SubKind.length);
      encoder.string(this.SubKind);
    }
    if (this.Version.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Version.length);
      encoder.string(this.Version);
    }

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Spec != null) {
      const f = this.Spec as UserTokenSpecV3;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode UserTokenV3
} // UserTokenV3

export class UserTokenSpecV3 {
  // User is user name associated with this token
  public User: string = "";
  // URL is this token URL
  public URL: string = "";
  // Usage is an optional field that provides more information about how this token will be used.
  public Usage: u32;
  // Created holds information about when the token was created
  public Created: google.protobuf.Timestamp = new google.protobuf.Timestamp();

  // Decodes UserTokenSpecV3 from an ArrayBuffer
  static decode(buf: ArrayBuffer): UserTokenSpecV3 {
    return UserTokenSpecV3.decodeDataView(new DataView(buf));
  }

  // Decodes UserTokenSpecV3 from a DataView
  static decodeDataView(view: DataView): UserTokenSpecV3 {
    const decoder = new __proto.Decoder(view);
    const obj = new UserTokenSpecV3();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.User = decoder.string();
          break;
        }
        case 2: {
          obj.URL = decoder.string();
          break;
        }
        case 3: {
          obj.Usage = decoder.uint32();
          break;
        }
        case 4: {
          const length = decoder.uint32();
          obj.Created = google.protobuf.Timestamp.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode UserTokenSpecV3

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.User.length > 0
        ? 1 + __proto.Sizer.varint64(this.User.length) + this.User.length
        : 0;
    size +=
      this.URL.length > 0
        ? 1 + __proto.Sizer.varint64(this.URL.length) + this.URL.length
        : 0;
    size += this.Usage == 0 ? 0 : 1 + __proto.Sizer.uint32(this.Usage);

    if (this.Created != null) {
      const f: google.protobuf.Timestamp = this
        .Created as google.protobuf.Timestamp;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes UserTokenSpecV3 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes UserTokenSpecV3 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.User.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.User.length);
      encoder.string(this.User);
    }
    if (this.URL.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.URL.length);
      encoder.string(this.URL);
    }
    if (this.Usage != 0) {
      encoder.uint32(0x18);
      encoder.uint32(this.Usage);
    }

    if (this.Created != null) {
      const f = this.Created as google.protobuf.Timestamp;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode UserTokenSpecV3
} // UserTokenSpecV3

export class UserTokenSecretsV3 {
  // Kind is a resource kind
  public Kind: string = "";
  // SubKind is an optional resource sub kind, used in some resources
  public SubKind: string = "";
  // Version is version
  public Version: string = "";
  // Metadata is resource metadata
  public Metadata: Metadata = new Metadata();
  // Spec is an resource specification
  public Spec: UserTokenSecretsSpecV3 = new UserTokenSecretsSpecV3();

  // Decodes UserTokenSecretsV3 from an ArrayBuffer
  static decode(buf: ArrayBuffer): UserTokenSecretsV3 {
    return UserTokenSecretsV3.decodeDataView(new DataView(buf));
  }

  // Decodes UserTokenSecretsV3 from a DataView
  static decodeDataView(view: DataView): UserTokenSecretsV3 {
    const decoder = new __proto.Decoder(view);
    const obj = new UserTokenSecretsV3();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Kind = decoder.string();
          break;
        }
        case 2: {
          obj.SubKind = decoder.string();
          break;
        }
        case 3: {
          obj.Version = decoder.string();
          break;
        }
        case 4: {
          const length = decoder.uint32();
          obj.Metadata = Metadata.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 5: {
          const length = decoder.uint32();
          obj.Spec = UserTokenSecretsSpecV3.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode UserTokenSecretsV3

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Kind.length > 0
        ? 1 + __proto.Sizer.varint64(this.Kind.length) + this.Kind.length
        : 0;
    size +=
      this.SubKind.length > 0
        ? 1 + __proto.Sizer.varint64(this.SubKind.length) + this.SubKind.length
        : 0;
    size +=
      this.Version.length > 0
        ? 1 + __proto.Sizer.varint64(this.Version.length) + this.Version.length
        : 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Spec != null) {
      const f: UserTokenSecretsSpecV3 = this.Spec as UserTokenSecretsSpecV3;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes UserTokenSecretsV3 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes UserTokenSecretsV3 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Kind.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Kind.length);
      encoder.string(this.Kind);
    }
    if (this.SubKind.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.SubKind.length);
      encoder.string(this.SubKind);
    }
    if (this.Version.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Version.length);
      encoder.string(this.Version);
    }

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Spec != null) {
      const f = this.Spec as UserTokenSecretsSpecV3;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode UserTokenSecretsV3
} // UserTokenSecretsV3

export class UserTokenSecretsSpecV3 {
  // OTPKey is is a secret value of one time password secret generator
  public OTPKey: string = "";
  // OTPKey is is a secret value of one time password secret generator
  public QRCode: string = "";
  // Created holds information about when the token was created
  public Created: google.protobuf.Timestamp = new google.protobuf.Timestamp();

  // Decodes UserTokenSecretsSpecV3 from an ArrayBuffer
  static decode(buf: ArrayBuffer): UserTokenSecretsSpecV3 {
    return UserTokenSecretsSpecV3.decodeDataView(new DataView(buf));
  }

  // Decodes UserTokenSecretsSpecV3 from a DataView
  static decodeDataView(view: DataView): UserTokenSecretsSpecV3 {
    const decoder = new __proto.Decoder(view);
    const obj = new UserTokenSecretsSpecV3();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.OTPKey = decoder.string();
          break;
        }
        case 2: {
          obj.QRCode = decoder.string();
          break;
        }
        case 3: {
          const length = decoder.uint32();
          obj.Created = google.protobuf.Timestamp.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode UserTokenSecretsSpecV3

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.OTPKey.length > 0
        ? 1 + __proto.Sizer.varint64(this.OTPKey.length) + this.OTPKey.length
        : 0;
    size +=
      this.QRCode.length > 0
        ? 1 + __proto.Sizer.varint64(this.QRCode.length) + this.QRCode.length
        : 0;

    if (this.Created != null) {
      const f: google.protobuf.Timestamp = this
        .Created as google.protobuf.Timestamp;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes UserTokenSecretsSpecV3 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes UserTokenSecretsSpecV3 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.OTPKey.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.OTPKey.length);
      encoder.string(this.OTPKey);
    }
    if (this.QRCode.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.QRCode.length);
      encoder.string(this.QRCode);
    }

    if (this.Created != null) {
      const f = this.Created as google.protobuf.Timestamp;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode UserTokenSecretsSpecV3
} // UserTokenSecretsSpecV3

// AccessRequest represents an access request resource specification
export class AccessRequestV3 {
  // Kind is a resource kind
  public Kind: string = "";
  // SubKind is an optional resource sub kind, used in some resources
  public SubKind: string = "";
  // Version is version
  public Version: string = "";
  // Metadata is AccessRequest metadata
  public Metadata: Metadata = new Metadata();
  // Spec is an AccessRequest specification
  public Spec: AccessRequestSpecV3 = new AccessRequestSpecV3();

  // Decodes AccessRequestV3 from an ArrayBuffer
  static decode(buf: ArrayBuffer): AccessRequestV3 {
    return AccessRequestV3.decodeDataView(new DataView(buf));
  }

  // Decodes AccessRequestV3 from a DataView
  static decodeDataView(view: DataView): AccessRequestV3 {
    const decoder = new __proto.Decoder(view);
    const obj = new AccessRequestV3();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Kind = decoder.string();
          break;
        }
        case 2: {
          obj.SubKind = decoder.string();
          break;
        }
        case 3: {
          obj.Version = decoder.string();
          break;
        }
        case 4: {
          const length = decoder.uint32();
          obj.Metadata = Metadata.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 5: {
          const length = decoder.uint32();
          obj.Spec = AccessRequestSpecV3.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode AccessRequestV3

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Kind.length > 0
        ? 1 + __proto.Sizer.varint64(this.Kind.length) + this.Kind.length
        : 0;
    size +=
      this.SubKind.length > 0
        ? 1 + __proto.Sizer.varint64(this.SubKind.length) + this.SubKind.length
        : 0;
    size +=
      this.Version.length > 0
        ? 1 + __proto.Sizer.varint64(this.Version.length) + this.Version.length
        : 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Spec != null) {
      const f: AccessRequestSpecV3 = this.Spec as AccessRequestSpecV3;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes AccessRequestV3 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes AccessRequestV3 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Kind.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Kind.length);
      encoder.string(this.Kind);
    }
    if (this.SubKind.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.SubKind.length);
      encoder.string(this.SubKind);
    }
    if (this.Version.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Version.length);
      encoder.string(this.Version);
    }

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Spec != null) {
      const f = this.Spec as AccessRequestSpecV3;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode AccessRequestV3
} // AccessRequestV3

/**
 * AccessReviewThreshold describes a filter used to match access reviews,
 *  as well as approval/denial counts which trigger state-transitions.  This type
 *  can be used to describe policies such as "can be approved by 2 admins"
 *  or "can be denied by any non-contractor".
 */
export class AccessReviewThreshold {
  // Name is the optional human-readable name of the threshold.
  public Name: string = "";
  /**
   * Filter is an optional predicate used to determine which reviews
   *  count toward this threshold.
   */
  public Filter: string = "";
  // Approve is the number of matching approvals needed for state-transition.
  public Approve: u32;
  // Deny is the number of denials needed for state-transition.
  public Deny: u32;

  // Decodes AccessReviewThreshold from an ArrayBuffer
  static decode(buf: ArrayBuffer): AccessReviewThreshold {
    return AccessReviewThreshold.decodeDataView(new DataView(buf));
  }

  // Decodes AccessReviewThreshold from a DataView
  static decodeDataView(view: DataView): AccessReviewThreshold {
    const decoder = new __proto.Decoder(view);
    const obj = new AccessReviewThreshold();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Name = decoder.string();
          break;
        }
        case 2: {
          obj.Filter = decoder.string();
          break;
        }
        case 3: {
          obj.Approve = decoder.uint32();
          break;
        }
        case 4: {
          obj.Deny = decoder.uint32();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode AccessReviewThreshold

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Name.length > 0
        ? 1 + __proto.Sizer.varint64(this.Name.length) + this.Name.length
        : 0;
    size +=
      this.Filter.length > 0
        ? 1 + __proto.Sizer.varint64(this.Filter.length) + this.Filter.length
        : 0;
    size += this.Approve == 0 ? 0 : 1 + __proto.Sizer.uint32(this.Approve);
    size += this.Deny == 0 ? 0 : 1 + __proto.Sizer.uint32(this.Deny);

    return size;
  }

  // Encodes AccessReviewThreshold to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes AccessReviewThreshold to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Name.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Name.length);
      encoder.string(this.Name);
    }
    if (this.Filter.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.Filter.length);
      encoder.string(this.Filter);
    }
    if (this.Approve != 0) {
      encoder.uint32(0x18);
      encoder.uint32(this.Approve);
    }
    if (this.Deny != 0) {
      encoder.uint32(0x20);
      encoder.uint32(this.Deny);
    }

    return buf;
  } // encode AccessReviewThreshold
} // AccessReviewThreshold

// AccessReview is a review to be applied to an access request.
export class AccessReview {
  // Author is the teleport username of the review author.
  public Author: string = "";
  // Roles is a list used for role-subselection (not yet fully supported).
  public Roles: Array<string> = new Array<string>();
  // ProposedState is the proposed state (must be APPROVED or DENIED).
  public ProposedState: u32;
  /**
   * Reason is an optional human-readable reason for why the above state
   *  is being proposed.
   */
  public Reason: string = "";
  // Created is the time at which the review was created.
  public Created: google.protobuf.Timestamp = new google.protobuf.Timestamp();
  // Annotations is the proposed value of the request's resolve_annotations field.
  public Annotations: wrappers.LabelValues = new wrappers.LabelValues();
  /**
   * ThresholdIndexes stores the indexes of thresholds which this review matches
   *  (internal use only).
   */
  public ThresholdIndexes: Array<u32> = new Array<u32>();

  // Decodes AccessReview from an ArrayBuffer
  static decode(buf: ArrayBuffer): AccessReview {
    return AccessReview.decodeDataView(new DataView(buf));
  }

  // Decodes AccessReview from a DataView
  static decodeDataView(view: DataView): AccessReview {
    const decoder = new __proto.Decoder(view);
    const obj = new AccessReview();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Author = decoder.string();
          break;
        }
        case 2: {
          obj.Roles.push(decoder.string());
          break;
        }
        case 3: {
          obj.ProposedState = decoder.uint32();
          break;
        }
        case 4: {
          obj.Reason = decoder.string();
          break;
        }
        case 5: {
          const length = decoder.uint32();
          obj.Created = google.protobuf.Timestamp.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 6: {
          const length = decoder.uint32();
          obj.Annotations = wrappers.LabelValues.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 7: {
          obj.ThresholdIndexes.push(decoder.uint32());
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode AccessReview

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Author.length > 0
        ? 1 + __proto.Sizer.varint64(this.Author.length) + this.Author.length
        : 0;

    size += __size_string_repeated(this.Roles);

    size +=
      this.ProposedState == 0
        ? 0
        : 1 + __proto.Sizer.uint32(this.ProposedState);
    size +=
      this.Reason.length > 0
        ? 1 + __proto.Sizer.varint64(this.Reason.length) + this.Reason.length
        : 0;

    if (this.Created != null) {
      const f: google.protobuf.Timestamp = this
        .Created as google.protobuf.Timestamp;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Annotations != null) {
      const f: wrappers.LabelValues = this.Annotations as wrappers.LabelValues;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size += __size_uint32_repeated(this.ThresholdIndexes);

    return size;
  }

  // Encodes AccessReview to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes AccessReview to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Author.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Author.length);
      encoder.string(this.Author);
    }

    if (this.Roles.length > 0) {
      for (let n: i32 = 0; n < this.Roles.length; n++) {
        encoder.uint32(0x12);
        encoder.uint32(this.Roles[n].length);
        encoder.string(this.Roles[n]);
      }
    }

    if (this.ProposedState != 0) {
      encoder.uint32(0x18);
      encoder.uint32(this.ProposedState);
    }
    if (this.Reason.length > 0) {
      encoder.uint32(0x22);
      encoder.uint32(this.Reason.length);
      encoder.string(this.Reason);
    }

    if (this.Created != null) {
      const f = this.Created as google.protobuf.Timestamp;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Annotations != null) {
      const f = this.Annotations as wrappers.LabelValues;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x32);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.ThresholdIndexes.length > 0) {
      for (let n: i32 = 0; n < this.ThresholdIndexes.length; n++) {
        encoder.uint32(0x3a);
        encoder.uint32(this.ThresholdIndexes[n]);
      }
    }

    return buf;
  } // encode AccessReview
} // AccessReview

/**
 * AccessReviewSubmission encodes the necessary parameters for submitting
 *  a new access review.
 */
export class AccessReviewSubmission {
  // RequestID is the unique ID of the request to be reviewed.
  public RequestID: string = "";
  // Review is the review to be applied.
  public Review: AccessReview = new AccessReview();

  // Decodes AccessReviewSubmission from an ArrayBuffer
  static decode(buf: ArrayBuffer): AccessReviewSubmission {
    return AccessReviewSubmission.decodeDataView(new DataView(buf));
  }

  // Decodes AccessReviewSubmission from a DataView
  static decodeDataView(view: DataView): AccessReviewSubmission {
    const decoder = new __proto.Decoder(view);
    const obj = new AccessReviewSubmission();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.RequestID = decoder.string();
          break;
        }
        case 2: {
          const length = decoder.uint32();
          obj.Review = AccessReview.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode AccessReviewSubmission

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.RequestID.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.RequestID.length) +
          this.RequestID.length
        : 0;

    if (this.Review != null) {
      const f: AccessReview = this.Review as AccessReview;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes AccessReviewSubmission to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes AccessReviewSubmission to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.RequestID.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.RequestID.length);
      encoder.string(this.RequestID);
    }

    if (this.Review != null) {
      const f = this.Review as AccessReview;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode AccessReviewSubmission
} // AccessReviewSubmission

/**
 * ThresholdIndexSet encodes a list of threshold indexes. One of the listed thresholds
 *  must pass for the set to be considered to have passed (i.e. this is an `or` operator).
 */
export class ThresholdIndexSet {
  // Indexes are the indexes of thresholds which relate to the role.
  public Indexes: Array<u32> = new Array<u32>();

  // Decodes ThresholdIndexSet from an ArrayBuffer
  static decode(buf: ArrayBuffer): ThresholdIndexSet {
    return ThresholdIndexSet.decodeDataView(new DataView(buf));
  }

  // Decodes ThresholdIndexSet from a DataView
  static decodeDataView(view: DataView): ThresholdIndexSet {
    const decoder = new __proto.Decoder(view);
    const obj = new ThresholdIndexSet();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Indexes.push(decoder.uint32());
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode ThresholdIndexSet

  public size(): u32 {
    let size: u32 = 0;

    size += __size_uint32_repeated(this.Indexes);

    return size;
  }

  // Encodes ThresholdIndexSet to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes ThresholdIndexSet to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Indexes.length > 0) {
      for (let n: i32 = 0; n < this.Indexes.length; n++) {
        encoder.uint32(0xa);
        encoder.uint32(this.Indexes[n]);
      }
    }

    return buf;
  } // encode ThresholdIndexSet
} // ThresholdIndexSet

/**
 * ThresholdIndexSets is a list of threshold index sets.  Each of the individual
 *  sets must pass (i.e. this is an `and` operator).
 */
export class ThresholdIndexSets {
  // Sets are the sets that make up this group.
  public Sets: Array<ThresholdIndexSet> = new Array<ThresholdIndexSet>();

  // Decodes ThresholdIndexSets from an ArrayBuffer
  static decode(buf: ArrayBuffer): ThresholdIndexSets {
    return ThresholdIndexSets.decodeDataView(new DataView(buf));
  }

  // Decodes ThresholdIndexSets from a DataView
  static decodeDataView(view: DataView): ThresholdIndexSets {
    const decoder = new __proto.Decoder(view);
    const obj = new ThresholdIndexSets();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          const length = decoder.uint32();
          obj.Sets.push(
            ThresholdIndexSet.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length
              )
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode ThresholdIndexSets

  public size(): u32 {
    let size: u32 = 0;

    for (let n: i32 = 0; n < this.Sets.length; n++) {
      const messageSize = this.Sets[n].size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes ThresholdIndexSets to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes ThresholdIndexSets to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    for (let n: i32 = 0; n < this.Sets.length; n++) {
      const messageSize = this.Sets[n].size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        this.Sets[n].encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode ThresholdIndexSets
} // ThresholdIndexSets

// AccessRequestSpec is the specification for AccessRequest
export class AccessRequestSpecV3 {
  // User is the name of the user to whom the roles will be applied.
  public User: string = "";
  // Roles is the name of the roles being requested.
  public Roles: Array<string> = new Array<string>();
  // State is the current state of this access request.
  public State: u32;
  /**
   * Created encodes the time at which the request was registered with the auth
   *  server.
   */
  public Created: google.protobuf.Timestamp = new google.protobuf.Timestamp();
  /**
   * Expires constrains the maximum lifetime of any login session for which this
   *  request is active.
   */
  public Expires: google.protobuf.Timestamp = new google.protobuf.Timestamp();
  // RequestReason is an optional message explaining the reason for the request.
  public RequestReason: string = "";
  /**
   * ResolveReason is an optional message explaining the reason for the resolution
   *  of the request (approval, denail, etc...).
   */
  public ResolveReason: string = "";
  /**
   * ResolveAnnotations is a set of arbitrary values received from plugins or other
   *  resolving parties during approval/denial.  Importantly, these annotations are
   *  included in the access_request.update event, allowing plugins to propagate
   *  arbitrary structured data to the audit log.
   */
  public ResolveAnnotations: wrappers.LabelValues = new wrappers.LabelValues();
  /**
   * SystemAnnotations is a set of programmatically generated annotations attached
   *  to pending access requests by teleport.  These annotations are generated by
   *  applying variable interpolation to the RoleConditions.Request.Annotations block
   *  of a user's role(s).  These annotations serve as a mechanism for administrators
   *  to pass extra information to plugins when they process pending access requests.
   */
  public SystemAnnotations: wrappers.LabelValues = new wrappers.LabelValues();
  /**
   * Thresholds is a list of review thresholds relevant to this request.  Order must be
   *  preserved, as thresholds are referenced by index (internal use only).
   */
  public Thresholds: Array<AccessReviewThreshold> =
    new Array<AccessReviewThreshold>();
  /**
   * RoleThresholdMapping encodes the relationship between the requested roles and
   *  the review threshold requirements for the given role (internal use only).
   *  By storing a representation of which thresholds must pass for each requested role, we
   *  both eliminate the need to cache the requestor's roles directly, and allow future
   *  versions of teleport to become smarter about calculating more granular requirements
   *  in a backwards-compatible manner (i.e. calculation can become smarter in minor releases).
   *  Storing this relationship on the request is necessary in order to avoid unexpected or
   *  inconsistent behavior due to review submission timing.
   */
  public RoleThresholdMapping: Map<string, ThresholdIndexSets> = new Map<
    string,
    ThresholdIndexSets
  >();
  // Reviews is a list of reviews applied to this request (internal use only).
  public Reviews: Array<AccessReview> = new Array<AccessReview>();
  /**
   * SuggestedReviewers is a list of reviewer suggestions.  These can be teleport usernames, but
   *  that is not a requirement.
   */
  public SuggestedReviewers: Array<string> = new Array<string>();

  // Decodes AccessRequestSpecV3 from an ArrayBuffer
  static decode(buf: ArrayBuffer): AccessRequestSpecV3 {
    return AccessRequestSpecV3.decodeDataView(new DataView(buf));
  }

  // Decodes AccessRequestSpecV3 from a DataView
  static decodeDataView(view: DataView): AccessRequestSpecV3 {
    const decoder = new __proto.Decoder(view);
    const obj = new AccessRequestSpecV3();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.User = decoder.string();
          break;
        }
        case 2: {
          obj.Roles.push(decoder.string());
          break;
        }
        case 3: {
          obj.State = decoder.uint32();
          break;
        }
        case 4: {
          const length = decoder.uint32();
          obj.Created = google.protobuf.Timestamp.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 5: {
          const length = decoder.uint32();
          obj.Expires = google.protobuf.Timestamp.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 6: {
          obj.RequestReason = decoder.string();
          break;
        }
        case 7: {
          obj.ResolveReason = decoder.string();
          break;
        }
        case 8: {
          const length = decoder.uint32();
          obj.ResolveAnnotations = wrappers.LabelValues.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 9: {
          const length = decoder.uint32();
          obj.SystemAnnotations = wrappers.LabelValues.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 10: {
          const length = decoder.uint32();
          obj.Thresholds.push(
            AccessReviewThreshold.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length
              )
            )
          );
          decoder.skip(length);

          break;
        }
        case 11: {
          const length = decoder.uint32();
          __decodeMap_string_ThresholdIndexSets(
            decoder,
            length,
            obj.RoleThresholdMapping
          );
          decoder.skip(length);

          break;
        }
        case 12: {
          const length = decoder.uint32();
          obj.Reviews.push(
            AccessReview.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length
              )
            )
          );
          decoder.skip(length);

          break;
        }
        case 13: {
          obj.SuggestedReviewers.push(decoder.string());
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode AccessRequestSpecV3

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.User.length > 0
        ? 1 + __proto.Sizer.varint64(this.User.length) + this.User.length
        : 0;

    size += __size_string_repeated(this.Roles);

    size += this.State == 0 ? 0 : 1 + __proto.Sizer.uint32(this.State);

    if (this.Created != null) {
      const f: google.protobuf.Timestamp = this
        .Created as google.protobuf.Timestamp;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Expires != null) {
      const f: google.protobuf.Timestamp = this
        .Expires as google.protobuf.Timestamp;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.RequestReason.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.RequestReason.length) +
          this.RequestReason.length
        : 0;
    size +=
      this.ResolveReason.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.ResolveReason.length) +
          this.ResolveReason.length
        : 0;

    if (this.ResolveAnnotations != null) {
      const f: wrappers.LabelValues = this
        .ResolveAnnotations as wrappers.LabelValues;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.SystemAnnotations != null) {
      const f: wrappers.LabelValues = this
        .SystemAnnotations as wrappers.LabelValues;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    for (let n: i32 = 0; n < this.Thresholds.length; n++) {
      const messageSize = this.Thresholds[n].size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.RoleThresholdMapping.size > 0) {
      const keys = this.RoleThresholdMapping.keys();

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = this.RoleThresholdMapping.get(key);
        const itemSize = __sizeMapEntry_string_ThresholdIndexSets(key, value);
        if (itemSize > 0) {
          size += 1 + __proto.Sizer.varint64(itemSize) + itemSize;
        }
      }
    }

    for (let n: i32 = 0; n < this.Reviews.length; n++) {
      const messageSize = this.Reviews[n].size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size += __size_string_repeated(this.SuggestedReviewers);

    return size;
  }

  // Encodes AccessRequestSpecV3 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes AccessRequestSpecV3 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.User.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.User.length);
      encoder.string(this.User);
    }

    if (this.Roles.length > 0) {
      for (let n: i32 = 0; n < this.Roles.length; n++) {
        encoder.uint32(0x12);
        encoder.uint32(this.Roles[n].length);
        encoder.string(this.Roles[n]);
      }
    }

    if (this.State != 0) {
      encoder.uint32(0x18);
      encoder.uint32(this.State);
    }

    if (this.Created != null) {
      const f = this.Created as google.protobuf.Timestamp;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Expires != null) {
      const f = this.Expires as google.protobuf.Timestamp;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.RequestReason.length > 0) {
      encoder.uint32(0x32);
      encoder.uint32(this.RequestReason.length);
      encoder.string(this.RequestReason);
    }
    if (this.ResolveReason.length > 0) {
      encoder.uint32(0x3a);
      encoder.uint32(this.ResolveReason.length);
      encoder.string(this.ResolveReason);
    }

    if (this.ResolveAnnotations != null) {
      const f = this.ResolveAnnotations as wrappers.LabelValues;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x42);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.SystemAnnotations != null) {
      const f = this.SystemAnnotations as wrappers.LabelValues;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x4a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    for (let n: i32 = 0; n < this.Thresholds.length; n++) {
      const messageSize = this.Thresholds[n].size();

      if (messageSize > 0) {
        encoder.uint32(0x52);
        encoder.uint32(messageSize);
        this.Thresholds[n].encodeU8Array(encoder);
      }
    }

    if (this.RoleThresholdMapping.size > 0) {
      const keys = this.RoleThresholdMapping.keys();
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = this.RoleThresholdMapping.get(key);
        const size = __sizeMapEntry_string_ThresholdIndexSets(key, value);
        if (size > 0) {
          encoder.uint32(0x5a);
          encoder.uint32(size);
          if (key.length > 0) {
            encoder.uint32(0xa);
            encoder.uint32(key.length);
            encoder.string(key);
          }

          const messageSize = value.size();

          if (messageSize > 0) {
            encoder.uint32(0x12);
            encoder.uint32(messageSize);
            value.encodeU8Array(encoder);
          }
        }
      }
    }

    for (let n: i32 = 0; n < this.Reviews.length; n++) {
      const messageSize = this.Reviews[n].size();

      if (messageSize > 0) {
        encoder.uint32(0x62);
        encoder.uint32(messageSize);
        this.Reviews[n].encodeU8Array(encoder);
      }
    }

    if (this.SuggestedReviewers.length > 0) {
      for (let n: i32 = 0; n < this.SuggestedReviewers.length; n++) {
        encoder.uint32(0x6a);
        encoder.uint32(this.SuggestedReviewers[n].length);
        encoder.string(this.SuggestedReviewers[n]);
      }
    }

    return buf;
  } // encode AccessRequestSpecV3
} // AccessRequestSpecV3

// AccessRequestFilter encodes filter params for access requests.
export class AccessRequestFilter {
  // ID specifies a request ID if set.
  public ID: string = "";
  // User specifies a username if set.
  public User: string = "";
  // RequestState filters for requests in a specific state.
  public State: u32;

  // Decodes AccessRequestFilter from an ArrayBuffer
  static decode(buf: ArrayBuffer): AccessRequestFilter {
    return AccessRequestFilter.decodeDataView(new DataView(buf));
  }

  // Decodes AccessRequestFilter from a DataView
  static decodeDataView(view: DataView): AccessRequestFilter {
    const decoder = new __proto.Decoder(view);
    const obj = new AccessRequestFilter();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.ID = decoder.string();
          break;
        }
        case 2: {
          obj.User = decoder.string();
          break;
        }
        case 3: {
          obj.State = decoder.uint32();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode AccessRequestFilter

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.ID.length > 0
        ? 1 + __proto.Sizer.varint64(this.ID.length) + this.ID.length
        : 0;
    size +=
      this.User.length > 0
        ? 1 + __proto.Sizer.varint64(this.User.length) + this.User.length
        : 0;
    size += this.State == 0 ? 0 : 1 + __proto.Sizer.uint32(this.State);

    return size;
  }

  // Encodes AccessRequestFilter to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes AccessRequestFilter to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.ID.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.ID.length);
      encoder.string(this.ID);
    }
    if (this.User.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.User.length);
      encoder.string(this.User);
    }
    if (this.State != 0) {
      encoder.uint32(0x18);
      encoder.uint32(this.State);
    }

    return buf;
  } // encode AccessRequestFilter
} // AccessRequestFilter

/**
 * AccessCapabilities is a summary of capabilities that a user
 *  is granted via their dynamic access privileges which may not be
 *  calculable by directly examining the user's own static roles.
 */
export class AccessCapabilities {
  // RequestableRoles is a list of existent roles which the user is allowed to request.
  public RequestableRoles: Array<string> = new Array<string>();
  // SuggestedReviewers is a list of all reviewers which are suggested by the user's roles.
  public SuggestedReviewers: Array<string> = new Array<string>();

  // Decodes AccessCapabilities from an ArrayBuffer
  static decode(buf: ArrayBuffer): AccessCapabilities {
    return AccessCapabilities.decodeDataView(new DataView(buf));
  }

  // Decodes AccessCapabilities from a DataView
  static decodeDataView(view: DataView): AccessCapabilities {
    const decoder = new __proto.Decoder(view);
    const obj = new AccessCapabilities();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.RequestableRoles.push(decoder.string());
          break;
        }
        case 2: {
          obj.SuggestedReviewers.push(decoder.string());
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode AccessCapabilities

  public size(): u32 {
    let size: u32 = 0;

    size += __size_string_repeated(this.RequestableRoles);

    size += __size_string_repeated(this.SuggestedReviewers);

    return size;
  }

  // Encodes AccessCapabilities to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes AccessCapabilities to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.RequestableRoles.length > 0) {
      for (let n: i32 = 0; n < this.RequestableRoles.length; n++) {
        encoder.uint32(0xa);
        encoder.uint32(this.RequestableRoles[n].length);
        encoder.string(this.RequestableRoles[n]);
      }
    }

    if (this.SuggestedReviewers.length > 0) {
      for (let n: i32 = 0; n < this.SuggestedReviewers.length; n++) {
        encoder.uint32(0x12);
        encoder.uint32(this.SuggestedReviewers[n].length);
        encoder.string(this.SuggestedReviewers[n]);
      }
    }

    return buf;
  } // encode AccessCapabilities
} // AccessCapabilities

// AccessCapabilitiesRequest encodes parameters for the GetAccessCapabilities method.
export class AccessCapabilitiesRequest {
  /**
   * User is the name of the user whose capabilities we are interested in (defaults to
   *  the caller's own username).
   */
  public User: string = "";
  /**
   * RequestableRoles is a flag indicating that we would like to view the list of roles
   *  that the user is able to request.
   */
  public RequestableRoles: bool;
  /**
   * SuggestedReviewers is a flag indicating that we would like to view the list of all
   *  reviewers which are suggested by the user's roles.
   */
  public SuggestedReviewers: bool;

  // Decodes AccessCapabilitiesRequest from an ArrayBuffer
  static decode(buf: ArrayBuffer): AccessCapabilitiesRequest {
    return AccessCapabilitiesRequest.decodeDataView(new DataView(buf));
  }

  // Decodes AccessCapabilitiesRequest from a DataView
  static decodeDataView(view: DataView): AccessCapabilitiesRequest {
    const decoder = new __proto.Decoder(view);
    const obj = new AccessCapabilitiesRequest();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.User = decoder.string();
          break;
        }
        case 2: {
          obj.RequestableRoles = decoder.bool();
          break;
        }
        case 3: {
          obj.SuggestedReviewers = decoder.bool();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode AccessCapabilitiesRequest

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.User.length > 0
        ? 1 + __proto.Sizer.varint64(this.User.length) + this.User.length
        : 0;
    size += this.RequestableRoles == 0 ? 0 : 1 + 1;
    size += this.SuggestedReviewers == 0 ? 0 : 1 + 1;

    return size;
  }

  // Encodes AccessCapabilitiesRequest to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes AccessCapabilitiesRequest to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.User.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.User.length);
      encoder.string(this.User);
    }
    if (this.RequestableRoles != 0) {
      encoder.uint32(0x10);
      encoder.bool(this.RequestableRoles);
    }
    if (this.SuggestedReviewers != 0) {
      encoder.uint32(0x18);
      encoder.bool(this.SuggestedReviewers);
    }

    return buf;
  } // encode AccessCapabilitiesRequest
} // AccessCapabilitiesRequest

// PluginData stores a collection of values associated with a specific resource.
export class PluginDataV3 {
  // Kind is a resource kind
  public Kind: string = "";
  // SubKind is an optional resource sub kind, used in some resources
  public SubKind: string = "";
  // Version is version
  public Version: string = "";
  // Metadata is PluginData metadata
  public Metadata: Metadata = new Metadata();
  // Spec is a PluginData specification
  public Spec: PluginDataSpecV3 = new PluginDataSpecV3();

  // Decodes PluginDataV3 from an ArrayBuffer
  static decode(buf: ArrayBuffer): PluginDataV3 {
    return PluginDataV3.decodeDataView(new DataView(buf));
  }

  // Decodes PluginDataV3 from a DataView
  static decodeDataView(view: DataView): PluginDataV3 {
    const decoder = new __proto.Decoder(view);
    const obj = new PluginDataV3();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Kind = decoder.string();
          break;
        }
        case 2: {
          obj.SubKind = decoder.string();
          break;
        }
        case 3: {
          obj.Version = decoder.string();
          break;
        }
        case 4: {
          const length = decoder.uint32();
          obj.Metadata = Metadata.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 5: {
          const length = decoder.uint32();
          obj.Spec = PluginDataSpecV3.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode PluginDataV3

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Kind.length > 0
        ? 1 + __proto.Sizer.varint64(this.Kind.length) + this.Kind.length
        : 0;
    size +=
      this.SubKind.length > 0
        ? 1 + __proto.Sizer.varint64(this.SubKind.length) + this.SubKind.length
        : 0;
    size +=
      this.Version.length > 0
        ? 1 + __proto.Sizer.varint64(this.Version.length) + this.Version.length
        : 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Spec != null) {
      const f: PluginDataSpecV3 = this.Spec as PluginDataSpecV3;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes PluginDataV3 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes PluginDataV3 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Kind.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Kind.length);
      encoder.string(this.Kind);
    }
    if (this.SubKind.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.SubKind.length);
      encoder.string(this.SubKind);
    }
    if (this.Version.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Version.length);
      encoder.string(this.Version);
    }

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Spec != null) {
      const f = this.Spec as PluginDataSpecV3;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode PluginDataV3
} // PluginDataV3

/**
 * PluginDataEntry wraps a mapping of arbitrary string values used by
 *  plugins to store per-resource information.
 */
export class PluginDataEntry {
  // Data is a mapping of arbitrary string values.
  public Data: Map<string, string> = new Map<string, string>();

  // Decodes PluginDataEntry from an ArrayBuffer
  static decode(buf: ArrayBuffer): PluginDataEntry {
    return PluginDataEntry.decodeDataView(new DataView(buf));
  }

  // Decodes PluginDataEntry from a DataView
  static decodeDataView(view: DataView): PluginDataEntry {
    const decoder = new __proto.Decoder(view);
    const obj = new PluginDataEntry();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          const length = decoder.uint32();
          __decodeMap_string_string(decoder, length, obj.Data);
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode PluginDataEntry

  public size(): u32 {
    let size: u32 = 0;

    if (this.Data.size > 0) {
      const keys = this.Data.keys();

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = this.Data.get(key);
        const itemSize = __sizeMapEntry_string_string(key, value);
        if (itemSize > 0) {
          size += 1 + __proto.Sizer.varint64(itemSize) + itemSize;
        }
      }
    }

    return size;
  }

  // Encodes PluginDataEntry to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes PluginDataEntry to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Data.size > 0) {
      const keys = this.Data.keys();
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = this.Data.get(key);
        const size = __sizeMapEntry_string_string(key, value);
        if (size > 0) {
          encoder.uint32(0xa);
          encoder.uint32(size);
          if (key.length > 0) {
            encoder.uint32(0xa);
            encoder.uint32(key.length);
            encoder.string(key);
          }
          if (value.length > 0) {
            encoder.uint32(0x12);
            encoder.uint32(value.length);
            encoder.string(value);
          }
        }
      }
    }

    return buf;
  } // encode PluginDataEntry
} // PluginDataEntry

// PluginData stores a collection of values associated with a specific resource.
export class PluginDataSpecV3 {
  // Entries is a collection of PluginData values organized by plugin name.
  public Entries: Map<string, PluginDataEntry> = new Map<
    string,
    PluginDataEntry
  >();

  // Decodes PluginDataSpecV3 from an ArrayBuffer
  static decode(buf: ArrayBuffer): PluginDataSpecV3 {
    return PluginDataSpecV3.decodeDataView(new DataView(buf));
  }

  // Decodes PluginDataSpecV3 from a DataView
  static decodeDataView(view: DataView): PluginDataSpecV3 {
    const decoder = new __proto.Decoder(view);
    const obj = new PluginDataSpecV3();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          const length = decoder.uint32();
          __decodeMap_string_PluginDataEntry(decoder, length, obj.Entries);
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode PluginDataSpecV3

  public size(): u32 {
    let size: u32 = 0;

    if (this.Entries.size > 0) {
      const keys = this.Entries.keys();

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = this.Entries.get(key);
        const itemSize = __sizeMapEntry_string_PluginDataEntry(key, value);
        if (itemSize > 0) {
          size += 1 + __proto.Sizer.varint64(itemSize) + itemSize;
        }
      }
    }

    return size;
  }

  // Encodes PluginDataSpecV3 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes PluginDataSpecV3 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Entries.size > 0) {
      const keys = this.Entries.keys();
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = this.Entries.get(key);
        const size = __sizeMapEntry_string_PluginDataEntry(key, value);
        if (size > 0) {
          encoder.uint32(0xa);
          encoder.uint32(size);
          if (key.length > 0) {
            encoder.uint32(0xa);
            encoder.uint32(key.length);
            encoder.string(key);
          }

          const messageSize = value.size();

          if (messageSize > 0) {
            encoder.uint32(0x12);
            encoder.uint32(messageSize);
            value.encodeU8Array(encoder);
          }
        }
      }
    }

    return buf;
  } // encode PluginDataSpecV3
} // PluginDataSpecV3

/**
 * NOTE: PluginDataFilter and PluginDataUpdateParams currently only target AccessRequest resources
 *  since those are the only resources currently managed via plugin.  Support for additional resource
 *  kinds may be added in a backwards-compatible manner by adding a `Kind` field which defaults
 *  to `access_request` if unspecified.
 *  PluginDataFilter encodes filter params for plugin data.
 */
export class PluginDataFilter {
  /**
   * Kind is the kind of resource that the target plugin data
   *  is associated with.
   */
  public Kind: string = "";
  // Resource matches a specific resource name if set.
  public Resource: string = "";
  // Plugin matches a specific plugin name if set.
  public Plugin: string = "";

  // Decodes PluginDataFilter from an ArrayBuffer
  static decode(buf: ArrayBuffer): PluginDataFilter {
    return PluginDataFilter.decodeDataView(new DataView(buf));
  }

  // Decodes PluginDataFilter from a DataView
  static decodeDataView(view: DataView): PluginDataFilter {
    const decoder = new __proto.Decoder(view);
    const obj = new PluginDataFilter();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Kind = decoder.string();
          break;
        }
        case 2: {
          obj.Resource = decoder.string();
          break;
        }
        case 3: {
          obj.Plugin = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode PluginDataFilter

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Kind.length > 0
        ? 1 + __proto.Sizer.varint64(this.Kind.length) + this.Kind.length
        : 0;
    size +=
      this.Resource.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.Resource.length) +
          this.Resource.length
        : 0;
    size +=
      this.Plugin.length > 0
        ? 1 + __proto.Sizer.varint64(this.Plugin.length) + this.Plugin.length
        : 0;

    return size;
  }

  // Encodes PluginDataFilter to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes PluginDataFilter to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Kind.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Kind.length);
      encoder.string(this.Kind);
    }
    if (this.Resource.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.Resource.length);
      encoder.string(this.Resource);
    }
    if (this.Plugin.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Plugin.length);
      encoder.string(this.Plugin);
    }

    return buf;
  } // encode PluginDataFilter
} // PluginDataFilter

// PluginDataUpdateParams encodes paramers for updating a PluginData field.
export class PluginDataUpdateParams {
  /**
   * Kind is the kind of resource that the target plugin data
   *  is associated with.
   */
  public Kind: string = "";
  // Resource indicates the name of the target resource.
  public Resource: string = "";
  // Plugin is the name of the plugin that owns the data.
  public Plugin: string = "";
  // Set indicates the fields which should be set by this operation.
  public Set: Map<string, string> = new Map<string, string>();
  // Expect optionally indicates the expected state of fields prior to this update.
  public Expect: Map<string, string> = new Map<string, string>();

  // Decodes PluginDataUpdateParams from an ArrayBuffer
  static decode(buf: ArrayBuffer): PluginDataUpdateParams {
    return PluginDataUpdateParams.decodeDataView(new DataView(buf));
  }

  // Decodes PluginDataUpdateParams from a DataView
  static decodeDataView(view: DataView): PluginDataUpdateParams {
    const decoder = new __proto.Decoder(view);
    const obj = new PluginDataUpdateParams();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Kind = decoder.string();
          break;
        }
        case 2: {
          obj.Resource = decoder.string();
          break;
        }
        case 3: {
          obj.Plugin = decoder.string();
          break;
        }
        case 4: {
          const length = decoder.uint32();
          __decodeMap_string_string(decoder, length, obj.Set);
          decoder.skip(length);

          break;
        }
        case 5: {
          const length = decoder.uint32();
          __decodeMap_string_string(decoder, length, obj.Expect);
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode PluginDataUpdateParams

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Kind.length > 0
        ? 1 + __proto.Sizer.varint64(this.Kind.length) + this.Kind.length
        : 0;
    size +=
      this.Resource.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.Resource.length) +
          this.Resource.length
        : 0;
    size +=
      this.Plugin.length > 0
        ? 1 + __proto.Sizer.varint64(this.Plugin.length) + this.Plugin.length
        : 0;

    if (this.Set.size > 0) {
      const keys = this.Set.keys();

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = this.Set.get(key);
        const itemSize = __sizeMapEntry_string_string(key, value);
        if (itemSize > 0) {
          size += 1 + __proto.Sizer.varint64(itemSize) + itemSize;
        }
      }
    }

    if (this.Expect.size > 0) {
      const keys = this.Expect.keys();

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = this.Expect.get(key);
        const itemSize = __sizeMapEntry_string_string(key, value);
        if (itemSize > 0) {
          size += 1 + __proto.Sizer.varint64(itemSize) + itemSize;
        }
      }
    }

    return size;
  }

  // Encodes PluginDataUpdateParams to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes PluginDataUpdateParams to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Kind.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Kind.length);
      encoder.string(this.Kind);
    }
    if (this.Resource.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.Resource.length);
      encoder.string(this.Resource);
    }
    if (this.Plugin.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Plugin.length);
      encoder.string(this.Plugin);
    }

    if (this.Set.size > 0) {
      const keys = this.Set.keys();
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = this.Set.get(key);
        const size = __sizeMapEntry_string_string(key, value);
        if (size > 0) {
          encoder.uint32(0x22);
          encoder.uint32(size);
          if (key.length > 0) {
            encoder.uint32(0xa);
            encoder.uint32(key.length);
            encoder.string(key);
          }
          if (value.length > 0) {
            encoder.uint32(0x12);
            encoder.uint32(value.length);
            encoder.string(value);
          }
        }
      }
    }

    if (this.Expect.size > 0) {
      const keys = this.Expect.keys();
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = this.Expect.get(key);
        const size = __sizeMapEntry_string_string(key, value);
        if (size > 0) {
          encoder.uint32(0x2a);
          encoder.uint32(size);
          if (key.length > 0) {
            encoder.uint32(0xa);
            encoder.uint32(key.length);
            encoder.string(key);
          }
          if (value.length > 0) {
            encoder.uint32(0x12);
            encoder.uint32(value.length);
            encoder.string(value);
          }
        }
      }
    }

    return buf;
  } // encode PluginDataUpdateParams
} // PluginDataUpdateParams

// RoleV5 represents role resource specification
export class RoleV5 {
  // Kind is a resource kind
  public Kind: string = "";
  // SubKind is an optional resource sub kind, used in some resources
  public SubKind: string = "";
  // Version is version
  public Version: string = "";
  // Metadata is resource metadata
  public Metadata: Metadata = new Metadata();
  // Spec is a role specification
  public Spec: RoleSpecV5 = new RoleSpecV5();

  // Decodes RoleV5 from an ArrayBuffer
  static decode(buf: ArrayBuffer): RoleV5 {
    return RoleV5.decodeDataView(new DataView(buf));
  }

  // Decodes RoleV5 from a DataView
  static decodeDataView(view: DataView): RoleV5 {
    const decoder = new __proto.Decoder(view);
    const obj = new RoleV5();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Kind = decoder.string();
          break;
        }
        case 2: {
          obj.SubKind = decoder.string();
          break;
        }
        case 3: {
          obj.Version = decoder.string();
          break;
        }
        case 4: {
          const length = decoder.uint32();
          obj.Metadata = Metadata.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 5: {
          const length = decoder.uint32();
          obj.Spec = RoleSpecV5.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode RoleV5

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Kind.length > 0
        ? 1 + __proto.Sizer.varint64(this.Kind.length) + this.Kind.length
        : 0;
    size +=
      this.SubKind.length > 0
        ? 1 + __proto.Sizer.varint64(this.SubKind.length) + this.SubKind.length
        : 0;
    size +=
      this.Version.length > 0
        ? 1 + __proto.Sizer.varint64(this.Version.length) + this.Version.length
        : 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Spec != null) {
      const f: RoleSpecV5 = this.Spec as RoleSpecV5;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes RoleV5 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes RoleV5 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Kind.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Kind.length);
      encoder.string(this.Kind);
    }
    if (this.SubKind.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.SubKind.length);
      encoder.string(this.SubKind);
    }
    if (this.Version.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Version.length);
      encoder.string(this.Version);
    }

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Spec != null) {
      const f = this.Spec as RoleSpecV5;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode RoleV5
} // RoleV5

// RoleSpecV5 is role specification for RoleV5.
export class RoleSpecV5 {
  // Options is for OpenSSH options like agent forwarding.
  public Options: RoleOptions = new RoleOptions();
  // Allow is the set of conditions evaluated to grant access.
  public Allow: RoleConditions = new RoleConditions();
  /**
   * Deny is the set of conditions evaluated to deny access. Deny takes priority
   *  over allow.
   */
  public Deny: RoleConditions = new RoleConditions();

  // Decodes RoleSpecV5 from an ArrayBuffer
  static decode(buf: ArrayBuffer): RoleSpecV5 {
    return RoleSpecV5.decodeDataView(new DataView(buf));
  }

  // Decodes RoleSpecV5 from a DataView
  static decodeDataView(view: DataView): RoleSpecV5 {
    const decoder = new __proto.Decoder(view);
    const obj = new RoleSpecV5();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          const length = decoder.uint32();
          obj.Options = RoleOptions.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 2: {
          const length = decoder.uint32();
          obj.Allow = RoleConditions.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 3: {
          const length = decoder.uint32();
          obj.Deny = RoleConditions.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode RoleSpecV5

  public size(): u32 {
    let size: u32 = 0;

    if (this.Options != null) {
      const f: RoleOptions = this.Options as RoleOptions;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Allow != null) {
      const f: RoleConditions = this.Allow as RoleConditions;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Deny != null) {
      const f: RoleConditions = this.Deny as RoleConditions;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes RoleSpecV5 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes RoleSpecV5 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Options != null) {
      const f = this.Options as RoleOptions;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Allow != null) {
      const f = this.Allow as RoleConditions;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Deny != null) {
      const f = this.Deny as RoleConditions;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode RoleSpecV5
} // RoleSpecV5

// RoleOptions is a set of role options
export class RoleOptions {
  // ForwardAgent is SSH agent forwarding.
  public ForwardAgent: bool;
  // MaxSessionTTL defines how long a SSH session can last for.
  public MaxSessionTTL: i64;
  /**
   * PortForwarding defines if the certificate will have
   *  "permit-port-forwarding"
   *  in the certificate. PortForwarding is "yes" if not set,
   *  that's why this is a pointer
   */
  public PortForwarding: BoolValue = new BoolValue();
  /**
   * CertificateFormat defines the format of the user certificate to allow
   *  compatibility with older versions of OpenSSH.
   */
  public CertificateFormat: string = "";
  /**
   * ClientIdleTimeout sets disconnect clients on idle timeout behavior,
   *  if set to 0 means do not disconnect, otherwise is set to the idle
   *  duration.
   */
  public ClientIdleTimeout: i64;
  // DisconnectExpiredCert sets disconnect clients on expired certificates.
  public DisconnectExpiredCert: bool;
  // BPF defines what events to record for the BPF-based session recorder.
  public BPF: Array<string> = new Array<string>();
  // PermitX11Forwarding authorizes use of X11 forwarding.
  public PermitX11Forwarding: bool;
  /**
   * MaxConnections defines the maximum number of
   *  concurrent connections a user may hold.
   */
  public MaxConnections: i64;
  /**
   * MaxSessions defines the maximum number of
   *  concurrent sessions per connection.
   */
  public MaxSessions: i64;
  /**
   * RequestAccess defines the access request stategy (optional|note|always)
   *  where optional is the default.
   */
  public RequestAccess: string = "";
  // RequestPrompt is an optional message which tells users what they aught to
  public RequestPrompt: string = "";
  /**
   * RequireSessionMFA specifies whether a user is required to do an MFA
   *  check for every session.
   */
  public RequireSessionMFA: bool;
  /**
   * Lock specifies the locking mode (strict|best_effort) to be applied with
   *  the role.
   */
  public Lock: string = "";
  /**
   * RecordDesktopSession indicates whether desktop access sessions should be recorded.
   *  It defaults to true unless explicitly set to false.
   */
  public RecordSession: RecordSession = new RecordSession();
  /**
   * DesktopClipboard indicates whether clipboard sharing is allowed between the user's
   *  workstation and the remote desktop. It defaults to true unless explicitly set to
   *  false.
   */
  public DesktopClipboard: BoolValue = new BoolValue();
  // CertExtensions specifies the key/values
  public CertExtensions: Array<CertExtension> = new Array<CertExtension>();

  // Decodes RoleOptions from an ArrayBuffer
  static decode(buf: ArrayBuffer): RoleOptions {
    return RoleOptions.decodeDataView(new DataView(buf));
  }

  // Decodes RoleOptions from a DataView
  static decodeDataView(view: DataView): RoleOptions {
    const decoder = new __proto.Decoder(view);
    const obj = new RoleOptions();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.ForwardAgent = decoder.bool();
          break;
        }
        case 2: {
          obj.MaxSessionTTL = decoder.int64();
          break;
        }
        case 3: {
          const length = decoder.uint32();
          obj.PortForwarding = BoolValue.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 4: {
          obj.CertificateFormat = decoder.string();
          break;
        }
        case 5: {
          obj.ClientIdleTimeout = decoder.int64();
          break;
        }
        case 6: {
          obj.DisconnectExpiredCert = decoder.bool();
          break;
        }
        case 7: {
          obj.BPF.push(decoder.string());
          break;
        }
        case 8: {
          obj.PermitX11Forwarding = decoder.bool();
          break;
        }
        case 9: {
          obj.MaxConnections = decoder.int64();
          break;
        }
        case 10: {
          obj.MaxSessions = decoder.int64();
          break;
        }
        case 11: {
          obj.RequestAccess = decoder.string();
          break;
        }
        case 12: {
          obj.RequestPrompt = decoder.string();
          break;
        }
        case 13: {
          obj.RequireSessionMFA = decoder.bool();
          break;
        }
        case 14: {
          obj.Lock = decoder.string();
          break;
        }
        case 15: {
          const length = decoder.uint32();
          obj.RecordSession = RecordSession.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 16: {
          const length = decoder.uint32();
          obj.DesktopClipboard = BoolValue.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 17: {
          const length = decoder.uint32();
          obj.CertExtensions.push(
            CertExtension.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length
              )
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode RoleOptions

  public size(): u32 {
    let size: u32 = 0;

    size += this.ForwardAgent == 0 ? 0 : 1 + 1;
    size +=
      this.MaxSessionTTL == 0 ? 0 : 1 + __proto.Sizer.int64(this.MaxSessionTTL);

    if (this.PortForwarding != null) {
      const f: BoolValue = this.PortForwarding as BoolValue;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.CertificateFormat.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.CertificateFormat.length) +
          this.CertificateFormat.length
        : 0;
    size +=
      this.ClientIdleTimeout == 0
        ? 0
        : 1 + __proto.Sizer.int64(this.ClientIdleTimeout);
    size += this.DisconnectExpiredCert == 0 ? 0 : 1 + 1;

    size += __size_string_repeated(this.BPF);

    size += this.PermitX11Forwarding == 0 ? 0 : 1 + 1;
    size +=
      this.MaxConnections == 0
        ? 0
        : 1 + __proto.Sizer.int64(this.MaxConnections);
    size +=
      this.MaxSessions == 0 ? 0 : 1 + __proto.Sizer.int64(this.MaxSessions);
    size +=
      this.RequestAccess.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.RequestAccess.length) +
          this.RequestAccess.length
        : 0;
    size +=
      this.RequestPrompt.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.RequestPrompt.length) +
          this.RequestPrompt.length
        : 0;
    size += this.RequireSessionMFA == 0 ? 0 : 1 + 1;
    size +=
      this.Lock.length > 0
        ? 1 + __proto.Sizer.varint64(this.Lock.length) + this.Lock.length
        : 0;

    if (this.RecordSession != null) {
      const f: RecordSession = this.RecordSession as RecordSession;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.DesktopClipboard != null) {
      const f: BoolValue = this.DesktopClipboard as BoolValue;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    for (let n: i32 = 0; n < this.CertExtensions.length; n++) {
      const messageSize = this.CertExtensions[n].size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes RoleOptions to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes RoleOptions to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.ForwardAgent != 0) {
      encoder.uint32(0x8);
      encoder.bool(this.ForwardAgent);
    }
    if (this.MaxSessionTTL != 0) {
      encoder.uint32(0x10);
      encoder.int64(this.MaxSessionTTL);
    }

    if (this.PortForwarding != null) {
      const f = this.PortForwarding as BoolValue;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.CertificateFormat.length > 0) {
      encoder.uint32(0x22);
      encoder.uint32(this.CertificateFormat.length);
      encoder.string(this.CertificateFormat);
    }
    if (this.ClientIdleTimeout != 0) {
      encoder.uint32(0x28);
      encoder.int64(this.ClientIdleTimeout);
    }
    if (this.DisconnectExpiredCert != 0) {
      encoder.uint32(0x30);
      encoder.bool(this.DisconnectExpiredCert);
    }

    if (this.BPF.length > 0) {
      for (let n: i32 = 0; n < this.BPF.length; n++) {
        encoder.uint32(0x3a);
        encoder.uint32(this.BPF[n].length);
        encoder.string(this.BPF[n]);
      }
    }

    if (this.PermitX11Forwarding != 0) {
      encoder.uint32(0x40);
      encoder.bool(this.PermitX11Forwarding);
    }
    if (this.MaxConnections != 0) {
      encoder.uint32(0x48);
      encoder.int64(this.MaxConnections);
    }
    if (this.MaxSessions != 0) {
      encoder.uint32(0x50);
      encoder.int64(this.MaxSessions);
    }
    if (this.RequestAccess.length > 0) {
      encoder.uint32(0x5a);
      encoder.uint32(this.RequestAccess.length);
      encoder.string(this.RequestAccess);
    }
    if (this.RequestPrompt.length > 0) {
      encoder.uint32(0x62);
      encoder.uint32(this.RequestPrompt.length);
      encoder.string(this.RequestPrompt);
    }
    if (this.RequireSessionMFA != 0) {
      encoder.uint32(0x68);
      encoder.bool(this.RequireSessionMFA);
    }
    if (this.Lock.length > 0) {
      encoder.uint32(0x72);
      encoder.uint32(this.Lock.length);
      encoder.string(this.Lock);
    }

    if (this.RecordSession != null) {
      const f = this.RecordSession as RecordSession;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x7a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.DesktopClipboard != null) {
      const f = this.DesktopClipboard as BoolValue;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x82);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    for (let n: i32 = 0; n < this.CertExtensions.length; n++) {
      const messageSize = this.CertExtensions[n].size();

      if (messageSize > 0) {
        encoder.uint32(0x8a);
        encoder.uint32(messageSize);
        this.CertExtensions[n].encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode RoleOptions
} // RoleOptions

export class RecordSession {
  /**
   * Desktop indicates whether desktop sessions should be recorded.
   *  It defaults to true unless explicitly set to false.
   */
  public Desktop: BoolValue = new BoolValue();

  // Decodes RecordSession from an ArrayBuffer
  static decode(buf: ArrayBuffer): RecordSession {
    return RecordSession.decodeDataView(new DataView(buf));
  }

  // Decodes RecordSession from a DataView
  static decodeDataView(view: DataView): RecordSession {
    const decoder = new __proto.Decoder(view);
    const obj = new RecordSession();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          const length = decoder.uint32();
          obj.Desktop = BoolValue.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode RecordSession

  public size(): u32 {
    let size: u32 = 0;

    if (this.Desktop != null) {
      const f: BoolValue = this.Desktop as BoolValue;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes RecordSession to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes RecordSession to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Desktop != null) {
      const f = this.Desktop as BoolValue;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode RecordSession
} // RecordSession

// CertExtension represents a key/value for a certificate extension
export class CertExtension {
  /**
   * Type represents the certificate type being extended, only ssh
   *  is supported at this time.
   */
  public Type: u32;
  /**
   * Mode is the type of extension to be used -- currently
   *  critical-option is not supported
   */
  public Mode: u32;
  // Name specifies the key to be used in the cert extension.
  public Name: string = "";
  // Value specifies the valueg to be used in the cert extension.
  public Value: string = "";

  // Decodes CertExtension from an ArrayBuffer
  static decode(buf: ArrayBuffer): CertExtension {
    return CertExtension.decodeDataView(new DataView(buf));
  }

  // Decodes CertExtension from a DataView
  static decodeDataView(view: DataView): CertExtension {
    const decoder = new __proto.Decoder(view);
    const obj = new CertExtension();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Type = decoder.uint32();
          break;
        }
        case 2: {
          obj.Mode = decoder.uint32();
          break;
        }
        case 3: {
          obj.Name = decoder.string();
          break;
        }
        case 4: {
          obj.Value = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode CertExtension

  public size(): u32 {
    let size: u32 = 0;

    size += this.Type == 0 ? 0 : 1 + __proto.Sizer.uint32(this.Type);
    size += this.Mode == 0 ? 0 : 1 + __proto.Sizer.uint32(this.Mode);
    size +=
      this.Name.length > 0
        ? 1 + __proto.Sizer.varint64(this.Name.length) + this.Name.length
        : 0;
    size +=
      this.Value.length > 0
        ? 1 + __proto.Sizer.varint64(this.Value.length) + this.Value.length
        : 0;

    return size;
  }

  // Encodes CertExtension to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes CertExtension to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Type != 0) {
      encoder.uint32(0x8);
      encoder.uint32(this.Type);
    }
    if (this.Mode != 0) {
      encoder.uint32(0x10);
      encoder.uint32(this.Mode);
    }
    if (this.Name.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Name.length);
      encoder.string(this.Name);
    }
    if (this.Value.length > 0) {
      encoder.uint32(0x22);
      encoder.uint32(this.Value.length);
      encoder.string(this.Value);
    }

    return buf;
  } // encode CertExtension
} // CertExtension

/**
 * RoleConditions is a set of conditions that must all match to be allowed or
 *  denied access.
 */
export class RoleConditions {
  // Logins is a list of *nix system logins.
  public Logins: Array<string> = new Array<string>();
  /**
   * Namespaces is a list of namespaces (used to partition a cluster). The
   *  field should be called "namespaces" when it returns in Teleport 2.4.
   */
  public Namespaces: Array<string> = new Array<string>();
  /**
   * NodeLabels is a map of node labels (used to dynamically grant access to
   *  nodes).
   */
  public NodeLabels: wrappers.LabelValues = new wrappers.LabelValues();
  /**
   * Rules is a list of rules and their access levels. Rules are a high level
   *  construct used for access control.
   */
  public Rules: Array<Rule> = new Array<Rule>();
  // KubeGroups is a list of kubernetes groups
  public KubeGroups: Array<string> = new Array<string>();
  public Request: AccessRequestConditions = new AccessRequestConditions();
  // KubeUsers is an optional kubernetes users to impersonate
  public KubeUsers: Array<string> = new Array<string>();
  // AppLabels is a map of labels used as part of the RBAC system.
  public AppLabels: wrappers.LabelValues = new wrappers.LabelValues();
  /**
   * ClusterLabels is a map of node labels (used to dynamically grant access to
   *  clusters).
   */
  public ClusterLabels: wrappers.LabelValues = new wrappers.LabelValues();
  // KubernetesLabels is a map of kubernetes cluster labels used for RBAC.
  public KubernetesLabels: wrappers.LabelValues = new wrappers.LabelValues();
  // DatabaseLabels are used in RBAC system to allow/deny access to databases.
  public DatabaseLabels: wrappers.LabelValues = new wrappers.LabelValues();
  // DatabaseNames is a list of database names this role is allowed to connect to.
  public DatabaseNames: Array<string> = new Array<string>();
  // DatabaseUsers is a list of databaes users this role is allowed to connect as.
  public DatabaseUsers: Array<string> = new Array<string>();
  /**
   * Impersonate specifies what users and roles this role is allowed to impersonate
   *  by issuing certificates or other possible means.
   */
  public Impersonate: ImpersonateConditions = new ImpersonateConditions();
  // ReviewRequests defines conditions for submitting access reviews.
  public ReviewRequests: AccessReviewConditions = new AccessReviewConditions();
  // AWSRoleARNs is a list of AWS role ARNs this role is allowed to assume.
  public AWSRoleARNs: Array<string> = new Array<string>();
  // WindowsDesktopLogins is a list of desktop login names allowed/denied for Windows desktops.
  public WindowsDesktopLogins: Array<string> = new Array<string>();
  // WindowsDesktopLabels are used in the RBAC system to allow/deny access to Windows desktops.
  public WindowsDesktopLabels: wrappers.LabelValues =
    new wrappers.LabelValues();
  // RequireSessionJoin specifies policies for required users to start a session.
  public RequireSessionJoin: Array<SessionRequirePolicy> =
    new Array<SessionRequirePolicy>();
  // JoinSessions specifies policies to allow users to join other sessions.
  public JoinSessions: Array<SessionJoinPolicy> =
    new Array<SessionJoinPolicy>();

  // Decodes RoleConditions from an ArrayBuffer
  static decode(buf: ArrayBuffer): RoleConditions {
    return RoleConditions.decodeDataView(new DataView(buf));
  }

  // Decodes RoleConditions from a DataView
  static decodeDataView(view: DataView): RoleConditions {
    const decoder = new __proto.Decoder(view);
    const obj = new RoleConditions();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Logins.push(decoder.string());
          break;
        }
        case 2: {
          obj.Namespaces.push(decoder.string());
          break;
        }
        case 3: {
          const length = decoder.uint32();
          obj.NodeLabels = wrappers.LabelValues.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 4: {
          const length = decoder.uint32();
          obj.Rules.push(
            Rule.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length
              )
            )
          );
          decoder.skip(length);

          break;
        }
        case 5: {
          obj.KubeGroups.push(decoder.string());
          break;
        }
        case 6: {
          const length = decoder.uint32();
          obj.Request = AccessRequestConditions.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 7: {
          obj.KubeUsers.push(decoder.string());
          break;
        }
        case 8: {
          const length = decoder.uint32();
          obj.AppLabels = wrappers.LabelValues.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 9: {
          const length = decoder.uint32();
          obj.ClusterLabels = wrappers.LabelValues.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 10: {
          const length = decoder.uint32();
          obj.KubernetesLabels = wrappers.LabelValues.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 11: {
          const length = decoder.uint32();
          obj.DatabaseLabels = wrappers.LabelValues.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 12: {
          obj.DatabaseNames.push(decoder.string());
          break;
        }
        case 13: {
          obj.DatabaseUsers.push(decoder.string());
          break;
        }
        case 14: {
          const length = decoder.uint32();
          obj.Impersonate = ImpersonateConditions.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 15: {
          const length = decoder.uint32();
          obj.ReviewRequests = AccessReviewConditions.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 16: {
          obj.AWSRoleARNs.push(decoder.string());
          break;
        }
        case 17: {
          obj.WindowsDesktopLogins.push(decoder.string());
          break;
        }
        case 18: {
          const length = decoder.uint32();
          obj.WindowsDesktopLabels = wrappers.LabelValues.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 19: {
          const length = decoder.uint32();
          obj.RequireSessionJoin.push(
            SessionRequirePolicy.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length
              )
            )
          );
          decoder.skip(length);

          break;
        }
        case 20: {
          const length = decoder.uint32();
          obj.JoinSessions.push(
            SessionJoinPolicy.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length
              )
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode RoleConditions

  public size(): u32 {
    let size: u32 = 0;

    size += __size_string_repeated(this.Logins);

    size += __size_string_repeated(this.Namespaces);

    if (this.NodeLabels != null) {
      const f: wrappers.LabelValues = this.NodeLabels as wrappers.LabelValues;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    for (let n: i32 = 0; n < this.Rules.length; n++) {
      const messageSize = this.Rules[n].size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size += __size_string_repeated(this.KubeGroups);

    if (this.Request != null) {
      const f: AccessRequestConditions = this
        .Request as AccessRequestConditions;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size += __size_string_repeated(this.KubeUsers);

    if (this.AppLabels != null) {
      const f: wrappers.LabelValues = this.AppLabels as wrappers.LabelValues;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.ClusterLabels != null) {
      const f: wrappers.LabelValues = this
        .ClusterLabels as wrappers.LabelValues;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.KubernetesLabels != null) {
      const f: wrappers.LabelValues = this
        .KubernetesLabels as wrappers.LabelValues;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.DatabaseLabels != null) {
      const f: wrappers.LabelValues = this
        .DatabaseLabels as wrappers.LabelValues;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size += __size_string_repeated(this.DatabaseNames);

    size += __size_string_repeated(this.DatabaseUsers);

    if (this.Impersonate != null) {
      const f: ImpersonateConditions = this
        .Impersonate as ImpersonateConditions;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.ReviewRequests != null) {
      const f: AccessReviewConditions = this
        .ReviewRequests as AccessReviewConditions;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size += __size_string_repeated(this.AWSRoleARNs);

    size += __size_string_repeated(this.WindowsDesktopLogins);

    if (this.WindowsDesktopLabels != null) {
      const f: wrappers.LabelValues = this
        .WindowsDesktopLabels as wrappers.LabelValues;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    for (let n: i32 = 0; n < this.RequireSessionJoin.length; n++) {
      const messageSize = this.RequireSessionJoin[n].size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    for (let n: i32 = 0; n < this.JoinSessions.length; n++) {
      const messageSize = this.JoinSessions[n].size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes RoleConditions to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes RoleConditions to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Logins.length > 0) {
      for (let n: i32 = 0; n < this.Logins.length; n++) {
        encoder.uint32(0xa);
        encoder.uint32(this.Logins[n].length);
        encoder.string(this.Logins[n]);
      }
    }

    if (this.Namespaces.length > 0) {
      for (let n: i32 = 0; n < this.Namespaces.length; n++) {
        encoder.uint32(0x12);
        encoder.uint32(this.Namespaces[n].length);
        encoder.string(this.Namespaces[n]);
      }
    }

    if (this.NodeLabels != null) {
      const f = this.NodeLabels as wrappers.LabelValues;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    for (let n: i32 = 0; n < this.Rules.length; n++) {
      const messageSize = this.Rules[n].size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        this.Rules[n].encodeU8Array(encoder);
      }
    }

    if (this.KubeGroups.length > 0) {
      for (let n: i32 = 0; n < this.KubeGroups.length; n++) {
        encoder.uint32(0x2a);
        encoder.uint32(this.KubeGroups[n].length);
        encoder.string(this.KubeGroups[n]);
      }
    }

    if (this.Request != null) {
      const f = this.Request as AccessRequestConditions;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x32);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.KubeUsers.length > 0) {
      for (let n: i32 = 0; n < this.KubeUsers.length; n++) {
        encoder.uint32(0x3a);
        encoder.uint32(this.KubeUsers[n].length);
        encoder.string(this.KubeUsers[n]);
      }
    }

    if (this.AppLabels != null) {
      const f = this.AppLabels as wrappers.LabelValues;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x42);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.ClusterLabels != null) {
      const f = this.ClusterLabels as wrappers.LabelValues;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x4a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.KubernetesLabels != null) {
      const f = this.KubernetesLabels as wrappers.LabelValues;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x52);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.DatabaseLabels != null) {
      const f = this.DatabaseLabels as wrappers.LabelValues;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x5a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.DatabaseNames.length > 0) {
      for (let n: i32 = 0; n < this.DatabaseNames.length; n++) {
        encoder.uint32(0x62);
        encoder.uint32(this.DatabaseNames[n].length);
        encoder.string(this.DatabaseNames[n]);
      }
    }

    if (this.DatabaseUsers.length > 0) {
      for (let n: i32 = 0; n < this.DatabaseUsers.length; n++) {
        encoder.uint32(0x6a);
        encoder.uint32(this.DatabaseUsers[n].length);
        encoder.string(this.DatabaseUsers[n]);
      }
    }

    if (this.Impersonate != null) {
      const f = this.Impersonate as ImpersonateConditions;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x72);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.ReviewRequests != null) {
      const f = this.ReviewRequests as AccessReviewConditions;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x7a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.AWSRoleARNs.length > 0) {
      for (let n: i32 = 0; n < this.AWSRoleARNs.length; n++) {
        encoder.uint32(0x82);
        encoder.uint32(this.AWSRoleARNs[n].length);
        encoder.string(this.AWSRoleARNs[n]);
      }
    }

    if (this.WindowsDesktopLogins.length > 0) {
      for (let n: i32 = 0; n < this.WindowsDesktopLogins.length; n++) {
        encoder.uint32(0x8a);
        encoder.uint32(this.WindowsDesktopLogins[n].length);
        encoder.string(this.WindowsDesktopLogins[n]);
      }
    }

    if (this.WindowsDesktopLabels != null) {
      const f = this.WindowsDesktopLabels as wrappers.LabelValues;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x92);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    for (let n: i32 = 0; n < this.RequireSessionJoin.length; n++) {
      const messageSize = this.RequireSessionJoin[n].size();

      if (messageSize > 0) {
        encoder.uint32(0x9a);
        encoder.uint32(messageSize);
        this.RequireSessionJoin[n].encodeU8Array(encoder);
      }
    }

    for (let n: i32 = 0; n < this.JoinSessions.length; n++) {
      const messageSize = this.JoinSessions[n].size();

      if (messageSize > 0) {
        encoder.uint32(0xa2);
        encoder.uint32(messageSize);
        this.JoinSessions[n].encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode RoleConditions
} // RoleConditions

// SessionRequirePolicy a requirement policy that needs to be fulfilled to grant access.
export class SessionRequirePolicy {
  // Name is the name of the policy.
  public Name: string = "";
  // Filter is a predicate that determines what users count towards this policy.
  public Filter: string = "";
  // Kinds are the session kinds this policy applies to.
  public Kinds: Array<string> = new Array<string>();
  // Count is the amount of people that need to be matched for this policy to be fulfilled.
  public Count: i32;
  // Modes is the list of modes that may be used to fulfill this policy.
  public Modes: Array<string> = new Array<string>();
  /**
   * OnLeave is the behaviour that's used when the policy is no longer fulfilled
   *  for a live session.
   */
  public OnLeave: string = "";

  // Decodes SessionRequirePolicy from an ArrayBuffer
  static decode(buf: ArrayBuffer): SessionRequirePolicy {
    return SessionRequirePolicy.decodeDataView(new DataView(buf));
  }

  // Decodes SessionRequirePolicy from a DataView
  static decodeDataView(view: DataView): SessionRequirePolicy {
    const decoder = new __proto.Decoder(view);
    const obj = new SessionRequirePolicy();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Name = decoder.string();
          break;
        }
        case 2: {
          obj.Filter = decoder.string();
          break;
        }
        case 3: {
          obj.Kinds.push(decoder.string());
          break;
        }
        case 4: {
          obj.Count = decoder.int32();
          break;
        }
        case 5: {
          obj.Modes.push(decoder.string());
          break;
        }
        case 6: {
          obj.OnLeave = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode SessionRequirePolicy

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Name.length > 0
        ? 1 + __proto.Sizer.varint64(this.Name.length) + this.Name.length
        : 0;
    size +=
      this.Filter.length > 0
        ? 1 + __proto.Sizer.varint64(this.Filter.length) + this.Filter.length
        : 0;

    size += __size_string_repeated(this.Kinds);

    size += this.Count == 0 ? 0 : 1 + __proto.Sizer.int32(this.Count);

    size += __size_string_repeated(this.Modes);

    size +=
      this.OnLeave.length > 0
        ? 1 + __proto.Sizer.varint64(this.OnLeave.length) + this.OnLeave.length
        : 0;

    return size;
  }

  // Encodes SessionRequirePolicy to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes SessionRequirePolicy to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Name.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Name.length);
      encoder.string(this.Name);
    }
    if (this.Filter.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.Filter.length);
      encoder.string(this.Filter);
    }

    if (this.Kinds.length > 0) {
      for (let n: i32 = 0; n < this.Kinds.length; n++) {
        encoder.uint32(0x1a);
        encoder.uint32(this.Kinds[n].length);
        encoder.string(this.Kinds[n]);
      }
    }

    if (this.Count != 0) {
      encoder.uint32(0x20);
      encoder.int32(this.Count);
    }

    if (this.Modes.length > 0) {
      for (let n: i32 = 0; n < this.Modes.length; n++) {
        encoder.uint32(0x2a);
        encoder.uint32(this.Modes[n].length);
        encoder.string(this.Modes[n]);
      }
    }

    if (this.OnLeave.length > 0) {
      encoder.uint32(0x32);
      encoder.uint32(this.OnLeave.length);
      encoder.string(this.OnLeave);
    }

    return buf;
  } // encode SessionRequirePolicy
} // SessionRequirePolicy

// SessionJoinPolicy defines a policy that allows a user to join sessions.
export class SessionJoinPolicy {
  // Name is the name of the policy.
  public Name: string = "";
  // Roles is a list of roles that you can join the session of.
  public Roles: Array<string> = new Array<string>();
  // Kinds are the session kinds this policy applies to.
  public Kinds: Array<string> = new Array<string>();
  // Modes is a list of permitted participant modes for this policy.
  public Modes: Array<string> = new Array<string>();

  // Decodes SessionJoinPolicy from an ArrayBuffer
  static decode(buf: ArrayBuffer): SessionJoinPolicy {
    return SessionJoinPolicy.decodeDataView(new DataView(buf));
  }

  // Decodes SessionJoinPolicy from a DataView
  static decodeDataView(view: DataView): SessionJoinPolicy {
    const decoder = new __proto.Decoder(view);
    const obj = new SessionJoinPolicy();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Name = decoder.string();
          break;
        }
        case 2: {
          obj.Roles.push(decoder.string());
          break;
        }
        case 3: {
          obj.Kinds.push(decoder.string());
          break;
        }
        case 4: {
          obj.Modes.push(decoder.string());
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode SessionJoinPolicy

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Name.length > 0
        ? 1 + __proto.Sizer.varint64(this.Name.length) + this.Name.length
        : 0;

    size += __size_string_repeated(this.Roles);

    size += __size_string_repeated(this.Kinds);

    size += __size_string_repeated(this.Modes);

    return size;
  }

  // Encodes SessionJoinPolicy to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes SessionJoinPolicy to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Name.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Name.length);
      encoder.string(this.Name);
    }

    if (this.Roles.length > 0) {
      for (let n: i32 = 0; n < this.Roles.length; n++) {
        encoder.uint32(0x12);
        encoder.uint32(this.Roles[n].length);
        encoder.string(this.Roles[n]);
      }
    }

    if (this.Kinds.length > 0) {
      for (let n: i32 = 0; n < this.Kinds.length; n++) {
        encoder.uint32(0x1a);
        encoder.uint32(this.Kinds[n].length);
        encoder.string(this.Kinds[n]);
      }
    }

    if (this.Modes.length > 0) {
      for (let n: i32 = 0; n < this.Modes.length; n++) {
        encoder.uint32(0x22);
        encoder.uint32(this.Modes[n].length);
        encoder.string(this.Modes[n]);
      }
    }

    return buf;
  } // encode SessionJoinPolicy
} // SessionJoinPolicy

/**
 * AccessRequestConditions is a matcher for allow/deny restrictions on
 *  access-requests.
 */
export class AccessRequestConditions {
  // Roles is the name of roles which will match the request rule.
  public Roles: Array<string> = new Array<string>();
  // ClaimsToRoles specifies a mapping from claims (traits) to teleport roles.
  public ClaimsToRoles: Array<ClaimMapping> = new Array<ClaimMapping>();
  /**
   * Annotations is a collection of annotations to be programmatically
   *  appended to pending access requests at the time of their creation.
   *  These annotations serve as a mechanism to propagate extra information
   *  to plugins.  Since these annotations support variable interpolation
   *  syntax, they also offer a mechanism for forwarding claims from an
   *  external identity provider, to a plugin via `{{external.trait_name}}`
   *  style substitutions.
   */
  public Annotations: wrappers.LabelValues = new wrappers.LabelValues();
  /**
   * Thresholds is a list of thresholds, one of which must be met in order for reviews
   *  to trigger a state-transition.  If no thresholds are provided, a default threshold
   *  of 1 for approval and denial is used.
   */
  public Thresholds: Array<AccessReviewThreshold> =
    new Array<AccessReviewThreshold>();
  /**
   * SuggestedReviewers is a list of reviewer suggestions.  These can be teleport usernames, but
   *  that is not a requirement.
   */
  public SuggestedReviewers: Array<string> = new Array<string>();

  // Decodes AccessRequestConditions from an ArrayBuffer
  static decode(buf: ArrayBuffer): AccessRequestConditions {
    return AccessRequestConditions.decodeDataView(new DataView(buf));
  }

  // Decodes AccessRequestConditions from a DataView
  static decodeDataView(view: DataView): AccessRequestConditions {
    const decoder = new __proto.Decoder(view);
    const obj = new AccessRequestConditions();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Roles.push(decoder.string());
          break;
        }
        case 2: {
          const length = decoder.uint32();
          obj.ClaimsToRoles.push(
            ClaimMapping.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length
              )
            )
          );
          decoder.skip(length);

          break;
        }
        case 3: {
          const length = decoder.uint32();
          obj.Annotations = wrappers.LabelValues.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 4: {
          const length = decoder.uint32();
          obj.Thresholds.push(
            AccessReviewThreshold.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length
              )
            )
          );
          decoder.skip(length);

          break;
        }
        case 5: {
          obj.SuggestedReviewers.push(decoder.string());
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode AccessRequestConditions

  public size(): u32 {
    let size: u32 = 0;

    size += __size_string_repeated(this.Roles);

    for (let n: i32 = 0; n < this.ClaimsToRoles.length; n++) {
      const messageSize = this.ClaimsToRoles[n].size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Annotations != null) {
      const f: wrappers.LabelValues = this.Annotations as wrappers.LabelValues;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    for (let n: i32 = 0; n < this.Thresholds.length; n++) {
      const messageSize = this.Thresholds[n].size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size += __size_string_repeated(this.SuggestedReviewers);

    return size;
  }

  // Encodes AccessRequestConditions to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes AccessRequestConditions to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Roles.length > 0) {
      for (let n: i32 = 0; n < this.Roles.length; n++) {
        encoder.uint32(0xa);
        encoder.uint32(this.Roles[n].length);
        encoder.string(this.Roles[n]);
      }
    }

    for (let n: i32 = 0; n < this.ClaimsToRoles.length; n++) {
      const messageSize = this.ClaimsToRoles[n].size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        this.ClaimsToRoles[n].encodeU8Array(encoder);
      }
    }

    if (this.Annotations != null) {
      const f = this.Annotations as wrappers.LabelValues;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    for (let n: i32 = 0; n < this.Thresholds.length; n++) {
      const messageSize = this.Thresholds[n].size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        this.Thresholds[n].encodeU8Array(encoder);
      }
    }

    if (this.SuggestedReviewers.length > 0) {
      for (let n: i32 = 0; n < this.SuggestedReviewers.length; n++) {
        encoder.uint32(0x2a);
        encoder.uint32(this.SuggestedReviewers[n].length);
        encoder.string(this.SuggestedReviewers[n]);
      }
    }

    return buf;
  } // encode AccessRequestConditions
} // AccessRequestConditions

/**
 * AccessReviewConditions is a matcher for allow/deny restrictions on
 *  access reviews.
 */
export class AccessReviewConditions {
  // Roles is the name of roles which may be reviewed.
  public Roles: Array<string> = new Array<string>();
  // ClaimsToRoles specifies a mapping from claims (traits) to teleport roles.
  public ClaimsToRoles: Array<ClaimMapping> = new Array<ClaimMapping>();
  /**
   * Where is an optional predicate which further limits which requests are
   *  reviewable.
   */
  public Where: string = "";

  // Decodes AccessReviewConditions from an ArrayBuffer
  static decode(buf: ArrayBuffer): AccessReviewConditions {
    return AccessReviewConditions.decodeDataView(new DataView(buf));
  }

  // Decodes AccessReviewConditions from a DataView
  static decodeDataView(view: DataView): AccessReviewConditions {
    const decoder = new __proto.Decoder(view);
    const obj = new AccessReviewConditions();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Roles.push(decoder.string());
          break;
        }
        case 2: {
          const length = decoder.uint32();
          obj.ClaimsToRoles.push(
            ClaimMapping.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length
              )
            )
          );
          decoder.skip(length);

          break;
        }
        case 3: {
          obj.Where = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode AccessReviewConditions

  public size(): u32 {
    let size: u32 = 0;

    size += __size_string_repeated(this.Roles);

    for (let n: i32 = 0; n < this.ClaimsToRoles.length; n++) {
      const messageSize = this.ClaimsToRoles[n].size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.Where.length > 0
        ? 1 + __proto.Sizer.varint64(this.Where.length) + this.Where.length
        : 0;

    return size;
  }

  // Encodes AccessReviewConditions to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes AccessReviewConditions to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Roles.length > 0) {
      for (let n: i32 = 0; n < this.Roles.length; n++) {
        encoder.uint32(0xa);
        encoder.uint32(this.Roles[n].length);
        encoder.string(this.Roles[n]);
      }
    }

    for (let n: i32 = 0; n < this.ClaimsToRoles.length; n++) {
      const messageSize = this.ClaimsToRoles[n].size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        this.ClaimsToRoles[n].encodeU8Array(encoder);
      }
    }

    if (this.Where.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Where.length);
      encoder.string(this.Where);
    }

    return buf;
  } // encode AccessReviewConditions
} // AccessReviewConditions

// ClaimMapping maps a claim to teleport roles.
export class ClaimMapping {
  // Claim is a claim name.
  public Claim: string = "";
  // Value is a claim value to match.
  public Value: string = "";
  // Roles is a list of static teleport roles to match.
  public Roles: Array<string> = new Array<string>();

  // Decodes ClaimMapping from an ArrayBuffer
  static decode(buf: ArrayBuffer): ClaimMapping {
    return ClaimMapping.decodeDataView(new DataView(buf));
  }

  // Decodes ClaimMapping from a DataView
  static decodeDataView(view: DataView): ClaimMapping {
    const decoder = new __proto.Decoder(view);
    const obj = new ClaimMapping();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Claim = decoder.string();
          break;
        }
        case 2: {
          obj.Value = decoder.string();
          break;
        }
        case 3: {
          obj.Roles.push(decoder.string());
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode ClaimMapping

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Claim.length > 0
        ? 1 + __proto.Sizer.varint64(this.Claim.length) + this.Claim.length
        : 0;
    size +=
      this.Value.length > 0
        ? 1 + __proto.Sizer.varint64(this.Value.length) + this.Value.length
        : 0;

    size += __size_string_repeated(this.Roles);

    return size;
  }

  // Encodes ClaimMapping to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes ClaimMapping to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Claim.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Claim.length);
      encoder.string(this.Claim);
    }
    if (this.Value.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.Value.length);
      encoder.string(this.Value);
    }

    if (this.Roles.length > 0) {
      for (let n: i32 = 0; n < this.Roles.length; n++) {
        encoder.uint32(0x1a);
        encoder.uint32(this.Roles[n].length);
        encoder.string(this.Roles[n]);
      }
    }

    return buf;
  } // encode ClaimMapping
} // ClaimMapping

/**
 * Rule represents allow or deny rule that is executed to check
 *  if user or service have access to resource
 */
export class Rule {
  // Resources is a list of resources
  public Resources: Array<string> = new Array<string>();
  // Verbs is a list of verbs
  public Verbs: Array<string> = new Array<string>();
  // Where specifies optional advanced matcher
  public Where: string = "";
  // Actions specifies optional actions taken when this rule matches
  public Actions: Array<string> = new Array<string>();

  // Decodes Rule from an ArrayBuffer
  static decode(buf: ArrayBuffer): Rule {
    return Rule.decodeDataView(new DataView(buf));
  }

  // Decodes Rule from a DataView
  static decodeDataView(view: DataView): Rule {
    const decoder = new __proto.Decoder(view);
    const obj = new Rule();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Resources.push(decoder.string());
          break;
        }
        case 2: {
          obj.Verbs.push(decoder.string());
          break;
        }
        case 3: {
          obj.Where = decoder.string();
          break;
        }
        case 4: {
          obj.Actions.push(decoder.string());
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode Rule

  public size(): u32 {
    let size: u32 = 0;

    size += __size_string_repeated(this.Resources);

    size += __size_string_repeated(this.Verbs);

    size +=
      this.Where.length > 0
        ? 1 + __proto.Sizer.varint64(this.Where.length) + this.Where.length
        : 0;

    size += __size_string_repeated(this.Actions);

    return size;
  }

  // Encodes Rule to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes Rule to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Resources.length > 0) {
      for (let n: i32 = 0; n < this.Resources.length; n++) {
        encoder.uint32(0xa);
        encoder.uint32(this.Resources[n].length);
        encoder.string(this.Resources[n]);
      }
    }

    if (this.Verbs.length > 0) {
      for (let n: i32 = 0; n < this.Verbs.length; n++) {
        encoder.uint32(0x12);
        encoder.uint32(this.Verbs[n].length);
        encoder.string(this.Verbs[n]);
      }
    }

    if (this.Where.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Where.length);
      encoder.string(this.Where);
    }

    if (this.Actions.length > 0) {
      for (let n: i32 = 0; n < this.Actions.length; n++) {
        encoder.uint32(0x22);
        encoder.uint32(this.Actions[n].length);
        encoder.string(this.Actions[n]);
      }
    }

    return buf;
  } // encode Rule
} // Rule

/**
 * ImpersonateConditions specifies whether users are allowed
 *  to issue certificates for other users or groups.
 */
export class ImpersonateConditions {
  /**
   * Users is a list of resources this role is allowed to impersonate,
   *  could be an empty list or a Wildcard pattern
   */
  public Users: Array<string> = new Array<string>();
  // Roles is a list of resources this role is allowed to impersonate
  public Roles: Array<string> = new Array<string>();
  // Where specifies optional advanced matcher
  public Where: string = "";

  // Decodes ImpersonateConditions from an ArrayBuffer
  static decode(buf: ArrayBuffer): ImpersonateConditions {
    return ImpersonateConditions.decodeDataView(new DataView(buf));
  }

  // Decodes ImpersonateConditions from a DataView
  static decodeDataView(view: DataView): ImpersonateConditions {
    const decoder = new __proto.Decoder(view);
    const obj = new ImpersonateConditions();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Users.push(decoder.string());
          break;
        }
        case 2: {
          obj.Roles.push(decoder.string());
          break;
        }
        case 3: {
          obj.Where = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode ImpersonateConditions

  public size(): u32 {
    let size: u32 = 0;

    size += __size_string_repeated(this.Users);

    size += __size_string_repeated(this.Roles);

    size +=
      this.Where.length > 0
        ? 1 + __proto.Sizer.varint64(this.Where.length) + this.Where.length
        : 0;

    return size;
  }

  // Encodes ImpersonateConditions to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes ImpersonateConditions to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Users.length > 0) {
      for (let n: i32 = 0; n < this.Users.length; n++) {
        encoder.uint32(0xa);
        encoder.uint32(this.Users[n].length);
        encoder.string(this.Users[n]);
      }
    }

    if (this.Roles.length > 0) {
      for (let n: i32 = 0; n < this.Roles.length; n++) {
        encoder.uint32(0x12);
        encoder.uint32(this.Roles[n].length);
        encoder.string(this.Roles[n]);
      }
    }

    if (this.Where.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Where.length);
      encoder.string(this.Where);
    }

    return buf;
  } // encode ImpersonateConditions
} // ImpersonateConditions

/**
 * BoolValue is a wrapper around bool, used in cases
 *  whenever bool value can have different default value when missing
 */
export class BoolValue {
  public Value: bool;

  // Decodes BoolValue from an ArrayBuffer
  static decode(buf: ArrayBuffer): BoolValue {
    return BoolValue.decodeDataView(new DataView(buf));
  }

  // Decodes BoolValue from a DataView
  static decodeDataView(view: DataView): BoolValue {
    const decoder = new __proto.Decoder(view);
    const obj = new BoolValue();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Value = decoder.bool();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode BoolValue

  public size(): u32 {
    let size: u32 = 0;

    size += this.Value == 0 ? 0 : 1 + 1;

    return size;
  }

  // Encodes BoolValue to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes BoolValue to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Value != 0) {
      encoder.uint32(0x8);
      encoder.bool(this.Value);
    }

    return buf;
  } // encode BoolValue
} // BoolValue

// UserV2 is version 2 resource spec of the user
export class UserV2 {
  // Kind is a resource kind
  public Kind: string = "";
  // SubKind is an optional resource sub kind, used in some resources
  public SubKind: string = "";
  // Version is version
  public Version: string = "";
  // Metadata is resource metadata
  public Metadata: Metadata = new Metadata();
  // Spec is a user specification
  public Spec: UserSpecV2 = new UserSpecV2();

  // Decodes UserV2 from an ArrayBuffer
  static decode(buf: ArrayBuffer): UserV2 {
    return UserV2.decodeDataView(new DataView(buf));
  }

  // Decodes UserV2 from a DataView
  static decodeDataView(view: DataView): UserV2 {
    const decoder = new __proto.Decoder(view);
    const obj = new UserV2();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Kind = decoder.string();
          break;
        }
        case 2: {
          obj.SubKind = decoder.string();
          break;
        }
        case 3: {
          obj.Version = decoder.string();
          break;
        }
        case 4: {
          const length = decoder.uint32();
          obj.Metadata = Metadata.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 5: {
          const length = decoder.uint32();
          obj.Spec = UserSpecV2.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode UserV2

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Kind.length > 0
        ? 1 + __proto.Sizer.varint64(this.Kind.length) + this.Kind.length
        : 0;
    size +=
      this.SubKind.length > 0
        ? 1 + __proto.Sizer.varint64(this.SubKind.length) + this.SubKind.length
        : 0;
    size +=
      this.Version.length > 0
        ? 1 + __proto.Sizer.varint64(this.Version.length) + this.Version.length
        : 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Spec != null) {
      const f: UserSpecV2 = this.Spec as UserSpecV2;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes UserV2 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes UserV2 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Kind.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Kind.length);
      encoder.string(this.Kind);
    }
    if (this.SubKind.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.SubKind.length);
      encoder.string(this.SubKind);
    }
    if (this.Version.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Version.length);
      encoder.string(this.Version);
    }

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Spec != null) {
      const f = this.Spec as UserSpecV2;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode UserV2
} // UserV2

// UserSpecV2 is a specification for V2 user
export class UserSpecV2 {
  /**
   * OIDCIdentities lists associated OpenID Connect identities
   *  that let user log in using externally verified identity
   */
  public OIDCIdentities: Array<ExternalIdentity> =
    new Array<ExternalIdentity>();
  /**
   * SAMLIdentities lists associated SAML identities
   *  that let user log in using externally verified identity
   */
  public SAMLIdentities: Array<ExternalIdentity> =
    new Array<ExternalIdentity>();
  /**
   * GithubIdentities list associated Github OAuth2 identities
   *  that let user log in using externally verified identity
   */
  public GithubIdentities: Array<ExternalIdentity> =
    new Array<ExternalIdentity>();
  // Roles is a list of roles assigned to user
  public Roles: Array<string> = new Array<string>();
  /**
   * Traits are key/value pairs received from an identity provider (through
   *  OIDC claims or SAML assertions) or from a system administrator for local
   *  accounts. Traits are used to populate role variables.
   */
  public Traits: wrappers.LabelValues = new wrappers.LabelValues();
  // Status is a login status of the user
  public Status: LoginStatus = new LoginStatus();
  // Expires if set sets TTL on the user
  public Expires: google.protobuf.Timestamp = new google.protobuf.Timestamp();
  // CreatedBy holds information about agent or person created this user
  public CreatedBy: CreatedBy = new CreatedBy();
  /**
   * LocalAuths hold sensitive data necessary for performing local
   *  authentication
   */
  public LocalAuth: LocalAuthSecrets = new LocalAuthSecrets();

  // Decodes UserSpecV2 from an ArrayBuffer
  static decode(buf: ArrayBuffer): UserSpecV2 {
    return UserSpecV2.decodeDataView(new DataView(buf));
  }

  // Decodes UserSpecV2 from a DataView
  static decodeDataView(view: DataView): UserSpecV2 {
    const decoder = new __proto.Decoder(view);
    const obj = new UserSpecV2();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          const length = decoder.uint32();
          obj.OIDCIdentities.push(
            ExternalIdentity.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length
              )
            )
          );
          decoder.skip(length);

          break;
        }
        case 2: {
          const length = decoder.uint32();
          obj.SAMLIdentities.push(
            ExternalIdentity.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length
              )
            )
          );
          decoder.skip(length);

          break;
        }
        case 3: {
          const length = decoder.uint32();
          obj.GithubIdentities.push(
            ExternalIdentity.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length
              )
            )
          );
          decoder.skip(length);

          break;
        }
        case 4: {
          obj.Roles.push(decoder.string());
          break;
        }
        case 5: {
          const length = decoder.uint32();
          obj.Traits = wrappers.LabelValues.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 6: {
          const length = decoder.uint32();
          obj.Status = LoginStatus.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 7: {
          const length = decoder.uint32();
          obj.Expires = google.protobuf.Timestamp.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 8: {
          const length = decoder.uint32();
          obj.CreatedBy = CreatedBy.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 9: {
          const length = decoder.uint32();
          obj.LocalAuth = LocalAuthSecrets.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode UserSpecV2

  public size(): u32 {
    let size: u32 = 0;

    for (let n: i32 = 0; n < this.OIDCIdentities.length; n++) {
      const messageSize = this.OIDCIdentities[n].size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    for (let n: i32 = 0; n < this.SAMLIdentities.length; n++) {
      const messageSize = this.SAMLIdentities[n].size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    for (let n: i32 = 0; n < this.GithubIdentities.length; n++) {
      const messageSize = this.GithubIdentities[n].size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size += __size_string_repeated(this.Roles);

    if (this.Traits != null) {
      const f: wrappers.LabelValues = this.Traits as wrappers.LabelValues;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Status != null) {
      const f: LoginStatus = this.Status as LoginStatus;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Expires != null) {
      const f: google.protobuf.Timestamp = this
        .Expires as google.protobuf.Timestamp;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.CreatedBy != null) {
      const f: CreatedBy = this.CreatedBy as CreatedBy;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.LocalAuth != null) {
      const f: LocalAuthSecrets = this.LocalAuth as LocalAuthSecrets;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes UserSpecV2 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes UserSpecV2 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    for (let n: i32 = 0; n < this.OIDCIdentities.length; n++) {
      const messageSize = this.OIDCIdentities[n].size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        this.OIDCIdentities[n].encodeU8Array(encoder);
      }
    }

    for (let n: i32 = 0; n < this.SAMLIdentities.length; n++) {
      const messageSize = this.SAMLIdentities[n].size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        this.SAMLIdentities[n].encodeU8Array(encoder);
      }
    }

    for (let n: i32 = 0; n < this.GithubIdentities.length; n++) {
      const messageSize = this.GithubIdentities[n].size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        this.GithubIdentities[n].encodeU8Array(encoder);
      }
    }

    if (this.Roles.length > 0) {
      for (let n: i32 = 0; n < this.Roles.length; n++) {
        encoder.uint32(0x22);
        encoder.uint32(this.Roles[n].length);
        encoder.string(this.Roles[n]);
      }
    }

    if (this.Traits != null) {
      const f = this.Traits as wrappers.LabelValues;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Status != null) {
      const f = this.Status as LoginStatus;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x32);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Expires != null) {
      const f = this.Expires as google.protobuf.Timestamp;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x3a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.CreatedBy != null) {
      const f = this.CreatedBy as CreatedBy;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x42);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.LocalAuth != null) {
      const f = this.LocalAuth as LocalAuthSecrets;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x4a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode UserSpecV2
} // UserSpecV2

/**
 * ExternalIdentity is OpenID Connect/SAML or Github identity that is linked
 *  to particular user and connector and lets user to log in using external
 *  credentials, e.g. google
 */
export class ExternalIdentity {
  // ConnectorID is id of registered OIDC connector, e.g. 'google-example.com'
  public ConnectorID: string = "";
  // Username is username supplied by external identity provider
  public Username: string = "";

  // Decodes ExternalIdentity from an ArrayBuffer
  static decode(buf: ArrayBuffer): ExternalIdentity {
    return ExternalIdentity.decodeDataView(new DataView(buf));
  }

  // Decodes ExternalIdentity from a DataView
  static decodeDataView(view: DataView): ExternalIdentity {
    const decoder = new __proto.Decoder(view);
    const obj = new ExternalIdentity();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.ConnectorID = decoder.string();
          break;
        }
        case 2: {
          obj.Username = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode ExternalIdentity

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.ConnectorID.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.ConnectorID.length) +
          this.ConnectorID.length
        : 0;
    size +=
      this.Username.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.Username.length) +
          this.Username.length
        : 0;

    return size;
  }

  // Encodes ExternalIdentity to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes ExternalIdentity to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.ConnectorID.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.ConnectorID.length);
      encoder.string(this.ConnectorID);
    }
    if (this.Username.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.Username.length);
      encoder.string(this.Username);
    }

    return buf;
  } // encode ExternalIdentity
} // ExternalIdentity

// LoginStatus is a login status of the user
export class LoginStatus {
  // IsLocked tells us if user is locked
  public IsLocked: bool;
  // LockedMessage contains the message in case if user is locked
  public LockedMessage: string = "";
  // LockedTime contains time when user was locked
  public LockedTime: google.protobuf.Timestamp =
    new google.protobuf.Timestamp();
  // LockExpires contains time when this lock will expire
  public LockExpires: google.protobuf.Timestamp =
    new google.protobuf.Timestamp();
  /**
   * RecoveryAttemptLockExpires contains the time when this lock will expire
   *  from reaching MaxAccountRecoveryAttempts. This field is used to determine
   *  if a user got locked from recovery attempts.
   */
  public RecoveryAttemptLockExpires: google.protobuf.Timestamp =
    new google.protobuf.Timestamp();

  // Decodes LoginStatus from an ArrayBuffer
  static decode(buf: ArrayBuffer): LoginStatus {
    return LoginStatus.decodeDataView(new DataView(buf));
  }

  // Decodes LoginStatus from a DataView
  static decodeDataView(view: DataView): LoginStatus {
    const decoder = new __proto.Decoder(view);
    const obj = new LoginStatus();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.IsLocked = decoder.bool();
          break;
        }
        case 2: {
          obj.LockedMessage = decoder.string();
          break;
        }
        case 3: {
          const length = decoder.uint32();
          obj.LockedTime = google.protobuf.Timestamp.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 4: {
          const length = decoder.uint32();
          obj.LockExpires = google.protobuf.Timestamp.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 5: {
          const length = decoder.uint32();
          obj.RecoveryAttemptLockExpires =
            google.protobuf.Timestamp.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length
              )
            );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode LoginStatus

  public size(): u32 {
    let size: u32 = 0;

    size += this.IsLocked == 0 ? 0 : 1 + 1;
    size +=
      this.LockedMessage.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.LockedMessage.length) +
          this.LockedMessage.length
        : 0;

    if (this.LockedTime != null) {
      const f: google.protobuf.Timestamp = this
        .LockedTime as google.protobuf.Timestamp;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.LockExpires != null) {
      const f: google.protobuf.Timestamp = this
        .LockExpires as google.protobuf.Timestamp;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.RecoveryAttemptLockExpires != null) {
      const f: google.protobuf.Timestamp = this
        .RecoveryAttemptLockExpires as google.protobuf.Timestamp;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes LoginStatus to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes LoginStatus to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.IsLocked != 0) {
      encoder.uint32(0x8);
      encoder.bool(this.IsLocked);
    }
    if (this.LockedMessage.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.LockedMessage.length);
      encoder.string(this.LockedMessage);
    }

    if (this.LockedTime != null) {
      const f = this.LockedTime as google.protobuf.Timestamp;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.LockExpires != null) {
      const f = this.LockExpires as google.protobuf.Timestamp;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.RecoveryAttemptLockExpires != null) {
      const f = this.RecoveryAttemptLockExpires as google.protobuf.Timestamp;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode LoginStatus
} // LoginStatus

// CreatedBy holds information about the person or agent who created the user
export class CreatedBy {
  // Identity if present means that user was automatically created by identity
  public Connector: ConnectorRef = new ConnectorRef();
  // Time specifies when user was created
  public Time: google.protobuf.Timestamp = new google.protobuf.Timestamp();
  // User holds information about user
  public User: UserRef = new UserRef();

  // Decodes CreatedBy from an ArrayBuffer
  static decode(buf: ArrayBuffer): CreatedBy {
    return CreatedBy.decodeDataView(new DataView(buf));
  }

  // Decodes CreatedBy from a DataView
  static decodeDataView(view: DataView): CreatedBy {
    const decoder = new __proto.Decoder(view);
    const obj = new CreatedBy();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          const length = decoder.uint32();
          obj.Connector = ConnectorRef.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 2: {
          const length = decoder.uint32();
          obj.Time = google.protobuf.Timestamp.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 3: {
          const length = decoder.uint32();
          obj.User = UserRef.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode CreatedBy

  public size(): u32 {
    let size: u32 = 0;

    if (this.Connector != null) {
      const f: ConnectorRef = this.Connector as ConnectorRef;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Time != null) {
      const f: google.protobuf.Timestamp = this
        .Time as google.protobuf.Timestamp;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserRef = this.User as UserRef;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes CreatedBy to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes CreatedBy to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Connector != null) {
      const f = this.Connector as ConnectorRef;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Time != null) {
      const f = this.Time as google.protobuf.Timestamp;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserRef;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode CreatedBy
} // CreatedBy

// LocalAuthSecrets holds sensitive data used to authenticate a local user.
export class LocalAuthSecrets {
  // PasswordHash encodes a combined salt & hash for password verification.
  public PasswordHash: Array<u8> = new Array<u8>();
  // Deprecated 2nd factor fields, use MFA below instead.
  public TOTPKey: string = "";
  public MFA: Array<MFADevice> = new Array<MFADevice>();
  /**
   * Webauthn holds settings necessary for webauthn local auth.
   *  May be null for legacy users or users that haven't yet used webauthn as
   *  their second factor.
   */
  public Webauthn: WebauthnLocalAuth = new WebauthnLocalAuth();

  // Decodes LocalAuthSecrets from an ArrayBuffer
  static decode(buf: ArrayBuffer): LocalAuthSecrets {
    return LocalAuthSecrets.decodeDataView(new DataView(buf));
  }

  // Decodes LocalAuthSecrets from a DataView
  static decodeDataView(view: DataView): LocalAuthSecrets {
    const decoder = new __proto.Decoder(view);
    const obj = new LocalAuthSecrets();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.PasswordHash = decoder.bytes();
          break;
        }
        case 2: {
          obj.TOTPKey = decoder.string();
          break;
        }
        case 5: {
          const length = decoder.uint32();
          obj.MFA.push(
            MFADevice.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length
              )
            )
          );
          decoder.skip(length);

          break;
        }
        case 6: {
          const length = decoder.uint32();
          obj.Webauthn = WebauthnLocalAuth.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode LocalAuthSecrets

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.PasswordHash.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.PasswordHash.length) +
          this.PasswordHash.length
        : 0;
    size +=
      this.TOTPKey.length > 0
        ? 1 + __proto.Sizer.varint64(this.TOTPKey.length) + this.TOTPKey.length
        : 0;

    for (let n: i32 = 0; n < this.MFA.length; n++) {
      const messageSize = this.MFA[n].size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Webauthn != null) {
      const f: WebauthnLocalAuth = this.Webauthn as WebauthnLocalAuth;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes LocalAuthSecrets to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes LocalAuthSecrets to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.PasswordHash.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.PasswordHash.length);
      encoder.bytes(this.PasswordHash);
    }
    if (this.TOTPKey.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.TOTPKey.length);
      encoder.string(this.TOTPKey);
    }

    for (let n: i32 = 0; n < this.MFA.length; n++) {
      const messageSize = this.MFA[n].size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        this.MFA[n].encodeU8Array(encoder);
      }
    }

    if (this.Webauthn != null) {
      const f = this.Webauthn as WebauthnLocalAuth;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x32);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode LocalAuthSecrets
} // LocalAuthSecrets

/**
 * MFADevice is a multi-factor authentication device, such as a security key or
 *  an OTP app.
 */
export class MFADevice {
  // Boilerplate for implementing the Resource interface.
  public kind: string = "";
  public sub_kind: string = "";
  public version: string = "";
  public metadata: Metadata = new Metadata();
  // ID is a UUID of this device.
  public id: string = "";
  public added_at: google.protobuf.Timestamp = new google.protobuf.Timestamp();
  public last_used: google.protobuf.Timestamp = new google.protobuf.Timestamp();
  public totp: TOTPDevice | null;
  public u2f: U2FDevice | null;
  public webauthn: WebauthnDevice | null;

  public __oneOf_device: string = "";
  public __oneOf_device_index: u8 = 0;

  static readonly DEVICE_TOTP_INDEX: u8 = 8;
  static readonly DEVICE_U2F_INDEX: u8 = 9;
  static readonly DEVICE_WEBAUTHN_INDEX: u8 = 10;

  // Decodes MFADevice from an ArrayBuffer
  static decode(buf: ArrayBuffer): MFADevice {
    return MFADevice.decodeDataView(new DataView(buf));
  }

  // Decodes MFADevice from a DataView
  static decodeDataView(view: DataView): MFADevice {
    const decoder = new __proto.Decoder(view);
    const obj = new MFADevice();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.kind = decoder.string();
          break;
        }
        case 2: {
          obj.sub_kind = decoder.string();
          break;
        }
        case 3: {
          obj.version = decoder.string();
          break;
        }
        case 4: {
          const length = decoder.uint32();
          obj.metadata = Metadata.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 5: {
          obj.id = decoder.string();
          break;
        }
        case 6: {
          const length = decoder.uint32();
          obj.added_at = google.protobuf.Timestamp.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 7: {
          const length = decoder.uint32();
          obj.last_used = google.protobuf.Timestamp.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 8: {
          const length = decoder.uint32();
          obj.totp = TOTPDevice.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.__oneOf_device = "totp";
          obj.__oneOf_device_index = 8;
          break;
        }
        case 9: {
          const length = decoder.uint32();
          obj.u2f = U2FDevice.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.__oneOf_device = "u2f";
          obj.__oneOf_device_index = 9;
          break;
        }
        case 10: {
          const length = decoder.uint32();
          obj.webauthn = WebauthnDevice.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.__oneOf_device = "webauthn";
          obj.__oneOf_device_index = 10;
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode MFADevice

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.kind.length > 0
        ? 1 + __proto.Sizer.varint64(this.kind.length) + this.kind.length
        : 0;
    size +=
      this.sub_kind.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.sub_kind.length) +
          this.sub_kind.length
        : 0;
    size +=
      this.version.length > 0
        ? 1 + __proto.Sizer.varint64(this.version.length) + this.version.length
        : 0;

    if (this.metadata != null) {
      const f: Metadata = this.metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.id.length > 0
        ? 1 + __proto.Sizer.varint64(this.id.length) + this.id.length
        : 0;

    if (this.added_at != null) {
      const f: google.protobuf.Timestamp = this
        .added_at as google.protobuf.Timestamp;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.last_used != null) {
      const f: google.protobuf.Timestamp = this
        .last_used as google.protobuf.Timestamp;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.totp != null) {
      const f: TOTPDevice = this.totp as TOTPDevice;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.u2f != null) {
      const f: U2FDevice = this.u2f as U2FDevice;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.webauthn != null) {
      const f: WebauthnDevice = this.webauthn as WebauthnDevice;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes MFADevice to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes MFADevice to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.kind.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.kind.length);
      encoder.string(this.kind);
    }
    if (this.sub_kind.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.sub_kind.length);
      encoder.string(this.sub_kind);
    }
    if (this.version.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.version.length);
      encoder.string(this.version);
    }

    if (this.metadata != null) {
      const f = this.metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.id.length > 0) {
      encoder.uint32(0x2a);
      encoder.uint32(this.id.length);
      encoder.string(this.id);
    }

    if (this.added_at != null) {
      const f = this.added_at as google.protobuf.Timestamp;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x32);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.last_used != null) {
      const f = this.last_used as google.protobuf.Timestamp;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x3a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.totp != null) {
      const f = this.totp as TOTPDevice;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x42);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.u2f != null) {
      const f = this.u2f as U2FDevice;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x4a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.webauthn != null) {
      const f = this.webauthn as WebauthnDevice;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x52);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode MFADevice
} // MFADevice

// TOTPDevice holds the TOTP-specific fields of MFADevice.
export class TOTPDevice {
  public key: string = "";

  // Decodes TOTPDevice from an ArrayBuffer
  static decode(buf: ArrayBuffer): TOTPDevice {
    return TOTPDevice.decodeDataView(new DataView(buf));
  }

  // Decodes TOTPDevice from a DataView
  static decodeDataView(view: DataView): TOTPDevice {
    const decoder = new __proto.Decoder(view);
    const obj = new TOTPDevice();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.key = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode TOTPDevice

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.key.length > 0
        ? 1 + __proto.Sizer.varint64(this.key.length) + this.key.length
        : 0;

    return size;
  }

  // Encodes TOTPDevice to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes TOTPDevice to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.key.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.key.length);
      encoder.string(this.key);
    }

    return buf;
  } // encode TOTPDevice
} // TOTPDevice

// U2FDevice holds the U2F-specific fields of MFADevice.
export class U2FDevice {
  // KeyHandle uniquely identifies a key on a device
  public key_handle: Array<u8> = new Array<u8>();
  // PubKey is an DER encoded ecdsa public key
  public pub_key: Array<u8> = new Array<u8>();
  // Counter is the latest seen value of the U2F usage counter.
  public counter: u32;

  // Decodes U2FDevice from an ArrayBuffer
  static decode(buf: ArrayBuffer): U2FDevice {
    return U2FDevice.decodeDataView(new DataView(buf));
  }

  // Decodes U2FDevice from a DataView
  static decodeDataView(view: DataView): U2FDevice {
    const decoder = new __proto.Decoder(view);
    const obj = new U2FDevice();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.key_handle = decoder.bytes();
          break;
        }
        case 2: {
          obj.pub_key = decoder.bytes();
          break;
        }
        case 3: {
          obj.counter = decoder.uint32();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode U2FDevice

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.key_handle.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.key_handle.length) +
          this.key_handle.length
        : 0;
    size +=
      this.pub_key.length > 0
        ? 1 + __proto.Sizer.varint64(this.pub_key.length) + this.pub_key.length
        : 0;
    size += this.counter == 0 ? 0 : 1 + __proto.Sizer.uint32(this.counter);

    return size;
  }

  // Encodes U2FDevice to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes U2FDevice to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.key_handle.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.key_handle.length);
      encoder.bytes(this.key_handle);
    }
    if (this.pub_key.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.pub_key.length);
      encoder.bytes(this.pub_key);
    }
    if (this.counter != 0) {
      encoder.uint32(0x18);
      encoder.uint32(this.counter);
    }

    return buf;
  } // encode U2FDevice
} // U2FDevice

// WebauthnDevice holds Webauthn-specific fields of MFADevice.
export class WebauthnDevice {
  // Credential ID for the authenticator.
  public credential_id: Array<u8> = new Array<u8>();
  /**
   * Public key encoded in CBOR format.
   *  Webauthn support various key algorithms; CBOR encoding is used to reflect
   *  those choices.
   *  See https://w3c.github.io/webauthn/#sctn-alg-identifier for a starter
   *  reference.
   */
  public public_key_cbor: Array<u8> = new Array<u8>();
  // Attestation format used by the authenticator, if any.
  public attestation_type: string = "";
  /**
   * AAGUID is the globally unique identifier of the authenticator model.
   *  Zeroed for U2F devices.
   */
  public aaguid: Array<u8> = new Array<u8>();
  /**
   * Signature counter for login operations.
   *  Actual counter values received from the authenticator are expected to be
   *  higher than the previously-stored value.
   */
  public signature_counter: u32;
  /**
   * Raw attestation object, as returned by the authentication during
   *  registration.
   *  Absent for legacy entries (Teleport 8.x).
   */
  public attestation_object: Array<u8> = new Array<u8>();
  /**
   * True if a resident key was requested during registration.
   *  Marks passwordless-capable devices.
   *  (Note that resident_key=true represents the server-side / Relying Party
   *  view of the registration process; the authenticator alone can determine
   *  if a key is truly resident.)
   */
  public resident_key: bool;

  // Decodes WebauthnDevice from an ArrayBuffer
  static decode(buf: ArrayBuffer): WebauthnDevice {
    return WebauthnDevice.decodeDataView(new DataView(buf));
  }

  // Decodes WebauthnDevice from a DataView
  static decodeDataView(view: DataView): WebauthnDevice {
    const decoder = new __proto.Decoder(view);
    const obj = new WebauthnDevice();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.credential_id = decoder.bytes();
          break;
        }
        case 2: {
          obj.public_key_cbor = decoder.bytes();
          break;
        }
        case 3: {
          obj.attestation_type = decoder.string();
          break;
        }
        case 4: {
          obj.aaguid = decoder.bytes();
          break;
        }
        case 5: {
          obj.signature_counter = decoder.uint32();
          break;
        }
        case 6: {
          obj.attestation_object = decoder.bytes();
          break;
        }
        case 7: {
          obj.resident_key = decoder.bool();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode WebauthnDevice

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.credential_id.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.credential_id.length) +
          this.credential_id.length
        : 0;
    size +=
      this.public_key_cbor.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.public_key_cbor.length) +
          this.public_key_cbor.length
        : 0;
    size +=
      this.attestation_type.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.attestation_type.length) +
          this.attestation_type.length
        : 0;
    size +=
      this.aaguid.length > 0
        ? 1 + __proto.Sizer.varint64(this.aaguid.length) + this.aaguid.length
        : 0;
    size +=
      this.signature_counter == 0
        ? 0
        : 1 + __proto.Sizer.uint32(this.signature_counter);
    size +=
      this.attestation_object.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.attestation_object.length) +
          this.attestation_object.length
        : 0;
    size += this.resident_key == 0 ? 0 : 1 + 1;

    return size;
  }

  // Encodes WebauthnDevice to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes WebauthnDevice to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.credential_id.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.credential_id.length);
      encoder.bytes(this.credential_id);
    }
    if (this.public_key_cbor.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.public_key_cbor.length);
      encoder.bytes(this.public_key_cbor);
    }
    if (this.attestation_type.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.attestation_type.length);
      encoder.string(this.attestation_type);
    }
    if (this.aaguid.length > 0) {
      encoder.uint32(0x22);
      encoder.uint32(this.aaguid.length);
      encoder.bytes(this.aaguid);
    }
    if (this.signature_counter != 0) {
      encoder.uint32(0x28);
      encoder.uint32(this.signature_counter);
    }
    if (this.attestation_object.length > 0) {
      encoder.uint32(0x32);
      encoder.uint32(this.attestation_object.length);
      encoder.bytes(this.attestation_object);
    }
    if (this.resident_key != 0) {
      encoder.uint32(0x38);
      encoder.bool(this.resident_key);
    }

    return buf;
  } // encode WebauthnDevice
} // WebauthnDevice

// WebauthnLocalAuth holds settings necessary for local webauthn use.
export class WebauthnLocalAuth {
  /**
   * UserID is the random user handle generated for the user.
   *  See https://www.w3.org/TR/webauthn-2/#sctn-user-handle-privacy.
   */
  public UserID: Array<u8> = new Array<u8>();

  // Decodes WebauthnLocalAuth from an ArrayBuffer
  static decode(buf: ArrayBuffer): WebauthnLocalAuth {
    return WebauthnLocalAuth.decodeDataView(new DataView(buf));
  }

  // Decodes WebauthnLocalAuth from a DataView
  static decodeDataView(view: DataView): WebauthnLocalAuth {
    const decoder = new __proto.Decoder(view);
    const obj = new WebauthnLocalAuth();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.UserID = decoder.bytes();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode WebauthnLocalAuth

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.UserID.length > 0
        ? 1 + __proto.Sizer.varint64(this.UserID.length) + this.UserID.length
        : 0;

    return size;
  }

  // Encodes WebauthnLocalAuth to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes WebauthnLocalAuth to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.UserID.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.UserID.length);
      encoder.bytes(this.UserID);
    }

    return buf;
  } // encode WebauthnLocalAuth
} // WebauthnLocalAuth

// ConnectorRef holds information about OIDC connector
export class ConnectorRef {
  // Type is connector type
  public Type: string = "";
  // ID is connector ID
  public ID: string = "";
  // Identity is external identity of the user
  public Identity: string = "";

  // Decodes ConnectorRef from an ArrayBuffer
  static decode(buf: ArrayBuffer): ConnectorRef {
    return ConnectorRef.decodeDataView(new DataView(buf));
  }

  // Decodes ConnectorRef from a DataView
  static decodeDataView(view: DataView): ConnectorRef {
    const decoder = new __proto.Decoder(view);
    const obj = new ConnectorRef();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Type = decoder.string();
          break;
        }
        case 2: {
          obj.ID = decoder.string();
          break;
        }
        case 3: {
          obj.Identity = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode ConnectorRef

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Type.length > 0
        ? 1 + __proto.Sizer.varint64(this.Type.length) + this.Type.length
        : 0;
    size +=
      this.ID.length > 0
        ? 1 + __proto.Sizer.varint64(this.ID.length) + this.ID.length
        : 0;
    size +=
      this.Identity.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.Identity.length) +
          this.Identity.length
        : 0;

    return size;
  }

  // Encodes ConnectorRef to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes ConnectorRef to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Type.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Type.length);
      encoder.string(this.Type);
    }
    if (this.ID.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.ID.length);
      encoder.string(this.ID);
    }
    if (this.Identity.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Identity.length);
      encoder.string(this.Identity);
    }

    return buf;
  } // encode ConnectorRef
} // ConnectorRef

// UserRef holds references to user
export class UserRef {
  // Name is name of the user
  public Name: string = "";

  // Decodes UserRef from an ArrayBuffer
  static decode(buf: ArrayBuffer): UserRef {
    return UserRef.decodeDataView(new DataView(buf));
  }

  // Decodes UserRef from a DataView
  static decodeDataView(view: DataView): UserRef {
    const decoder = new __proto.Decoder(view);
    const obj = new UserRef();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Name = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode UserRef

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Name.length > 0
        ? 1 + __proto.Sizer.varint64(this.Name.length) + this.Name.length
        : 0;

    return size;
  }

  // Encodes UserRef to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes UserRef to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Name.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Name.length);
      encoder.string(this.Name);
    }

    return buf;
  } // encode UserRef
} // UserRef

// ReverseTunnelV2 is version 2 of the resource spec of the reverse tunnel
export class ReverseTunnelV2 {
  // Kind is a resource kind
  public Kind: string = "";
  // SubKind is an optional resource sub kind, used in some resources
  public SubKind: string = "";
  // Version is version
  public Version: string = "";
  // Metadata is a resource metadata
  public Metadata: Metadata = new Metadata();
  // Spec is a reverse tunnel specification
  public Spec: ReverseTunnelSpecV2 = new ReverseTunnelSpecV2();

  // Decodes ReverseTunnelV2 from an ArrayBuffer
  static decode(buf: ArrayBuffer): ReverseTunnelV2 {
    return ReverseTunnelV2.decodeDataView(new DataView(buf));
  }

  // Decodes ReverseTunnelV2 from a DataView
  static decodeDataView(view: DataView): ReverseTunnelV2 {
    const decoder = new __proto.Decoder(view);
    const obj = new ReverseTunnelV2();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Kind = decoder.string();
          break;
        }
        case 2: {
          obj.SubKind = decoder.string();
          break;
        }
        case 3: {
          obj.Version = decoder.string();
          break;
        }
        case 4: {
          const length = decoder.uint32();
          obj.Metadata = Metadata.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 5: {
          const length = decoder.uint32();
          obj.Spec = ReverseTunnelSpecV2.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode ReverseTunnelV2

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Kind.length > 0
        ? 1 + __proto.Sizer.varint64(this.Kind.length) + this.Kind.length
        : 0;
    size +=
      this.SubKind.length > 0
        ? 1 + __proto.Sizer.varint64(this.SubKind.length) + this.SubKind.length
        : 0;
    size +=
      this.Version.length > 0
        ? 1 + __proto.Sizer.varint64(this.Version.length) + this.Version.length
        : 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Spec != null) {
      const f: ReverseTunnelSpecV2 = this.Spec as ReverseTunnelSpecV2;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes ReverseTunnelV2 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes ReverseTunnelV2 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Kind.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Kind.length);
      encoder.string(this.Kind);
    }
    if (this.SubKind.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.SubKind.length);
      encoder.string(this.SubKind);
    }
    if (this.Version.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Version.length);
      encoder.string(this.Version);
    }

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Spec != null) {
      const f = this.Spec as ReverseTunnelSpecV2;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode ReverseTunnelV2
} // ReverseTunnelV2

// ReverseTunnelSpecV2 is a specification for V2 reverse tunnel
export class ReverseTunnelSpecV2 {
  // ClusterName is a domain name of remote cluster we are connecting to
  public ClusterName: string = "";
  /**
   * DialAddrs is a list of remote address to establish a connection to
   *  it's always SSH over TCP
   */
  public DialAddrs: Array<string> = new Array<string>();
  // Type is the type of reverse tunnel, either proxy or node.
  public Type: string = "";

  // Decodes ReverseTunnelSpecV2 from an ArrayBuffer
  static decode(buf: ArrayBuffer): ReverseTunnelSpecV2 {
    return ReverseTunnelSpecV2.decodeDataView(new DataView(buf));
  }

  // Decodes ReverseTunnelSpecV2 from a DataView
  static decodeDataView(view: DataView): ReverseTunnelSpecV2 {
    const decoder = new __proto.Decoder(view);
    const obj = new ReverseTunnelSpecV2();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.ClusterName = decoder.string();
          break;
        }
        case 2: {
          obj.DialAddrs.push(decoder.string());
          break;
        }
        case 3: {
          obj.Type = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode ReverseTunnelSpecV2

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.ClusterName.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.ClusterName.length) +
          this.ClusterName.length
        : 0;

    size += __size_string_repeated(this.DialAddrs);

    size +=
      this.Type.length > 0
        ? 1 + __proto.Sizer.varint64(this.Type.length) + this.Type.length
        : 0;

    return size;
  }

  // Encodes ReverseTunnelSpecV2 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes ReverseTunnelSpecV2 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.ClusterName.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.ClusterName.length);
      encoder.string(this.ClusterName);
    }

    if (this.DialAddrs.length > 0) {
      for (let n: i32 = 0; n < this.DialAddrs.length; n++) {
        encoder.uint32(0x12);
        encoder.uint32(this.DialAddrs[n].length);
        encoder.string(this.DialAddrs[n]);
      }
    }

    if (this.Type.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Type.length);
      encoder.string(this.Type);
    }

    return buf;
  } // encode ReverseTunnelSpecV2
} // ReverseTunnelSpecV2

// TunnelConnectionV2 is version 2 of the resource spec of the tunnel connection
export class TunnelConnectionV2 {
  // Kind is a resource kind
  public Kind: string = "";
  // SubKind is an optional resource sub kind, used in some resources
  public SubKind: string = "";
  // Version is version
  public Version: string = "";
  // Metadata is a resource metadata
  public Metadata: Metadata = new Metadata();
  // Spec is a tunnel specification
  public Spec: TunnelConnectionSpecV2 = new TunnelConnectionSpecV2();

  // Decodes TunnelConnectionV2 from an ArrayBuffer
  static decode(buf: ArrayBuffer): TunnelConnectionV2 {
    return TunnelConnectionV2.decodeDataView(new DataView(buf));
  }

  // Decodes TunnelConnectionV2 from a DataView
  static decodeDataView(view: DataView): TunnelConnectionV2 {
    const decoder = new __proto.Decoder(view);
    const obj = new TunnelConnectionV2();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Kind = decoder.string();
          break;
        }
        case 2: {
          obj.SubKind = decoder.string();
          break;
        }
        case 3: {
          obj.Version = decoder.string();
          break;
        }
        case 4: {
          const length = decoder.uint32();
          obj.Metadata = Metadata.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 5: {
          const length = decoder.uint32();
          obj.Spec = TunnelConnectionSpecV2.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode TunnelConnectionV2

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Kind.length > 0
        ? 1 + __proto.Sizer.varint64(this.Kind.length) + this.Kind.length
        : 0;
    size +=
      this.SubKind.length > 0
        ? 1 + __proto.Sizer.varint64(this.SubKind.length) + this.SubKind.length
        : 0;
    size +=
      this.Version.length > 0
        ? 1 + __proto.Sizer.varint64(this.Version.length) + this.Version.length
        : 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Spec != null) {
      const f: TunnelConnectionSpecV2 = this.Spec as TunnelConnectionSpecV2;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes TunnelConnectionV2 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes TunnelConnectionV2 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Kind.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Kind.length);
      encoder.string(this.Kind);
    }
    if (this.SubKind.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.SubKind.length);
      encoder.string(this.SubKind);
    }
    if (this.Version.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Version.length);
      encoder.string(this.Version);
    }

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Spec != null) {
      const f = this.Spec as TunnelConnectionSpecV2;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode TunnelConnectionV2
} // TunnelConnectionV2

// TunnelConnectionSpecV2 is a specification for V2 tunnel connection
export class TunnelConnectionSpecV2 {
  // ClusterName is a name of the cluster
  public ClusterName: string = "";
  // ProxyName is the name of the proxy server
  public ProxyName: string = "";
  // LastHeartbeat is a time of the last heartbeat
  public LastHeartbeat: google.protobuf.Timestamp =
    new google.protobuf.Timestamp();
  // Type is the type of reverse tunnel, either proxy or node.
  public Type: string = "";

  // Decodes TunnelConnectionSpecV2 from an ArrayBuffer
  static decode(buf: ArrayBuffer): TunnelConnectionSpecV2 {
    return TunnelConnectionSpecV2.decodeDataView(new DataView(buf));
  }

  // Decodes TunnelConnectionSpecV2 from a DataView
  static decodeDataView(view: DataView): TunnelConnectionSpecV2 {
    const decoder = new __proto.Decoder(view);
    const obj = new TunnelConnectionSpecV2();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.ClusterName = decoder.string();
          break;
        }
        case 2: {
          obj.ProxyName = decoder.string();
          break;
        }
        case 3: {
          const length = decoder.uint32();
          obj.LastHeartbeat = google.protobuf.Timestamp.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 4: {
          obj.Type = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode TunnelConnectionSpecV2

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.ClusterName.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.ClusterName.length) +
          this.ClusterName.length
        : 0;
    size +=
      this.ProxyName.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.ProxyName.length) +
          this.ProxyName.length
        : 0;

    if (this.LastHeartbeat != null) {
      const f: google.protobuf.Timestamp = this
        .LastHeartbeat as google.protobuf.Timestamp;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.Type.length > 0
        ? 1 + __proto.Sizer.varint64(this.Type.length) + this.Type.length
        : 0;

    return size;
  }

  // Encodes TunnelConnectionSpecV2 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes TunnelConnectionSpecV2 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.ClusterName.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.ClusterName.length);
      encoder.string(this.ClusterName);
    }
    if (this.ProxyName.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.ProxyName.length);
      encoder.string(this.ProxyName);
    }

    if (this.LastHeartbeat != null) {
      const f = this.LastHeartbeat as google.protobuf.Timestamp;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Type.length > 0) {
      encoder.uint32(0x22);
      encoder.uint32(this.Type.length);
      encoder.string(this.Type);
    }

    return buf;
  } // encode TunnelConnectionSpecV2
} // TunnelConnectionSpecV2

/**
 * SemaphoreFilter encodes semaphore filtering params.
 *  A semaphore filter matches a semaphore if all nonzero fields
 *  match the corresponding semaphore fileds (e.g. a filter which
 *  specifies only `kind=foo` would match all semaphores of
 *  kind `foo`).
 */
export class SemaphoreFilter {
  // SemaphoreKind is the kind of the semaphore.
  public SemaphoreKind: string = "";
  // SemaphoreName is the name of the semaphore.
  public SemaphoreName: string = "";

  // Decodes SemaphoreFilter from an ArrayBuffer
  static decode(buf: ArrayBuffer): SemaphoreFilter {
    return SemaphoreFilter.decodeDataView(new DataView(buf));
  }

  // Decodes SemaphoreFilter from a DataView
  static decodeDataView(view: DataView): SemaphoreFilter {
    const decoder = new __proto.Decoder(view);
    const obj = new SemaphoreFilter();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.SemaphoreKind = decoder.string();
          break;
        }
        case 2: {
          obj.SemaphoreName = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode SemaphoreFilter

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.SemaphoreKind.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.SemaphoreKind.length) +
          this.SemaphoreKind.length
        : 0;
    size +=
      this.SemaphoreName.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.SemaphoreName.length) +
          this.SemaphoreName.length
        : 0;

    return size;
  }

  // Encodes SemaphoreFilter to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes SemaphoreFilter to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.SemaphoreKind.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.SemaphoreKind.length);
      encoder.string(this.SemaphoreKind);
    }
    if (this.SemaphoreName.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.SemaphoreName.length);
      encoder.string(this.SemaphoreName);
    }

    return buf;
  } // encode SemaphoreFilter
} // SemaphoreFilter

// AcquireSemaphoreRequest holds semaphore lease acquisition parameters.
export class AcquireSemaphoreRequest {
  // SemaphoreKind is the kind of the semaphore.
  public SemaphoreKind: string = "";
  // SemaphoreName is the name of the semaphore.
  public SemaphoreName: string = "";
  /**
   * MaxLeases is the maximum number of concurrent leases.  If acquisition
   *  would cause more than MaxLeases to exist, acquisition must fail.
   */
  public MaxLeases: i64;
  // Expires is the time at which this lease expires.
  public Expires: google.protobuf.Timestamp = new google.protobuf.Timestamp();
  // Holder identifies the entitiy holding the lease.
  public Holder: string = "";

  // Decodes AcquireSemaphoreRequest from an ArrayBuffer
  static decode(buf: ArrayBuffer): AcquireSemaphoreRequest {
    return AcquireSemaphoreRequest.decodeDataView(new DataView(buf));
  }

  // Decodes AcquireSemaphoreRequest from a DataView
  static decodeDataView(view: DataView): AcquireSemaphoreRequest {
    const decoder = new __proto.Decoder(view);
    const obj = new AcquireSemaphoreRequest();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.SemaphoreKind = decoder.string();
          break;
        }
        case 2: {
          obj.SemaphoreName = decoder.string();
          break;
        }
        case 3: {
          obj.MaxLeases = decoder.int64();
          break;
        }
        case 4: {
          const length = decoder.uint32();
          obj.Expires = google.protobuf.Timestamp.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 5: {
          obj.Holder = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode AcquireSemaphoreRequest

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.SemaphoreKind.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.SemaphoreKind.length) +
          this.SemaphoreKind.length
        : 0;
    size +=
      this.SemaphoreName.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.SemaphoreName.length) +
          this.SemaphoreName.length
        : 0;
    size += this.MaxLeases == 0 ? 0 : 1 + __proto.Sizer.int64(this.MaxLeases);

    if (this.Expires != null) {
      const f: google.protobuf.Timestamp = this
        .Expires as google.protobuf.Timestamp;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.Holder.length > 0
        ? 1 + __proto.Sizer.varint64(this.Holder.length) + this.Holder.length
        : 0;

    return size;
  }

  // Encodes AcquireSemaphoreRequest to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes AcquireSemaphoreRequest to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.SemaphoreKind.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.SemaphoreKind.length);
      encoder.string(this.SemaphoreKind);
    }
    if (this.SemaphoreName.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.SemaphoreName.length);
      encoder.string(this.SemaphoreName);
    }
    if (this.MaxLeases != 0) {
      encoder.uint32(0x18);
      encoder.int64(this.MaxLeases);
    }

    if (this.Expires != null) {
      const f = this.Expires as google.protobuf.Timestamp;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Holder.length > 0) {
      encoder.uint32(0x2a);
      encoder.uint32(this.Holder.length);
      encoder.string(this.Holder);
    }

    return buf;
  } // encode AcquireSemaphoreRequest
} // AcquireSemaphoreRequest

// SemaphoreLease represents lease acquired for semaphore
export class SemaphoreLease {
  // SemaphoreKind is the kind of the semaphore.
  public SemaphoreKind: string = "";
  // SemaphoreName is the name of the semaphore.
  public SemaphoreName: string = "";
  // LeaseID uniquely identifies this lease.
  public LeaseID: string = "";
  // Expires is the time at which this lease expires.
  public Expires: google.protobuf.Timestamp = new google.protobuf.Timestamp();

  // Decodes SemaphoreLease from an ArrayBuffer
  static decode(buf: ArrayBuffer): SemaphoreLease {
    return SemaphoreLease.decodeDataView(new DataView(buf));
  }

  // Decodes SemaphoreLease from a DataView
  static decodeDataView(view: DataView): SemaphoreLease {
    const decoder = new __proto.Decoder(view);
    const obj = new SemaphoreLease();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.SemaphoreKind = decoder.string();
          break;
        }
        case 2: {
          obj.SemaphoreName = decoder.string();
          break;
        }
        case 3: {
          obj.LeaseID = decoder.string();
          break;
        }
        case 5: {
          const length = decoder.uint32();
          obj.Expires = google.protobuf.Timestamp.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode SemaphoreLease

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.SemaphoreKind.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.SemaphoreKind.length) +
          this.SemaphoreKind.length
        : 0;
    size +=
      this.SemaphoreName.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.SemaphoreName.length) +
          this.SemaphoreName.length
        : 0;
    size +=
      this.LeaseID.length > 0
        ? 1 + __proto.Sizer.varint64(this.LeaseID.length) + this.LeaseID.length
        : 0;

    if (this.Expires != null) {
      const f: google.protobuf.Timestamp = this
        .Expires as google.protobuf.Timestamp;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes SemaphoreLease to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes SemaphoreLease to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.SemaphoreKind.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.SemaphoreKind.length);
      encoder.string(this.SemaphoreKind);
    }
    if (this.SemaphoreName.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.SemaphoreName.length);
      encoder.string(this.SemaphoreName);
    }
    if (this.LeaseID.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.LeaseID.length);
      encoder.string(this.LeaseID);
    }

    if (this.Expires != null) {
      const f = this.Expires as google.protobuf.Timestamp;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode SemaphoreLease
} // SemaphoreLease

// SemaphoreLeaseRef identifies an existent lease.
export class SemaphoreLeaseRef {
  // LeaseID is the unique ID of the lease.
  public LeaseID: string = "";
  // Expires is the time at which the lease expires.
  public Expires: google.protobuf.Timestamp = new google.protobuf.Timestamp();
  // Holder identifies the lease holder.
  public Holder: string = "";

  // Decodes SemaphoreLeaseRef from an ArrayBuffer
  static decode(buf: ArrayBuffer): SemaphoreLeaseRef {
    return SemaphoreLeaseRef.decodeDataView(new DataView(buf));
  }

  // Decodes SemaphoreLeaseRef from a DataView
  static decodeDataView(view: DataView): SemaphoreLeaseRef {
    const decoder = new __proto.Decoder(view);
    const obj = new SemaphoreLeaseRef();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.LeaseID = decoder.string();
          break;
        }
        case 2: {
          const length = decoder.uint32();
          obj.Expires = google.protobuf.Timestamp.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 3: {
          obj.Holder = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode SemaphoreLeaseRef

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.LeaseID.length > 0
        ? 1 + __proto.Sizer.varint64(this.LeaseID.length) + this.LeaseID.length
        : 0;

    if (this.Expires != null) {
      const f: google.protobuf.Timestamp = this
        .Expires as google.protobuf.Timestamp;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.Holder.length > 0
        ? 1 + __proto.Sizer.varint64(this.Holder.length) + this.Holder.length
        : 0;

    return size;
  }

  // Encodes SemaphoreLeaseRef to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes SemaphoreLeaseRef to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.LeaseID.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.LeaseID.length);
      encoder.string(this.LeaseID);
    }

    if (this.Expires != null) {
      const f = this.Expires as google.protobuf.Timestamp;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Holder.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Holder.length);
      encoder.string(this.Holder);
    }

    return buf;
  } // encode SemaphoreLeaseRef
} // SemaphoreLeaseRef

// SemaphoreV3 implements Semaphore interface
export class SemaphoreV3 {
  // Kind is a resource kind
  public Kind: string = "";
  // SubKind is an optional resource sub kind, used in some resources
  public SubKind: string = "";
  // Version is version
  public Version: string = "";
  // Metadata is Semaphore metadata
  public Metadata: Metadata = new Metadata();
  // Spec is a lease V3 spec
  public Spec: SemaphoreSpecV3 = new SemaphoreSpecV3();

  // Decodes SemaphoreV3 from an ArrayBuffer
  static decode(buf: ArrayBuffer): SemaphoreV3 {
    return SemaphoreV3.decodeDataView(new DataView(buf));
  }

  // Decodes SemaphoreV3 from a DataView
  static decodeDataView(view: DataView): SemaphoreV3 {
    const decoder = new __proto.Decoder(view);
    const obj = new SemaphoreV3();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Kind = decoder.string();
          break;
        }
        case 2: {
          obj.SubKind = decoder.string();
          break;
        }
        case 3: {
          obj.Version = decoder.string();
          break;
        }
        case 4: {
          const length = decoder.uint32();
          obj.Metadata = Metadata.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 5: {
          const length = decoder.uint32();
          obj.Spec = SemaphoreSpecV3.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode SemaphoreV3

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Kind.length > 0
        ? 1 + __proto.Sizer.varint64(this.Kind.length) + this.Kind.length
        : 0;
    size +=
      this.SubKind.length > 0
        ? 1 + __proto.Sizer.varint64(this.SubKind.length) + this.SubKind.length
        : 0;
    size +=
      this.Version.length > 0
        ? 1 + __proto.Sizer.varint64(this.Version.length) + this.Version.length
        : 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Spec != null) {
      const f: SemaphoreSpecV3 = this.Spec as SemaphoreSpecV3;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes SemaphoreV3 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes SemaphoreV3 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Kind.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Kind.length);
      encoder.string(this.Kind);
    }
    if (this.SubKind.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.SubKind.length);
      encoder.string(this.SubKind);
    }
    if (this.Version.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Version.length);
      encoder.string(this.Version);
    }

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Spec != null) {
      const f = this.Spec as SemaphoreSpecV3;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode SemaphoreV3
} // SemaphoreV3

// SemaphoreSpecV3 contains the data about lease
export class SemaphoreSpecV3 {
  // Leases is a list of all currently acquired leases.
  public Leases: Array<SemaphoreLeaseRef> = new Array<SemaphoreLeaseRef>();

  // Decodes SemaphoreSpecV3 from an ArrayBuffer
  static decode(buf: ArrayBuffer): SemaphoreSpecV3 {
    return SemaphoreSpecV3.decodeDataView(new DataView(buf));
  }

  // Decodes SemaphoreSpecV3 from a DataView
  static decodeDataView(view: DataView): SemaphoreSpecV3 {
    const decoder = new __proto.Decoder(view);
    const obj = new SemaphoreSpecV3();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          const length = decoder.uint32();
          obj.Leases.push(
            SemaphoreLeaseRef.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length
              )
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode SemaphoreSpecV3

  public size(): u32 {
    let size: u32 = 0;

    for (let n: i32 = 0; n < this.Leases.length; n++) {
      const messageSize = this.Leases[n].size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes SemaphoreSpecV3 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes SemaphoreSpecV3 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    for (let n: i32 = 0; n < this.Leases.length; n++) {
      const messageSize = this.Leases[n].size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        this.Leases[n].encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode SemaphoreSpecV3
} // SemaphoreSpecV3

// WebSessionV2 represents an application or UI web session.
export class WebSessionV2 {
  // Kind is a resource kind.
  public Kind: string = "";
  // SubKind is an optional resource sub kind, used in some resources.
  public SubKind: string = "";
  // Version is version.
  public Version: string = "";
  // Metadata is a resource metadata.
  public Metadata: Metadata = new Metadata();
  // Spec is a tunnel specification.
  public Spec: WebSessionSpecV2 = new WebSessionSpecV2();

  // Decodes WebSessionV2 from an ArrayBuffer
  static decode(buf: ArrayBuffer): WebSessionV2 {
    return WebSessionV2.decodeDataView(new DataView(buf));
  }

  // Decodes WebSessionV2 from a DataView
  static decodeDataView(view: DataView): WebSessionV2 {
    const decoder = new __proto.Decoder(view);
    const obj = new WebSessionV2();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Kind = decoder.string();
          break;
        }
        case 2: {
          obj.SubKind = decoder.string();
          break;
        }
        case 3: {
          obj.Version = decoder.string();
          break;
        }
        case 4: {
          const length = decoder.uint32();
          obj.Metadata = Metadata.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 5: {
          const length = decoder.uint32();
          obj.Spec = WebSessionSpecV2.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode WebSessionV2

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Kind.length > 0
        ? 1 + __proto.Sizer.varint64(this.Kind.length) + this.Kind.length
        : 0;
    size +=
      this.SubKind.length > 0
        ? 1 + __proto.Sizer.varint64(this.SubKind.length) + this.SubKind.length
        : 0;
    size +=
      this.Version.length > 0
        ? 1 + __proto.Sizer.varint64(this.Version.length) + this.Version.length
        : 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Spec != null) {
      const f: WebSessionSpecV2 = this.Spec as WebSessionSpecV2;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes WebSessionV2 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes WebSessionV2 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Kind.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Kind.length);
      encoder.string(this.Kind);
    }
    if (this.SubKind.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.SubKind.length);
      encoder.string(this.SubKind);
    }
    if (this.Version.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Version.length);
      encoder.string(this.Version);
    }

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Spec != null) {
      const f = this.Spec as WebSessionSpecV2;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode WebSessionV2
} // WebSessionV2

// WebSessionSpecV2 is a specification for web session.
export class WebSessionSpecV2 {
  // User is the identity of the user to which the web session belongs.
  public User: string = "";
  // Pub is the SSH certificate for the user.
  public Pub: Array<u8> = new Array<u8>();
  // Priv is the SSH private key for the user.
  public Priv: Array<u8> = new Array<u8>();
  // TLSCert is the TLS certificate for the user.
  public TLSCert: Array<u8> = new Array<u8>();
  /**
   * BearerToken is a token that is paired with the session cookie for
   *  authentication. It is periodically rotated so a stolen cookie itself
   *  is not enough to steal a session. In addition it is used for CSRF
   *  mitigation.
   */
  public BearerToken: string = "";
  // BearerTokenExpires is the absolute time when the token expires.
  public BearerTokenExpires: google.protobuf.Timestamp =
    new google.protobuf.Timestamp();
  // Expires is the absolute time when the session expires.
  public Expires: google.protobuf.Timestamp = new google.protobuf.Timestamp();
  // LoginTime is the time this user recently logged in.
  public LoginTime: google.protobuf.Timestamp = new google.protobuf.Timestamp();
  // IdleTimeout is the max time a user can be inactive in a session.
  public IdleTimeout: i64;

  // Decodes WebSessionSpecV2 from an ArrayBuffer
  static decode(buf: ArrayBuffer): WebSessionSpecV2 {
    return WebSessionSpecV2.decodeDataView(new DataView(buf));
  }

  // Decodes WebSessionSpecV2 from a DataView
  static decodeDataView(view: DataView): WebSessionSpecV2 {
    const decoder = new __proto.Decoder(view);
    const obj = new WebSessionSpecV2();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.User = decoder.string();
          break;
        }
        case 2: {
          obj.Pub = decoder.bytes();
          break;
        }
        case 3: {
          obj.Priv = decoder.bytes();
          break;
        }
        case 4: {
          obj.TLSCert = decoder.bytes();
          break;
        }
        case 5: {
          obj.BearerToken = decoder.string();
          break;
        }
        case 6: {
          const length = decoder.uint32();
          obj.BearerTokenExpires = google.protobuf.Timestamp.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 7: {
          const length = decoder.uint32();
          obj.Expires = google.protobuf.Timestamp.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 8: {
          const length = decoder.uint32();
          obj.LoginTime = google.protobuf.Timestamp.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 9: {
          obj.IdleTimeout = decoder.int64();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode WebSessionSpecV2

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.User.length > 0
        ? 1 + __proto.Sizer.varint64(this.User.length) + this.User.length
        : 0;
    size +=
      this.Pub.length > 0
        ? 1 + __proto.Sizer.varint64(this.Pub.length) + this.Pub.length
        : 0;
    size +=
      this.Priv.length > 0
        ? 1 + __proto.Sizer.varint64(this.Priv.length) + this.Priv.length
        : 0;
    size +=
      this.TLSCert.length > 0
        ? 1 + __proto.Sizer.varint64(this.TLSCert.length) + this.TLSCert.length
        : 0;
    size +=
      this.BearerToken.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.BearerToken.length) +
          this.BearerToken.length
        : 0;

    if (this.BearerTokenExpires != null) {
      const f: google.protobuf.Timestamp = this
        .BearerTokenExpires as google.protobuf.Timestamp;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Expires != null) {
      const f: google.protobuf.Timestamp = this
        .Expires as google.protobuf.Timestamp;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.LoginTime != null) {
      const f: google.protobuf.Timestamp = this
        .LoginTime as google.protobuf.Timestamp;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.IdleTimeout == 0 ? 0 : 1 + __proto.Sizer.int64(this.IdleTimeout);

    return size;
  }

  // Encodes WebSessionSpecV2 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes WebSessionSpecV2 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.User.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.User.length);
      encoder.string(this.User);
    }
    if (this.Pub.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.Pub.length);
      encoder.bytes(this.Pub);
    }
    if (this.Priv.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Priv.length);
      encoder.bytes(this.Priv);
    }
    if (this.TLSCert.length > 0) {
      encoder.uint32(0x22);
      encoder.uint32(this.TLSCert.length);
      encoder.bytes(this.TLSCert);
    }
    if (this.BearerToken.length > 0) {
      encoder.uint32(0x2a);
      encoder.uint32(this.BearerToken.length);
      encoder.string(this.BearerToken);
    }

    if (this.BearerTokenExpires != null) {
      const f = this.BearerTokenExpires as google.protobuf.Timestamp;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x32);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Expires != null) {
      const f = this.Expires as google.protobuf.Timestamp;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x3a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.LoginTime != null) {
      const f = this.LoginTime as google.protobuf.Timestamp;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x42);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.IdleTimeout != 0) {
      encoder.uint32(0x48);
      encoder.int64(this.IdleTimeout);
    }

    return buf;
  } // encode WebSessionSpecV2
} // WebSessionSpecV2

// WebSessionFilter encodes cache watch parameters for filtering web sessions.
export class WebSessionFilter {
  // User is the username to filter web sessions for.
  public User: string = "";

  // Decodes WebSessionFilter from an ArrayBuffer
  static decode(buf: ArrayBuffer): WebSessionFilter {
    return WebSessionFilter.decodeDataView(new DataView(buf));
  }

  // Decodes WebSessionFilter from a DataView
  static decodeDataView(view: DataView): WebSessionFilter {
    const decoder = new __proto.Decoder(view);
    const obj = new WebSessionFilter();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.User = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode WebSessionFilter

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.User.length > 0
        ? 1 + __proto.Sizer.varint64(this.User.length) + this.User.length
        : 0;

    return size;
  }

  // Encodes WebSessionFilter to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes WebSessionFilter to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.User.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.User.length);
      encoder.string(this.User);
    }

    return buf;
  } // encode WebSessionFilter
} // WebSessionFilter

// RemoteClusterV3 represents remote cluster resource specification
export class RemoteClusterV3 {
  // Kind is a resource kind
  public Kind: string = "";
  // SubKind is an optional resource sub kind, used in some resources
  public SubKind: string = "";
  // Version is resource API version
  public Version: string = "";
  // Metadata is resource metadata
  public Metadata: Metadata = new Metadata();
  // Status is a remote cluster status
  public Status: RemoteClusterStatusV3 = new RemoteClusterStatusV3();

  // Decodes RemoteClusterV3 from an ArrayBuffer
  static decode(buf: ArrayBuffer): RemoteClusterV3 {
    return RemoteClusterV3.decodeDataView(new DataView(buf));
  }

  // Decodes RemoteClusterV3 from a DataView
  static decodeDataView(view: DataView): RemoteClusterV3 {
    const decoder = new __proto.Decoder(view);
    const obj = new RemoteClusterV3();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Kind = decoder.string();
          break;
        }
        case 2: {
          obj.SubKind = decoder.string();
          break;
        }
        case 3: {
          obj.Version = decoder.string();
          break;
        }
        case 4: {
          const length = decoder.uint32();
          obj.Metadata = Metadata.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 5: {
          const length = decoder.uint32();
          obj.Status = RemoteClusterStatusV3.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode RemoteClusterV3

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Kind.length > 0
        ? 1 + __proto.Sizer.varint64(this.Kind.length) + this.Kind.length
        : 0;
    size +=
      this.SubKind.length > 0
        ? 1 + __proto.Sizer.varint64(this.SubKind.length) + this.SubKind.length
        : 0;
    size +=
      this.Version.length > 0
        ? 1 + __proto.Sizer.varint64(this.Version.length) + this.Version.length
        : 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Status != null) {
      const f: RemoteClusterStatusV3 = this.Status as RemoteClusterStatusV3;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes RemoteClusterV3 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes RemoteClusterV3 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Kind.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Kind.length);
      encoder.string(this.Kind);
    }
    if (this.SubKind.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.SubKind.length);
      encoder.string(this.SubKind);
    }
    if (this.Version.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Version.length);
      encoder.string(this.Version);
    }

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Status != null) {
      const f = this.Status as RemoteClusterStatusV3;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode RemoteClusterV3
} // RemoteClusterV3

// RemoteClusterStatusV3 represents status of the remote cluster
export class RemoteClusterStatusV3 {
  // Connection represents connection status, online or offline
  public Connection: string = "";
  // LastHeartbeat records last heartbeat of the cluster
  public LastHeartbeat: google.protobuf.Timestamp =
    new google.protobuf.Timestamp();

  // Decodes RemoteClusterStatusV3 from an ArrayBuffer
  static decode(buf: ArrayBuffer): RemoteClusterStatusV3 {
    return RemoteClusterStatusV3.decodeDataView(new DataView(buf));
  }

  // Decodes RemoteClusterStatusV3 from a DataView
  static decodeDataView(view: DataView): RemoteClusterStatusV3 {
    const decoder = new __proto.Decoder(view);
    const obj = new RemoteClusterStatusV3();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Connection = decoder.string();
          break;
        }
        case 2: {
          const length = decoder.uint32();
          obj.LastHeartbeat = google.protobuf.Timestamp.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode RemoteClusterStatusV3

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Connection.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.Connection.length) +
          this.Connection.length
        : 0;

    if (this.LastHeartbeat != null) {
      const f: google.protobuf.Timestamp = this
        .LastHeartbeat as google.protobuf.Timestamp;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes RemoteClusterStatusV3 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes RemoteClusterStatusV3 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Connection.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Connection.length);
      encoder.string(this.Connection);
    }

    if (this.LastHeartbeat != null) {
      const f = this.LastHeartbeat as google.protobuf.Timestamp;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode RemoteClusterStatusV3
} // RemoteClusterStatusV3

/**
 * KubernetesCluster is a named kubernetes API endpoint handled by a Server.
 *
 *  TODO: deprecate and convert all usage to KubernetesClusterV3
 */
export class KubernetesCluster {
  // Name is the name of this kubernetes cluster.
  public Name: string = "";
  /**
   * StaticLabels is map of static labels associated with this cluster.
   *  Used for RBAC.
   */
  public StaticLabels: Map<string, string> = new Map<string, string>();
  /**
   * DynamicLabels is map of dynamic labels associated with this cluster.
   *  Used for RBAC.
   */
  public DynamicLabels: Map<string, CommandLabelV2> = new Map<
    string,
    CommandLabelV2
  >();

  // Decodes KubernetesCluster from an ArrayBuffer
  static decode(buf: ArrayBuffer): KubernetesCluster {
    return KubernetesCluster.decodeDataView(new DataView(buf));
  }

  // Decodes KubernetesCluster from a DataView
  static decodeDataView(view: DataView): KubernetesCluster {
    const decoder = new __proto.Decoder(view);
    const obj = new KubernetesCluster();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Name = decoder.string();
          break;
        }
        case 2: {
          const length = decoder.uint32();
          __decodeMap_string_string(decoder, length, obj.StaticLabels);
          decoder.skip(length);

          break;
        }
        case 3: {
          const length = decoder.uint32();
          __decodeMap_string_CommandLabelV2(decoder, length, obj.DynamicLabels);
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode KubernetesCluster

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Name.length > 0
        ? 1 + __proto.Sizer.varint64(this.Name.length) + this.Name.length
        : 0;

    if (this.StaticLabels.size > 0) {
      const keys = this.StaticLabels.keys();

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = this.StaticLabels.get(key);
        const itemSize = __sizeMapEntry_string_string(key, value);
        if (itemSize > 0) {
          size += 1 + __proto.Sizer.varint64(itemSize) + itemSize;
        }
      }
    }

    if (this.DynamicLabels.size > 0) {
      const keys = this.DynamicLabels.keys();

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = this.DynamicLabels.get(key);
        const itemSize = __sizeMapEntry_string_CommandLabelV2(key, value);
        if (itemSize > 0) {
          size += 1 + __proto.Sizer.varint64(itemSize) + itemSize;
        }
      }
    }

    return size;
  }

  // Encodes KubernetesCluster to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes KubernetesCluster to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Name.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Name.length);
      encoder.string(this.Name);
    }

    if (this.StaticLabels.size > 0) {
      const keys = this.StaticLabels.keys();
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = this.StaticLabels.get(key);
        const size = __sizeMapEntry_string_string(key, value);
        if (size > 0) {
          encoder.uint32(0x12);
          encoder.uint32(size);
          if (key.length > 0) {
            encoder.uint32(0xa);
            encoder.uint32(key.length);
            encoder.string(key);
          }
          if (value.length > 0) {
            encoder.uint32(0x12);
            encoder.uint32(value.length);
            encoder.string(value);
          }
        }
      }
    }

    if (this.DynamicLabels.size > 0) {
      const keys = this.DynamicLabels.keys();
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = this.DynamicLabels.get(key);
        const size = __sizeMapEntry_string_CommandLabelV2(key, value);
        if (size > 0) {
          encoder.uint32(0x1a);
          encoder.uint32(size);
          if (key.length > 0) {
            encoder.uint32(0xa);
            encoder.uint32(key.length);
            encoder.string(key);
          }

          const messageSize = value.size();

          if (messageSize > 0) {
            encoder.uint32(0x12);
            encoder.uint32(messageSize);
            value.encodeU8Array(encoder);
          }
        }
      }
    }

    return buf;
  } // encode KubernetesCluster
} // KubernetesCluster

// KubernetesClusterV3 represents a named kubernetes API endpoint.
export class KubernetesClusterV3 {
  // Kind is the cluster resource kind.
  public Kind: string = "";
  // SubKind is an optional resource subkind.
  public SubKind: string = "";
  // Version is the resource version.
  public Version: string = "";
  // Metadata is the resource metadata.
  public Metadata: Metadata = new Metadata();
  // Spec is the resource spec.
  public Spec: KubernetesClusterSpecV3 = new KubernetesClusterSpecV3();

  // Decodes KubernetesClusterV3 from an ArrayBuffer
  static decode(buf: ArrayBuffer): KubernetesClusterV3 {
    return KubernetesClusterV3.decodeDataView(new DataView(buf));
  }

  // Decodes KubernetesClusterV3 from a DataView
  static decodeDataView(view: DataView): KubernetesClusterV3 {
    const decoder = new __proto.Decoder(view);
    const obj = new KubernetesClusterV3();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Kind = decoder.string();
          break;
        }
        case 2: {
          obj.SubKind = decoder.string();
          break;
        }
        case 3: {
          obj.Version = decoder.string();
          break;
        }
        case 4: {
          const length = decoder.uint32();
          obj.Metadata = Metadata.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 5: {
          const length = decoder.uint32();
          obj.Spec = KubernetesClusterSpecV3.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode KubernetesClusterV3

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Kind.length > 0
        ? 1 + __proto.Sizer.varint64(this.Kind.length) + this.Kind.length
        : 0;
    size +=
      this.SubKind.length > 0
        ? 1 + __proto.Sizer.varint64(this.SubKind.length) + this.SubKind.length
        : 0;
    size +=
      this.Version.length > 0
        ? 1 + __proto.Sizer.varint64(this.Version.length) + this.Version.length
        : 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Spec != null) {
      const f: KubernetesClusterSpecV3 = this.Spec as KubernetesClusterSpecV3;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes KubernetesClusterV3 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes KubernetesClusterV3 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Kind.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Kind.length);
      encoder.string(this.Kind);
    }
    if (this.SubKind.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.SubKind.length);
      encoder.string(this.SubKind);
    }
    if (this.Version.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Version.length);
      encoder.string(this.Version);
    }

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Spec != null) {
      const f = this.Spec as KubernetesClusterSpecV3;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode KubernetesClusterV3
} // KubernetesClusterV3

// KubernetesClusterSpecV3 is a specification for a Kubernetes cluster.
export class KubernetesClusterSpecV3 {
  // DynamicLabels are the cluster's dynamic labels.
  public DynamicLabels: Map<string, CommandLabelV2> = new Map<
    string,
    CommandLabelV2
  >();

  // Decodes KubernetesClusterSpecV3 from an ArrayBuffer
  static decode(buf: ArrayBuffer): KubernetesClusterSpecV3 {
    return KubernetesClusterSpecV3.decodeDataView(new DataView(buf));
  }

  // Decodes KubernetesClusterSpecV3 from a DataView
  static decodeDataView(view: DataView): KubernetesClusterSpecV3 {
    const decoder = new __proto.Decoder(view);
    const obj = new KubernetesClusterSpecV3();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          const length = decoder.uint32();
          __decodeMap_string_CommandLabelV2(decoder, length, obj.DynamicLabels);
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode KubernetesClusterSpecV3

  public size(): u32 {
    let size: u32 = 0;

    if (this.DynamicLabels.size > 0) {
      const keys = this.DynamicLabels.keys();

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = this.DynamicLabels.get(key);
        const itemSize = __sizeMapEntry_string_CommandLabelV2(key, value);
        if (itemSize > 0) {
          size += 1 + __proto.Sizer.varint64(itemSize) + itemSize;
        }
      }
    }

    return size;
  }

  // Encodes KubernetesClusterSpecV3 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes KubernetesClusterSpecV3 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.DynamicLabels.size > 0) {
      const keys = this.DynamicLabels.keys();
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = this.DynamicLabels.get(key);
        const size = __sizeMapEntry_string_CommandLabelV2(key, value);
        if (size > 0) {
          encoder.uint32(0xa);
          encoder.uint32(size);
          if (key.length > 0) {
            encoder.uint32(0xa);
            encoder.uint32(key.length);
            encoder.string(key);
          }

          const messageSize = value.size();

          if (messageSize > 0) {
            encoder.uint32(0x12);
            encoder.uint32(messageSize);
            value.encodeU8Array(encoder);
          }
        }
      }
    }

    return buf;
  } // encode KubernetesClusterSpecV3
} // KubernetesClusterSpecV3

/**
 * WebTokenV3 describes a web token. Web tokens are used as a transport to relay bearer tokens
 *  to the client.
 *  Initially bound to a web session, these have been factored out into a separate resource to
 *  enable separate lifecycle management.
 */
export class WebTokenV3 {
  // Kind is a resource kind
  public Kind: string = "";
  // SubKind is an optional resource sub kind
  public SubKind: string = "";
  // Version is the resource version
  public Version: string = "";
  // Metadata is resource metadata
  public Metadata: Metadata = new Metadata();
  // Spec defines the web token
  public Spec: WebTokenSpecV3 = new WebTokenSpecV3();

  // Decodes WebTokenV3 from an ArrayBuffer
  static decode(buf: ArrayBuffer): WebTokenV3 {
    return WebTokenV3.decodeDataView(new DataView(buf));
  }

  // Decodes WebTokenV3 from a DataView
  static decodeDataView(view: DataView): WebTokenV3 {
    const decoder = new __proto.Decoder(view);
    const obj = new WebTokenV3();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Kind = decoder.string();
          break;
        }
        case 2: {
          obj.SubKind = decoder.string();
          break;
        }
        case 3: {
          obj.Version = decoder.string();
          break;
        }
        case 4: {
          const length = decoder.uint32();
          obj.Metadata = Metadata.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 5: {
          const length = decoder.uint32();
          obj.Spec = WebTokenSpecV3.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode WebTokenV3

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Kind.length > 0
        ? 1 + __proto.Sizer.varint64(this.Kind.length) + this.Kind.length
        : 0;
    size +=
      this.SubKind.length > 0
        ? 1 + __proto.Sizer.varint64(this.SubKind.length) + this.SubKind.length
        : 0;
    size +=
      this.Version.length > 0
        ? 1 + __proto.Sizer.varint64(this.Version.length) + this.Version.length
        : 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Spec != null) {
      const f: WebTokenSpecV3 = this.Spec as WebTokenSpecV3;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes WebTokenV3 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes WebTokenV3 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Kind.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Kind.length);
      encoder.string(this.Kind);
    }
    if (this.SubKind.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.SubKind.length);
      encoder.string(this.SubKind);
    }
    if (this.Version.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Version.length);
      encoder.string(this.Version);
    }

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Spec != null) {
      const f = this.Spec as WebTokenSpecV3;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode WebTokenV3
} // WebTokenV3

// WebTokenSpecV3 is a unique time-limited token bound to a user's web session
export class WebTokenSpecV3 {
  // User specifies the user the token is bound to.
  public User: string = "";
  // Token specifies the token's value.
  public Token: string = "";

  // Decodes WebTokenSpecV3 from an ArrayBuffer
  static decode(buf: ArrayBuffer): WebTokenSpecV3 {
    return WebTokenSpecV3.decodeDataView(new DataView(buf));
  }

  // Decodes WebTokenSpecV3 from a DataView
  static decodeDataView(view: DataView): WebTokenSpecV3 {
    const decoder = new __proto.Decoder(view);
    const obj = new WebTokenSpecV3();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.User = decoder.string();
          break;
        }
        case 2: {
          obj.Token = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode WebTokenSpecV3

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.User.length > 0
        ? 1 + __proto.Sizer.varint64(this.User.length) + this.User.length
        : 0;
    size +=
      this.Token.length > 0
        ? 1 + __proto.Sizer.varint64(this.Token.length) + this.Token.length
        : 0;

    return size;
  }

  // Encodes WebTokenSpecV3 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes WebTokenSpecV3 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.User.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.User.length);
      encoder.string(this.User);
    }
    if (this.Token.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.Token.length);
      encoder.string(this.Token);
    }

    return buf;
  } // encode WebTokenSpecV3
} // WebTokenSpecV3

// GetWebSessionRequest describes a request to query a web session
export class GetWebSessionRequest {
  // User specifies the user the web session is for.
  public User: string = "";
  // SessionID specifies the web session ID.
  public SessionID: string = "";

  // Decodes GetWebSessionRequest from an ArrayBuffer
  static decode(buf: ArrayBuffer): GetWebSessionRequest {
    return GetWebSessionRequest.decodeDataView(new DataView(buf));
  }

  // Decodes GetWebSessionRequest from a DataView
  static decodeDataView(view: DataView): GetWebSessionRequest {
    const decoder = new __proto.Decoder(view);
    const obj = new GetWebSessionRequest();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.User = decoder.string();
          break;
        }
        case 2: {
          obj.SessionID = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode GetWebSessionRequest

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.User.length > 0
        ? 1 + __proto.Sizer.varint64(this.User.length) + this.User.length
        : 0;
    size +=
      this.SessionID.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.SessionID.length) +
          this.SessionID.length
        : 0;

    return size;
  }

  // Encodes GetWebSessionRequest to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes GetWebSessionRequest to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.User.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.User.length);
      encoder.string(this.User);
    }
    if (this.SessionID.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.SessionID.length);
      encoder.string(this.SessionID);
    }

    return buf;
  } // encode GetWebSessionRequest
} // GetWebSessionRequest

// DeleteWebSessionRequest describes a request to delete a web session
export class DeleteWebSessionRequest {
  // User specifies the user the session is bound to
  public User: string = "";
  // SessionID specifies the web session ID to delete.
  public SessionID: string = "";

  // Decodes DeleteWebSessionRequest from an ArrayBuffer
  static decode(buf: ArrayBuffer): DeleteWebSessionRequest {
    return DeleteWebSessionRequest.decodeDataView(new DataView(buf));
  }

  // Decodes DeleteWebSessionRequest from a DataView
  static decodeDataView(view: DataView): DeleteWebSessionRequest {
    const decoder = new __proto.Decoder(view);
    const obj = new DeleteWebSessionRequest();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.User = decoder.string();
          break;
        }
        case 2: {
          obj.SessionID = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode DeleteWebSessionRequest

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.User.length > 0
        ? 1 + __proto.Sizer.varint64(this.User.length) + this.User.length
        : 0;
    size +=
      this.SessionID.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.SessionID.length) +
          this.SessionID.length
        : 0;

    return size;
  }

  // Encodes DeleteWebSessionRequest to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes DeleteWebSessionRequest to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.User.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.User.length);
      encoder.string(this.User);
    }
    if (this.SessionID.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.SessionID.length);
      encoder.string(this.SessionID);
    }

    return buf;
  } // encode DeleteWebSessionRequest
} // DeleteWebSessionRequest

// GetWebTokenRequest describes a request to query a web token
export class GetWebTokenRequest {
  // User specifies the user the token is for.
  public User: string = "";
  // Token specifies the token to get.
  public Token: string = "";

  // Decodes GetWebTokenRequest from an ArrayBuffer
  static decode(buf: ArrayBuffer): GetWebTokenRequest {
    return GetWebTokenRequest.decodeDataView(new DataView(buf));
  }

  // Decodes GetWebTokenRequest from a DataView
  static decodeDataView(view: DataView): GetWebTokenRequest {
    const decoder = new __proto.Decoder(view);
    const obj = new GetWebTokenRequest();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.User = decoder.string();
          break;
        }
        case 2: {
          obj.Token = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode GetWebTokenRequest

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.User.length > 0
        ? 1 + __proto.Sizer.varint64(this.User.length) + this.User.length
        : 0;
    size +=
      this.Token.length > 0
        ? 1 + __proto.Sizer.varint64(this.Token.length) + this.Token.length
        : 0;

    return size;
  }

  // Encodes GetWebTokenRequest to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes GetWebTokenRequest to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.User.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.User.length);
      encoder.string(this.User);
    }
    if (this.Token.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.Token.length);
      encoder.string(this.Token);
    }

    return buf;
  } // encode GetWebTokenRequest
} // GetWebTokenRequest

// DeleteWebTokenRequest describes a request to delete a web token
export class DeleteWebTokenRequest {
  // User specifies the user the token is for.
  public User: string = "";
  // Token specifies the token to delete.
  public Token: string = "";

  // Decodes DeleteWebTokenRequest from an ArrayBuffer
  static decode(buf: ArrayBuffer): DeleteWebTokenRequest {
    return DeleteWebTokenRequest.decodeDataView(new DataView(buf));
  }

  // Decodes DeleteWebTokenRequest from a DataView
  static decodeDataView(view: DataView): DeleteWebTokenRequest {
    const decoder = new __proto.Decoder(view);
    const obj = new DeleteWebTokenRequest();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.User = decoder.string();
          break;
        }
        case 2: {
          obj.Token = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode DeleteWebTokenRequest

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.User.length > 0
        ? 1 + __proto.Sizer.varint64(this.User.length) + this.User.length
        : 0;
    size +=
      this.Token.length > 0
        ? 1 + __proto.Sizer.varint64(this.Token.length) + this.Token.length
        : 0;

    return size;
  }

  // Encodes DeleteWebTokenRequest to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes DeleteWebTokenRequest to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.User.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.User.length);
      encoder.string(this.User);
    }
    if (this.Token.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.Token.length);
      encoder.string(this.Token);
    }

    return buf;
  } // encode DeleteWebTokenRequest
} // DeleteWebTokenRequest

// ResourceRequest is a request relating to a named resource.
export class ResourceRequest {
  // Name is the name of the resource.
  public Name: string = "";

  // Decodes ResourceRequest from an ArrayBuffer
  static decode(buf: ArrayBuffer): ResourceRequest {
    return ResourceRequest.decodeDataView(new DataView(buf));
  }

  // Decodes ResourceRequest from a DataView
  static decodeDataView(view: DataView): ResourceRequest {
    const decoder = new __proto.Decoder(view);
    const obj = new ResourceRequest();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Name = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode ResourceRequest

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Name.length > 0
        ? 1 + __proto.Sizer.varint64(this.Name.length) + this.Name.length
        : 0;

    return size;
  }

  // Encodes ResourceRequest to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes ResourceRequest to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Name.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Name.length);
      encoder.string(this.Name);
    }

    return buf;
  } // encode ResourceRequest
} // ResourceRequest

// ResourceWithSecretsRequest is a request relating to a named resource with secrets.
export class ResourceWithSecretsRequest {
  // Name is the name of the resource.
  public Name: string = "";
  // WithSecrets specifies whether to load associated secrets.
  public WithSecrets: bool;

  // Decodes ResourceWithSecretsRequest from an ArrayBuffer
  static decode(buf: ArrayBuffer): ResourceWithSecretsRequest {
    return ResourceWithSecretsRequest.decodeDataView(new DataView(buf));
  }

  // Decodes ResourceWithSecretsRequest from a DataView
  static decodeDataView(view: DataView): ResourceWithSecretsRequest {
    const decoder = new __proto.Decoder(view);
    const obj = new ResourceWithSecretsRequest();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Name = decoder.string();
          break;
        }
        case 2: {
          obj.WithSecrets = decoder.bool();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode ResourceWithSecretsRequest

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Name.length > 0
        ? 1 + __proto.Sizer.varint64(this.Name.length) + this.Name.length
        : 0;
    size += this.WithSecrets == 0 ? 0 : 1 + 1;

    return size;
  }

  // Encodes ResourceWithSecretsRequest to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes ResourceWithSecretsRequest to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Name.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Name.length);
      encoder.string(this.Name);
    }
    if (this.WithSecrets != 0) {
      encoder.uint32(0x10);
      encoder.bool(this.WithSecrets);
    }

    return buf;
  } // encode ResourceWithSecretsRequest
} // ResourceWithSecretsRequest

// ResourcesWithSecretsRequest is a request relating to resources with secrets.
export class ResourcesWithSecretsRequest {
  // WithSecrets specifies whether to load associated secrets.
  public WithSecrets: bool;

  // Decodes ResourcesWithSecretsRequest from an ArrayBuffer
  static decode(buf: ArrayBuffer): ResourcesWithSecretsRequest {
    return ResourcesWithSecretsRequest.decodeDataView(new DataView(buf));
  }

  // Decodes ResourcesWithSecretsRequest from a DataView
  static decodeDataView(view: DataView): ResourcesWithSecretsRequest {
    const decoder = new __proto.Decoder(view);
    const obj = new ResourcesWithSecretsRequest();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.WithSecrets = decoder.bool();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode ResourcesWithSecretsRequest

  public size(): u32 {
    let size: u32 = 0;

    size += this.WithSecrets == 0 ? 0 : 1 + 1;

    return size;
  }

  // Encodes ResourcesWithSecretsRequest to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes ResourcesWithSecretsRequest to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.WithSecrets != 0) {
      encoder.uint32(0x8);
      encoder.bool(this.WithSecrets);
    }

    return buf;
  } // encode ResourcesWithSecretsRequest
} // ResourcesWithSecretsRequest

// ResourcesInNamespaceRequest is a request relating to a named resource in the given namespace.
export class ResourceInNamespaceRequest {
  // Name is the name of the resource.
  public Name: string = "";
  // Namespace is the namespace of resources.
  public Namespace: string = "";

  // Decodes ResourceInNamespaceRequest from an ArrayBuffer
  static decode(buf: ArrayBuffer): ResourceInNamespaceRequest {
    return ResourceInNamespaceRequest.decodeDataView(new DataView(buf));
  }

  // Decodes ResourceInNamespaceRequest from a DataView
  static decodeDataView(view: DataView): ResourceInNamespaceRequest {
    const decoder = new __proto.Decoder(view);
    const obj = new ResourceInNamespaceRequest();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Name = decoder.string();
          break;
        }
        case 2: {
          obj.Namespace = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode ResourceInNamespaceRequest

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Name.length > 0
        ? 1 + __proto.Sizer.varint64(this.Name.length) + this.Name.length
        : 0;
    size +=
      this.Namespace.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.Namespace.length) +
          this.Namespace.length
        : 0;

    return size;
  }

  // Encodes ResourceInNamespaceRequest to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes ResourceInNamespaceRequest to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Name.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Name.length);
      encoder.string(this.Name);
    }
    if (this.Namespace.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.Namespace.length);
      encoder.string(this.Namespace);
    }

    return buf;
  } // encode ResourceInNamespaceRequest
} // ResourceInNamespaceRequest

// ResourcesInNamespaceRequest is a request relating to resources in the given namespace.
export class ResourcesInNamespaceRequest {
  // Namespace is the namespace of resources.
  public Namespace: string = "";

  // Decodes ResourcesInNamespaceRequest from an ArrayBuffer
  static decode(buf: ArrayBuffer): ResourcesInNamespaceRequest {
    return ResourcesInNamespaceRequest.decodeDataView(new DataView(buf));
  }

  // Decodes ResourcesInNamespaceRequest from a DataView
  static decodeDataView(view: DataView): ResourcesInNamespaceRequest {
    const decoder = new __proto.Decoder(view);
    const obj = new ResourcesInNamespaceRequest();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Namespace = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode ResourcesInNamespaceRequest

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Namespace.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.Namespace.length) +
          this.Namespace.length
        : 0;

    return size;
  }

  // Encodes ResourcesInNamespaceRequest to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes ResourcesInNamespaceRequest to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Namespace.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Namespace.length);
      encoder.string(this.Namespace);
    }

    return buf;
  } // encode ResourcesInNamespaceRequest
} // ResourcesInNamespaceRequest

// OIDCConnectorV3 represents an OIDC connector.
export class OIDCConnectorV3 {
  // Kind is a resource kind.
  public Kind: string = "";
  // SubKind is an optional resource sub kind, used in some resources.
  public SubKind: string = "";
  // Version is a resource version.
  public Version: string = "";
  // Metadata holds resource metadata.
  public Metadata: Metadata = new Metadata();
  // Spec is an OIDC connector specification.
  public Spec: OIDCConnectorSpecV3 = new OIDCConnectorSpecV3();

  // Decodes OIDCConnectorV3 from an ArrayBuffer
  static decode(buf: ArrayBuffer): OIDCConnectorV3 {
    return OIDCConnectorV3.decodeDataView(new DataView(buf));
  }

  // Decodes OIDCConnectorV3 from a DataView
  static decodeDataView(view: DataView): OIDCConnectorV3 {
    const decoder = new __proto.Decoder(view);
    const obj = new OIDCConnectorV3();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Kind = decoder.string();
          break;
        }
        case 2: {
          obj.SubKind = decoder.string();
          break;
        }
        case 3: {
          obj.Version = decoder.string();
          break;
        }
        case 4: {
          const length = decoder.uint32();
          obj.Metadata = Metadata.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 5: {
          const length = decoder.uint32();
          obj.Spec = OIDCConnectorSpecV3.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode OIDCConnectorV3

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Kind.length > 0
        ? 1 + __proto.Sizer.varint64(this.Kind.length) + this.Kind.length
        : 0;
    size +=
      this.SubKind.length > 0
        ? 1 + __proto.Sizer.varint64(this.SubKind.length) + this.SubKind.length
        : 0;
    size +=
      this.Version.length > 0
        ? 1 + __proto.Sizer.varint64(this.Version.length) + this.Version.length
        : 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Spec != null) {
      const f: OIDCConnectorSpecV3 = this.Spec as OIDCConnectorSpecV3;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes OIDCConnectorV3 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes OIDCConnectorV3 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Kind.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Kind.length);
      encoder.string(this.Kind);
    }
    if (this.SubKind.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.SubKind.length);
      encoder.string(this.SubKind);
    }
    if (this.Version.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Version.length);
      encoder.string(this.Version);
    }

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Spec != null) {
      const f = this.Spec as OIDCConnectorSpecV3;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode OIDCConnectorV3
} // OIDCConnectorV3

// OIDCConnectorV3List is a list of OIDC connectors.
export class OIDCConnectorV3List {
  // OIDCConnectors is a list of OIDC connectors.
  public OIDCConnectors: Array<OIDCConnectorV3> = new Array<OIDCConnectorV3>();

  // Decodes OIDCConnectorV3List from an ArrayBuffer
  static decode(buf: ArrayBuffer): OIDCConnectorV3List {
    return OIDCConnectorV3List.decodeDataView(new DataView(buf));
  }

  // Decodes OIDCConnectorV3List from a DataView
  static decodeDataView(view: DataView): OIDCConnectorV3List {
    const decoder = new __proto.Decoder(view);
    const obj = new OIDCConnectorV3List();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          const length = decoder.uint32();
          obj.OIDCConnectors.push(
            OIDCConnectorV3.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length
              )
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode OIDCConnectorV3List

  public size(): u32 {
    let size: u32 = 0;

    for (let n: i32 = 0; n < this.OIDCConnectors.length; n++) {
      const messageSize = this.OIDCConnectors[n].size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes OIDCConnectorV3List to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes OIDCConnectorV3List to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    for (let n: i32 = 0; n < this.OIDCConnectors.length; n++) {
      const messageSize = this.OIDCConnectors[n].size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        this.OIDCConnectors[n].encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode OIDCConnectorV3List
} // OIDCConnectorV3List

/**
 * OIDCConnectorSpecV3 is an OIDC connector specification.
 *
 *  It specifies configuration for Open ID Connect compatible external
 *  identity provider: https://openid.net/specs/openid-connect-core-1_0.html
 */
export class OIDCConnectorSpecV3 {
  // IssuerURL is the endpoint of the provider, e.g. https://accounts.google.com.
  public IssuerURL: string = "";
  // ClientID is the id of the authentication client (Teleport Auth server).
  public ClientID: string = "";
  // ClientSecret is used to authenticate the client.
  public ClientSecret: string = "";
  /**
   * RedirectURL is a URL that will redirect the client's browser
   *  back to the identity provider after successful authentication.
   *  This should match the URL on the Provider's side.
   */
  public RedirectURL: string = "";
  /**
   * ACR is an Authentication Context Class Reference value. The meaning of the ACR
   *  value is context-specific and varies for identity providers.
   */
  public ACR: string = "";
  // Provider is the external identity provider.
  public Provider: string = "";
  // Display is the friendly name for this provider.
  public Display: string = "";
  // Scope specifies additional scopes set by provider.
  public Scope: Array<string> = new Array<string>();
  /**
   * Prompt is an optional OIDC prompt. An empty string omits prompt.
   *  If not specified, it defaults to select_account for backwards compatibility.
   */
  public Prompt: string = "";
  // ClaimsToRoles specifies a dynamic mapping from claims to roles.
  public ClaimsToRoles: Array<ClaimMapping> = new Array<ClaimMapping>();
  // GoogleServiceAccountURI is a path to a google service account uri.
  public GoogleServiceAccountURI: string = "";
  // GoogleServiceAccount is a string containing google service account credentials.
  public GoogleServiceAccount: string = "";
  // GoogleAdminEmail is the email of a google admin to impersonate.
  public GoogleAdminEmail: string = "";

  // Decodes OIDCConnectorSpecV3 from an ArrayBuffer
  static decode(buf: ArrayBuffer): OIDCConnectorSpecV3 {
    return OIDCConnectorSpecV3.decodeDataView(new DataView(buf));
  }

  // Decodes OIDCConnectorSpecV3 from a DataView
  static decodeDataView(view: DataView): OIDCConnectorSpecV3 {
    const decoder = new __proto.Decoder(view);
    const obj = new OIDCConnectorSpecV3();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.IssuerURL = decoder.string();
          break;
        }
        case 2: {
          obj.ClientID = decoder.string();
          break;
        }
        case 3: {
          obj.ClientSecret = decoder.string();
          break;
        }
        case 4: {
          obj.RedirectURL = decoder.string();
          break;
        }
        case 5: {
          obj.ACR = decoder.string();
          break;
        }
        case 6: {
          obj.Provider = decoder.string();
          break;
        }
        case 7: {
          obj.Display = decoder.string();
          break;
        }
        case 8: {
          obj.Scope.push(decoder.string());
          break;
        }
        case 9: {
          obj.Prompt = decoder.string();
          break;
        }
        case 10: {
          const length = decoder.uint32();
          obj.ClaimsToRoles.push(
            ClaimMapping.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length
              )
            )
          );
          decoder.skip(length);

          break;
        }
        case 11: {
          obj.GoogleServiceAccountURI = decoder.string();
          break;
        }
        case 12: {
          obj.GoogleServiceAccount = decoder.string();
          break;
        }
        case 13: {
          obj.GoogleAdminEmail = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode OIDCConnectorSpecV3

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.IssuerURL.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.IssuerURL.length) +
          this.IssuerURL.length
        : 0;
    size +=
      this.ClientID.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.ClientID.length) +
          this.ClientID.length
        : 0;
    size +=
      this.ClientSecret.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.ClientSecret.length) +
          this.ClientSecret.length
        : 0;
    size +=
      this.RedirectURL.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.RedirectURL.length) +
          this.RedirectURL.length
        : 0;
    size +=
      this.ACR.length > 0
        ? 1 + __proto.Sizer.varint64(this.ACR.length) + this.ACR.length
        : 0;
    size +=
      this.Provider.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.Provider.length) +
          this.Provider.length
        : 0;
    size +=
      this.Display.length > 0
        ? 1 + __proto.Sizer.varint64(this.Display.length) + this.Display.length
        : 0;

    size += __size_string_repeated(this.Scope);

    size +=
      this.Prompt.length > 0
        ? 1 + __proto.Sizer.varint64(this.Prompt.length) + this.Prompt.length
        : 0;

    for (let n: i32 = 0; n < this.ClaimsToRoles.length; n++) {
      const messageSize = this.ClaimsToRoles[n].size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.GoogleServiceAccountURI.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.GoogleServiceAccountURI.length) +
          this.GoogleServiceAccountURI.length
        : 0;
    size +=
      this.GoogleServiceAccount.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.GoogleServiceAccount.length) +
          this.GoogleServiceAccount.length
        : 0;
    size +=
      this.GoogleAdminEmail.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.GoogleAdminEmail.length) +
          this.GoogleAdminEmail.length
        : 0;

    return size;
  }

  // Encodes OIDCConnectorSpecV3 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes OIDCConnectorSpecV3 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.IssuerURL.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.IssuerURL.length);
      encoder.string(this.IssuerURL);
    }
    if (this.ClientID.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.ClientID.length);
      encoder.string(this.ClientID);
    }
    if (this.ClientSecret.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.ClientSecret.length);
      encoder.string(this.ClientSecret);
    }
    if (this.RedirectURL.length > 0) {
      encoder.uint32(0x22);
      encoder.uint32(this.RedirectURL.length);
      encoder.string(this.RedirectURL);
    }
    if (this.ACR.length > 0) {
      encoder.uint32(0x2a);
      encoder.uint32(this.ACR.length);
      encoder.string(this.ACR);
    }
    if (this.Provider.length > 0) {
      encoder.uint32(0x32);
      encoder.uint32(this.Provider.length);
      encoder.string(this.Provider);
    }
    if (this.Display.length > 0) {
      encoder.uint32(0x3a);
      encoder.uint32(this.Display.length);
      encoder.string(this.Display);
    }

    if (this.Scope.length > 0) {
      for (let n: i32 = 0; n < this.Scope.length; n++) {
        encoder.uint32(0x42);
        encoder.uint32(this.Scope[n].length);
        encoder.string(this.Scope[n]);
      }
    }

    if (this.Prompt.length > 0) {
      encoder.uint32(0x4a);
      encoder.uint32(this.Prompt.length);
      encoder.string(this.Prompt);
    }

    for (let n: i32 = 0; n < this.ClaimsToRoles.length; n++) {
      const messageSize = this.ClaimsToRoles[n].size();

      if (messageSize > 0) {
        encoder.uint32(0x52);
        encoder.uint32(messageSize);
        this.ClaimsToRoles[n].encodeU8Array(encoder);
      }
    }

    if (this.GoogleServiceAccountURI.length > 0) {
      encoder.uint32(0x5a);
      encoder.uint32(this.GoogleServiceAccountURI.length);
      encoder.string(this.GoogleServiceAccountURI);
    }
    if (this.GoogleServiceAccount.length > 0) {
      encoder.uint32(0x62);
      encoder.uint32(this.GoogleServiceAccount.length);
      encoder.string(this.GoogleServiceAccount);
    }
    if (this.GoogleAdminEmail.length > 0) {
      encoder.uint32(0x6a);
      encoder.uint32(this.GoogleAdminEmail.length);
      encoder.string(this.GoogleAdminEmail);
    }

    return buf;
  } // encode OIDCConnectorSpecV3
} // OIDCConnectorSpecV3

// SAMLConnectorV2 represents a SAML connector.
export class SAMLConnectorV2 {
  // Kind is a resource kind.
  public Kind: string = "";
  // SubKind is an optional resource sub kind, used in some resources.
  public SubKind: string = "";
  // Version is a resource version.
  public Version: string = "";
  // Metadata holds resource metadata.
  public Metadata: Metadata = new Metadata();
  // Spec is an SAML connector specification.
  public Spec: SAMLConnectorSpecV2 = new SAMLConnectorSpecV2();

  // Decodes SAMLConnectorV2 from an ArrayBuffer
  static decode(buf: ArrayBuffer): SAMLConnectorV2 {
    return SAMLConnectorV2.decodeDataView(new DataView(buf));
  }

  // Decodes SAMLConnectorV2 from a DataView
  static decodeDataView(view: DataView): SAMLConnectorV2 {
    const decoder = new __proto.Decoder(view);
    const obj = new SAMLConnectorV2();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Kind = decoder.string();
          break;
        }
        case 2: {
          obj.SubKind = decoder.string();
          break;
        }
        case 3: {
          obj.Version = decoder.string();
          break;
        }
        case 4: {
          const length = decoder.uint32();
          obj.Metadata = Metadata.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 5: {
          const length = decoder.uint32();
          obj.Spec = SAMLConnectorSpecV2.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode SAMLConnectorV2

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Kind.length > 0
        ? 1 + __proto.Sizer.varint64(this.Kind.length) + this.Kind.length
        : 0;
    size +=
      this.SubKind.length > 0
        ? 1 + __proto.Sizer.varint64(this.SubKind.length) + this.SubKind.length
        : 0;
    size +=
      this.Version.length > 0
        ? 1 + __proto.Sizer.varint64(this.Version.length) + this.Version.length
        : 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Spec != null) {
      const f: SAMLConnectorSpecV2 = this.Spec as SAMLConnectorSpecV2;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes SAMLConnectorV2 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes SAMLConnectorV2 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Kind.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Kind.length);
      encoder.string(this.Kind);
    }
    if (this.SubKind.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.SubKind.length);
      encoder.string(this.SubKind);
    }
    if (this.Version.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Version.length);
      encoder.string(this.Version);
    }

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Spec != null) {
      const f = this.Spec as SAMLConnectorSpecV2;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode SAMLConnectorV2
} // SAMLConnectorV2

// SAMLConnectorV2List is a list of SAML connectors.
export class SAMLConnectorV2List {
  // SAMLConnectors is a list of SAML connectors.
  public SAMLConnectors: Array<SAMLConnectorV2> = new Array<SAMLConnectorV2>();

  // Decodes SAMLConnectorV2List from an ArrayBuffer
  static decode(buf: ArrayBuffer): SAMLConnectorV2List {
    return SAMLConnectorV2List.decodeDataView(new DataView(buf));
  }

  // Decodes SAMLConnectorV2List from a DataView
  static decodeDataView(view: DataView): SAMLConnectorV2List {
    const decoder = new __proto.Decoder(view);
    const obj = new SAMLConnectorV2List();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          const length = decoder.uint32();
          obj.SAMLConnectors.push(
            SAMLConnectorV2.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length
              )
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode SAMLConnectorV2List

  public size(): u32 {
    let size: u32 = 0;

    for (let n: i32 = 0; n < this.SAMLConnectors.length; n++) {
      const messageSize = this.SAMLConnectors[n].size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes SAMLConnectorV2List to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes SAMLConnectorV2List to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    for (let n: i32 = 0; n < this.SAMLConnectors.length; n++) {
      const messageSize = this.SAMLConnectors[n].size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        this.SAMLConnectors[n].encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode SAMLConnectorV2List
} // SAMLConnectorV2List

// SAMLConnectorSpecV2 is a SAML connector specification.
export class SAMLConnectorSpecV2 {
  // Issuer is the identity provider issuer.
  public Issuer: string = "";
  // SSO is the URL of the identity provider's SSO service.
  public SSO: string = "";
  /**
   * Cert is the identity provider certificate PEM.
   *  IDP signs <Response> responses using this certificate.
   */
  public Cert: string = "";
  // Display controls how this connector is displayed.
  public Display: string = "";
  /**
   * AssertionConsumerService is a URL for assertion consumer service
   *  on the service provider (Teleport's side).
   */
  public AssertionConsumerService: string = "";
  // Audience uniquely identifies our service provider.
  public Audience: string = "";
  // ServiceProviderIssuer is the issuer of the service provider (Teleport).
  public ServiceProviderIssuer: string = "";
  /**
   * EntityDescriptor is XML with descriptor. It can be used to supply configuration
   *  parameters in one XML file rather than supplying them in the individual elements.
   */
  public EntityDescriptor: string = "";
  // EntityDescriptorURL is a URL that supplies a configuration XML.
  public EntityDescriptorURL: string = "";
  // AttributesToRoles is a list of mappings of attribute statements to roles.
  public AttributesToRoles: Array<AttributeMapping> =
    new Array<AttributeMapping>();
  // SigningKeyPair is an x509 key pair used to sign AuthnRequest.
  public SigningKeyPair: AsymmetricKeyPair = new AsymmetricKeyPair();
  // Provider is the external identity provider.
  public Provider: string = "";
  // EncryptionKeyPair is a key pair used for decrypting SAML assertions.
  public EncryptionKeyPair: AsymmetricKeyPair = new AsymmetricKeyPair();

  // Decodes SAMLConnectorSpecV2 from an ArrayBuffer
  static decode(buf: ArrayBuffer): SAMLConnectorSpecV2 {
    return SAMLConnectorSpecV2.decodeDataView(new DataView(buf));
  }

  // Decodes SAMLConnectorSpecV2 from a DataView
  static decodeDataView(view: DataView): SAMLConnectorSpecV2 {
    const decoder = new __proto.Decoder(view);
    const obj = new SAMLConnectorSpecV2();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Issuer = decoder.string();
          break;
        }
        case 2: {
          obj.SSO = decoder.string();
          break;
        }
        case 3: {
          obj.Cert = decoder.string();
          break;
        }
        case 4: {
          obj.Display = decoder.string();
          break;
        }
        case 5: {
          obj.AssertionConsumerService = decoder.string();
          break;
        }
        case 6: {
          obj.Audience = decoder.string();
          break;
        }
        case 7: {
          obj.ServiceProviderIssuer = decoder.string();
          break;
        }
        case 8: {
          obj.EntityDescriptor = decoder.string();
          break;
        }
        case 9: {
          obj.EntityDescriptorURL = decoder.string();
          break;
        }
        case 10: {
          const length = decoder.uint32();
          obj.AttributesToRoles.push(
            AttributeMapping.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length
              )
            )
          );
          decoder.skip(length);

          break;
        }
        case 11: {
          const length = decoder.uint32();
          obj.SigningKeyPair = AsymmetricKeyPair.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 12: {
          obj.Provider = decoder.string();
          break;
        }
        case 13: {
          const length = decoder.uint32();
          obj.EncryptionKeyPair = AsymmetricKeyPair.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode SAMLConnectorSpecV2

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Issuer.length > 0
        ? 1 + __proto.Sizer.varint64(this.Issuer.length) + this.Issuer.length
        : 0;
    size +=
      this.SSO.length > 0
        ? 1 + __proto.Sizer.varint64(this.SSO.length) + this.SSO.length
        : 0;
    size +=
      this.Cert.length > 0
        ? 1 + __proto.Sizer.varint64(this.Cert.length) + this.Cert.length
        : 0;
    size +=
      this.Display.length > 0
        ? 1 + __proto.Sizer.varint64(this.Display.length) + this.Display.length
        : 0;
    size +=
      this.AssertionConsumerService.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.AssertionConsumerService.length) +
          this.AssertionConsumerService.length
        : 0;
    size +=
      this.Audience.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.Audience.length) +
          this.Audience.length
        : 0;
    size +=
      this.ServiceProviderIssuer.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.ServiceProviderIssuer.length) +
          this.ServiceProviderIssuer.length
        : 0;
    size +=
      this.EntityDescriptor.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.EntityDescriptor.length) +
          this.EntityDescriptor.length
        : 0;
    size +=
      this.EntityDescriptorURL.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.EntityDescriptorURL.length) +
          this.EntityDescriptorURL.length
        : 0;

    for (let n: i32 = 0; n < this.AttributesToRoles.length; n++) {
      const messageSize = this.AttributesToRoles[n].size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.SigningKeyPair != null) {
      const f: AsymmetricKeyPair = this.SigningKeyPair as AsymmetricKeyPair;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.Provider.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.Provider.length) +
          this.Provider.length
        : 0;

    if (this.EncryptionKeyPair != null) {
      const f: AsymmetricKeyPair = this.EncryptionKeyPair as AsymmetricKeyPair;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes SAMLConnectorSpecV2 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes SAMLConnectorSpecV2 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Issuer.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Issuer.length);
      encoder.string(this.Issuer);
    }
    if (this.SSO.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.SSO.length);
      encoder.string(this.SSO);
    }
    if (this.Cert.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Cert.length);
      encoder.string(this.Cert);
    }
    if (this.Display.length > 0) {
      encoder.uint32(0x22);
      encoder.uint32(this.Display.length);
      encoder.string(this.Display);
    }
    if (this.AssertionConsumerService.length > 0) {
      encoder.uint32(0x2a);
      encoder.uint32(this.AssertionConsumerService.length);
      encoder.string(this.AssertionConsumerService);
    }
    if (this.Audience.length > 0) {
      encoder.uint32(0x32);
      encoder.uint32(this.Audience.length);
      encoder.string(this.Audience);
    }
    if (this.ServiceProviderIssuer.length > 0) {
      encoder.uint32(0x3a);
      encoder.uint32(this.ServiceProviderIssuer.length);
      encoder.string(this.ServiceProviderIssuer);
    }
    if (this.EntityDescriptor.length > 0) {
      encoder.uint32(0x42);
      encoder.uint32(this.EntityDescriptor.length);
      encoder.string(this.EntityDescriptor);
    }
    if (this.EntityDescriptorURL.length > 0) {
      encoder.uint32(0x4a);
      encoder.uint32(this.EntityDescriptorURL.length);
      encoder.string(this.EntityDescriptorURL);
    }

    for (let n: i32 = 0; n < this.AttributesToRoles.length; n++) {
      const messageSize = this.AttributesToRoles[n].size();

      if (messageSize > 0) {
        encoder.uint32(0x52);
        encoder.uint32(messageSize);
        this.AttributesToRoles[n].encodeU8Array(encoder);
      }
    }

    if (this.SigningKeyPair != null) {
      const f = this.SigningKeyPair as AsymmetricKeyPair;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x5a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Provider.length > 0) {
      encoder.uint32(0x62);
      encoder.uint32(this.Provider.length);
      encoder.string(this.Provider);
    }

    if (this.EncryptionKeyPair != null) {
      const f = this.EncryptionKeyPair as AsymmetricKeyPair;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x6a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode SAMLConnectorSpecV2
} // SAMLConnectorSpecV2

// AttributeMapping maps a SAML attribute statement to teleport roles.
export class AttributeMapping {
  // Name is an attribute statement name.
  public Name: string = "";
  // Value is an attribute statement value to match.
  public Value: string = "";
  // Roles is a list of static teleport roles to map to.
  public Roles: Array<string> = new Array<string>();

  // Decodes AttributeMapping from an ArrayBuffer
  static decode(buf: ArrayBuffer): AttributeMapping {
    return AttributeMapping.decodeDataView(new DataView(buf));
  }

  // Decodes AttributeMapping from a DataView
  static decodeDataView(view: DataView): AttributeMapping {
    const decoder = new __proto.Decoder(view);
    const obj = new AttributeMapping();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Name = decoder.string();
          break;
        }
        case 2: {
          obj.Value = decoder.string();
          break;
        }
        case 3: {
          obj.Roles.push(decoder.string());
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode AttributeMapping

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Name.length > 0
        ? 1 + __proto.Sizer.varint64(this.Name.length) + this.Name.length
        : 0;
    size +=
      this.Value.length > 0
        ? 1 + __proto.Sizer.varint64(this.Value.length) + this.Value.length
        : 0;

    size += __size_string_repeated(this.Roles);

    return size;
  }

  // Encodes AttributeMapping to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes AttributeMapping to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Name.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Name.length);
      encoder.string(this.Name);
    }
    if (this.Value.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.Value.length);
      encoder.string(this.Value);
    }

    if (this.Roles.length > 0) {
      for (let n: i32 = 0; n < this.Roles.length; n++) {
        encoder.uint32(0x1a);
        encoder.uint32(this.Roles[n].length);
        encoder.string(this.Roles[n]);
      }
    }

    return buf;
  } // encode AttributeMapping
} // AttributeMapping

/**
 * AsymmetricKeyPair is a combination of a public certificate and
 *  private key that can be used for encryption and signing.
 */
export class AsymmetricKeyPair {
  // PrivateKey is a PEM encoded x509 private key.
  public PrivateKey: string = "";
  // Cert is a PEM-encoded x509 certificate.
  public Cert: string = "";

  // Decodes AsymmetricKeyPair from an ArrayBuffer
  static decode(buf: ArrayBuffer): AsymmetricKeyPair {
    return AsymmetricKeyPair.decodeDataView(new DataView(buf));
  }

  // Decodes AsymmetricKeyPair from a DataView
  static decodeDataView(view: DataView): AsymmetricKeyPair {
    const decoder = new __proto.Decoder(view);
    const obj = new AsymmetricKeyPair();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.PrivateKey = decoder.string();
          break;
        }
        case 2: {
          obj.Cert = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode AsymmetricKeyPair

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.PrivateKey.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.PrivateKey.length) +
          this.PrivateKey.length
        : 0;
    size +=
      this.Cert.length > 0
        ? 1 + __proto.Sizer.varint64(this.Cert.length) + this.Cert.length
        : 0;

    return size;
  }

  // Encodes AsymmetricKeyPair to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes AsymmetricKeyPair to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.PrivateKey.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.PrivateKey.length);
      encoder.string(this.PrivateKey);
    }
    if (this.Cert.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.Cert.length);
      encoder.string(this.Cert);
    }

    return buf;
  } // encode AsymmetricKeyPair
} // AsymmetricKeyPair

// GithubConnectorV3 represents a Github connector.
export class GithubConnectorV3 {
  // Kind is a resource kind.
  public Kind: string = "";
  // SubKind is an optional resource sub kind, used in some resources.
  public SubKind: string = "";
  // Version is a resource version.
  public Version: string = "";
  // Metadata holds resource metadata.
  public Metadata: Metadata = new Metadata();
  // Spec is an Github connector specification.
  public Spec: GithubConnectorSpecV3 = new GithubConnectorSpecV3();

  // Decodes GithubConnectorV3 from an ArrayBuffer
  static decode(buf: ArrayBuffer): GithubConnectorV3 {
    return GithubConnectorV3.decodeDataView(new DataView(buf));
  }

  // Decodes GithubConnectorV3 from a DataView
  static decodeDataView(view: DataView): GithubConnectorV3 {
    const decoder = new __proto.Decoder(view);
    const obj = new GithubConnectorV3();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Kind = decoder.string();
          break;
        }
        case 2: {
          obj.SubKind = decoder.string();
          break;
        }
        case 3: {
          obj.Version = decoder.string();
          break;
        }
        case 4: {
          const length = decoder.uint32();
          obj.Metadata = Metadata.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 5: {
          const length = decoder.uint32();
          obj.Spec = GithubConnectorSpecV3.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode GithubConnectorV3

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Kind.length > 0
        ? 1 + __proto.Sizer.varint64(this.Kind.length) + this.Kind.length
        : 0;
    size +=
      this.SubKind.length > 0
        ? 1 + __proto.Sizer.varint64(this.SubKind.length) + this.SubKind.length
        : 0;
    size +=
      this.Version.length > 0
        ? 1 + __proto.Sizer.varint64(this.Version.length) + this.Version.length
        : 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Spec != null) {
      const f: GithubConnectorSpecV3 = this.Spec as GithubConnectorSpecV3;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes GithubConnectorV3 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes GithubConnectorV3 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Kind.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Kind.length);
      encoder.string(this.Kind);
    }
    if (this.SubKind.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.SubKind.length);
      encoder.string(this.SubKind);
    }
    if (this.Version.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Version.length);
      encoder.string(this.Version);
    }

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Spec != null) {
      const f = this.Spec as GithubConnectorSpecV3;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode GithubConnectorV3
} // GithubConnectorV3

// GithubConnectorV3List is a list of Github connectors.
export class GithubConnectorV3List {
  // GithubConnectors is a list of Github connectors.
  public GithubConnectors: Array<GithubConnectorV3> =
    new Array<GithubConnectorV3>();

  // Decodes GithubConnectorV3List from an ArrayBuffer
  static decode(buf: ArrayBuffer): GithubConnectorV3List {
    return GithubConnectorV3List.decodeDataView(new DataView(buf));
  }

  // Decodes GithubConnectorV3List from a DataView
  static decodeDataView(view: DataView): GithubConnectorV3List {
    const decoder = new __proto.Decoder(view);
    const obj = new GithubConnectorV3List();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          const length = decoder.uint32();
          obj.GithubConnectors.push(
            GithubConnectorV3.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length
              )
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode GithubConnectorV3List

  public size(): u32 {
    let size: u32 = 0;

    for (let n: i32 = 0; n < this.GithubConnectors.length; n++) {
      const messageSize = this.GithubConnectors[n].size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes GithubConnectorV3List to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes GithubConnectorV3List to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    for (let n: i32 = 0; n < this.GithubConnectors.length; n++) {
      const messageSize = this.GithubConnectors[n].size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        this.GithubConnectors[n].encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode GithubConnectorV3List
} // GithubConnectorV3List

// GithubConnectorSpecV3 is a Github connector specification.
export class GithubConnectorSpecV3 {
  // ClientID is the Github OAuth app client ID.
  public ClientID: string = "";
  // ClientSecret is the Github OAuth app client secret.
  public ClientSecret: string = "";
  // RedirectURL is the authorization callback URL.
  public RedirectURL: string = "";
  // TeamsToLogins maps Github team memberships onto allowed logins/roles.
  public TeamsToLogins: Array<TeamMapping> = new Array<TeamMapping>();
  // Display is the connector display name.
  public Display: string = "";

  // Decodes GithubConnectorSpecV3 from an ArrayBuffer
  static decode(buf: ArrayBuffer): GithubConnectorSpecV3 {
    return GithubConnectorSpecV3.decodeDataView(new DataView(buf));
  }

  // Decodes GithubConnectorSpecV3 from a DataView
  static decodeDataView(view: DataView): GithubConnectorSpecV3 {
    const decoder = new __proto.Decoder(view);
    const obj = new GithubConnectorSpecV3();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.ClientID = decoder.string();
          break;
        }
        case 2: {
          obj.ClientSecret = decoder.string();
          break;
        }
        case 3: {
          obj.RedirectURL = decoder.string();
          break;
        }
        case 4: {
          const length = decoder.uint32();
          obj.TeamsToLogins.push(
            TeamMapping.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length
              )
            )
          );
          decoder.skip(length);

          break;
        }
        case 5: {
          obj.Display = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode GithubConnectorSpecV3

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.ClientID.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.ClientID.length) +
          this.ClientID.length
        : 0;
    size +=
      this.ClientSecret.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.ClientSecret.length) +
          this.ClientSecret.length
        : 0;
    size +=
      this.RedirectURL.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.RedirectURL.length) +
          this.RedirectURL.length
        : 0;

    for (let n: i32 = 0; n < this.TeamsToLogins.length; n++) {
      const messageSize = this.TeamsToLogins[n].size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.Display.length > 0
        ? 1 + __proto.Sizer.varint64(this.Display.length) + this.Display.length
        : 0;

    return size;
  }

  // Encodes GithubConnectorSpecV3 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes GithubConnectorSpecV3 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.ClientID.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.ClientID.length);
      encoder.string(this.ClientID);
    }
    if (this.ClientSecret.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.ClientSecret.length);
      encoder.string(this.ClientSecret);
    }
    if (this.RedirectURL.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.RedirectURL.length);
      encoder.string(this.RedirectURL);
    }

    for (let n: i32 = 0; n < this.TeamsToLogins.length; n++) {
      const messageSize = this.TeamsToLogins[n].size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        this.TeamsToLogins[n].encodeU8Array(encoder);
      }
    }

    if (this.Display.length > 0) {
      encoder.uint32(0x2a);
      encoder.uint32(this.Display.length);
      encoder.string(this.Display);
    }

    return buf;
  } // encode GithubConnectorSpecV3
} // GithubConnectorSpecV3

// TeamMapping represents a single team membership mapping.
export class TeamMapping {
  // Organization is a Github organization a user belongs to.
  public Organization: string = "";
  // Team is a team within the organization a user belongs to.
  public Team: string = "";
  // Logins is a list of allowed logins for this org/team.
  public Logins: Array<string> = new Array<string>();
  // KubeGroups is a list of allowed kubernetes groups for this org/team.
  public KubeGroups: Array<string> = new Array<string>();
  // KubeUsers is a list of allowed kubernetes users to impersonate for this org/team.
  public KubeUsers: Array<string> = new Array<string>();

  // Decodes TeamMapping from an ArrayBuffer
  static decode(buf: ArrayBuffer): TeamMapping {
    return TeamMapping.decodeDataView(new DataView(buf));
  }

  // Decodes TeamMapping from a DataView
  static decodeDataView(view: DataView): TeamMapping {
    const decoder = new __proto.Decoder(view);
    const obj = new TeamMapping();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Organization = decoder.string();
          break;
        }
        case 2: {
          obj.Team = decoder.string();
          break;
        }
        case 3: {
          obj.Logins.push(decoder.string());
          break;
        }
        case 4: {
          obj.KubeGroups.push(decoder.string());
          break;
        }
        case 5: {
          obj.KubeUsers.push(decoder.string());
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode TeamMapping

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Organization.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.Organization.length) +
          this.Organization.length
        : 0;
    size +=
      this.Team.length > 0
        ? 1 + __proto.Sizer.varint64(this.Team.length) + this.Team.length
        : 0;

    size += __size_string_repeated(this.Logins);

    size += __size_string_repeated(this.KubeGroups);

    size += __size_string_repeated(this.KubeUsers);

    return size;
  }

  // Encodes TeamMapping to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes TeamMapping to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Organization.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Organization.length);
      encoder.string(this.Organization);
    }
    if (this.Team.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.Team.length);
      encoder.string(this.Team);
    }

    if (this.Logins.length > 0) {
      for (let n: i32 = 0; n < this.Logins.length; n++) {
        encoder.uint32(0x1a);
        encoder.uint32(this.Logins[n].length);
        encoder.string(this.Logins[n]);
      }
    }

    if (this.KubeGroups.length > 0) {
      for (let n: i32 = 0; n < this.KubeGroups.length; n++) {
        encoder.uint32(0x22);
        encoder.uint32(this.KubeGroups[n].length);
        encoder.string(this.KubeGroups[n]);
      }
    }

    if (this.KubeUsers.length > 0) {
      for (let n: i32 = 0; n < this.KubeUsers.length; n++) {
        encoder.uint32(0x2a);
        encoder.uint32(this.KubeUsers[n].length);
        encoder.string(this.KubeUsers[n]);
      }
    }

    return buf;
  } // encode TeamMapping
} // TeamMapping

// TrustedClusterV2 represents a Trusted Cluster.
export class TrustedClusterV2 {
  // Kind is a resource kind.
  public Kind: string = "";
  // SubKind is an optional resource sub kind, used in some resources.
  public SubKind: string = "";
  // Version is a resource version.
  public Version: string = "";
  // Metadata holds resource metadata.
  public Metadata: Metadata = new Metadata();
  // Spec is a Trusted Cluster specification.
  public Spec: TrustedClusterSpecV2 = new TrustedClusterSpecV2();

  // Decodes TrustedClusterV2 from an ArrayBuffer
  static decode(buf: ArrayBuffer): TrustedClusterV2 {
    return TrustedClusterV2.decodeDataView(new DataView(buf));
  }

  // Decodes TrustedClusterV2 from a DataView
  static decodeDataView(view: DataView): TrustedClusterV2 {
    const decoder = new __proto.Decoder(view);
    const obj = new TrustedClusterV2();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Kind = decoder.string();
          break;
        }
        case 2: {
          obj.SubKind = decoder.string();
          break;
        }
        case 3: {
          obj.Version = decoder.string();
          break;
        }
        case 4: {
          const length = decoder.uint32();
          obj.Metadata = Metadata.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 5: {
          const length = decoder.uint32();
          obj.Spec = TrustedClusterSpecV2.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode TrustedClusterV2

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Kind.length > 0
        ? 1 + __proto.Sizer.varint64(this.Kind.length) + this.Kind.length
        : 0;
    size +=
      this.SubKind.length > 0
        ? 1 + __proto.Sizer.varint64(this.SubKind.length) + this.SubKind.length
        : 0;
    size +=
      this.Version.length > 0
        ? 1 + __proto.Sizer.varint64(this.Version.length) + this.Version.length
        : 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Spec != null) {
      const f: TrustedClusterSpecV2 = this.Spec as TrustedClusterSpecV2;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes TrustedClusterV2 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes TrustedClusterV2 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Kind.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Kind.length);
      encoder.string(this.Kind);
    }
    if (this.SubKind.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.SubKind.length);
      encoder.string(this.SubKind);
    }
    if (this.Version.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Version.length);
      encoder.string(this.Version);
    }

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Spec != null) {
      const f = this.Spec as TrustedClusterSpecV2;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode TrustedClusterV2
} // TrustedClusterV2

// TrustedClusterV2List is a list of trusted cluster.
export class TrustedClusterV2List {
  // TrustedClusters is a list of trusted cluster.
  public TrustedClusters: Array<TrustedClusterV2> =
    new Array<TrustedClusterV2>();

  // Decodes TrustedClusterV2List from an ArrayBuffer
  static decode(buf: ArrayBuffer): TrustedClusterV2List {
    return TrustedClusterV2List.decodeDataView(new DataView(buf));
  }

  // Decodes TrustedClusterV2List from a DataView
  static decodeDataView(view: DataView): TrustedClusterV2List {
    const decoder = new __proto.Decoder(view);
    const obj = new TrustedClusterV2List();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          const length = decoder.uint32();
          obj.TrustedClusters.push(
            TrustedClusterV2.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length
              )
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode TrustedClusterV2List

  public size(): u32 {
    let size: u32 = 0;

    for (let n: i32 = 0; n < this.TrustedClusters.length; n++) {
      const messageSize = this.TrustedClusters[n].size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes TrustedClusterV2List to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes TrustedClusterV2List to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    for (let n: i32 = 0; n < this.TrustedClusters.length; n++) {
      const messageSize = this.TrustedClusters[n].size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        this.TrustedClusters[n].encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode TrustedClusterV2List
} // TrustedClusterV2List

// TrustedClusterSpecV2 is a Trusted Cluster specification.
export class TrustedClusterSpecV2 {
  /**
   * Enabled is a bool that indicates if the TrustedCluster is enabled or disabled.
   *  Setting Enabled to false has a side effect of deleting the user and host certificate
   *  authority (CA).
   */
  public Enabled: bool;
  // Roles is a list of roles that users will be assuming when connecting to this cluster.
  public Roles: Array<string> = new Array<string>();
  // Token is the authorization token provided by another cluster needed by this cluster to join.
  public Token: string = "";
  /**
   * ProxyAddress is the address of the web proxy server of the cluster to join. If not set,
   *  it is derived from <metadata.name>:<default web proxy server port>.
   */
  public ProxyAddress: string = "";
  /**
   * ReverseTunnelAddress is the address of the SSH proxy server of the cluster to join. If
   *  not set, it is derived from <metadata.name>:<default reverse tunnel port>.
   */
  public ReverseTunnelAddress: string = "";
  // RoleMap specifies role mappings to remote roles.
  public RoleMap: Array<RoleMapping> = new Array<RoleMapping>();

  // Decodes TrustedClusterSpecV2 from an ArrayBuffer
  static decode(buf: ArrayBuffer): TrustedClusterSpecV2 {
    return TrustedClusterSpecV2.decodeDataView(new DataView(buf));
  }

  // Decodes TrustedClusterSpecV2 from a DataView
  static decodeDataView(view: DataView): TrustedClusterSpecV2 {
    const decoder = new __proto.Decoder(view);
    const obj = new TrustedClusterSpecV2();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Enabled = decoder.bool();
          break;
        }
        case 2: {
          obj.Roles.push(decoder.string());
          break;
        }
        case 3: {
          obj.Token = decoder.string();
          break;
        }
        case 4: {
          obj.ProxyAddress = decoder.string();
          break;
        }
        case 5: {
          obj.ReverseTunnelAddress = decoder.string();
          break;
        }
        case 6: {
          const length = decoder.uint32();
          obj.RoleMap.push(
            RoleMapping.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length
              )
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode TrustedClusterSpecV2

  public size(): u32 {
    let size: u32 = 0;

    size += this.Enabled == 0 ? 0 : 1 + 1;

    size += __size_string_repeated(this.Roles);

    size +=
      this.Token.length > 0
        ? 1 + __proto.Sizer.varint64(this.Token.length) + this.Token.length
        : 0;
    size +=
      this.ProxyAddress.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.ProxyAddress.length) +
          this.ProxyAddress.length
        : 0;
    size +=
      this.ReverseTunnelAddress.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.ReverseTunnelAddress.length) +
          this.ReverseTunnelAddress.length
        : 0;

    for (let n: i32 = 0; n < this.RoleMap.length; n++) {
      const messageSize = this.RoleMap[n].size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes TrustedClusterSpecV2 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes TrustedClusterSpecV2 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Enabled != 0) {
      encoder.uint32(0x8);
      encoder.bool(this.Enabled);
    }

    if (this.Roles.length > 0) {
      for (let n: i32 = 0; n < this.Roles.length; n++) {
        encoder.uint32(0x12);
        encoder.uint32(this.Roles[n].length);
        encoder.string(this.Roles[n]);
      }
    }

    if (this.Token.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Token.length);
      encoder.string(this.Token);
    }
    if (this.ProxyAddress.length > 0) {
      encoder.uint32(0x22);
      encoder.uint32(this.ProxyAddress.length);
      encoder.string(this.ProxyAddress);
    }
    if (this.ReverseTunnelAddress.length > 0) {
      encoder.uint32(0x2a);
      encoder.uint32(this.ReverseTunnelAddress.length);
      encoder.string(this.ReverseTunnelAddress);
    }

    for (let n: i32 = 0; n < this.RoleMap.length; n++) {
      const messageSize = this.RoleMap[n].size();

      if (messageSize > 0) {
        encoder.uint32(0x32);
        encoder.uint32(messageSize);
        this.RoleMap[n].encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode TrustedClusterSpecV2
} // TrustedClusterSpecV2

/**
 * LockV2 represents a lock.
 *  Locks are used to restrict access to a Teleport environment by disabling
 *  interactions involving a user, an RBAC role, a node, etc.
 *  See rfd/0009-locking.md for more details.
 */
export class LockV2 {
  // Kind is a resource kind.
  public Kind: string = "";
  // SubKind is an optional resource sub kind, used in some resources.
  public SubKind: string = "";
  // Version is a resource version.
  public Version: string = "";
  // Metadata holds resource metadata.
  public Metadata: Metadata = new Metadata();
  // Spec is a Lock specification.
  public Spec: LockSpecV2 = new LockSpecV2();

  // Decodes LockV2 from an ArrayBuffer
  static decode(buf: ArrayBuffer): LockV2 {
    return LockV2.decodeDataView(new DataView(buf));
  }

  // Decodes LockV2 from a DataView
  static decodeDataView(view: DataView): LockV2 {
    const decoder = new __proto.Decoder(view);
    const obj = new LockV2();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Kind = decoder.string();
          break;
        }
        case 2: {
          obj.SubKind = decoder.string();
          break;
        }
        case 3: {
          obj.Version = decoder.string();
          break;
        }
        case 4: {
          const length = decoder.uint32();
          obj.Metadata = Metadata.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 5: {
          const length = decoder.uint32();
          obj.Spec = LockSpecV2.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode LockV2

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Kind.length > 0
        ? 1 + __proto.Sizer.varint64(this.Kind.length) + this.Kind.length
        : 0;
    size +=
      this.SubKind.length > 0
        ? 1 + __proto.Sizer.varint64(this.SubKind.length) + this.SubKind.length
        : 0;
    size +=
      this.Version.length > 0
        ? 1 + __proto.Sizer.varint64(this.Version.length) + this.Version.length
        : 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Spec != null) {
      const f: LockSpecV2 = this.Spec as LockSpecV2;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes LockV2 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes LockV2 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Kind.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Kind.length);
      encoder.string(this.Kind);
    }
    if (this.SubKind.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.SubKind.length);
      encoder.string(this.SubKind);
    }
    if (this.Version.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Version.length);
      encoder.string(this.Version);
    }

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Spec != null) {
      const f = this.Spec as LockSpecV2;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode LockV2
} // LockV2

// LockSpecV2 is a Lock specification.
export class LockSpecV2 {
  // Target describes the set of interactions that the lock applies to.
  public Target: LockTarget = new LockTarget();
  // Message is the message displayed to locked-out users.
  public Message: string = "";
  // Expires if set specifies when the lock ceases to be in force.
  public Expires: google.protobuf.Timestamp = new google.protobuf.Timestamp();

  // Decodes LockSpecV2 from an ArrayBuffer
  static decode(buf: ArrayBuffer): LockSpecV2 {
    return LockSpecV2.decodeDataView(new DataView(buf));
  }

  // Decodes LockSpecV2 from a DataView
  static decodeDataView(view: DataView): LockSpecV2 {
    const decoder = new __proto.Decoder(view);
    const obj = new LockSpecV2();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          const length = decoder.uint32();
          obj.Target = LockTarget.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 2: {
          obj.Message = decoder.string();
          break;
        }
        case 3: {
          const length = decoder.uint32();
          obj.Expires = google.protobuf.Timestamp.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode LockSpecV2

  public size(): u32 {
    let size: u32 = 0;

    if (this.Target != null) {
      const f: LockTarget = this.Target as LockTarget;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.Message.length > 0
        ? 1 + __proto.Sizer.varint64(this.Message.length) + this.Message.length
        : 0;

    if (this.Expires != null) {
      const f: google.protobuf.Timestamp = this
        .Expires as google.protobuf.Timestamp;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes LockSpecV2 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes LockSpecV2 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Target != null) {
      const f = this.Target as LockTarget;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Message.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.Message.length);
      encoder.string(this.Message);
    }

    if (this.Expires != null) {
      const f = this.Expires as google.protobuf.Timestamp;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode LockSpecV2
} // LockSpecV2

// LockTarget lists the attributes of interactions to be disabled.
export class LockTarget {
  // User specifies the name of a Teleport user.
  public User: string = "";
  /**
   * Role specifies the name of an RBAC role known to the root cluster.
   *  In remote clusters, this constraint is evaluated before translating to local roles.
   */
  public Role: string = "";
  // Login specifies the name of a local UNIX user.
  public Login: string = "";
  /**
   * Node specifies the UUID of a Teleport node.
   *  A matching node is also prevented from heartbeating to the auth server.
   */
  public Node: string = "";
  // MFADevice specifies the UUID of a user MFA device.
  public MFADevice: string = "";
  // WindowsDesktop specifies the name of a Windows desktop.
  public WindowsDesktop: string = "";
  // AccessRequest specifies the UUID of an access request.
  public AccessRequest: string = "";

  // Decodes LockTarget from an ArrayBuffer
  static decode(buf: ArrayBuffer): LockTarget {
    return LockTarget.decodeDataView(new DataView(buf));
  }

  // Decodes LockTarget from a DataView
  static decodeDataView(view: DataView): LockTarget {
    const decoder = new __proto.Decoder(view);
    const obj = new LockTarget();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.User = decoder.string();
          break;
        }
        case 2: {
          obj.Role = decoder.string();
          break;
        }
        case 3: {
          obj.Login = decoder.string();
          break;
        }
        case 4: {
          obj.Node = decoder.string();
          break;
        }
        case 5: {
          obj.MFADevice = decoder.string();
          break;
        }
        case 6: {
          obj.WindowsDesktop = decoder.string();
          break;
        }
        case 7: {
          obj.AccessRequest = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode LockTarget

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.User.length > 0
        ? 1 + __proto.Sizer.varint64(this.User.length) + this.User.length
        : 0;
    size +=
      this.Role.length > 0
        ? 1 + __proto.Sizer.varint64(this.Role.length) + this.Role.length
        : 0;
    size +=
      this.Login.length > 0
        ? 1 + __proto.Sizer.varint64(this.Login.length) + this.Login.length
        : 0;
    size +=
      this.Node.length > 0
        ? 1 + __proto.Sizer.varint64(this.Node.length) + this.Node.length
        : 0;
    size +=
      this.MFADevice.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.MFADevice.length) +
          this.MFADevice.length
        : 0;
    size +=
      this.WindowsDesktop.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.WindowsDesktop.length) +
          this.WindowsDesktop.length
        : 0;
    size +=
      this.AccessRequest.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.AccessRequest.length) +
          this.AccessRequest.length
        : 0;

    return size;
  }

  // Encodes LockTarget to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes LockTarget to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.User.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.User.length);
      encoder.string(this.User);
    }
    if (this.Role.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.Role.length);
      encoder.string(this.Role);
    }
    if (this.Login.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Login.length);
      encoder.string(this.Login);
    }
    if (this.Node.length > 0) {
      encoder.uint32(0x22);
      encoder.uint32(this.Node.length);
      encoder.string(this.Node);
    }
    if (this.MFADevice.length > 0) {
      encoder.uint32(0x2a);
      encoder.uint32(this.MFADevice.length);
      encoder.string(this.MFADevice);
    }
    if (this.WindowsDesktop.length > 0) {
      encoder.uint32(0x32);
      encoder.uint32(this.WindowsDesktop.length);
      encoder.string(this.WindowsDesktop);
    }
    if (this.AccessRequest.length > 0) {
      encoder.uint32(0x3a);
      encoder.uint32(this.AccessRequest.length);
      encoder.string(this.AccessRequest);
    }

    return buf;
  } // encode LockTarget
} // LockTarget

/**
 * AddressCondition represents a set of addresses. Presently the addresses are specfied
 *  exclusively in terms of IPv4/IPv6 ranges.
 */
export class AddressCondition {
  /**
   * CIDR is IPv4 or IPv6 address. Valid value are either CIDR ranges (e.g. "10.0.1.0/24",
   *  "fe::/8") or a single IP address (e.g "10.1.2.3")
   */
  public CIDR: string = "";

  // Decodes AddressCondition from an ArrayBuffer
  static decode(buf: ArrayBuffer): AddressCondition {
    return AddressCondition.decodeDataView(new DataView(buf));
  }

  // Decodes AddressCondition from a DataView
  static decodeDataView(view: DataView): AddressCondition {
    const decoder = new __proto.Decoder(view);
    const obj = new AddressCondition();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.CIDR = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode AddressCondition

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.CIDR.length > 0
        ? 1 + __proto.Sizer.varint64(this.CIDR.length) + this.CIDR.length
        : 0;

    return size;
  }

  // Encodes AddressCondition to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes AddressCondition to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.CIDR.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.CIDR.length);
      encoder.string(this.CIDR);
    }

    return buf;
  } // encode AddressCondition
} // AddressCondition

export class NetworkRestrictionsSpecV4 {
  // Allow lists the addresses that should be allowed.
  public Allow: Array<AddressCondition> = new Array<AddressCondition>();
  // Deny lists the addresses that should be denied even if they're allowed by Allow condition.
  public Deny: Array<AddressCondition> = new Array<AddressCondition>();

  // Decodes NetworkRestrictionsSpecV4 from an ArrayBuffer
  static decode(buf: ArrayBuffer): NetworkRestrictionsSpecV4 {
    return NetworkRestrictionsSpecV4.decodeDataView(new DataView(buf));
  }

  // Decodes NetworkRestrictionsSpecV4 from a DataView
  static decodeDataView(view: DataView): NetworkRestrictionsSpecV4 {
    const decoder = new __proto.Decoder(view);
    const obj = new NetworkRestrictionsSpecV4();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          const length = decoder.uint32();
          obj.Allow.push(
            AddressCondition.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length
              )
            )
          );
          decoder.skip(length);

          break;
        }
        case 2: {
          const length = decoder.uint32();
          obj.Deny.push(
            AddressCondition.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length
              )
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode NetworkRestrictionsSpecV4

  public size(): u32 {
    let size: u32 = 0;

    for (let n: i32 = 0; n < this.Allow.length; n++) {
      const messageSize = this.Allow[n].size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    for (let n: i32 = 0; n < this.Deny.length; n++) {
      const messageSize = this.Deny[n].size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes NetworkRestrictionsSpecV4 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes NetworkRestrictionsSpecV4 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    for (let n: i32 = 0; n < this.Allow.length; n++) {
      const messageSize = this.Allow[n].size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        this.Allow[n].encodeU8Array(encoder);
      }
    }

    for (let n: i32 = 0; n < this.Deny.length; n++) {
      const messageSize = this.Deny[n].size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        this.Deny[n].encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode NetworkRestrictionsSpecV4
} // NetworkRestrictionsSpecV4

/**
 * NetworkRestrictions specifies a list of addresses to restrict (block). The deny
 *  list is checked first and the allow lists overrides it. Thus an empty allow
 *  list does not mean that no addresses will be allowed, that will only be the
 *  case if the deny list covers the whole address range.
 */
export class NetworkRestrictionsV4 {
  // Kind is the network restrictions resource kind.
  public Kind: string = "";
  // SubKind is an optional resource subkind.
  public SubKind: string = "";
  // Version is the resource version.
  public Version: string = "";
  // Metadata is the network restrictions metadata.
  public Metadata: Metadata = new Metadata();
  // Spec contains the network restrictions data
  public Spec: NetworkRestrictionsSpecV4 = new NetworkRestrictionsSpecV4();

  // Decodes NetworkRestrictionsV4 from an ArrayBuffer
  static decode(buf: ArrayBuffer): NetworkRestrictionsV4 {
    return NetworkRestrictionsV4.decodeDataView(new DataView(buf));
  }

  // Decodes NetworkRestrictionsV4 from a DataView
  static decodeDataView(view: DataView): NetworkRestrictionsV4 {
    const decoder = new __proto.Decoder(view);
    const obj = new NetworkRestrictionsV4();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Kind = decoder.string();
          break;
        }
        case 2: {
          obj.SubKind = decoder.string();
          break;
        }
        case 3: {
          obj.Version = decoder.string();
          break;
        }
        case 4: {
          const length = decoder.uint32();
          obj.Metadata = Metadata.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 5: {
          const length = decoder.uint32();
          obj.Spec = NetworkRestrictionsSpecV4.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode NetworkRestrictionsV4

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Kind.length > 0
        ? 1 + __proto.Sizer.varint64(this.Kind.length) + this.Kind.length
        : 0;
    size +=
      this.SubKind.length > 0
        ? 1 + __proto.Sizer.varint64(this.SubKind.length) + this.SubKind.length
        : 0;
    size +=
      this.Version.length > 0
        ? 1 + __proto.Sizer.varint64(this.Version.length) + this.Version.length
        : 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Spec != null) {
      const f: NetworkRestrictionsSpecV4 = this
        .Spec as NetworkRestrictionsSpecV4;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes NetworkRestrictionsV4 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes NetworkRestrictionsV4 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Kind.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Kind.length);
      encoder.string(this.Kind);
    }
    if (this.SubKind.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.SubKind.length);
      encoder.string(this.SubKind);
    }
    if (this.Version.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Version.length);
      encoder.string(this.Version);
    }

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Spec != null) {
      const f = this.Spec as NetworkRestrictionsSpecV4;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode NetworkRestrictionsV4
} // NetworkRestrictionsV4

// WindowsDesktopServiceV3 represents a windows desktop access service.
export class WindowsDesktopServiceV3 {
  // Header is the common resource header.
  public Header: ResourceHeader = new ResourceHeader();
  // Spec is the windows desktop service spec.
  public Spec: WindowsDesktopServiceSpecV3 = new WindowsDesktopServiceSpecV3();

  // Decodes WindowsDesktopServiceV3 from an ArrayBuffer
  static decode(buf: ArrayBuffer): WindowsDesktopServiceV3 {
    return WindowsDesktopServiceV3.decodeDataView(new DataView(buf));
  }

  // Decodes WindowsDesktopServiceV3 from a DataView
  static decodeDataView(view: DataView): WindowsDesktopServiceV3 {
    const decoder = new __proto.Decoder(view);
    const obj = new WindowsDesktopServiceV3();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          const length = decoder.uint32();
          obj.Header = ResourceHeader.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 2: {
          const length = decoder.uint32();
          obj.Spec = WindowsDesktopServiceSpecV3.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode WindowsDesktopServiceV3

  public size(): u32 {
    let size: u32 = 0;

    if (this.Header != null) {
      const f: ResourceHeader = this.Header as ResourceHeader;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Spec != null) {
      const f: WindowsDesktopServiceSpecV3 = this
        .Spec as WindowsDesktopServiceSpecV3;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes WindowsDesktopServiceV3 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes WindowsDesktopServiceV3 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Header != null) {
      const f = this.Header as ResourceHeader;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Spec != null) {
      const f = this.Spec as WindowsDesktopServiceSpecV3;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode WindowsDesktopServiceV3
} // WindowsDesktopServiceV3

// WindowsDesktopServiceSpecV3 is the windows desktop service spec.
export class WindowsDesktopServiceSpecV3 {
  // Addr is the address that this service can be reached at.
  public Addr: string = "";
  // TeleportVersion is teleport binary version running this service.
  public TeleportVersion: string = "";
  // Hostname is the desktop service hostname.
  public Hostname: string = "";

  // Decodes WindowsDesktopServiceSpecV3 from an ArrayBuffer
  static decode(buf: ArrayBuffer): WindowsDesktopServiceSpecV3 {
    return WindowsDesktopServiceSpecV3.decodeDataView(new DataView(buf));
  }

  // Decodes WindowsDesktopServiceSpecV3 from a DataView
  static decodeDataView(view: DataView): WindowsDesktopServiceSpecV3 {
    const decoder = new __proto.Decoder(view);
    const obj = new WindowsDesktopServiceSpecV3();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Addr = decoder.string();
          break;
        }
        case 2: {
          obj.TeleportVersion = decoder.string();
          break;
        }
        case 3: {
          obj.Hostname = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode WindowsDesktopServiceSpecV3

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Addr.length > 0
        ? 1 + __proto.Sizer.varint64(this.Addr.length) + this.Addr.length
        : 0;
    size +=
      this.TeleportVersion.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.TeleportVersion.length) +
          this.TeleportVersion.length
        : 0;
    size +=
      this.Hostname.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.Hostname.length) +
          this.Hostname.length
        : 0;

    return size;
  }

  // Encodes WindowsDesktopServiceSpecV3 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes WindowsDesktopServiceSpecV3 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Addr.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Addr.length);
      encoder.string(this.Addr);
    }
    if (this.TeleportVersion.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.TeleportVersion.length);
      encoder.string(this.TeleportVersion);
    }
    if (this.Hostname.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Hostname.length);
      encoder.string(this.Hostname);
    }

    return buf;
  } // encode WindowsDesktopServiceSpecV3
} // WindowsDesktopServiceSpecV3

// WindowsDesktopFilter are filters to apply when searching for windows desktops.
export class WindowsDesktopFilter {
  // HostID is the ID of the host the Windows Desktop Service proxying the desktop.
  public HostID: string = "";
  // Name is the name of the desktop.
  public Name: string = "";

  // Decodes WindowsDesktopFilter from an ArrayBuffer
  static decode(buf: ArrayBuffer): WindowsDesktopFilter {
    return WindowsDesktopFilter.decodeDataView(new DataView(buf));
  }

  // Decodes WindowsDesktopFilter from a DataView
  static decodeDataView(view: DataView): WindowsDesktopFilter {
    const decoder = new __proto.Decoder(view);
    const obj = new WindowsDesktopFilter();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.HostID = decoder.string();
          break;
        }
        case 2: {
          obj.Name = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode WindowsDesktopFilter

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.HostID.length > 0
        ? 1 + __proto.Sizer.varint64(this.HostID.length) + this.HostID.length
        : 0;
    size +=
      this.Name.length > 0
        ? 1 + __proto.Sizer.varint64(this.Name.length) + this.Name.length
        : 0;

    return size;
  }

  // Encodes WindowsDesktopFilter to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes WindowsDesktopFilter to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.HostID.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.HostID.length);
      encoder.string(this.HostID);
    }
    if (this.Name.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.Name.length);
      encoder.string(this.Name);
    }

    return buf;
  } // encode WindowsDesktopFilter
} // WindowsDesktopFilter

// WindowsDesktopV3 represents a Windows host for desktop access.
export class WindowsDesktopV3 {
  // Header is the common resource header.
  public Header: ResourceHeader = new ResourceHeader();
  // Spec is the Windows host spec.
  public Spec: WindowsDesktopSpecV3 = new WindowsDesktopSpecV3();

  // Decodes WindowsDesktopV3 from an ArrayBuffer
  static decode(buf: ArrayBuffer): WindowsDesktopV3 {
    return WindowsDesktopV3.decodeDataView(new DataView(buf));
  }

  // Decodes WindowsDesktopV3 from a DataView
  static decodeDataView(view: DataView): WindowsDesktopV3 {
    const decoder = new __proto.Decoder(view);
    const obj = new WindowsDesktopV3();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          const length = decoder.uint32();
          obj.Header = ResourceHeader.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 2: {
          const length = decoder.uint32();
          obj.Spec = WindowsDesktopSpecV3.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode WindowsDesktopV3

  public size(): u32 {
    let size: u32 = 0;

    if (this.Header != null) {
      const f: ResourceHeader = this.Header as ResourceHeader;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Spec != null) {
      const f: WindowsDesktopSpecV3 = this.Spec as WindowsDesktopSpecV3;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes WindowsDesktopV3 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes WindowsDesktopV3 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Header != null) {
      const f = this.Header as ResourceHeader;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Spec != null) {
      const f = this.Spec as WindowsDesktopSpecV3;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode WindowsDesktopV3
} // WindowsDesktopV3

// WindowsDesktopSpecV3 is the Windows host spec.
export class WindowsDesktopSpecV3 {
  // Addr is the address that this host can be reached at.
  public Addr: string = "";
  // Domain is the ActiveDirectory domain that this host belongs to.
  public Domain: string = "";
  // HostID is the ID of the host the Windows Desktop Service proxying the desktop.
  public HostID: string = "";

  // Decodes WindowsDesktopSpecV3 from an ArrayBuffer
  static decode(buf: ArrayBuffer): WindowsDesktopSpecV3 {
    return WindowsDesktopSpecV3.decodeDataView(new DataView(buf));
  }

  // Decodes WindowsDesktopSpecV3 from a DataView
  static decodeDataView(view: DataView): WindowsDesktopSpecV3 {
    const decoder = new __proto.Decoder(view);
    const obj = new WindowsDesktopSpecV3();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Addr = decoder.string();
          break;
        }
        case 2: {
          obj.Domain = decoder.string();
          break;
        }
        case 3: {
          obj.HostID = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode WindowsDesktopSpecV3

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Addr.length > 0
        ? 1 + __proto.Sizer.varint64(this.Addr.length) + this.Addr.length
        : 0;
    size +=
      this.Domain.length > 0
        ? 1 + __proto.Sizer.varint64(this.Domain.length) + this.Domain.length
        : 0;
    size +=
      this.HostID.length > 0
        ? 1 + __proto.Sizer.varint64(this.HostID.length) + this.HostID.length
        : 0;

    return size;
  }

  // Encodes WindowsDesktopSpecV3 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes WindowsDesktopSpecV3 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Addr.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Addr.length);
      encoder.string(this.Addr);
    }
    if (this.Domain.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.Domain.length);
      encoder.string(this.Domain);
    }
    if (this.HostID.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.HostID.length);
      encoder.string(this.HostID);
    }

    return buf;
  } // encode WindowsDesktopSpecV3
} // WindowsDesktopSpecV3

/**
 * RegisterUsingTokenRequest is a request to register with the auth server using
 *  an authentication token
 */
export class RegisterUsingTokenRequest {
  // HostID is a unique host ID, usually a UUID
  public HostID: string = "";
  // NodeName is a node name
  public NodeName: string = "";
  // Role is a system role, e.g. Proxy
  public Role: string = "";
  // Token is the name of an authentication token
  public Token: string = "";
  // AdditionalPrincipals is a list of additional principals
  public AdditionalPrincipals: Array<string> = new Array<string>();
  // DNSNames is a list of DNS names to include in the x509 client certificate
  public DNSNames: Array<string> = new Array<string>();
  /**
   * PublicTLSKey is a PEM encoded public key
   *  used for TLS setup
   */
  public PublicTLSKey: Array<u8> = new Array<u8>();
  /**
   * PublicSSHKey is a SSH encoded public key,
   *  if present will be signed as a return value
   *  otherwise, new public/private key pair will be generated
   */
  public PublicSSHKey: Array<u8> = new Array<u8>();
  /**
   * RemoteAddr is the remote address of the host requesting a host certificate.
   *  It is used to replace 0.0.0.0 in the list of additional principals.
   */
  public RemoteAddr: string = "";
  /**
   * EC2IdentityDocument is used for the EC2 join method to prove the identity
   *  of a joining EC2 instance.
   */
  public EC2IdentityDocument: Array<u8> = new Array<u8>();

  // Decodes RegisterUsingTokenRequest from an ArrayBuffer
  static decode(buf: ArrayBuffer): RegisterUsingTokenRequest {
    return RegisterUsingTokenRequest.decodeDataView(new DataView(buf));
  }

  // Decodes RegisterUsingTokenRequest from a DataView
  static decodeDataView(view: DataView): RegisterUsingTokenRequest {
    const decoder = new __proto.Decoder(view);
    const obj = new RegisterUsingTokenRequest();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.HostID = decoder.string();
          break;
        }
        case 2: {
          obj.NodeName = decoder.string();
          break;
        }
        case 3: {
          obj.Role = decoder.string();
          break;
        }
        case 4: {
          obj.Token = decoder.string();
          break;
        }
        case 5: {
          obj.AdditionalPrincipals.push(decoder.string());
          break;
        }
        case 6: {
          obj.DNSNames.push(decoder.string());
          break;
        }
        case 7: {
          obj.PublicTLSKey = decoder.bytes();
          break;
        }
        case 8: {
          obj.PublicSSHKey = decoder.bytes();
          break;
        }
        case 9: {
          obj.RemoteAddr = decoder.string();
          break;
        }
        case 10: {
          obj.EC2IdentityDocument = decoder.bytes();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode RegisterUsingTokenRequest

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.HostID.length > 0
        ? 1 + __proto.Sizer.varint64(this.HostID.length) + this.HostID.length
        : 0;
    size +=
      this.NodeName.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.NodeName.length) +
          this.NodeName.length
        : 0;
    size +=
      this.Role.length > 0
        ? 1 + __proto.Sizer.varint64(this.Role.length) + this.Role.length
        : 0;
    size +=
      this.Token.length > 0
        ? 1 + __proto.Sizer.varint64(this.Token.length) + this.Token.length
        : 0;

    size += __size_string_repeated(this.AdditionalPrincipals);

    size += __size_string_repeated(this.DNSNames);

    size +=
      this.PublicTLSKey.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.PublicTLSKey.length) +
          this.PublicTLSKey.length
        : 0;
    size +=
      this.PublicSSHKey.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.PublicSSHKey.length) +
          this.PublicSSHKey.length
        : 0;
    size +=
      this.RemoteAddr.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.RemoteAddr.length) +
          this.RemoteAddr.length
        : 0;
    size +=
      this.EC2IdentityDocument.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.EC2IdentityDocument.length) +
          this.EC2IdentityDocument.length
        : 0;

    return size;
  }

  // Encodes RegisterUsingTokenRequest to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes RegisterUsingTokenRequest to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.HostID.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.HostID.length);
      encoder.string(this.HostID);
    }
    if (this.NodeName.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.NodeName.length);
      encoder.string(this.NodeName);
    }
    if (this.Role.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Role.length);
      encoder.string(this.Role);
    }
    if (this.Token.length > 0) {
      encoder.uint32(0x22);
      encoder.uint32(this.Token.length);
      encoder.string(this.Token);
    }

    if (this.AdditionalPrincipals.length > 0) {
      for (let n: i32 = 0; n < this.AdditionalPrincipals.length; n++) {
        encoder.uint32(0x2a);
        encoder.uint32(this.AdditionalPrincipals[n].length);
        encoder.string(this.AdditionalPrincipals[n]);
      }
    }

    if (this.DNSNames.length > 0) {
      for (let n: i32 = 0; n < this.DNSNames.length; n++) {
        encoder.uint32(0x32);
        encoder.uint32(this.DNSNames[n].length);
        encoder.string(this.DNSNames[n]);
      }
    }

    if (this.PublicTLSKey.length > 0) {
      encoder.uint32(0x3a);
      encoder.uint32(this.PublicTLSKey.length);
      encoder.bytes(this.PublicTLSKey);
    }
    if (this.PublicSSHKey.length > 0) {
      encoder.uint32(0x42);
      encoder.uint32(this.PublicSSHKey.length);
      encoder.bytes(this.PublicSSHKey);
    }
    if (this.RemoteAddr.length > 0) {
      encoder.uint32(0x4a);
      encoder.uint32(this.RemoteAddr.length);
      encoder.string(this.RemoteAddr);
    }
    if (this.EC2IdentityDocument.length > 0) {
      encoder.uint32(0x52);
      encoder.uint32(this.EC2IdentityDocument.length);
      encoder.bytes(this.EC2IdentityDocument);
    }

    return buf;
  } // encode RegisterUsingTokenRequest
} // RegisterUsingTokenRequest

/**
 * RecoveryCodes holds a user's recovery code information. Recovery codes allows users to regain
 *  access to their account by restoring their lost password or second factor. Once a recovery code
 *  is successfully verified, the code is mark used (which invalidates it), and lets the user begin
 *  the recovery flow. When a user successfully finishes the recovery flow, users will get a new set
 *  of codes that will replace all the previous ones.
 */
export class RecoveryCodesV1 {
  // Kind is the resource kind.
  public Kind: string = "";
  // SubKind is an optional resource subkind. Currently unused for this resource.
  public SubKind: string = "";
  // Version is the resource version.
  public Version: string = "";
  // Metadata is the resource metadata.
  public Metadata: Metadata = new Metadata();
  // Spec is the resource spec.
  public Spec: RecoveryCodesSpecV1 = new RecoveryCodesSpecV1();

  // Decodes RecoveryCodesV1 from an ArrayBuffer
  static decode(buf: ArrayBuffer): RecoveryCodesV1 {
    return RecoveryCodesV1.decodeDataView(new DataView(buf));
  }

  // Decodes RecoveryCodesV1 from a DataView
  static decodeDataView(view: DataView): RecoveryCodesV1 {
    const decoder = new __proto.Decoder(view);
    const obj = new RecoveryCodesV1();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Kind = decoder.string();
          break;
        }
        case 2: {
          obj.SubKind = decoder.string();
          break;
        }
        case 3: {
          obj.Version = decoder.string();
          break;
        }
        case 4: {
          const length = decoder.uint32();
          obj.Metadata = Metadata.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 5: {
          const length = decoder.uint32();
          obj.Spec = RecoveryCodesSpecV1.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode RecoveryCodesV1

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Kind.length > 0
        ? 1 + __proto.Sizer.varint64(this.Kind.length) + this.Kind.length
        : 0;
    size +=
      this.SubKind.length > 0
        ? 1 + __proto.Sizer.varint64(this.SubKind.length) + this.SubKind.length
        : 0;
    size +=
      this.Version.length > 0
        ? 1 + __proto.Sizer.varint64(this.Version.length) + this.Version.length
        : 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Spec != null) {
      const f: RecoveryCodesSpecV1 = this.Spec as RecoveryCodesSpecV1;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes RecoveryCodesV1 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes RecoveryCodesV1 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Kind.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Kind.length);
      encoder.string(this.Kind);
    }
    if (this.SubKind.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.SubKind.length);
      encoder.string(this.SubKind);
    }
    if (this.Version.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Version.length);
      encoder.string(this.Version);
    }

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Spec != null) {
      const f = this.Spec as RecoveryCodesSpecV1;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode RecoveryCodesV1
} // RecoveryCodesV1

// RecoveryCodesSpecV1 is the recovery codes spec.
export class RecoveryCodesSpecV1 {
  // Codes hold a list of numOfRecoveryCodes.
  public Codes: Array<RecoveryCode> = new Array<RecoveryCode>();
  /**
   * Created is when the set of recovery codes were generated. Updated when a new set of recovery
   *  codes are inserted.
   */
  public Created: google.protobuf.Timestamp = new google.protobuf.Timestamp();

  // Decodes RecoveryCodesSpecV1 from an ArrayBuffer
  static decode(buf: ArrayBuffer): RecoveryCodesSpecV1 {
    return RecoveryCodesSpecV1.decodeDataView(new DataView(buf));
  }

  // Decodes RecoveryCodesSpecV1 from a DataView
  static decodeDataView(view: DataView): RecoveryCodesSpecV1 {
    const decoder = new __proto.Decoder(view);
    const obj = new RecoveryCodesSpecV1();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          const length = decoder.uint32();
          obj.Codes.push(
            RecoveryCode.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length
              )
            )
          );
          decoder.skip(length);

          break;
        }
        case 2: {
          const length = decoder.uint32();
          obj.Created = google.protobuf.Timestamp.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode RecoveryCodesSpecV1

  public size(): u32 {
    let size: u32 = 0;

    for (let n: i32 = 0; n < this.Codes.length; n++) {
      const messageSize = this.Codes[n].size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Created != null) {
      const f: google.protobuf.Timestamp = this
        .Created as google.protobuf.Timestamp;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes RecoveryCodesSpecV1 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes RecoveryCodesSpecV1 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    for (let n: i32 = 0; n < this.Codes.length; n++) {
      const messageSize = this.Codes[n].size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        this.Codes[n].encodeU8Array(encoder);
      }
    }

    if (this.Created != null) {
      const f = this.Created as google.protobuf.Timestamp;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode RecoveryCodesSpecV1
} // RecoveryCodesSpecV1

// RecoveryCode describes a recovery code.
export class RecoveryCode {
  // HashedCode is a bcrypt hash of this recovery code.
  public HashedCode: Array<u8> = new Array<u8>();
  // IsUsed determines if this recovery code was used.
  public IsUsed: bool;

  // Decodes RecoveryCode from an ArrayBuffer
  static decode(buf: ArrayBuffer): RecoveryCode {
    return RecoveryCode.decodeDataView(new DataView(buf));
  }

  // Decodes RecoveryCode from a DataView
  static decodeDataView(view: DataView): RecoveryCode {
    const decoder = new __proto.Decoder(view);
    const obj = new RecoveryCode();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.HashedCode = decoder.bytes();
          break;
        }
        case 2: {
          obj.IsUsed = decoder.bool();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode RecoveryCode

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.HashedCode.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.HashedCode.length) +
          this.HashedCode.length
        : 0;
    size += this.IsUsed == 0 ? 0 : 1 + 1;

    return size;
  }

  // Encodes RecoveryCode to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes RecoveryCode to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.HashedCode.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.HashedCode.length);
      encoder.bytes(this.HashedCode);
    }
    if (this.IsUsed != 0) {
      encoder.uint32(0x10);
      encoder.bool(this.IsUsed);
    }

    return buf;
  } // encode RecoveryCode
} // RecoveryCode

// SessionTrackerV1 represents a live session resource.
export class SessionTrackerV1 {
  // Header is the common resource header.
  public Header: ResourceHeader = new ResourceHeader();
  // Spec is a session specification.
  public Spec: SessionTrackerSpecV1 = new SessionTrackerSpecV1();

  // Decodes SessionTrackerV1 from an ArrayBuffer
  static decode(buf: ArrayBuffer): SessionTrackerV1 {
    return SessionTrackerV1.decodeDataView(new DataView(buf));
  }

  // Decodes SessionTrackerV1 from a DataView
  static decodeDataView(view: DataView): SessionTrackerV1 {
    const decoder = new __proto.Decoder(view);
    const obj = new SessionTrackerV1();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          const length = decoder.uint32();
          obj.Header = ResourceHeader.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 2: {
          const length = decoder.uint32();
          obj.Spec = SessionTrackerSpecV1.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode SessionTrackerV1

  public size(): u32 {
    let size: u32 = 0;

    if (this.Header != null) {
      const f: ResourceHeader = this.Header as ResourceHeader;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Spec != null) {
      const f: SessionTrackerSpecV1 = this.Spec as SessionTrackerSpecV1;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes SessionTrackerV1 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes SessionTrackerV1 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Header != null) {
      const f = this.Header as ResourceHeader;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Spec != null) {
      const f = this.Spec as SessionTrackerSpecV1;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode SessionTrackerV1
} // SessionTrackerV1

// SessionTrackerSpecV1 is the specification for a live session.
export class SessionTrackerSpecV1 {
  // SessionID is unique identifier of this session.
  public SessionID: string = "";
  // Kind describes what kind of session this is.
  public Kind: string = "";
  // State is the current state of this session.
  public State: u32;
  /**
   * Created encodes the time at which the session was registered with the auth
   *  server.
   *
   *  This should match the timestamp in the corresponding `session.create` event.
   *  It's thus up to the tracker creator to set the correct timestamp.
   */
  public Created: google.protobuf.Timestamp = new google.protobuf.Timestamp();
  // Expires encodes the time at which this session expires and becomes invalid.
  public Expires: google.protobuf.Timestamp = new google.protobuf.Timestamp();
  // AttachedData is arbitrary attached JSON serialized metadata.
  public AttachedData: string = "";
  /**
   * Reason is an arbitrary string that may be used to describe the session and/or it's
   *  purpose.
   */
  public Reason: string = "";
  /**
   * Invited is a list of invited users, this field is interpreted by different
   *  clients on a best-effort basis and used for delivering notifications to invited users.
   */
  public Invited: Array<string> = new Array<string>();
  // Hostname identifies the target this session is connected to.
  public Hostname: string = "";
  // Address is the address of the target this session is connected to.
  public Address: string = "";
  // ClusterName is the name of the Teleport cluster that this session belongs to.
  public ClusterName: string = "";
  // Login is the local login/user on the target used by the session.
  public Login: string = "";
  // Participants is a list of session participants.
  public Participants: Array<Participant> = new Array<Participant>();
  // The Kubernetes cluster this session belongs to.
  public KubernetesCluster: string = "";
  /**
   * HostUser is the user regarded as the owner of this session, RBAC checks are performed
   *  against the require policies of this user.
   *
   *  This refers to the Teleport user but may not be the same as the sessions initiator.
   */
  public HostUser: string = "";
  /**
   * HostPolicies is a list of RBAC policy sets held by the host user at the time of session
   *  creation.
   */
  public HostPolicies: Array<SessionTrackerPolicySet> =
    new Array<SessionTrackerPolicySet>();

  // Decodes SessionTrackerSpecV1 from an ArrayBuffer
  static decode(buf: ArrayBuffer): SessionTrackerSpecV1 {
    return SessionTrackerSpecV1.decodeDataView(new DataView(buf));
  }

  // Decodes SessionTrackerSpecV1 from a DataView
  static decodeDataView(view: DataView): SessionTrackerSpecV1 {
    const decoder = new __proto.Decoder(view);
    const obj = new SessionTrackerSpecV1();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.SessionID = decoder.string();
          break;
        }
        case 2: {
          obj.Kind = decoder.string();
          break;
        }
        case 3: {
          obj.State = decoder.uint32();
          break;
        }
        case 4: {
          const length = decoder.uint32();
          obj.Created = google.protobuf.Timestamp.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 5: {
          const length = decoder.uint32();
          obj.Expires = google.protobuf.Timestamp.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 6: {
          obj.AttachedData = decoder.string();
          break;
        }
        case 7: {
          obj.Reason = decoder.string();
          break;
        }
        case 8: {
          obj.Invited.push(decoder.string());
          break;
        }
        case 9: {
          obj.Hostname = decoder.string();
          break;
        }
        case 10: {
          obj.Address = decoder.string();
          break;
        }
        case 11: {
          obj.ClusterName = decoder.string();
          break;
        }
        case 12: {
          obj.Login = decoder.string();
          break;
        }
        case 13: {
          const length = decoder.uint32();
          obj.Participants.push(
            Participant.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length
              )
            )
          );
          decoder.skip(length);

          break;
        }
        case 14: {
          obj.KubernetesCluster = decoder.string();
          break;
        }
        case 15: {
          obj.HostUser = decoder.string();
          break;
        }
        case 16: {
          const length = decoder.uint32();
          obj.HostPolicies.push(
            SessionTrackerPolicySet.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length
              )
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode SessionTrackerSpecV1

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.SessionID.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.SessionID.length) +
          this.SessionID.length
        : 0;
    size +=
      this.Kind.length > 0
        ? 1 + __proto.Sizer.varint64(this.Kind.length) + this.Kind.length
        : 0;
    size += this.State == 0 ? 0 : 1 + __proto.Sizer.uint32(this.State);

    if (this.Created != null) {
      const f: google.protobuf.Timestamp = this
        .Created as google.protobuf.Timestamp;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Expires != null) {
      const f: google.protobuf.Timestamp = this
        .Expires as google.protobuf.Timestamp;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.AttachedData.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.AttachedData.length) +
          this.AttachedData.length
        : 0;
    size +=
      this.Reason.length > 0
        ? 1 + __proto.Sizer.varint64(this.Reason.length) + this.Reason.length
        : 0;

    size += __size_string_repeated(this.Invited);

    size +=
      this.Hostname.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.Hostname.length) +
          this.Hostname.length
        : 0;
    size +=
      this.Address.length > 0
        ? 1 + __proto.Sizer.varint64(this.Address.length) + this.Address.length
        : 0;
    size +=
      this.ClusterName.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.ClusterName.length) +
          this.ClusterName.length
        : 0;
    size +=
      this.Login.length > 0
        ? 1 + __proto.Sizer.varint64(this.Login.length) + this.Login.length
        : 0;

    for (let n: i32 = 0; n < this.Participants.length; n++) {
      const messageSize = this.Participants[n].size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.KubernetesCluster.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.KubernetesCluster.length) +
          this.KubernetesCluster.length
        : 0;
    size +=
      this.HostUser.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.HostUser.length) +
          this.HostUser.length
        : 0;

    for (let n: i32 = 0; n < this.HostPolicies.length; n++) {
      const messageSize = this.HostPolicies[n].size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes SessionTrackerSpecV1 to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes SessionTrackerSpecV1 to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.SessionID.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.SessionID.length);
      encoder.string(this.SessionID);
    }
    if (this.Kind.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.Kind.length);
      encoder.string(this.Kind);
    }
    if (this.State != 0) {
      encoder.uint32(0x18);
      encoder.uint32(this.State);
    }

    if (this.Created != null) {
      const f = this.Created as google.protobuf.Timestamp;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Expires != null) {
      const f = this.Expires as google.protobuf.Timestamp;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.AttachedData.length > 0) {
      encoder.uint32(0x32);
      encoder.uint32(this.AttachedData.length);
      encoder.string(this.AttachedData);
    }
    if (this.Reason.length > 0) {
      encoder.uint32(0x3a);
      encoder.uint32(this.Reason.length);
      encoder.string(this.Reason);
    }

    if (this.Invited.length > 0) {
      for (let n: i32 = 0; n < this.Invited.length; n++) {
        encoder.uint32(0x42);
        encoder.uint32(this.Invited[n].length);
        encoder.string(this.Invited[n]);
      }
    }

    if (this.Hostname.length > 0) {
      encoder.uint32(0x4a);
      encoder.uint32(this.Hostname.length);
      encoder.string(this.Hostname);
    }
    if (this.Address.length > 0) {
      encoder.uint32(0x52);
      encoder.uint32(this.Address.length);
      encoder.string(this.Address);
    }
    if (this.ClusterName.length > 0) {
      encoder.uint32(0x5a);
      encoder.uint32(this.ClusterName.length);
      encoder.string(this.ClusterName);
    }
    if (this.Login.length > 0) {
      encoder.uint32(0x62);
      encoder.uint32(this.Login.length);
      encoder.string(this.Login);
    }

    for (let n: i32 = 0; n < this.Participants.length; n++) {
      const messageSize = this.Participants[n].size();

      if (messageSize > 0) {
        encoder.uint32(0x6a);
        encoder.uint32(messageSize);
        this.Participants[n].encodeU8Array(encoder);
      }
    }

    if (this.KubernetesCluster.length > 0) {
      encoder.uint32(0x72);
      encoder.uint32(this.KubernetesCluster.length);
      encoder.string(this.KubernetesCluster);
    }
    if (this.HostUser.length > 0) {
      encoder.uint32(0x7a);
      encoder.uint32(this.HostUser.length);
      encoder.string(this.HostUser);
    }

    for (let n: i32 = 0; n < this.HostPolicies.length; n++) {
      const messageSize = this.HostPolicies[n].size();

      if (messageSize > 0) {
        encoder.uint32(0x82);
        encoder.uint32(messageSize);
        this.HostPolicies[n].encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode SessionTrackerSpecV1
} // SessionTrackerSpecV1

/**
 * SessionTrackerPolicySet is a set of RBAC policies held by the session tracker
 *  that contain additional metadata from the originating role.
 */
export class SessionTrackerPolicySet {
  // Name is name of the role this policy set originates from.
  public Name: string = "";
  // Version is version of the role this policy set originates from.
  public Version: string = "";
  // RequireSessionJoin specifies policies for required users to start a session.
  public RequireSessionJoin: Array<SessionRequirePolicy> =
    new Array<SessionRequirePolicy>();

  // Decodes SessionTrackerPolicySet from an ArrayBuffer
  static decode(buf: ArrayBuffer): SessionTrackerPolicySet {
    return SessionTrackerPolicySet.decodeDataView(new DataView(buf));
  }

  // Decodes SessionTrackerPolicySet from a DataView
  static decodeDataView(view: DataView): SessionTrackerPolicySet {
    const decoder = new __proto.Decoder(view);
    const obj = new SessionTrackerPolicySet();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Name = decoder.string();
          break;
        }
        case 2: {
          obj.Version = decoder.string();
          break;
        }
        case 3: {
          const length = decoder.uint32();
          obj.RequireSessionJoin.push(
            SessionRequirePolicy.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length
              )
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode SessionTrackerPolicySet

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Name.length > 0
        ? 1 + __proto.Sizer.varint64(this.Name.length) + this.Name.length
        : 0;
    size +=
      this.Version.length > 0
        ? 1 + __proto.Sizer.varint64(this.Version.length) + this.Version.length
        : 0;

    for (let n: i32 = 0; n < this.RequireSessionJoin.length; n++) {
      const messageSize = this.RequireSessionJoin[n].size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes SessionTrackerPolicySet to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes SessionTrackerPolicySet to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Name.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Name.length);
      encoder.string(this.Name);
    }
    if (this.Version.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.Version.length);
      encoder.string(this.Version);
    }

    for (let n: i32 = 0; n < this.RequireSessionJoin.length; n++) {
      const messageSize = this.RequireSessionJoin[n].size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        this.RequireSessionJoin[n].encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode SessionTrackerPolicySet
} // SessionTrackerPolicySet

// Participant stores information about a participant in the session.
export class Participant {
  // ID is a unique UUID of this participant for a given session.
  public ID: string = "";
  // User is the canonical name of the Teleport user controlling this participant.
  public User: string = "";
  // Mode is the participant mode.
  public Mode: string = "";
  // LastActive is the last time this party was active in the session.
  public LastActive: google.protobuf.Timestamp =
    new google.protobuf.Timestamp();

  // Decodes Participant from an ArrayBuffer
  static decode(buf: ArrayBuffer): Participant {
    return Participant.decodeDataView(new DataView(buf));
  }

  // Decodes Participant from a DataView
  static decodeDataView(view: DataView): Participant {
    const decoder = new __proto.Decoder(view);
    const obj = new Participant();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.ID = decoder.string();
          break;
        }
        case 2: {
          obj.User = decoder.string();
          break;
        }
        case 3: {
          obj.Mode = decoder.string();
          break;
        }
        case 4: {
          const length = decoder.uint32();
          obj.LastActive = google.protobuf.Timestamp.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode Participant

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.ID.length > 0
        ? 1 + __proto.Sizer.varint64(this.ID.length) + this.ID.length
        : 0;
    size +=
      this.User.length > 0
        ? 1 + __proto.Sizer.varint64(this.User.length) + this.User.length
        : 0;
    size +=
      this.Mode.length > 0
        ? 1 + __proto.Sizer.varint64(this.Mode.length) + this.Mode.length
        : 0;

    if (this.LastActive != null) {
      const f: google.protobuf.Timestamp = this
        .LastActive as google.protobuf.Timestamp;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes Participant to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes Participant to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.ID.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.ID.length);
      encoder.string(this.ID);
    }
    if (this.User.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.User.length);
      encoder.string(this.User);
    }
    if (this.Mode.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Mode.length);
      encoder.string(this.Mode);
    }

    if (this.LastActive != null) {
      const f = this.LastActive as google.protobuf.Timestamp;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode Participant
} // Participant

// SortBy defines a sort criteria.
export class SortBy {
  // IsDesc is a sort direction flag where if true the direction is descending, else ascending.
  public IsDesc: bool;
  // Field is the name of an objects field to sort by.
  public Field: string = "";

  // Decodes SortBy from an ArrayBuffer
  static decode(buf: ArrayBuffer): SortBy {
    return SortBy.decodeDataView(new DataView(buf));
  }

  // Decodes SortBy from a DataView
  static decodeDataView(view: DataView): SortBy {
    const decoder = new __proto.Decoder(view);
    const obj = new SortBy();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.IsDesc = decoder.bool();
          break;
        }
        case 2: {
          obj.Field = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode SortBy

  public size(): u32 {
    let size: u32 = 0;

    size += this.IsDesc == 0 ? 0 : 1 + 1;
    size +=
      this.Field.length > 0
        ? 1 + __proto.Sizer.varint64(this.Field.length) + this.Field.length
        : 0;

    return size;
  }

  // Encodes SortBy to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes SortBy to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.IsDesc != 0) {
      encoder.uint32(0x8);
      encoder.bool(this.IsDesc);
    }
    if (this.Field.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.Field.length);
      encoder.string(this.Field);
    }

    return buf;
  } // encode SortBy
} // SortBy

// __decodeMap_string_string

function __decodeMap_string_string(
  parentDecoder: __proto.Decoder,
  length: i32,
  map: Map<string, string>
): void {
  const decoder = new __proto.Decoder(
    new DataView(
      parentDecoder.view.buffer,
      parentDecoder.pos + parentDecoder.view.byteOffset,
      length
    )
  );

  let key: string = "";
  let value: string = "";

  while (!decoder.eof()) {
    const tag = decoder.tag();
    const number = tag >>> 3;

    switch (number) {
      case 1: {
        key = decoder.string();
        break;
      }

      case 2: {
        value = decoder.string();
        break;
      }

      default:
        decoder.skipType(tag & 7);
        break;
    }
  }
  map.set(key as string, value as string);
}

// __sizeMapEntry_string_string

function __sizeMapEntry_string_string(key: string, value: string): u32 {
  return (
    (key.length > 0 ? 1 + __proto.Sizer.varint64(key.length) + key.length : 0) +
    (value.length > 0
      ? 1 + __proto.Sizer.varint64(value.length) + value.length
      : 0)
  );
}

// __decodeMap_string_CommandLabelV2

function __decodeMap_string_CommandLabelV2(
  parentDecoder: __proto.Decoder,
  length: i32,
  map: Map<string, CommandLabelV2>
): void {
  const decoder = new __proto.Decoder(
    new DataView(
      parentDecoder.view.buffer,
      parentDecoder.pos + parentDecoder.view.byteOffset,
      length
    )
  );

  let key: string = "";
  let value: CommandLabelV2 = new CommandLabelV2();

  while (!decoder.eof()) {
    const tag = decoder.tag();
    const number = tag >>> 3;

    switch (number) {
      case 1: {
        key = decoder.string();
        break;
      }

      case 2: {
        const length = decoder.uint32();
        value = CommandLabelV2.decodeDataView(
          new DataView(
            decoder.view.buffer,
            decoder.pos + decoder.view.byteOffset,
            length
          )
        );
        decoder.skip(length);

        break;
      }

      default:
        decoder.skipType(tag & 7);
        break;
    }
  }
  map.set(key as string, value as CommandLabelV2);
}

// __sizeMapEntry_string_CommandLabelV2

function __sizeMapEntry_string_CommandLabelV2(
  key: string,
  value: CommandLabelV2
): u32 {
  const keySize =
    key.length > 0 ? 1 + __proto.Sizer.varint64(key.length) + key.length : 0;
  const valueSize = value.size();

  if (valueSize == 0) {
    return keySize;
  }

  return keySize + 1 + __proto.Sizer.varint64(valueSize) + valueSize;
}

// __size_string_repeated

function __size_string_repeated(value: Array<string>): u32 {
  let size: u32 = 0;

  for (let n: i32 = 0; n < value.length; n++) {
    size += 1 + __proto.Sizer.varint64(value[n].length) + value[n].length;
  }

  return size;
}

// __size_bytes_repeated

function __size_bytes_repeated(value: Array<Array<u8>>): u32 {
  let size: u32 = 0;

  for (let n: i32 = 0; n < value.length; n++) {
    size += 1 + __proto.Sizer.varint64(value[n].length) + value[n].length;
  }

  return size;
}

// __size_uint32_repeated

function __size_uint32_repeated(value: Array<u32>): u32 {
  let size: u32 = 0;

  for (let n: i32 = 0; n < value.length; n++) {
    size += 1 + __proto.Sizer.uint32(value[n]);
  }

  return size;
}

// __decodeMap_string_ThresholdIndexSets

function __decodeMap_string_ThresholdIndexSets(
  parentDecoder: __proto.Decoder,
  length: i32,
  map: Map<string, ThresholdIndexSets>
): void {
  const decoder = new __proto.Decoder(
    new DataView(
      parentDecoder.view.buffer,
      parentDecoder.pos + parentDecoder.view.byteOffset,
      length
    )
  );

  let key: string = "";
  let value: ThresholdIndexSets = new ThresholdIndexSets();

  while (!decoder.eof()) {
    const tag = decoder.tag();
    const number = tag >>> 3;

    switch (number) {
      case 1: {
        key = decoder.string();
        break;
      }

      case 2: {
        const length = decoder.uint32();
        value = ThresholdIndexSets.decodeDataView(
          new DataView(
            decoder.view.buffer,
            decoder.pos + decoder.view.byteOffset,
            length
          )
        );
        decoder.skip(length);

        break;
      }

      default:
        decoder.skipType(tag & 7);
        break;
    }
  }
  map.set(key as string, value as ThresholdIndexSets);
}

// __sizeMapEntry_string_ThresholdIndexSets

function __sizeMapEntry_string_ThresholdIndexSets(
  key: string,
  value: ThresholdIndexSets
): u32 {
  const keySize =
    key.length > 0 ? 1 + __proto.Sizer.varint64(key.length) + key.length : 0;
  const valueSize = value.size();

  if (valueSize == 0) {
    return keySize;
  }

  return keySize + 1 + __proto.Sizer.varint64(valueSize) + valueSize;
}

// __decodeMap_string_PluginDataEntry

function __decodeMap_string_PluginDataEntry(
  parentDecoder: __proto.Decoder,
  length: i32,
  map: Map<string, PluginDataEntry>
): void {
  const decoder = new __proto.Decoder(
    new DataView(
      parentDecoder.view.buffer,
      parentDecoder.pos + parentDecoder.view.byteOffset,
      length
    )
  );

  let key: string = "";
  let value: PluginDataEntry = new PluginDataEntry();

  while (!decoder.eof()) {
    const tag = decoder.tag();
    const number = tag >>> 3;

    switch (number) {
      case 1: {
        key = decoder.string();
        break;
      }

      case 2: {
        const length = decoder.uint32();
        value = PluginDataEntry.decodeDataView(
          new DataView(
            decoder.view.buffer,
            decoder.pos + decoder.view.byteOffset,
            length
          )
        );
        decoder.skip(length);

        break;
      }

      default:
        decoder.skipType(tag & 7);
        break;
    }
  }
  map.set(key as string, value as PluginDataEntry);
}

// __sizeMapEntry_string_PluginDataEntry

function __sizeMapEntry_string_PluginDataEntry(
  key: string,
  value: PluginDataEntry
): u32 {
  const keySize =
    key.length > 0 ? 1 + __proto.Sizer.varint64(key.length) + key.length : 0;
  const valueSize = value.size();

  if (valueSize == 0) {
    return keySize;
  }

  return keySize + 1 + __proto.Sizer.varint64(valueSize) + valueSize;
}
