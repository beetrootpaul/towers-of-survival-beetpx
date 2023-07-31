import { BeetPx, BpxGameInputEvent, BpxVector2d, v_ } from "beetpx";
import { Enemies } from "../enemies/Enemies";
import { Fight } from "../fight/Fight";
import { GameState } from "../game_state/GameState";
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
  readonly #gui: Gui;

  readonly #arrowButtonsToDirections: Record<string, BpxVector2d> = {
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
        // TODO: migrate from Lua
        //             audio.sfx(a.sfx.live_lost)
        this.#gameState.lives.takeOne();
      },
    });
    this.#fight = new Fight();
    this.#towers = new Towers({
      // TODO: migrate from Lua
      warzone: this.#warzone,
      //         enemies = enemies,
      //         fight = fight,
    });
    this.#waves = new Waves({
      enemies: this.#enemies,
    });
    this.#placement = null;
    this.#buttonO = new Button({
      // TODO: migrate from Lua
      //         on_release = function(self)
      onRelease: () => {
        if (this.#gameState.buildingState === "idle") {
          // TODO: migrate from Lua
          //                 extcmd("pause")
        } else if (this.#gameState.buildingState === "tower-choice") {
          this.#gameState.buildingState = "idle";
        } else if (this.#gameState.buildingState === "tower-placement") {
          this.#gameState.buildingState = "tower-choice";
          // TODO: migrate from Lua
          //                 placement = nil
        }
      },
    });
    this.#buttonX = new Button({
      // TODO: migrate from Lua
      //         on_release = function(self)
      onRelease: () => {
        // TODO: migrate from Lua
        //             audio.sfx(a.sfx.button_press)

        if (this.#gameState.buildingState === "idle") {
          this.#gameState.buildingState = "tower-choice";
        } else if (this.#gameState.buildingState === "tower-choice") {
          this.#gameState.buildingState = "tower-placement";
          this.#placement = new Placement({
            towerChoice: this.#gameState.towerChoice,
            warzone: this.#warzone,
            // TODO: migrate from Lua
            //                     other_towers = towers,
            money: this.#gameState.money,
          });
          // TODO: migrate from Lua
          //                 self.set_enabled(placement.can_build())
        } else if (this.#gameState.buildingState === "tower-placement") {
          if (this.#placement?.canBuild()) {
            // TODO: migrate from Lua
            //                     audio.sfx(a.sfx.tower_placed)
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
            // TODO: migrate from Lua
            //                     audio.sfx(a.sfx.cannot_place)
          }
        }
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

    // TODO: migrate from Lua
    //         enemies.pre_update()

    // TODO: make it: BeetPx.detectedContinuousInputEvent("button_x")
    // TODO: separate events available to pass as param for the continuous ones and for the fire once ones
    if (BeetPx.continuousInputEvents.has("button_x")) {
      this.#buttonX.setPressed(true);
    } else if (BeetPx.continuousInputEvents.has("button_o")) {
      this.#buttonO.setPressed(true);
    } else {
      this.#buttonX.setPressed(false);
      this.#buttonO.setPressed(false);
      Object.entries(this.#arrowButtonsToDirections).forEach(
        ([arrowButton, direction]) => {
          if (
            // TODO: REWORK inputs, because right now there is no easy way to move selection one by one
            BeetPx.continuousInputEvents.has(arrowButton as BpxGameInputEvent)
          ) {
            if (this.#placement) {
              this.#placement.moveChosenTile(direction);
              // TODO: migrate from Lua
              //                         button_x.set_enabled(placement.can_build())
            } else if (this.#gameState.buildingState === "tower-choice") {
              if (direction.x > 0) {
                // TODO: migrate from Lua
                //                             audio.sfx(a.sfx.button_press)
                this.#gameState.towerChoice.chooseNextTower();
              } else if (direction.x < 0) {
                // TODO: migrate from Lua
                //                             audio.sfx(a.sfx.button_press)
                this.#gameState.towerChoice.choosePrevTower();
              }
            } else {
              // TODO: migrate from Lua
              //                         button_x.set_enabled(true)
            }
          }
        }
      );
    }

    // TODO: migrate from Lua
    //         if placement then
    //             button_x.set_enabled(placement.can_build())
    //         end

    this.#buttonX.update();
    this.#buttonO.update();
    this.#gameState.update();
    this.#fight.update();
    this.#waves.update();
    this.#enemies.update();
    this.#towers.update();

    return nextScreen;
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
