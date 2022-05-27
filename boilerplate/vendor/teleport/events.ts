import * as __proto from "./__proto";

import * as google from "./google";
import * as wrappers from "./wrappers";
// Action communicates what was done in response to the event
export enum EventAction {
  OBSERVED = 0,
  DENIED = 1,
} // EventAction
// Metadata is a common event metadata
export class Metadata {
  // Index is a monotonicaly incremented index in the event sequence
  public Index: i64;
  // Type is the event type
  public Type: string = "";
  // ID is a unique event identifier
  public ID: string = "";
  // Code is a unique event code
  public Code: string = "";
  // Time is event time
  public Time: google.protobuf.Timestamp = new google.protobuf.Timestamp();
  // ClusterName identifies the originating teleport cluster
  public ClusterName: string = "";

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
          obj.Index = decoder.int64();
          break;
        }
        case 2: {
          obj.Type = decoder.string();
          break;
        }
        case 3: {
          obj.ID = decoder.string();
          break;
        }
        case 4: {
          obj.Code = decoder.string();
          break;
        }
        case 5: {
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
        case 6: {
          obj.ClusterName = decoder.string();
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

    size += this.Index == 0 ? 0 : 1 + __proto.Sizer.int64(this.Index);
    size +=
      this.Type.length > 0
        ? 1 + __proto.Sizer.varint64(this.Type.length) + this.Type.length
        : 0;
    size +=
      this.ID.length > 0
        ? 1 + __proto.Sizer.varint64(this.ID.length) + this.ID.length
        : 0;
    size +=
      this.Code.length > 0
        ? 1 + __proto.Sizer.varint64(this.Code.length) + this.Code.length
        : 0;

    if (this.Time != null) {
      const f: google.protobuf.Timestamp = this
        .Time as google.protobuf.Timestamp;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.ClusterName.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.ClusterName.length) +
          this.ClusterName.length
        : 0;

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

    if (this.Index != 0) {
      encoder.uint32(0x8);
      encoder.int64(this.Index);
    }
    if (this.Type.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.Type.length);
      encoder.string(this.Type);
    }
    if (this.ID.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.ID.length);
      encoder.string(this.ID);
    }
    if (this.Code.length > 0) {
      encoder.uint32(0x22);
      encoder.uint32(this.Code.length);
      encoder.string(this.Code);
    }

    if (this.Time != null) {
      const f = this.Time as google.protobuf.Timestamp;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.ClusterName.length > 0) {
      encoder.uint32(0x32);
      encoder.uint32(this.ClusterName.length);
      encoder.string(this.ClusterName);
    }

    return buf;
  } // encode Metadata
} // Metadata

// SessionCommand is a session command event
export class SessionMetadata {
  // SessionID is a unique UUID of the session.
  public SessionID: string = "";
  // WithMFA is a UUID of an MFA device used to start this session.
  public WithMFA: string = "";

  // Decodes SessionMetadata from an ArrayBuffer
  static decode(buf: ArrayBuffer): SessionMetadata {
    return SessionMetadata.decodeDataView(new DataView(buf));
  }

  // Decodes SessionMetadata from a DataView
  static decodeDataView(view: DataView): SessionMetadata {
    const decoder = new __proto.Decoder(view);
    const obj = new SessionMetadata();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.SessionID = decoder.string();
          break;
        }
        case 2: {
          obj.WithMFA = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode SessionMetadata

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.SessionID.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.SessionID.length) +
          this.SessionID.length
        : 0;
    size +=
      this.WithMFA.length > 0
        ? 1 + __proto.Sizer.varint64(this.WithMFA.length) + this.WithMFA.length
        : 0;

    return size;
  }

  // Encodes SessionMetadata to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes SessionMetadata to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.SessionID.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.SessionID.length);
      encoder.string(this.SessionID);
    }
    if (this.WithMFA.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.WithMFA.length);
      encoder.string(this.WithMFA);
    }

    return buf;
  } // encode SessionMetadata
} // SessionMetadata

// AccessRequestCreate is emitted when access request has been created or updated
export class UserMetadata {
  // User is teleport user name
  public User: string = "";
  // Login is OS login
  public Login: string = "";
  // Impersonator is a user acting on behalf of another user
  public Impersonator: string = "";
  // AWSRoleARN is AWS IAM role user assumes when accessing AWS console.
  public AWSRoleARN: string = "";
  // AccessRequests are the IDs of access requests created by the user
  public AccessRequests: Array<string> = new Array<string>();

  // Decodes UserMetadata from an ArrayBuffer
  static decode(buf: ArrayBuffer): UserMetadata {
    return UserMetadata.decodeDataView(new DataView(buf));
  }

  // Decodes UserMetadata from a DataView
  static decodeDataView(view: DataView): UserMetadata {
    const decoder = new __proto.Decoder(view);
    const obj = new UserMetadata();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.User = decoder.string();
          break;
        }
        case 2: {
          obj.Login = decoder.string();
          break;
        }
        case 3: {
          obj.Impersonator = decoder.string();
          break;
        }
        case 4: {
          obj.AWSRoleARN = decoder.string();
          break;
        }
        case 5: {
          obj.AccessRequests.push(decoder.string());
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode UserMetadata

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.User.length > 0
        ? 1 + __proto.Sizer.varint64(this.User.length) + this.User.length
        : 0;
    size +=
      this.Login.length > 0
        ? 1 + __proto.Sizer.varint64(this.Login.length) + this.Login.length
        : 0;
    size +=
      this.Impersonator.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.Impersonator.length) +
          this.Impersonator.length
        : 0;
    size +=
      this.AWSRoleARN.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.AWSRoleARN.length) +
          this.AWSRoleARN.length
        : 0;

    size += __size_string_repeated(this.AccessRequests);

    return size;
  }

  // Encodes UserMetadata to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes UserMetadata to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.User.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.User.length);
      encoder.string(this.User);
    }
    if (this.Login.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.Login.length);
      encoder.string(this.Login);
    }
    if (this.Impersonator.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Impersonator.length);
      encoder.string(this.Impersonator);
    }
    if (this.AWSRoleARN.length > 0) {
      encoder.uint32(0x22);
      encoder.uint32(this.AWSRoleARN.length);
      encoder.string(this.AWSRoleARN);
    }

    if (this.AccessRequests.length > 0) {
      for (let n: i32 = 0; n < this.AccessRequests.length; n++) {
        encoder.uint32(0x2a);
        encoder.uint32(this.AccessRequests[n].length);
        encoder.string(this.AccessRequests[n]);
      }
    }

    return buf;
  } // encode UserMetadata
} // UserMetadata

// UserTokenCreate is emitted when a user token is created.
export class ServerMetadata {
  // ServerNamespace is a namespace of the server event
  public ServerNamespace: string = "";
  // ServerID is the UUID of the server the session occurred on.
  public ServerID: string = "";
  // ServerHostname is the hostname of the server the session occurred on.
  public ServerHostname: string = "";
  // ServerAddr is the address of the server the session occurred on.
  public ServerAddr: string = "";
  /**
   * ServerLabels are the labels (static and dynamic) of the server the
   *  session occurred on.
   */
  public ServerLabels: Map<string, string> = new Map<string, string>();

  // Decodes ServerMetadata from an ArrayBuffer
  static decode(buf: ArrayBuffer): ServerMetadata {
    return ServerMetadata.decodeDataView(new DataView(buf));
  }

  // Decodes ServerMetadata from a DataView
  static decodeDataView(view: DataView): ServerMetadata {
    const decoder = new __proto.Decoder(view);
    const obj = new ServerMetadata();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.ServerNamespace = decoder.string();
          break;
        }
        case 2: {
          obj.ServerID = decoder.string();
          break;
        }
        case 3: {
          obj.ServerHostname = decoder.string();
          break;
        }
        case 4: {
          obj.ServerAddr = decoder.string();
          break;
        }
        case 5: {
          const length = decoder.uint32();
          __decodeMap_string_string(decoder, length, obj.ServerLabels);
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode ServerMetadata

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.ServerNamespace.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.ServerNamespace.length) +
          this.ServerNamespace.length
        : 0;
    size +=
      this.ServerID.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.ServerID.length) +
          this.ServerID.length
        : 0;
    size +=
      this.ServerHostname.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.ServerHostname.length) +
          this.ServerHostname.length
        : 0;
    size +=
      this.ServerAddr.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.ServerAddr.length) +
          this.ServerAddr.length
        : 0;

    if (this.ServerLabels.size > 0) {
      const keys = this.ServerLabels.keys();

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = this.ServerLabels.get(key);
        const itemSize = __sizeMapEntry_string_string(key, value);
        if (itemSize > 0) {
          size += 1 + __proto.Sizer.varint64(itemSize) + itemSize;
        }
      }
    }

    return size;
  }

  // Encodes ServerMetadata to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes ServerMetadata to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.ServerNamespace.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.ServerNamespace.length);
      encoder.string(this.ServerNamespace);
    }
    if (this.ServerID.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.ServerID.length);
      encoder.string(this.ServerID);
    }
    if (this.ServerHostname.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.ServerHostname.length);
      encoder.string(this.ServerHostname);
    }
    if (this.ServerAddr.length > 0) {
      encoder.uint32(0x22);
      encoder.uint32(this.ServerAddr.length);
      encoder.string(this.ServerAddr);
    }

    if (this.ServerLabels.size > 0) {
      const keys = this.ServerLabels.keys();
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = this.ServerLabels.get(key);
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
  } // encode ServerMetadata
} // ServerMetadata

// SAMLConnectorCreate fires when SAML connector is created/updated.
export class ConnectionMetadata {
  // LocalAddr is a target address on the host
  public LocalAddr: string = "";
  // RemoteAddr is a client (user's) address
  public RemoteAddr: string = "";
  // Protocol specifies protocol that was captured
  public Protocol: string = "";

  // Decodes ConnectionMetadata from an ArrayBuffer
  static decode(buf: ArrayBuffer): ConnectionMetadata {
    return ConnectionMetadata.decodeDataView(new DataView(buf));
  }

  // Decodes ConnectionMetadata from a DataView
  static decodeDataView(view: DataView): ConnectionMetadata {
    const decoder = new __proto.Decoder(view);
    const obj = new ConnectionMetadata();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.LocalAddr = decoder.string();
          break;
        }
        case 2: {
          obj.RemoteAddr = decoder.string();
          break;
        }
        case 3: {
          obj.Protocol = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode ConnectionMetadata

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.LocalAddr.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.LocalAddr.length) +
          this.LocalAddr.length
        : 0;
    size +=
      this.RemoteAddr.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.RemoteAddr.length) +
          this.RemoteAddr.length
        : 0;
    size +=
      this.Protocol.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.Protocol.length) +
          this.Protocol.length
        : 0;

    return size;
  }

  // Encodes ConnectionMetadata to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes ConnectionMetadata to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.LocalAddr.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.LocalAddr.length);
      encoder.string(this.LocalAddr);
    }
    if (this.RemoteAddr.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.RemoteAddr.length);
      encoder.string(this.RemoteAddr);
    }
    if (this.Protocol.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Protocol.length);
      encoder.string(this.Protocol);
    }

    return buf;
  } // encode ConnectionMetadata
} // ConnectionMetadata

// DatabaseMetadata contains common database information.
export class KubernetesClusterMetadata {
  // KubernetesCluster is a kubernetes cluster name.
  public KubernetesCluster: string = "";
  // KubernetesUsers is a list of kubernetes usernames for the user.
  public KubernetesUsers: Array<string> = new Array<string>();
  // KubernetesGroups is a list of kubernetes groups for the user.
  public KubernetesGroups: Array<string> = new Array<string>();

  // Decodes KubernetesClusterMetadata from an ArrayBuffer
  static decode(buf: ArrayBuffer): KubernetesClusterMetadata {
    return KubernetesClusterMetadata.decodeDataView(new DataView(buf));
  }

  // Decodes KubernetesClusterMetadata from a DataView
  static decodeDataView(view: DataView): KubernetesClusterMetadata {
    const decoder = new __proto.Decoder(view);
    const obj = new KubernetesClusterMetadata();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.KubernetesCluster = decoder.string();
          break;
        }
        case 2: {
          obj.KubernetesUsers.push(decoder.string());
          break;
        }
        case 3: {
          obj.KubernetesGroups.push(decoder.string());
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode KubernetesClusterMetadata

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.KubernetesCluster.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.KubernetesCluster.length) +
          this.KubernetesCluster.length
        : 0;

    size += __size_string_repeated(this.KubernetesUsers);

    size += __size_string_repeated(this.KubernetesGroups);

    return size;
  }

  // Encodes KubernetesClusterMetadata to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes KubernetesClusterMetadata to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.KubernetesCluster.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.KubernetesCluster.length);
      encoder.string(this.KubernetesCluster);
    }

    if (this.KubernetesUsers.length > 0) {
      for (let n: i32 = 0; n < this.KubernetesUsers.length; n++) {
        encoder.uint32(0x12);
        encoder.uint32(this.KubernetesUsers[n].length);
        encoder.string(this.KubernetesUsers[n]);
      }
    }

    if (this.KubernetesGroups.length > 0) {
      for (let n: i32 = 0; n < this.KubernetesGroups.length; n++) {
        encoder.uint32(0x1a);
        encoder.uint32(this.KubernetesGroups[n].length);
        encoder.string(this.KubernetesGroups[n]);
      }
    }

    return buf;
  } // encode KubernetesClusterMetadata
} // KubernetesClusterMetadata

/**
 * PostgresFunctionCall is emitted when a Postgres client calls internal
 *  database function.
 */
export class KubernetesPodMetadata {
  // KubernetesPodName is the name of the pod.
  public KubernetesPodName: string = "";
  // KubernetesPodNamespace is the namespace of the pod.
  public KubernetesPodNamespace: string = "";
  // KubernetesContainerName is the name of the container within the pod.
  public KubernetesContainerName: string = "";
  // KubernetesContainerImage is the image of the container within the pod.
  public KubernetesContainerImage: string = "";
  // KubernetesNodeName is the node that runs the pod.
  public KubernetesNodeName: string = "";

  // Decodes KubernetesPodMetadata from an ArrayBuffer
  static decode(buf: ArrayBuffer): KubernetesPodMetadata {
    return KubernetesPodMetadata.decodeDataView(new DataView(buf));
  }

  // Decodes KubernetesPodMetadata from a DataView
  static decodeDataView(view: DataView): KubernetesPodMetadata {
    const decoder = new __proto.Decoder(view);
    const obj = new KubernetesPodMetadata();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.KubernetesPodName = decoder.string();
          break;
        }
        case 2: {
          obj.KubernetesPodNamespace = decoder.string();
          break;
        }
        case 3: {
          obj.KubernetesContainerName = decoder.string();
          break;
        }
        case 4: {
          obj.KubernetesContainerImage = decoder.string();
          break;
        }
        case 5: {
          obj.KubernetesNodeName = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode KubernetesPodMetadata

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.KubernetesPodName.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.KubernetesPodName.length) +
          this.KubernetesPodName.length
        : 0;
    size +=
      this.KubernetesPodNamespace.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.KubernetesPodNamespace.length) +
          this.KubernetesPodNamespace.length
        : 0;
    size +=
      this.KubernetesContainerName.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.KubernetesContainerName.length) +
          this.KubernetesContainerName.length
        : 0;
    size +=
      this.KubernetesContainerImage.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.KubernetesContainerImage.length) +
          this.KubernetesContainerImage.length
        : 0;
    size +=
      this.KubernetesNodeName.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.KubernetesNodeName.length) +
          this.KubernetesNodeName.length
        : 0;

    return size;
  }

  // Encodes KubernetesPodMetadata to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes KubernetesPodMetadata to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.KubernetesPodName.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.KubernetesPodName.length);
      encoder.string(this.KubernetesPodName);
    }
    if (this.KubernetesPodNamespace.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.KubernetesPodNamespace.length);
      encoder.string(this.KubernetesPodNamespace);
    }
    if (this.KubernetesContainerName.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.KubernetesContainerName.length);
      encoder.string(this.KubernetesContainerName);
    }
    if (this.KubernetesContainerImage.length > 0) {
      encoder.uint32(0x22);
      encoder.uint32(this.KubernetesContainerImage.length);
      encoder.string(this.KubernetesContainerImage);
    }
    if (this.KubernetesNodeName.length > 0) {
      encoder.uint32(0x2a);
      encoder.uint32(this.KubernetesNodeName.length);
      encoder.string(this.KubernetesNodeName);
    }

    return buf;
  } // encode KubernetesPodMetadata
} // KubernetesPodMetadata

// LockDelete is emitted when a lock is deleted
export class SessionStart {
  // Metadata is a common event metadata
  public Metadata: Metadata = new Metadata();
  // User is a common user event metadata
  public User: UserMetadata = new UserMetadata();
  // SessionMetadata is a common event session metadata
  public Session: SessionMetadata = new SessionMetadata();
  // ServerMetadata is a common server metadata
  public Server: ServerMetadata = new ServerMetadata();
  // ConnectionMetadata holds information about the connection
  public Connection: ConnectionMetadata = new ConnectionMetadata();
  // TerminalSize is expressed as 'W:H'
  public TerminalSize: string = "";
  /**
   * KubernetesCluster has information about a kubernetes cluster, if
   *  applicable.
   */
  public KubernetesCluster: KubernetesClusterMetadata =
    new KubernetesClusterMetadata();
  // KubernetesPod has information about a kubernetes pod, if applicable.
  public KubernetesPod: KubernetesPodMetadata = new KubernetesPodMetadata();
  // InitialCommand is the command used to start this session.
  public InitialCommand: Array<string> = new Array<string>();
  // SessionRecording is the type of session recording.
  public SessionRecording: string = "";

  // Decodes SessionStart from an ArrayBuffer
  static decode(buf: ArrayBuffer): SessionStart {
    return SessionStart.decodeDataView(new DataView(buf));
  }

  // Decodes SessionStart from a DataView
  static decodeDataView(view: DataView): SessionStart {
    const decoder = new __proto.Decoder(view);
    const obj = new SessionStart();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.User = UserMetadata.decodeDataView(
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
          obj.Session = SessionMetadata.decodeDataView(
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
          obj.Server = ServerMetadata.decodeDataView(
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
          obj.Connection = ConnectionMetadata.decodeDataView(
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
          obj.TerminalSize = decoder.string();
          break;
        }
        case 7: {
          const length = decoder.uint32();
          obj.KubernetesCluster = KubernetesClusterMetadata.decodeDataView(
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
          obj.KubernetesPod = KubernetesPodMetadata.decodeDataView(
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
          obj.InitialCommand.push(decoder.string());
          break;
        }
        case 10: {
          obj.SessionRecording = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode SessionStart

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Session != null) {
      const f: SessionMetadata = this.Session as SessionMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Server != null) {
      const f: ServerMetadata = this.Server as ServerMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Connection != null) {
      const f: ConnectionMetadata = this.Connection as ConnectionMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.TerminalSize.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.TerminalSize.length) +
          this.TerminalSize.length
        : 0;

    if (this.KubernetesCluster != null) {
      const f: KubernetesClusterMetadata = this
        .KubernetesCluster as KubernetesClusterMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.KubernetesPod != null) {
      const f: KubernetesPodMetadata = this
        .KubernetesPod as KubernetesPodMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size += __size_string_repeated(this.InitialCommand);

    size +=
      this.SessionRecording.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.SessionRecording.length) +
          this.SessionRecording.length
        : 0;

    return size;
  }

  // Encodes SessionStart to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes SessionStart to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Session != null) {
      const f = this.Session as SessionMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Server != null) {
      const f = this.Server as ServerMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Connection != null) {
      const f = this.Connection as ConnectionMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.TerminalSize.length > 0) {
      encoder.uint32(0x32);
      encoder.uint32(this.TerminalSize.length);
      encoder.string(this.TerminalSize);
    }

    if (this.KubernetesCluster != null) {
      const f = this.KubernetesCluster as KubernetesClusterMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x3a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.KubernetesPod != null) {
      const f = this.KubernetesPod as KubernetesPodMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x42);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.InitialCommand.length > 0) {
      for (let n: i32 = 0; n < this.InitialCommand.length; n++) {
        encoder.uint32(0x4a);
        encoder.uint32(this.InitialCommand[n].length);
        encoder.string(this.InitialCommand[n]);
      }
    }

    if (this.SessionRecording.length > 0) {
      encoder.uint32(0x52);
      encoder.uint32(this.SessionRecording.length);
      encoder.string(this.SessionRecording);
    }

    return buf;
  } // encode SessionStart
} // SessionStart

/**
 * Identity matches github.com/gravitational/teleport/lib/tlsca.Identity except
 *  for RouteToApp and RouteToDatabase which are nullable and Traits which is
 *  represented as a google.protobuf.Struct (still containing a map from string
 *  to strings). Field names match other names already used in other events
 *  rather than the field names in tlsca.Identity.
 */
export class SessionJoin {
  // Metadata is a common event metadata
  public Metadata: Metadata = new Metadata();
  // User is a common user event metadata
  public User: UserMetadata = new UserMetadata();
  // SessionMetadata is a common event session metadata
  public Session: SessionMetadata = new SessionMetadata();
  // ServerMetadata is a common server metadata
  public Server: ServerMetadata = new ServerMetadata();
  // ConnectionMetadata holds information about the connection
  public Connection: ConnectionMetadata = new ConnectionMetadata();
  /**
   * KubernetesCluster has information about a kubernetes cluster, if
   *  applicable.
   */
  public KubernetesCluster: KubernetesClusterMetadata =
    new KubernetesClusterMetadata();

  // Decodes SessionJoin from an ArrayBuffer
  static decode(buf: ArrayBuffer): SessionJoin {
    return SessionJoin.decodeDataView(new DataView(buf));
  }

  // Decodes SessionJoin from a DataView
  static decodeDataView(view: DataView): SessionJoin {
    const decoder = new __proto.Decoder(view);
    const obj = new SessionJoin();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.User = UserMetadata.decodeDataView(
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
          obj.Session = SessionMetadata.decodeDataView(
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
          obj.Server = ServerMetadata.decodeDataView(
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
          obj.Connection = ConnectionMetadata.decodeDataView(
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
          obj.KubernetesCluster = KubernetesClusterMetadata.decodeDataView(
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
  } // decode SessionJoin

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Session != null) {
      const f: SessionMetadata = this.Session as SessionMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Server != null) {
      const f: ServerMetadata = this.Server as ServerMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Connection != null) {
      const f: ConnectionMetadata = this.Connection as ConnectionMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.KubernetesCluster != null) {
      const f: KubernetesClusterMetadata = this
        .KubernetesCluster as KubernetesClusterMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes SessionJoin to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes SessionJoin to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Session != null) {
      const f = this.Session as SessionMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Server != null) {
      const f = this.Server as ServerMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Connection != null) {
      const f = this.Connection as ConnectionMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.KubernetesCluster != null) {
      const f = this.KubernetesCluster as KubernetesClusterMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x32);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode SessionJoin
} // SessionJoin

/**
 * MySQLStatementBulkExecute is emitted when a MySQL client executes a bulk
 *  insert of a prepared statement using the prepared statement protocol.
 */
export class SessionPrint {
  // Metadata is a common event metadata
  public Metadata: Metadata = new Metadata();
  // ChunkIndex is a monotonicaly incremented index for ordering print events
  public ChunkIndex: i64;
  // Data is data transferred, it is not marshaled to JSON format
  public Data: Array<u8> = new Array<u8>();
  /**
   * Bytes says how many bytes have been written into the session
   *  during "print" event
   */
  public Bytes: i64;
  // DelayMilliseconds is the delay in milliseconds from the start of the session
  public DelayMilliseconds: i64;
  // Offset is the offset in bytes in the session file
  public Offset: i64;

  // Decodes SessionPrint from an ArrayBuffer
  static decode(buf: ArrayBuffer): SessionPrint {
    return SessionPrint.decodeDataView(new DataView(buf));
  }

  // Decodes SessionPrint from a DataView
  static decodeDataView(view: DataView): SessionPrint {
    const decoder = new __proto.Decoder(view);
    const obj = new SessionPrint();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          obj.ChunkIndex = decoder.int64();
          break;
        }
        case 3: {
          obj.Data = decoder.bytes();
          break;
        }
        case 4: {
          obj.Bytes = decoder.int64();
          break;
        }
        case 5: {
          obj.DelayMilliseconds = decoder.int64();
          break;
        }
        case 6: {
          obj.Offset = decoder.int64();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode SessionPrint

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size += this.ChunkIndex == 0 ? 0 : 1 + __proto.Sizer.int64(this.ChunkIndex);
    size +=
      this.Data.length > 0
        ? 1 + __proto.Sizer.varint64(this.Data.length) + this.Data.length
        : 0;
    size += this.Bytes == 0 ? 0 : 1 + __proto.Sizer.int64(this.Bytes);
    size +=
      this.DelayMilliseconds == 0
        ? 0
        : 1 + __proto.Sizer.int64(this.DelayMilliseconds);
    size += this.Offset == 0 ? 0 : 1 + __proto.Sizer.int64(this.Offset);

    return size;
  }

  // Encodes SessionPrint to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes SessionPrint to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.ChunkIndex != 0) {
      encoder.uint32(0x10);
      encoder.int64(this.ChunkIndex);
    }
    if (this.Data.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Data.length);
      encoder.bytes(this.Data);
    }
    if (this.Bytes != 0) {
      encoder.uint32(0x20);
      encoder.int64(this.Bytes);
    }
    if (this.DelayMilliseconds != 0) {
      encoder.uint32(0x28);
      encoder.int64(this.DelayMilliseconds);
    }
    if (this.Offset != 0) {
      encoder.uint32(0x30);
      encoder.int64(this.Offset);
    }

    return buf;
  } // encode SessionPrint
} // SessionPrint

/**
 * DesktopRecording happens when a Teleport Desktop Protocol message
 *  is captured during a Desktop Access Session.
 */
export class DesktopRecording {
  // Metadata is a common event metadata
  public Metadata: Metadata = new Metadata();
  // Message is the encoded TDP message.
  public Message: Array<u8> = new Array<u8>();
  /**
   * DelayMilliseconds is the delay in milliseconds from the start of the session
   *
   *
   *  JSON tag intentionally matches SessionPrintEvent
   */
  public DelayMilliseconds: i64;

  // Decodes DesktopRecording from an ArrayBuffer
  static decode(buf: ArrayBuffer): DesktopRecording {
    return DesktopRecording.decodeDataView(new DataView(buf));
  }

  // Decodes DesktopRecording from a DataView
  static decodeDataView(view: DataView): DesktopRecording {
    const decoder = new __proto.Decoder(view);
    const obj = new DesktopRecording();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          obj.Message = decoder.bytes();
          break;
        }
        case 3: {
          obj.DelayMilliseconds = decoder.int64();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode DesktopRecording

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.Message.length > 0
        ? 1 + __proto.Sizer.varint64(this.Message.length) + this.Message.length
        : 0;
    size +=
      this.DelayMilliseconds == 0
        ? 0
        : 1 + __proto.Sizer.int64(this.DelayMilliseconds);

    return size;
  }

  // Encodes DesktopRecording to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes DesktopRecording to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

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
      encoder.bytes(this.Message);
    }
    if (this.DelayMilliseconds != 0) {
      encoder.uint32(0x18);
      encoder.int64(this.DelayMilliseconds);
    }

    return buf;
  } // encode DesktopRecording
} // DesktopRecording

/**
 * DesktopClipboardReceive is emitted when Teleport receives
 *  clipboard data from a remote desktop.
 */
export class DesktopClipboardReceive {
  // Metadata is common event metadata.
  public Metadata: Metadata = new Metadata();
  // User is common user event metadata.
  public User: UserMetadata = new UserMetadata();
  // Session is common event session metadata.
  public Session: SessionMetadata = new SessionMetadata();
  // Connection holds information about the connection.
  public Connection: ConnectionMetadata = new ConnectionMetadata();
  // DesktopAddr is the address of the desktop being accessed.
  public DesktopAddr: string = "";
  // Length is the number of bytes of data received from the remote clipboard.
  public Length: i32;

  // Decodes DesktopClipboardReceive from an ArrayBuffer
  static decode(buf: ArrayBuffer): DesktopClipboardReceive {
    return DesktopClipboardReceive.decodeDataView(new DataView(buf));
  }

  // Decodes DesktopClipboardReceive from a DataView
  static decodeDataView(view: DataView): DesktopClipboardReceive {
    const decoder = new __proto.Decoder(view);
    const obj = new DesktopClipboardReceive();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.User = UserMetadata.decodeDataView(
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
          obj.Session = SessionMetadata.decodeDataView(
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
          obj.Connection = ConnectionMetadata.decodeDataView(
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
          obj.DesktopAddr = decoder.string();
          break;
        }
        case 6: {
          obj.Length = decoder.int32();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode DesktopClipboardReceive

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Session != null) {
      const f: SessionMetadata = this.Session as SessionMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Connection != null) {
      const f: ConnectionMetadata = this.Connection as ConnectionMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.DesktopAddr.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.DesktopAddr.length) +
          this.DesktopAddr.length
        : 0;
    size += this.Length == 0 ? 0 : 1 + __proto.Sizer.int32(this.Length);

    return size;
  }

  // Encodes DesktopClipboardReceive to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes DesktopClipboardReceive to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Session != null) {
      const f = this.Session as SessionMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Connection != null) {
      const f = this.Connection as ConnectionMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.DesktopAddr.length > 0) {
      encoder.uint32(0x2a);
      encoder.uint32(this.DesktopAddr.length);
      encoder.string(this.DesktopAddr);
    }
    if (this.Length != 0) {
      encoder.uint32(0x30);
      encoder.int32(this.Length);
    }

    return buf;
  } // encode DesktopClipboardReceive
} // DesktopClipboardReceive

/**
 * DesktopClipboardSend is emitted when clipboard data is
 *  sent from a user's workstation to Teleport.
 */
export class DesktopClipboardSend {
  // Metadata is common event metadata.
  public Metadata: Metadata = new Metadata();
  // User is common user event metadata.
  public User: UserMetadata = new UserMetadata();
  // Session is common event session metadata.
  public Session: SessionMetadata = new SessionMetadata();
  // Connection holds information about the connection.
  public Connection: ConnectionMetadata = new ConnectionMetadata();
  // DesktopAddr is the address of the desktop being accessed.
  public DesktopAddr: string = "";
  // Length is the number of bytes of data sent.
  public Length: i32;

  // Decodes DesktopClipboardSend from an ArrayBuffer
  static decode(buf: ArrayBuffer): DesktopClipboardSend {
    return DesktopClipboardSend.decodeDataView(new DataView(buf));
  }

  // Decodes DesktopClipboardSend from a DataView
  static decodeDataView(view: DataView): DesktopClipboardSend {
    const decoder = new __proto.Decoder(view);
    const obj = new DesktopClipboardSend();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.User = UserMetadata.decodeDataView(
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
          obj.Session = SessionMetadata.decodeDataView(
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
          obj.Connection = ConnectionMetadata.decodeDataView(
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
          obj.DesktopAddr = decoder.string();
          break;
        }
        case 6: {
          obj.Length = decoder.int32();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode DesktopClipboardSend

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Session != null) {
      const f: SessionMetadata = this.Session as SessionMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Connection != null) {
      const f: ConnectionMetadata = this.Connection as ConnectionMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.DesktopAddr.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.DesktopAddr.length) +
          this.DesktopAddr.length
        : 0;
    size += this.Length == 0 ? 0 : 1 + __proto.Sizer.int32(this.Length);

    return size;
  }

  // Encodes DesktopClipboardSend to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes DesktopClipboardSend to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Session != null) {
      const f = this.Session as SessionMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Connection != null) {
      const f = this.Connection as ConnectionMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.DesktopAddr.length > 0) {
      encoder.uint32(0x2a);
      encoder.uint32(this.DesktopAddr.length);
      encoder.string(this.DesktopAddr);
    }
    if (this.Length != 0) {
      encoder.uint32(0x30);
      encoder.int32(this.Length);
    }

    return buf;
  } // encode DesktopClipboardSend
} // DesktopClipboardSend

// SessionReject event happens when a user hits a session control restriction.
export class SessionReject {
  // Metadata is a common event metadata
  public Metadata: Metadata = new Metadata();
  // User is a common user event metadata
  public User: UserMetadata = new UserMetadata();
  // ServerMetadata is a common server metadata
  public Server: ServerMetadata = new ServerMetadata();
  // ConnectionMetadata holds information about the connection
  public Connection: ConnectionMetadata = new ConnectionMetadata();
  /**
   * Reason is a field that specifies reason for event, e.g. in disconnect
   *  event it explains why server disconnected the client
   */
  public Reason: string = "";
  /**
   * Maximum is an event field specifying a maximal value (e.g. the value
   *  of `max_connections` for a `session.rejected` event).
   */
  public Maximum: i64;

