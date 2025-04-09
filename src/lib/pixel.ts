// src/lib/pixel.ts
import ReactPixel from "react-facebook-pixel";

const PIXEL_ID = "1591255851691449";

const options = {
  autoConfig: true,
  debug: false,
};

export const initFacebookPixel = () => {
  ReactPixel.init(PIXEL_ID, undefined, options);
  ReactPixel.pageView();
};

export const trackEvent = (event: string, data?: object) => {
  ReactPixel.track(event, data);
};