import logout from "@/assets/svg-icons/log-out.svg?raw";
import refreshCw from "@/assets/svg-icons/refresh-cw.svg?raw";
import plus from "@/assets/svg-icons/plus.svg?raw";
import x from "@/assets/svg-icons/x.svg?raw";

export const svgIconMap = <const>{
  "log-out": logout,
  "refresh-cw": refreshCw,
  plus: plus,
  x,
};

export type SvgIconType = keyof typeof svgIconMap;
