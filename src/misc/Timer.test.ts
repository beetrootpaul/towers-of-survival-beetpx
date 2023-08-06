import { describe, expect, test } from "@jest/globals";
import { u } from "../globals";
import { Timer } from "./Timer";

describe("Timer", () => {
  test("#hasFinished", () => {
    const timer = new Timer({ start: 1 });
    expect(timer.hasFinished()).toBe(false);
    timer.update();
    expect(timer.hasFinished()).toBe(false);
    timer.update();
    expect(timer.hasFinished()).toBe(true);
  });

  test("#progress for a 0 frames long timer", () => {
    const timer = new Timer({ start: 0 });
    expect(timer.progress()).toBe(1);
  });

  test("#progress for a 1 frame long timer", () => {
    const timer = new Timer({ start: 1 });
    expect(timer.progress()).toBe(0);
    timer.update();
    expect(timer.progress()).toBe(1);
    timer.update();
    expect(timer.progress()).toBe(1);
  });

  test("#progress for a 2 frames long timer", () => {
    const timer = new Timer({ start: 2 });
    expect(timer.progress()).toBe(0);
    timer.update();
    expect(timer.progress()).toBe(0.5);
    timer.update();
    expect(timer.progress()).toBe(1);
  });

  test("#progress for a many frames long timer", () => {
    const timer = new Timer({ start: 100 });
    expect(timer.progress()).toBe(0);
    timer.update();
    expect(timer.progress()).toBeCloseTo(0.01, 2);
    timer.update();
    expect(timer.progress()).toBeCloseTo(0.02, 2);
    u.repeatN(96, () => {
      timer.update();
    });
    expect(timer.progress()).toBeCloseTo(0.98, 2);
    timer.update();
    expect(timer.progress()).toBeCloseTo(0.99, 2);
    timer.update();
    expect(timer.progress()).toBeCloseTo(1.0, 2);
  });
});
