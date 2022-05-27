import * as __proto from "./__proto";

// StringValues is a list of strings.
export class StringValues {
  public Values: Array<string> = new Array<string>();

  // Decodes StringValues from an ArrayBuffer
  static decode(buf: ArrayBuffer): StringValues {
    return StringValues.decodeDataView(new DataView(buf));
  }

  // Decodes StringValues from a DataView
  static decodeDataView(view: DataView): StringValues {
    const decoder = new __proto.Decoder(view);
    const obj = new StringValues();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.Values.push(decoder.string());
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode StringValues

  public size(): u32 {
    let size: u32 = 0;

    size += __size_string_repeated(this.Values);

    return size;
  }

  // Encodes StringValues to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes StringValues to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Values.length > 0) {
      for (let n: i32 = 0; n < this.Values.length; n++) {
        encoder.uint32(0xa);
        encoder.uint32(this.Values[n].length);
        encoder.string(this.Values[n]);
      }
    }

    return buf;
  } // encode StringValues
} // StringValues

/**
 * LabelValues is a list of key value pairs, where key is a string
 *  and value is a list of string values.
 */
export class LabelValues {
  // Values contains key value pairs.
  public Values: Map<string, StringValues> = new Map<string, StringValues>();

  // Decodes LabelValues from an ArrayBuffer
  static decode(buf: ArrayBuffer): LabelValues {
    return LabelValues.decodeDataView(new DataView(buf));
  }

  // Decodes LabelValues from a DataView
  static decodeDataView(view: DataView): LabelValues {
    const decoder = new __proto.Decoder(view);
    const obj = new LabelValues();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          const length = decoder.uint32();
          __decodeMap_string_StringValues(decoder, length, obj.Values);
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode LabelValues

  public size(): u32 {
    let size: u32 = 0;

    if (this.Values.size > 0) {
      const keys = this.Values.keys();

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = this.Values.get(key);
        const itemSize = __sizeMapEntry_string_StringValues(key, value);
        if (itemSize > 0) {
          size += 1 + __proto.Sizer.varint64(itemSize) + itemSize;
        }
      }
    }

    return size;
  }

  // Encodes LabelValues to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes LabelValues to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.Values.size > 0) {
      const keys = this.Values.keys();
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = this.Values.get(key);
        const size = __sizeMapEntry_string_StringValues(key, value);
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
  } // encode LabelValues
} // LabelValues

// __size_string_repeated

function __size_string_repeated(value: Array<string>): u32 {
  let size: u32 = 0;

  for (let n: i32 = 0; n < value.length; n++) {
    size += 1 + __proto.Sizer.varint64(value[n].length) + value[n].length;
  }

  return size;
}

// __decodeMap_string_StringValues

function __decodeMap_string_StringValues(
  parentDecoder: __proto.Decoder,
  length: i32,
  map: Map<string, StringValues>
): void {
  const decoder = new __proto.Decoder(
    new DataView(
      parentDecoder.view.buffer,
      parentDecoder.pos + parentDecoder.view.byteOffset,
      length
    )
  );

  let key: string = "";
  let value: StringValues = new StringValues();

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
        value = StringValues.decodeDataView(
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
  map.set(key as string, value as StringValues);
}

// __sizeMapEntry_string_StringValues

function __sizeMapEntry_string_StringValues(
  key: string,
  value: StringValues
): u32 {
  const keySize =
    key.length > 0 ? 1 + __proto.Sizer.varint64(key.length) + key.length : 0;
  const valueSize = value.size();

  if (valueSize == 0) {
    return keySize;
  }

  return keySize + 1 + __proto.Sizer.varint64(valueSize) + valueSize;
}

// Type aliases
export type Event = OneOf;
