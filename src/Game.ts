import { Vector2d, transparent_, v_ } from "@beetpx/beetpx";
import { TinyFont } from "./TinyFont";
import { b, g, p8c, u } from "./globals";
import { PauseMenu } from "./gui/PauseMenu";
import { Screen } from "./screens/Screen";
import { ScreenTitle } from "./screens/ScreenTitle";

export class Game {
  static isPaused: boolean = false;

  #pauseMenu: PauseMenu | undefined;

  #currentScreen: Screen | undefined;
  #nextScreen: Screen | undefined;

  start(): void {
    b.init(
      {
        gameCanvasSize: "64x64",
        visibleTouchButtons: ["left", "right", "up", "down", "o", "x", "menu"],
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
      b.setOnStarted(() => {
        b.setFont(g.assets.tinyFont);

        b.setRepeating("x", false);
        b.setRepeating("o", false);

        Game.isPaused = false;
        this.#pauseMenu = new PauseMenu();

        this.#nextScreen = new ScreenTitle();
        this.#currentScreen = this.#nextScreen;

        b.stopAllSounds();
        this.#startMusic();
      });

      b.setOnUpdate(() => {
        if (b.wasJustPressed("menu")) {
          Game.isPaused = !Game.isPaused;
        }

        if (Game.isPaused) {
          this.#pauseMenu?.update();
        } else {
          // We intentionally reassign screen on the next update iteration
          //   then the current one, because we still need to use the previous one
          //   for a drawing.
          this.#currentScreen = this.#nextScreen;
          this.#nextScreen = this.#currentScreen?.update();
        }
      });

      b.setOnDraw(() => {
        b.clearCanvas(p8c.brownishBlack);

        b.mapSpriteColors([
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
        if (Game.isPaused) {
          this.#pauseMenu?.draw();
        }

        if (b.debug) {
          const fps = b.averageFps.toFixed(0);
          b.print(fps, Vector2d.zero, p8c.mauve);
          const audioState = b.audioContext.state;
          const audioStateText =
            audioState === "suspended"
              ? "s"
              : audioState === "running"
              ? "r"
              : audioState === "closed"
              ? "c"
              : "@";
          b.print(
            audioStateText,
            v_(g.canvasSize.x - u.measureText(audioStateText).x, 0),
            p8c.mauve
          );
        }
      });

      startGame();
    });
  }

  #startMusic(): void {
    // SFXs exported from PICO-8 have full length of 32 notes, even though in the game they are defined as 24 notes
    const durationMs = (fullSoundDurationMs: number) =>
      (fullSoundDurationMs * 24) / 32;
    b.playSoundSequence({
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
  }
}
