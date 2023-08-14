import { BeetPx, v_ } from "@beetpx/beetpx";
import { GameState } from "../game_state/GameState";
import { g, p8c, u } from "../globals";
import { Waves } from "../waves/Waves";
import { ButtonGlyph } from "./ButtonGlyph";
import { TowerChoiceGui } from "./TowerChoiceGui";
import { TowerInfo } from "./TowerInfo";
import { WaveStatus } from "./WaveStatus";

export class Gui {
  readonly #gameState: GameState;
  readonly #towerInfo: TowerInfo;
  readonly #waveStatus: WaveStatus;
  readonly #towerChoiceGui: TowerChoiceGui;

  #isXPressed: boolean;
  #isOPressed: boolean;

  constructor(params: { gameState: GameState; waves: Waves }) {
    this.#gameState = params.gameState;

    this.#towerInfo = new TowerInfo({
      towerChoice: this.#gameState.towerChoice,
    });

    this.#waveStatus = new WaveStatus({
      waves: params.waves,
    });

    this.#towerChoiceGui = new TowerChoiceGui({
      towerChoice: this.#gameState.towerChoice,
    });

    this.#isXPressed = BeetPx.isPressed("x");
    this.#isOPressed = BeetPx.isPressed("o");
  }

  update(): void {
    // We check it here and not in `draw` in order to avoid buttons changing their
    //   state during pause menu, when `draw` is called but `update` is not.
    this.#isXPressed = BeetPx.isPressed("x");
    this.#isOPressed = BeetPx.isPressed("o");
  }

  draw(params: { isButtonXEnabled: boolean }): void {
    if (this.#gameState.buildingState === "idle") {
      this.#waveStatus.draw();

      const menuText = "menu";
      BeetPx.print(
        menuText,
        v_(g.warzoneBorder, g.canvasSize.y - g.warzoneBorder + 2),
        this.#isOPressed ? p8c.lightGrey : p8c.mauve
      );

      const menuButton = new ButtonGlyph(
        this.#isOPressed ? g.buttonSprites.o.pressed : g.buttonSprites.o.raised
      );
      menuButton.draw(
        v_(1, g.canvasSize.y - g.warzoneBorder + 1),
        this.#isOPressed ? p8c.lightGrey : p8c.mauve,
        p8c.darkerGrey
      );

      const buildText = "build";
      BeetPx.print(
        buildText,
        v_(
          g.canvasSize.x - g.warzoneBorder - u.measureTextSize(buildText).x,
          g.canvasSize.y - g.warzoneBorder + 2
        ),
        this.#isXPressed ? p8c.lightGrey : p8c.mauve
      );

      const buildButton = new ButtonGlyph(
        this.#isXPressed ? g.buttonSprites.x.pressed : g.buttonSprites.x.raised
      );
      buildButton.draw(
        g.canvasSize.add(-g.warzoneBorder + 2, -g.warzoneBorder + 1),
        this.#isXPressed ? p8c.lightGrey : p8c.mauve,
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
        this.#isOPressed ? p8c.lightGrey : p8c.mauve
      );

      const backButton = new ButtonGlyph(
        this.#isOPressed ? g.buttonSprites.o.pressed : g.buttonSprites.o.raised
      );
      backButton.draw(
        v_(1, g.canvasSize.y - g.warzoneBorder + 1),
        this.#isOPressed ? p8c.lightGrey : p8c.mauve,
        p8c.darkerGrey
      );

      this.#towerChoiceGui.draw();

      const chooseButton = new ButtonGlyph(
        this.#isXPressed ? g.buttonSprites.x.pressed : g.buttonSprites.x.raised
      );
      chooseButton.draw(
        g.canvasSize.add(-g.warzoneBorder + 2, -g.warzoneBorder + 1),
        params.isButtonXEnabled
          ? this.#isXPressed
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
        this.#isOPressed ? p8c.lightGrey : p8c.mauve
      );

      const backButton = new ButtonGlyph(
        this.#isOPressed ? g.buttonSprites.o.pressed : g.buttonSprites.o.raised
      );
      backButton.draw(
        v_(1, g.canvasSize.y - g.warzoneBorder + 1),
        this.#isOPressed ? p8c.lightGrey : p8c.mauve,
        p8c.darkerGrey
      );

      const placeText = "place";
      BeetPx.print(
        placeText,
        v_(
          g.canvasSize.x - g.warzoneBorder - u.measureTextSize(placeText).x,
          g.canvasSize.y - g.warzoneBorder + 2
        ),
        params.isButtonXEnabled
          ? this.#isXPressed
            ? p8c.lightGrey
            : p8c.lavender
          : p8c.darkerGrey
      );

      const placeButton = new ButtonGlyph(
        this.#isXPressed ? g.buttonSprites.x.pressed : g.buttonSprites.x.raised
      );
      placeButton.draw(
        g.canvasSize.add(-g.warzoneBorder + 2, -g.warzoneBorder + 1),
        params.isButtonXEnabled
          ? this.#isXPressed
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
        params.isButtonXEnabled ? p8c.lavender : p8c.darkerGrey
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
          ? params.isButtonXEnabled
            ? p8c.lightGrey
            : p8c.darkerGrey
          : p8c.darkRed
      );
    }
  }
}
