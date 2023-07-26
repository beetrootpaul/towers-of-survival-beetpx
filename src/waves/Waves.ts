export class Waves {
  // TODO: migrate from Lua
  // local enemies = u.r(params.enemies)
  //
  // local wave_number = 1
  // local wave
  // local wait = new_wait {
  //     duration = a.waves[wave_number].wait,
  // }
  //
  // local function is_last_wave()
  //     return wave_number >= #a.waves
  // end
  //
  // local s = {}
  //
  // function s.current_wait()
  //     return wait
  // end
  //
  // function s.current_wave()
  //     return wave
  // end
  //
  // function s.wave_number()
  //     return wave_number
  // end
  //
  // function s.have_spawn_all_enemies()
  //     return is_last_wave() and wave and wave.progress() >= 1
  // end
  //
  // function s.update()
  //     if wait and wait.progress() >= 1 then
  //         wait = nil
  //         wave = new_wave {
  //             descriptor = a.waves[wave_number],
  //             enemies = enemies,
  //         }
  //     end
  //
  //     if wave and wave.progress() >= 1 and not is_last_wave() and enemies.are_none_left() then
  //         wave = nil
  //         wave_number = wave_number + 1
  //         wait = new_wait {
  //             duration = a.waves[wave_number].wait,
  //         }
  //     end
  //
  //     if wait then
  //         wait.update()
  //     end
  //
  //     if wave then
  //         wave.update()
  //     end
  // end
  //
  // return s
}
