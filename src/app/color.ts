export type HslColor = {
    h: number;
    s: number;
    l: number;
};

export type RgbColor = {
    r: number;
    g: number;
    b: number;
};

export type HexColor = string;

export type Color = RgbColor;

export type ColorSpace = 'rgb' | 'hsl' | 'hex';

/**
 * 
 * @param colorChannel between 0 and 255
 * @returns linearized value between 0.0 and 1.0
 */
export const linearizeColor = (colorChannel: number): number => {
    if (colorChannel/255 <= 0.04045) {
        return colorChannel/255 / 12.92;
    } else {
        return Math.pow((colorChannel/255 + 0.055) / 1.055, 2.4);
    }
};

/**
 * 
 * @param r between 0 and 255
 * @param g between 0 and 255
 * @param b between 0 and 255
 * @returns between 0.0 and 1.0
 */
const rgbToLuminance = (r: number, g: number, b: number): number =>
    0.2126 * linearizeColor(r) +
    0.7152 * linearizeColor(g) +
    0.0722 * linearizeColor(b);

export const colorToLuminance = (color: RgbColor): number => rgbToLuminance(color.r, color.g, color.b);

/**
 * 
 * @param luminance between 0.0 and 1.0
 * @returns between 0 and 100
 */
export const luminanceToPerceivedLightness = (luminance: number): number => {
    if (luminance <= (216/24389)) {
        return luminance * (24389/27);
    } else {
        return Math.pow(luminance, (1/3)) * 116 - 16;
    }
};

export const getChroma = (color: RgbColor): number => {
    const max = Math.max(color.r/255, color.g/255, color.b/255);
    const min = Math.min(color.r/255, color.g/255, color.b/255);
    return max - min;
};

export const getHue = (color: RgbColor): number => {
    const r = color.r / 255;
    const g = color.g / 255;
    const b = color.b / 255;
    const c = getChroma(color);
    const max = Math.max(r, g, b);
    if (c === 0) {
        return 0;
    }
    switch (max) {
        case r: {
            const segment = (g-b) / c;
            const shift = segment < 0 ? 360 / 60 : 0;
            return (segment + shift) * 60;
        }
        case g: {
            const segment = (b-r) / c;
            const shift = 120/60;
            return (segment + shift) * 60;
        }
        case b: {
            const segment = (r-g)/c;
            const shift = 240/60;
            return (segment + shift) * 60;
        }
    }
};

const getLightness = (color: RgbColor): number => {
    const max = Math.max(color.r/255, color.g/255, color.b/255);
    const min = Math.min(color.r/255, color.g/255, color.b/255);
    return (max + min) / 2;
};

export const getSaturation = (color: RgbColor): number => {
    const chroma = getChroma(color);
    if (chroma === 0) {
        return 0;
    }
    return chroma / (1 - Math.abs(2 * getLightness(color) - 1));
};

export const rgbToHsl = (color: RgbColor): HslColor => {
    return {
        h: getHue(color),
        s: getSaturation(color),
        l: getLightness(color),
    };
};

export const hslToRgb = (color: HslColor): RgbColor => {
    if (color.s === 0)  {
        return {
            r: color.l * 255,
            g: color.l * 255,
            b: color.l * 255,
        };
    }

    const c = (1 - Math.abs(2 * color.l - 1)) * color.s;
    const x = c * (1 - Math.abs((color.h / 60) % 2 - 1));
    const m = color.l - c/2;

    const [rt, gt, bt] = (() => {
        if (0 <= color.h && color.h < 60) {
            return [c, x, 0];
        }
        if (60 <= color.h && color.h < 120) {
            return [x, c, 0];
        }
        if (120 <= color.h && color.h < 180) {
            return [0, c, x];
        }
        if (180 <= color.h && color.h < 240) {
            return [0, x, c];
        }
        if (240 <= color.h && color.h < 300) {
            return [x, 0, c];
        }
        if (300 <= color.h && color.h < 360) {
            return [c, 0, x];
        }
    })();

    return {
        r: (rt+m) * 255,
        g: (gt+m) * 255,
        b: (bt+m) * 255,
    };
};

export const rotateHue = (color: RgbColor, degrees: number): RgbColor => {
    const originalHsl = rgbToHsl(color);
    const rotatedHue = (originalHsl.h + 360 + degrees) % 360;
    return hslToRgb({
        h: rotatedHue,
        s: originalHsl.s,
        l: originalHsl.l,
    });
};

export const stringifyColor = (color: RgbColor | HslColor): string => {
    const asRgb = color as RgbColor;
    if (asRgb.r !== undefined && asRgb.g !== undefined && asRgb.b !== undefined) {
        return `(${Math.round(asRgb.r)}, ${Math.round(asRgb.g)}, ${Math.round(asRgb.b)})`;
    }

    const asHsl = color as HslColor;
    return `(${Math.round(asHsl.h)}, ${Math.round(asHsl.s*100)}, ${Math.round(asHsl.l*100)})`;
};

export const rgbToHex = (color: RgbColor): HexColor => {
    const r = Math.round(color.r).toString(16).toUpperCase();
    const g = Math.round(color.g).toString(16).toUpperCase();
    const b = Math.round(color.b).toString(16).toUpperCase();
    const dupeChar = (ch: string) => ch.length === 1 ? ch+ch : ch;
    return `#${dupeChar(r)}${dupeChar(g)}${dupeChar(b)}`;
};
