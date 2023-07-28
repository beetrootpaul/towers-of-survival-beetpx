import { Waves } from "../waves/Waves";
import { WaveStatus } from "./WaveStatus";
import { GameState } from "../game_state/GameState";
import { BeetPx, v_ } from "beetpx";
import { g, p8c, u } from "../globals";
import { Button } from "./Button";
import { TowerInfo } from "./TowerInfo";
import { TowerChoiceGui } from "./TowerChoiceGui";

export class Gui {
  readonly #gameState: GameState;
  readonly #buttonX: Button;
  readonly #buttonO: Button;
  readonly #towerInfo: TowerInfo;
  readonly #waveStatus: WaveStatus;
  readonly #towerChoiceGui: TowerChoiceGui;

  constructor(params: {
    gameState: GameState;
    waves: Waves;
    buttonX: Button;
    buttonO: Button;
  }) {
    this.#gameState = params.gameState;
    this.#buttonX = params.buttonX;
    this.#buttonO = params.buttonO;

    this.#towerInfo = new TowerInfo({
      towerChoice: this.#gameState.towerChoice,
    });

    this.#waveStatus = new WaveStatus({
      waves: params.waves,
    });

    this.#towerChoiceGui = new TowerChoiceGui({
      towerChoice: this.#gameState.towerChoice,
    });
  }

  draw(): void {
    const isOPressed = this.#buttonO.isPressed;
    const isXPressed = this.#buttonX.isPressed;
    // TODO: migrate from Lua
    //     local is_x_enabled = button_x.is_enabled()
    //     local has_enough_money = game_state.money.available >= game_state.tower_choice.chosen_tower().cost

    if (this.#gameState.buildingState === "idle") {
      this.#waveStatus.draw();

      const menuText = "menu";
      BeetPx.print(
        menuText,
        v_(g.warzoneBorder, g.canvasSize.y - g.warzoneBorder + 2),
        isOPressed ? p8c.greyLight : p8c.brownPurple
      );
      // TODO: migrate from Lua
      //         local menu_button = new_button_glyph(
      //             is_o_pressed
      //                 and a.button_sprites.o.pressed
      //                 or a.button_sprites.o.raised
      //         )
      //         menu_button.draw(
      //             1,
      //             u.vs - a.wb + 1,
      //             is_o_pressed
      //                 and a.colors.grey_light
      //                 or a.colors.brown_purple,
      //             a.colors.brown_mid
      //         )

      const buildText = "build";
      BeetPx.print(
        buildText,
        v_(
          g.canvasSize.x - g.warzoneBorder - u.measureTextSize(buildText).x,
          g.canvasSize.y - g.warzoneBorder + 2
        ),
        isXPressed ? p8c.greyLight : p8c.brownPurple
      );
      // TODO: migrate from Lua
      //         local build_button = new_button_glyph(
      //             is_x_pressed
      //                 and a.button_sprites.x.pressed
      //                 or a.button_sprites.x.raised
      //         )
      //         build_button.draw(
      //             u.vs - a.wb + 2,
      //             u.vs - a.wb + 1,
      //             is_x_pressed
      //                 and a.colors.grey_light
      //                 or a.colors.brown_purple,
      //             a.colors.brown_mid
      //         )
    } else if (this.#gameState.buildingState === "tower-choice") {
      this.#towerInfo.draw();

      const moneyText = this.#gameState.money.available.toFixed(0);
      const moneyTextSize = u.measureTextSize(moneyText);
      BeetPx.print(
        moneyText,
        v_(g.canvasSize.x - g.warzoneBorder - moneyTextSize.x, 2),
        p8c.greyLight
      );
      const dollarText = "$";
      BeetPx.print(
        dollarText,
        v_(g.canvasSize.x - g.warzoneBorder + 2, 2),
        p8c.greyViolet
      );

      const backText = "<";
      BeetPx.print(
        backText,
        v_(g.warzoneBorder, g.canvasSize.y - g.warzoneBorder + 2),
        isOPressed ? p8c.greyLight : p8c.brownPurple
      );
      // TODO: migrate from Lua
      //         local back_button = new_button_glyph(
      //             is_o_pressed
      //                 and a.button_sprites.o.pressed
      //                 or a.button_sprites.o.raised
      //         )
      //         back_button.draw(
      //             1,
      //             u.vs - a.wb + 1,
      //             is_o_pressed
      //                 and a.colors.grey_light
      //                 or a.colors.brown_purple,
      //             a.colors.brown_mid
      //         )

      this.#towerChoiceGui.draw();

      // TODO: migrate from Lua
      //         local choose_button = new_button_glyph(
      //             is_x_pressed
      //                 and a.button_sprites.x.pressed
      //                 or a.button_sprites.x.raised
      //         )
      //         choose_button.draw(
      //             u.vs - a.wb + 2,
      //             u.vs - a.wb + 1,
      //             is_x_enabled
      //                 and (is_x_pressed and a.colors.grey_light or a.colors.grey_violet)
      //                 or a.colors.brown_mid,
      //             a.colors.brown_mid
      //         )
    } else if (this.#gameState.buildingState === "tower-placement") {
      this.#towerInfo.draw();

      // TODO: migrate from Lua
      //         local money_text = new_text(tostr(game_state.money.available))
      //         money_text.draw(
      //             u.vs - a.wb - money_text.w,
      //             2,
      //             a.colors.grey_light
      //         )
      //         local dollar_text = new_text("$")
      //         dollar_text.draw(
      //             u.vs - a.wb + 2,
      //             2,
      //             a.colors.grey_violet
      //         )
      //
      //         local back_text = new_text("<")
      //         back_text.draw(
      //             a.wb,
      //             u.vs - a.wb + 2,
      //             is_o_pressed
      //                 and a.colors.grey_light
      //                 or a.colors.brown_purple
      //         )
      //         local back_button = new_button_glyph(
      //             is_o_pressed
      //                 and a.button_sprites.o.pressed
      //                 or a.button_sprites.o.raised
      //         )
      //         back_button.draw(
      //             1,
      //             u.vs - a.wb + 1,
      //             is_o_pressed
      //                 and a.colors.grey_light
      //                 or a.colors.brown_purple,
      //             a.colors.brown_mid
      //         )
      //
      //         local place_text = new_text("place")
      //         place_text.draw(
      //             u.vs - a.wb - place_text.w,
      //             u.vs - a.wb + 2,
      //             is_x_enabled
      //                 and (is_x_pressed and a.colors.grey_light or a.colors.grey_violet)
      //                 or a.colors.brown_mid
      //         )
      //         local place_button = new_button_glyph(
      //             is_x_pressed
      //                 and a.button_sprites.x.pressed
      //                 or a.button_sprites.x.raised
      //         )
      //         place_button.draw(
      //             u.vs - a.wb + 2,
      //             u.vs - a.wb + 1,
      //             is_x_enabled
      //                 and (is_x_pressed and a.colors.grey_light or a.colors.grey_violet)
      //                 or a.colors.brown_mid,
      //             a.colors.brown_mid
      //         )
      //
      //         dollar_text.draw(
      //             u.vs - a.wb - place_text.w - 3 - dollar_text.w,
      //             u.vs - a.wb + 2,
      //             is_x_enabled
      //                 and a.colors.grey_violet
      //                 or a.colors.brown_mid
      //         )
      //
      //         local cost_text = new_text("-" .. game_state.tower_choice.chosen_tower().cost)
      //         cost_text.draw(
      //             u.vs - a.wb - place_text.w - 3 - dollar_text.w - 2 - cost_text.w,
      //             u.vs - a.wb + 2,
      //             has_enough_money
      //                 and (is_x_enabled and a.colors.grey_light or a.colors.brown_mid)
      //                 or a.colors.red_dark
      //         )
      //     end
    }
  }
}
