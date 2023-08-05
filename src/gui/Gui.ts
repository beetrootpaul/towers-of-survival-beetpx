import { BeetPx, v_ } from "beetpx";
import { GameState } from "../game_state/GameState";
import { g, p8c, u } from "../globals";
import { Waves } from "../waves/Waves";
import { Button } from "./Button";
import { TowerChoiceGui } from "./TowerChoiceGui";
import { TowerInfo } from "./TowerInfo";
import { WaveStatus } from "./WaveStatus";

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
    if (this.#gameState.buildingState === "idle") {
      this.#waveStatus.draw();

      const menuText = "menu";
      BeetPx.print(
        menuText,
        v_(g.warzoneBorder, g.canvasSize.y - g.warzoneBorder + 2),
        this.#buttonO.isPressed ? p8c.greyLight : p8c.brownPurple
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
        this.#buttonX.isPressed ? p8c.greyLight : p8c.brownPurple
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
        this.#buttonO.isPressed ? p8c.greyLight : p8c.brownPurple
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
        this.#buttonO.isPressed ? p8c.greyLight : p8c.brownPurple
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

      const placeText = "place";
      BeetPx.print(
        placeText,
        v_(
          g.canvasSize.x - g.warzoneBorder - u.measureTextSize(placeText).x,
          g.canvasSize.y - g.warzoneBorder + 2
        ),
        this.#buttonX.isEnabled
          ? this.#buttonX.isPressed
            ? p8c.greyLight
            : p8c.greyViolet
          : p8c.brownMid
      );
      // TODO: migrate from Lua
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
      BeetPx.print(
        dollarText,
        g.canvasSize
          .sub(g.warzoneBorder)
          .add(
            v_(
              -u.measureTextSize(placeText).x -
                3 -
                u.measureTextSize(dollarText).x,
              2
            )
          ),
        this.#buttonX.isEnabled ? p8c.greyViolet : p8c.brownMid
      );
      const costText = `-${this.#gameState.towerChoice.chosenTower.cost.toFixed(
        0
      )}`;
      BeetPx.print(
        costText,
        g.canvasSize
          .sub(g.warzoneBorder)
          .add(
            v_(
              -u.measureTextSize(placeText).x -
                3 -
                u.measureTextSize(dollarText).x -
                2 -
                u.measureTextSize(costText).x,
              2
            )
          ),
        this.#gameState.money.available >=
          this.#gameState.towerChoice.chosenTower.cost
          ? this.#buttonX.isEnabled
            ? p8c.greyLight
            : p8c.brownMid
          : p8c.redDark
      );
    }
  }
}
