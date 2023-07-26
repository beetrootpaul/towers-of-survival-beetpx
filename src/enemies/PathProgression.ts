export class PathProgression {
  // TODO: migrate from Lua
  //
  // local path_points = u.r(params.path).points
  //
  // local frames_per_point = ceil(u.fps / a.enemy_speed)
  // local counter = 1
  // local point_index = 1
  //
  // local s = {}
  //
  // function s.current_xy()
  //     return path_points[point_index]
  // end
  //
  // function s.current_direction()
  //     local curr = path_points[point_index]
  //     local prev = point_index > 1 and path_points[point_index - 1] or curr
  //     if curr.y > prev.y then
  //         return "down"
  //     end
  //     if curr.y < prev.y then
  //         return "up"
  //     end
  //     if curr.x < prev.x then
  //         return "left"
  //     end
  //     return "right"
  // end
  //
  // function s.has_reached_end()
  //     return point_index >= #path_points
  // end
  //
  // function s.update()
  //     if counter == 0 then
  //         point_index = min(point_index + 1, #path_points)
  //     end
  //     counter = (counter + 1) % frames_per_point
  // end
  //
  // return s
}
