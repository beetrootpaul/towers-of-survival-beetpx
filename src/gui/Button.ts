// TODO: move this logic to the framework maybe?
// TODO: implement a PICO-8 like button press detection which starts to repeat after certain treshold
export class Button {
  readonly #onPress: ((self: Button) => void) | undefined;
  readonly #onRelease: ((self: Button) => void) | undefined;

  #isEnabled = true;
  #isPressed = false;
  #wasJustToggled = false;

  constructor(params: {
    onPress?: (self: Button) => void;
    onRelease?: (self: Button) => void;
  }) {
    this.#onPress = params.onPress;
    this.#onRelease = params.onRelease;
  }

  get isPressed(): boolean {
    return this.#isPressed;
  }

  setEnabled(enabled: boolean): void {
    this.#isEnabled = enabled;
  }

  get isEnabled(): boolean {
    return this.#isEnabled;
  }

  setPressed(pressed: boolean): void {
    if (this.#isPressed !== pressed) {
      this.#wasJustToggled = true;
    }
    this.#isPressed = pressed;
  }

  update(): void {
    if (this.#wasJustToggled) {
      if (this.#isPressed) {
        this.#onPress?.(this);
      } else {
        this.#onRelease?.(this);
      }
      this.#wasJustToggled = false;
    }
  }
}
