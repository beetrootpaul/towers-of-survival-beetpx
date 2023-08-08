import { BeetPx, BpxVector2d, v_ } from "beetpx";
import { Enemies } from "../enemies/Enemies";
import { Fight } from "../fight/Fight";
import { GameState } from "../game_state/GameState";
import { g, u } from "../globals";
import { Button } from "../gui/Button";
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

  readonly #buttonO: Button;
  readonly #buttonX: Button;

  readonly #buttonLeft: Button;
  readonly #buttonRight: Button;
  readonly #buttonUp: Button;
  readonly #buttonDown: Button;

  readonly #gui: Gui;

  static readonly #arrowButtonsToDirections: Record<string, BpxVector2d> = {
    left: v_(-1, 0),
    right: v_(1, 0),
    up: v_(0, -1),
    down: v_(0, 1),
  };

  constructor(params: { gameState: GameState; warzone: Warzone }) {
    this.#gameState = params.gameState;
    this.#warzone = params.warzone;

    this.#enemies = new Enemies({
      path: this.#warzone.path(),
      onEnemyReachedPathEnd: () => {
        BeetPx.playSoundOnce(g.assets.sfxLiveLost);
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

    this.#buttonO = new Button({
      onRelease: () => {
        if (this.#gameState.buildingState === "idle") {
          // TODO: PAUSE MENU
          //                 extcmd("pause")
        } else if (this.#gameState.buildingState === "tower-choice") {
          this.#gameState.buildingState = "idle";
        } else if (this.#gameState.buildingState === "tower-placement") {
          this.#gameState.buildingState = "tower-choice";
          this.#placement = null;
        }
      },
    });
    this.#buttonX = new Button({
      onRelease: (self) => {
        BeetPx.playSoundOnce(g.assets.sfxButtonPress);

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
          self.setEnabled(this.#placement.canBuild());
        } else if (this.#gameState.buildingState === "tower-placement") {
          if (this.#placement?.canBuild()) {
            BeetPx.playSoundOnce(g.assets.sfxTowerPlaced);
            this.#gameState.money.subtract(
              this.#gameState.towerChoice.chosenTower.cost
            );
            this.#towers.buildTower({
              tile: this.#placement.chosenTile,
              towerDescriptor: this.#gameState.towerChoice.chosenTower,
            });
            this.#gameState.buildingState = "idle";
            this.#placement = null;
          } else {
            BeetPx.playSoundOnce(g.assets.sfxCannotPlace);
          }
        }
      },
    });

    this.#buttonLeft = new Button({
      onPress: () => {
        this.#applyArrowButtonInput("left");
      },
    });
    this.#buttonRight = new Button({
      onPress: () => {
        this.#applyArrowButtonInput("right");
      },
    });
    this.#buttonUp = new Button({
      onPress: () => {
        this.#applyArrowButtonInput("up");
      },
    });
    this.#buttonDown = new Button({
      onPress: () => {
        this.#applyArrowButtonInput("down");
      },
    });

    this.#gui = new Gui({
      gameState: this.#gameState,
      waves: this.#waves,
      buttonX: this.#buttonX,
      buttonO: this.#buttonO,
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

    // TODO: separate events available to pass as param for the continuous ones and for the fire once ones
    this.#buttonX.setPressed(BeetPx.continuousInputEvents.has("button_x"));
    this.#buttonO.setPressed(BeetPx.continuousInputEvents.has("button_o"));

    // TODO: rename these events to `direction_*`
    this.#buttonLeft.setPressed(BeetPx.continuousInputEvents.has("left"));
    this.#buttonUp.setPressed(BeetPx.continuousInputEvents.has("up"));
    this.#buttonRight.setPressed(BeetPx.continuousInputEvents.has("right"));
    this.#buttonDown.setPressed(BeetPx.continuousInputEvents.has("down"));

    if (this.#placement) {
      this.#buttonX.setEnabled(this.#placement.canBuild());
    }

    this.#buttonX.update();
    this.#buttonO.update();

    this.#buttonLeft.update();
    this.#buttonRight.update();
    this.#buttonUp.update();
    this.#buttonDown.update();

    this.#gameState.update();
    this.#fight.update();
    this.#waves.update();
    this.#enemies.update();
    this.#towers.update();

    return nextScreen;
  }

  #applyArrowButtonInput(arrowButton: "left" | "right" | "up" | "down"): void {
    const direction: BpxVector2d =
      ScreenGameplay.#arrowButtonsToDirections[arrowButton] ??
      u.throwError(
        `There is no direction defined for arrow button "${arrowButton}"`
      );
    if (this.#placement) {
      this.#placement.moveChosenTile(direction);
      this.#buttonX.setEnabled(this.#placement.canBuild());
    } else if (this.#gameState.buildingState === "tower-choice") {
      if (direction.x > 0) {
        BeetPx.playSoundOnce(g.assets.sfxButtonPress);
        this.#gameState.towerChoice.chooseNextTower();
      } else if (direction.x < 0) {
        BeetPx.playSoundOnce(g.assets.sfxButtonPress);
        this.#gameState.towerChoice.choosePrevTower();
      }
    } else {
      this.#buttonX.setEnabled(true);
    }
  }

  draw(): void {
    this.#warzone.draw();
    this.#towers.draw();
    this.#enemies.draw();
    this.#fight.draw();
    this.#placement?.draw();
    this.#gui.draw();
  }
}