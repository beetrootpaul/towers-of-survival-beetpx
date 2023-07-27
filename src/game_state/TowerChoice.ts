import { Tower, TowerType } from "../towers/Tower";
import { g, u } from "../globals";
import { BpxSprite } from "beetpx";

export type TowerDescriptor = {
  // TODO: migrate from Lua
  //         type = tower_type,
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
  private readonly chosen;

  constructor() {
    const types: TowerType[] = ["laser", "booster", "v_beam"];
    this.towers = types.map((type) => {
      const t =
        g.towers[type] ??
        u.throwError(
          `Tried to access info about non-existent tower type "${type}".`
        );
      return {
        // TODO: migrate from Lua
        //         type = tower_type,
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

    this.chosen = 1;
  }

  // TODO: migrate from Lua
  // function s.towers_in_cost_order()
  //     return towers
  // end

  get chosenTower(): TowerDescriptor {
    return (
      this.towers[this.chosen] ??
      u.throwError(
        `Tried to access non-existent tower choice at index ${this.chosen}.`
      )
    );
  }

  // TODO: migrate from Lua
  // function s.choose_prev_tower()
  //     chosen = max(chosen - 1, 1)
  // end
  //
  // function s.choose_next_tower()
  //     chosen = min(chosen + 1, #towers)
  // end
}