  // Decodes SessionReject from an ArrayBuffer
  static decode(buf: ArrayBuffer): SessionReject {
    return SessionReject.decodeDataView(new DataView(buf));
  }

  // Decodes SessionReject from a DataView
  static decodeDataView(view: DataView): SessionReject {
    const decoder = new __proto.Decoder(view);
    const obj = new SessionReject();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.User = UserMetadata.decodeDataView(
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
          obj.Server = ServerMetadata.decodeDataView(
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
          obj.Connection = ConnectionMetadata.decodeDataView(
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
          obj.Reason = decoder.string();
          break;
        }
        case 6: {
          obj.Maximum = decoder.int64();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode SessionReject

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Server != null) {
      const f: ServerMetadata = this.Server as ServerMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Connection != null) {
      const f: ConnectionMetadata = this.Connection as ConnectionMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.Reason.length > 0
        ? 1 + __proto.Sizer.varint64(this.Reason.length) + this.Reason.length
        : 0;
    size += this.Maximum == 0 ? 0 : 1 + __proto.Sizer.int64(this.Maximum);

    return size;
  }

  // Encodes SessionReject to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes SessionReject to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Server != null) {
      const f = this.Server as ServerMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Connection != null) {
      const f = this.Connection as ConnectionMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Reason.length > 0) {
      encoder.uint32(0x2a);
      encoder.uint32(this.Reason.length);
      encoder.string(this.Reason);
    }
    if (this.Maximum != 0) {
      encoder.uint32(0x30);
      encoder.int64(this.Maximum);
    }

    return buf;
  } // encode SessionReject
} // SessionReject

// SessionConnect is emitted when a non-Teleport connection is made over net.Dial.
export class SessionConnect {
  public Metadata: Metadata = new Metadata();
  public Server: ServerMetadata = new ServerMetadata();
  public Connection: ConnectionMetadata = new ConnectionMetadata();

  // Decodes SessionConnect from an ArrayBuffer
  static decode(buf: ArrayBuffer): SessionConnect {
    return SessionConnect.decodeDataView(new DataView(buf));
  }

