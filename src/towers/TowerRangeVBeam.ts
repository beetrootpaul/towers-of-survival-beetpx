export class TowerRangeVBeam {
  // TODO: migrate from Lua
  // local tile = u.r(params.tile)
  //
  // local x1 = (a.wbt + tile.x) * u.ts + 1
  // local x2 = x1 + 1
  //
  // local s = {}
  //
  // function s.touches_enemy(enemy)
  //     local enemy_circle = enemy.range().circle()
  //     return enemy_circle.xy.x + enemy_circle.r >= x1 and enemy_circle.xy.x - enemy_circle.r <= x2
  // end
  //
  // function s.draw(color1, color2)
  //     clip(0, a.wb, u.vs, u.vs - a.wb)
  //     fillp(0xa5a5 + .5)
  //     rectfill(x1, a.wb, x2, u.vs - a.wb - 1, color1)
  //     fillp()
  //     clip()
  // end
  //
  // return s
}
