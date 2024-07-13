import { b_, BpxSpriteColorMapping, v_ } from "@beetpx/beetpx";
import { g, p8c } from "./globals";
import { PauseMenu } from "./gui/PauseMenu";
import { Screen } from "./screens/Screen";
import { ScreenTitle } from "./screens/ScreenTitle";
import { TinyFont } from "./TinyFont";

export class Game {
  static isPaused: boolean = false;

  #pauseMenu: PauseMenu | undefined;

  #currentScreen: Screen | undefined;
  #nextScreen: Screen | undefined;

  start(): void {
    b_.init({
      canvasSize: "64x64",
      fixedTimestep: "30fps",
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
      debugMode: {
        available: !window.BEETPX__IS_PROD,
        fpsDisplay: {
          enabled: true,
          placement: "top-left",
          color: p8c.mauve,
        },
      },
      frameByFrame: {
        available: !window.BEETPX__IS_PROD,
      },
    }).then(async ({ startGame }) => {
      b_.setOnStarted(() => {
        b_.useFont(new TinyFont());

        b_.setButtonRepeating("left", {
          firstRepeatFrames: 8,
          loopedRepeatFrames: 4,
        });
        b_.setButtonRepeating("right", {
          firstRepeatFrames: 8,
          loopedRepeatFrames: 4,
        });
        b_.setButtonRepeating("up", {
          firstRepeatFrames: 8,
          loopedRepeatFrames: 4,
        });
        b_.setButtonRepeating("down", {
          firstRepeatFrames: 8,
          loopedRepeatFrames: 4,
        });

        Game.isPaused = false;
        this.#pauseMenu = new PauseMenu();

        this.#nextScreen = new ScreenTitle();
        this.#currentScreen = this.#nextScreen;

        this.#startMusic();
      });

      b_.setOnUpdate(() => {
        if (b_.wasButtonJustPressed("menu")) {
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

      b_.setOnDraw(() => {
        b_.clearCanvas(p8c.brownishBlack);

        b_.setSpriteColorMapping(
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
          ]),
        );

        this.#currentScreen?.draw();
        if (Game.isPaused) {
          this.#pauseMenu?.draw();
        }

        if (b_.debug) {
          const audioState = b_.getAudioContext().state;
          const audioStateText =
            audioState === "suspended" ? "s"
            : audioState === "running" ? "r"
            : audioState === "closed" ? "c"
            : "@";
          b_.drawText(
            audioStateText,
            v_(g.canvasSize.x - b_.measureText(audioStateText).wh.x, 0),
            p8c.mauve,
          );
        }
      });

      await startGame();
    });
  }

  #startMusic(): void {
    // SFXs exported from PICO-8 have full length of 32 notes, even though in the game they are defined as 24 notes
    const durationMs = (fullSoundDurationMs: number) =>
      (fullSoundDurationMs * 24) / 32;
    b_.startPlaybackSequence({
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
