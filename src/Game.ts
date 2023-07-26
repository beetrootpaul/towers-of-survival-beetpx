import { BeetPx } from "beetpx";
import { Screen } from "./screens/Screen";
import { ScreenTitle } from "./screens/ScreenTitle";
import { g, p8c } from "./globals";

export class Game {
  #currentScreen: Screen | undefined;
  #nextScreen: Screen | undefined;

  start(): void {
    BeetPx.init(
      {
        gameCanvasSize: g.screenSize,
        desiredFps: g.fps,
        logActualFps: g.__debug,
        debug: g.__debug
          ? {
              enabledOnInit: g.__debug,
              toggleKey: ";",
            }
          : undefined,
      },
      {
        images: [],
        fonts: [],
        sounds: [],
      }
    ).then(({ startGame }) => {
      this.#nextScreen = new ScreenTitle();
      this.#currentScreen = this.#nextScreen;

      // TODO: migrate from Lua
      // music(0)

      BeetPx.setOnUpdate(() => {
        this.#currentScreen = this.#currentScreen?.update();

        // TODO: migrate from Lua
        // d.update()
        // if (not d.enabled) or (d.enabled and d.is_next_frame) then

        // We intentionally reassign screen on the next update iteration
        //   then the current one, because we still need to use the previous one
        //   for a drawing.
        this.#currentScreen = this.#nextScreen;
        this.#nextScreen = this.#currentScreen?.update();

        // TODO: migrate from Lua
        //     audio.play()
        // end
      });

      BeetPx.setOnDraw(() => {
        BeetPx.clearCanvas(p8c.brownDark);

        this.#currentScreen?.draw();

        // TODO: migrate from Lua
        // pal(a.palette, 1)

        if (BeetPx.debug) {
          // TODO: uncomment once we provide BeetPx with a font
          // const fps = BeetPx.averageFps.toFixed(0);
          // BeetPx.print(fps, Vector2d.zero, p8c.darkPurple);
          // BeetPx.print(
          //   `♪ ${BeetPx.audioContext.state}`,
          //   Vector2d.zero,
          //   p8c.blue
          // );
        }
      });

      startGame(() => {});
    });
  }
}