  // Decodes SessionConnect from a DataView
  static decodeDataView(view: DataView): SessionConnect {
    const decoder = new __proto.Decoder(view);
    const obj = new SessionConnect();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.Server = ServerMetadata.decodeDataView(
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
          obj.Connection = ConnectionMetadata.decodeDataView(
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
  } // decode SessionConnect

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Server != null) {
      const f: ServerMetadata = this.Server as ServerMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Connection != null) {
      const f: ConnectionMetadata = this.Connection as ConnectionMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes SessionConnect to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes SessionConnect to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Server != null) {
      const f = this.Server as ServerMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Connection != null) {
      const f = this.Connection as ConnectionMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode SessionConnect
} // SessionConnect

// Resize means that some user resized PTY on the client
export class Resize {
  // Metadata is a common event metadata
  public Metadata: Metadata = new Metadata();
  // User is a common user event metadata
  public User: UserMetadata = new UserMetadata();
  // SessionMetadata is a common event session metadata
  public Session: SessionMetadata = new SessionMetadata();
  // ConnectionMetadata holds information about the connection
  public Connection: ConnectionMetadata = new ConnectionMetadata();
  // ServerMetadata is a common server metadata
  public Server: ServerMetadata = new ServerMetadata();
  // TerminalSize is expressed as 'W:H'
  public TerminalSize: string = "";
  /**
   * KubernetesCluster has information about a kubernetes cluster, if
   *  applicable.
   */
  public KubernetesCluster: KubernetesClusterMetadata =
    new KubernetesClusterMetadata();
  // KubernetesPod has information about a kubernetes pod, if applicable.
  public KubernetesPod: KubernetesPodMetadata = new KubernetesPodMetadata();

  // Decodes Resize from an ArrayBuffer
  static decode(buf: ArrayBuffer): Resize {
    return Resize.decodeDataView(new DataView(buf));
  }

  // Decodes Resize from a DataView
  static decodeDataView(view: DataView): Resize {
    const decoder = new __proto.Decoder(view);
    const obj = new Resize();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.User = UserMetadata.decodeDataView(
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
          obj.Session = SessionMetadata.decodeDataView(
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
          obj.Connection = ConnectionMetadata.decodeDataView(
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
          obj.Server = ServerMetadata.decodeDataView(
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
          obj.TerminalSize = decoder.string();
          break;
        }
        case 7: {
          const length = decoder.uint32();
          obj.KubernetesCluster = KubernetesClusterMetadata.decodeDataView(
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
          obj.KubernetesPod = KubernetesPodMetadata.decodeDataView(
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
  } // decode Resize

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Session != null) {
      const f: SessionMetadata = this.Session as SessionMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Connection != null) {
      const f: ConnectionMetadata = this.Connection as ConnectionMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Server != null) {
      const f: ServerMetadata = this.Server as ServerMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.TerminalSize.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.TerminalSize.length) +
          this.TerminalSize.length
        : 0;

    if (this.KubernetesCluster != null) {
      const f: KubernetesClusterMetadata = this
        .KubernetesCluster as KubernetesClusterMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.KubernetesPod != null) {
      const f: KubernetesPodMetadata = this
        .KubernetesPod as KubernetesPodMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes Resize to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes Resize to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Session != null) {
      const f = this.Session as SessionMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Connection != null) {
      const f = this.Connection as ConnectionMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Server != null) {
      const f = this.Server as ServerMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.TerminalSize.length > 0) {
      encoder.uint32(0x32);
      encoder.uint32(this.TerminalSize.length);
      encoder.string(this.TerminalSize);
    }

    if (this.KubernetesCluster != null) {
      const f = this.KubernetesCluster as KubernetesClusterMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x3a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.KubernetesPod != null) {
      const f = this.KubernetesPod as KubernetesPodMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x42);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode Resize
} // Resize

// SessionEnd is a session end event
export class SessionEnd {
  // Metadata is a common event metadata
  public Metadata: Metadata = new Metadata();
  // User is a common user event metadata
  public User: UserMetadata = new UserMetadata();
  // SessionMetadata is a common event session metadata
  public Session: SessionMetadata = new SessionMetadata();
  // ConnectionMetadata holds information about the connection
  public Connection: ConnectionMetadata = new ConnectionMetadata();
  // ServerMetadata is a common server metadata
  public Server: ServerMetadata = new ServerMetadata();
  /**
   * EnhancedRecording is used to indicate if the recording was an
   *  enhanced recording or not.
   */
  public EnhancedRecording: bool;
  /**
   * Interactive is used to indicate if the session was interactive
   *  (has PTY attached) or not (exec session).
   */
  public Interactive: bool;
  // Participants is a list of participants in the session.
  public Participants: Array<string> = new Array<string>();
  // StartTime is the timestamp at which the session began.
  public StartTime: google.protobuf.Timestamp = new google.protobuf.Timestamp();
  // EndTime is the timestamp at which the session ended.
  public EndTime: google.protobuf.Timestamp = new google.protobuf.Timestamp();
  /**
   * KubernetesCluster has information about a kubernetes cluster, if
   *  applicable.
   */
  public KubernetesCluster: KubernetesClusterMetadata =
    new KubernetesClusterMetadata();
  // KubernetesPod has information about a kubernetes pod, if applicable.
  public KubernetesPod: KubernetesPodMetadata = new KubernetesPodMetadata();
  // InitialCommand is the command used to start this session.
  public InitialCommand: Array<string> = new Array<string>();
  // SessionRecording is the type of session recording.
  public SessionRecording: string = "";

  // Decodes SessionEnd from an ArrayBuffer
  static decode(buf: ArrayBuffer): SessionEnd {
    return SessionEnd.decodeDataView(new DataView(buf));
  }

  // Decodes SessionEnd from a DataView
  static decodeDataView(view: DataView): SessionEnd {
    const decoder = new __proto.Decoder(view);
    const obj = new SessionEnd();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.User = UserMetadata.decodeDataView(
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
          obj.Session = SessionMetadata.decodeDataView(
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
          obj.Connection = ConnectionMetadata.decodeDataView(
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
          obj.Server = ServerMetadata.decodeDataView(
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
          obj.EnhancedRecording = decoder.bool();
          break;
        }
        case 7: {
          obj.Interactive = decoder.bool();
          break;
        }
        case 8: {
          obj.Participants.push(decoder.string());
          break;
        }
        case 9: {
          const length = decoder.uint32();
          obj.StartTime = google.protobuf.Timestamp.decodeDataView(
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
          obj.EndTime = google.protobuf.Timestamp.decodeDataView(
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
          obj.KubernetesCluster = KubernetesClusterMetadata.decodeDataView(
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
          obj.KubernetesPod = KubernetesPodMetadata.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 13: {
          obj.InitialCommand.push(decoder.string());
          break;
        }
        case 14: {
          obj.SessionRecording = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode SessionEnd

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Session != null) {
      const f: SessionMetadata = this.Session as SessionMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Connection != null) {
      const f: ConnectionMetadata = this.Connection as ConnectionMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Server != null) {
      const f: ServerMetadata = this.Server as ServerMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size += this.EnhancedRecording == 0 ? 0 : 1 + 1;
    size += this.Interactive == 0 ? 0 : 1 + 1;

    size += __size_string_repeated(this.Participants);

    if (this.StartTime != null) {
      const f: google.protobuf.Timestamp = this
        .StartTime as google.protobuf.Timestamp;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.EndTime != null) {
      const f: google.protobuf.Timestamp = this
        .EndTime as google.protobuf.Timestamp;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.KubernetesCluster != null) {
      const f: KubernetesClusterMetadata = this
        .KubernetesCluster as KubernetesClusterMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.KubernetesPod != null) {
      const f: KubernetesPodMetadata = this
        .KubernetesPod as KubernetesPodMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size += __size_string_repeated(this.InitialCommand);

    size +=
      this.SessionRecording.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.SessionRecording.length) +
          this.SessionRecording.length
        : 0;

    return size;
  }

  // Encodes SessionEnd to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes SessionEnd to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Session != null) {
      const f = this.Session as SessionMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Connection != null) {
      const f = this.Connection as ConnectionMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Server != null) {
      const f = this.Server as ServerMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.EnhancedRecording != 0) {
      encoder.uint32(0x30);
      encoder.bool(this.EnhancedRecording);
    }
    if (this.Interactive != 0) {
      encoder.uint32(0x38);
      encoder.bool(this.Interactive);
    }

    if (this.Participants.length > 0) {
      for (let n: i32 = 0; n < this.Participants.length; n++) {
        encoder.uint32(0x42);
        encoder.uint32(this.Participants[n].length);
        encoder.string(this.Participants[n]);
      }
    }

    if (this.StartTime != null) {
      const f = this.StartTime as google.protobuf.Timestamp;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x4a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.EndTime != null) {
      const f = this.EndTime as google.protobuf.Timestamp;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x52);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.KubernetesCluster != null) {
      const f = this.KubernetesCluster as KubernetesClusterMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x5a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.KubernetesPod != null) {
      const f = this.KubernetesPod as KubernetesPodMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x62);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.InitialCommand.length > 0) {
      for (let n: i32 = 0; n < this.InitialCommand.length; n++) {
        encoder.uint32(0x6a);
        encoder.uint32(this.InitialCommand[n].length);
        encoder.string(this.InitialCommand[n]);
      }
    }

    if (this.SessionRecording.length > 0) {
      encoder.uint32(0x72);
      encoder.uint32(this.SessionRecording.length);
      encoder.string(this.SessionRecording);
    }

    return buf;
  } // encode SessionEnd
} // SessionEnd

// BPFMetadata is a common BPF process metadata
export class BPFMetadata {
  // PID is the ID of the process.
  public PID: u64;
  // CgroupID is the internal cgroupv2 ID of the event.
  public CgroupID: u64;
  // Program is name of the executable.
  public Program: string = "";

  // Decodes BPFMetadata from an ArrayBuffer
  static decode(buf: ArrayBuffer): BPFMetadata {
    return BPFMetadata.decodeDataView(new DataView(buf));
  }

  // Decodes BPFMetadata from a DataView
  static decodeDataView(view: DataView): BPFMetadata {
    const decoder = new __proto.Decoder(view);
    const obj = new BPFMetadata();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.PID = decoder.uint64();
          break;
        }
        case 2: {
          obj.CgroupID = decoder.uint64();
          break;
        }
        case 3: {
          obj.Program = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode BPFMetadata

  public size(): u32 {
    let size: u32 = 0;

    size += this.PID == 0 ? 0 : 1 + __proto.Sizer.uint64(this.PID);
    size += this.CgroupID == 0 ? 0 : 1 + __proto.Sizer.uint64(this.CgroupID);
    size +=
      this.Program.length > 0
        ? 1 + __proto.Sizer.varint64(this.Program.length) + this.Program.length
        : 0;

    return size;
  }

  // Encodes BPFMetadata to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes BPFMetadata to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.PID != 0) {
      encoder.uint32(0x8);
      encoder.uint64(this.PID);
    }
    if (this.CgroupID != 0) {
      encoder.uint32(0x10);
      encoder.uint64(this.CgroupID);
    }
    if (this.Program.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Program.length);
      encoder.string(this.Program);
    }

    return buf;
  } // encode BPFMetadata
} // BPFMetadata

// Status contains common command or operation status fields
export class Status {
  // Success indicates the success or failure of the operation
  public Success: bool;
  // Error includes system error message for the failed attempt
  public Error: string = "";
  // UserMessage is a user-friendly message for successfull or unsuccessfull auth attempt
  public UserMessage: string = "";

  // Decodes Status from an ArrayBuffer
  static decode(buf: ArrayBuffer): Status {
    return Status.decodeDataView(new DataView(buf));
  }

  // Decodes Status from a DataView
  static decodeDataView(view: DataView): Status {
    const decoder = new __proto.Decoder(view);
    const obj = new Status();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Success = decoder.bool();
          break;
        }
        case 2: {
          obj.Error = decoder.string();
          break;
        }
        case 3: {
          obj.UserMessage = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode Status

  public size(): u32 {
    let size: u32 = 0;

    size += this.Success == 0 ? 0 : 1 + 1;
    size +=
      this.Error.length > 0
        ? 1 + __proto.Sizer.varint64(this.Error.length) + this.Error.length
        : 0;
    size +=
      this.UserMessage.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.UserMessage.length) +
          this.UserMessage.length
        : 0;

    return size;
  }

  // Encodes Status to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes Status to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Success != 0) {
      encoder.uint32(0x8);
      encoder.bool(this.Success);
    }
    if (this.Error.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.Error.length);
      encoder.string(this.Error);
    }
    if (this.UserMessage.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.UserMessage.length);
      encoder.string(this.UserMessage);
    }

    return buf;
  } // encode Status
} // Status

// SessionCommand is a session command event
export class SessionCommand {
  // Metadata is a common event metadata
  public Metadata: Metadata = new Metadata();
  // User is a common user event metadata
  public User: UserMetadata = new UserMetadata();
  // SessionMetadata is a common event session metadata
  public Session: SessionMetadata = new SessionMetadata();
  // ServerMetadata is a common server metadata
  public Server: ServerMetadata = new ServerMetadata();
  // BPFMetadata is a common BPF subsystem metadata
  public BPF: BPFMetadata = new BPFMetadata();
  // PPID is the PID of the parent process.
  public PPID: u64;
  // Path is the full path to the executable.
  public Path: string = "";
  /**
   * Argv is the list of arguments to the program. Note, the first element does
   *  not contain the name of the process.
   */
  public Argv: Array<string> = new Array<string>();
  // ReturnCode is the return code of execve.
  public ReturnCode: i32;

  // Decodes SessionCommand from an ArrayBuffer
  static decode(buf: ArrayBuffer): SessionCommand {
    return SessionCommand.decodeDataView(new DataView(buf));
  }

  // Decodes SessionCommand from a DataView
  static decodeDataView(view: DataView): SessionCommand {
    const decoder = new __proto.Decoder(view);
    const obj = new SessionCommand();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.User = UserMetadata.decodeDataView(
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
          obj.Session = SessionMetadata.decodeDataView(
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
          obj.Server = ServerMetadata.decodeDataView(
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
          obj.BPF = BPFMetadata.decodeDataView(
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
          obj.PPID = decoder.uint64();
          break;
        }
        case 7: {
          obj.Path = decoder.string();
          break;
        }
        case 8: {
          obj.Argv.push(decoder.string());
          break;
        }
        case 9: {
          obj.ReturnCode = decoder.int32();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode SessionCommand

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Session != null) {
      const f: SessionMetadata = this.Session as SessionMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Server != null) {
      const f: ServerMetadata = this.Server as ServerMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.BPF != null) {
      const f: BPFMetadata = this.BPF as BPFMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size += this.PPID == 0 ? 0 : 1 + __proto.Sizer.uint64(this.PPID);
    size +=
      this.Path.length > 0
        ? 1 + __proto.Sizer.varint64(this.Path.length) + this.Path.length
        : 0;

    size += __size_string_repeated(this.Argv);

    size += this.ReturnCode == 0 ? 0 : 1 + __proto.Sizer.int32(this.ReturnCode);

    return size;
  }

  // Encodes SessionCommand to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes SessionCommand to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Session != null) {
      const f = this.Session as SessionMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Server != null) {
      const f = this.Server as ServerMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.BPF != null) {
      const f = this.BPF as BPFMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.PPID != 0) {
      encoder.uint32(0x30);
      encoder.uint64(this.PPID);
    }
    if (this.Path.length > 0) {
      encoder.uint32(0x3a);
      encoder.uint32(this.Path.length);
      encoder.string(this.Path);
    }

    if (this.Argv.length > 0) {
      for (let n: i32 = 0; n < this.Argv.length; n++) {
        encoder.uint32(0x42);
        encoder.uint32(this.Argv[n].length);
        encoder.string(this.Argv[n]);
      }
    }

    if (this.ReturnCode != 0) {
      encoder.uint32(0x48);
      encoder.int32(this.ReturnCode);
    }

    return buf;
  } // encode SessionCommand
} // SessionCommand

// SessionDisk is a session disk access event
export class SessionDisk {
  // Metadata is a common event metadata
  public Metadata: Metadata = new Metadata();
  // User is a common user event metadata
  public User: UserMetadata = new UserMetadata();
  // SessionMetadata is a common event session metadata
  public Session: SessionMetadata = new SessionMetadata();
  // ServerMetadata is a common server metadata
  public Server: ServerMetadata = new ServerMetadata();
  // BPFMetadata is a common BPF subsystem metadata
  public BPF: BPFMetadata = new BPFMetadata();
  // Path is the full path to the executable.
  public Path: string = "";
  // Flags are the flags passed to open.
  public Flags: i32;
  // ReturnCode is the return code of disk open
  public ReturnCode: i32;

  // Decodes SessionDisk from an ArrayBuffer
  static decode(buf: ArrayBuffer): SessionDisk {
    return SessionDisk.decodeDataView(new DataView(buf));
  }

  // Decodes SessionDisk from a DataView
  static decodeDataView(view: DataView): SessionDisk {
    const decoder = new __proto.Decoder(view);
    const obj = new SessionDisk();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.User = UserMetadata.decodeDataView(
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
          obj.Session = SessionMetadata.decodeDataView(
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
          obj.Server = ServerMetadata.decodeDataView(
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
          obj.BPF = BPFMetadata.decodeDataView(
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
          obj.Path = decoder.string();
          break;
        }
        case 7: {
          obj.Flags = decoder.int32();
          break;
        }
        case 8: {
          obj.ReturnCode = decoder.int32();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode SessionDisk

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Session != null) {
      const f: SessionMetadata = this.Session as SessionMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Server != null) {
      const f: ServerMetadata = this.Server as ServerMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.BPF != null) {
      const f: BPFMetadata = this.BPF as BPFMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.Path.length > 0
        ? 1 + __proto.Sizer.varint64(this.Path.length) + this.Path.length
        : 0;
    size += this.Flags == 0 ? 0 : 1 + __proto.Sizer.int32(this.Flags);
    size += this.ReturnCode == 0 ? 0 : 1 + __proto.Sizer.int32(this.ReturnCode);

    return size;
  }

  // Encodes SessionDisk to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes SessionDisk to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Session != null) {
      const f = this.Session as SessionMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Server != null) {
      const f = this.Server as ServerMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.BPF != null) {
      const f = this.BPF as BPFMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Path.length > 0) {
      encoder.uint32(0x32);
      encoder.uint32(this.Path.length);
      encoder.string(this.Path);
    }
    if (this.Flags != 0) {
      encoder.uint32(0x38);
      encoder.int32(this.Flags);
    }
    if (this.ReturnCode != 0) {
      encoder.uint32(0x40);
      encoder.int32(this.ReturnCode);
    }

    return buf;
  } // encode SessionDisk
} // SessionDisk

// SessionNetwork is a network event
export class SessionNetwork {
  // Metadata is a common event metadata
  public Metadata: Metadata = new Metadata();
  // User is a common user event metadata
  public User: UserMetadata = new UserMetadata();
  // SessionMetadata is a common event session metadata
  public Session: SessionMetadata = new SessionMetadata();
  // ServerMetadata is a common server metadata
  public Server: ServerMetadata = new ServerMetadata();
  // BPFMetadata is a common BPF subsystem metadata
  public BPF: BPFMetadata = new BPFMetadata();
  // SrcAddr is the source IP address of the connection.
  public SrcAddr: string = "";
  // DstAddr is the destination IP address of the connection.
  public DstAddr: string = "";
  // DstPort is the destination port of the connection.
  public DstPort: i32;
  // TCPVersion is the version of TCP (4 or 6).
  public TCPVersion: i32;
  // Operation denotes what network operation was performed (e.g. connect)
  public Operation: u32;
  // Action denotes what happened in response to the event
  public Action: u32;

  // Decodes SessionNetwork from an ArrayBuffer
  static decode(buf: ArrayBuffer): SessionNetwork {
    return SessionNetwork.decodeDataView(new DataView(buf));
  }

  // Decodes SessionNetwork from a DataView
  static decodeDataView(view: DataView): SessionNetwork {
    const decoder = new __proto.Decoder(view);
    const obj = new SessionNetwork();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.User = UserMetadata.decodeDataView(
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
          obj.Session = SessionMetadata.decodeDataView(
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
          obj.Server = ServerMetadata.decodeDataView(
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
          obj.BPF = BPFMetadata.decodeDataView(
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
          obj.SrcAddr = decoder.string();
          break;
        }
        case 7: {
          obj.DstAddr = decoder.string();
          break;
        }
        case 8: {
          obj.DstPort = decoder.int32();
          break;
        }
        case 9: {
          obj.TCPVersion = decoder.int32();
          break;
        }
        case 10: {
          obj.Operation = decoder.uint32();
          break;
        }
        case 11: {
          obj.Action = decoder.uint32();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode SessionNetwork

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Session != null) {
      const f: SessionMetadata = this.Session as SessionMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Server != null) {
      const f: ServerMetadata = this.Server as ServerMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.BPF != null) {
      const f: BPFMetadata = this.BPF as BPFMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.SrcAddr.length > 0
        ? 1 + __proto.Sizer.varint64(this.SrcAddr.length) + this.SrcAddr.length
        : 0;
    size +=
      this.DstAddr.length > 0
        ? 1 + __proto.Sizer.varint64(this.DstAddr.length) + this.DstAddr.length
        : 0;
    size += this.DstPort == 0 ? 0 : 1 + __proto.Sizer.int32(this.DstPort);
    size += this.TCPVersion == 0 ? 0 : 1 + __proto.Sizer.int32(this.TCPVersion);
    size += this.Operation == 0 ? 0 : 1 + __proto.Sizer.uint32(this.Operation);
    size += this.Action == 0 ? 0 : 1 + __proto.Sizer.uint32(this.Action);

    return size;
  }

  // Encodes SessionNetwork to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes SessionNetwork to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Session != null) {
      const f = this.Session as SessionMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Server != null) {
      const f = this.Server as ServerMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.BPF != null) {
      const f = this.BPF as BPFMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.SrcAddr.length > 0) {
      encoder.uint32(0x32);
      encoder.uint32(this.SrcAddr.length);
      encoder.string(this.SrcAddr);
    }
    if (this.DstAddr.length > 0) {
      encoder.uint32(0x3a);
      encoder.uint32(this.DstAddr.length);
      encoder.string(this.DstAddr);
    }
    if (this.DstPort != 0) {
      encoder.uint32(0x40);
      encoder.int32(this.DstPort);
    }
    if (this.TCPVersion != 0) {
      encoder.uint32(0x48);
      encoder.int32(this.TCPVersion);
    }
    if (this.Operation != 0) {
      encoder.uint32(0x50);
      encoder.uint32(this.Operation);
    }
    if (this.Action != 0) {
      encoder.uint32(0x58);
      encoder.uint32(this.Action);
    }

    return buf;
  } // encode SessionNetwork
} // SessionNetwork

// Operation is the network operation that was performed or attempted
export enum SessionNetwork_NetworkOperation {
  // TCP connection establishment or binding a UDP socket to a remote address
  CONNECT = 0,
  // Transmission of data to a remote endpoint
  SEND = 1,
} // SessionNetwork_NetworkOperation
// SessionData is emitted to report session data usage.
export class SessionData {
  // Metadata is a common event metadata
  public Metadata: Metadata = new Metadata();
  // User is a common user event metadata
  public User: UserMetadata = new UserMetadata();
  // SessionMetadata is a common event session metadata
  public Session: SessionMetadata = new SessionMetadata();
  // ServerMetadata is a common server metadata
  public Server: ServerMetadata = new ServerMetadata();
  // ConnectionMetadata holds information about the connection
  public Connection: ConnectionMetadata = new ConnectionMetadata();
  // BytesTransmitted is the amount of bytes transmitted
  public BytesTransmitted: u64;
  // BytesReceived is the amount of bytes received
  public BytesReceived: u64;

  // Decodes SessionData from an ArrayBuffer
  static decode(buf: ArrayBuffer): SessionData {
    return SessionData.decodeDataView(new DataView(buf));
  }

  // Decodes SessionData from a DataView
  static decodeDataView(view: DataView): SessionData {
    const decoder = new __proto.Decoder(view);
    const obj = new SessionData();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.User = UserMetadata.decodeDataView(
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
          obj.Session = SessionMetadata.decodeDataView(
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
          obj.Server = ServerMetadata.decodeDataView(
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
          obj.Connection = ConnectionMetadata.decodeDataView(
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
          obj.BytesTransmitted = decoder.uint64();
          break;
        }
        case 7: {
          obj.BytesReceived = decoder.uint64();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode SessionData

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Session != null) {
      const f: SessionMetadata = this.Session as SessionMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Server != null) {
      const f: ServerMetadata = this.Server as ServerMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Connection != null) {
      const f: ConnectionMetadata = this.Connection as ConnectionMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.BytesTransmitted == 0
        ? 0
        : 1 + __proto.Sizer.uint64(this.BytesTransmitted);
    size +=
      this.BytesReceived == 0
        ? 0
        : 1 + __proto.Sizer.uint64(this.BytesReceived);

    return size;
  }

  // Encodes SessionData to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes SessionData to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Session != null) {
      const f = this.Session as SessionMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Server != null) {
      const f = this.Server as ServerMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Connection != null) {
      const f = this.Connection as ConnectionMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.BytesTransmitted != 0) {
      encoder.uint32(0x30);
      encoder.uint64(this.BytesTransmitted);
    }
    if (this.BytesReceived != 0) {
      encoder.uint32(0x38);
      encoder.uint64(this.BytesReceived);
    }

    return buf;
  } // encode SessionData
} // SessionData

// SessionLeave is emitted to report that a user left the session
export class SessionLeave {
  // Metadata is a common event metadata
  public Metadata: Metadata = new Metadata();
  // User is a common user event metadata
  public User: UserMetadata = new UserMetadata();
  // SessionMetadata is a common event session metadata
  public Session: SessionMetadata = new SessionMetadata();
  // ServerMetadata is a common server metadata
  public Server: ServerMetadata = new ServerMetadata();
  // ConnectionMetadata holds information about the connection
  public Connection: ConnectionMetadata = new ConnectionMetadata();

  // Decodes SessionLeave from an ArrayBuffer
  static decode(buf: ArrayBuffer): SessionLeave {
    return SessionLeave.decodeDataView(new DataView(buf));
  }

  // Decodes SessionLeave from a DataView
  static decodeDataView(view: DataView): SessionLeave {
    const decoder = new __proto.Decoder(view);
    const obj = new SessionLeave();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.User = UserMetadata.decodeDataView(
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
          obj.Session = SessionMetadata.decodeDataView(
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
          obj.Server = ServerMetadata.decodeDataView(
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
          obj.Connection = ConnectionMetadata.decodeDataView(
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
  } // decode SessionLeave

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Session != null) {
      const f: SessionMetadata = this.Session as SessionMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Server != null) {
      const f: ServerMetadata = this.Server as ServerMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Connection != null) {
      const f: ConnectionMetadata = this.Connection as ConnectionMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes SessionLeave to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes SessionLeave to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Session != null) {
      const f = this.Session as SessionMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Server != null) {
      const f = this.Server as ServerMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Connection != null) {
      const f = this.Connection as ConnectionMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode SessionLeave
} // SessionLeave

// UserLogin records a successfull or failed user login event
export class UserLogin {
  // Metadata is a common event metadata
  public Metadata: Metadata = new Metadata();
  // User is a common user event metadata
  public User: UserMetadata = new UserMetadata();
  // Status contains common command or operation status fields
  public Status: Status = new Status();
  // Method is the event field indicating how the login was performed
  public Method: string = "";
  // IdentityAttributes is a map of user attributes received from identity provider
  public IdentityAttributes: google.protobuf.Struct =
    new google.protobuf.Struct();
  // MFA is the MFA device used during the login.
  public MFADevice: MFADeviceMetadata = new MFADeviceMetadata();

  // Decodes UserLogin from an ArrayBuffer
  static decode(buf: ArrayBuffer): UserLogin {
    return UserLogin.decodeDataView(new DataView(buf));
  }

  // Decodes UserLogin from a DataView
  static decodeDataView(view: DataView): UserLogin {
    const decoder = new __proto.Decoder(view);
    const obj = new UserLogin();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.User = UserMetadata.decodeDataView(
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
          obj.Status = Status.decodeDataView(
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
          obj.Method = decoder.string();
          break;
        }
        case 5: {
          const length = decoder.uint32();
          obj.IdentityAttributes = google.protobuf.Struct.decodeDataView(
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
          obj.MFADevice = MFADeviceMetadata.decodeDataView(
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
  } // decode UserLogin

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Status != null) {
      const f: Status = this.Status as Status;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.Method.length > 0
        ? 1 + __proto.Sizer.varint64(this.Method.length) + this.Method.length
        : 0;

    if (this.IdentityAttributes != null) {
      const f: google.protobuf.Struct = this
        .IdentityAttributes as google.protobuf.Struct;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.MFADevice != null) {
      const f: MFADeviceMetadata = this.MFADevice as MFADeviceMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes UserLogin to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes UserLogin to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Status != null) {
      const f = this.Status as Status;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Method.length > 0) {
      encoder.uint32(0x22);
      encoder.uint32(this.Method.length);
      encoder.string(this.Method);
    }

    if (this.IdentityAttributes != null) {
      const f = this.IdentityAttributes as google.protobuf.Struct;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.MFADevice != null) {
      const f = this.MFADevice as MFADeviceMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x32);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode UserLogin
} // UserLogin

// ResourceMetadata is a common resource metadata
export class ResourceMetadata {
  // ResourceName is a resource name
  public Name: string = "";
  // Expires is set if resource expires
  public Expires: google.protobuf.Timestamp = new google.protobuf.Timestamp();
  // UpdatedBy if set indicates the user who modified the resource
  public UpdatedBy: string = "";
  /**
   * TTL is a TTL of reset password token represented as duration, e.g. "10m"
   *  used for compatibility purposes for some events, Expires should be used instead
   *  as it's more useful (contains exact expiration date/time)
   */
  public TTL: string = "";

  // Decodes ResourceMetadata from an ArrayBuffer
  static decode(buf: ArrayBuffer): ResourceMetadata {
    return ResourceMetadata.decodeDataView(new DataView(buf));
  }

  // Decodes ResourceMetadata from a DataView
  static decodeDataView(view: DataView): ResourceMetadata {
    const decoder = new __proto.Decoder(view);
    const obj = new ResourceMetadata();

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
          obj.UpdatedBy = decoder.string();
          break;
        }
        case 4: {
          obj.TTL = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode ResourceMetadata

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Name.length > 0
        ? 1 + __proto.Sizer.varint64(this.Name.length) + this.Name.length
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
      this.UpdatedBy.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.UpdatedBy.length) +
          this.UpdatedBy.length
        : 0;
    size +=
      this.TTL.length > 0
        ? 1 + __proto.Sizer.varint64(this.TTL.length) + this.TTL.length
        : 0;

    return size;
  }

  // Encodes ResourceMetadata to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes ResourceMetadata to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Name.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Name.length);
      encoder.string(this.Name);
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

    if (this.UpdatedBy.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.UpdatedBy.length);
      encoder.string(this.UpdatedBy);
    }
    if (this.TTL.length > 0) {
      encoder.uint32(0x22);
      encoder.uint32(this.TTL.length);
      encoder.string(this.TTL);
    }

    return buf;
  } // encode ResourceMetadata
} // ResourceMetadata

// UserCreate is emitted when the user is created or updated (upsert).
export class UserCreate {
  // Metadata is a common event metadata
  public Metadata: Metadata = new Metadata();
  // User is a common user event metadata
  public User: UserMetadata = new UserMetadata();
  // ResourceMetadata is a common resource event metadata
  public Resource: ResourceMetadata = new ResourceMetadata();
  // Roles is a list of roles for the user.
  public Roles: Array<string> = new Array<string>();
  // Connector is the connector used to create the user.
  public Connector: string = "";

  // Decodes UserCreate from an ArrayBuffer
  static decode(buf: ArrayBuffer): UserCreate {
    return UserCreate.decodeDataView(new DataView(buf));
  }

  // Decodes UserCreate from a DataView
  static decodeDataView(view: DataView): UserCreate {
    const decoder = new __proto.Decoder(view);
    const obj = new UserCreate();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.User = UserMetadata.decodeDataView(
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
          obj.Resource = ResourceMetadata.decodeDataView(
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
          obj.Roles.push(decoder.string());
          break;
        }
        case 5: {
          obj.Connector = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode UserCreate

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Resource != null) {
      const f: ResourceMetadata = this.Resource as ResourceMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size += __size_string_repeated(this.Roles);

    size +=
      this.Connector.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.Connector.length) +
          this.Connector.length
        : 0;

    return size;
  }

  // Encodes UserCreate to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes UserCreate to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Resource != null) {
      const f = this.Resource as ResourceMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Roles.length > 0) {
      for (let n: i32 = 0; n < this.Roles.length; n++) {
        encoder.uint32(0x22);
        encoder.uint32(this.Roles[n].length);
        encoder.string(this.Roles[n]);
      }
    }

    if (this.Connector.length > 0) {
      encoder.uint32(0x2a);
      encoder.uint32(this.Connector.length);
      encoder.string(this.Connector);
    }

    return buf;
  } // encode UserCreate
} // UserCreate

// UserDelete is emitted when a user gets deleted
export class UserDelete {
  // Metadata is a common event metadata
  public Metadata: Metadata = new Metadata();
  // User is a common user event metadata
  public User: UserMetadata = new UserMetadata();
  // ResourceMetadata is a common resource event metadata
  public Resource: ResourceMetadata = new ResourceMetadata();

  // Decodes UserDelete from an ArrayBuffer
  static decode(buf: ArrayBuffer): UserDelete {
    return UserDelete.decodeDataView(new DataView(buf));
  }

  // Decodes UserDelete from a DataView
  static decodeDataView(view: DataView): UserDelete {
    const decoder = new __proto.Decoder(view);
    const obj = new UserDelete();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.User = UserMetadata.decodeDataView(
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
          obj.Resource = ResourceMetadata.decodeDataView(
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
  } // decode UserDelete

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Resource != null) {
      const f: ResourceMetadata = this.Resource as ResourceMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes UserDelete to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes UserDelete to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Resource != null) {
      const f = this.Resource as ResourceMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode UserDelete
} // UserDelete

// UserPasswordChange is emitted when the user changes their own password.
export class UserPasswordChange {
  // Metadata is a common event metadata
  public Metadata: Metadata = new Metadata();
  // User is a common user event metadata
  public User: UserMetadata = new UserMetadata();

  // Decodes UserPasswordChange from an ArrayBuffer
  static decode(buf: ArrayBuffer): UserPasswordChange {
    return UserPasswordChange.decodeDataView(new DataView(buf));
  }

  // Decodes UserPasswordChange from a DataView
  static decodeDataView(view: DataView): UserPasswordChange {
    const decoder = new __proto.Decoder(view);
    const obj = new UserPasswordChange();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.User = UserMetadata.decodeDataView(
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
  } // decode UserPasswordChange

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes UserPasswordChange to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes UserPasswordChange to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode UserPasswordChange
} // UserPasswordChange

// AccessRequestCreate is emitted when access request has been created or updated
export class AccessRequestCreate {
  // Metadata is a common event metadata
  public Metadata: Metadata = new Metadata();
  // User is a common user event metadata
  public User: UserMetadata = new UserMetadata();
  // ResourceMetadata is a common resource event metadata
  public Resource: ResourceMetadata = new ResourceMetadata();
  // Roles is a list of roles for the user.
  public Roles: Array<string> = new Array<string>();
  // RequestID is access request ID
  public RequestID: string = "";
  /**
   * RequestState is access request state (in the access_request.review variant of
   *  the event this represents the post-review state of the request).
   */
  public RequestState: string = "";
  /**
   * Delegator is used by teleport plugins to indicate the identity
   *  which caused them to update state.
   */
  public Delegator: string = "";
  /**
   * Reason is an optional description of why the request is being
   *  created or updated.
   */
  public Reason: string = "";
  /**
   * Annotations is an optional set of attributes supplied by a plugin during
   *  approval/denail of the request.
   */
  public Annotations: google.protobuf.Struct = new google.protobuf.Struct();
  // Reviewer is the author of the review (only used in the access_request.review event variant).
  public Reviewer: string = "";
  /**
   * ProposedState is the state proposed by a review (only used in the access_request.review event
   *  variant).
   */
  public ProposedState: string = "";

  // Decodes AccessRequestCreate from an ArrayBuffer
  static decode(buf: ArrayBuffer): AccessRequestCreate {
    return AccessRequestCreate.decodeDataView(new DataView(buf));
  }

  // Decodes AccessRequestCreate from a DataView
  static decodeDataView(view: DataView): AccessRequestCreate {
    const decoder = new __proto.Decoder(view);
    const obj = new AccessRequestCreate();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.User = UserMetadata.decodeDataView(
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
          obj.Resource = ResourceMetadata.decodeDataView(
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
          obj.Roles.push(decoder.string());
          break;
        }
        case 5: {
          obj.RequestID = decoder.string();
          break;
        }
        case 6: {
          obj.RequestState = decoder.string();
          break;
        }
        case 7: {
          obj.Delegator = decoder.string();
          break;
        }
        case 8: {
          obj.Reason = decoder.string();
          break;
        }
        case 9: {
          const length = decoder.uint32();
          obj.Annotations = google.protobuf.Struct.decodeDataView(
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
          obj.Reviewer = decoder.string();
          break;
        }
        case 11: {
          obj.ProposedState = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode AccessRequestCreate

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Resource != null) {
      const f: ResourceMetadata = this.Resource as ResourceMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size += __size_string_repeated(this.Roles);

    size +=
      this.RequestID.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.RequestID.length) +
          this.RequestID.length
        : 0;
    size +=
      this.RequestState.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.RequestState.length) +
          this.RequestState.length
        : 0;
    size +=
      this.Delegator.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.Delegator.length) +
          this.Delegator.length
        : 0;
    size +=
      this.Reason.length > 0
        ? 1 + __proto.Sizer.varint64(this.Reason.length) + this.Reason.length
        : 0;

    if (this.Annotations != null) {
      const f: google.protobuf.Struct = this
        .Annotations as google.protobuf.Struct;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.Reviewer.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.Reviewer.length) +
          this.Reviewer.length
        : 0;
    size +=
      this.ProposedState.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.ProposedState.length) +
          this.ProposedState.length
        : 0;

    return size;
  }

  // Encodes AccessRequestCreate to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes AccessRequestCreate to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Resource != null) {
      const f = this.Resource as ResourceMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Roles.length > 0) {
      for (let n: i32 = 0; n < this.Roles.length; n++) {
        encoder.uint32(0x22);
        encoder.uint32(this.Roles[n].length);
        encoder.string(this.Roles[n]);
      }
    }

    if (this.RequestID.length > 0) {
      encoder.uint32(0x2a);
      encoder.uint32(this.RequestID.length);
      encoder.string(this.RequestID);
    }
    if (this.RequestState.length > 0) {
      encoder.uint32(0x32);
      encoder.uint32(this.RequestState.length);
      encoder.string(this.RequestState);
    }
    if (this.Delegator.length > 0) {
      encoder.uint32(0x3a);
      encoder.uint32(this.Delegator.length);
      encoder.string(this.Delegator);
    }
    if (this.Reason.length > 0) {
      encoder.uint32(0x42);
      encoder.uint32(this.Reason.length);
      encoder.string(this.Reason);
    }

    if (this.Annotations != null) {
      const f = this.Annotations as google.protobuf.Struct;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x4a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Reviewer.length > 0) {
      encoder.uint32(0x52);
      encoder.uint32(this.Reviewer.length);
      encoder.string(this.Reviewer);
    }
    if (this.ProposedState.length > 0) {
      encoder.uint32(0x5a);
      encoder.uint32(this.ProposedState.length);
      encoder.string(this.ProposedState);
    }

    return buf;
  } // encode AccessRequestCreate
} // AccessRequestCreate

// AccessRequestDelete is emitted when an access request has been deleted.
export class AccessRequestDelete {
  // Metadata is a common event metadata
  public Metadata: Metadata = new Metadata();
  // User is a common user event metadata
  public User: UserMetadata = new UserMetadata();
  // RequestID is access request ID
  public RequestID: string = "";

  // Decodes AccessRequestDelete from an ArrayBuffer
  static decode(buf: ArrayBuffer): AccessRequestDelete {
    return AccessRequestDelete.decodeDataView(new DataView(buf));
  }

  // Decodes AccessRequestDelete from a DataView
  static decodeDataView(view: DataView): AccessRequestDelete {
    const decoder = new __proto.Decoder(view);
    const obj = new AccessRequestDelete();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.User = UserMetadata.decodeDataView(
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
          obj.RequestID = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode AccessRequestDelete

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.RequestID.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.RequestID.length) +
          this.RequestID.length
        : 0;

    return size;
  }

  // Encodes AccessRequestDelete to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes AccessRequestDelete to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.RequestID.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.RequestID.length);
      encoder.string(this.RequestID);
    }

    return buf;
  } // encode AccessRequestDelete
} // AccessRequestDelete

// PortForward is emitted when a user requests port forwarding.
export class PortForward {
  // Metadata is a common event metadata
  public Metadata: Metadata = new Metadata();
  // User is a common user event metadata
  public User: UserMetadata = new UserMetadata();
  // ConnectionMetadata holds information about the connection
  public Connection: ConnectionMetadata = new ConnectionMetadata();
  // Status contains operation success or failure status
  public Status: Status = new Status();
  // Addr is a target port forwarding address
  public Addr: string = "";

  // Decodes PortForward from an ArrayBuffer
  static decode(buf: ArrayBuffer): PortForward {
    return PortForward.decodeDataView(new DataView(buf));
  }

  // Decodes PortForward from a DataView
  static decodeDataView(view: DataView): PortForward {
    const decoder = new __proto.Decoder(view);
    const obj = new PortForward();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.User = UserMetadata.decodeDataView(
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
          obj.Connection = ConnectionMetadata.decodeDataView(
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
          obj.Status = Status.decodeDataView(
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
          obj.Addr = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode PortForward

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Connection != null) {
      const f: ConnectionMetadata = this.Connection as ConnectionMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Status != null) {
      const f: Status = this.Status as Status;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.Addr.length > 0
        ? 1 + __proto.Sizer.varint64(this.Addr.length) + this.Addr.length
        : 0;

    return size;
  }

  // Encodes PortForward to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes PortForward to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Connection != null) {
      const f = this.Connection as ConnectionMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Status != null) {
      const f = this.Status as Status;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Addr.length > 0) {
      encoder.uint32(0x2a);
      encoder.uint32(this.Addr.length);
      encoder.string(this.Addr);
    }

    return buf;
  } // encode PortForward
} // PortForward

// X11Forward is emitted when a user requests X11 protocol forwarding
export class X11Forward {
  // Metadata is a common event metadata
  public Metadata: Metadata = new Metadata();
  // User is a common user event metadata
  public User: UserMetadata = new UserMetadata();
  // ConnectionMetadata holds information about the connection
  public Connection: ConnectionMetadata = new ConnectionMetadata();
  // Status contains operation success or failure status
  public Status: Status = new Status();

  // Decodes X11Forward from an ArrayBuffer
  static decode(buf: ArrayBuffer): X11Forward {
    return X11Forward.decodeDataView(new DataView(buf));
  }

  // Decodes X11Forward from a DataView
  static decodeDataView(view: DataView): X11Forward {
    const decoder = new __proto.Decoder(view);
    const obj = new X11Forward();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.User = UserMetadata.decodeDataView(
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
          obj.Connection = ConnectionMetadata.decodeDataView(
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
          obj.Status = Status.decodeDataView(
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
  } // decode X11Forward

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Connection != null) {
      const f: ConnectionMetadata = this.Connection as ConnectionMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Status != null) {
      const f: Status = this.Status as Status;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes X11Forward to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes X11Forward to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Connection != null) {
      const f = this.Connection as ConnectionMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Status != null) {
      const f = this.Status as Status;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode X11Forward
} // X11Forward

// CommandMetadata specifies common command fields
export class CommandMetadata {
  // Command is the executed command name
  public Command: string = "";
  // ExitCode specifies command exit code
  public ExitCode: string = "";
  // Error is an optional exit error, set if command has failed
  public Error: string = "";

  // Decodes CommandMetadata from an ArrayBuffer
  static decode(buf: ArrayBuffer): CommandMetadata {
    return CommandMetadata.decodeDataView(new DataView(buf));
  }

  // Decodes CommandMetadata from a DataView
  static decodeDataView(view: DataView): CommandMetadata {
    const decoder = new __proto.Decoder(view);
    const obj = new CommandMetadata();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Command = decoder.string();
          break;
        }
        case 2: {
          obj.ExitCode = decoder.string();
          break;
        }
        case 3: {
          obj.Error = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode CommandMetadata

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Command.length > 0
        ? 1 + __proto.Sizer.varint64(this.Command.length) + this.Command.length
        : 0;
    size +=
      this.ExitCode.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.ExitCode.length) +
          this.ExitCode.length
        : 0;
    size +=
      this.Error.length > 0
        ? 1 + __proto.Sizer.varint64(this.Error.length) + this.Error.length
        : 0;

    return size;
  }

  // Encodes CommandMetadata to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes CommandMetadata to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Command.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Command.length);
      encoder.string(this.Command);
    }
    if (this.ExitCode.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.ExitCode.length);
      encoder.string(this.ExitCode);
    }
    if (this.Error.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Error.length);
      encoder.string(this.Error);
    }

    return buf;
  } // encode CommandMetadata
} // CommandMetadata

// Exec specifies command exec event
export class Exec {
  // Metadata is a common event metadata
  public Metadata: Metadata = new Metadata();
  // User is a common user event metadata
  public User: UserMetadata = new UserMetadata();
  // ConnectionMetadata holds information about the connection
  public Connection: ConnectionMetadata = new ConnectionMetadata();
  // SessionMetadata is a common event session metadata
  public Session: SessionMetadata = new SessionMetadata();
  // ServerMetadata is a common server metadata
  public Server: ServerMetadata = new ServerMetadata();
  // CommandMetadata is a common command metadata
  public Command: CommandMetadata = new CommandMetadata();
  /**
   * KubernetesCluster has information about a kubernetes cluster, if
   *  applicable.
   */
  public KubernetesCluster: KubernetesClusterMetadata =
    new KubernetesClusterMetadata();
  // KubernetesPod has information about a kubernetes pod, if applicable.
  public KubernetesPod: KubernetesPodMetadata = new KubernetesPodMetadata();

  // Decodes Exec from an ArrayBuffer
  static decode(buf: ArrayBuffer): Exec {
    return Exec.decodeDataView(new DataView(buf));
  }

  // Decodes Exec from a DataView
  static decodeDataView(view: DataView): Exec {
    const decoder = new __proto.Decoder(view);
    const obj = new Exec();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.User = UserMetadata.decodeDataView(
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
          obj.Connection = ConnectionMetadata.decodeDataView(
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
          obj.Session = SessionMetadata.decodeDataView(
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
          obj.Server = ServerMetadata.decodeDataView(
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
          obj.Command = CommandMetadata.decodeDataView(
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
          obj.KubernetesCluster = KubernetesClusterMetadata.decodeDataView(
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
          obj.KubernetesPod = KubernetesPodMetadata.decodeDataView(
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
  } // decode Exec

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Connection != null) {
      const f: ConnectionMetadata = this.Connection as ConnectionMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Session != null) {
      const f: SessionMetadata = this.Session as SessionMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Server != null) {
      const f: ServerMetadata = this.Server as ServerMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Command != null) {
      const f: CommandMetadata = this.Command as CommandMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.KubernetesCluster != null) {
      const f: KubernetesClusterMetadata = this
        .KubernetesCluster as KubernetesClusterMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.KubernetesPod != null) {
      const f: KubernetesPodMetadata = this
        .KubernetesPod as KubernetesPodMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes Exec to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes Exec to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Connection != null) {
      const f = this.Connection as ConnectionMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Session != null) {
      const f = this.Session as SessionMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Server != null) {
      const f = this.Server as ServerMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Command != null) {
      const f = this.Command as CommandMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x32);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.KubernetesCluster != null) {
      const f = this.KubernetesCluster as KubernetesClusterMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x3a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.KubernetesPod != null) {
      const f = this.KubernetesPod as KubernetesPodMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x42);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode Exec
} // Exec

// SCP is emitted when data transfer has occurred between server and client
export class SCP {
  // Metadata is a common event metadata
  public Metadata: Metadata = new Metadata();
  // User is a common user event metadata
  public User: UserMetadata = new UserMetadata();
  // ConnectionMetadata holds information about the connection
  public Connection: ConnectionMetadata = new ConnectionMetadata();
  // SessionMetadata is a common event session metadata
  public Session: SessionMetadata = new SessionMetadata();
  // ServerMetadata is a common server metadata
  public Server: ServerMetadata = new ServerMetadata();
  // CommandMetadata is a common command metadata
  public Command: CommandMetadata = new CommandMetadata();
  // Path is a copy path
  public Path: string = "";
  // Action is upload or download
  public Action: string = "";

  // Decodes SCP from an ArrayBuffer
  static decode(buf: ArrayBuffer): SCP {
    return SCP.decodeDataView(new DataView(buf));
  }

  // Decodes SCP from a DataView
  static decodeDataView(view: DataView): SCP {
    const decoder = new __proto.Decoder(view);
    const obj = new SCP();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.User = UserMetadata.decodeDataView(
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
          obj.Connection = ConnectionMetadata.decodeDataView(
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
          obj.Session = SessionMetadata.decodeDataView(
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
          obj.Server = ServerMetadata.decodeDataView(
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
          obj.Command = CommandMetadata.decodeDataView(
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
          obj.Path = decoder.string();
          break;
        }
        case 8: {
          obj.Action = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode SCP

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Connection != null) {
      const f: ConnectionMetadata = this.Connection as ConnectionMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Session != null) {
      const f: SessionMetadata = this.Session as SessionMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Server != null) {
      const f: ServerMetadata = this.Server as ServerMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Command != null) {
      const f: CommandMetadata = this.Command as CommandMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.Path.length > 0
        ? 1 + __proto.Sizer.varint64(this.Path.length) + this.Path.length
        : 0;
    size +=
      this.Action.length > 0
        ? 1 + __proto.Sizer.varint64(this.Action.length) + this.Action.length
        : 0;

    return size;
  }

  // Encodes SCP to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes SCP to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Connection != null) {
      const f = this.Connection as ConnectionMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Session != null) {
      const f = this.Session as SessionMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Server != null) {
      const f = this.Server as ServerMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Command != null) {
      const f = this.Command as CommandMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x32);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Path.length > 0) {
      encoder.uint32(0x3a);
      encoder.uint32(this.Path.length);
      encoder.string(this.Path);
    }
    if (this.Action.length > 0) {
      encoder.uint32(0x42);
      encoder.uint32(this.Action.length);
      encoder.string(this.Action);
    }

    return buf;
  } // encode SCP
} // SCP

// Subsystem is emitted when a user requests a new subsystem.
export class Subsystem {
  // Metadata is a common event metadata
  public Metadata: Metadata = new Metadata();
  // User is a common user event metadata
  public User: UserMetadata = new UserMetadata();
  // ConnectionMetadata holds information about the connection
  public Connection: ConnectionMetadata = new ConnectionMetadata();
  // Name is a subsystem name
  public Name: string = "";
  // Error contains error in case of unsucessfull attempt
  public Error: string = "";

  // Decodes Subsystem from an ArrayBuffer
  static decode(buf: ArrayBuffer): Subsystem {
    return Subsystem.decodeDataView(new DataView(buf));
  }

  // Decodes Subsystem from a DataView
  static decodeDataView(view: DataView): Subsystem {
    const decoder = new __proto.Decoder(view);
    const obj = new Subsystem();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.User = UserMetadata.decodeDataView(
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
          obj.Connection = ConnectionMetadata.decodeDataView(
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
          obj.Name = decoder.string();
          break;
        }
        case 5: {
          obj.Error = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode Subsystem

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Connection != null) {
      const f: ConnectionMetadata = this.Connection as ConnectionMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.Name.length > 0
        ? 1 + __proto.Sizer.varint64(this.Name.length) + this.Name.length
        : 0;
    size +=
      this.Error.length > 0
        ? 1 + __proto.Sizer.varint64(this.Error.length) + this.Error.length
        : 0;

    return size;
  }

  // Encodes Subsystem to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes Subsystem to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Connection != null) {
      const f = this.Connection as ConnectionMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Name.length > 0) {
      encoder.uint32(0x22);
      encoder.uint32(this.Name.length);
      encoder.string(this.Name);
    }
    if (this.Error.length > 0) {
      encoder.uint32(0x2a);
      encoder.uint32(this.Error.length);
      encoder.string(this.Error);
    }

    return buf;
  } // encode Subsystem
} // Subsystem

/**
 * ClientDisconnect is emitted when client is disconnected
 *  by the server due to inactivity or any other reason
 */
export class ClientDisconnect {
  // Metadata is a common event metadata
  public Metadata: Metadata = new Metadata();
  // User is a common user event metadata
  public User: UserMetadata = new UserMetadata();
  // ConnectionMetadata holds information about the connection
  public Connection: ConnectionMetadata = new ConnectionMetadata();
  // ServerMetadata is a common server metadata
  public Server: ServerMetadata = new ServerMetadata();
  /**
   * Reason is a field that specifies reason for event, e.g. in disconnect
   *  event it explains why server disconnected the client
   */
  public Reason: string = "";

  // Decodes ClientDisconnect from an ArrayBuffer
  static decode(buf: ArrayBuffer): ClientDisconnect {
    return ClientDisconnect.decodeDataView(new DataView(buf));
  }

  // Decodes ClientDisconnect from a DataView
  static decodeDataView(view: DataView): ClientDisconnect {
    const decoder = new __proto.Decoder(view);
    const obj = new ClientDisconnect();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.User = UserMetadata.decodeDataView(
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
          obj.Connection = ConnectionMetadata.decodeDataView(
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
          obj.Server = ServerMetadata.decodeDataView(
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
          obj.Reason = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode ClientDisconnect

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Connection != null) {
      const f: ConnectionMetadata = this.Connection as ConnectionMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Server != null) {
      const f: ServerMetadata = this.Server as ServerMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.Reason.length > 0
        ? 1 + __proto.Sizer.varint64(this.Reason.length) + this.Reason.length
        : 0;

    return size;
  }

  // Encodes ClientDisconnect to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes ClientDisconnect to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Connection != null) {
      const f = this.Connection as ConnectionMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Server != null) {
      const f = this.Server as ServerMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Reason.length > 0) {
      encoder.uint32(0x2a);
      encoder.uint32(this.Reason.length);
      encoder.string(this.Reason);
    }

    return buf;
  } // encode ClientDisconnect
} // ClientDisconnect

// AuthAttempt is emitted upon a failed or successfull authentication attempt.
export class AuthAttempt {
  // Metadata is a common event metadata
  public Metadata: Metadata = new Metadata();
  // User is a common user event metadata
  public User: UserMetadata = new UserMetadata();
  // ConnectionMetadata holds information about the connection
  public Connection: ConnectionMetadata = new ConnectionMetadata();
  // Status contains common command or operation status fields
  public Status: Status = new Status();

  // Decodes AuthAttempt from an ArrayBuffer
  static decode(buf: ArrayBuffer): AuthAttempt {
    return AuthAttempt.decodeDataView(new DataView(buf));
  }

  // Decodes AuthAttempt from a DataView
  static decodeDataView(view: DataView): AuthAttempt {
    const decoder = new __proto.Decoder(view);
    const obj = new AuthAttempt();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.User = UserMetadata.decodeDataView(
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
          obj.Connection = ConnectionMetadata.decodeDataView(
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
          obj.Status = Status.decodeDataView(
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
  } // decode AuthAttempt

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Connection != null) {
      const f: ConnectionMetadata = this.Connection as ConnectionMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Status != null) {
      const f: Status = this.Status as Status;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes AuthAttempt to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes AuthAttempt to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Connection != null) {
      const f = this.Connection as ConnectionMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Status != null) {
      const f = this.Status as Status;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode AuthAttempt
} // AuthAttempt

// UserTokenCreate is emitted when a user token is created.
export class UserTokenCreate {
  // Metadata is a common event metadata
  public Metadata: Metadata = new Metadata();
  // ResourceMetadata is a common resource event metadata
  public Resource: ResourceMetadata = new ResourceMetadata();
  // User is a common user event metadata
  public User: UserMetadata = new UserMetadata();

  // Decodes UserTokenCreate from an ArrayBuffer
  static decode(buf: ArrayBuffer): UserTokenCreate {
    return UserTokenCreate.decodeDataView(new DataView(buf));
  }

  // Decodes UserTokenCreate from a DataView
  static decodeDataView(view: DataView): UserTokenCreate {
    const decoder = new __proto.Decoder(view);
    const obj = new UserTokenCreate();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.Resource = ResourceMetadata.decodeDataView(
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
          obj.User = UserMetadata.decodeDataView(
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
  } // decode UserTokenCreate

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Resource != null) {
      const f: ResourceMetadata = this.Resource as ResourceMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes UserTokenCreate to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes UserTokenCreate to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Resource != null) {
      const f = this.Resource as ResourceMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode UserTokenCreate
} // UserTokenCreate

// RoleCreate is emitted when a role is created/updated.
export class RoleCreate {
  // Metadata is a common event metadata
  public Metadata: Metadata = new Metadata();
  // ResourceMetadata is a common resource event metadata
  public Resource: ResourceMetadata = new ResourceMetadata();
  // User is a common user event metadata
  public User: UserMetadata = new UserMetadata();

  // Decodes RoleCreate from an ArrayBuffer
  static decode(buf: ArrayBuffer): RoleCreate {
    return RoleCreate.decodeDataView(new DataView(buf));
  }

  // Decodes RoleCreate from a DataView
  static decodeDataView(view: DataView): RoleCreate {
    const decoder = new __proto.Decoder(view);
    const obj = new RoleCreate();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.Resource = ResourceMetadata.decodeDataView(
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
          obj.User = UserMetadata.decodeDataView(
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
  } // decode RoleCreate

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Resource != null) {
      const f: ResourceMetadata = this.Resource as ResourceMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes RoleCreate to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes RoleCreate to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Resource != null) {
      const f = this.Resource as ResourceMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode RoleCreate
} // RoleCreate

// RoleDelete is emitted when a role is deleted
export class RoleDelete {
  // Metadata is a common event metadata
  public Metadata: Metadata = new Metadata();
  // ResourceMetadata is a common resource event metadata
  public Resource: ResourceMetadata = new ResourceMetadata();
  // User is a common user event metadata
  public User: UserMetadata = new UserMetadata();

  // Decodes RoleDelete from an ArrayBuffer
  static decode(buf: ArrayBuffer): RoleDelete {
    return RoleDelete.decodeDataView(new DataView(buf));
  }

  // Decodes RoleDelete from a DataView
  static decodeDataView(view: DataView): RoleDelete {
    const decoder = new __proto.Decoder(view);
    const obj = new RoleDelete();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.Resource = ResourceMetadata.decodeDataView(
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
          obj.User = UserMetadata.decodeDataView(
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
  } // decode RoleDelete

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Resource != null) {
      const f: ResourceMetadata = this.Resource as ResourceMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes RoleDelete to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes RoleDelete to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Resource != null) {
      const f = this.Resource as ResourceMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode RoleDelete
} // RoleDelete

// TrustedClusterCreate is the event for creating a trusted cluster.
export class TrustedClusterCreate {
  // Metadata is a common event metadata
  public Metadata: Metadata = new Metadata();
  // ResourceMetadata is a common resource event metadata
  public Resource: ResourceMetadata = new ResourceMetadata();
  // User is a common user event metadata
  public User: UserMetadata = new UserMetadata();

  // Decodes TrustedClusterCreate from an ArrayBuffer
  static decode(buf: ArrayBuffer): TrustedClusterCreate {
    return TrustedClusterCreate.decodeDataView(new DataView(buf));
  }

  // Decodes TrustedClusterCreate from a DataView
  static decodeDataView(view: DataView): TrustedClusterCreate {
    const decoder = new __proto.Decoder(view);
    const obj = new TrustedClusterCreate();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.Resource = ResourceMetadata.decodeDataView(
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
          obj.User = UserMetadata.decodeDataView(
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
  } // decode TrustedClusterCreate

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Resource != null) {
      const f: ResourceMetadata = this.Resource as ResourceMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes TrustedClusterCreate to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes TrustedClusterCreate to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Resource != null) {
      const f = this.Resource as ResourceMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode TrustedClusterCreate
} // TrustedClusterCreate

// TrustedClusterDelete is the event for removing a trusted cluster.
export class TrustedClusterDelete {
  // Metadata is a common event metadata
  public Metadata: Metadata = new Metadata();
  // ResourceMetadata is a common resource event metadata
  public Resource: ResourceMetadata = new ResourceMetadata();
  // User is a common user event metadata
  public User: UserMetadata = new UserMetadata();

  // Decodes TrustedClusterDelete from an ArrayBuffer
  static decode(buf: ArrayBuffer): TrustedClusterDelete {
    return TrustedClusterDelete.decodeDataView(new DataView(buf));
  }

  // Decodes TrustedClusterDelete from a DataView
  static decodeDataView(view: DataView): TrustedClusterDelete {
    const decoder = new __proto.Decoder(view);
    const obj = new TrustedClusterDelete();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.Resource = ResourceMetadata.decodeDataView(
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
          obj.User = UserMetadata.decodeDataView(
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
  } // decode TrustedClusterDelete

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Resource != null) {
      const f: ResourceMetadata = this.Resource as ResourceMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes TrustedClusterDelete to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes TrustedClusterDelete to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Resource != null) {
      const f = this.Resource as ResourceMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode TrustedClusterDelete
} // TrustedClusterDelete

/**
 * TrustedClusterTokenCreate is the event for
 *  creating new join token for a trusted cluster.
 */
export class TrustedClusterTokenCreate {
  // Metadata is a common event metadata
  public Metadata: Metadata = new Metadata();
  // ResourceMetadata is a common resource event metadata
  public Resource: ResourceMetadata = new ResourceMetadata();
  // User is a common user event metadata
  public User: UserMetadata = new UserMetadata();

  // Decodes TrustedClusterTokenCreate from an ArrayBuffer
  static decode(buf: ArrayBuffer): TrustedClusterTokenCreate {
    return TrustedClusterTokenCreate.decodeDataView(new DataView(buf));
  }

  // Decodes TrustedClusterTokenCreate from a DataView
  static decodeDataView(view: DataView): TrustedClusterTokenCreate {
    const decoder = new __proto.Decoder(view);
    const obj = new TrustedClusterTokenCreate();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.Resource = ResourceMetadata.decodeDataView(
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
          obj.User = UserMetadata.decodeDataView(
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
  } // decode TrustedClusterTokenCreate

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Resource != null) {
      const f: ResourceMetadata = this.Resource as ResourceMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes TrustedClusterTokenCreate to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes TrustedClusterTokenCreate to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Resource != null) {
      const f = this.Resource as ResourceMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode TrustedClusterTokenCreate
} // TrustedClusterTokenCreate

// GithubConnectorCreate fires when a Github connector is created/updated.
export class GithubConnectorCreate {
  // Metadata is a common event metadata
  public Metadata: Metadata = new Metadata();
  // ResourceMetadata is a common resource event metadata
  public Resource: ResourceMetadata = new ResourceMetadata();
  // User is a common user event metadata
  public User: UserMetadata = new UserMetadata();

  // Decodes GithubConnectorCreate from an ArrayBuffer
  static decode(buf: ArrayBuffer): GithubConnectorCreate {
    return GithubConnectorCreate.decodeDataView(new DataView(buf));
  }

  // Decodes GithubConnectorCreate from a DataView
  static decodeDataView(view: DataView): GithubConnectorCreate {
    const decoder = new __proto.Decoder(view);
    const obj = new GithubConnectorCreate();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.Resource = ResourceMetadata.decodeDataView(
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
          obj.User = UserMetadata.decodeDataView(
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
  } // decode GithubConnectorCreate

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Resource != null) {
      const f: ResourceMetadata = this.Resource as ResourceMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes GithubConnectorCreate to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes GithubConnectorCreate to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Resource != null) {
      const f = this.Resource as ResourceMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode GithubConnectorCreate
} // GithubConnectorCreate

// GithubConnectorDelete fires when a Github connector is deleted.
export class GithubConnectorDelete {
  // Metadata is a common event metadata
  public Metadata: Metadata = new Metadata();
  // ResourceMetadata is a common resource event metadata
  public Resource: ResourceMetadata = new ResourceMetadata();
  // User is a common user event metadata
  public User: UserMetadata = new UserMetadata();

  // Decodes GithubConnectorDelete from an ArrayBuffer
  static decode(buf: ArrayBuffer): GithubConnectorDelete {
    return GithubConnectorDelete.decodeDataView(new DataView(buf));
  }

  // Decodes GithubConnectorDelete from a DataView
  static decodeDataView(view: DataView): GithubConnectorDelete {
    const decoder = new __proto.Decoder(view);
    const obj = new GithubConnectorDelete();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.Resource = ResourceMetadata.decodeDataView(
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
          obj.User = UserMetadata.decodeDataView(
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
  } // decode GithubConnectorDelete

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Resource != null) {
      const f: ResourceMetadata = this.Resource as ResourceMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes GithubConnectorDelete to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes GithubConnectorDelete to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Resource != null) {
      const f = this.Resource as ResourceMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode GithubConnectorDelete
} // GithubConnectorDelete

// OIDCConnectorCreate fires when OIDC connector is created/updated.
export class OIDCConnectorCreate {
  // Metadata is a common event metadata
  public Metadata: Metadata = new Metadata();
  // ResourceMetadata is a common resource event metadata
  public Resource: ResourceMetadata = new ResourceMetadata();
  // User is a common user event metadata
  public User: UserMetadata = new UserMetadata();

  // Decodes OIDCConnectorCreate from an ArrayBuffer
  static decode(buf: ArrayBuffer): OIDCConnectorCreate {
    return OIDCConnectorCreate.decodeDataView(new DataView(buf));
  }

  // Decodes OIDCConnectorCreate from a DataView
  static decodeDataView(view: DataView): OIDCConnectorCreate {
    const decoder = new __proto.Decoder(view);
    const obj = new OIDCConnectorCreate();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.Resource = ResourceMetadata.decodeDataView(
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
          obj.User = UserMetadata.decodeDataView(
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
  } // decode OIDCConnectorCreate

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Resource != null) {
      const f: ResourceMetadata = this.Resource as ResourceMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes OIDCConnectorCreate to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes OIDCConnectorCreate to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Resource != null) {
      const f = this.Resource as ResourceMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode OIDCConnectorCreate
} // OIDCConnectorCreate

// OIDCConnectorDelete fires when OIDC connector is deleted.
export class OIDCConnectorDelete {
  // Metadata is a common event metadata
  public Metadata: Metadata = new Metadata();
  // ResourceMetadata is a common resource event metadata
  public Resource: ResourceMetadata = new ResourceMetadata();
  // User is a common user event metadata
  public User: UserMetadata = new UserMetadata();

  // Decodes OIDCConnectorDelete from an ArrayBuffer
  static decode(buf: ArrayBuffer): OIDCConnectorDelete {
    return OIDCConnectorDelete.decodeDataView(new DataView(buf));
  }

  // Decodes OIDCConnectorDelete from a DataView
  static decodeDataView(view: DataView): OIDCConnectorDelete {
    const decoder = new __proto.Decoder(view);
    const obj = new OIDCConnectorDelete();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.Resource = ResourceMetadata.decodeDataView(
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
          obj.User = UserMetadata.decodeDataView(
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
  } // decode OIDCConnectorDelete

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Resource != null) {
      const f: ResourceMetadata = this.Resource as ResourceMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes OIDCConnectorDelete to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes OIDCConnectorDelete to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Resource != null) {
      const f = this.Resource as ResourceMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode OIDCConnectorDelete
} // OIDCConnectorDelete

// SAMLConnectorCreate fires when SAML connector is created/updated.
export class SAMLConnectorCreate {
  // Metadata is a common event metadata
  public Metadata: Metadata = new Metadata();
  // ResourceMetadata is a common resource event metadata
  public Resource: ResourceMetadata = new ResourceMetadata();
  // User is a common user event metadata
  public User: UserMetadata = new UserMetadata();

  // Decodes SAMLConnectorCreate from an ArrayBuffer
  static decode(buf: ArrayBuffer): SAMLConnectorCreate {
    return SAMLConnectorCreate.decodeDataView(new DataView(buf));
  }

  // Decodes SAMLConnectorCreate from a DataView
  static decodeDataView(view: DataView): SAMLConnectorCreate {
    const decoder = new __proto.Decoder(view);
    const obj = new SAMLConnectorCreate();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.Resource = ResourceMetadata.decodeDataView(
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
          obj.User = UserMetadata.decodeDataView(
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
  } // decode SAMLConnectorCreate

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Resource != null) {
      const f: ResourceMetadata = this.Resource as ResourceMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes SAMLConnectorCreate to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes SAMLConnectorCreate to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Resource != null) {
      const f = this.Resource as ResourceMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode SAMLConnectorCreate
} // SAMLConnectorCreate

// SAMLConnectorDelete fires when SAML connector is deleted.
export class SAMLConnectorDelete {
  // Metadata is a common event metadata
  public Metadata: Metadata = new Metadata();
  // ResourceMetadata is a common resource event metadata
  public Resource: ResourceMetadata = new ResourceMetadata();
  // User is a common user event metadata
  public User: UserMetadata = new UserMetadata();

  // Decodes SAMLConnectorDelete from an ArrayBuffer
  static decode(buf: ArrayBuffer): SAMLConnectorDelete {
    return SAMLConnectorDelete.decodeDataView(new DataView(buf));
  }

  // Decodes SAMLConnectorDelete from a DataView
  static decodeDataView(view: DataView): SAMLConnectorDelete {
    const decoder = new __proto.Decoder(view);
    const obj = new SAMLConnectorDelete();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.Resource = ResourceMetadata.decodeDataView(
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
          obj.User = UserMetadata.decodeDataView(
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
  } // decode SAMLConnectorDelete

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Resource != null) {
      const f: ResourceMetadata = this.Resource as ResourceMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes SAMLConnectorDelete to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes SAMLConnectorDelete to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Resource != null) {
      const f = this.Resource as ResourceMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode SAMLConnectorDelete
} // SAMLConnectorDelete

// KubeRequest specifies a Kubernetes API request event.
export class KubeRequest {
  // Metadata is a common event metadata
  public Metadata: Metadata = new Metadata();
  // User is a common user event metadata
  public User: UserMetadata = new UserMetadata();
  // ConnectionMetadata holds information about the connection
  public Connection: ConnectionMetadata = new ConnectionMetadata();
  // ServerMetadata is a common server metadata
  public Server: ServerMetadata = new ServerMetadata();
  // RequestPath is the raw request URL path.
  public RequestPath: string = "";
  // Verb is the HTTP verb used for this request (e.g. GET, POST, etc)
  public Verb: string = "";
  // ResourceAPIGroup is the resource API group.
  public ResourceAPIGroup: string = "";
  // ResourceNamespace is the resource namespace.
  public ResourceNamespace: string = "";
  // ResourceKind is the API resource kind (e.g. "pod", "service", etc).
  public ResourceKind: string = "";
  // ResourceName is the API resource name.
  public ResourceName: string = "";
  // ResponseCode is the HTTP response code for this request.
  public ResponseCode: i32;
  // Kubernetes has information about a kubernetes cluster, if applicable.
  public Kubernetes: KubernetesClusterMetadata =
    new KubernetesClusterMetadata();

  // Decodes KubeRequest from an ArrayBuffer
  static decode(buf: ArrayBuffer): KubeRequest {
    return KubeRequest.decodeDataView(new DataView(buf));
  }

  // Decodes KubeRequest from a DataView
  static decodeDataView(view: DataView): KubeRequest {
    const decoder = new __proto.Decoder(view);
    const obj = new KubeRequest();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.User = UserMetadata.decodeDataView(
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
          obj.Connection = ConnectionMetadata.decodeDataView(
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
          obj.Server = ServerMetadata.decodeDataView(
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
          obj.RequestPath = decoder.string();
          break;
        }
        case 6: {
          obj.Verb = decoder.string();
          break;
        }
        case 7: {
          obj.ResourceAPIGroup = decoder.string();
          break;
        }
        case 8: {
          obj.ResourceNamespace = decoder.string();
          break;
        }
        case 9: {
          obj.ResourceKind = decoder.string();
          break;
        }
        case 10: {
          obj.ResourceName = decoder.string();
          break;
        }
        case 11: {
          obj.ResponseCode = decoder.int32();
          break;
        }
        case 12: {
          const length = decoder.uint32();
          obj.Kubernetes = KubernetesClusterMetadata.decodeDataView(
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
  } // decode KubeRequest

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Connection != null) {
      const f: ConnectionMetadata = this.Connection as ConnectionMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Server != null) {
      const f: ServerMetadata = this.Server as ServerMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.RequestPath.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.RequestPath.length) +
          this.RequestPath.length
        : 0;
    size +=
      this.Verb.length > 0
        ? 1 + __proto.Sizer.varint64(this.Verb.length) + this.Verb.length
        : 0;
    size +=
      this.ResourceAPIGroup.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.ResourceAPIGroup.length) +
          this.ResourceAPIGroup.length
        : 0;
    size +=
      this.ResourceNamespace.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.ResourceNamespace.length) +
          this.ResourceNamespace.length
        : 0;
    size +=
      this.ResourceKind.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.ResourceKind.length) +
          this.ResourceKind.length
        : 0;
    size +=
      this.ResourceName.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.ResourceName.length) +
          this.ResourceName.length
        : 0;
    size +=
      this.ResponseCode == 0 ? 0 : 1 + __proto.Sizer.int32(this.ResponseCode);

    if (this.Kubernetes != null) {
      const f: KubernetesClusterMetadata = this
        .Kubernetes as KubernetesClusterMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes KubeRequest to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes KubeRequest to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Connection != null) {
      const f = this.Connection as ConnectionMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Server != null) {
      const f = this.Server as ServerMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.RequestPath.length > 0) {
      encoder.uint32(0x2a);
      encoder.uint32(this.RequestPath.length);
      encoder.string(this.RequestPath);
    }
    if (this.Verb.length > 0) {
      encoder.uint32(0x32);
      encoder.uint32(this.Verb.length);
      encoder.string(this.Verb);
    }
    if (this.ResourceAPIGroup.length > 0) {
      encoder.uint32(0x3a);
      encoder.uint32(this.ResourceAPIGroup.length);
      encoder.string(this.ResourceAPIGroup);
    }
    if (this.ResourceNamespace.length > 0) {
      encoder.uint32(0x42);
      encoder.uint32(this.ResourceNamespace.length);
      encoder.string(this.ResourceNamespace);
    }
    if (this.ResourceKind.length > 0) {
      encoder.uint32(0x4a);
      encoder.uint32(this.ResourceKind.length);
      encoder.string(this.ResourceKind);
    }
    if (this.ResourceName.length > 0) {
      encoder.uint32(0x52);
      encoder.uint32(this.ResourceName.length);
      encoder.string(this.ResourceName);
    }
    if (this.ResponseCode != 0) {
      encoder.uint32(0x58);
      encoder.int32(this.ResponseCode);
    }

    if (this.Kubernetes != null) {
      const f = this.Kubernetes as KubernetesClusterMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x62);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode KubeRequest
} // KubeRequest

// AppMetadata contains common application information.
export class AppMetadata {
  // AppURI is the application endpoint.
  public AppURI: string = "";
  // AppPublicAddr is the configured application public address.
  public AppPublicAddr: string = "";
  // AppLabels are the configured application labels.
  public AppLabels: Map<string, string> = new Map<string, string>();
  // AppName is the configured application name.
  public AppName: string = "";

  // Decodes AppMetadata from an ArrayBuffer
  static decode(buf: ArrayBuffer): AppMetadata {
    return AppMetadata.decodeDataView(new DataView(buf));
  }

  // Decodes AppMetadata from a DataView
  static decodeDataView(view: DataView): AppMetadata {
    const decoder = new __proto.Decoder(view);
    const obj = new AppMetadata();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.AppURI = decoder.string();
          break;
        }
        case 2: {
          obj.AppPublicAddr = decoder.string();
          break;
        }
        case 3: {
          const length = decoder.uint32();
          __decodeMap_string_string(decoder, length, obj.AppLabels);
          decoder.skip(length);

          break;
        }
        case 4: {
          obj.AppName = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode AppMetadata

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.AppURI.length > 0
        ? 1 + __proto.Sizer.varint64(this.AppURI.length) + this.AppURI.length
        : 0;
    size +=
      this.AppPublicAddr.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.AppPublicAddr.length) +
          this.AppPublicAddr.length
        : 0;

    if (this.AppLabels.size > 0) {
      const keys = this.AppLabels.keys();

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = this.AppLabels.get(key);
        const itemSize = __sizeMapEntry_string_string(key, value);
        if (itemSize > 0) {
          size += 1 + __proto.Sizer.varint64(itemSize) + itemSize;
        }
      }
    }

    size +=
      this.AppName.length > 0
        ? 1 + __proto.Sizer.varint64(this.AppName.length) + this.AppName.length
        : 0;

    return size;
  }

  // Encodes AppMetadata to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes AppMetadata to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.AppURI.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.AppURI.length);
      encoder.string(this.AppURI);
    }
    if (this.AppPublicAddr.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.AppPublicAddr.length);
      encoder.string(this.AppPublicAddr);
    }

    if (this.AppLabels.size > 0) {
      const keys = this.AppLabels.keys();
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = this.AppLabels.get(key);
        const size = __sizeMapEntry_string_string(key, value);
        if (size > 0) {
          encoder.uint32(0x1a);
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

    if (this.AppName.length > 0) {
      encoder.uint32(0x22);
      encoder.uint32(this.AppName.length);
      encoder.string(this.AppName);
    }

    return buf;
  } // encode AppMetadata
} // AppMetadata

// AppCreate is emitted when a new application resource is created.
export class AppCreate {
  // Metadata is a common event metadata.
  public Metadata: Metadata = new Metadata();
  // User is a common user event metadata.
  public User: UserMetadata = new UserMetadata();
  // ResourceMetadata is a common resource event metadata.
  public Resource: ResourceMetadata = new ResourceMetadata();
  // AppMetadata is a common application resource metadata.
  public App: AppMetadata = new AppMetadata();

  // Decodes AppCreate from an ArrayBuffer
  static decode(buf: ArrayBuffer): AppCreate {
    return AppCreate.decodeDataView(new DataView(buf));
  }

  // Decodes AppCreate from a DataView
  static decodeDataView(view: DataView): AppCreate {
    const decoder = new __proto.Decoder(view);
    const obj = new AppCreate();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.User = UserMetadata.decodeDataView(
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
          obj.Resource = ResourceMetadata.decodeDataView(
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
          obj.App = AppMetadata.decodeDataView(
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
  } // decode AppCreate

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Resource != null) {
      const f: ResourceMetadata = this.Resource as ResourceMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.App != null) {
      const f: AppMetadata = this.App as AppMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes AppCreate to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes AppCreate to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Resource != null) {
      const f = this.Resource as ResourceMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.App != null) {
      const f = this.App as AppMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode AppCreate
} // AppCreate

// AppUpdate is emitted when an existing application resource is updated.
export class AppUpdate {
  // Metadata is a common event metadata.
  public Metadata: Metadata = new Metadata();
  // User is a common user event metadata.
  public User: UserMetadata = new UserMetadata();
  // ResourceMetadata is a common resource event metadata.
  public Resource: ResourceMetadata = new ResourceMetadata();
  // AppMetadata is a common application resource metadata.
  public App: AppMetadata = new AppMetadata();

  // Decodes AppUpdate from an ArrayBuffer
  static decode(buf: ArrayBuffer): AppUpdate {
    return AppUpdate.decodeDataView(new DataView(buf));
  }

  // Decodes AppUpdate from a DataView
  static decodeDataView(view: DataView): AppUpdate {
    const decoder = new __proto.Decoder(view);
    const obj = new AppUpdate();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.User = UserMetadata.decodeDataView(
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
          obj.Resource = ResourceMetadata.decodeDataView(
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
          obj.App = AppMetadata.decodeDataView(
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
  } // decode AppUpdate

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Resource != null) {
      const f: ResourceMetadata = this.Resource as ResourceMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.App != null) {
      const f: AppMetadata = this.App as AppMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes AppUpdate to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes AppUpdate to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Resource != null) {
      const f = this.Resource as ResourceMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.App != null) {
      const f = this.App as AppMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode AppUpdate
} // AppUpdate

// AppDelete is emitted when an application resource is deleted.
export class AppDelete {
  // Metadata is a common event metadata.
  public Metadata: Metadata = new Metadata();
  // User is a common user event metadata.
  public User: UserMetadata = new UserMetadata();
  // ResourceMetadata is a common resource event metadata.
  public Resource: ResourceMetadata = new ResourceMetadata();

  // Decodes AppDelete from an ArrayBuffer
  static decode(buf: ArrayBuffer): AppDelete {
    return AppDelete.decodeDataView(new DataView(buf));
  }

  // Decodes AppDelete from a DataView
  static decodeDataView(view: DataView): AppDelete {
    const decoder = new __proto.Decoder(view);
    const obj = new AppDelete();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.User = UserMetadata.decodeDataView(
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
          obj.Resource = ResourceMetadata.decodeDataView(
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
  } // decode AppDelete

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Resource != null) {
      const f: ResourceMetadata = this.Resource as ResourceMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes AppDelete to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes AppDelete to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Resource != null) {
      const f = this.Resource as ResourceMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode AppDelete
} // AppDelete

// AppSessionStart is emitted when a user is issued an application certificate.
export class AppSessionStart {
  // Metadata is a common event metadata
  public Metadata: Metadata = new Metadata();
  // User is a common user event metadata
  public User: UserMetadata = new UserMetadata();
  // SessionMetadata is a common event session metadata
  public Session: SessionMetadata = new SessionMetadata();
  // ServerMetadata is a common server metadata
  public Server: ServerMetadata = new ServerMetadata();
  // ConnectionMetadata holds information about the connection
  public Connection: ConnectionMetadata = new ConnectionMetadata();
  /**
   * PublicAddr is the public address of the application being requested.
   *  DELETE IN 10.0: this information is also present on the AppMetadata.
   */
  public PublicAddr: string = "";
  // App is a common application resource metadata.
  public App: AppMetadata = new AppMetadata();

  // Decodes AppSessionStart from an ArrayBuffer
  static decode(buf: ArrayBuffer): AppSessionStart {
    return AppSessionStart.decodeDataView(new DataView(buf));
  }

  // Decodes AppSessionStart from a DataView
  static decodeDataView(view: DataView): AppSessionStart {
    const decoder = new __proto.Decoder(view);
    const obj = new AppSessionStart();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.User = UserMetadata.decodeDataView(
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
          obj.Session = SessionMetadata.decodeDataView(
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
          obj.Server = ServerMetadata.decodeDataView(
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
          obj.Connection = ConnectionMetadata.decodeDataView(
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
          obj.PublicAddr = decoder.string();
          break;
        }
        case 8: {
          const length = decoder.uint32();
          obj.App = AppMetadata.decodeDataView(
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
  } // decode AppSessionStart

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Session != null) {
      const f: SessionMetadata = this.Session as SessionMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Server != null) {
      const f: ServerMetadata = this.Server as ServerMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Connection != null) {
      const f: ConnectionMetadata = this.Connection as ConnectionMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.PublicAddr.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.PublicAddr.length) +
          this.PublicAddr.length
        : 0;

    if (this.App != null) {
      const f: AppMetadata = this.App as AppMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes AppSessionStart to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes AppSessionStart to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Session != null) {
      const f = this.Session as SessionMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Server != null) {
      const f = this.Server as ServerMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Connection != null) {
      const f = this.Connection as ConnectionMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.PublicAddr.length > 0) {
      encoder.uint32(0x3a);
      encoder.uint32(this.PublicAddr.length);
      encoder.string(this.PublicAddr);
    }

    if (this.App != null) {
      const f = this.App as AppMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x42);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode AppSessionStart
} // AppSessionStart

/**
 * AppSessionChunk is emitted at the start of a 5 minute chunk on each
 *  proxy. This chunk is used to buffer 5 minutes of audit events at a time
 *  for applications.
 */
export class AppSessionChunk {
  // Metadata is a common event metadata
  public Metadata: Metadata = new Metadata();
  // User is a common user event metadata
  public User: UserMetadata = new UserMetadata();
  // SessionMetadata is a common event session metadata
  public Session: SessionMetadata = new SessionMetadata();
  // ServerMetadata is a common server metadata
  public Server: ServerMetadata = new ServerMetadata();
  // ConnectionMetadata holds information about the connection
  public Connection: ConnectionMetadata = new ConnectionMetadata();
  /**
   * SessionChunkID is the ID of the session that was created for this 5 minute
   *  application log chunk.
   */
  public SessionChunkID: string = "";
  // App is a common application resource metadata.
  public App: AppMetadata = new AppMetadata();

  // Decodes AppSessionChunk from an ArrayBuffer
  static decode(buf: ArrayBuffer): AppSessionChunk {
    return AppSessionChunk.decodeDataView(new DataView(buf));
  }

  // Decodes AppSessionChunk from a DataView
  static decodeDataView(view: DataView): AppSessionChunk {
    const decoder = new __proto.Decoder(view);
    const obj = new AppSessionChunk();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.User = UserMetadata.decodeDataView(
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
          obj.Session = SessionMetadata.decodeDataView(
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
          obj.Server = ServerMetadata.decodeDataView(
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
          obj.Connection = ConnectionMetadata.decodeDataView(
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
          obj.SessionChunkID = decoder.string();
          break;
        }
        case 7: {
          const length = decoder.uint32();
          obj.App = AppMetadata.decodeDataView(
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
  } // decode AppSessionChunk

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Session != null) {
      const f: SessionMetadata = this.Session as SessionMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Server != null) {
      const f: ServerMetadata = this.Server as ServerMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Connection != null) {
      const f: ConnectionMetadata = this.Connection as ConnectionMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.SessionChunkID.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.SessionChunkID.length) +
          this.SessionChunkID.length
        : 0;

    if (this.App != null) {
      const f: AppMetadata = this.App as AppMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes AppSessionChunk to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes AppSessionChunk to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Session != null) {
      const f = this.Session as SessionMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Server != null) {
      const f = this.Server as ServerMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Connection != null) {
      const f = this.Connection as ConnectionMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.SessionChunkID.length > 0) {
      encoder.uint32(0x32);
      encoder.uint32(this.SessionChunkID.length);
      encoder.string(this.SessionChunkID);
    }

    if (this.App != null) {
      const f = this.App as AppMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x3a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode AppSessionChunk
} // AppSessionChunk

// AppSessionRequest is an HTTP request and response.
export class AppSessionRequest {
  // Metadata is a common event metadata
  public Metadata: Metadata = new Metadata();
  // StatusCode the HTTP response code for the request.
  public StatusCode: u32;
  // Path is relative path in the URL.
  public Path: string = "";
  // RawQuery are the encoded query values.
  public RawQuery: string = "";
  // Method is the request HTTP method, like GET/POST/DELETE/etc.
  public Method: string = "";
  // App is a common application resource metadata.
  public App: AppMetadata = new AppMetadata();

  // Decodes AppSessionRequest from an ArrayBuffer
  static decode(buf: ArrayBuffer): AppSessionRequest {
    return AppSessionRequest.decodeDataView(new DataView(buf));
  }

  // Decodes AppSessionRequest from a DataView
  static decodeDataView(view: DataView): AppSessionRequest {
    const decoder = new __proto.Decoder(view);
    const obj = new AppSessionRequest();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          obj.StatusCode = decoder.uint32();
          break;
        }
        case 3: {
          obj.Path = decoder.string();
          break;
        }
        case 4: {
          obj.RawQuery = decoder.string();
          break;
        }
        case 5: {
          obj.Method = decoder.string();
          break;
        }
        case 6: {
          const length = decoder.uint32();
          obj.App = AppMetadata.decodeDataView(
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
  } // decode AppSessionRequest

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.StatusCode == 0 ? 0 : 1 + __proto.Sizer.uint32(this.StatusCode);
    size +=
      this.Path.length > 0
        ? 1 + __proto.Sizer.varint64(this.Path.length) + this.Path.length
        : 0;
    size +=
      this.RawQuery.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.RawQuery.length) +
          this.RawQuery.length
        : 0;
    size +=
      this.Method.length > 0
        ? 1 + __proto.Sizer.varint64(this.Method.length) + this.Method.length
        : 0;

    if (this.App != null) {
      const f: AppMetadata = this.App as AppMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes AppSessionRequest to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes AppSessionRequest to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.StatusCode != 0) {
      encoder.uint32(0x10);
      encoder.uint32(this.StatusCode);
    }
    if (this.Path.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Path.length);
      encoder.string(this.Path);
    }
    if (this.RawQuery.length > 0) {
      encoder.uint32(0x22);
      encoder.uint32(this.RawQuery.length);
      encoder.string(this.RawQuery);
    }
    if (this.Method.length > 0) {
      encoder.uint32(0x2a);
      encoder.uint32(this.Method.length);
      encoder.string(this.Method);
    }

    if (this.App != null) {
      const f = this.App as AppMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x32);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode AppSessionRequest
} // AppSessionRequest

// DatabaseMetadata contains common database information.
export class DatabaseMetadata {
  // DatabaseService is the name of the database service proxying the database.
  public DatabaseService: string = "";
  // DatabaseProtocol is the database type, e.g. postgres or mysql.
  public DatabaseProtocol: string = "";
  // DatabaseURI is the database URI to connect to.
  public DatabaseURI: string = "";
  // DatabaseName is the name of the database a user is connecting to.
  public DatabaseName: string = "";
  // DatabaseUser is the database username used to connect.
  public DatabaseUser: string = "";
  // DatabaseLabels is the database resource labels.
  public DatabaseLabels: Map<string, string> = new Map<string, string>();
  // DatabaseAWSRegion is AWS regions for AWS hosted databases.
  public DatabaseAWSRegion: string = "";
  // DatabaseAWSRegion is cluster ID for Redshift databases.
  public DatabaseAWSRedshiftClusterID: string = "";
  // DatabaseGCPProjectID is project ID for GCP hosted databases.
  public DatabaseGCPProjectID: string = "";
  // DatabaseGCPInstanceID is instance ID for GCP hosted databases.
  public DatabaseGCPInstanceID: string = "";

  // Decodes DatabaseMetadata from an ArrayBuffer
  static decode(buf: ArrayBuffer): DatabaseMetadata {
    return DatabaseMetadata.decodeDataView(new DataView(buf));
  }

  // Decodes DatabaseMetadata from a DataView
  static decodeDataView(view: DataView): DatabaseMetadata {
    const decoder = new __proto.Decoder(view);
    const obj = new DatabaseMetadata();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.DatabaseService = decoder.string();
          break;
        }
        case 2: {
          obj.DatabaseProtocol = decoder.string();
          break;
        }
        case 3: {
          obj.DatabaseURI = decoder.string();
          break;
        }
        case 4: {
          obj.DatabaseName = decoder.string();
          break;
        }
        case 5: {
          obj.DatabaseUser = decoder.string();
          break;
        }
        case 6: {
          const length = decoder.uint32();
          __decodeMap_string_string(decoder, length, obj.DatabaseLabels);
          decoder.skip(length);

          break;
        }
        case 7: {
          obj.DatabaseAWSRegion = decoder.string();
          break;
        }
        case 8: {
          obj.DatabaseAWSRedshiftClusterID = decoder.string();
          break;
        }
        case 9: {
          obj.DatabaseGCPProjectID = decoder.string();
          break;
        }
        case 10: {
          obj.DatabaseGCPInstanceID = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode DatabaseMetadata

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.DatabaseService.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.DatabaseService.length) +
          this.DatabaseService.length
        : 0;
    size +=
      this.DatabaseProtocol.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.DatabaseProtocol.length) +
          this.DatabaseProtocol.length
        : 0;
    size +=
      this.DatabaseURI.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.DatabaseURI.length) +
          this.DatabaseURI.length
        : 0;
    size +=
      this.DatabaseName.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.DatabaseName.length) +
          this.DatabaseName.length
        : 0;
    size +=
      this.DatabaseUser.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.DatabaseUser.length) +
          this.DatabaseUser.length
        : 0;

    if (this.DatabaseLabels.size > 0) {
      const keys = this.DatabaseLabels.keys();

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = this.DatabaseLabels.get(key);
        const itemSize = __sizeMapEntry_string_string(key, value);
        if (itemSize > 0) {
          size += 1 + __proto.Sizer.varint64(itemSize) + itemSize;
        }
      }
    }

    size +=
      this.DatabaseAWSRegion.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.DatabaseAWSRegion.length) +
          this.DatabaseAWSRegion.length
        : 0;
    size +=
      this.DatabaseAWSRedshiftClusterID.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.DatabaseAWSRedshiftClusterID.length) +
          this.DatabaseAWSRedshiftClusterID.length
        : 0;
    size +=
      this.DatabaseGCPProjectID.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.DatabaseGCPProjectID.length) +
          this.DatabaseGCPProjectID.length
        : 0;
    size +=
      this.DatabaseGCPInstanceID.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.DatabaseGCPInstanceID.length) +
          this.DatabaseGCPInstanceID.length
        : 0;

    return size;
  }

  // Encodes DatabaseMetadata to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes DatabaseMetadata to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.DatabaseService.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.DatabaseService.length);
      encoder.string(this.DatabaseService);
    }
    if (this.DatabaseProtocol.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.DatabaseProtocol.length);
      encoder.string(this.DatabaseProtocol);
    }
    if (this.DatabaseURI.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.DatabaseURI.length);
      encoder.string(this.DatabaseURI);
    }
    if (this.DatabaseName.length > 0) {
      encoder.uint32(0x22);
      encoder.uint32(this.DatabaseName.length);
      encoder.string(this.DatabaseName);
    }
    if (this.DatabaseUser.length > 0) {
      encoder.uint32(0x2a);
      encoder.uint32(this.DatabaseUser.length);
      encoder.string(this.DatabaseUser);
    }

    if (this.DatabaseLabels.size > 0) {
      const keys = this.DatabaseLabels.keys();
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = this.DatabaseLabels.get(key);
        const size = __sizeMapEntry_string_string(key, value);
        if (size > 0) {
          encoder.uint32(0x32);
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

    if (this.DatabaseAWSRegion.length > 0) {
      encoder.uint32(0x3a);
      encoder.uint32(this.DatabaseAWSRegion.length);
      encoder.string(this.DatabaseAWSRegion);
    }
    if (this.DatabaseAWSRedshiftClusterID.length > 0) {
      encoder.uint32(0x42);
      encoder.uint32(this.DatabaseAWSRedshiftClusterID.length);
      encoder.string(this.DatabaseAWSRedshiftClusterID);
    }
    if (this.DatabaseGCPProjectID.length > 0) {
      encoder.uint32(0x4a);
      encoder.uint32(this.DatabaseGCPProjectID.length);
      encoder.string(this.DatabaseGCPProjectID);
    }
    if (this.DatabaseGCPInstanceID.length > 0) {
      encoder.uint32(0x52);
      encoder.uint32(this.DatabaseGCPInstanceID.length);
      encoder.string(this.DatabaseGCPInstanceID);
    }

    return buf;
  } // encode DatabaseMetadata
} // DatabaseMetadata

// DatabaseCreate is emitted when a new database resource is created.
export class DatabaseCreate {
  // Metadata is a common event metadata.
  public Metadata: Metadata = new Metadata();
  // User is a common user event metadata.
  public User: UserMetadata = new UserMetadata();
  // ResourceMetadata is a common resource event metadata.
  public Resource: ResourceMetadata = new ResourceMetadata();
  // DatabaseMetadata is a common database resource metadata.
  public Database: DatabaseMetadata = new DatabaseMetadata();

  // Decodes DatabaseCreate from an ArrayBuffer
  static decode(buf: ArrayBuffer): DatabaseCreate {
    return DatabaseCreate.decodeDataView(new DataView(buf));
  }

  // Decodes DatabaseCreate from a DataView
  static decodeDataView(view: DataView): DatabaseCreate {
    const decoder = new __proto.Decoder(view);
    const obj = new DatabaseCreate();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.User = UserMetadata.decodeDataView(
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
          obj.Resource = ResourceMetadata.decodeDataView(
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
          obj.Database = DatabaseMetadata.decodeDataView(
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
  } // decode DatabaseCreate

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Resource != null) {
      const f: ResourceMetadata = this.Resource as ResourceMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Database != null) {
      const f: DatabaseMetadata = this.Database as DatabaseMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes DatabaseCreate to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes DatabaseCreate to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Resource != null) {
      const f = this.Resource as ResourceMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Database != null) {
      const f = this.Database as DatabaseMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode DatabaseCreate
} // DatabaseCreate

// DatabaseUpdate is emitted when an existing database resource is updated.
export class DatabaseUpdate {
  // Metadata is a common event metadata.
  public Metadata: Metadata = new Metadata();
  // User is a common user event metadata.
  public User: UserMetadata = new UserMetadata();
  // ResourceMetadata is a common resource event metadata.
  public Resource: ResourceMetadata = new ResourceMetadata();
  // DatabaseMetadata is a common database resource metadata.
  public Database: DatabaseMetadata = new DatabaseMetadata();

  // Decodes DatabaseUpdate from an ArrayBuffer
  static decode(buf: ArrayBuffer): DatabaseUpdate {
    return DatabaseUpdate.decodeDataView(new DataView(buf));
  }

  // Decodes DatabaseUpdate from a DataView
  static decodeDataView(view: DataView): DatabaseUpdate {
    const decoder = new __proto.Decoder(view);
    const obj = new DatabaseUpdate();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.User = UserMetadata.decodeDataView(
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
          obj.Resource = ResourceMetadata.decodeDataView(
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
          obj.Database = DatabaseMetadata.decodeDataView(
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
  } // decode DatabaseUpdate

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Resource != null) {
      const f: ResourceMetadata = this.Resource as ResourceMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Database != null) {
      const f: DatabaseMetadata = this.Database as DatabaseMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes DatabaseUpdate to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes DatabaseUpdate to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Resource != null) {
      const f = this.Resource as ResourceMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Database != null) {
      const f = this.Database as DatabaseMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode DatabaseUpdate
} // DatabaseUpdate

// DatabaseDelete is emitted when a database resource is deleted.
export class DatabaseDelete {
  // Metadata is a common event metadata.
  public Metadata: Metadata = new Metadata();
  // User is a common user event metadata.
  public User: UserMetadata = new UserMetadata();
  // ResourceMetadata is a common resource event metadata.
  public Resource: ResourceMetadata = new ResourceMetadata();

  // Decodes DatabaseDelete from an ArrayBuffer
  static decode(buf: ArrayBuffer): DatabaseDelete {
    return DatabaseDelete.decodeDataView(new DataView(buf));
  }

  // Decodes DatabaseDelete from a DataView
  static decodeDataView(view: DataView): DatabaseDelete {
    const decoder = new __proto.Decoder(view);
    const obj = new DatabaseDelete();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.User = UserMetadata.decodeDataView(
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
          obj.Resource = ResourceMetadata.decodeDataView(
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
  } // decode DatabaseDelete

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Resource != null) {
      const f: ResourceMetadata = this.Resource as ResourceMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes DatabaseDelete to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes DatabaseDelete to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Resource != null) {
      const f = this.Resource as ResourceMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode DatabaseDelete
} // DatabaseDelete

// DatabaseSessionStart is emitted when a user connects to a database.
export class DatabaseSessionStart {
  // Metadata is a common event metadata.
  public Metadata: Metadata = new Metadata();
  // User is a common user event metadata.
  public User: UserMetadata = new UserMetadata();
  // Session is a common event session metadata.
  public Session: SessionMetadata = new SessionMetadata();
  // Server is a common server metadata.
  public Server: ServerMetadata = new ServerMetadata();
  // Connection holds information about the connection.
  public Connection: ConnectionMetadata = new ConnectionMetadata();
  // Status indicates whether the connection was successful or denied.
  public Status: Status = new Status();
  // Database contains database related metadata.
  public Database: DatabaseMetadata = new DatabaseMetadata();

  // Decodes DatabaseSessionStart from an ArrayBuffer
  static decode(buf: ArrayBuffer): DatabaseSessionStart {
    return DatabaseSessionStart.decodeDataView(new DataView(buf));
  }

  // Decodes DatabaseSessionStart from a DataView
  static decodeDataView(view: DataView): DatabaseSessionStart {
    const decoder = new __proto.Decoder(view);
    const obj = new DatabaseSessionStart();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.User = UserMetadata.decodeDataView(
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
          obj.Session = SessionMetadata.decodeDataView(
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
          obj.Server = ServerMetadata.decodeDataView(
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
          obj.Connection = ConnectionMetadata.decodeDataView(
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
          obj.Status = Status.decodeDataView(
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
          obj.Database = DatabaseMetadata.decodeDataView(
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
  } // decode DatabaseSessionStart

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Session != null) {
      const f: SessionMetadata = this.Session as SessionMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Server != null) {
      const f: ServerMetadata = this.Server as ServerMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Connection != null) {
      const f: ConnectionMetadata = this.Connection as ConnectionMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Status != null) {
      const f: Status = this.Status as Status;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Database != null) {
      const f: DatabaseMetadata = this.Database as DatabaseMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes DatabaseSessionStart to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes DatabaseSessionStart to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Session != null) {
      const f = this.Session as SessionMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Server != null) {
      const f = this.Server as ServerMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Connection != null) {
      const f = this.Connection as ConnectionMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Status != null) {
      const f = this.Status as Status;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x32);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Database != null) {
      const f = this.Database as DatabaseMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x3a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode DatabaseSessionStart
} // DatabaseSessionStart

// DatabaseSessionQuery is emitted when a user executes a database query.
export class DatabaseSessionQuery {
  // Metadata is a common event metadata.
  public Metadata: Metadata = new Metadata();
  // User is a common user event metadata.
  public User: UserMetadata = new UserMetadata();
  // SessionMetadata is a common event session metadata.
  public Session: SessionMetadata = new SessionMetadata();
  // Database contains database related metadata.
  public Database: DatabaseMetadata = new DatabaseMetadata();
  // DatabaseQuery is the executed query string.
  public DatabaseQuery: string = "";
  // DatabaseQueryParameters are the query parameters for prepared statements.
  public DatabaseQueryParameters: Array<string> = new Array<string>();
  // Status indicates whether the query was successfully sent to the database.
  public Status: Status = new Status();

  // Decodes DatabaseSessionQuery from an ArrayBuffer
  static decode(buf: ArrayBuffer): DatabaseSessionQuery {
    return DatabaseSessionQuery.decodeDataView(new DataView(buf));
  }

  // Decodes DatabaseSessionQuery from a DataView
  static decodeDataView(view: DataView): DatabaseSessionQuery {
    const decoder = new __proto.Decoder(view);
    const obj = new DatabaseSessionQuery();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.User = UserMetadata.decodeDataView(
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
          obj.Session = SessionMetadata.decodeDataView(
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
          obj.Database = DatabaseMetadata.decodeDataView(
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
          obj.DatabaseQuery = decoder.string();
          break;
        }
        case 6: {
          obj.DatabaseQueryParameters.push(decoder.string());
          break;
        }
        case 7: {
          const length = decoder.uint32();
          obj.Status = Status.decodeDataView(
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
  } // decode DatabaseSessionQuery

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Session != null) {
      const f: SessionMetadata = this.Session as SessionMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Database != null) {
      const f: DatabaseMetadata = this.Database as DatabaseMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.DatabaseQuery.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.DatabaseQuery.length) +
          this.DatabaseQuery.length
        : 0;

    size += __size_string_repeated(this.DatabaseQueryParameters);

    if (this.Status != null) {
      const f: Status = this.Status as Status;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes DatabaseSessionQuery to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes DatabaseSessionQuery to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Session != null) {
      const f = this.Session as SessionMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Database != null) {
      const f = this.Database as DatabaseMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.DatabaseQuery.length > 0) {
      encoder.uint32(0x2a);
      encoder.uint32(this.DatabaseQuery.length);
      encoder.string(this.DatabaseQuery);
    }

    if (this.DatabaseQueryParameters.length > 0) {
      for (let n: i32 = 0; n < this.DatabaseQueryParameters.length; n++) {
        encoder.uint32(0x32);
        encoder.uint32(this.DatabaseQueryParameters[n].length);
        encoder.string(this.DatabaseQueryParameters[n]);
      }
    }

    if (this.Status != null) {
      const f = this.Status as Status;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x3a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode DatabaseSessionQuery
} // DatabaseSessionQuery

/**
 * PostgresParse is emitted when a Postgres client creates a prepared statement
 *  using extended query protocol.
 */
export class PostgresParse {
  // Metadata is a common event metadata.
  public Metadata: Metadata = new Metadata();
  // User is a common user event metadata.
  public User: UserMetadata = new UserMetadata();
  // SessionMetadata is a common event session metadata.
  public Session: SessionMetadata = new SessionMetadata();
  // Database contains database related metadata.
  public Database: DatabaseMetadata = new DatabaseMetadata();
  // StatementName is the prepared statement name.
  public StatementName: string = "";
  // Query is the prepared statement query.
  public Query: string = "";

  // Decodes PostgresParse from an ArrayBuffer
  static decode(buf: ArrayBuffer): PostgresParse {
    return PostgresParse.decodeDataView(new DataView(buf));
  }

  // Decodes PostgresParse from a DataView
  static decodeDataView(view: DataView): PostgresParse {
    const decoder = new __proto.Decoder(view);
    const obj = new PostgresParse();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.User = UserMetadata.decodeDataView(
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
          obj.Session = SessionMetadata.decodeDataView(
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
          obj.Database = DatabaseMetadata.decodeDataView(
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
          obj.StatementName = decoder.string();
          break;
        }
        case 6: {
          obj.Query = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode PostgresParse

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Session != null) {
      const f: SessionMetadata = this.Session as SessionMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Database != null) {
      const f: DatabaseMetadata = this.Database as DatabaseMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.StatementName.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.StatementName.length) +
          this.StatementName.length
        : 0;
    size +=
      this.Query.length > 0
        ? 1 + __proto.Sizer.varint64(this.Query.length) + this.Query.length
        : 0;

    return size;
  }

  // Encodes PostgresParse to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes PostgresParse to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Session != null) {
      const f = this.Session as SessionMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Database != null) {
      const f = this.Database as DatabaseMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.StatementName.length > 0) {
      encoder.uint32(0x2a);
      encoder.uint32(this.StatementName.length);
      encoder.string(this.StatementName);
    }
    if (this.Query.length > 0) {
      encoder.uint32(0x32);
      encoder.uint32(this.Query.length);
      encoder.string(this.Query);
    }

    return buf;
  } // encode PostgresParse
} // PostgresParse

/**
 * PostgresBind is emitted when a Postgres client readies a prepared statement
 *  for execution and binds it to parameters.
 */
export class PostgresBind {
  // Metadata is a common event metadata.
  public Metadata: Metadata = new Metadata();
  // User is a common user event metadata.
  public User: UserMetadata = new UserMetadata();
  // SessionMetadata is a common event session metadata.
  public Session: SessionMetadata = new SessionMetadata();
  // Database contains database related metadata.
  public Database: DatabaseMetadata = new DatabaseMetadata();
  // StatementName is the name of prepared statement that's being bound to parameters.
  public StatementName: string = "";
  // PortalName is the destination portal name that binds statement to parameters.
  public PortalName: string = "";
  // Parameters are the query bind parameters.
  public Parameters: Array<string> = new Array<string>();

  // Decodes PostgresBind from an ArrayBuffer
  static decode(buf: ArrayBuffer): PostgresBind {
    return PostgresBind.decodeDataView(new DataView(buf));
  }

  // Decodes PostgresBind from a DataView
  static decodeDataView(view: DataView): PostgresBind {
    const decoder = new __proto.Decoder(view);
    const obj = new PostgresBind();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.User = UserMetadata.decodeDataView(
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
          obj.Session = SessionMetadata.decodeDataView(
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
          obj.Database = DatabaseMetadata.decodeDataView(
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
          obj.StatementName = decoder.string();
          break;
        }
        case 6: {
          obj.PortalName = decoder.string();
          break;
        }
        case 7: {
          obj.Parameters.push(decoder.string());
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode PostgresBind

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Session != null) {
      const f: SessionMetadata = this.Session as SessionMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Database != null) {
      const f: DatabaseMetadata = this.Database as DatabaseMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.StatementName.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.StatementName.length) +
          this.StatementName.length
        : 0;
    size +=
      this.PortalName.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.PortalName.length) +
          this.PortalName.length
        : 0;

    size += __size_string_repeated(this.Parameters);

    return size;
  }

  // Encodes PostgresBind to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes PostgresBind to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Session != null) {
      const f = this.Session as SessionMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Database != null) {
      const f = this.Database as DatabaseMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.StatementName.length > 0) {
      encoder.uint32(0x2a);
      encoder.uint32(this.StatementName.length);
      encoder.string(this.StatementName);
    }
    if (this.PortalName.length > 0) {
      encoder.uint32(0x32);
      encoder.uint32(this.PortalName.length);
      encoder.string(this.PortalName);
    }

    if (this.Parameters.length > 0) {
      for (let n: i32 = 0; n < this.Parameters.length; n++) {
        encoder.uint32(0x3a);
        encoder.uint32(this.Parameters[n].length);
        encoder.string(this.Parameters[n]);
      }
    }

    return buf;
  } // encode PostgresBind
} // PostgresBind

/**
 * PostgresExecute is emitted when a Postgres client executes a previously
 *  bound prepared statement.
 */
export class PostgresExecute {
  // Metadata is a common event metadata.
  public Metadata: Metadata = new Metadata();
  // User is a common user event metadata.
  public User: UserMetadata = new UserMetadata();
  // SessionMetadata is a common event session metadata.
  public Session: SessionMetadata = new SessionMetadata();
  // Database contains database related metadata.
  public Database: DatabaseMetadata = new DatabaseMetadata();
  // PortalName is the name of destination portal that's being executed.
  public PortalName: string = "";

  // Decodes PostgresExecute from an ArrayBuffer
  static decode(buf: ArrayBuffer): PostgresExecute {
    return PostgresExecute.decodeDataView(new DataView(buf));
  }

  // Decodes PostgresExecute from a DataView
  static decodeDataView(view: DataView): PostgresExecute {
    const decoder = new __proto.Decoder(view);
    const obj = new PostgresExecute();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.User = UserMetadata.decodeDataView(
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
          obj.Session = SessionMetadata.decodeDataView(
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
          obj.Database = DatabaseMetadata.decodeDataView(
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
          obj.PortalName = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode PostgresExecute

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Session != null) {
      const f: SessionMetadata = this.Session as SessionMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Database != null) {
      const f: DatabaseMetadata = this.Database as DatabaseMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.PortalName.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.PortalName.length) +
          this.PortalName.length
        : 0;

    return size;
  }

  // Encodes PostgresExecute to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes PostgresExecute to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Session != null) {
      const f = this.Session as SessionMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Database != null) {
      const f = this.Database as DatabaseMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.PortalName.length > 0) {
      encoder.uint32(0x2a);
      encoder.uint32(this.PortalName.length);
      encoder.string(this.PortalName);
    }

    return buf;
  } // encode PostgresExecute
} // PostgresExecute

/**
 * PostgresClose is emitted when a Postgres client closes an existing prepared
 *  statement.
 */
export class PostgresClose {
  // Metadata is a common event metadata.
  public Metadata: Metadata = new Metadata();
  // User is a common user event metadata.
  public User: UserMetadata = new UserMetadata();
  // SessionMetadata is a common event session metadata.
  public Session: SessionMetadata = new SessionMetadata();
  // Database contains database related metadata.
  public Database: DatabaseMetadata = new DatabaseMetadata();
  // StatementName is the name of prepared statement that's being closed.
  public StatementName: string = "";
  // PortalName is the name of destination portal that's being closed.
  public PortalName: string = "";

  // Decodes PostgresClose from an ArrayBuffer
  static decode(buf: ArrayBuffer): PostgresClose {
    return PostgresClose.decodeDataView(new DataView(buf));
  }

  // Decodes PostgresClose from a DataView
  static decodeDataView(view: DataView): PostgresClose {
    const decoder = new __proto.Decoder(view);
    const obj = new PostgresClose();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.User = UserMetadata.decodeDataView(
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
          obj.Session = SessionMetadata.decodeDataView(
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
          obj.Database = DatabaseMetadata.decodeDataView(
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
          obj.StatementName = decoder.string();
          break;
        }
        case 6: {
          obj.PortalName = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode PostgresClose

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Session != null) {
      const f: SessionMetadata = this.Session as SessionMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Database != null) {
      const f: DatabaseMetadata = this.Database as DatabaseMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.StatementName.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.StatementName.length) +
          this.StatementName.length
        : 0;
    size +=
      this.PortalName.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.PortalName.length) +
          this.PortalName.length
        : 0;

    return size;
  }

  // Encodes PostgresClose to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes PostgresClose to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Session != null) {
      const f = this.Session as SessionMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Database != null) {
      const f = this.Database as DatabaseMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.StatementName.length > 0) {
      encoder.uint32(0x2a);
      encoder.uint32(this.StatementName.length);
      encoder.string(this.StatementName);
    }
    if (this.PortalName.length > 0) {
      encoder.uint32(0x32);
      encoder.uint32(this.PortalName.length);
      encoder.string(this.PortalName);
    }

    return buf;
  } // encode PostgresClose
} // PostgresClose

/**
 * PostgresFunctionCall is emitted when a Postgres client calls internal
 *  database function.
 */
export class PostgresFunctionCall {
  // Metadata is a common event metadata.
  public Metadata: Metadata = new Metadata();
  // User is a common user event metadata.
  public User: UserMetadata = new UserMetadata();
  // SessionMetadata is a common event session metadata.
  public Session: SessionMetadata = new SessionMetadata();
  // Database contains database related metadata.
  public Database: DatabaseMetadata = new DatabaseMetadata();
  // FunctionOID is the Postgres object ID of the called function.
  public FunctionOID: u32;
  // FunctionArgs contains formatted function arguments.
  public FunctionArgs: Array<string> = new Array<string>();

  // Decodes PostgresFunctionCall from an ArrayBuffer
  static decode(buf: ArrayBuffer): PostgresFunctionCall {
    return PostgresFunctionCall.decodeDataView(new DataView(buf));
  }

  // Decodes PostgresFunctionCall from a DataView
  static decodeDataView(view: DataView): PostgresFunctionCall {
    const decoder = new __proto.Decoder(view);
    const obj = new PostgresFunctionCall();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.User = UserMetadata.decodeDataView(
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
          obj.Session = SessionMetadata.decodeDataView(
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
          obj.Database = DatabaseMetadata.decodeDataView(
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
          obj.FunctionOID = decoder.uint32();
          break;
        }
        case 6: {
          obj.FunctionArgs.push(decoder.string());
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode PostgresFunctionCall

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Session != null) {
      const f: SessionMetadata = this.Session as SessionMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Database != null) {
      const f: DatabaseMetadata = this.Database as DatabaseMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.FunctionOID == 0 ? 0 : 1 + __proto.Sizer.uint32(this.FunctionOID);

    size += __size_string_repeated(this.FunctionArgs);

    return size;
  }

  // Encodes PostgresFunctionCall to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes PostgresFunctionCall to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Session != null) {
      const f = this.Session as SessionMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Database != null) {
      const f = this.Database as DatabaseMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.FunctionOID != 0) {
      encoder.uint32(0x28);
      encoder.uint32(this.FunctionOID);
    }

    if (this.FunctionArgs.length > 0) {
      for (let n: i32 = 0; n < this.FunctionArgs.length; n++) {
        encoder.uint32(0x32);
        encoder.uint32(this.FunctionArgs[n].length);
        encoder.string(this.FunctionArgs[n]);
      }
    }

    return buf;
  } // encode PostgresFunctionCall
} // PostgresFunctionCall

// WindowsDesktopSessionStart is emitted when a user connects to a desktop.
export class WindowsDesktopSessionStart {
  // Metadata is common event metadata.
  public Metadata: Metadata = new Metadata();
  // User is common user event metadata.
  public User: UserMetadata = new UserMetadata();
  // Session is common event session metadata.
  public Session: SessionMetadata = new SessionMetadata();
  // Connection holds information about the connection.
  public Connection: ConnectionMetadata = new ConnectionMetadata();
  // Status indicates whether the connection was successful or denied.
  public Status: Status = new Status();
  // WindowsDesktopService is the name of the service proxying the RDP session.
  public WindowsDesktopService: string = "";
  // DesktopAddr is the address of the desktop being accessed.
  public DesktopAddr: string = "";
  // Domain is the Active Directory domain of the desktop being accessed.
  public Domain: string = "";
  // WindowsUser is the Windows username used to connect.
  public WindowsUser: string = "";
  // DesktopLabels are the labels on the desktop resource.
  public DesktopLabels: Map<string, string> = new Map<string, string>();
  // DesktopName is the name of the desktop resource.
  public DesktopName: string = "";

  // Decodes WindowsDesktopSessionStart from an ArrayBuffer
  static decode(buf: ArrayBuffer): WindowsDesktopSessionStart {
    return WindowsDesktopSessionStart.decodeDataView(new DataView(buf));
  }

  // Decodes WindowsDesktopSessionStart from a DataView
  static decodeDataView(view: DataView): WindowsDesktopSessionStart {
    const decoder = new __proto.Decoder(view);
    const obj = new WindowsDesktopSessionStart();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.User = UserMetadata.decodeDataView(
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
          obj.Session = SessionMetadata.decodeDataView(
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
          obj.Connection = ConnectionMetadata.decodeDataView(
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
          obj.Status = Status.decodeDataView(
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
          obj.WindowsDesktopService = decoder.string();
          break;
        }
        case 7: {
          obj.DesktopAddr = decoder.string();
          break;
        }
        case 8: {
          obj.Domain = decoder.string();
          break;
        }
        case 9: {
          obj.WindowsUser = decoder.string();
          break;
        }
        case 10: {
          const length = decoder.uint32();
          __decodeMap_string_string(decoder, length, obj.DesktopLabels);
          decoder.skip(length);

          break;
        }
        case 11: {
          obj.DesktopName = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode WindowsDesktopSessionStart

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Session != null) {
      const f: SessionMetadata = this.Session as SessionMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Connection != null) {
      const f: ConnectionMetadata = this.Connection as ConnectionMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Status != null) {
      const f: Status = this.Status as Status;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.WindowsDesktopService.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.WindowsDesktopService.length) +
          this.WindowsDesktopService.length
        : 0;
    size +=
      this.DesktopAddr.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.DesktopAddr.length) +
          this.DesktopAddr.length
        : 0;
    size +=
      this.Domain.length > 0
        ? 1 + __proto.Sizer.varint64(this.Domain.length) + this.Domain.length
        : 0;
    size +=
      this.WindowsUser.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.WindowsUser.length) +
          this.WindowsUser.length
        : 0;

    if (this.DesktopLabels.size > 0) {
      const keys = this.DesktopLabels.keys();

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = this.DesktopLabels.get(key);
        const itemSize = __sizeMapEntry_string_string(key, value);
        if (itemSize > 0) {
          size += 1 + __proto.Sizer.varint64(itemSize) + itemSize;
        }
      }
    }

    size +=
      this.DesktopName.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.DesktopName.length) +
          this.DesktopName.length
        : 0;

    return size;
  }

  // Encodes WindowsDesktopSessionStart to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes WindowsDesktopSessionStart to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Session != null) {
      const f = this.Session as SessionMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Connection != null) {
      const f = this.Connection as ConnectionMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Status != null) {
      const f = this.Status as Status;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.WindowsDesktopService.length > 0) {
      encoder.uint32(0x32);
      encoder.uint32(this.WindowsDesktopService.length);
      encoder.string(this.WindowsDesktopService);
    }
    if (this.DesktopAddr.length > 0) {
      encoder.uint32(0x3a);
      encoder.uint32(this.DesktopAddr.length);
      encoder.string(this.DesktopAddr);
    }
    if (this.Domain.length > 0) {
      encoder.uint32(0x42);
      encoder.uint32(this.Domain.length);
      encoder.string(this.Domain);
    }
    if (this.WindowsUser.length > 0) {
      encoder.uint32(0x4a);
      encoder.uint32(this.WindowsUser.length);
      encoder.string(this.WindowsUser);
    }

    if (this.DesktopLabels.size > 0) {
      const keys = this.DesktopLabels.keys();
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = this.DesktopLabels.get(key);
        const size = __sizeMapEntry_string_string(key, value);
        if (size > 0) {
          encoder.uint32(0x52);
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

    if (this.DesktopName.length > 0) {
      encoder.uint32(0x5a);
      encoder.uint32(this.DesktopName.length);
      encoder.string(this.DesktopName);
    }

    return buf;
  } // encode WindowsDesktopSessionStart
} // WindowsDesktopSessionStart

// DatabaseSessionEnd is emitted when a user ends the database session.
export class DatabaseSessionEnd {
  // Metadata is a common event metadata.
  public Metadata: Metadata = new Metadata();
  // User is a common user event metadata.
  public User: UserMetadata = new UserMetadata();
  // Session is a common event session metadata.
  public Session: SessionMetadata = new SessionMetadata();
  // Database contains database related metadata.
  public Database: DatabaseMetadata = new DatabaseMetadata();

  // Decodes DatabaseSessionEnd from an ArrayBuffer
  static decode(buf: ArrayBuffer): DatabaseSessionEnd {
    return DatabaseSessionEnd.decodeDataView(new DataView(buf));
  }

  // Decodes DatabaseSessionEnd from a DataView
  static decodeDataView(view: DataView): DatabaseSessionEnd {
    const decoder = new __proto.Decoder(view);
    const obj = new DatabaseSessionEnd();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.User = UserMetadata.decodeDataView(
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
          obj.Session = SessionMetadata.decodeDataView(
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
          obj.Database = DatabaseMetadata.decodeDataView(
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
  } // decode DatabaseSessionEnd

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Session != null) {
      const f: SessionMetadata = this.Session as SessionMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Database != null) {
      const f: DatabaseMetadata = this.Database as DatabaseMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes DatabaseSessionEnd to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes DatabaseSessionEnd to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Session != null) {
      const f = this.Session as SessionMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Database != null) {
      const f = this.Database as DatabaseMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode DatabaseSessionEnd
} // DatabaseSessionEnd

// MFADeviceMetadata is a common MFA device metadata.
export class MFADeviceMetadata {
  // Name is the user-specified name of the MFA device.
  public DeviceName: string = "";
  // ID is the UUID of the MFA device generated by Teleport.
  public DeviceID: string = "";
  // Type is the type of this MFA device.
  public DeviceType: string = "";

  // Decodes MFADeviceMetadata from an ArrayBuffer
  static decode(buf: ArrayBuffer): MFADeviceMetadata {
    return MFADeviceMetadata.decodeDataView(new DataView(buf));
  }

  // Decodes MFADeviceMetadata from a DataView
  static decodeDataView(view: DataView): MFADeviceMetadata {
    const decoder = new __proto.Decoder(view);
    const obj = new MFADeviceMetadata();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.DeviceName = decoder.string();
          break;
        }
        case 2: {
          obj.DeviceID = decoder.string();
          break;
        }
        case 3: {
          obj.DeviceType = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode MFADeviceMetadata

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.DeviceName.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.DeviceName.length) +
          this.DeviceName.length
        : 0;
    size +=
      this.DeviceID.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.DeviceID.length) +
          this.DeviceID.length
        : 0;
    size +=
      this.DeviceType.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.DeviceType.length) +
          this.DeviceType.length
        : 0;

    return size;
  }

  // Encodes MFADeviceMetadata to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes MFADeviceMetadata to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.DeviceName.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.DeviceName.length);
      encoder.string(this.DeviceName);
    }
    if (this.DeviceID.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.DeviceID.length);
      encoder.string(this.DeviceID);
    }
    if (this.DeviceType.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.DeviceType.length);
      encoder.string(this.DeviceType);
    }

    return buf;
  } // encode MFADeviceMetadata
} // MFADeviceMetadata

// MFADeviceAdd is emitted when a user adds an MFA device.
export class MFADeviceAdd {
  // Metadata is a common event metadata.
  public Metadata: Metadata = new Metadata();
  // User is a common user event metadata.
  public User: UserMetadata = new UserMetadata();
  // Device is the new MFA device added by the user.
  public Device: MFADeviceMetadata = new MFADeviceMetadata();

  // Decodes MFADeviceAdd from an ArrayBuffer
  static decode(buf: ArrayBuffer): MFADeviceAdd {
    return MFADeviceAdd.decodeDataView(new DataView(buf));
  }

  // Decodes MFADeviceAdd from a DataView
  static decodeDataView(view: DataView): MFADeviceAdd {
    const decoder = new __proto.Decoder(view);
    const obj = new MFADeviceAdd();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.User = UserMetadata.decodeDataView(
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
          obj.Device = MFADeviceMetadata.decodeDataView(
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
  } // decode MFADeviceAdd

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Device != null) {
      const f: MFADeviceMetadata = this.Device as MFADeviceMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes MFADeviceAdd to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes MFADeviceAdd to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Device != null) {
      const f = this.Device as MFADeviceMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode MFADeviceAdd
} // MFADeviceAdd

// MFADeviceDelete is emitted when a user deletes an MFA device.
export class MFADeviceDelete {
  // Metadata is a common event metadata.
  public Metadata: Metadata = new Metadata();
  // User is a common user event metadata.
  public User: UserMetadata = new UserMetadata();
  // Device is the MFA device deleted by the user.
  public Device: MFADeviceMetadata = new MFADeviceMetadata();

  // Decodes MFADeviceDelete from an ArrayBuffer
  static decode(buf: ArrayBuffer): MFADeviceDelete {
    return MFADeviceDelete.decodeDataView(new DataView(buf));
  }

  // Decodes MFADeviceDelete from a DataView
  static decodeDataView(view: DataView): MFADeviceDelete {
    const decoder = new __proto.Decoder(view);
    const obj = new MFADeviceDelete();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.User = UserMetadata.decodeDataView(
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
          obj.Device = MFADeviceMetadata.decodeDataView(
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
  } // decode MFADeviceDelete

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Device != null) {
      const f: MFADeviceMetadata = this.Device as MFADeviceMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes MFADeviceDelete to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes MFADeviceDelete to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Device != null) {
      const f = this.Device as MFADeviceMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode MFADeviceDelete
} // MFADeviceDelete

// BillingInformationUpdate is emitted when a user updates the billing information.
export class BillingInformationUpdate {
  // Metadata is a common event metadata.
  public Metadata: Metadata = new Metadata();
  // User is a common user event metadata.
  public User: UserMetadata = new UserMetadata();

  // Decodes BillingInformationUpdate from an ArrayBuffer
  static decode(buf: ArrayBuffer): BillingInformationUpdate {
    return BillingInformationUpdate.decodeDataView(new DataView(buf));
  }

  // Decodes BillingInformationUpdate from a DataView
  static decodeDataView(view: DataView): BillingInformationUpdate {
    const decoder = new __proto.Decoder(view);
    const obj = new BillingInformationUpdate();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.User = UserMetadata.decodeDataView(
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
  } // decode BillingInformationUpdate

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes BillingInformationUpdate to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes BillingInformationUpdate to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode BillingInformationUpdate
} // BillingInformationUpdate

// BillingCardCreate is emitted when a user creates or updates a credit card.
export class BillingCardCreate {
  // Metadata is a common event metadata.
  public Metadata: Metadata = new Metadata();
  // User is a common user event metadata.
  public User: UserMetadata = new UserMetadata();

  // Decodes BillingCardCreate from an ArrayBuffer
  static decode(buf: ArrayBuffer): BillingCardCreate {
    return BillingCardCreate.decodeDataView(new DataView(buf));
  }

  // Decodes BillingCardCreate from a DataView
  static decodeDataView(view: DataView): BillingCardCreate {
    const decoder = new __proto.Decoder(view);
    const obj = new BillingCardCreate();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.User = UserMetadata.decodeDataView(
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
  } // decode BillingCardCreate

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes BillingCardCreate to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes BillingCardCreate to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode BillingCardCreate
} // BillingCardCreate

// BillingCardDelete is emitted when a user deletes a credit card.
export class BillingCardDelete {
  // Metadata is a common event metadata.
  public Metadata: Metadata = new Metadata();
  // User is a common user event metadata.
  public User: UserMetadata = new UserMetadata();

  // Decodes BillingCardDelete from an ArrayBuffer
  static decode(buf: ArrayBuffer): BillingCardDelete {
    return BillingCardDelete.decodeDataView(new DataView(buf));
  }

  // Decodes BillingCardDelete from a DataView
  static decodeDataView(view: DataView): BillingCardDelete {
    const decoder = new __proto.Decoder(view);
    const obj = new BillingCardDelete();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.User = UserMetadata.decodeDataView(
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
  } // decode BillingCardDelete

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes BillingCardDelete to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes BillingCardDelete to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode BillingCardDelete
} // BillingCardDelete

/**
 * LockCreate is emitted when a lock is created/updated.
 *  Locks are used to restrict access to a Teleport environment by disabling
 *  interactions involving a user, an RBAC role, a node, etc.
 *  See rfd/0009-locking.md for more details.
 */
export class LockCreate {
  // Metadata is a common event metadata
  public Metadata: Metadata = new Metadata();
  // ResourceMetadata is a common resource event metadata
  public Resource: ResourceMetadata = new ResourceMetadata();
  // User is a common user event metadata
  public User: UserMetadata = new UserMetadata();

  // Decodes LockCreate from an ArrayBuffer
  static decode(buf: ArrayBuffer): LockCreate {
    return LockCreate.decodeDataView(new DataView(buf));
  }

  // Decodes LockCreate from a DataView
  static decodeDataView(view: DataView): LockCreate {
    const decoder = new __proto.Decoder(view);
    const obj = new LockCreate();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.Resource = ResourceMetadata.decodeDataView(
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
          obj.User = UserMetadata.decodeDataView(
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
  } // decode LockCreate

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Resource != null) {
      const f: ResourceMetadata = this.Resource as ResourceMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes LockCreate to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes LockCreate to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Resource != null) {
      const f = this.Resource as ResourceMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode LockCreate
} // LockCreate

// LockDelete is emitted when a lock is deleted
export class LockDelete {
  // Metadata is a common event metadata
  public Metadata: Metadata = new Metadata();
  // ResourceMetadata is a common resource event metadata
  public Resource: ResourceMetadata = new ResourceMetadata();
  // User is a common user event metadata
  public User: UserMetadata = new UserMetadata();

  // Decodes LockDelete from an ArrayBuffer
  static decode(buf: ArrayBuffer): LockDelete {
    return LockDelete.decodeDataView(new DataView(buf));
  }

  // Decodes LockDelete from a DataView
  static decodeDataView(view: DataView): LockDelete {
    const decoder = new __proto.Decoder(view);
    const obj = new LockDelete();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.Resource = ResourceMetadata.decodeDataView(
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
          obj.User = UserMetadata.decodeDataView(
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
  } // decode LockDelete

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Resource != null) {
      const f: ResourceMetadata = this.Resource as ResourceMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes LockDelete to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes LockDelete to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Resource != null) {
      const f = this.Resource as ResourceMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode LockDelete
} // LockDelete

// RecoveryCodeGenerate is emitted when a user's new recovery codes are generated and updated.
export class RecoveryCodeGenerate {
  // Metadata is a common event metadata.
  public Metadata: Metadata = new Metadata();
  // User is a common user event metadata.
  public User: UserMetadata = new UserMetadata();

  // Decodes RecoveryCodeGenerate from an ArrayBuffer
  static decode(buf: ArrayBuffer): RecoveryCodeGenerate {
    return RecoveryCodeGenerate.decodeDataView(new DataView(buf));
  }

  // Decodes RecoveryCodeGenerate from a DataView
  static decodeDataView(view: DataView): RecoveryCodeGenerate {
    const decoder = new __proto.Decoder(view);
    const obj = new RecoveryCodeGenerate();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.User = UserMetadata.decodeDataView(
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
  } // decode RecoveryCodeGenerate

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes RecoveryCodeGenerate to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes RecoveryCodeGenerate to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode RecoveryCodeGenerate
} // RecoveryCodeGenerate

/**
 * RecoveryCodeUsed is emitted when a user's recovery code was used successfully or
 *  unsuccessfully.
 */
export class RecoveryCodeUsed {
  // Metadata is a common event metadata.
  public Metadata: Metadata = new Metadata();
  // User is a common user event metadata.
  public User: UserMetadata = new UserMetadata();
  // Status contains fields to indicate whether attempt was successful or not.
  public Status: Status = new Status();

  // Decodes RecoveryCodeUsed from an ArrayBuffer
  static decode(buf: ArrayBuffer): RecoveryCodeUsed {
    return RecoveryCodeUsed.decodeDataView(new DataView(buf));
  }

  // Decodes RecoveryCodeUsed from a DataView
  static decodeDataView(view: DataView): RecoveryCodeUsed {
    const decoder = new __proto.Decoder(view);
    const obj = new RecoveryCodeUsed();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.User = UserMetadata.decodeDataView(
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
          obj.Status = Status.decodeDataView(
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
  } // decode RecoveryCodeUsed

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Status != null) {
      const f: Status = this.Status as Status;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes RecoveryCodeUsed to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes RecoveryCodeUsed to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Status != null) {
      const f = this.Status as Status;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode RecoveryCodeUsed
} // RecoveryCodeUsed

// WindowsDesktopSessionEnd is emitted when a user ends a Windows desktop session.
export class WindowsDesktopSessionEnd {
  // Metadata is a common event metadata.
  public Metadata: Metadata = new Metadata();
  // User is a common user event metadata.
  public User: UserMetadata = new UserMetadata();
  // Session is a common event session metadata.
  public Session: SessionMetadata = new SessionMetadata();
  // WindowsDesktopService is the name of the service proxying the RDP session.
  public WindowsDesktopService: string = "";
  // DesktopAddr is the address of the desktop being accessed.
  public DesktopAddr: string = "";
  // Domain is the Active Directory domain of the desktop being accessed.
  public Domain: string = "";
  // WindowsUser is the Windows username used to connect.
  public WindowsUser: string = "";
  // DesktopLabels are the labels on the desktop resource.
  public DesktopLabels: Map<string, string> = new Map<string, string>();
  // StartTime is the timestamp at which the session began.
  public StartTime: google.protobuf.Timestamp = new google.protobuf.Timestamp();
  // EndTime is the timestamp at which the session ended.
  public EndTime: google.protobuf.Timestamp = new google.protobuf.Timestamp();
  // DesktopName is the name of the desktop resource.
  public DesktopName: string = "";
  // Recorded is true if the session was recorded, false otherwise.
  public Recorded: bool;
  // Participants is a list of participants in the session.
  public Participants: Array<string> = new Array<string>();

  // Decodes WindowsDesktopSessionEnd from an ArrayBuffer
  static decode(buf: ArrayBuffer): WindowsDesktopSessionEnd {
    return WindowsDesktopSessionEnd.decodeDataView(new DataView(buf));
  }

  // Decodes WindowsDesktopSessionEnd from a DataView
  static decodeDataView(view: DataView): WindowsDesktopSessionEnd {
    const decoder = new __proto.Decoder(view);
    const obj = new WindowsDesktopSessionEnd();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.User = UserMetadata.decodeDataView(
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
          obj.Session = SessionMetadata.decodeDataView(
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
          obj.WindowsDesktopService = decoder.string();
          break;
        }
        case 5: {
          obj.DesktopAddr = decoder.string();
          break;
        }
        case 6: {
          obj.Domain = decoder.string();
          break;
        }
        case 7: {
          obj.WindowsUser = decoder.string();
          break;
        }
        case 8: {
          const length = decoder.uint32();
          __decodeMap_string_string(decoder, length, obj.DesktopLabels);
          decoder.skip(length);

          break;
        }
        case 9: {
          const length = decoder.uint32();
          obj.StartTime = google.protobuf.Timestamp.decodeDataView(
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
          obj.EndTime = google.protobuf.Timestamp.decodeDataView(
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
          obj.DesktopName = decoder.string();
          break;
        }
        case 12: {
          obj.Recorded = decoder.bool();
          break;
        }
        case 13: {
          obj.Participants.push(decoder.string());
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode WindowsDesktopSessionEnd

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Session != null) {
      const f: SessionMetadata = this.Session as SessionMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.WindowsDesktopService.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.WindowsDesktopService.length) +
          this.WindowsDesktopService.length
        : 0;
    size +=
      this.DesktopAddr.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.DesktopAddr.length) +
          this.DesktopAddr.length
        : 0;
    size +=
      this.Domain.length > 0
        ? 1 + __proto.Sizer.varint64(this.Domain.length) + this.Domain.length
        : 0;
    size +=
      this.WindowsUser.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.WindowsUser.length) +
          this.WindowsUser.length
        : 0;

    if (this.DesktopLabels.size > 0) {
      const keys = this.DesktopLabels.keys();

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = this.DesktopLabels.get(key);
        const itemSize = __sizeMapEntry_string_string(key, value);
        if (itemSize > 0) {
          size += 1 + __proto.Sizer.varint64(itemSize) + itemSize;
        }
      }
    }

    if (this.StartTime != null) {
      const f: google.protobuf.Timestamp = this
        .StartTime as google.protobuf.Timestamp;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.EndTime != null) {
      const f: google.protobuf.Timestamp = this
        .EndTime as google.protobuf.Timestamp;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.DesktopName.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.DesktopName.length) +
          this.DesktopName.length
        : 0;
    size += this.Recorded == 0 ? 0 : 1 + 1;

    size += __size_string_repeated(this.Participants);

    return size;
  }

  // Encodes WindowsDesktopSessionEnd to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes WindowsDesktopSessionEnd to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Session != null) {
      const f = this.Session as SessionMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.WindowsDesktopService.length > 0) {
      encoder.uint32(0x22);
      encoder.uint32(this.WindowsDesktopService.length);
      encoder.string(this.WindowsDesktopService);
    }
    if (this.DesktopAddr.length > 0) {
      encoder.uint32(0x2a);
      encoder.uint32(this.DesktopAddr.length);
      encoder.string(this.DesktopAddr);
    }
    if (this.Domain.length > 0) {
      encoder.uint32(0x32);
      encoder.uint32(this.Domain.length);
      encoder.string(this.Domain);
    }
    if (this.WindowsUser.length > 0) {
      encoder.uint32(0x3a);
      encoder.uint32(this.WindowsUser.length);
      encoder.string(this.WindowsUser);
    }

    if (this.DesktopLabels.size > 0) {
      const keys = this.DesktopLabels.keys();
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = this.DesktopLabels.get(key);
        const size = __sizeMapEntry_string_string(key, value);
        if (size > 0) {
          encoder.uint32(0x42);
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

    if (this.StartTime != null) {
      const f = this.StartTime as google.protobuf.Timestamp;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x4a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.EndTime != null) {
      const f = this.EndTime as google.protobuf.Timestamp;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x52);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.DesktopName.length > 0) {
      encoder.uint32(0x5a);
      encoder.uint32(this.DesktopName.length);
      encoder.string(this.DesktopName);
    }
    if (this.Recorded != 0) {
      encoder.uint32(0x60);
      encoder.bool(this.Recorded);
    }

    if (this.Participants.length > 0) {
      for (let n: i32 = 0; n < this.Participants.length; n++) {
        encoder.uint32(0x6a);
        encoder.uint32(this.Participants[n].length);
        encoder.string(this.Participants[n]);
      }
    }

    return buf;
  } // encode WindowsDesktopSessionEnd
} // WindowsDesktopSessionEnd

// CertificateCreate is emitted when a certificate is issued.
export class CertificateCreate {
  // Metadata is a common event metadata.
  public Metadata: Metadata = new Metadata();
  // CertificateType is the type of certificate that was just issued.
  public CertificateType: string = "";
  // Identity is the identity associated with the certificate, as interpreted by Teleport.
  public Identity: Identity = new Identity();

  // Decodes CertificateCreate from an ArrayBuffer
  static decode(buf: ArrayBuffer): CertificateCreate {
    return CertificateCreate.decodeDataView(new DataView(buf));
  }

  // Decodes CertificateCreate from a DataView
  static decodeDataView(view: DataView): CertificateCreate {
    const decoder = new __proto.Decoder(view);
    const obj = new CertificateCreate();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          obj.CertificateType = decoder.string();
          break;
        }
        case 3: {
          const length = decoder.uint32();
          obj.Identity = Identity.decodeDataView(
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
  } // decode CertificateCreate

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.CertificateType.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.CertificateType.length) +
          this.CertificateType.length
        : 0;

    if (this.Identity != null) {
      const f: Identity = this.Identity as Identity;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes CertificateCreate to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes CertificateCreate to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.CertificateType.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.CertificateType.length);
      encoder.string(this.CertificateType);
    }

    if (this.Identity != null) {
      const f = this.Identity as Identity;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode CertificateCreate
} // CertificateCreate

/**
 * RenewableCertificateGenerationMismatch is emitted when a renewable
 *  certificiate's generation counter fails to validate, possibly indicating a
 *  stolen certificate and an invalid renewal attempt.
 */
export class RenewableCertificateGenerationMismatch {
  // Metadata is a common event metadata.
  public Metadata: Metadata = new Metadata();
  // UserMetadata is a common user event metadata.
  public UserMetadata: UserMetadata = new UserMetadata();

  // Decodes RenewableCertificateGenerationMismatch from an ArrayBuffer
  static decode(buf: ArrayBuffer): RenewableCertificateGenerationMismatch {
    return RenewableCertificateGenerationMismatch.decodeDataView(
      new DataView(buf)
    );
  }

  // Decodes RenewableCertificateGenerationMismatch from a DataView
  static decodeDataView(
    view: DataView
  ): RenewableCertificateGenerationMismatch {
    const decoder = new __proto.Decoder(view);
    const obj = new RenewableCertificateGenerationMismatch();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.UserMetadata = UserMetadata.decodeDataView(
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
  } // decode RenewableCertificateGenerationMismatch

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.UserMetadata != null) {
      const f: UserMetadata = this.UserMetadata as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes RenewableCertificateGenerationMismatch to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes RenewableCertificateGenerationMismatch to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.UserMetadata != null) {
      const f = this.UserMetadata as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode RenewableCertificateGenerationMismatch
} // RenewableCertificateGenerationMismatch

// Unknown is a fallback event used when we don't recognize an event from the backend.
export class Unknown {
  // Metadata is a common event metadata.
  public Metadata: Metadata = new Metadata();
  // UnknownType is the event type extracted from the unknown event.
  public UnknownType: string = "";
  // UnknownCode is the event code extracted from the unknown event.
  public UnknownCode: string = "";
  // Data is the serialized JSON data of the unknown event.
  public Data: string = "";

  // Decodes Unknown from an ArrayBuffer
  static decode(buf: ArrayBuffer): Unknown {
    return Unknown.decodeDataView(new DataView(buf));
  }

  // Decodes Unknown from a DataView
  static decodeDataView(view: DataView): Unknown {
    const decoder = new __proto.Decoder(view);
    const obj = new Unknown();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          obj.UnknownType = decoder.string();
          break;
        }
        case 3: {
          obj.UnknownCode = decoder.string();
          break;
        }
        case 4: {
          obj.Data = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode Unknown

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.UnknownType.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.UnknownType.length) +
          this.UnknownType.length
        : 0;
    size +=
      this.UnknownCode.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.UnknownCode.length) +
          this.UnknownCode.length
        : 0;
    size +=
      this.Data.length > 0
        ? 1 + __proto.Sizer.varint64(this.Data.length) + this.Data.length
        : 0;

    return size;
  }

  // Encodes Unknown to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes Unknown to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.UnknownType.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.UnknownType.length);
      encoder.string(this.UnknownType);
    }
    if (this.UnknownCode.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.UnknownCode.length);
      encoder.string(this.UnknownCode);
    }
    if (this.Data.length > 0) {
      encoder.uint32(0x22);
      encoder.uint32(this.Data.length);
      encoder.string(this.Data);
    }

    return buf;
  } // encode Unknown
} // Unknown

// OneOf is a union of one of audit events submitted to the auth service
export class OneOf {
  public UserLogin: UserLogin | null;
  public UserCreate: UserCreate | null;
  public UserDelete: UserDelete | null;
  public UserPasswordChange: UserPasswordChange | null;
  public SessionStart: SessionStart | null;
  public SessionJoin: SessionJoin | null;
  public SessionPrint: SessionPrint | null;
  public SessionReject: SessionReject | null;
  public Resize: Resize | null;
  public SessionEnd: SessionEnd | null;
  public SessionCommand: SessionCommand | null;
  public SessionDisk: SessionDisk | null;
  public SessionNetwork: SessionNetwork | null;
  public SessionData: SessionData | null;
  public SessionLeave: SessionLeave | null;
  public PortForward: PortForward | null;
  public X11Forward: X11Forward | null;
  public SCP: SCP | null;
  public Exec: Exec | null;
  public Subsystem: Subsystem | null;
  public ClientDisconnect: ClientDisconnect | null;
  public AuthAttempt: AuthAttempt | null;
  public AccessRequestCreate: AccessRequestCreate | null;
  public UserTokenCreate: UserTokenCreate | null;
  public RoleCreate: RoleCreate | null;
  public RoleDelete: RoleDelete | null;
  public TrustedClusterCreate: TrustedClusterCreate | null;
  public TrustedClusterDelete: TrustedClusterDelete | null;
  public TrustedClusterTokenCreate: TrustedClusterTokenCreate | null;
  public GithubConnectorCreate: GithubConnectorCreate | null;
  public GithubConnectorDelete: GithubConnectorDelete | null;
  public OIDCConnectorCreate: OIDCConnectorCreate | null;
  public OIDCConnectorDelete: OIDCConnectorDelete | null;
  public SAMLConnectorCreate: SAMLConnectorCreate | null;
  public SAMLConnectorDelete: SAMLConnectorDelete | null;
  public KubeRequest: KubeRequest | null;
  public AppSessionStart: AppSessionStart | null;
  public AppSessionChunk: AppSessionChunk | null;
  public AppSessionRequest: AppSessionRequest | null;
  public DatabaseSessionStart: DatabaseSessionStart | null;
  public DatabaseSessionEnd: DatabaseSessionEnd | null;
  public DatabaseSessionQuery: DatabaseSessionQuery | null;
  public SessionUpload: SessionUpload | null;
  public MFADeviceAdd: MFADeviceAdd | null;
  public MFADeviceDelete: MFADeviceDelete | null;
  public BillingInformationUpdate: BillingInformationUpdate | null;
  public BillingCardCreate: BillingCardCreate | null;
  public BillingCardDelete: BillingCardDelete | null;
  public LockCreate: LockCreate | null;
  public LockDelete: LockDelete | null;
  public RecoveryCodeGenerate: RecoveryCodeGenerate | null;
  public RecoveryCodeUsed: RecoveryCodeUsed | null;
  public DatabaseCreate: DatabaseCreate | null;
  public DatabaseUpdate: DatabaseUpdate | null;
  public DatabaseDelete: DatabaseDelete | null;
  public AppCreate: AppCreate | null;
  public AppUpdate: AppUpdate | null;
  public AppDelete: AppDelete | null;
  public WindowsDesktopSessionStart: WindowsDesktopSessionStart | null;
  public WindowsDesktopSessionEnd: WindowsDesktopSessionEnd | null;
  public PostgresParse: PostgresParse | null;
  public PostgresBind: PostgresBind | null;
  public PostgresExecute: PostgresExecute | null;
  public PostgresClose: PostgresClose | null;
  public PostgresFunctionCall: PostgresFunctionCall | null;
  public AccessRequestDelete: AccessRequestDelete | null;
  public SessionConnect: SessionConnect | null;
  public CertificateCreate: CertificateCreate | null;
  public DesktopRecording: DesktopRecording | null;
  public DesktopClipboardSend: DesktopClipboardSend | null;
  public DesktopClipboardReceive: DesktopClipboardReceive | null;
  public MySQLStatementPrepare: MySQLStatementPrepare | null;
  public MySQLStatementExecute: MySQLStatementExecute | null;
  public MySQLStatementSendLongData: MySQLStatementSendLongData | null;
  public MySQLStatementClose: MySQLStatementClose | null;
  public MySQLStatementReset: MySQLStatementReset | null;
  public MySQLStatementFetch: MySQLStatementFetch | null;
  public MySQLStatementBulkExecute: MySQLStatementBulkExecute | null;
  public RenewableCertificateGenerationMismatch: RenewableCertificateGenerationMismatch | null;
  public Unknown: Unknown | null;

  public type: string = "";
  public type_index: u8 = 0;

  static readonly EVENT_USER_LOGIN_INDEX: u8 = 1;
  static readonly EVENT_USER_CREATE_INDEX: u8 = 2;
  static readonly EVENT_USER_DELETE_INDEX: u8 = 3;
  static readonly EVENT_USER_PASSWORD_CHANGE_INDEX: u8 = 4;
  static readonly EVENT_SESSION_START_INDEX: u8 = 5;
  static readonly EVENT_SESSION_JOIN_INDEX: u8 = 6;
  static readonly EVENT_SESSION_PRINT_INDEX: u8 = 7;
  static readonly EVENT_SESSION_REJECT_INDEX: u8 = 8;
  static readonly EVENT_RESIZE_INDEX: u8 = 9;
  static readonly EVENT_SESSION_END_INDEX: u8 = 10;
  static readonly EVENT_SESSION_COMMAND_INDEX: u8 = 11;
  static readonly EVENT_SESSION_DISK_INDEX: u8 = 12;
  static readonly EVENT_SESSION_NETWORK_INDEX: u8 = 13;
  static readonly EVENT_SESSION_DATA_INDEX: u8 = 14;
  static readonly EVENT_SESSION_LEAVE_INDEX: u8 = 15;
  static readonly EVENT_PORT_FORWARD_INDEX: u8 = 16;
  static readonly EVENT_X11_FORWARD_INDEX: u8 = 17;
  static readonly EVENT_SCP_INDEX: u8 = 18;
  static readonly EVENT_EXEC_INDEX: u8 = 19;
  static readonly EVENT_SUBSYSTEM_INDEX: u8 = 20;
  static readonly EVENT_CLIENT_DISCONNECT_INDEX: u8 = 21;
  static readonly EVENT_AUTH_ATTEMPT_INDEX: u8 = 22;
  static readonly EVENT_ACCESS_REQUEST_CREATE_INDEX: u8 = 23;
  static readonly EVENT_USER_TOKEN_CREATE_INDEX: u8 = 24;
  static readonly EVENT_ROLE_CREATE_INDEX: u8 = 25;
  static readonly EVENT_ROLE_DELETE_INDEX: u8 = 26;
  static readonly EVENT_TRUSTED_CLUSTER_CREATE_INDEX: u8 = 27;
  static readonly EVENT_TRUSTED_CLUSTER_DELETE_INDEX: u8 = 28;
  static readonly EVENT_TRUSTED_CLUSTER_TOKEN_CREATE_INDEX: u8 = 29;
  static readonly EVENT_GITHUB_CONNECTOR_CREATE_INDEX: u8 = 30;
  static readonly EVENT_GITHUB_CONNECTOR_DELETE_INDEX: u8 = 31;
  static readonly EVENT_OIDC_CONNECTOR_CREATE_INDEX: u8 = 32;
  static readonly EVENT_OIDC_CONNECTOR_DELETE_INDEX: u8 = 33;
  static readonly EVENT_SAML_CONNECTOR_CREATE_INDEX: u8 = 34;
  static readonly EVENT_SAML_CONNECTOR_DELETE_INDEX: u8 = 35;
  static readonly EVENT_KUBE_REQUEST_INDEX: u8 = 36;
  static readonly EVENT_APP_SESSION_START_INDEX: u8 = 37;
  static readonly EVENT_APP_SESSION_CHUNK_INDEX: u8 = 38;
  static readonly EVENT_APP_SESSION_REQUEST_INDEX: u8 = 39;
  static readonly EVENT_DATABASE_SESSION_START_INDEX: u8 = 40;
  static readonly EVENT_DATABASE_SESSION_END_INDEX: u8 = 41;
  static readonly EVENT_DATABASE_SESSION_QUERY_INDEX: u8 = 42;
  static readonly EVENT_SESSION_UPLOAD_INDEX: u8 = 43;
  static readonly EVENT_MFA_DEVICE_ADD_INDEX: u8 = 44;
  static readonly EVENT_MFA_DEVICE_DELETE_INDEX: u8 = 45;
  static readonly EVENT_BILLING_INFORMATION_UPDATE_INDEX: u8 = 46;
  static readonly EVENT_BILLING_CARD_CREATE_INDEX: u8 = 47;
  static readonly EVENT_BILLING_CARD_DELETE_INDEX: u8 = 48;
  static readonly EVENT_LOCK_CREATE_INDEX: u8 = 49;
  static readonly EVENT_LOCK_DELETE_INDEX: u8 = 50;
  static readonly EVENT_RECOVERY_CODE_GENERATE_INDEX: u8 = 51;
  static readonly EVENT_RECOVERY_CODE_USED_INDEX: u8 = 52;
  static readonly EVENT_DATABASE_CREATE_INDEX: u8 = 53;
  static readonly EVENT_DATABASE_UPDATE_INDEX: u8 = 54;
  static readonly EVENT_DATABASE_DELETE_INDEX: u8 = 55;
  static readonly EVENT_APP_CREATE_INDEX: u8 = 56;
  static readonly EVENT_APP_UPDATE_INDEX: u8 = 57;
  static readonly EVENT_APP_DELETE_INDEX: u8 = 58;
  static readonly EVENT_WINDOWS_DESKTOP_SESSION_START_INDEX: u8 = 59;
  static readonly EVENT_WINDOWS_DESKTOP_SESSION_END_INDEX: u8 = 60;
  static readonly EVENT_POSTGRES_PARSE_INDEX: u8 = 61;
  static readonly EVENT_POSTGRES_BIND_INDEX: u8 = 62;
  static readonly EVENT_POSTGRES_EXECUTE_INDEX: u8 = 63;
  static readonly EVENT_POSTGRES_CLOSE_INDEX: u8 = 64;
  static readonly EVENT_POSTGRES_FUNCTION_CALL_INDEX: u8 = 65;
  static readonly EVENT_ACCESS_REQUEST_DELETE_INDEX: u8 = 66;
  static readonly EVENT_SESSION_CONNECT_INDEX: u8 = 67;
  static readonly EVENT_CERTIFICATE_CREATE_INDEX: u8 = 68;
  static readonly EVENT_DESKTOP_RECORDING_INDEX: u8 = 69;
  static readonly EVENT_DESKTOP_CLIPBOARD_SEND_INDEX: u8 = 70;
  static readonly EVENT_DESKTOP_CLIPBOARD_RECEIVE_INDEX: u8 = 71;
  static readonly EVENT_MY_SQL_STATEMENT_PREPARE_INDEX: u8 = 72;
  static readonly EVENT_MY_SQL_STATEMENT_EXECUTE_INDEX: u8 = 73;
  static readonly EVENT_MY_SQL_STATEMENT_SEND_LONG_DATA_INDEX: u8 = 74;
  static readonly EVENT_MY_SQL_STATEMENT_CLOSE_INDEX: u8 = 75;
  static readonly EVENT_MY_SQL_STATEMENT_RESET_INDEX: u8 = 76;
  static readonly EVENT_MY_SQL_STATEMENT_FETCH_INDEX: u8 = 77;
  static readonly EVENT_MY_SQL_STATEMENT_BULK_EXECUTE_INDEX: u8 = 78;
  static readonly EVENT_RENEWABLE_CERTIFICATE_GENERATION_MISMATCH_INDEX: u8 = 79;
  static readonly EVENT_UNKNOWN_INDEX: u8 = 80;

  // Decodes OneOf from an ArrayBuffer
  static decode(buf: ArrayBuffer): OneOf {
    return OneOf.decodeDataView(new DataView(buf));
  }

  // Decodes OneOf from a DataView
  static decodeDataView(view: DataView): OneOf {
    const decoder = new __proto.Decoder(view);
    const obj = new OneOf();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          const length = decoder.uint32();
          obj.UserLogin = UserLogin.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "UserLogin";
          obj.type_index = 1;
          break;
        }
        case 2: {
          const length = decoder.uint32();
          obj.UserCreate = UserCreate.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "UserCreate";
          obj.type_index = 2;
          break;
        }
        case 3: {
          const length = decoder.uint32();
          obj.UserDelete = UserDelete.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "UserDelete";
          obj.type_index = 3;
          break;
        }
        case 4: {
          const length = decoder.uint32();
          obj.UserPasswordChange = UserPasswordChange.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "UserPasswordChange";
          obj.type_index = 4;
          break;
        }
        case 5: {
          const length = decoder.uint32();
          obj.SessionStart = SessionStart.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "SessionStart";
          obj.type_index = 5;
          break;
        }
        case 6: {
          const length = decoder.uint32();
          obj.SessionJoin = SessionJoin.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "SessionJoin";
          obj.type_index = 6;
          break;
        }
        case 7: {
          const length = decoder.uint32();
          obj.SessionPrint = SessionPrint.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "SessionPrint";
          obj.type_index = 7;
          break;
        }
        case 8: {
          const length = decoder.uint32();
          obj.SessionReject = SessionReject.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "SessionReject";
          obj.type_index = 8;
          break;
        }
        case 9: {
          const length = decoder.uint32();
          obj.Resize = Resize.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "Resize";
          obj.type_index = 9;
          break;
        }
        case 10: {
          const length = decoder.uint32();
          obj.SessionEnd = SessionEnd.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "SessionEnd";
          obj.type_index = 10;
          break;
        }
        case 11: {
          const length = decoder.uint32();
          obj.SessionCommand = SessionCommand.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "SessionCommand";
          obj.type_index = 11;
          break;
        }
        case 12: {
          const length = decoder.uint32();
          obj.SessionDisk = SessionDisk.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "SessionDisk";
          obj.type_index = 12;
          break;
        }
        case 13: {
          const length = decoder.uint32();
          obj.SessionNetwork = SessionNetwork.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "SessionNetwork";
          obj.type_index = 13;
          break;
        }
        case 14: {
          const length = decoder.uint32();
          obj.SessionData = SessionData.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "SessionData";
          obj.type_index = 14;
          break;
        }
        case 15: {
          const length = decoder.uint32();
          obj.SessionLeave = SessionLeave.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "SessionLeave";
          obj.type_index = 15;
          break;
        }
        case 16: {
          const length = decoder.uint32();
          obj.PortForward = PortForward.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "PortForward";
          obj.type_index = 16;
          break;
        }
        case 17: {
          const length = decoder.uint32();
          obj.X11Forward = X11Forward.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "X11Forward";
          obj.type_index = 17;
          break;
        }
        case 18: {
          const length = decoder.uint32();
          obj.SCP = SCP.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "SCP";
          obj.type_index = 18;
          break;
        }
        case 19: {
          const length = decoder.uint32();
          obj.Exec = Exec.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "Exec";
          obj.type_index = 19;
          break;
        }
        case 20: {
          const length = decoder.uint32();
          obj.Subsystem = Subsystem.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "Subsystem";
          obj.type_index = 20;
          break;
        }
        case 21: {
          const length = decoder.uint32();
          obj.ClientDisconnect = ClientDisconnect.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "ClientDisconnect";
          obj.type_index = 21;
          break;
        }
        case 22: {
          const length = decoder.uint32();
          obj.AuthAttempt = AuthAttempt.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "AuthAttempt";
          obj.type_index = 22;
          break;
        }
        case 23: {
          const length = decoder.uint32();
          obj.AccessRequestCreate = AccessRequestCreate.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "AccessRequestCreate";
          obj.type_index = 23;
          break;
        }
        case 24: {
          const length = decoder.uint32();
          obj.UserTokenCreate = UserTokenCreate.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "UserTokenCreate";
          obj.type_index = 24;
          break;
        }
        case 25: {
          const length = decoder.uint32();
          obj.RoleCreate = RoleCreate.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "RoleCreate";
          obj.type_index = 25;
          break;
        }
        case 26: {
          const length = decoder.uint32();
          obj.RoleDelete = RoleDelete.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "RoleDelete";
          obj.type_index = 26;
          break;
        }
        case 27: {
          const length = decoder.uint32();
          obj.TrustedClusterCreate = TrustedClusterCreate.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "TrustedClusterCreate";
          obj.type_index = 27;
          break;
        }
        case 28: {
          const length = decoder.uint32();
          obj.TrustedClusterDelete = TrustedClusterDelete.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "TrustedClusterDelete";
          obj.type_index = 28;
          break;
        }
        case 29: {
          const length = decoder.uint32();
          obj.TrustedClusterTokenCreate =
            TrustedClusterTokenCreate.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length
              )
            );
          decoder.skip(length);

          obj.type = "TrustedClusterTokenCreate";
          obj.type_index = 29;
          break;
        }
        case 30: {
          const length = decoder.uint32();
          obj.GithubConnectorCreate = GithubConnectorCreate.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "GithubConnectorCreate";
          obj.type_index = 30;
          break;
        }
        case 31: {
          const length = decoder.uint32();
          obj.GithubConnectorDelete = GithubConnectorDelete.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "GithubConnectorDelete";
          obj.type_index = 31;
          break;
        }
        case 32: {
          const length = decoder.uint32();
          obj.OIDCConnectorCreate = OIDCConnectorCreate.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "OIDCConnectorCreate";
          obj.type_index = 32;
          break;
        }
        case 33: {
          const length = decoder.uint32();
          obj.OIDCConnectorDelete = OIDCConnectorDelete.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "OIDCConnectorDelete";
          obj.type_index = 33;
          break;
        }
        case 34: {
          const length = decoder.uint32();
          obj.SAMLConnectorCreate = SAMLConnectorCreate.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "SAMLConnectorCreate";
          obj.type_index = 34;
          break;
        }
        case 35: {
          const length = decoder.uint32();
          obj.SAMLConnectorDelete = SAMLConnectorDelete.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "SAMLConnectorDelete";
          obj.type_index = 35;
          break;
        }
        case 36: {
          const length = decoder.uint32();
          obj.KubeRequest = KubeRequest.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "KubeRequest";
          obj.type_index = 36;
          break;
        }
        case 37: {
          const length = decoder.uint32();
          obj.AppSessionStart = AppSessionStart.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "AppSessionStart";
          obj.type_index = 37;
          break;
        }
        case 38: {
          const length = decoder.uint32();
          obj.AppSessionChunk = AppSessionChunk.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "AppSessionChunk";
          obj.type_index = 38;
          break;
        }
        case 39: {
          const length = decoder.uint32();
          obj.AppSessionRequest = AppSessionRequest.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "AppSessionRequest";
          obj.type_index = 39;
          break;
        }
        case 40: {
          const length = decoder.uint32();
          obj.DatabaseSessionStart = DatabaseSessionStart.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "DatabaseSessionStart";
          obj.type_index = 40;
          break;
        }
        case 41: {
          const length = decoder.uint32();
          obj.DatabaseSessionEnd = DatabaseSessionEnd.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "DatabaseSessionEnd";
          obj.type_index = 41;
          break;
        }
        case 42: {
          const length = decoder.uint32();
          obj.DatabaseSessionQuery = DatabaseSessionQuery.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "DatabaseSessionQuery";
          obj.type_index = 42;
          break;
        }
        case 43: {
          const length = decoder.uint32();
          obj.SessionUpload = SessionUpload.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "SessionUpload";
          obj.type_index = 43;
          break;
        }
        case 44: {
          const length = decoder.uint32();
          obj.MFADeviceAdd = MFADeviceAdd.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "MFADeviceAdd";
          obj.type_index = 44;
          break;
        }
        case 45: {
          const length = decoder.uint32();
          obj.MFADeviceDelete = MFADeviceDelete.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "MFADeviceDelete";
          obj.type_index = 45;
          break;
        }
        case 46: {
          const length = decoder.uint32();
          obj.BillingInformationUpdate =
            BillingInformationUpdate.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length
              )
            );
          decoder.skip(length);

          obj.type = "BillingInformationUpdate";
          obj.type_index = 46;
          break;
        }
        case 47: {
          const length = decoder.uint32();
          obj.BillingCardCreate = BillingCardCreate.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "BillingCardCreate";
          obj.type_index = 47;
          break;
        }
        case 48: {
          const length = decoder.uint32();
          obj.BillingCardDelete = BillingCardDelete.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "BillingCardDelete";
          obj.type_index = 48;
          break;
        }
        case 49: {
          const length = decoder.uint32();
          obj.LockCreate = LockCreate.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "LockCreate";
          obj.type_index = 49;
          break;
        }
        case 50: {
          const length = decoder.uint32();
          obj.LockDelete = LockDelete.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "LockDelete";
          obj.type_index = 50;
          break;
        }
        case 51: {
          const length = decoder.uint32();
          obj.RecoveryCodeGenerate = RecoveryCodeGenerate.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "RecoveryCodeGenerate";
          obj.type_index = 51;
          break;
        }
        case 52: {
          const length = decoder.uint32();
          obj.RecoveryCodeUsed = RecoveryCodeUsed.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "RecoveryCodeUsed";
          obj.type_index = 52;
          break;
        }
        case 53: {
          const length = decoder.uint32();
          obj.DatabaseCreate = DatabaseCreate.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "DatabaseCreate";
          obj.type_index = 53;
          break;
        }
        case 54: {
          const length = decoder.uint32();
          obj.DatabaseUpdate = DatabaseUpdate.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "DatabaseUpdate";
          obj.type_index = 54;
          break;
        }
        case 55: {
          const length = decoder.uint32();
          obj.DatabaseDelete = DatabaseDelete.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "DatabaseDelete";
          obj.type_index = 55;
          break;
        }
        case 56: {
          const length = decoder.uint32();
          obj.AppCreate = AppCreate.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "AppCreate";
          obj.type_index = 56;
          break;
        }
        case 57: {
          const length = decoder.uint32();
          obj.AppUpdate = AppUpdate.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "AppUpdate";
          obj.type_index = 57;
          break;
        }
        case 58: {
          const length = decoder.uint32();
          obj.AppDelete = AppDelete.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "AppDelete";
          obj.type_index = 58;
          break;
        }
        case 59: {
          const length = decoder.uint32();
          obj.WindowsDesktopSessionStart =
            WindowsDesktopSessionStart.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length
              )
            );
          decoder.skip(length);

          obj.type = "WindowsDesktopSessionStart";
          obj.type_index = 59;
          break;
        }
        case 60: {
          const length = decoder.uint32();
          obj.WindowsDesktopSessionEnd =
            WindowsDesktopSessionEnd.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length
              )
            );
          decoder.skip(length);

          obj.type = "WindowsDesktopSessionEnd";
          obj.type_index = 60;
          break;
        }
        case 61: {
          const length = decoder.uint32();
          obj.PostgresParse = PostgresParse.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "PostgresParse";
          obj.type_index = 61;
          break;
        }
        case 62: {
          const length = decoder.uint32();
          obj.PostgresBind = PostgresBind.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "PostgresBind";
          obj.type_index = 62;
          break;
        }
        case 63: {
          const length = decoder.uint32();
          obj.PostgresExecute = PostgresExecute.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "PostgresExecute";
          obj.type_index = 63;
          break;
        }
        case 64: {
          const length = decoder.uint32();
          obj.PostgresClose = PostgresClose.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "PostgresClose";
          obj.type_index = 64;
          break;
        }
        case 65: {
          const length = decoder.uint32();
          obj.PostgresFunctionCall = PostgresFunctionCall.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "PostgresFunctionCall";
          obj.type_index = 65;
          break;
        }
        case 66: {
          const length = decoder.uint32();
          obj.AccessRequestDelete = AccessRequestDelete.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "AccessRequestDelete";
          obj.type_index = 66;
          break;
        }
        case 67: {
          const length = decoder.uint32();
          obj.SessionConnect = SessionConnect.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "SessionConnect";
          obj.type_index = 67;
          break;
        }
        case 68: {
          const length = decoder.uint32();
          obj.CertificateCreate = CertificateCreate.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "CertificateCreate";
          obj.type_index = 68;
          break;
        }
        case 69: {
          const length = decoder.uint32();
          obj.DesktopRecording = DesktopRecording.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "DesktopRecording";
          obj.type_index = 69;
          break;
        }
        case 70: {
          const length = decoder.uint32();
          obj.DesktopClipboardSend = DesktopClipboardSend.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "DesktopClipboardSend";
          obj.type_index = 70;
          break;
        }
        case 71: {
          const length = decoder.uint32();
          obj.DesktopClipboardReceive = DesktopClipboardReceive.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "DesktopClipboardReceive";
          obj.type_index = 71;
          break;
        }
        case 72: {
          const length = decoder.uint32();
          obj.MySQLStatementPrepare = MySQLStatementPrepare.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "MySQLStatementPrepare";
          obj.type_index = 72;
          break;
        }
        case 73: {
          const length = decoder.uint32();
          obj.MySQLStatementExecute = MySQLStatementExecute.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "MySQLStatementExecute";
          obj.type_index = 73;
          break;
        }
        case 74: {
          const length = decoder.uint32();
          obj.MySQLStatementSendLongData =
            MySQLStatementSendLongData.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length
              )
            );
          decoder.skip(length);

          obj.type = "MySQLStatementSendLongData";
          obj.type_index = 74;
          break;
        }
        case 75: {
          const length = decoder.uint32();
          obj.MySQLStatementClose = MySQLStatementClose.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "MySQLStatementClose";
          obj.type_index = 75;
          break;
        }
        case 76: {
          const length = decoder.uint32();
          obj.MySQLStatementReset = MySQLStatementReset.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "MySQLStatementReset";
          obj.type_index = 76;
          break;
        }
        case 77: {
          const length = decoder.uint32();
          obj.MySQLStatementFetch = MySQLStatementFetch.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "MySQLStatementFetch";
          obj.type_index = 77;
          break;
        }
        case 78: {
          const length = decoder.uint32();
          obj.MySQLStatementBulkExecute =
            MySQLStatementBulkExecute.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length
              )
            );
          decoder.skip(length);

          obj.type = "MySQLStatementBulkExecute";
          obj.type_index = 78;
          break;
        }
        case 79: {
          const length = decoder.uint32();
          obj.RenewableCertificateGenerationMismatch =
            RenewableCertificateGenerationMismatch.decodeDataView(
              new DataView(
                decoder.view.buffer,
                decoder.pos + decoder.view.byteOffset,
                length
              )
            );
          decoder.skip(length);

          obj.type = "RenewableCertificateGenerationMismatch";
          obj.type_index = 79;
          break;
        }
        case 80: {
          const length = decoder.uint32();
          obj.Unknown = Unknown.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.type = "Unknown";
          obj.type_index = 80;
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode OneOf

  public size(): u32 {
    let size: u32 = 0;

    if (this.UserLogin != null) {
      const f: UserLogin = this.UserLogin as UserLogin;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.UserCreate != null) {
      const f: UserCreate = this.UserCreate as UserCreate;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.UserDelete != null) {
      const f: UserDelete = this.UserDelete as UserDelete;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.UserPasswordChange != null) {
      const f: UserPasswordChange = this
        .UserPasswordChange as UserPasswordChange;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.SessionStart != null) {
      const f: SessionStart = this.SessionStart as SessionStart;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.SessionJoin != null) {
      const f: SessionJoin = this.SessionJoin as SessionJoin;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.SessionPrint != null) {
      const f: SessionPrint = this.SessionPrint as SessionPrint;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.SessionReject != null) {
      const f: SessionReject = this.SessionReject as SessionReject;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Resize != null) {
      const f: Resize = this.Resize as Resize;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.SessionEnd != null) {
      const f: SessionEnd = this.SessionEnd as SessionEnd;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.SessionCommand != null) {
      const f: SessionCommand = this.SessionCommand as SessionCommand;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.SessionDisk != null) {
      const f: SessionDisk = this.SessionDisk as SessionDisk;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.SessionNetwork != null) {
      const f: SessionNetwork = this.SessionNetwork as SessionNetwork;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.SessionData != null) {
      const f: SessionData = this.SessionData as SessionData;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.SessionLeave != null) {
      const f: SessionLeave = this.SessionLeave as SessionLeave;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.PortForward != null) {
      const f: PortForward = this.PortForward as PortForward;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.X11Forward != null) {
      const f: X11Forward = this.X11Forward as X11Forward;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.SCP != null) {
      const f: SCP = this.SCP as SCP;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Exec != null) {
      const f: Exec = this.Exec as Exec;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Subsystem != null) {
      const f: Subsystem = this.Subsystem as Subsystem;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.ClientDisconnect != null) {
      const f: ClientDisconnect = this.ClientDisconnect as ClientDisconnect;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.AuthAttempt != null) {
      const f: AuthAttempt = this.AuthAttempt as AuthAttempt;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.AccessRequestCreate != null) {
      const f: AccessRequestCreate = this
        .AccessRequestCreate as AccessRequestCreate;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.UserTokenCreate != null) {
      const f: UserTokenCreate = this.UserTokenCreate as UserTokenCreate;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.RoleCreate != null) {
      const f: RoleCreate = this.RoleCreate as RoleCreate;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.RoleDelete != null) {
      const f: RoleDelete = this.RoleDelete as RoleDelete;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.TrustedClusterCreate != null) {
      const f: TrustedClusterCreate = this
        .TrustedClusterCreate as TrustedClusterCreate;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.TrustedClusterDelete != null) {
      const f: TrustedClusterDelete = this
        .TrustedClusterDelete as TrustedClusterDelete;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.TrustedClusterTokenCreate != null) {
      const f: TrustedClusterTokenCreate = this
        .TrustedClusterTokenCreate as TrustedClusterTokenCreate;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.GithubConnectorCreate != null) {
      const f: GithubConnectorCreate = this
        .GithubConnectorCreate as GithubConnectorCreate;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.GithubConnectorDelete != null) {
      const f: GithubConnectorDelete = this
        .GithubConnectorDelete as GithubConnectorDelete;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.OIDCConnectorCreate != null) {
      const f: OIDCConnectorCreate = this
        .OIDCConnectorCreate as OIDCConnectorCreate;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.OIDCConnectorDelete != null) {
      const f: OIDCConnectorDelete = this
        .OIDCConnectorDelete as OIDCConnectorDelete;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.SAMLConnectorCreate != null) {
      const f: SAMLConnectorCreate = this
        .SAMLConnectorCreate as SAMLConnectorCreate;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.SAMLConnectorDelete != null) {
      const f: SAMLConnectorDelete = this
        .SAMLConnectorDelete as SAMLConnectorDelete;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.KubeRequest != null) {
      const f: KubeRequest = this.KubeRequest as KubeRequest;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.AppSessionStart != null) {
      const f: AppSessionStart = this.AppSessionStart as AppSessionStart;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.AppSessionChunk != null) {
      const f: AppSessionChunk = this.AppSessionChunk as AppSessionChunk;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.AppSessionRequest != null) {
      const f: AppSessionRequest = this.AppSessionRequest as AppSessionRequest;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.DatabaseSessionStart != null) {
      const f: DatabaseSessionStart = this
        .DatabaseSessionStart as DatabaseSessionStart;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.DatabaseSessionEnd != null) {
      const f: DatabaseSessionEnd = this
        .DatabaseSessionEnd as DatabaseSessionEnd;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.DatabaseSessionQuery != null) {
      const f: DatabaseSessionQuery = this
        .DatabaseSessionQuery as DatabaseSessionQuery;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.SessionUpload != null) {
      const f: SessionUpload = this.SessionUpload as SessionUpload;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.MFADeviceAdd != null) {
      const f: MFADeviceAdd = this.MFADeviceAdd as MFADeviceAdd;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.MFADeviceDelete != null) {
      const f: MFADeviceDelete = this.MFADeviceDelete as MFADeviceDelete;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.BillingInformationUpdate != null) {
      const f: BillingInformationUpdate = this
        .BillingInformationUpdate as BillingInformationUpdate;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.BillingCardCreate != null) {
      const f: BillingCardCreate = this.BillingCardCreate as BillingCardCreate;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.BillingCardDelete != null) {
      const f: BillingCardDelete = this.BillingCardDelete as BillingCardDelete;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.LockCreate != null) {
      const f: LockCreate = this.LockCreate as LockCreate;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.LockDelete != null) {
      const f: LockDelete = this.LockDelete as LockDelete;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.RecoveryCodeGenerate != null) {
      const f: RecoveryCodeGenerate = this
        .RecoveryCodeGenerate as RecoveryCodeGenerate;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.RecoveryCodeUsed != null) {
      const f: RecoveryCodeUsed = this.RecoveryCodeUsed as RecoveryCodeUsed;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.DatabaseCreate != null) {
      const f: DatabaseCreate = this.DatabaseCreate as DatabaseCreate;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.DatabaseUpdate != null) {
      const f: DatabaseUpdate = this.DatabaseUpdate as DatabaseUpdate;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.DatabaseDelete != null) {
      const f: DatabaseDelete = this.DatabaseDelete as DatabaseDelete;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.AppCreate != null) {
      const f: AppCreate = this.AppCreate as AppCreate;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.AppUpdate != null) {
      const f: AppUpdate = this.AppUpdate as AppUpdate;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.AppDelete != null) {
      const f: AppDelete = this.AppDelete as AppDelete;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.WindowsDesktopSessionStart != null) {
      const f: WindowsDesktopSessionStart = this
        .WindowsDesktopSessionStart as WindowsDesktopSessionStart;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.WindowsDesktopSessionEnd != null) {
      const f: WindowsDesktopSessionEnd = this
        .WindowsDesktopSessionEnd as WindowsDesktopSessionEnd;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.PostgresParse != null) {
      const f: PostgresParse = this.PostgresParse as PostgresParse;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.PostgresBind != null) {
      const f: PostgresBind = this.PostgresBind as PostgresBind;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.PostgresExecute != null) {
      const f: PostgresExecute = this.PostgresExecute as PostgresExecute;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.PostgresClose != null) {
      const f: PostgresClose = this.PostgresClose as PostgresClose;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.PostgresFunctionCall != null) {
      const f: PostgresFunctionCall = this
        .PostgresFunctionCall as PostgresFunctionCall;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.AccessRequestDelete != null) {
      const f: AccessRequestDelete = this
        .AccessRequestDelete as AccessRequestDelete;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.SessionConnect != null) {
      const f: SessionConnect = this.SessionConnect as SessionConnect;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.CertificateCreate != null) {
      const f: CertificateCreate = this.CertificateCreate as CertificateCreate;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.DesktopRecording != null) {
      const f: DesktopRecording = this.DesktopRecording as DesktopRecording;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.DesktopClipboardSend != null) {
      const f: DesktopClipboardSend = this
        .DesktopClipboardSend as DesktopClipboardSend;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.DesktopClipboardReceive != null) {
      const f: DesktopClipboardReceive = this
        .DesktopClipboardReceive as DesktopClipboardReceive;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.MySQLStatementPrepare != null) {
      const f: MySQLStatementPrepare = this
        .MySQLStatementPrepare as MySQLStatementPrepare;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.MySQLStatementExecute != null) {
      const f: MySQLStatementExecute = this
        .MySQLStatementExecute as MySQLStatementExecute;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.MySQLStatementSendLongData != null) {
      const f: MySQLStatementSendLongData = this
        .MySQLStatementSendLongData as MySQLStatementSendLongData;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.MySQLStatementClose != null) {
      const f: MySQLStatementClose = this
        .MySQLStatementClose as MySQLStatementClose;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.MySQLStatementReset != null) {
      const f: MySQLStatementReset = this
        .MySQLStatementReset as MySQLStatementReset;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.MySQLStatementFetch != null) {
      const f: MySQLStatementFetch = this
        .MySQLStatementFetch as MySQLStatementFetch;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.MySQLStatementBulkExecute != null) {
      const f: MySQLStatementBulkExecute = this
        .MySQLStatementBulkExecute as MySQLStatementBulkExecute;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.RenewableCertificateGenerationMismatch != null) {
      const f: RenewableCertificateGenerationMismatch = this
        .RenewableCertificateGenerationMismatch as RenewableCertificateGenerationMismatch;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Unknown != null) {
      const f: Unknown = this.Unknown as Unknown;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 2 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes OneOf to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes OneOf to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.UserLogin != null) {
      const f = this.UserLogin as UserLogin;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.UserCreate != null) {
      const f = this.UserCreate as UserCreate;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.UserDelete != null) {
      const f = this.UserDelete as UserDelete;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.UserPasswordChange != null) {
      const f = this.UserPasswordChange as UserPasswordChange;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.SessionStart != null) {
      const f = this.SessionStart as SessionStart;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.SessionJoin != null) {
      const f = this.SessionJoin as SessionJoin;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x32);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.SessionPrint != null) {
      const f = this.SessionPrint as SessionPrint;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x3a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.SessionReject != null) {
      const f = this.SessionReject as SessionReject;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x42);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Resize != null) {
      const f = this.Resize as Resize;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x4a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.SessionEnd != null) {
      const f = this.SessionEnd as SessionEnd;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x52);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.SessionCommand != null) {
      const f = this.SessionCommand as SessionCommand;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x5a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.SessionDisk != null) {
      const f = this.SessionDisk as SessionDisk;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x62);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.SessionNetwork != null) {
      const f = this.SessionNetwork as SessionNetwork;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x6a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.SessionData != null) {
      const f = this.SessionData as SessionData;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x72);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.SessionLeave != null) {
      const f = this.SessionLeave as SessionLeave;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x7a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.PortForward != null) {
      const f = this.PortForward as PortForward;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x82);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.X11Forward != null) {
      const f = this.X11Forward as X11Forward;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x8a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.SCP != null) {
      const f = this.SCP as SCP;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x92);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Exec != null) {
      const f = this.Exec as Exec;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x9a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Subsystem != null) {
      const f = this.Subsystem as Subsystem;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa2);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.ClientDisconnect != null) {
      const f = this.ClientDisconnect as ClientDisconnect;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xaa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.AuthAttempt != null) {
      const f = this.AuthAttempt as AuthAttempt;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xb2);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.AccessRequestCreate != null) {
      const f = this.AccessRequestCreate as AccessRequestCreate;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xba);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.UserTokenCreate != null) {
      const f = this.UserTokenCreate as UserTokenCreate;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xc2);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.RoleCreate != null) {
      const f = this.RoleCreate as RoleCreate;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xca);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.RoleDelete != null) {
      const f = this.RoleDelete as RoleDelete;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xd2);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.TrustedClusterCreate != null) {
      const f = this.TrustedClusterCreate as TrustedClusterCreate;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xda);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.TrustedClusterDelete != null) {
      const f = this.TrustedClusterDelete as TrustedClusterDelete;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xe2);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.TrustedClusterTokenCreate != null) {
      const f = this.TrustedClusterTokenCreate as TrustedClusterTokenCreate;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xea);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.GithubConnectorCreate != null) {
      const f = this.GithubConnectorCreate as GithubConnectorCreate;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xf2);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.GithubConnectorDelete != null) {
      const f = this.GithubConnectorDelete as GithubConnectorDelete;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xfa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.OIDCConnectorCreate != null) {
      const f = this.OIDCConnectorCreate as OIDCConnectorCreate;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x102);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.OIDCConnectorDelete != null) {
      const f = this.OIDCConnectorDelete as OIDCConnectorDelete;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x10a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.SAMLConnectorCreate != null) {
      const f = this.SAMLConnectorCreate as SAMLConnectorCreate;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x112);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.SAMLConnectorDelete != null) {
      const f = this.SAMLConnectorDelete as SAMLConnectorDelete;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x11a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.KubeRequest != null) {
      const f = this.KubeRequest as KubeRequest;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x122);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.AppSessionStart != null) {
      const f = this.AppSessionStart as AppSessionStart;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.AppSessionChunk != null) {
      const f = this.AppSessionChunk as AppSessionChunk;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x132);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.AppSessionRequest != null) {
      const f = this.AppSessionRequest as AppSessionRequest;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x13a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.DatabaseSessionStart != null) {
      const f = this.DatabaseSessionStart as DatabaseSessionStart;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x142);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.DatabaseSessionEnd != null) {
      const f = this.DatabaseSessionEnd as DatabaseSessionEnd;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x14a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.DatabaseSessionQuery != null) {
      const f = this.DatabaseSessionQuery as DatabaseSessionQuery;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x152);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.SessionUpload != null) {
      const f = this.SessionUpload as SessionUpload;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x15a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.MFADeviceAdd != null) {
      const f = this.MFADeviceAdd as MFADeviceAdd;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x162);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.MFADeviceDelete != null) {
      const f = this.MFADeviceDelete as MFADeviceDelete;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x16a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.BillingInformationUpdate != null) {
      const f = this.BillingInformationUpdate as BillingInformationUpdate;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x172);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.BillingCardCreate != null) {
      const f = this.BillingCardCreate as BillingCardCreate;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x17a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.BillingCardDelete != null) {
      const f = this.BillingCardDelete as BillingCardDelete;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x182);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.LockCreate != null) {
      const f = this.LockCreate as LockCreate;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x18a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.LockDelete != null) {
      const f = this.LockDelete as LockDelete;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x192);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.RecoveryCodeGenerate != null) {
      const f = this.RecoveryCodeGenerate as RecoveryCodeGenerate;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x19a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.RecoveryCodeUsed != null) {
      const f = this.RecoveryCodeUsed as RecoveryCodeUsed;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a2);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.DatabaseCreate != null) {
      const f = this.DatabaseCreate as DatabaseCreate;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1aa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.DatabaseUpdate != null) {
      const f = this.DatabaseUpdate as DatabaseUpdate;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1b2);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.DatabaseDelete != null) {
      const f = this.DatabaseDelete as DatabaseDelete;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1ba);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.AppCreate != null) {
      const f = this.AppCreate as AppCreate;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1c2);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.AppUpdate != null) {
      const f = this.AppUpdate as AppUpdate;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1ca);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.AppDelete != null) {
      const f = this.AppDelete as AppDelete;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1d2);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.WindowsDesktopSessionStart != null) {
      const f = this.WindowsDesktopSessionStart as WindowsDesktopSessionStart;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1da);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.WindowsDesktopSessionEnd != null) {
      const f = this.WindowsDesktopSessionEnd as WindowsDesktopSessionEnd;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1e2);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.PostgresParse != null) {
      const f = this.PostgresParse as PostgresParse;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1ea);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.PostgresBind != null) {
      const f = this.PostgresBind as PostgresBind;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1f2);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.PostgresExecute != null) {
      const f = this.PostgresExecute as PostgresExecute;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1fa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.PostgresClose != null) {
      const f = this.PostgresClose as PostgresClose;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x202);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.PostgresFunctionCall != null) {
      const f = this.PostgresFunctionCall as PostgresFunctionCall;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x20a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.AccessRequestDelete != null) {
      const f = this.AccessRequestDelete as AccessRequestDelete;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x212);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.SessionConnect != null) {
      const f = this.SessionConnect as SessionConnect;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x21a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.CertificateCreate != null) {
      const f = this.CertificateCreate as CertificateCreate;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x222);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.DesktopRecording != null) {
      const f = this.DesktopRecording as DesktopRecording;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.DesktopClipboardSend != null) {
      const f = this.DesktopClipboardSend as DesktopClipboardSend;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x232);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.DesktopClipboardReceive != null) {
      const f = this.DesktopClipboardReceive as DesktopClipboardReceive;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x23a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.MySQLStatementPrepare != null) {
      const f = this.MySQLStatementPrepare as MySQLStatementPrepare;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x242);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.MySQLStatementExecute != null) {
      const f = this.MySQLStatementExecute as MySQLStatementExecute;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x24a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.MySQLStatementSendLongData != null) {
      const f = this.MySQLStatementSendLongData as MySQLStatementSendLongData;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x252);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.MySQLStatementClose != null) {
      const f = this.MySQLStatementClose as MySQLStatementClose;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x25a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.MySQLStatementReset != null) {
      const f = this.MySQLStatementReset as MySQLStatementReset;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x262);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.MySQLStatementFetch != null) {
      const f = this.MySQLStatementFetch as MySQLStatementFetch;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x26a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.MySQLStatementBulkExecute != null) {
      const f = this.MySQLStatementBulkExecute as MySQLStatementBulkExecute;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x272);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.RenewableCertificateGenerationMismatch != null) {
      const f = this
        .RenewableCertificateGenerationMismatch as RenewableCertificateGenerationMismatch;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x27a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Unknown != null) {
      const f = this.Unknown as Unknown;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x282);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode OneOf
} // OneOf

// StreamStatus reflects stream status
export class StreamStatus {
  // UploadID represents upload ID
  public UploadID: string = "";
  // LastEventIndex updates last event index
  public LastEventIndex: i64;
  // LastUploadTime is the time of the last upload
  public LastUploadTime: google.protobuf.Timestamp =
    new google.protobuf.Timestamp();

  // Decodes StreamStatus from an ArrayBuffer
  static decode(buf: ArrayBuffer): StreamStatus {
    return StreamStatus.decodeDataView(new DataView(buf));
  }

  // Decodes StreamStatus from a DataView
  static decodeDataView(view: DataView): StreamStatus {
    const decoder = new __proto.Decoder(view);
    const obj = new StreamStatus();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.UploadID = decoder.string();
          break;
        }
        case 2: {
          obj.LastEventIndex = decoder.int64();
          break;
        }
        case 3: {
          const length = decoder.uint32();
          obj.LastUploadTime = google.protobuf.Timestamp.decodeDataView(
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
  } // decode StreamStatus

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.UploadID.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.UploadID.length) +
          this.UploadID.length
        : 0;
    size +=
      this.LastEventIndex == 0
        ? 0
        : 1 + __proto.Sizer.int64(this.LastEventIndex);

    if (this.LastUploadTime != null) {
      const f: google.protobuf.Timestamp = this
        .LastUploadTime as google.protobuf.Timestamp;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes StreamStatus to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes StreamStatus to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.UploadID.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.UploadID.length);
      encoder.string(this.UploadID);
    }
    if (this.LastEventIndex != 0) {
      encoder.uint32(0x10);
      encoder.int64(this.LastEventIndex);
    }

    if (this.LastUploadTime != null) {
      const f = this.LastUploadTime as google.protobuf.Timestamp;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode StreamStatus
} // StreamStatus

// SessionUpload is a session upload
export class SessionUpload {
  // Metadata is a common event metadata
  public Metadata: Metadata = new Metadata();
  // SessionMetadata is a common event session metadata
  public SessionMetadata: SessionMetadata = new SessionMetadata();
  // ID is a unique event identifier
  public UID: string = "";
  // URL is where the url the session event data upload is at
  public SessionURL: string = "";

  // Decodes SessionUpload from an ArrayBuffer
  static decode(buf: ArrayBuffer): SessionUpload {
    return SessionUpload.decodeDataView(new DataView(buf));
  }

  // Decodes SessionUpload from a DataView
  static decodeDataView(view: DataView): SessionUpload {
    const decoder = new __proto.Decoder(view);
    const obj = new SessionUpload();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.SessionMetadata = SessionMetadata.decodeDataView(
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
          obj.UID = decoder.string();
          break;
        }
        case 5: {
          obj.SessionURL = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode SessionUpload

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.SessionMetadata != null) {
      const f: SessionMetadata = this.SessionMetadata as SessionMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.UID.length > 0
        ? 1 + __proto.Sizer.varint64(this.UID.length) + this.UID.length
        : 0;
    size +=
      this.SessionURL.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.SessionURL.length) +
          this.SessionURL.length
        : 0;

    return size;
  }

  // Encodes SessionUpload to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes SessionUpload to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.SessionMetadata != null) {
      const f = this.SessionMetadata as SessionMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.UID.length > 0) {
      encoder.uint32(0x22);
      encoder.uint32(this.UID.length);
      encoder.string(this.UID);
    }
    if (this.SessionURL.length > 0) {
      encoder.uint32(0x2a);
      encoder.uint32(this.SessionURL.length);
      encoder.string(this.SessionURL);
    }

    return buf;
  } // encode SessionUpload
} // SessionUpload

/**
 * Identity matches github.com/gravitational/teleport/lib/tlsca.Identity except
 *  for RouteToApp and RouteToDatabase which are nullable and Traits which is
 *  represented as a google.protobuf.Struct (still containing a map from string
 *  to strings). Field names match other names already used in other events
 *  rather than the field names in tlsca.Identity.
 */
export class Identity {
  // User is a username or name of the node connection
  public User: string = "";
  // Impersonator is a username of a user impersonating this user
  public Impersonator: string = "";
  // Roles is a list of groups (Teleport roles) encoded in the identity
  public Roles: Array<string> = new Array<string>();
  // Usage is a list of usage restrictions encoded in the identity
  public Usage: Array<string> = new Array<string>();
  // Logins is a list of Unix logins allowed.
  public Logins: Array<string> = new Array<string>();
  // KubernetesGroups is a list of Kubernetes groups allowed
  public KubernetesGroups: Array<string> = new Array<string>();
  // KubernetesUsers is a list of Kubernetes users allowed
  public KubernetesUsers: Array<string> = new Array<string>();
  // Expires specifies whenever the session will expire
  public Expires: google.protobuf.Timestamp = new google.protobuf.Timestamp();
  /**
   * RouteToCluster specifies the target cluster
   *  if present in the session
   */
  public RouteToCluster: string = "";
  /**
   * KubernetesCluster specifies the target kubernetes cluster for TLS
   *  identities. This can be empty on older Teleport clients.
   */
  public KubernetesCluster: string = "";
  // Traits hold claim data used to populate a role at runtime.
  public Traits: wrappers.LabelValues = new wrappers.LabelValues();
  /**
   * RouteToApp holds routing information for applications. Routing metadata
   *  allows Teleport web proxy to route HTTP requests to the appropriate
   *  cluster and Teleport application proxy within the cluster.
   */
  public RouteToApp: RouteToApp = new RouteToApp();
  /**
   * TeleportCluster is the name of the teleport cluster that this identity
   *  originated from. For TLS certs this may not be the same as cert issuer,
   *  in case of multi-hop requests that originate from a remote cluster.
   */
  public TeleportCluster: string = "";
  // RouteToDatabase contains routing information for databases.
  public RouteToDatabase: RouteToDatabase = new RouteToDatabase();
  // DatabaseNames is a list of allowed database names.
  public DatabaseNames: Array<string> = new Array<string>();
  // DatabaseUsers is a list of allowed database users.
  public DatabaseUsers: Array<string> = new Array<string>();
  /**
   * MFADeviceUUID is the UUID of an MFA device when this Identity was
   *  confirmed immediately after an MFA check.
   */
  public MFADeviceUUID: string = "";
  // ClientIP is an observed IP of the client that this Identity represents.
  public ClientIP: string = "";
  // AWSRoleARNs is a list of allowed AWS role ARNs user can assume.
  public AWSRoleARNs: Array<string> = new Array<string>();
  // AccessRequests is a list of UUIDs of active requests for this Identity.
  public AccessRequests: Array<string> = new Array<string>();
  /**
   * DisallowReissue is a flag that, if set, instructs the auth server to
   *  deny any attempts to reissue new certificates while authenticated with
   *  this certificate.
   */
  public DisallowReissue: bool;

  // Decodes Identity from an ArrayBuffer
  static decode(buf: ArrayBuffer): Identity {
    return Identity.decodeDataView(new DataView(buf));
  }

  // Decodes Identity from a DataView
  static decodeDataView(view: DataView): Identity {
    const decoder = new __proto.Decoder(view);
    const obj = new Identity();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.User = decoder.string();
          break;
        }
        case 2: {
          obj.Impersonator = decoder.string();
          break;
        }
        case 3: {
          obj.Roles.push(decoder.string());
          break;
        }
        case 4: {
          obj.Usage.push(decoder.string());
          break;
        }
        case 5: {
          obj.Logins.push(decoder.string());
          break;
        }
        case 6: {
          obj.KubernetesGroups.push(decoder.string());
          break;
        }
        case 7: {
          obj.KubernetesUsers.push(decoder.string());
          break;
        }
        case 8: {
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
          obj.RouteToCluster = decoder.string();
          break;
        }
        case 10: {
          obj.KubernetesCluster = decoder.string();
          break;
        }
        case 11: {
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
        case 12: {
          const length = decoder.uint32();
          obj.RouteToApp = RouteToApp.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          break;
        }
        case 13: {
          obj.TeleportCluster = decoder.string();
          break;
        }
        case 14: {
          const length = decoder.uint32();
          obj.RouteToDatabase = RouteToDatabase.decodeDataView(
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
          obj.DatabaseNames.push(decoder.string());
          break;
        }
        case 16: {
          obj.DatabaseUsers.push(decoder.string());
          break;
        }
        case 17: {
          obj.MFADeviceUUID = decoder.string();
          break;
        }
        case 18: {
          obj.ClientIP = decoder.string();
          break;
        }
        case 19: {
          obj.AWSRoleARNs.push(decoder.string());
          break;
        }
        case 20: {
          obj.AccessRequests.push(decoder.string());
          break;
        }
        case 21: {
          obj.DisallowReissue = decoder.bool();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode Identity

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.User.length > 0
        ? 1 + __proto.Sizer.varint64(this.User.length) + this.User.length
        : 0;
    size +=
      this.Impersonator.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.Impersonator.length) +
          this.Impersonator.length
        : 0;

    size += __size_string_repeated(this.Roles);

    size += __size_string_repeated(this.Usage);

    size += __size_string_repeated(this.Logins);

    size += __size_string_repeated(this.KubernetesGroups);

    size += __size_string_repeated(this.KubernetesUsers);

    if (this.Expires != null) {
      const f: google.protobuf.Timestamp = this
        .Expires as google.protobuf.Timestamp;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.RouteToCluster.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.RouteToCluster.length) +
          this.RouteToCluster.length
        : 0;
    size +=
      this.KubernetesCluster.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.KubernetesCluster.length) +
          this.KubernetesCluster.length
        : 0;

    if (this.Traits != null) {
      const f: wrappers.LabelValues = this.Traits as wrappers.LabelValues;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.RouteToApp != null) {
      const f: RouteToApp = this.RouteToApp as RouteToApp;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.TeleportCluster.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.TeleportCluster.length) +
          this.TeleportCluster.length
        : 0;

    if (this.RouteToDatabase != null) {
      const f: RouteToDatabase = this.RouteToDatabase as RouteToDatabase;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size += __size_string_repeated(this.DatabaseNames);

    size += __size_string_repeated(this.DatabaseUsers);

    size +=
      this.MFADeviceUUID.length > 0
        ? 2 +
          __proto.Sizer.varint64(this.MFADeviceUUID.length) +
          this.MFADeviceUUID.length
        : 0;
    size +=
      this.ClientIP.length > 0
        ? 2 +
          __proto.Sizer.varint64(this.ClientIP.length) +
          this.ClientIP.length
        : 0;

    size += __size_string_repeated(this.AWSRoleARNs);

    size += __size_string_repeated(this.AccessRequests);

    size += this.DisallowReissue == 0 ? 0 : 2 + 1;

    return size;
  }

  // Encodes Identity to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes Identity to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.User.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.User.length);
      encoder.string(this.User);
    }
    if (this.Impersonator.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.Impersonator.length);
      encoder.string(this.Impersonator);
    }

    if (this.Roles.length > 0) {
      for (let n: i32 = 0; n < this.Roles.length; n++) {
        encoder.uint32(0x1a);
        encoder.uint32(this.Roles[n].length);
        encoder.string(this.Roles[n]);
      }
    }

    if (this.Usage.length > 0) {
      for (let n: i32 = 0; n < this.Usage.length; n++) {
        encoder.uint32(0x22);
        encoder.uint32(this.Usage[n].length);
        encoder.string(this.Usage[n]);
      }
    }

    if (this.Logins.length > 0) {
      for (let n: i32 = 0; n < this.Logins.length; n++) {
        encoder.uint32(0x2a);
        encoder.uint32(this.Logins[n].length);
        encoder.string(this.Logins[n]);
      }
    }

    if (this.KubernetesGroups.length > 0) {
      for (let n: i32 = 0; n < this.KubernetesGroups.length; n++) {
        encoder.uint32(0x32);
        encoder.uint32(this.KubernetesGroups[n].length);
        encoder.string(this.KubernetesGroups[n]);
      }
    }

    if (this.KubernetesUsers.length > 0) {
      for (let n: i32 = 0; n < this.KubernetesUsers.length; n++) {
        encoder.uint32(0x3a);
        encoder.uint32(this.KubernetesUsers[n].length);
        encoder.string(this.KubernetesUsers[n]);
      }
    }

    if (this.Expires != null) {
      const f = this.Expires as google.protobuf.Timestamp;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x42);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.RouteToCluster.length > 0) {
      encoder.uint32(0x4a);
      encoder.uint32(this.RouteToCluster.length);
      encoder.string(this.RouteToCluster);
    }
    if (this.KubernetesCluster.length > 0) {
      encoder.uint32(0x52);
      encoder.uint32(this.KubernetesCluster.length);
      encoder.string(this.KubernetesCluster);
    }

    if (this.Traits != null) {
      const f = this.Traits as wrappers.LabelValues;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x5a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.RouteToApp != null) {
      const f = this.RouteToApp as RouteToApp;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x62);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.TeleportCluster.length > 0) {
      encoder.uint32(0x6a);
      encoder.uint32(this.TeleportCluster.length);
      encoder.string(this.TeleportCluster);
    }

    if (this.RouteToDatabase != null) {
      const f = this.RouteToDatabase as RouteToDatabase;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x72);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.DatabaseNames.length > 0) {
      for (let n: i32 = 0; n < this.DatabaseNames.length; n++) {
        encoder.uint32(0x7a);
        encoder.uint32(this.DatabaseNames[n].length);
        encoder.string(this.DatabaseNames[n]);
      }
    }

    if (this.DatabaseUsers.length > 0) {
      for (let n: i32 = 0; n < this.DatabaseUsers.length; n++) {
        encoder.uint32(0x82);
        encoder.uint32(this.DatabaseUsers[n].length);
        encoder.string(this.DatabaseUsers[n]);
      }
    }

    if (this.MFADeviceUUID.length > 0) {
      encoder.uint32(0x8a);
      encoder.uint32(this.MFADeviceUUID.length);
      encoder.string(this.MFADeviceUUID);
    }
    if (this.ClientIP.length > 0) {
      encoder.uint32(0x92);
      encoder.uint32(this.ClientIP.length);
      encoder.string(this.ClientIP);
    }

    if (this.AWSRoleARNs.length > 0) {
      for (let n: i32 = 0; n < this.AWSRoleARNs.length; n++) {
        encoder.uint32(0x9a);
        encoder.uint32(this.AWSRoleARNs[n].length);
        encoder.string(this.AWSRoleARNs[n]);
      }
    }

    if (this.AccessRequests.length > 0) {
      for (let n: i32 = 0; n < this.AccessRequests.length; n++) {
        encoder.uint32(0xa2);
        encoder.uint32(this.AccessRequests[n].length);
        encoder.string(this.AccessRequests[n]);
      }
    }

    if (this.DisallowReissue != 0) {
      encoder.uint32(0xa8);
      encoder.bool(this.DisallowReissue);
    }

    return buf;
  } // encode Identity
} // Identity

// RouteToApp contains parameters for application access certificate requests.
export class RouteToApp {
  // Name is the application name certificate is being requested for.
  public Name: string = "";
  // SessionID is the ID of the application session.
  public SessionID: string = "";
  // PublicAddr is the application public address.
  public PublicAddr: string = "";
  // ClusterName is the cluster where the application resides.
  public ClusterName: string = "";
  // AWSRoleARN is the AWS role to assume when accessing AWS API.
  public AWSRoleARN: string = "";

  // Decodes RouteToApp from an ArrayBuffer
  static decode(buf: ArrayBuffer): RouteToApp {
    return RouteToApp.decodeDataView(new DataView(buf));
  }

  // Decodes RouteToApp from a DataView
  static decodeDataView(view: DataView): RouteToApp {
    const decoder = new __proto.Decoder(view);
    const obj = new RouteToApp();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Name = decoder.string();
          break;
        }
        case 2: {
          obj.SessionID = decoder.string();
          break;
        }
        case 3: {
          obj.PublicAddr = decoder.string();
          break;
        }
        case 4: {
          obj.ClusterName = decoder.string();
          break;
        }
        case 5: {
          obj.AWSRoleARN = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode RouteToApp

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Name.length > 0
        ? 1 + __proto.Sizer.varint64(this.Name.length) + this.Name.length
        : 0;
    size +=
      this.SessionID.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.SessionID.length) +
          this.SessionID.length
        : 0;
    size +=
      this.PublicAddr.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.PublicAddr.length) +
          this.PublicAddr.length
        : 0;
    size +=
      this.ClusterName.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.ClusterName.length) +
          this.ClusterName.length
        : 0;
    size +=
      this.AWSRoleARN.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.AWSRoleARN.length) +
          this.AWSRoleARN.length
        : 0;

    return size;
  }

  // Encodes RouteToApp to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes RouteToApp to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Name.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Name.length);
      encoder.string(this.Name);
    }
    if (this.SessionID.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.SessionID.length);
      encoder.string(this.SessionID);
    }
    if (this.PublicAddr.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.PublicAddr.length);
      encoder.string(this.PublicAddr);
    }
    if (this.ClusterName.length > 0) {
      encoder.uint32(0x22);
      encoder.uint32(this.ClusterName.length);
      encoder.string(this.ClusterName);
    }
    if (this.AWSRoleARN.length > 0) {
      encoder.uint32(0x2a);
      encoder.uint32(this.AWSRoleARN.length);
      encoder.string(this.AWSRoleARN);
    }

