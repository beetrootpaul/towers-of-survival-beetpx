import { v_ } from "beetpx";
import { Pico8Colors } from "./Pico8Color";

export const p8c = Pico8Colors;

export const g = {
  __debug: !__BEETPX_IS_PROD__,

  fps: 30,

  screenSize: v_(64, 64),
};
