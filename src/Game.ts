import { BeetPx, transparent_ } from "beetpx";
import { Screen } from "./screens/Screen";
import { ScreenTitle } from "./screens/ScreenTitle";
import { g, p8c } from "./globals";

export class Game {
  #currentScreen: Screen | undefined;
  #nextScreen: Screen | undefined;

  start(): void {
    BeetPx.init(
      {
        gameCanvasSize: g.canvasSize,
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
        images: [{ url: g.assets.spritesheet }],
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
        BeetPx.mapSpriteColors([
          { from: p8c.black, to: transparent_ },
          { from: p8c.darkBlue, to: p8c.blueDark },
          { from: p8c.darkPurple, to: p8c.redDark },
          { from: p8c.darkGreen, to: p8c.brownMid },
          { from: p8c.orange, to: p8c.salmon },
          { from: p8c.yellowOld, to: p8c.yellow },
          { from: p8c.greenOld, to: p8c.green },
          { from: p8c.pink, to: p8c.brownPurple },
          { from: p8c.lightPeach, to: p8c.sand },
        ]);

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
