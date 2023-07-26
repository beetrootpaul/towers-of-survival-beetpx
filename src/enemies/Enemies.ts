export class Enemies {
  // TODO: migrate from Lua
  //     local path = u.r(params.path)
  //     local on_enemy_reached_path_end = u.r(params.on_enemy_reached_path_end)
  //
  //     local enemies = {}
  //
  //     local s = {}
  //
  //     function s.spawn(enemy_type)
  //         add(enemies, new_enemy {
  //             enemy_type = enemy_type,
  //             path = path,
  //             on_reached_path_end = on_enemy_reached_path_end,
  //         })
  //     end
  //
  //     function s.for_each_from_furthest(callback)
  //         foreach(enemies, callback)
  //     end
  //
  //     function s.are_none_left()
  //         return #enemies <= 0
  //     end
  //
  //     function s.pre_update()
  //         for enemy in all(enemies) do
  //             enemy.pre_update()
  //         end
  //     end
  //
  //     function s.update()
  //         for enemy in all(enemies) do
  //             if enemy.has_finished() then
  //                 del(enemies, enemy)
  //             else
  //                 enemy.update()
  //             end
  //         end
  //     end
  //
  //     function s.draw()
  //         for enemy in all(enemies) do
  //             enemy.draw()
  //         end
  //     end
  //
  //     return s
}
