export class Button {
  private readonly onRelease: () => void;

  private _isPressed = false;
  private _wasJustReleased = false;

  // TODO: migrate from Lua
  // local is_enabled = true

  constructor(params: { onRelease: () => void }) {
    this.onRelease = params.onRelease;
  }

  get isPressed(): boolean {
    return this._isPressed;
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
    if (this._isPressed && !value) {
      this._wasJustReleased = true;
    }
    this._isPressed = value;
  }

  // function s.is_pressed()
  //     return is_pressed
  // end

  update(): void {
    if (this._wasJustReleased) {
      this.onRelease();
    }
    this._wasJustReleased = false;
  }
}
