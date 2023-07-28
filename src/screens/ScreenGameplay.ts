import { Screen } from "./Screen";
import { Warzone } from "../warzone/Warzone";
import { GameState } from "../game_state/GameState";
import { Enemies } from "../enemies/Enemies";
import { Fight } from "../fight/Fight";
import { Towers } from "../towers/Towers";
import { Waves } from "../waves/Waves";
import { Placement } from "../placement/Placement";
import { Button } from "../gui/Button";
import { Gui } from "../gui/Gui";
import { ScreenOver } from "./ScreenOver";
import { ScreenWin } from "./ScreenWin";
import { BeetPx } from "beetpx";

export class ScreenGameplay implements Screen {
  private readonly gameState: GameState;
  private readonly warzone: Warzone;

  private readonly enemies: Enemies;
  private readonly fight: Fight;
  private readonly towers: Towers;
  private readonly waves: Waves;
  private readonly placement: Placement | null;
  private readonly buttonO: Button;
  private readonly buttonX: Button;
  private readonly gui: Gui;

  constructor(params: { gameState: GameState; warzone: Warzone }) {
    this.gameState = params.gameState;
    this.warzone = params.warzone;

    this.enemies = new Enemies({
      path: this.warzone.path(),
      onEnemyReachedPathEnd: () => {
        // TODO: migrate from Lua
        //             audio.sfx(a.sfx.live_lost)
        this.gameState.lives.takeOne();
      },
    });
    this.fight = new Fight();
    // TODO: migrate from Lua
    this.towers = new Towers();
    //     local towers = new_towers {
    //         enemies = enemies,
    //         fight = fight,
    //         warzone = warzone,
    //     }
    this.waves = new Waves({
      enemies: this.enemies,
    });
    this.placement = null;
    this.buttonO = new Button({
      // TODO: migrate from Lua
      //         on_release = function(self)
      onRelease: () => {
        if (this.gameState.buildingState === "idle") {
          // TODO: migrate from Lua
          //                 extcmd("pause")
        } else if (this.gameState.buildingState === "tower-choice") {
          this.gameState.buildingState = "idle";
        } else if (this.gameState.buildingState === "tower-placement") {
          this.gameState.buildingState = "tower-choice";
          // TODO: migrate from Lua
          //                 placement = nil
        }
      },
    });
    this.buttonX = new Button({
      // TODO: migrate from Lua
      //         on_release = function(self)
      onRelease: () => {
        // TODO: migrate from Lua
        //             audio.sfx(a.sfx.button_press)

        if (this.gameState.buildingState === "idle") {
          this.gameState.buildingState = "tower-choice";
        }
        // TODO: migrate from Lua
        //             elseif game_state.building_state == "tower-choice" then
        //                 game_state.building_state = "tower-placement"
        //                 placement = new_placement {
        //                     tower_choice = game_state.tower_choice,
        //                     warzone = warzone,
        //                     other_towers = towers,
        //                     money = game_state.money,
        //                 }
        //                 self.set_enabled(placement.can_build())
        //             elseif game_state.building_state == "tower-placement" then
        //                 if placement.can_build() then
        //                     audio.sfx(a.sfx.tower_placed)
        //                     local tower = game_state.tower_choice.chosen_tower()
        //                     game_state.money.subtract(tower.cost)
        //                     towers.build_tower {
        //                         tile = placement.chosen_tile(),
        //                         tower_descriptor = tower,
        //                     }
        //                     game_state.building_state = "idle"
        //                     placement = nil
        //                 else
        //                     audio.sfx(a.sfx.cannot_place)
        //                 end
        //             end
      },
    });
    this.gui = new Gui({
      gameState: this.gameState,
      waves: this.waves,
      buttonX: this.buttonX,
      buttonO: this.buttonO,
    });
  }

  update(): Screen {
    let nextScreen: Screen = this;

    if (this.gameState.hasLostAllLives()) {
      nextScreen = new ScreenOver({
        wavesSurvived: this.waves.waveNumber - 1,
      });
    } else if (this.waves.haveSpawnAllEnemies() && this.enemies.areNoneLeft()) {
      nextScreen = new ScreenWin();
    }

    // TODO: migrate from Lua
    //         enemies.pre_update()

    // TODO: make it: BeetPx.detectedContinuousInputEvent("button_x")
    // TODO: separate events available to pass as param for the continuous ones and for the fire once ones
    if (BeetPx.continuousInputEvents.has("button_x")) {
      this.buttonX.setPressed(true);
    } else if (BeetPx.continuousInputEvents.has("button_o")) {
      this.buttonO.setPressed(true);
    } else {
      this.buttonX.setPressed(false);
      this.buttonO.setPressed(false);
      // TODO: migrate from Lua
      //             for arrow_button, direction in pairs(u.arrow_buttons_to_directions) do
      //                 if btnp(arrow_button) then
      //                     if placement then
      //                         placement.move_chosen_tile(direction)
      //                         button_x.set_enabled(placement.can_build())
      //                     elseif game_state.building_state == "tower-choice" then
      //                         if direction.x > 0 then
      //                             audio.sfx(a.sfx.button_press)
      //                             game_state.tower_choice.choose_next_tower()
      //                         elseif direction.x < 0 then
      //                             audio.sfx(a.sfx.button_press)
      //                             game_state.tower_choice.choose_prev_tower()
      //                         end
      //                     else
      //                         button_x.set_enabled(true)
      //                     end
      //                 end
      //             end
    }

    // TODO: migrate from Lua
    //         if placement then
    //             button_x.set_enabled(placement.can_build())
    //         end

    this.buttonX.update();
    this.buttonO.update();
    this.gameState.update();
    // TODO: migrate from Lua
    //         fight.update()
    this.waves.update();
    this.enemies.update();
    // TODO: migrate from Lua
    //         towers.update()

    return nextScreen;
  }

  draw(): void {
    this.warzone.draw();
    // TODO: migrate from Lua
    //         towers.draw()
    this.enemies.draw();
    // TODO: migrate from Lua
    //         fight.draw()
    //         if placement then
    //             placement.draw()
    //         end
    this.gui.draw();
  }
}
