import { b_, v_ } from "@beetpx/beetpx";
import { GameState } from "../game_state/GameState";
import { g, p8c } from "../globals";
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

    this.#isXPressed = b_.isButtonPressed("a");
    this.#isOPressed = b_.isButtonPressed("b");
  }

  update(): void {
    // We check it here and not in `draw` in order to avoid buttons changing their
    //   state during pause menu, when `draw` is called but `update` is not.
    this.#isXPressed = b_.isButtonPressed("a");
    this.#isOPressed = b_.isButtonPressed("b");
  }

  draw(params: { isButtonXEnabled: boolean }): void {
    if (this.#gameState.buildingState === "idle") {
      this.#waveStatus.draw();

      const menuText = "menu";
      b_.drawText(
        menuText,
        v_(g.warzoneBorder, g.canvasSize.y - g.warzoneBorder + 2),
        this.#isOPressed ? p8c.lightGrey : p8c.mauve,
      );

      const menuButton = new ButtonGlyph(
        this.#isOPressed ? g.buttonSprites.o.pressed : g.buttonSprites.o.raised,
      );
      menuButton.draw(
        v_(1, g.canvasSize.y - g.warzoneBorder + 1),
        this.#isOPressed ? p8c.lightGrey : p8c.mauve,
        p8c.darkerGrey,
      );

      const buildText = "build";
      b_.drawText(
        buildText,
        v_(
          g.canvasSize.x - g.warzoneBorder - b_.measureText(buildText).wh.x,
          g.canvasSize.y - g.warzoneBorder + 2,
        ),
        this.#isXPressed ? p8c.lightGrey : p8c.mauve,
      );

      const buildButton = new ButtonGlyph(
        this.#isXPressed ? g.buttonSprites.x.pressed : g.buttonSprites.x.raised,
      );
      buildButton.draw(
        g.canvasSize.add(-g.warzoneBorder + 2, -g.warzoneBorder + 1),
        this.#isXPressed ? p8c.lightGrey : p8c.mauve,
        p8c.darkerGrey,
      );
    } else if (this.#gameState.buildingState === "tower-choice") {
      this.#towerInfo.draw();

      const moneyText = this.#gameState.money.available.toFixed(0);
      const moneyTextSize = b_.measureText(moneyText).wh;
      b_.drawText(
        moneyText,
        v_(g.canvasSize.x - g.warzoneBorder - moneyTextSize.x, 2),
        p8c.lightGrey,
      );
      const dollarText = "$";
      b_.drawText(
        dollarText,
        v_(g.canvasSize.x - g.warzoneBorder + 2, 2),
        p8c.lavender,
      );

      const backText = "<";
      b_.drawText(
        backText,
        v_(g.warzoneBorder, g.canvasSize.y - g.warzoneBorder + 2),
        this.#isOPressed ? p8c.lightGrey : p8c.mauve,
      );

      const backButton = new ButtonGlyph(
        this.#isOPressed ? g.buttonSprites.o.pressed : g.buttonSprites.o.raised,
      );
      backButton.draw(
        v_(1, g.canvasSize.y - g.warzoneBorder + 1),
        this.#isOPressed ? p8c.lightGrey : p8c.mauve,
        p8c.darkerGrey,
      );

      this.#towerChoiceGui.draw();

      const chooseButton = new ButtonGlyph(
        this.#isXPressed ? g.buttonSprites.x.pressed : g.buttonSprites.x.raised,
      );
      chooseButton.draw(
        g.canvasSize.add(-g.warzoneBorder + 2, -g.warzoneBorder + 1),
        params.isButtonXEnabled ?
          this.#isXPressed ?
            p8c.lightGrey
          : p8c.lavender
        : p8c.darkerGrey,
        p8c.darkerGrey,
      );
    } else if (this.#gameState.buildingState === "tower-placement") {
      this.#towerInfo.draw();

      const moneyText = this.#gameState.money.available.toFixed(0);
      const moneyTextSize = b_.measureText(moneyText).wh;
      b_.drawText(
        moneyText,
        v_(g.canvasSize.x - g.warzoneBorder - moneyTextSize.x, 2),
        p8c.lightGrey,
      );
      const dollarText = "$";
      b_.drawText(
        dollarText,
        v_(g.canvasSize.x - g.warzoneBorder + 2, 2),
        p8c.lavender,
      );

      const backText = "<";
      b_.drawText(
        backText,
        v_(g.warzoneBorder, g.canvasSize.y - g.warzoneBorder + 2),
        this.#isOPressed ? p8c.lightGrey : p8c.mauve,
      );

      const backButton = new ButtonGlyph(
        this.#isOPressed ? g.buttonSprites.o.pressed : g.buttonSprites.o.raised,
      );
      backButton.draw(
        v_(1, g.canvasSize.y - g.warzoneBorder + 1),
        this.#isOPressed ? p8c.lightGrey : p8c.mauve,
        p8c.darkerGrey,
      );

      const placeText = "place";
      b_.drawText(
        placeText,
        v_(
          g.canvasSize.x - g.warzoneBorder - b_.measureText(placeText).wh.x,
          g.canvasSize.y - g.warzoneBorder + 2,
        ),
        params.isButtonXEnabled ?
          this.#isXPressed ?
            p8c.lightGrey
          : p8c.lavender
        : p8c.darkerGrey,
      );

      const placeButton = new ButtonGlyph(
        this.#isXPressed ? g.buttonSprites.x.pressed : g.buttonSprites.x.raised,
      );
      placeButton.draw(
        g.canvasSize.add(-g.warzoneBorder + 2, -g.warzoneBorder + 1),
        params.isButtonXEnabled ?
          this.#isXPressed ?
            p8c.lightGrey
          : p8c.lavender
        : p8c.darkerGrey,
        p8c.darkerGrey,
      );

      b_.drawText(
        dollarText,
        g.canvasSize
          .sub(g.warzoneBorder)
          .add(
            v_(
              -b_.measureText(placeText).wh.x -
                3 -
                b_.measureText(dollarText).wh.x,
              2,
            ),
          ),
        params.isButtonXEnabled ? p8c.lavender : p8c.darkerGrey,
      );
      const costText = `-${this.#gameState.towerChoice.chosenTower.cost.toFixed(
        0,
      )}`;
      b_.drawText(
        costText,
        g.canvasSize
          .sub(g.warzoneBorder)
          .add(
            v_(
              -b_.measureText(placeText).wh.x -
                3 -
                b_.measureText(dollarText).wh.x -
                2 -
                b_.measureText(costText).wh.x,
              2,
            ),
          ),
        (
          this.#gameState.money.available >=
            this.#gameState.towerChoice.chosenTower.cost
        ) ?
          params.isButtonXEnabled ?
            p8c.lightGrey
          : p8c.darkerGrey
        : p8c.darkRed,
      );
    }
  }
}
