import { describe, expect, test } from "@jest/globals";

import { validateUnknown, validator } from "../validator";

import { v5ExampleBasic } from "./fixtures/v5-example-basic";
import { v5ExampleAdvanced } from "./fixtures/v5-example-advanced";
import { v4ExampleReserved } from "./fixtures/v4-example-reserved";
import { v4ExamplePublic } from "./fixtures/v4-example-public";
import { v4ExampleReject } from "./fixtures/v4-example-reject";

describe("Validator with example data", () => {
  test("v5.0", () => {
    const validate = validator("v5");
    expect(validate(v5ExampleBasic)).toBe(true);
    expect(validate(v5ExampleAdvanced)).toBe(true);

    expect(validate(v4ExampleReject)).toBe(false);
    expect(validate(v4ExamplePublic)).toBe(false);
    expect(validate(v4ExampleReserved)).toBe(false);
  });

  test("v4.0 RESERVED", () => {
    const validate = validator("v4-reserved");
    expect(validate(v4ExampleReserved)).toBe(true);

    expect(validate(v5ExampleBasic)).toBe(false);
    expect(validate(v5ExampleAdvanced)).toBe(false);
    expect(validate(v4ExampleReject)).toBe(false);
    expect(validate(v4ExamplePublic)).toBe(false);
  });

  test("v4.0 PUBLIC", () => {
    const validate = validator("v4-public");
    expect(validate(v4ExamplePublic)).toBe(true);

    expect(validate(v5ExampleBasic)).toBe(false);
    expect(validate(v5ExampleAdvanced)).toBe(false);
    expect(validate(v4ExampleReject)).toBe(false);
    expect(validate(v4ExampleReserved)).toBe(false);
  });

  test("v4.0 REJECT", () => {
    const validate = validator("v4-reject");
    expect(validate(v4ExampleReject)).toBe(true);

    expect(validate(v5ExampleBasic)).toBe(false);
    expect(validate(v5ExampleAdvanced)).toBe(false);
    expect(validate(v4ExamplePublic)).toBe(false);
    expect(validate(v4ExampleReserved)).toBe(false);
  });
});

describe("validateUnknown with example data", () => {
  const tryV4ExampleReserved = validateUnknown(v4ExampleReserved);
  const tryV4ExamplePublic = validateUnknown(v4ExamplePublic);
  const tryV4ExampleReject = validateUnknown(v4ExampleReject);
  const tryV5ExampleAdvanced = validateUnknown(v5ExampleAdvanced);
  const tryV5ExampleBasic = validateUnknown(v5ExampleBasic);

  test("All test cases are defined", () => {
    expect(tryV4ExampleReserved).toBeDefined();
    expect(tryV4ExamplePublic).toBeDefined();
    expect(tryV4ExampleReject).toBeDefined();
    expect(tryV5ExampleAdvanced).toBeDefined();
    expect(tryV5ExampleBasic).toBeDefined();
  });
});