    return buf;
  } // encode RouteToApp
} // RouteToApp

// RouteToDatabase combines parameters for database service routing information.
export class RouteToDatabase {
  // ServiceName is the Teleport database proxy service name the cert is for.
  public ServiceName: string = "";
  // Protocol is the type of the database the cert is for.
  public Protocol: string = "";
  // Username is an optional database username to embed.
  public Username: string = "";
  // Database is an optional database name to embed.
  public Database: string = "";

  // Decodes RouteToDatabase from an ArrayBuffer
  static decode(buf: ArrayBuffer): RouteToDatabase {
    return RouteToDatabase.decodeDataView(new DataView(buf));
  }

  // Decodes RouteToDatabase from a DataView
  static decodeDataView(view: DataView): RouteToDatabase {
    const decoder = new __proto.Decoder(view);
    const obj = new RouteToDatabase();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.ServiceName = decoder.string();
          break;
        }
        case 2: {
          obj.Protocol = decoder.string();
          break;
        }
        case 3: {
          obj.Username = decoder.string();
          break;
        }
        case 4: {
          obj.Database = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode RouteToDatabase

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.ServiceName.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.ServiceName.length) +
          this.ServiceName.length
        : 0;
    size +=
      this.Protocol.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.Protocol.length) +
          this.Protocol.length
        : 0;
    size +=
      this.Username.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.Username.length) +
          this.Username.length
        : 0;
    size +=
      this.Database.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.Database.length) +
          this.Database.length
        : 0;

    return size;
  }

  // Encodes RouteToDatabase to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes RouteToDatabase to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.ServiceName.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.ServiceName.length);
      encoder.string(this.ServiceName);
    }
    if (this.Protocol.length > 0) {
      encoder.uint32(0x12);
      encoder.uint32(this.Protocol.length);
      encoder.string(this.Protocol);
    }
    if (this.Username.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.Username.length);
      encoder.string(this.Username);
    }
    if (this.Database.length > 0) {
      encoder.uint32(0x22);
      encoder.uint32(this.Database.length);
      encoder.string(this.Database);
    }

    return buf;
  } // encode RouteToDatabase
} // RouteToDatabase

