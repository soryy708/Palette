import React from 'react';
import { Color, getHue } from '../color';

type LineProps = {
    color: Color;
    isHighlighted: boolean;
};

const Line: React.FunctionComponent<LineProps> = (props: LineProps) => {
    const getRotation = () => `${getHue(props.color)}deg`;

    return <div
        className={'line' + (props.isHighlighted ? ' highlighted' : '')}
        style={{
            transform: `rotateZ(${getRotation()})`,
        }}
    >
    </div>;
};

export default Line;
