import React from 'react';
import Stripe from './stripe';
import { Color } from '../color';

type StripesProps = {
    items?: {
        id: any;
        color: Color;
    }[];
    onRemove: (itemIndex: number) => void;
    onReroll: (itemIndex: number) => void;
    onAddColor: (color: Color) => void;
};

const Stripes: React.FunctionComponent<StripesProps> = (props: StripesProps) => {
    return <div className="stripes">
        {(props.items || []).map((item, i) =>
            <Stripe
                key={item.id}
                color={item.color}
                onRemove={() => props.onRemove(i)}
                onReroll={() => props.onReroll(i)}
                onAddColor={props.onAddColor}
            />
        )}
    </div>;
};

export default Stripes;
