import { Enemy } from "./Enemy";
import { Path } from "../warzone/Path";

export type EnemyType = "small" | "medium" | "big";

export class Enemies {
  private readonly enemies: Enemy[] = [];

  private readonly path: Path;
  private readonly onEnemyReachedPathEnd: () => void;

  constructor(params: { path: Path; onEnemyReachedPathEnd: () => void }) {
    this.path = params.path;
    this.onEnemyReachedPathEnd = params.onEnemyReachedPathEnd;
  }

  spawn(type: EnemyType): void {
    this.enemies.push(
      new Enemy({
        type,
        path: this.path,
        onReachedPathEnd: this.onEnemyReachedPathEnd,
      })
    );
  }

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

  update(): void {
    for (const enemy of this.enemies) {
      // TODO: migrate from Lua
      //             if enemy.has_finished() then
      //                 del(enemies, enemy)
      //             else
      enemy.update();
      // TODO: migrate from Lua
      //             end
    }
  }

  draw(): void {
    for (const enemy of this.enemies) {
      enemy.draw();
    }
  }
}
