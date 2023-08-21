import { describe, expect, test } from "@jest/globals";
import { Lives } from "./Lives";

describe("Lives", () => {
  test("#takeOne / #left", () => {
    const lives = new Lives();
    expect(lives.left).toBe(5);

    lives.takeOne();
    expect(lives.left).toBe(4);

    lives.takeOne();
    lives.takeOne();
    lives.takeOne();
    expect(lives.left).toBe(1);

    lives.takeOne();
    expect(lives.left).toBe(0);

    lives.takeOne();
    lives.takeOne();
    lives.takeOne();
    expect(lives.left).toBe(0);
  });
});
