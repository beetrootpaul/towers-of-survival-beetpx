export class Path {
  // TODO: migrate from Lua
  // local waypoints = u.r(params.waypoints)
  //
  // local points = (function()
  //     local prev = waypoints[1]
  //     local next
  //     local pp = { prev }
  //     for i = 2, #waypoints do
  //         next = waypoints[i]
  //         if next.x ~= prev.x then
  //             for offset = 1, abs(next.x - prev.x) do
  //                 add(pp, new_xy(
  //                     prev.x + offset * sgn(next.x - prev.x),
  //                     prev.y
  //                 ))
  //             end
  //         elseif next.y ~= prev.y then
  //             for offset = 1, abs(next.y - prev.y) do
  //                 add(pp, new_xy(
  //                     prev.x,
  //                     prev.y + offset * sgn(next.y - prev.y)
  //                 ))
  //             end
  //         end
  //         prev = next
  //     end
  //     return pp
  // end)()
  //
  // return {
  //     points = points,
  // }
}
