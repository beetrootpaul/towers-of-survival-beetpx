import { BeetPx, v_ } from "@beetpx/beetpx";
import { GameState } from "../game_state/GameState";
import { g, p8c, u } from "../globals";
import { Waves } from "../waves/Waves";
import { Button } from "./Button";
import { ButtonGlyph } from "./ButtonGlyph";
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
        this.#buttonO.isPressed ? p8c.lightGrey : p8c.mauve
      );

      const menuButton = new ButtonGlyph(
        this.#buttonO.isPressed
          ? g.buttonSprites.o.pressed
          : g.buttonSprites.o.raised
      );
      menuButton.draw(
        v_(1, g.canvasSize.y - g.warzoneBorder + 1),
        this.#buttonO.isPressed ? p8c.lightGrey : p8c.mauve,
        p8c.darkerGrey
      );

      const buildText = "build";
      BeetPx.print(
        buildText,
        v_(
          g.canvasSize.x - g.warzoneBorder - u.measureTextSize(buildText).x,
          g.canvasSize.y - g.warzoneBorder + 2
        ),
        this.#buttonX.isPressed ? p8c.lightGrey : p8c.mauve
      );

      const buildButton = new ButtonGlyph(
        this.#buttonX.isPressed
          ? g.buttonSprites.x.pressed
          : g.buttonSprites.x.raised
      );
      buildButton.draw(
        g.canvasSize.add(-g.warzoneBorder + 2, -g.warzoneBorder + 1),
        this.#buttonX.isPressed ? p8c.lightGrey : p8c.mauve,
        p8c.darkerGrey
      );
    } else if (this.#gameState.buildingState === "tower-choice") {
      this.#towerInfo.draw();

      const moneyText = this.#gameState.money.available.toFixed(0);
      const moneyTextSize = u.measureTextSize(moneyText);
      BeetPx.print(
        moneyText,
        v_(g.canvasSize.x - g.warzoneBorder - moneyTextSize.x, 2),
        p8c.lightGrey
      );
      const dollarText = "$";
      BeetPx.print(
        dollarText,
        v_(g.canvasSize.x - g.warzoneBorder + 2, 2),
        p8c.lavender
      );

      const backText = "<";
      BeetPx.print(
        backText,
        v_(g.warzoneBorder, g.canvasSize.y - g.warzoneBorder + 2),
        this.#buttonO.isPressed ? p8c.lightGrey : p8c.mauve
      );

      const backButton = new ButtonGlyph(
        this.#buttonO.isPressed
          ? g.buttonSprites.o.pressed
          : g.buttonSprites.o.raised
      );
      backButton.draw(
        v_(1, g.canvasSize.y - g.warzoneBorder + 1),
        this.#buttonO.isPressed ? p8c.lightGrey : p8c.mauve,
        p8c.darkerGrey
      );

      this.#towerChoiceGui.draw();

      const chooseButton = new ButtonGlyph(
        this.#buttonX.isPressed
          ? g.buttonSprites.x.pressed
          : g.buttonSprites.x.raised
      );
      chooseButton.draw(
        g.canvasSize.add(-g.warzoneBorder + 2, -g.warzoneBorder + 1),
        this.#buttonX.isEnabled
          ? this.#buttonX.isPressed
            ? p8c.lightGrey
            : p8c.lavender
          : p8c.darkerGrey,
        p8c.darkerGrey
      );
    } else if (this.#gameState.buildingState === "tower-placement") {
      this.#towerInfo.draw();

      const moneyText = this.#gameState.money.available.toFixed(0);
      const moneyTextSize = u.measureTextSize(moneyText);
      BeetPx.print(
        moneyText,
        v_(g.canvasSize.x - g.warzoneBorder - moneyTextSize.x, 2),
        p8c.lightGrey
      );
      const dollarText = "$";
      BeetPx.print(
        dollarText,
        v_(g.canvasSize.x - g.warzoneBorder + 2, 2),
        p8c.lavender
      );

      const backText = "<";
      BeetPx.print(
        backText,
        v_(g.warzoneBorder, g.canvasSize.y - g.warzoneBorder + 2),
        this.#buttonO.isPressed ? p8c.lightGrey : p8c.mauve
      );

      const backButton = new ButtonGlyph(
        this.#buttonO.isPressed
          ? g.buttonSprites.o.pressed
          : g.buttonSprites.o.raised
      );
      backButton.draw(
        v_(1, g.canvasSize.y - g.warzoneBorder + 1),
        this.#buttonO.isPressed ? p8c.lightGrey : p8c.mauve,
        p8c.darkerGrey
      );

      const placeText = "place";
      BeetPx.print(
        placeText,
        v_(
          g.canvasSize.x - g.warzoneBorder - u.measureTextSize(placeText).x,
          g.canvasSize.y - g.warzoneBorder + 2
        ),
        this.#buttonX.isEnabled
          ? this.#buttonX.isPressed
            ? p8c.lightGrey
            : p8c.lavender
          : p8c.darkerGrey
      );

      const placeButton = new ButtonGlyph(
        this.#buttonX.isPressed
          ? g.buttonSprites.x.pressed
          : g.buttonSprites.x.raised
      );
      placeButton.draw(
        g.canvasSize.add(-g.warzoneBorder + 2, -g.warzoneBorder + 1),
        this.#buttonX.isEnabled
          ? this.#buttonX.isPressed
            ? p8c.lightGrey
            : p8c.lavender
          : p8c.darkerGrey,
        p8c.darkerGrey
      );

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
        this.#buttonX.isEnabled ? p8c.lavender : p8c.darkerGrey
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
            ? p8c.lightGrey
            : p8c.darkerGrey
          : p8c.darkRed
      );
    }
  }
}
