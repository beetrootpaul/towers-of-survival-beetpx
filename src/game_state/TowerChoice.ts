import { TowerType } from "../towers/Tower";
import { g, u } from "../globals";
import { BpxSprite } from "beetpx";

export type TowerDescriptor = {
  type: TowerType;
  label: string;
  // TODO: migrate from Lua
  //         cost = a.towers[tower_type].cost,
  sprite: BpxSprite;
  // TODO: migrate from Lua
  //         dps = a.towers[tower_type].dps,
  //         charging_time = a.towers[tower_type].charging_time,
  //         shooting_time = a.towers[tower_type].shooting_time,
  //         charging_time_boost = a.towers[tower_type].charging_time_boost,
  //         shooting_time_boost = a.towers[tower_type].shooting_time_boost,
};

export class TowerChoice {
  private readonly towers: TowerDescriptor[];
  private chosen;

  constructor() {
    const types: TowerType[] = ["laser", "booster", "v_beam"];
    this.towers = types.map((type) => {
      const t =
        g.towers[type] ??
        u.throwError(
          `Tried to access info about non-existent tower type "${type}".`
        );
      return {
        type,
        label: t.label,
        // TODO: migrate from Lua
        //         cost = a.towers[tower_type].cost,
        sprite: t.sprite,
        // TODO: migrate from Lua
        //         dps = a.towers[tower_type].dps,
        //         charging_time = a.towers[tower_type].charging_time,
        //         shooting_time = a.towers[tower_type].shooting_time,
        //         charging_time_boost = a.towers[tower_type].charging_time_boost,
        //         shooting_time_boost = a.towers[tower_type].shooting_time_boost,
      };
    });

    this.chosen = 0;
  }

  // TODO: make towers really sorted by cost
  towersInCostOrder(): TowerDescriptor[] {
    return this.towers;
  }

  get chosenTower(): TowerDescriptor {
    return (
      this.towers[this.chosen] ??
      u.throwError(
        `Tried to access non-existent tower choice at index ${this.chosen}.`
      )
    );
  }

  choosePrevTower(): void {
    this.chosen = Math.max(this.chosen - 1, 0);
  }

  chooseNextTower(): void {
    this.chosen = Math.min(this.chosen + 1, this.towers.length - 1);
  }
}
