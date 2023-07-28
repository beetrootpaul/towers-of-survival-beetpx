// TODO: move this logic to the framework
export class Button {
  readonly #onRelease: () => void;

  #isPressed = false;
  #wasJustReleased = false;

  // TODO: migrate from Lua
  // local is_enabled = true

  constructor(params: { onRelease: () => void }) {
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

  setPressed(value: boolean): void {
    if (this.#isPressed && !value) {
      this.#wasJustReleased = true;
    }
    this.#isPressed = value;
  }

  // function s.is_pressed()
  //     return is_pressed
  // end

  update(): void {
    if (this.#wasJustReleased) {
      this.#onRelease();
    }
    this.#wasJustReleased = false;
  }
}
