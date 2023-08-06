import { u } from "../globals";

export class Timer<TEvent = never> {
  readonly #start: number;
  readonly #keyMoments: Record<number, TEvent>;
  readonly #onKeyMoment: (event: TEvent) => void;

  #t: number;

  constructor(params: {
    start: number;
    keyMoments?: Record<number, TEvent>;
    onKeyMoment?: (event: TEvent) => void;
  }) {
    this.#start = params.start;
    this.#keyMoments = params.keyMoments ?? {};
    this.#onKeyMoment = params.onKeyMoment ?? u.noop;

    this.#t = this.#start;
  }

  hasFinished(): boolean {
    return this.#t < 0;
  }

  progress(): number {
    return this.#start > 0 ? 1 - Math.max(0, this.#t) / this.#start : 1;
  }

  update(): void {
    const event = this.#keyMoments[this.#t];
    if (event) {
      this.#onKeyMoment(event);
    }

    this.#t = Math.max(-1, this.#t - 1);
  }
}
