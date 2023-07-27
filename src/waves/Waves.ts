import { Enemies } from "../enemies/Enemies";
import { Wait } from "./Wait";
import { Wave } from "./Wave";

export class Waves {
  private readonly enemies: Enemies;
  // TODO: consider going back to # private convention for sake of no such inconsistencies in field naming
  private readonly _waveNumber: number;
  private wave: Wave | null;
  private wait: Wait | null;

  constructor(params: { enemies: Enemies }) {
    this.enemies = params.enemies;

    this._waveNumber = 1;
    this.wave = null;
    this.wait = new Wait({
      // TODO: migrate from Lua
      //     duration = a.waves[wave_number].wait,
      duration: 1,
    });
  }

  // TODO: migrate from Lua
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

  get waveNumber(): number {
    return this._waveNumber;
  }

  haveSpawnAllEnemies() {
    // TODO: migrate from Lua
    //     return is_last_wave() and wave and wave.progress() >= 1
    return false;
  }

  update(): void {
    if (this.wait && this.wait.progress() >= 1) {
      this.wait = null;
      this.wave = new Wave({
        // TODO: migrate from Lua
        //             descriptor = a.waves[wave_number],
        descriptor: "s,m,b,-,-,-,s,b,-,-,m,m",
        enemies: this.enemies,
      });
    }

    // TODO: migrate from Lua
    //     if wave and wave.progress() >= 1 and not is_last_wave() and enemies.are_none_left() then
    //         wave = nil
    //         wave_number = wave_number + 1
    //         wait = new_wait {
    //             duration = a.waves[wave_number].wait,
    //         }
    //     end

    this.wait?.update();
    this.wave?.update();
  }
}
