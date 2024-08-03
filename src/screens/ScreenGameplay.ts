import { $, $u, $v, BpxVector2d } from "@beetpx/beetpx";
import { Enemies } from "../enemies/Enemies";
import { Fight } from "../fight/Fight";
import { GameState } from "../game_state/GameState";
import { g } from "../globals";
import { Gui } from "../gui/Gui";
import { Placement } from "../placement/Placement";
import { Towers } from "../towers/Towers";
import { Warzone } from "../warzone/Warzone";
import { Waves } from "../waves/Waves";
import { Screen } from "./Screen";
import { ScreenOver } from "./ScreenOver";
import { ScreenWin } from "./ScreenWin";

export class ScreenGameplay implements Screen {
  readonly #gameState: GameState;
  readonly #warzone: Warzone;

  readonly #enemies: Enemies;
  readonly #fight: Fight;
  readonly #towers: Towers;
  readonly #waves: Waves;

  #placement: Placement | null;

  #isButtonXEnabled: boolean;

  readonly #gui: Gui;

  static readonly #arrowButtonsToDirections: Record<string, BpxVector2d> = {
    left: $v(-1, 0),
    right: $v(1, 0),
    up: $v(0, -1),
    down: $v(0, 1),
  };

  constructor(params: { gameState: GameState; warzone: Warzone }) {
    this.#gameState = params.gameState;
    this.#warzone = params.warzone;

    this.#enemies = new Enemies({
      path: this.#warzone.path(),
      onEnemyReachedPathEnd: () => {
        $.startPlayback(g.assets.sfxLiveLost);
        this.#gameState.lives.takeOne();
      },
    });
    this.#fight = new Fight();
    this.#towers = new Towers({
      warzone: this.#warzone,
      enemies: this.#enemies,
      fight: this.#fight,
    });
    this.#waves = new Waves({
      enemies: this.#enemies,
    });

    this.#placement = null;

    this.#isButtonXEnabled = true;

    this.#gui = new Gui({
      gameState: this.#gameState,
      waves: this.#waves,
    });
  }

  update(): Screen {
    let nextScreen: Screen = this;

    if (this.#gameState.hasLostAllLives()) {
      nextScreen = new ScreenOver({
        wavesSurvived: this.#waves.waveNumber - 1,
      });
    } else if (
      this.#waves.haveSpawnAllEnemies() &&
      this.#enemies.areNoneLeft()
    ) {
      nextScreen = new ScreenWin();
    }

    this.#enemies.preUpdate();

    if ($.wasButtonJustReleased("X")) {
      if (this.#gameState.buildingState === "idle") {
        $.pause();
      } else if (this.#gameState.buildingState === "tower-choice") {
        this.#gameState.buildingState = "idle";
      } else if (this.#gameState.buildingState === "tower-placement") {
        this.#gameState.buildingState = "tower-choice";
        this.#placement = null;
      }
    }
    if ($.wasButtonJustReleased("O")) {
      $.startPlayback(g.assets.sfxButtonPress);

      if (this.#gameState.buildingState === "idle") {
        this.#gameState.buildingState = "tower-choice";
      } else if (this.#gameState.buildingState === "tower-choice") {
        this.#gameState.buildingState = "tower-placement";
        this.#placement = new Placement({
          towerChoice: this.#gameState.towerChoice,
          warzone: this.#warzone,
          otherTowers: this.#towers,
          money: this.#gameState.money,
        });
        this.#isButtonXEnabled = this.#placement.canBuild();
      } else if (this.#gameState.buildingState === "tower-placement") {
        if (this.#placement?.canBuild()) {
          $.startPlayback(g.assets.sfxTowerPlaced);
          this.#gameState.money.subtract(
            this.#gameState.towerChoice.chosenTower.cost,
          );
          this.#towers.buildTower({
            tile: this.#placement.chosenTile,
            towerDescriptor: this.#gameState.towerChoice.chosenTower,
          });
          this.#gameState.buildingState = "idle";
          this.#placement = null;
        } else {
          $.startPlayback(g.assets.sfxCannotPlace);
        }
      }
    }

    if ($.wasButtonJustPressed("left")) {
      this.#applyArrowButtonInput("left");
    }
    if ($.wasButtonJustPressed("right")) {
      this.#applyArrowButtonInput("right");
    }
    if ($.wasButtonJustPressed("up")) {
      this.#applyArrowButtonInput("up");
    }
    if ($.wasButtonJustPressed("down")) {
      this.#applyArrowButtonInput("down");
    }

    if (this.#placement) {
      this.#isButtonXEnabled = this.#placement.canBuild();
    }

    this.#gameState.update();
    this.#fight.update();
    this.#waves.update();
    this.#enemies.update();
    this.#towers.update();

    this.#gui.update();

    return nextScreen;
  }

  #applyArrowButtonInput(arrowButton: "left" | "right" | "up" | "down"): void {
    const direction: BpxVector2d =
      ScreenGameplay.#arrowButtonsToDirections[arrowButton] ??
      $u.throwError(
        `There is no direction defined for arrow button "${arrowButton}"`,
      );
    if (this.#placement) {
      this.#placement.moveChosenTile(direction);
      this.#isButtonXEnabled = this.#placement.canBuild();
    } else if (this.#gameState.buildingState === "tower-choice") {
      if (direction.x > 0) {
        $.startPlayback(g.assets.sfxButtonPress);
        this.#gameState.towerChoice.chooseNextTower();
      } else if (direction.x < 0) {
        $.startPlayback(g.assets.sfxButtonPress);
        this.#gameState.towerChoice.choosePrevTower();
      }
    } else {
      this.#isButtonXEnabled = true;
    }
  }

  draw(): void {
    this.#warzone.draw();
    this.#towers.draw();
    this.#enemies.draw();
    this.#fight.draw();
    this.#placement?.draw();
    this.#gui.draw({ isButtonXEnabled: this.#isButtonXEnabled });
  }
}
