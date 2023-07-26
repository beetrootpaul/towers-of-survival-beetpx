export class Timer {
  private t: number;

  constructor(params: { start: number }) {
    // TODO: migrate from Lua
    //     local start = u.r(params.start)
    let start = params.start;

    // TODO: migrate from Lua
    //     local key_moments = params.key_moments or {}
    //     local on_key_moment = params.on_key_moment or u.noop

    this.t = start;
  }

  hasFinished(): boolean {
    return this.t < 0;
  }

  //     function s.progress()
  //         return 1 - (max(0, t) / start)
  //     end

  update(): void {
    // TODO: migrate from Lua
    //         if key_moments[t] then
    //             on_key_moment(key_moments[t])
    //         end

    this.t = Math.max(-1, this.t - 1);
  }
}
