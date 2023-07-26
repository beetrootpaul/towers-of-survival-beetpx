import { BeetPx } from "beetpx";
import { GameState } from "./game_states/GameState";
import { GameStateSplash } from "./game_states/GameStateSplash";
import { g, p8c } from "./globals";

export class Game {
  #gameState: GameState | undefined;

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
      this.#gameState = new GameStateSplash();

      BeetPx.setOnUpdate(() => {
        this.#gameState = this.#gameState?.update();
      });

      BeetPx.setOnDraw(() => {
        BeetPx.clearCanvas(p8c.blue);
        this.#gameState?.draw();

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
