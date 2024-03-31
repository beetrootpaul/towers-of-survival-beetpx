export interface Screen {
  pauseTimers(): void;

  resumeTimers(): void;

  update(): Screen;

  draw(): void;
}
