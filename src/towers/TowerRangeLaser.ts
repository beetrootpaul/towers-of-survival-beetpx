export class TowerRangeLaser {
  // TODO: migrate from Lua
  // local tile = u.r(params.tile)
  //
  // local xy = new_xy(
  //     (a.wbt + tile.x + .5) * u.ts - .5,
  //     (a.wbt + tile.y + .5) * u.ts - .5
  // )
  // local r = 2.5 * u.ts - .5
  //
  // local s = {}
  //
  // function s.laser_source_xy()
  //     return xy.plus(.5, -1.5)
  // end
  //
  // function s.touches_enemy(enemy)
  //     local enemy_circle = enemy.range().circle()
  //     local dx = abs(xy.x - enemy_circle.xy.x)
  //     local dy = abs(xy.y - enemy_circle.xy.y)
  //     return dx * dx + dy * dy < (r + enemy_circle.r) * (r + enemy_circle.r)
  // end
  //
  // function s.draw(color1, color2)
  //     clip(0, a.wb, u.vs, u.vs - a.wb)
  //     oval(xy.x - r, xy.y - r, xy.x + r, xy.y + r, color1)
  //     clip()
  // end
  //
  // return s
}
