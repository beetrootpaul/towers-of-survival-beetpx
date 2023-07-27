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
    // TODO: migrate from Lua
    this.buttonO = new Button();
    //     local button_o = new_button {
    //         on_release = function(self)
    //             if game_state.building_state == "idle" then
    //                 extcmd("pause")
    //             elseif game_state.building_state == "tower-choice" then
    //                 game_state.building_state = "idle"
    //             elseif game_state.building_state == "tower-placement" then
    //                 game_state.building_state = "tower-choice"
    //                 placement = nil
    //             end
    //         end
    //     }
    // TODO: migrate from Lua
    this.buttonX = new Button();
    //     local button_x = new_button {
    //         on_release = function(self)
    //             audio.sfx(a.sfx.button_press)
    //             if game_state.building_state == "idle" then
    //                 game_state.building_state = "tower-choice"
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
    //         end
    //     }
    this.gui = new Gui({
      gameState: this.gameState,
      waves: this.waves,
      // TODO: migrate from Lua
      //         button_x = button_x,
      //         button_o = button_o,
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
    //
    //         if btn(u.button_x) then
    //             button_x.set_pressed(true)
    //         elseif btn(u.button_o) then
    //             button_o.set_pressed(true)
    //
    //         else
    //             button_o.set_pressed(false)
    //             button_x.set_pressed(false)
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
    //         end
    //
    //         if placement then
    //             button_x.set_enabled(placement.can_build())
    //         end
    //
    //         button_o.update()
    //         button_x.update()
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
