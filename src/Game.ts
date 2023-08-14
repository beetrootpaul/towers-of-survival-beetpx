import { BeetPx, Vector2d, transparent_, v_ } from "@beetpx/beetpx";
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
        logActualFps: !__BEETPX_IS_PROD__,
        debug: {
          available: !__BEETPX_IS_PROD__,
          toggleKey: ";",
          frameByFrame: {
            activateKey: ",",
            stepKey: ".",
          },
        },
      },
      {
        images: [{ url: g.assets.spritesheet }],
        fonts: [
          {
            font: new TinyFont(),
            imageBgColor: p8c.black,
            imageTextColor: p8c.green,
          },
        ],
        sounds: [
          { url: g.assets.musicBg1 },
          { url: g.assets.musicBg2 },
          { url: g.assets.musicBg3 },
          { url: g.assets.musicBg4 },
          { url: g.assets.musicMelody1 },
          { url: g.assets.musicMelody2 },
          { url: g.assets.musicMelody3 },
          { url: g.assets.musicMelody4 },
          { url: g.assets.musicMelody5 },
          { url: g.assets.musicMelody6 },
          { url: g.assets.musicMelody7 },
          { url: g.assets.sfxLiveLost },
          { url: g.assets.sfxCannotPlace },
          { url: g.assets.sfxTowerPlaced },
          { url: g.assets.sfxButtonPress },
          { url: g.assets.sfxVBeam },
          { url: g.assets.sfxLaser },
        ],
      }
    ).then(({ startGame }) => {
      this.#nextScreen = new ScreenTitle();
      this.#currentScreen = this.#nextScreen;

      // SFXs exported from PICO-8 have full length of 32 notes, even though in the game they are defined as 24 notes
      const durationMs = (fullSoundDurationMs: number) =>
        (fullSoundDurationMs * 24) / 32;
      BeetPx.playSoundSequence({
        sequence: [
          [{ url: g.assets.musicBg1, durationMs }],
          [{ url: g.assets.musicBg1, durationMs }],
          [{ url: g.assets.musicBg2, durationMs }],
          [{ url: g.assets.musicBg2, durationMs }],
        ],
        sequenceLooped: [
          // 1st four
          [
            { url: g.assets.musicBg1, durationMs },
            { url: g.assets.musicMelody1 },
          ],
          [
            { url: g.assets.musicBg1, durationMs },
            { url: g.assets.musicMelody2 },
          ],
          [
            { url: g.assets.musicBg1, durationMs },
            { url: g.assets.musicMelody1 },
          ],
          [
            { url: g.assets.musicBg1, durationMs },
            { url: g.assets.musicMelody2 },
          ],
          // 2nd four
          [
            { url: g.assets.musicBg3, durationMs },
            { url: g.assets.musicMelody3 },
          ],
          [
            { url: g.assets.musicBg3, durationMs },
            { url: g.assets.musicMelody4 },
          ],
          [
            { url: g.assets.musicBg1, durationMs },
            { url: g.assets.musicMelody1 },
          ],
          [
            { url: g.assets.musicBg1, durationMs },
            { url: g.assets.musicMelody2 },
          ],
          // 3rd four
          [
            { url: g.assets.musicBg4, durationMs },
            { url: g.assets.musicMelody5 },
          ],
          [
            { url: g.assets.musicBg4, durationMs },
            { url: g.assets.musicMelody6 },
          ],
          [
            { url: g.assets.musicBg1, durationMs },
            { url: g.assets.musicMelody7 },
          ],
          [{ url: g.assets.musicBg2, durationMs }],
        ],
      });

      BeetPx.setOnUpdate(() => {
        // We intentionally reassign screen on the next update iteration
        //   then the current one, because we still need to use the previous one
        //   for a drawing.
        this.#currentScreen = this.#nextScreen;
        this.#nextScreen = this.#currentScreen?.update();
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

        BeetPx.setFont(g.assets.tinyFont);

        if (BeetPx.debug) {
          const fps = BeetPx.averageFps.toFixed(0);
          BeetPx.print(fps, Vector2d.zero, p8c.mauve);
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