/**
 * MySQLStatementPrepare is emitted when a MySQL client creates a prepared
 *  statement using the prepared statement protocol.
 */
export class MySQLStatementPrepare {
  // Metadata is a common event metadata.
  public Metadata: Metadata = new Metadata();
  // User is a common user event metadata.
  public User: UserMetadata = new UserMetadata();
  // SessionMetadata is a common event session metadata.
  public Session: SessionMetadata = new SessionMetadata();
  // Database contains database related metadata.
  public Database: DatabaseMetadata = new DatabaseMetadata();
  // Query is the prepared statement query.
  public Query: string = "";

  // Decodes MySQLStatementPrepare from an ArrayBuffer
  static decode(buf: ArrayBuffer): MySQLStatementPrepare {
    return MySQLStatementPrepare.decodeDataView(new DataView(buf));
  }

  // Decodes MySQLStatementPrepare from a DataView
  static decodeDataView(view: DataView): MySQLStatementPrepare {
    const decoder = new __proto.Decoder(view);
    const obj = new MySQLStatementPrepare();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.User = UserMetadata.decodeDataView(
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
          obj.Session = SessionMetadata.decodeDataView(
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
          obj.Database = DatabaseMetadata.decodeDataView(
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
          obj.Query = decoder.string();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode MySQLStatementPrepare

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Session != null) {
      const f: SessionMetadata = this.Session as SessionMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Database != null) {
      const f: DatabaseMetadata = this.Database as DatabaseMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.Query.length > 0
        ? 1 + __proto.Sizer.varint64(this.Query.length) + this.Query.length
        : 0;

    return size;
  }

  // Encodes MySQLStatementPrepare to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes MySQLStatementPrepare to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Session != null) {
      const f = this.Session as SessionMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Database != null) {
      const f = this.Database as DatabaseMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Query.length > 0) {
      encoder.uint32(0x2a);
      encoder.uint32(this.Query.length);
      encoder.string(this.Query);
    }

    return buf;
  } // encode MySQLStatementPrepare
} // MySQLStatementPrepare

/**
 * MySQLStatementExecute is emitted when a MySQL client executes a prepared
 *  statement using the prepared statement protocol.
 */
export class MySQLStatementExecute {
  // Metadata is a common event metadata.
  public Metadata: Metadata = new Metadata();
  // User is a common user event metadata.
  public User: UserMetadata = new UserMetadata();
  // SessionMetadata is a common event session metadata.
  public Session: SessionMetadata = new SessionMetadata();
  // Database contains database related metadata.
  public Database: DatabaseMetadata = new DatabaseMetadata();
  // StatementID is the identifier of the prepared statement.
  public StatementID: u32;
  // Parameters are the parameters used to execute the prepared statement.
  public Parameters: Array<string> = new Array<string>();

