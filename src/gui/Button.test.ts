import { describe, expect, jest, test } from "@jest/globals";
import { Button } from "./Button";

describe("Button", () => {
  test("onPress", () => {
    const onPress = jest.fn();
    const button = new Button({ onPress });

    button.setPressed(false);
    button.update();

    expect(onPress).not.toBeCalled();

    button.setPressed(true);
    button.update();

    expect(onPress).toBeCalledTimes(1);

    button.update();
    button.update();
    button.update();

    expect(onPress).toBeCalledTimes(1);

    button.setPressed(false);
    button.update();

    expect(onPress).toBeCalledTimes(1);

    button.setPressed(true);
    button.update();

    expect(onPress).toBeCalledTimes(2);

    button.update();
    button.update();
    button.update();

    expect(onPress).toBeCalledTimes(2);
  });

  test("onRelease", () => {
    const onRelease = jest.fn();
    const button = new Button({ onRelease });

    button.setPressed(false);
    button.update();

    expect(onRelease).not.toBeCalled();

    button.setPressed(true);
    button.update();

    expect(onRelease).not.toBeCalled();

    button.setPressed(false);
    button.update();

    expect(onRelease).toBeCalledTimes(1);

    button.update();
    button.update();
    button.update();

    expect(onRelease).toBeCalledTimes(1);

    button.setPressed(true);
    button.update();

    expect(onRelease).toBeCalledTimes(1);

    button.setPressed(false);
    button.update();

    expect(onRelease).toBeCalledTimes(2);

    button.update();
    button.update();
    button.update();

    expect(onRelease).toBeCalledTimes(2);
  });
});
