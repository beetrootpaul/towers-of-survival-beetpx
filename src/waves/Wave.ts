import { Enemies, EnemyType } from "../enemies/Enemies";
import { g } from "../globals";
import { Timer } from "../misc/Timer";

export class Wave {
  private readonly enemies: Enemies;
  private readonly timer: Timer<EnemyType>;

  constructor(params: { descriptor: string; enemies: Enemies }) {
    this.enemies = params.enemies;

    const keyMoments: Record<number, EnemyType> = {};
    const spawns = params.descriptor.split(",");
    spawns.forEach((spawn, index) => {
      const moment = g.fps * (spawns.length - 1 - index);
      if (spawn === "-") {
      } else if (spawn === "s") {
        keyMoments[moment] = "small";
      } else if (spawn === "m") {
        keyMoments[moment] = "medium";
      } else if (spawn === "b") {
        keyMoments[moment] = "big";
      } else {
        throw Error(`Unexpected spawn descriptor found: "${spawn}".`);
      }
    });

    this.timer = new Timer({
      start: g.fps * (spawns.length - 1),
      keyMoments,
      onKeyMoment: (enemyType: EnemyType) => {
        this.enemies.spawn(enemyType);
      },
    });
  }

  // TODO: USED?
  // progress(): void {
  //   this.timer.progress();
  // }

  update(): void {
    this.timer.update();
  }
}
