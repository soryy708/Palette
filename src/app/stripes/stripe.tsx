import React, { useState, useEffect } from 'react';
import { Color, ColorSpace, luminanceToPerceivedLightness, colorToLuminance, rotateHue, rgbToHsl, rgbToHex } from '../color';
import MenuButton from '../menuButton';

type StripeProps = {
    color: Color;
    colorSpace: ColorSpace;
    onRemove: () => void;
    onReroll: () => void;
    onAddColor: (color: Color) => void;
    onMouseOver?: () => void;
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

    const renderLabel = () => {
        switch (props.colorSpace) {
            case 'rgb': {
                return <React.Fragment>
                    RGB ({Math.round(props.color.r)}, {Math.round(props.color.g)}, {Math.round(props.color.b)})
                </React.Fragment>;
            }
            case 'hsl': {
                const hsl = rgbToHsl(props.color);
                return <React.Fragment>
                    HSL ({Math.round(hsl.h)}, {Math.round(hsl.s * 100)}%, {Math.round(hsl.l * 100)}%)
                </React.Fragment>;
            }
            case 'hex': {
                return <React.Fragment>
                    {rgbToHex(props.color)}
                </React.Fragment>;
            }
        }
    };

    return <div
        className={'stripe' + (active ? ' active' : '')}
        style={{backgroundColor: colorToCss(getBackgroundColor())}}
        onMouseOver={props.onMouseOver}
    >
        <span style={{color: colorToCss(getTextColor())}}>
            {renderLabel()}
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
            <MenuButton
                text="Add harmony"
                menuItems={[{
                    text: 'Complementary',
                    onClick: () => props.onAddColor(rotateHue(props.color, 180)),
                }, {
                    text: 'Triadic',
                    onClick: () => {
                        props.onAddColor(rotateHue(props.color, +60));
                        props.onAddColor(rotateHue(props.color, -60));
                    },
                }, {
                    text: 'Tetradic',
                    menuItems: [{
                        text: 'Clockwise',
                        onClick: () => {
                            props.onAddColor(rotateHue(props.color, +180));
                            props.onAddColor(rotateHue(props.color, +60));
                            props.onAddColor(rotateHue(props.color, +240));
                        },
                    }, {
                        text: 'Counter-clockwise',
                        onClick: () => {
                            props.onAddColor(rotateHue(props.color, +180));
                            props.onAddColor(rotateHue(props.color, -60));
                            props.onAddColor(rotateHue(props.color, +120));
                        },
                    }],
                }, {
                    text: 'Analogous',
                    onClick: () => {
                        props.onAddColor(rotateHue(props.color, +30));
                        props.onAddColor(rotateHue(props.color, -30));
                    },
                }, {
                    text: 'Neutral',
                    onClick: () => {
                        props.onAddColor(rotateHue(props.color, +15));
                        props.onAddColor(rotateHue(props.color, -15));
                    },
                }]}
            />
        </div>
    </div>;
};

export default Stripe;
