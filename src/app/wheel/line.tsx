import React from 'react';
import { Color, getHue } from '../color';

type LineProps = {
    color: Color;
};

const Line: React.FunctionComponent<LineProps> = (props: LineProps) => {
    const getRotation = () => `${getHue(props.color)}deg`;

    return <div
        className="line"
        style={{
            transform: `rotateZ(${getRotation()})`,
        }}
    >
    </div>;
};

export default Line;
