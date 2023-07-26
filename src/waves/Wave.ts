export class Wave {
  // TODO: migrate from Lua
  // local descriptor = u.r(params.descriptor)
  // local enemies = u.r(params.enemies)
  //
  // local spawns = split(descriptor.spawns)
  //
  // local key_moments = {}
  // for i = 1, #spawns do
  //     local spawn = spawns[i]
  //     if spawn == "-" then
  //         -- do nothing
  //     elseif spawn == "s" then
  //         key_moments[u.fps * (#spawns - i)] = "small"
  //     elseif spawn == "m" then
  //         key_moments[u.fps * (#spawns - i)] = "medium"
  //     elseif spawn == "b" then
  //         key_moments[u.fps * (#spawns - i)] = "big"
  //     else
  //         assert(false, "unexpected spawn descriptor found: " .. spawn)
  //     end
  // end
  //
  // local timer = new_timer {
  //     start = u.fps * (#spawns - 1),
  //     key_moments = key_moments,
  //     on_key_moment = function(type)
  //         enemies.spawn(type)
  //     end,
  // }
  //
  // local s = {}
  //
  // function s.progress()
  //     return timer.progress()
  // end
  //
  // function s.update()
  //     timer.update()
  // end
  //
  // return s
}
