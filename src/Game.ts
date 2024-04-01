import { BpxSpriteColorMapping, v_, v_0_0_ } from "@beetpx/beetpx";
import { TinyFont } from "./TinyFont";
import { b, g, p8c } from "./globals";
import { PauseMenu } from "./gui/PauseMenu";
import { Screen } from "./screens/Screen";
import { ScreenTitle } from "./screens/ScreenTitle";

export class Game {
  static isPaused: boolean = false;

  #pauseMenu: PauseMenu | undefined;

  #currentScreen: Screen | undefined;
  #nextScreen: Screen | undefined;

  start(): void {
    b.init({
      gameCanvasSize: "64x64",
      fixedTimestep: "30fps",
      debugMode: !window.BEETPX__IS_PROD,
      assets: [
        g.assets.spritesheet,
        g.assets.musicBg1,
        g.assets.musicBg2,
        g.assets.musicBg3,
        g.assets.musicBg4,
        g.assets.musicMelody1,
        g.assets.musicMelody2,
        g.assets.musicMelody3,
        g.assets.musicMelody4,
        g.assets.musicMelody5,
        g.assets.musicMelody6,
        g.assets.musicMelody7,
        g.assets.sfxLiveLost,
        g.assets.sfxCannotPlace,
        g.assets.sfxTowerPlaced,
        g.assets.sfxButtonPress,
        g.assets.sfxVBeam,
        g.assets.sfxLaser,
      ],
    }).then(({ startGame }) => {
      b.setOnStarted(() => {
        b.useFont(new TinyFont());

        b.setButtonRepeating("a", false);
        b.setButtonRepeating("b", false);

        Game.isPaused = false;
        this.#pauseMenu = new PauseMenu();

        this.#nextScreen = new ScreenTitle();
        this.#currentScreen = this.#nextScreen;

        b.stopAllPlaybacks();
        this.#startMusic();
      });

      b.setOnUpdate(() => {
        if (b.wasButtonJustPressed("menu")) {
          Game.isPaused = !Game.isPaused;
        }

        if (Game.isPaused) {
          this.#currentScreen?.pauseTimers();
          this.#pauseMenu?.update();
        } else {
          // We intentionally reassign screen on the next update iteration
          //   then the current one, because we still need to use the previous one
          //   for a drawing.
          this.#currentScreen = this.#nextScreen;
          this.#currentScreen?.resumeTimers();
          this.#nextScreen = this.#currentScreen?.update();
        }
      });

      b.setOnDraw(() => {
        b.clearCanvas(p8c.brownishBlack);

        b.setSpriteColorMapping(
          BpxSpriteColorMapping.from([
            [p8c.black, null],
            [p8c.darkBlue, p8c.trueBlue],
            [p8c.darkPurple, p8c.darkRed],
            [p8c.darkGreen, p8c.darkerGrey],
            [p8c.orange, p8c.darkPeach],
            [p8c.yellow, p8c.lightYellow],
            [p8c.green, p8c.mediumGreen],
            [p8c.pink, p8c.mauve],
            [p8c.lightPeach, p8c.mediumGrey],
          ])
        );

        this.#currentScreen?.draw();
        if (Game.isPaused) {
          this.#pauseMenu?.draw();
        }

        if (b.debug) {
          const fps = b.renderingFps.toFixed(0);
          b.drawText(fps, v_0_0_, p8c.mauve);
          const audioState = b.getAudioContext().state;
          const audioStateText =
            audioState === "suspended"
              ? "s"
              : audioState === "running"
              ? "r"
              : audioState === "closed"
              ? "c"
              : "@";
          b.drawText(
            audioStateText,
            v_(g.canvasSize.x - b.measureText(audioStateText).wh.x, 0),
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
    b.startPlaybackSequence({
      intro: [
        [{ url: g.assets.musicBg1, durationMs }],
        [{ url: g.assets.musicBg1, durationMs }],
        [{ url: g.assets.musicBg2, durationMs }],
        [{ url: g.assets.musicBg2, durationMs }],
      ],
      loop: [
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
