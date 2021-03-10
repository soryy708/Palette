import React from 'react';
import Stripe from './stripe';
import { Color } from '../color';

type Item = {
    color: Color;
};

type StripesProps = {
    items?: Item[];
    onRemove: (itemIndex: number) => void;
};

const Stripes: React.FunctionComponent<StripesProps> = (props: StripesProps) => {
    return <div className="stripes">
        {(props.items || []).map((item, i) =>
            <Stripe
                key={JSON.stringify(item)}
                color={item.color}
                onRemove={() => props.onRemove(i)}
            />
        )}
    </div>;
};

export default Stripes;
