export class TowerChoice {
  // TODO: migrate from Lua
  // local towers = {}
  // for tower_type in all({ "laser", "booster", "v_beam" }) do
  //     add(towers, {
  //         type = tower_type,
  //         label = a.towers[tower_type].label,
  //         cost = a.towers[tower_type].cost,
  //         sprite = a.towers[tower_type].sprite,
  //         dps = a.towers[tower_type].dps,
  //         charging_time = a.towers[tower_type].charging_time,
  //         shooting_time = a.towers[tower_type].shooting_time,
  //         charging_time_boost = a.towers[tower_type].charging_time_boost,
  //         shooting_time_boost = a.towers[tower_type].shooting_time_boost,
  //     })
  // end
  // local chosen = 1
  //
  // local s = {}
  //
  // function s.towers_in_cost_order()
  //     return towers
  // end
  //
  // function s.chosen_tower()
  //     return towers[chosen]
  // end
  //
  // function s.choose_prev_tower()
  //     chosen = max(chosen - 1, 1)
  // end
  //
  // function s.choose_next_tower()
  //     chosen = min(chosen + 1, #towers)
  // end
  //
  // return s
}
