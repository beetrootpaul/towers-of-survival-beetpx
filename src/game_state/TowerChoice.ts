import { BpxSprite, u_ } from "@beetpx/beetpx";
import { g } from "../globals";
import { TowerType } from "../towers/Tower";

export type TowerDescriptor = {
  type: TowerType;
  label: string;
  cost: number;
  sprite: BpxSprite;
  dps: number | undefined;
  chargingTime: number | undefined;
  shootingTime: number | undefined;
  chargingTimeBoost: number | undefined;
  shootingTimeBoost: number | undefined;
};

export class TowerChoice {
  readonly #towers: TowerDescriptor[];
  #chosen;

  constructor() {
    const types: TowerType[] = ["laser", "booster", "v_beam"];
    this.#towers = types.map(type => {
      const t =
        g.towers[type] ??
        u_.throwError(
          `Tried to access info about non-existent tower type "${type}".`,
        );
      return {
        type,
        label: t.label,
        cost: t.cost,
        sprite: t.sprite,
        dps: "dps" in t ? t.dps : undefined,
        chargingTime: "chargingTime" in t ? t.chargingTime : undefined,
        shootingTime: "shootingTime" in t ? t.shootingTime : undefined,
        chargingTimeBoost:
          "chargingTimeBoost" in t ? t.chargingTimeBoost : undefined,
        shootingTimeBoost:
          "shootingTimeBoost" in t ? t.shootingTimeBoost : undefined,
      };
    });

    this.#chosen = 0;
  }

  towersInCostOrder(): TowerDescriptor[] {
    return this.#towers;
  }

  get chosenTower(): TowerDescriptor {
    return (
      this.#towers[this.#chosen] ??
      u_.throwError(
        `Tried to access non-existent tower choice at index ${this.#chosen}.`,
      )
    );
  }

  choosePrevTower(): void {
    this.#chosen = Math.max(this.#chosen - 1, 0);
  }

  chooseNextTower(): void {
    this.#chosen = Math.min(this.#chosen + 1, this.#towers.length - 1);
  }
}
