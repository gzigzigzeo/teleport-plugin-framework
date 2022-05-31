import * as __proto from "../__proto";

/**
 * A Timestamp represents a point in time independent of any time zone or local
 *  calendar, encoded as a count of seconds and fractions of seconds at
 *  nanosecond resolution. The count is relative to an epoch at UTC midnight on
 *  January 1, 1970, in the proleptic Gregorian calendar which extends the
 *  Gregorian calendar backwards to year one.
 *
 *  All minutes are 60 seconds long. Leap seconds are "smeared" so that no leap
 *  second table is needed for interpretation, using a [24-hour linear
 *  smear](https://developers.google.com/time/smear).
 *
 *  The range is from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59.999999999Z. By
 *  restricting to that range, we ensure that we can convert to and from [RFC
 *  3339](https://www.ietf.org/rfc/rfc3339.txt) date strings.
 *
 *  # Examples
 *
 *  Example 1: Compute Timestamp from POSIX `time()`.
 *
 *      Timestamp timestamp;
 *      timestamp.set_seconds(time(NULL));
 *      timestamp.set_nanos(0);
 *
 *  Example 2: Compute Timestamp from POSIX `gettimeofday()`.
 *
 *      struct timeval tv;
 *      gettimeofday(&tv, NULL);
 *
 *      Timestamp timestamp;
 *      timestamp.set_seconds(tv.tv_sec);
 *      timestamp.set_nanos(tv.tv_usec * 1000);
 *
 *  Example 3: Compute Timestamp from Win32 `GetSystemTimeAsFileTime()`.
 *
 *      FILETIME ft;
 *      GetSystemTimeAsFileTime(&ft);
 *      UINT64 ticks = (((UINT64)ft.dwHighDateTime) << 32) | ft.dwLowDateTime;
 *
 *      // A Windows tick is 100 nanoseconds. Windows epoch 1601-01-01T00:00:00Z
 *      // is 11644473600 seconds before Unix epoch 1970-01-01T00:00:00Z.
 *      Timestamp timestamp;
 *      timestamp.set_seconds((INT64) ((ticks / 10000000) - 11644473600LL));
 *      timestamp.set_nanos((INT32) ((ticks % 10000000) * 100));
 *
 *  Example 4: Compute Timestamp from Java `System.currentTimeMillis()`.
 *
 *      long millis = System.currentTimeMillis();
 *
 *      Timestamp timestamp = Timestamp.newBuilder().setSeconds(millis / 1000)
 *          .setNanos((int) ((millis % 1000) * 1000000)).build();
 *
 *
 *  Example 5: Compute Timestamp from Java `Instant.now()`.
 *
 *      Instant now = Instant.now();
 *
 *      Timestamp timestamp =
 *          Timestamp.newBuilder().setSeconds(now.getEpochSecond())
 *              .setNanos(now.getNano()).build();
 *
 *
 *  Example 6: Compute Timestamp from current time in Python.
 *
 *      timestamp = Timestamp()
 *      timestamp.GetCurrentTime()
 *
 *  # JSON Mapping
 *
 *  In JSON format, the Timestamp type is encoded as a string in the
 *  [RFC 3339](https://www.ietf.org/rfc/rfc3339.txt) format. That is, the
 *  format is "{year}-{month}-{day}T{hour}:{min}:{sec}[.{frac_sec}]Z"
 *  where {year} is always expressed using four digits while {month}, {day},
 *  {hour}, {min}, and {sec} are zero-padded to two digits each. The fractional
 *  seconds, which can go up to 9 digits (i.e. up to 1 nanosecond resolution),
 *  are optional. The "Z" suffix indicates the timezone ("UTC"); the timezone
 *  is required. A proto3 JSON serializer should always use UTC (as indicated by
 *  "Z") when printing the Timestamp type and a proto3 JSON parser should be
 *  able to accept both UTC and other timezones (as indicated by an offset).
 *
 *  For example, "2017-01-15T01:30:15.01Z" encodes 15.01 seconds past
 *  01:30 UTC on January 15, 2017.
 *
 *  In JavaScript, one can convert a Date object to this format using the
 *  standard
 *  [toISOString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString)
 *  method. In Python, a standard `datetime.datetime` object can be converted
 *  to this format using
 *  [`strftime`](https://docs.python.org/2/library/time.html#time.strftime) with
 *  the time format spec '%Y-%m-%dT%H:%M:%S.%fZ'. Likewise, in Java, one can use
 *  the Joda Time's [`ISODateTimeFormat.dateTime()`](
 *  http://www.joda.org/joda-time/apidocs/org/joda/time/format/ISODateTimeFormat.html#dateTime%2D%2D
 *  ) to obtain a formatter capable of generating timestamps in this format.
 */
