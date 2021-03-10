import React, { useState } from 'react';
import Stripes from './stripes';
import ColorWheel from './wheel';
import MenuButton from './menuButton';
import { Color, ColorSpace } from './color';

const generateId = (() => {
    let autoInc = 0;
    return () => autoInc++;
})();

const App: React.FunctionComponent = () => {
    const [stripes, setStripes] = useState<{color: Color, id: any}[]>([]);
    const [selectedStripe, setSelectedStripe] = useState(NaN);
    const [colorSpace, setColorSpace] = useState<ColorSpace>('rgb');

    const getRandomColor = (): Color => ({
        r: Math.random() * 255,
        g: Math.random() * 255,
        b: Math.random() * 255,
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
                colorSpace={colorSpace}
                onItemHover={(itemIndex) => setSelectedStripe(itemIndex)}
            />
        </div>
        <div className="pageBottom">
            <button
                className="pageBottomItem"
                type="button"
                onClick={() => addStripe()}
            >
                Add
            </button>
            <div className="pageBottomItem">
                <MenuButton
                    text={`Color space: ${String(colorSpace.toUpperCase())}`}
                    menuItems={[{
                        text: 'RGB',
                        onClick: () => setColorSpace('rgb'),
                    }, {
                        text: 'HSL',
                        onClick: () => setColorSpace('hsl'),
                    }, {
                        text: 'HEX',
                        onClick: () => setColorSpace('hex'),
                    }]}
                />
            </div>
        </div>
        <div style={{position: 'absolute', top: '0.5em', right: '0.5em', boxShadow: '0 0 8px #000', borderRadius: '50%'}}>
            <ColorWheel
                items={stripes.map(stripe => stripe.color)}
                size='8em'
                highlightedItem={selectedStripe}
            />
        </div>
    </div>;
};

export default App;