  // Decodes MySQLStatementExecute from an ArrayBuffer
  static decode(buf: ArrayBuffer): MySQLStatementExecute {
    return MySQLStatementExecute.decodeDataView(new DataView(buf));
  }

  // Decodes MySQLStatementExecute from a DataView
  static decodeDataView(view: DataView): MySQLStatementExecute {
    const decoder = new __proto.Decoder(view);
    const obj = new MySQLStatementExecute();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.User = UserMetadata.decodeDataView(
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
          obj.Session = SessionMetadata.decodeDataView(
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
          obj.Database = DatabaseMetadata.decodeDataView(
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
          obj.StatementID = decoder.uint32();
          break;
        }
        case 6: {
          obj.Parameters.push(decoder.string());
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode MySQLStatementExecute

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Session != null) {
      const f: SessionMetadata = this.Session as SessionMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Database != null) {
      const f: DatabaseMetadata = this.Database as DatabaseMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.StatementID == 0 ? 0 : 1 + __proto.Sizer.uint32(this.StatementID);

    size += __size_string_repeated(this.Parameters);

    return size;
  }

  // Encodes MySQLStatementExecute to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes MySQLStatementExecute to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Session != null) {
      const f = this.Session as SessionMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Database != null) {
      const f = this.Database as DatabaseMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.StatementID != 0) {
      encoder.uint32(0x28);
      encoder.uint32(this.StatementID);
    }

    if (this.Parameters.length > 0) {
      for (let n: i32 = 0; n < this.Parameters.length; n++) {
        encoder.uint32(0x32);
        encoder.uint32(this.Parameters[n].length);
        encoder.string(this.Parameters[n]);
      }
    }

    return buf;
  } // encode MySQLStatementExecute
} // MySQLStatementExecute

/**
 * MySQLStatementSendLongData is emitted when a MySQL client sends long bytes
 *  stream using the prepared statement protocol.
 */
export class MySQLStatementSendLongData {
  // Metadata is a common event metadata.
  public Metadata: Metadata = new Metadata();
  // User is a common user event metadata.
  public User: UserMetadata = new UserMetadata();
  // SessionMetadata is a common event session metadata.
  public Session: SessionMetadata = new SessionMetadata();
  // Database contains database related metadata.
  public Database: DatabaseMetadata = new DatabaseMetadata();
  // StatementID is the identifier of the prepared statement.
  public StatementID: u32;
  // ParameterID is the identifier of the parameter.
  public ParameterID: u32;
  // DataSize is the size of the data.
  public DataSize: u32;

