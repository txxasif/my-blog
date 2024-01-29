import {
  Roboto,
  Public_Sans,
  Open_Sans,
  Abhaya_Libre,
  Caveat,
} from "next/font/google";

export const roboto = Roboto({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  display: "swap",
});
export const publicSans = Public_Sans({
  subsets: ["latin"],
});
export const openSans = Open_Sans({
  subsets: ["cyrillic"],
});

export const abhayaLibre = Abhaya_Libre({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

export const caveat = Caveat({
  weight: ["500"],
  subsets: ["latin-ext"],
  display: "swap",
});
