import { BeetPx, BpxVector2d, transparent_, v_ } from "beetpx";
import { TinyFont } from "./TinyFont";
import { g, p8c, u } from "./globals";
import { Screen } from "./screens/Screen";
import { ScreenTitle } from "./screens/ScreenTitle";

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
        fonts: [
          {
            font: new TinyFont(),
            // TODO: consider coupling URL with Font, since they rather won't be used separately or exchanged
            url: g.assets.spritesheet,
            imageBgColor: p8c.black,
            imageTextColor: p8c.green,
          },
        ],
        sounds: [{ url: g.assets.sfx00 }],
      }
    ).then(({ startGame }) => {
      this.#nextScreen = new ScreenTitle();
      this.#currentScreen = this.#nextScreen;

      // TODO: AUDIO
      BeetPx.playSoundLooped(g.assets.sfx00);
      // music(0)

      BeetPx.setOnUpdate(() => {
        // TODO: DEBUG STEP
        // d.update()
        // if (not d.enabled) or (d.enabled and d.is_next_frame) then

        // We intentionally reassign screen on the next update iteration
        //   then the current one, because we still need to use the previous one
        //   for a drawing.
        this.#currentScreen = this.#nextScreen;
        this.#nextScreen = this.#currentScreen?.update();

        // TODO: AUDIO
        //     audio.play()
        // end
      });

      BeetPx.setOnDraw(() => {
        BeetPx.clearCanvas(p8c.brownishBlack);

        BeetPx.mapSpriteColors([
          { from: p8c.black, to: transparent_ },
          { from: p8c.darkBlue, to: p8c.trueBlue },
          { from: p8c.darkPurple, to: p8c.darkRed },
          { from: p8c.darkGreen, to: p8c.darkerGrey },
          { from: p8c.orange, to: p8c.darkPeach },
          { from: p8c.yellow, to: p8c.lightYellow },
          { from: p8c.green, to: p8c.mediumGreen },
          { from: p8c.pink, to: p8c.mauve },
          { from: p8c.lightPeach, to: p8c.mediumGrey },
        ]);

        this.#currentScreen?.draw();

        // TODO: here we kinda cannot use a single spritesheet with 2 fonts on it. Do something about it
        BeetPx.setFont(g.assets.spritesheet);

        if (BeetPx.debug) {
          const fps = BeetPx.averageFps.toFixed(0);
          BeetPx.print(fps, BpxVector2d.zero, p8c.mauve);
          const audioState = BeetPx.audioContext.state;
          let audioStateText =
            audioState === "suspended"
              ? "s"
              : audioState === "running"
              ? "r"
              : audioState === "closed"
              ? "c"
              : "@";
          BeetPx.print(
            audioStateText,
            v_(g.canvasSize.x - u.measureTextSize(audioStateText).x, 0),
            p8c.mauve
          );
        }
      });

      startGame(() => {});
    });
  }
}