export class Timestamp {
  /**
   * Represents seconds of UTC time since Unix epoch
   *  1970-01-01T00:00:00Z. Must be from 0001-01-01T00:00:00Z to
   *  9999-12-31T23:59:59Z inclusive.
   */
  public seconds: i64;
  /**
   * Non-negative fractions of a second at nanosecond resolution. Negative
   *  second values with fractions must still have non-negative nanos values
   *  that count forward in time. Must be from 0 to 999,999,999
   *  inclusive.
   */
  public nanos: i32;

  // Decodes Timestamp from an ArrayBuffer
  static decode(buf: ArrayBuffer): Timestamp {
    return Timestamp.decodeDataView(new DataView(buf));
  }

  // Decodes Timestamp from a DataView
  static decodeDataView(view: DataView): Timestamp {
    const decoder = new __proto.Decoder(view);
    const obj = new Timestamp();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.seconds = decoder.int64();
          break;
        }
        case 2: {
          obj.nanos = decoder.int32();
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode Timestamp

  public size(): u32 {
    let size: u32 = 0;

    size += this.seconds == 0 ? 0 : 1 + __proto.Sizer.int64(this.seconds);
    size += this.nanos == 0 ? 0 : 1 + __proto.Sizer.int32(this.nanos);

    return size;
  }

  // Encodes Timestamp to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes Timestamp to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.seconds != 0) {
      encoder.uint32(0x8);
      encoder.int64(this.seconds);
    }
    if (this.nanos != 0) {
      encoder.uint32(0x10);
      encoder.int32(this.nanos);
    }

    return buf;
  } // encode Timestamp
} // Timestamp

/**
 * `NullValue` is a singleton enumeration to represent the null value for the
 *  `Value` type union.
 *
 *   The JSON representation for `NullValue` is JSON `null`.
 */
export enum NullValue {
  // Null value.
  NULL_VALUE = 0,
} // NullValue
/**
 * `Struct` represents a structured data value, consisting of fields
 *  which map to dynamically typed values. In some languages, `Struct`
 *  might be supported by a native representation. For example, in
 *  scripting languages like JS a struct is represented as an
 *  object. The details of that representation are described together
 *  with the proto support for the language.
 *
 *  The JSON representation for `Struct` is JSON object.
 */
export class Struct {
  // Unordered map of dynamically typed values.
  public fields: Map<string, Value> = new Map<string, Value>();

  // Decodes Struct from an ArrayBuffer
  static decode(buf: ArrayBuffer): Struct {
    return Struct.decodeDataView(new DataView(buf));
  }

  // Decodes Struct from a DataView
  static decodeDataView(view: DataView): Struct {
    const decoder = new __proto.Decoder(view);
    const obj = new Struct();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          const length = decoder.uint32();
          __decodeMap_string_Value(decoder, length, obj.fields);
          decoder.skip(length);

          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode Struct

  public size(): u32 {
    let size: u32 = 0;

    if (this.fields.size > 0) {
      const keys = this.fields.keys();

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = this.fields.get(key);
        const itemSize = __sizeMapEntry_string_Value(key, value);
        if (itemSize > 0) {
          size += 1 + __proto.Sizer.varint64(itemSize) + itemSize;
        }
      }
    }

    return size;
  }

