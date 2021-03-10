import React from 'react';
import Line from './line';
import { Color } from '../color';

type WheelProps = {
    items: Color[];
    size: string;
};

const Wheel: React.FunctionComponent<WheelProps> = (props: WheelProps) => {
    return <div
        className="hueWheel"
        style={{
            width: props.size,
            height: props.size,
        }}
    >
        {(props.items || []).map(color => <Line key={JSON.stringify(color)} color={color}/>)}
    </div>;
};

export default Wheel;
