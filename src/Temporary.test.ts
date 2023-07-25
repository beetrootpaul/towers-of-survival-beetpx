import { describe, expect, test } from "@jest/globals";
import { v_ } from "beetpx";

describe("temporary one", () => {
  test("tmp", () => {
    expect(v_(1, 2).y).toEqual(2);
  });
});
