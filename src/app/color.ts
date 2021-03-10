export type Color = {
    r: number;
    g: number;
    b: number;
};

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

export const colorToLuminance = (color: Color): number => rgbToLuminance(color.r, color.g, color.b);

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

export const getChroma = (color: Color): number => {
    const max = Math.max(color.r/255, color.g/255, color.b/255);
    const min = Math.min(color.r/255, color.g/255, color.b/255);
    return max - min;
};

export const getHue = (color: Color): number => {
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