  // Encodes Struct to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes Struct to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.fields.size > 0) {
      const keys = this.fields.keys();
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = this.fields.get(key);
        const size = __sizeMapEntry_string_Value(key, value);
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
  } // encode Struct
} // Struct

/**
 * `Value` represents a dynamically typed value which can be either
 *  null, a number, a string, a boolean, a recursive struct value, or a
 *  list of values. A producer of value is expected to set one of that
 *  variants, absence of any variant indicates an error.
 *
 *  The JSON representation for `Value` is JSON value.
 */
export class Value {
  // Represents a null value.
  public null_value: u32;
  // Represents a double value.
  public number_value: f64;
  // Represents a string value.
  public string_value: string = "";
  // Represents a boolean value.
  public bool_value: bool;
  // Represents a structured value.
  public struct_value: Struct | null;
  // Represents a repeated `Value`.
  public list_value: ListValue | null;

  public __oneOf_kind: string = "";
  public __oneOf_kind_index: u8 = 0;

  static readonly KIND_NULL_VALUE_INDEX: u8 = 1;
  static readonly KIND_NUMBER_VALUE_INDEX: u8 = 2;
  static readonly KIND_STRING_VALUE_INDEX: u8 = 3;
  static readonly KIND_BOOL_VALUE_INDEX: u8 = 4;
  static readonly KIND_STRUCT_VALUE_INDEX: u8 = 5;
  static readonly KIND_LIST_VALUE_INDEX: u8 = 6;

  // Decodes Value from an ArrayBuffer
  static decode(buf: ArrayBuffer): Value {
    return Value.decodeDataView(new DataView(buf));
  }

  // Decodes Value from a DataView
  static decodeDataView(view: DataView): Value {
    const decoder = new __proto.Decoder(view);
    const obj = new Value();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          obj.null_value = decoder.uint32();
          obj.__oneOf_kind = "null_value";
          obj.__oneOf_kind_index = 1;
          break;
        }
        case 2: {
          obj.number_value = decoder.double();
          obj.__oneOf_kind = "number_value";
          obj.__oneOf_kind_index = 2;
          break;
        }
        case 3: {
          obj.string_value = decoder.string();
          obj.__oneOf_kind = "string_value";
          obj.__oneOf_kind_index = 3;
          break;
        }
        case 4: {
          obj.bool_value = decoder.bool();
          obj.__oneOf_kind = "bool_value";
          obj.__oneOf_kind_index = 4;
          break;
        }
        case 5: {
          const length = decoder.uint32();
          obj.struct_value = Struct.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.__oneOf_kind = "struct_value";
          obj.__oneOf_kind_index = 5;
          break;
        }
        case 6: {
          const length = decoder.uint32();
          obj.list_value = ListValue.decodeDataView(
            new DataView(
              decoder.view.buffer,
              decoder.pos + decoder.view.byteOffset,
              length
            )
          );
          decoder.skip(length);

          obj.__oneOf_kind = "list_value";
          obj.__oneOf_kind_index = 6;
          break;
        }

