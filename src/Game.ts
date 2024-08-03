import { $, $d, $v, BpxSpriteColorMapping } from "@beetpx/beetpx";
import { g, p8c } from "./globals";
import { PauseMenu } from "./gui/PauseMenu";
import { Screen } from "./screens/Screen";
import { ScreenTitle } from "./screens/ScreenTitle";
import { tinyFont } from "./tinyFont";

export class Game {
  #pauseMenu: PauseMenu | undefined;

  #currentScreen: Screen | undefined;
  #nextScreen: Screen | undefined;

  start(): void {
    $.setOnStarted(() => {
      $d.setFont(tinyFont);
      $d.setTextColorMarkers({
        c_r: p8c.red,
        c_dr: p8c.darkRed,
        c_ly: p8c.lightYellow,
        c_dp: p8c.darkPeach,
      });

      $.setButtonRepeating("left", {
        firstRepeatFrames: 8,
        loopedRepeatFrames: 4,
      });
      $.setButtonRepeating("right", {
        firstRepeatFrames: 8,
        loopedRepeatFrames: 4,
      });
      $.setButtonRepeating("up", {
        firstRepeatFrames: 8,
        loopedRepeatFrames: 4,
      });
      $.setButtonRepeating("down", {
        firstRepeatFrames: 8,
        loopedRepeatFrames: 4,
      });

      this.#pauseMenu = new PauseMenu();

      this.#nextScreen = new ScreenTitle();
      this.#currentScreen = this.#nextScreen;

      this.#startMusic();
    });

    $.setOnUpdate(() => {
      if ($.isPaused) {
        this.#pauseMenu?.update();
      } else {
        // We intentionally reassign screen on the next update iteration
        //   then the current one, because we still need to use the previous one
        //   for a drawing.
        this.#currentScreen = this.#nextScreen;
        this.#nextScreen = this.#currentScreen?.update();
      }
    });

    $.setOnDraw(() => {
      $d.clearCanvas(p8c.brownishBlack);

      $d.setSpriteColorMapping(
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
      if ($.isPaused) {
        this.#pauseMenu?.draw();
      }

      if ($.debug) {
        const audioState = $.getAudioContext().state;
        const audioStateText =
          audioState === "suspended" ? "s"
          : audioState === "running" ? "r"
          : audioState === "closed" ? "c"
          : "@";
        $d.text(
          audioStateText,
          $v(g.canvasSize.x - $d.measureText(audioStateText).wh.x, 0),
          p8c.mauve,
        );
      }
    });

    $.start({
      gameId: "towers-of-survival-beetpx",
      canvasSize: "64x64",
      fixedTimestep: "30fps",
      gamePause: {
        available: true,
      },
      screenshots: {
        available: true,
      },
      requireConfirmationOnTabClose: BEETPX__IS_PROD,
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
    });
  }

  #startMusic(): void {
    // SFXs exported from PICO-8 have full length of 32 notes, even though in the game they are defined as 24 notes
    const durationMs = (fullSoundDurationMs: number) =>
      (fullSoundDurationMs * 24) / 32;
    $.startPlaybackSequence(
      {
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
      },
      {
        onGamePause: "ignore",
      },
    );
  }
}
