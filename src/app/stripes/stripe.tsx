import React, { useState, useEffect } from 'react';
import { Color, luminanceToPerceivedLightness, colorToLuminance } from '../color';

type StripeProps = {
    color: Color;
    onRemove: () => void;
    onReroll: () => void;
};

const Stripe: React.FunctionComponent<StripeProps> = (props: StripeProps) => {
    const [active, setActive] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setActive(true);
        }, 10);
    }, []);

    const getBackgroundColor = () => props.color;
    const getTextColor = (): Color => {
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
            <button
                type="button"
                onClick={() => {
                    props.onReroll();
                }}
            >
                Reroll
            </button>
        </div>
    </div>;
};

export default Stripe;
