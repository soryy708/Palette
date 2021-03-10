import React, { useState, useEffect } from 'react';
import { Color } from '../color';

type StripeProps = {
    color: Color;
    onRemove: () => void;
};

const Stripe: React.FunctionComponent<StripeProps> = (props: StripeProps) => {
    const [active, setActive] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setActive(true);
        }, 10);
    }, []);

    const getBackgroundColor = () => ({r: props.color.r, g: props.color.g, b: props.color.b});
    const getTextColor = (): Color => {
        /**
         * 
         * @param colorChannel between 0 and 255
         * @returns linearized value between 0.0 and 1.0
         */
        const linearizeColor = (colorChannel: number) => {
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
        const colorToLuminance = (color: Color): number => rgbToLuminance(color.r, color.g, color.b);
        /**
         * 
         * @param luminance between 0.0 and 1.0
         * @returns between 0 and 100
         */
        const luminanceToPerceivedLightness = (luminance: number): number => {
            if (luminance <= (216/24389)) {
                return luminance * (24389/27);
            } else {
                return Math.pow(luminance, (1/3)) * 116 - 16;
            }
        };
        const backgroundPerceivedLightness = luminanceToPerceivedLightness(colorToLuminance(getBackgroundColor()));
        if (backgroundPerceivedLightness > 50) {
            return {r: 0, g: 0, b: 0};
        }
        return {r: 255, g: 255, b: 255};
    };
    const colorToCss = (color: Color) => `rgb(${color.r}, ${color.g}, ${color.b})`;

    return <div
        className={'stripe' + (active ? ' active' : '')}
        style={{backgroundColor: colorToCss(getBackgroundColor())}}
    >
        <span style={{color: colorToCss(getTextColor())}}>
            RGB ({props.color.r}, {props.color.g}, {props.color.b})
        </span>
        <div className="buttons">
            <button
                type="button"
                onClick={() => {
                    setActive(false);
                    setTimeout(() => {
                        props.onRemove();
                    }, 400);
                }}
            >
                Remove
            </button>
        </div>
    </div>;
};

export default Stripe;
