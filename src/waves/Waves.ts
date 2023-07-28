import { Enemies } from "../enemies/Enemies";
import { Wait } from "./Wait";
import { Wave, WaveDescriptor } from "./Wave";
import { g, u } from "../globals";

export class Waves {
  private readonly enemies: Enemies;

  // TODO: consider going back to # private convention for sake of no such inconsistencies in field naming
  private _waveNumber: number;

  private _wave: Wave | null;
  private _wait: Wait | null;

  constructor(params: { enemies: Enemies }) {
    this.enemies = params.enemies;

    this._waveNumber = 1;

    this._wave = null;
    this._wait = new Wait({
      durationSeconds: this.currentWaveDescriptor().wait,
    });
  }

  isLastWave(): boolean {
    return this.waveNumber >= g.waves.length;
  }

  get wait(): Wait | null {
    return this._wait;
  }

  get wave(): Wave | null {
    return this._wave;
  }

  get waveNumber(): number {
    return this._waveNumber;
  }

  haveSpawnAllEnemies() {
    return this.isLastWave() && this.wave && this.wave.progress() >= 1;
  }

  update(): void {
    if (this._wait && this._wait.progress() >= 1) {
      this._wait = null;
      this._wave = new Wave({
        descriptor: this.currentWaveDescriptor(),
        enemies: this.enemies,
      });
      // TODO: REMOVE
      console.log("new ~WAVE~");
    }

    if (
      this._wave &&
      this._wave.progress() >= 1 &&
      !this.isLastWave() &&
      this.enemies.areNoneLeft()
    ) {
      this._wave = null;
      this._waveNumber += 1;
      this._wait = new Wait({
        durationSeconds: this.currentWaveDescriptor().wait,
      });
      // TODO: REMOVE
      console.log("new .wait.");
    }

    this._wait?.update();
    this._wave?.update();
  }

  private currentWaveDescriptor(): WaveDescriptor {
    return (
      g.waves[this.waveNumber - 1] ??
      u.throwError(
        `Tried to access non-existent wave descriptor at index ${
          this.waveNumber - 1
        }.`
      )
    );
  }
}
