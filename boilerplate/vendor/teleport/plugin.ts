import * as __proto from "./__proto";

import * as events from "./events";
// Severity represents alert severity
export enum Severity {
  DEBUG = 0,
  INFO = 1,
  NOTICE = 2,
  WARNING = 3,
  ERROR = 4,
  CRITICAL = 5,
  ALERT = 6,
  EMERGENCY = 7,
} // Severity
// HandleEventRequest represents the request passing the event
export class HandleEventRequest {
  public Event: events.OneOf = new events.OneOf();

  // Decodes HandleEventRequest from an ArrayBuffer
  static decode(buf: ArrayBuffer): HandleEventRequest {
    return HandleEventRequest.decodeDataView(new DataView(buf));
  }

  // Decodes HandleEventRequest from a DataView
  static decodeDataView(view: DataView): HandleEventRequest {
    const decoder = new __proto.Decoder(view);
    const obj = new HandleEventRequest();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          const length = decoder.uint32();
          obj.Event = events.OneOf.decodeDataView(
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
  } // decode HandleEventRequest

  public size(): u32 {
    let size: u32 = 0;

    if (this.Event != null) {
      const f: events.OneOf = this.Event as events.OneOf;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes HandleEventRequest to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes HandleEventRequest to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Event != null) {
      const f = this.Event as events.OneOf;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode HandleEventRequest
} // HandleEventRequest

// HandleEventResponse represents the response, returning success status, error message and modified event (optional)
export class HandleEventResponse {
  public Event: events.OneOf = new events.OneOf();

  // Decodes HandleEventResponse from an ArrayBuffer
  static decode(buf: ArrayBuffer): HandleEventResponse {
    return HandleEventResponse.decodeDataView(new DataView(buf));
  }

  // Decodes HandleEventResponse from a DataView
  static decodeDataView(view: DataView): HandleEventResponse {
    const decoder = new __proto.Decoder(view);
    const obj = new HandleEventResponse();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          const length = decoder.uint32();
          obj.Event = events.OneOf.decodeDataView(
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
  } // decode HandleEventResponse

  public size(): u32 {
    let size: u32 = 0;

    if (this.Event != null) {
      const f: events.OneOf = this.Event as events.OneOf;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes HandleEventResponse to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes HandleEventResponse to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Event != null) {
      const f = this.Event as events.OneOf;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode HandleEventResponse
} // HandleEventResponse

// Alert represents alert struct
export class Alert {
  public Message: string = "";
  public Event: events.OneOf = new events.OneOf();
  public Metadata: Map<string, string> = new Map<string, string>();
  public Severity: u32;

  // Decodes Alert from an ArrayBuffer
  static decode(buf: ArrayBuffer): Alert {
    return Alert.decodeDataView(new DataView(buf));
  }

  // Decodes Alert from a DataView
  static decodeDataView(view: DataView): Alert {
    const decoder = new __proto.Decoder(view);
    const obj = new Alert();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Message = decoder.string();
          break;
        }
        case 2: {
          const length = decoder.uint32();
          obj.Event = events.OneOf.decodeDataView(
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
          __decodeMap_string_string(decoder, length, obj.Metadata);
          decoder.skip(length);

          break;
        }
        case 4: {
          obj.Severity = decoder.uint32();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode Alert

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.Message.length > 0
        ? 1 + __proto.Sizer.varint64(this.Message.length) + this.Message.length
        : 0;

    if (this.Event != null) {
      const f: events.OneOf = this.Event as events.OneOf;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.Metadata.size > 0) {
      const keys = this.Metadata.keys();

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = this.Metadata.get(key);
        const itemSize = __sizeMapEntry_string_string(key, value);
        if (itemSize > 0) {
          size += 1 + __proto.Sizer.varint64(itemSize) + itemSize;
        }
      }
    }

    size += this.Severity == 0 ? 0 : 1 + __proto.Sizer.uint32(this.Severity);

    return size;
  }

  // Encodes Alert to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes Alert to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Message.length > 0) {
      encoder.uint32(0xa);
      encoder.uint32(this.Message.length);
      encoder.string(this.Message);
    }

    if (this.Event != null) {
      const f = this.Event as events.OneOf;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x12);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.Metadata.size > 0) {
      const keys = this.Metadata.keys();
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = this.Metadata.get(key);
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

    if (this.Severity != 0) {
      encoder.uint32(0x20);
      encoder.uint32(this.Severity);
    }

    return buf;
  } // encode Alert
} // Alert

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
