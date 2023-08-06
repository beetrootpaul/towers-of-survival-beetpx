import { BeetPx, BpxVector2d } from "beetpx";
import { Enemies } from "../enemies/Enemies";
import { Fight } from "../fight/Fight";
import { TowerDescriptor } from "../game_state/TowerChoice";
import { g, p8c, u } from "../globals";
import { Tile } from "../misc/Tile";
import { Timer } from "../misc/Timer";
import { Warzone } from "../warzone/Warzone";
import { TowerRange } from "./TowerRange";
import { TowerRangeBooster } from "./TowerRangeBooster";
import { TowerRangeLaser } from "./TowerRangeLaser";
import { TowerRangeVBeam } from "./TowerRangeVBeam";
import { Towers } from "./Towers";

export type TowerType = "laser" | "booster" | "v_beam";

export class Tower {
  readonly #descriptor: TowerDescriptor;
  readonly #tile: Tile;
  readonly #otherTowers: Towers;
  readonly #enemies: Enemies;
  readonly #fight: Fight;
  readonly #warzone: Warzone;

  readonly #range: TowerRange;

  #chargingTimer: Timer | null;
  #shootingTimer: Timer | null;

  constructor(params: {
    descriptor: TowerDescriptor;
    tile: Tile;
    otherTowers: Towers;
    enemies: Enemies;
    fight: Fight;
    warzone: Warzone;
  }) {
    this.#descriptor = params.descriptor;
    this.#tile = params.tile;
    this.#otherTowers = params.otherTowers;
    this.#enemies = params.enemies;
    this.#fight = params.fight;
    this.#warzone = params.warzone;

    if (this.#descriptor.type === "laser") {
      this.#range = new TowerRangeLaser({
        tile: this.#tile,
      });
    } else if (this.#descriptor.type === "v_beam") {
      this.#range = new TowerRangeVBeam({
        tile: this.#tile,
      });
    } else if (this.#descriptor.type === "booster") {
      this.#range = new TowerRangeBooster({
        tile: this.#tile,
        warzone: this.#warzone,
      });
    } else {
      throw Error(`Unexpected tower type: "${this.#descriptor.type}"`);
    }

    this.#chargingTimer = this.#newChargingTimer();
    this.#shootingTimer = null;
  }

  #newShootingTimer(): Timer | null {
    if (this.#descriptor.shootingTime) {
      const boosts = this.#otherTowers.countReachingBoosters(this.#tile);
      return new Timer({
        start:
          g.fps *
          (this.#descriptor.shootingTime +
            boosts * (this.#descriptor.shootingTimeBoost ?? 0)),
      });
    }
    return null;
  }

  #newChargingTimer(): Timer | null {
    if (this.#descriptor.chargingTime) {
      const boosts = this.#otherTowers.countReachingBoosters(this.#tile);
      return new Timer({
        start:
          g.fps *
          (this.#descriptor.chargingTime +
            boosts * (this.#descriptor.chargingTimeBoost ?? 0)),
      });
    }
    return null;
  }

  get type(): TowerType {
    return this.#descriptor.type;
  }

  get xy(): BpxVector2d {
    return this.#tile.xy.add(g.warzoneBorderTiles).mul(g.tileSize);
  }

  isAt(tileToCheck: Tile): boolean {
    return tileToCheck.isSameAs(this.#tile);
  }

  get range(): TowerRange {
    return this.#range;
  }

  update(): void {
    if (this.#chargingTimer && this.#chargingTimer.hasFinished()) {
      this.#chargingTimer = null;
    } else if (this.#shootingTimer && this.#shootingTimer.hasFinished()) {
      this.#shootingTimer = null;
      this.#chargingTimer = this.#newChargingTimer();
    }

    if (!this.#chargingTimer) {
      let isAttacking = false;

      const dps = this.#descriptor.dps;
      if (this.type === "laser" && dps) {
        const range: TowerRangeLaser =
          this.#range instanceof TowerRangeLaser
            ? this.#range
            : u.throwError(
                "Laser tower got assigned a range of a non-laser type"
              );
        this.#enemies.forEachFromFurthest((enemy) => {
          if (!isAttacking && range.touchesEnemy(enemy)) {
            isAttacking = true;
            enemy.takeDamage(dps / g.fps);
            this.#fight.showLaser({
              xy1: range.laserSourceXy(),
              xy2: enemy.centerXy(),
            });
          }
        });
      } else if (this.type === "v_beam" && dps) {
        const range: TowerRangeVBeam =
          this.#range instanceof TowerRangeVBeam
            ? this.#range
            : u.throwError(
                "V-beam tower got assigned a range of a non-v-beam type"
              );
        this.#enemies.forEachFromFurthest((enemy) => {
          if (range.touchesEnemy(enemy)) {
            isAttacking = true;
            enemy.takeDamage(dps / g.fps);
          }
        });
        if (isAttacking) {
          this.#fight.showBeam({ tileX: this.#tile.xy.x });
        }
      }

      if (isAttacking && !this.#shootingTimer) {
        this.#shootingTimer = this.#newShootingTimer();
        //             if s.type == "laser" then
        if (this.type === "laser") {
          // TODO: AUDIO
          //                 audio.sfx(a.sfx.laser)
        } else if (this.type === "v_beam") {
          // TODO: AUDIO
          //                 audio.sfx(a.sfx.v_beam)
        }
      }
    }

    this.#chargingTimer?.update();
    this.#shootingTimer?.update();
  }

  draw(): void {
    BeetPx.sprite(
      g.assets.spritesheet,
      this.#descriptor.sprite,
      this.#tile.xy.add(g.warzoneBorderTiles).mul(g.tileSize)
    );

    if (BeetPx.debug) {
      this.#range.draw(p8c.trueBlue, p8c.brownishBlack);
    }
  }
}
