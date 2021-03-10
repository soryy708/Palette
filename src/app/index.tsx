import React, { useState } from 'react';
import Stripes from './stripes';
import ColorWheel from './wheel';
import { Color } from './color';

const App: React.FunctionComponent = () => {
    const [stripes, setStripes] = useState<{color: Color, id: any}[]>([]);

    const generateId = (() => {
        let autoInc = 0;
        return () => autoInc++;
    })();
    const getRandomColor = (): Color => ({
        r: Math.floor(Math.random() * 255),
        g: Math.floor(Math.random() * 255),
        b: Math.floor(Math.random() * 255),
    });

    return <div className="page flexColumn">
        <div className="pageTop flexColumn">
            <Stripes
                items={stripes}
                onRemove={itemIndex => {
                    const item = stripes[itemIndex];
                    setStripes(prevStripes => {
                        const index = prevStripes.findIndex(it => it.id === item.id);
                        if (index === -1) {
                            return prevStripes;
                        }
                        return [...prevStripes.slice(0, index), ...prevStripes.slice(index + 1)];
                    });
                }}
                onReroll={itemIndex => {
                    const item = stripes[itemIndex];
                    setStripes(prevStripes => {
                        const index = prevStripes.findIndex(it => it === item);
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
                }}
            />
        </div>
        <div className="pageBottom">
            <button
                type="button"
                onClick={() => {
                    setStripes(prevStripes => [...prevStripes, {
                        id: generateId(),
                        color: getRandomColor(),
                    }]);
                }}
                style={{width: '100%'}}
            >
                Add
            </button>
            <ColorWheel
                items={stripes.map(stripe => stripe.color)}
                size='8em'
            />
        </div>
    </div>;
};

export default App;