        default:
          decoder.skipType(tag & 7);
          break;
      }
    }
    return obj;
  } // decode Value

  public size(): u32 {
    let size: u32 = 0;

    size +=
      this.null_value == 0 ? 0 : 1 + __proto.Sizer.uint32(this.null_value);
    size += this.number_value == 0 ? 0 : 1 + 8;
    size +=
      this.string_value.length > 0
        ? 1 +
          __proto.Sizer.varint64(this.string_value.length) +
          this.string_value.length
        : 0;
    size += this.bool_value == 0 ? 0 : 1 + 1;

    if (this.struct_value != null) {
      const f: Struct = this.struct_value as Struct;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    if (this.list_value != null) {
      const f: ListValue = this.list_value as ListValue;
      const messageSize = f.size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes Value to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes Value to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    if (this.null_value != 0) {
      encoder.uint32(0x8);
      encoder.uint32(this.null_value);
    }
    if (this.number_value != 0) {
      encoder.uint32(0x11);
      encoder.double(this.number_value);
    }
    if (this.string_value.length > 0) {
      encoder.uint32(0x1a);
      encoder.uint32(this.string_value.length);
      encoder.string(this.string_value);
    }
    if (this.bool_value != 0) {
      encoder.uint32(0x20);
      encoder.bool(this.bool_value);
    }

    if (this.struct_value != null) {
      const f = this.struct_value as Struct;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x2a);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    if (this.list_value != null) {
      const f = this.list_value as ListValue;

      const messageSize = f.size();

      if (messageSize > 0) {
        encoder.uint32(0x32);
        encoder.uint32(messageSize);
        f.encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode Value
} // Value

/**
 * `ListValue` is a wrapper around a repeated field of values.
 *
 *  The JSON representation for `ListValue` is JSON array.
 */
export class ListValue {
  // Repeated field of dynamically typed values.
  public values: Array<Value> = new Array<Value>();

  // Decodes ListValue from an ArrayBuffer
  static decode(buf: ArrayBuffer): ListValue {
    return ListValue.decodeDataView(new DataView(buf));
  }

  // Decodes ListValue from a DataView
  static decodeDataView(view: DataView): ListValue {
    const decoder = new __proto.Decoder(view);
    const obj = new ListValue();

    while (!decoder.eof()) {
      const tag = decoder.tag();
      const number = tag >>> 3;

      switch (number) {
        case 1: {
          const length = decoder.uint32();
          obj.values.push(
            Value.decodeDataView(
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
  } // decode ListValue

  public size(): u32 {
    let size: u32 = 0;

    for (let n: i32 = 0; n < this.values.length; n++) {
      const messageSize = this.values[n].size();

      if (messageSize > 0) {
        size += 1 + __proto.Sizer.varint64(messageSize) + messageSize;
      }
    }

    return size;
  }

  // Encodes ListValue to the ArrayBuffer
  encode(): ArrayBuffer {
    return changetype<ArrayBuffer>(
      StaticArray.fromArray<u8>(this.encodeU8Array())
    );
  }

  // Encodes ListValue to the Array<u8>
  encodeU8Array(
    encoder: __proto.Encoder = new __proto.Encoder(new Array<u8>())
  ): Array<u8> {
    const buf = encoder.buf;

    for (let n: i32 = 0; n < this.values.length; n++) {
      const messageSize = this.values[n].size();

      if (messageSize > 0) {
        encoder.uint32(0xa);
        encoder.uint32(messageSize);
        this.values[n].encodeU8Array(encoder);
      }
    }

    return buf;
  } // encode ListValue
} // ListValue

// __decodeMap_string_Value

function __decodeMap_string_Value(
  parentDecoder: __proto.Decoder,
  length: i32,
  map: Map<string, Value>
): void {
  const decoder = new __proto.Decoder(
    new DataView(
      parentDecoder.view.buffer,
      parentDecoder.pos + parentDecoder.view.byteOffset,
      length
    )
  );

  let key: string = "";
  let value: Value = new Value();

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
        value = Value.decodeDataView(
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
  map.set(key as string, value as Value);
}

// __sizeMapEntry_string_Value

function __sizeMapEntry_string_Value(key: string, value: Value): u32 {
  const keySize =
    key.length > 0 ? 1 + __proto.Sizer.varint64(key.length) + key.length : 0;
  const valueSize = value.size();

  if (valueSize == 0) {
    return keySize;
  }

  return keySize + 1 + __proto.Sizer.varint64(valueSize) + valueSize;
}
