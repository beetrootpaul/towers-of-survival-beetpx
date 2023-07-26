export class Fight {
  // TODO: migrate from Lua
  // local lasers = {}
  // local beams = {}
  //
  // local s = {}
  //
  // function s.show_laser(p)
  //     add(lasers, {
  //         x1 = p.source_xy.x,
  //         y1 = p.source_xy.y,
  //         x2 = p.target_xy.x,
  //         y2 = p.target_xy.y,
  //     })
  // end
  //
  // function s.show_beam(p)
  //     add(beams, {
  //         tile_x = u.r(p.tile_x),
  //     })
  // end
  //
  // function s.update()
  //     lasers = {}
  //     beams = {}
  // end
  //
  // function s.draw()
  //     for laser in all(lasers) do
  //         line(laser.x1, laser.y1, laser.x2, laser.y2, a.colors.white)
  //     end
  //     for beam in all(beams) do
  //         local x1 = (a.wbt + beam.tile_x) * u.ts + 1
  //         local x2 = x1 + 1
  //         line(x1, a.wb, x1, u.vs - a.wb, a.colors.white)
  //         line(x2, a.wb, x2, u.vs - a.wb, a.colors.white)
  //     end
  // end
  //
  // return s
}
