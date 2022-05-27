import * as __proto from "./__proto";

import * as events from "./events";
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
        case 3: {
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
        encoder.uint32(0x1a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode HandleEventResponse
} // HandleEventResponse

// Type aliases
export type Event = OneOf;
