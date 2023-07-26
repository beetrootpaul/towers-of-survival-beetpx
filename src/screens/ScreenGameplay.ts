import { Screen } from "./Screen";

export class ScreenGameplay implements Screen {
  // TODO: migrate from Lua
  //     local game_state = params.game_state
  //     local warzone = params.warzone
  //
  //     local enemies = new_enemies {
  //         path = warzone.path(),
  //         on_enemy_reached_path_end = function()
  //             audio.sfx(a.sfx.live_lost)
  //             game_state.lives.take_one()
  //         end,
  //     }
  //     local fight = new_fight()
  //     local towers = new_towers {
  //         enemies = enemies,
  //         fight = fight,
  //         warzone = warzone,
  //     }
  //     local waves = new_waves {
  //         enemies = enemies,
  //     }
  //     local placement
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
  //     local gui = new_gui {
  //         waves = waves,
  //         game_state = game_state,
  //         button_x = button_x,
  //         button_o = button_o,
  //     }

  constructor() {
    // TODO: REMOVE
    console.log(ScreenGameplay.name);
  }

  update(): Screen {
    let nextScreen: Screen = this;

    // TODO: migrate from Lua
    //           if game_state.has_lost_all_lives() then
    //             next_screen = new_screen_over {
    //                 waves_survived = waves.wave_number() - 1
    //             }
    //         elseif waves.have_spawn_all_enemies() and enemies.are_none_left() then
    //             next_screen = new_screen_win()
    //         end
    //
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
    //         game_state.update()
    //         fight.update()
    //         waves.update()
    //         enemies.update()
    //         towers.update()

    return nextScreen;
  }

  draw(): void {
    // TODO: migrate from Lua
    //         warzone.draw()
    //         towers.draw()
    //         enemies.draw()
    //         fight.draw()
    //         if placement then
    //             placement.draw()
    //         end
    //         gui.draw()
  }
}
