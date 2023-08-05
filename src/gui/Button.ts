// TODO: move this logic to the framework maybe?
// TODO: implement a PICO-8 like button press detection which starts to repeat after certain treshold
export class Button {
  readonly #onPress: (() => void) | undefined;
  readonly #onRelease: (() => void) | undefined;

  #isPressed = false;
  #wasJustToggled = false;

  // TODO: migrate from Lua
  // local is_enabled = true

  constructor(params: { onPress?: () => void; onRelease?: () => void }) {
    this.#onPress = params.onPress;
    this.#onRelease = params.onRelease;
  }

  get isPressed(): boolean {
    return this.#isPressed;
  }

  // TODO: migrate from Lua
  // function s.set_enabled(value)
  //     is_enabled = value
  // end
  //
  // function s.is_enabled()
  //     return is_enabled
  // end

  setPressed(pressed: boolean): void {
    if (this.#isPressed !== pressed) {
      this.#wasJustToggled = true;
    }
    this.#isPressed = pressed;
  }

  update(): void {
    if (this.#wasJustToggled) {
      if (this.#isPressed) {
        this.#onPress?.();
      } else {
        this.#onRelease?.();
      }
      this.#wasJustToggled = false;
    }
  }
}
