import React from 'react';
import Stripe from './stripe';
import { Color, ColorSpace } from '../color';

type StripesProps = {
    items?: {
        id: any;
        color: Color;
    }[];
    colorSpace: ColorSpace;
    onRemove: (itemIndex: number) => void;
    onReroll: (itemIndex: number) => void;
    onAddColor: (color: Color) => void;
    onItemHover: (itemIndex: number) => void;
};

const Stripes: React.FunctionComponent<StripesProps> = (props: StripesProps) => {
    return <div className="stripes">
        {(props.items || []).map((item, i) =>
            <Stripe
                key={item.id}
                color={item.color}
                colorSpace={props.colorSpace}
                onRemove={() => props.onRemove(i)}
                onReroll={() => props.onReroll(i)}
                onAddColor={props.onAddColor}
                onMouseOver={() => props.onItemHover(i)}
            />
        )}
    </div>;
};

export default Stripes;
