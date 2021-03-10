import React, { useState } from 'react';
import Stripes from './stripes';
import ColorWheel from './wheel';
import { Color } from './color';

const generateId = (() => {
    let autoInc = 0;
    return () => autoInc++;
})();

const App: React.FunctionComponent = () => {
    const [stripes, setStripes] = useState<{color: Color, id: any}[]>([]);

    const getRandomColor = (): Color => ({
        r: Math.floor(Math.random() * 255),
        g: Math.floor(Math.random() * 255),
        b: Math.floor(Math.random() * 255),
    });

    const removeStripe = (stripeIndex: number) => {
        const stripe = stripes[stripeIndex];
        setStripes(prevStripes => {
            const index = prevStripes.findIndex(it => it.id === stripe.id);
            if (index === -1) {
                return prevStripes;
            }
            return [...prevStripes.slice(0, index), ...prevStripes.slice(index + 1)];
        });
    };

    const rerollStripe = (stripeIndex: number) => {
        const stripe = stripes[stripeIndex];
        setStripes(prevStripes => {
            const index = prevStripes.findIndex(it => it === stripe);
            if (index === -1) {
                return prevStripes;
            }
            return [
                ...prevStripes.slice(0, index),
                {
                    ...prevStripes[index],
                    color: getRandomColor(),
                },
                ...prevStripes.slice(index + 1),
            ];
        });
    };

    const addStripe = (color: Color = null) => {
        setStripes(prevStripes => [...prevStripes, {
            id: generateId(),
            color: color || getRandomColor(),
        }]);
    };

    return <div className="page flexColumn">
        <div className="pageTop flexColumn">
            <Stripes
                items={stripes}
                onRemove={itemIndex => removeStripe(itemIndex)}
                onReroll={itemIndex => rerollStripe(itemIndex)}
                onAddColor={color => addStripe(color)}
            />
        </div>
        <div className="pageBottom">
            <button
                type="button"
                onClick={() => addStripe()}
                style={{width: '100%'}}
            >
                Add
            </button>
        </div>
        <div style={{position: 'absolute', top: '0.5em', right: '0.5em', boxShadow: '0 0 8px #000', borderRadius: '50%'}}>
            <ColorWheel
                items={stripes.map(stripe => stripe.color)}
                size='8em'
            />
        </div>
    </div>;
};

export default App;
