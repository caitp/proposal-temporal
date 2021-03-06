// Copyright (C) 2020 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.now.plaindatetime
---*/

const values = [
  [undefined, "undefined"],
  [null, "null"],
  [true, "true"],
  ["iso8601", "iso8601"],
  [Symbol(), "Symbol()"],
  [2020, "2020"],
  [2n, "2n"],
];

const timeZone = Temporal.TimeZone.from("UTC");

for (const [value, description] of values) {
  let called = 0;
  Temporal.Calendar.from = function(argument) {
    ++called;
    assert.sameValue(argument, "test");
    return value;
  };

  assert.throws(TypeError, () => Temporal.now.plainDateTime("test", timeZone), description);
  assert.sameValue(called, 1);
}