  // Decodes MySQLStatementSendLongData from an ArrayBuffer
  static decode(buf: ArrayBuffer): MySQLStatementSendLongData {
    return MySQLStatementSendLongData.decodeDataView(new DataView(buf));
  }

  // Decodes MySQLStatementSendLongData from a DataView
  static decodeDataView(view: DataView): MySQLStatementSendLongData {
    const decoder = new __proto.Decoder(view);
    const obj = new MySQLStatementSendLongData();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.User = UserMetadata.decodeDataView(
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
          obj.Session = SessionMetadata.decodeDataView(
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
          obj.Database = DatabaseMetadata.decodeDataView(
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
          obj.StatementID = decoder.uint32();
          break;
        }
        case 6: {
          obj.ParameterID = decoder.uint32();
          break;
        }
        case 7: {
          obj.DataSize = decoder.uint32();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode MySQLStatementSendLongData

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Session != null) {
      const f: SessionMetadata = this.Session as SessionMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Database != null) {
      const f: DatabaseMetadata = this.Database as DatabaseMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.StatementID == 0 ? 0 : 1 + __proto.Sizer.uint32(this.StatementID);
    size +=
      this.ParameterID == 0 ? 0 : 1 + __proto.Sizer.uint32(this.ParameterID);
    size += this.DataSize == 0 ? 0 : 1 + __proto.Sizer.uint32(this.DataSize);

    return size;
  }

  // Encodes MySQLStatementSendLongData to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes MySQLStatementSendLongData to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Session != null) {
      const f = this.Session as SessionMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Database != null) {
      const f = this.Database as DatabaseMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.StatementID != 0) {
      encoder.uint32(0x28);
      encoder.uint32(this.StatementID);
    }
    if (this.ParameterID != 0) {
      encoder.uint32(0x30);
      encoder.uint32(this.ParameterID);
    }
    if (this.DataSize != 0) {
      encoder.uint32(0x38);
      encoder.uint32(this.DataSize);
    }

    return buf;
  } // encode MySQLStatementSendLongData
} // MySQLStatementSendLongData

/**
 * MySQLStatementClose is emitted when a MySQL client deallocates a prepared
 *  statement using the prepared statement protocol.
 */
export class MySQLStatementClose {
  // Metadata is a common event metadata.
  public Metadata: Metadata = new Metadata();
  // User is a common user event metadata.
  public User: UserMetadata = new UserMetadata();
  // SessionMetadata is a common event session metadata.
  public Session: SessionMetadata = new SessionMetadata();
  // Database contains database related metadata.
  public Database: DatabaseMetadata = new DatabaseMetadata();
  // StatementID is the identifier of the prepared statement.
  public StatementID: u32;

