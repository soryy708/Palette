import React from 'react';
import Line from './line';
import { Color } from '../color';

type WheelProps = {
    items: Color[];
    size: string;
    highlightedItem: number;
};

const Wheel: React.FunctionComponent<WheelProps> = (props: WheelProps) => {
    return <div
        className="hueWheel"
        style={{
            width: props.size,
            height: props.size,
        }}
    >
        {(props.items || []).map((color, i) => <Line
            key={JSON.stringify(color)}
            color={color}
            isHighlighted={!isNaN(props.highlightedItem) && i === props.highlightedItem}
        />)}
    </div>;
};

export default Wheel;
