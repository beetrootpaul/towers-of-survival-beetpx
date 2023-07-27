import { Timer } from "../misc/Timer";
import { g } from "../globals";

export class Wait {
  private readonly timer: Timer;

  constructor(params: { duration: number }) {
    this.timer = new Timer({
      start: g.fps * params.duration,
    });
  }

  progress(): number {
    return this.timer.progress();
  }

  update(): void {
    this.timer.update();
  }
}