  // Decodes MySQLStatementClose from an ArrayBuffer
  static decode(buf: ArrayBuffer): MySQLStatementClose {
    return MySQLStatementClose.decodeDataView(new DataView(buf));
  }

  // Decodes MySQLStatementClose from a DataView
  static decodeDataView(view: DataView): MySQLStatementClose {
    const decoder = new __proto.Decoder(view);
    const obj = new MySQLStatementClose();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.User = UserMetadata.decodeDataView(
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
          obj.Session = SessionMetadata.decodeDataView(
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
          obj.Database = DatabaseMetadata.decodeDataView(
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
          obj.StatementID = decoder.uint32();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode MySQLStatementClose

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Session != null) {
      const f: SessionMetadata = this.Session as SessionMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Database != null) {
      const f: DatabaseMetadata = this.Database as DatabaseMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.StatementID == 0 ? 0 : 1 + __proto.Sizer.uint32(this.StatementID);

    return size;
  }

  // Encodes MySQLStatementClose to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes MySQLStatementClose to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Session != null) {
      const f = this.Session as SessionMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Database != null) {
      const f = this.Database as DatabaseMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.StatementID != 0) {
      encoder.uint32(0x28);
      encoder.uint32(this.StatementID);
    }

    return buf;
  } // encode MySQLStatementClose
} // MySQLStatementClose

/**
 * MySQLStatementReset is emitted when a MySQL client resets the data of a
 *  prepared statement using the prepared statement protocol.
 */
export class MySQLStatementReset {
  // Metadata is a common event metadata.
  public Metadata: Metadata = new Metadata();
  // User is a common user event metadata.
  public User: UserMetadata = new UserMetadata();
  // SessionMetadata is a common event session metadata.
  public Session: SessionMetadata = new SessionMetadata();
  // Database contains database related metadata.
  public Database: DatabaseMetadata = new DatabaseMetadata();
  // StatementID is the identifier of the prepared statement.
  public StatementID: u32;

  // Decodes MySQLStatementReset from an ArrayBuffer
  static decode(buf: ArrayBuffer): MySQLStatementReset {
    return MySQLStatementReset.decodeDataView(new DataView(buf));
  }

  // Decodes MySQLStatementReset from a DataView
  static decodeDataView(view: DataView): MySQLStatementReset {
    const decoder = new __proto.Decoder(view);
    const obj = new MySQLStatementReset();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.User = UserMetadata.decodeDataView(
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
          obj.Session = SessionMetadata.decodeDataView(
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
          obj.Database = DatabaseMetadata.decodeDataView(
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
          obj.StatementID = decoder.uint32();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode MySQLStatementReset

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Session != null) {
      const f: SessionMetadata = this.Session as SessionMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Database != null) {
      const f: DatabaseMetadata = this.Database as DatabaseMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.StatementID == 0 ? 0 : 1 + __proto.Sizer.uint32(this.StatementID);

    return size;
  }

  // Encodes MySQLStatementReset to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes MySQLStatementReset to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Session != null) {
      const f = this.Session as SessionMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Database != null) {
      const f = this.Database as DatabaseMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.StatementID != 0) {
      encoder.uint32(0x28);
      encoder.uint32(this.StatementID);
    }

    return buf;
  } // encode MySQLStatementReset
} // MySQLStatementReset

/**
 * MySQLStatementFetch is emitted when a MySQL client fetches rows from a
 *  prepared statement using the prepared statement protocol.
 */
export class MySQLStatementFetch {
  // Metadata is a common event metadata.
  public Metadata: Metadata = new Metadata();
  // User is a common user event metadata.
  public User: UserMetadata = new UserMetadata();
  // SessionMetadata is a common event session metadata.
  public Session: SessionMetadata = new SessionMetadata();
  // Database contains database related metadata.
  public Database: DatabaseMetadata = new DatabaseMetadata();
  // StatementID is the identifier of the prepared statement.
  public StatementID: u32;
  // RowsCount is the number of rows to fetch.
  public RowsCount: u32;

  // Decodes MySQLStatementFetch from an ArrayBuffer
  static decode(buf: ArrayBuffer): MySQLStatementFetch {
    return MySQLStatementFetch.decodeDataView(new DataView(buf));
  }

  // Decodes MySQLStatementFetch from a DataView
  static decodeDataView(view: DataView): MySQLStatementFetch {
    const decoder = new __proto.Decoder(view);
    const obj = new MySQLStatementFetch();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.User = UserMetadata.decodeDataView(
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
          obj.Session = SessionMetadata.decodeDataView(
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
          obj.Database = DatabaseMetadata.decodeDataView(
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
          obj.StatementID = decoder.uint32();
          break;
        }
        case 6: {
          obj.RowsCount = decoder.uint32();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode MySQLStatementFetch

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Session != null) {
      const f: SessionMetadata = this.Session as SessionMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Database != null) {
      const f: DatabaseMetadata = this.Database as DatabaseMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.StatementID == 0 ? 0 : 1 + __proto.Sizer.uint32(this.StatementID);
    size += this.RowsCount == 0 ? 0 : 1 + __proto.Sizer.uint32(this.RowsCount);

    return size;
  }

  // Encodes MySQLStatementFetch to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes MySQLStatementFetch to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Session != null) {
      const f = this.Session as SessionMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Database != null) {
      const f = this.Database as DatabaseMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.StatementID != 0) {
      encoder.uint32(0x28);
      encoder.uint32(this.StatementID);
    }
    if (this.RowsCount != 0) {
      encoder.uint32(0x30);
      encoder.uint32(this.RowsCount);
    }

    return buf;
  } // encode MySQLStatementFetch
} // MySQLStatementFetch

/**
 * MySQLStatementBulkExecute is emitted when a MySQL client executes a bulk
 *  insert of a prepared statement using the prepared statement protocol.
 */
export class MySQLStatementBulkExecute {
  // Metadata is a common event metadata.
  public Metadata: Metadata = new Metadata();
  // User is a common user event metadata.
  public User: UserMetadata = new UserMetadata();
  // SessionMetadata is a common event session metadata.
  public Session: SessionMetadata = new SessionMetadata();
  // Database contains database related metadata.
  public Database: DatabaseMetadata = new DatabaseMetadata();
  // StatementID is the identifier of the prepared statement.
  public StatementID: u32;
  // Parameters are the parameters used to execute the prepared statement.
  public Parameters: Array<string> = new Array<string>();

  // Decodes MySQLStatementBulkExecute from an ArrayBuffer
  static decode(buf: ArrayBuffer): MySQLStatementBulkExecute {
    return MySQLStatementBulkExecute.decodeDataView(new DataView(buf));
  }

  // Decodes MySQLStatementBulkExecute from a DataView
  static decodeDataView(view: DataView): MySQLStatementBulkExecute {
    const decoder = new __proto.Decoder(view);
    const obj = new MySQLStatementBulkExecute();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
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
        case 2: {
          const length = decoder.uint32();
          obj.User = UserMetadata.decodeDataView(
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
          obj.Session = SessionMetadata.decodeDataView(
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
          obj.Database = DatabaseMetadata.decodeDataView(
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
          obj.StatementID = decoder.uint32();
          break;
        }
        case 6: {
          obj.Parameters.push(decoder.string());
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode MySQLStatementBulkExecute

  public size(): u32 {
    let size: u32 = 0;

    if (this.Metadata != null) {
      const f: Metadata = this.Metadata as Metadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.User != null) {
      const f: UserMetadata = this.User as UserMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Session != null) {
      const f: SessionMetadata = this.Session as SessionMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Database != null) {
      const f: DatabaseMetadata = this.Database as DatabaseMetadata;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    size +=
      this.StatementID == 0 ? 0 : 1 + __proto.Sizer.uint32(this.StatementID);

    size += __size_string_repeated(this.Parameters);

    return size;
  }

  // Encodes MySQLStatementBulkExecute to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes MySQLStatementBulkExecute to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Metadata != null) {
      const f = this.Metadata as Metadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.User != null) {
      const f = this.User as UserMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Session != null) {
      const f = this.Session as SessionMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Database != null) {
      const f = this.Database as DatabaseMetadata;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x22);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.StatementID != 0) {
      encoder.uint32(0x28);
      encoder.uint32(this.StatementID);
    }

    if (this.Parameters.length > 0) {
      for (let n: i32 = 0; n < this.Parameters.length; n++) {
        encoder.uint32(0x32);
        encoder.uint32(this.Parameters[n].length);
        encoder.string(this.Parameters[n]);
      }
    }

    return buf;
  } // encode MySQLStatementBulkExecute
} // MySQLStatementBulkExecute

// __size_string_repeated

function __size_string_repeated(value: Array<string>): u32 {
  let size: u32 = 0;

  for (let n: i32 = 0; n < value.length; n++) {
    size += 1 + __proto.Sizer.varint64(value[n].length) + value[n].length;
  }

  return size;
}

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

// Type aliases
export type Event = OneOf;
