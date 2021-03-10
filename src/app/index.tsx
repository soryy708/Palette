import React, { useState } from 'react';
import Stripes from './stripes';
import ColorWheel from './wheel';
import { Color } from './color';

const App: React.FunctionComponent = () => {
    const [colors, setColors] = useState<Color[]>([]);

    return <div className="page flexColumn">
        <div className="pageTop flexColumn">
            <Stripes
                items={colors}
                onRemove={itemIndex => {
                    const item = colors[itemIndex];
                    setColors(prevColors => {
                        const index = prevColors.findIndex(it => it === item);
                        if (index === -1) {
                            return prevColors;
                        }
                        return [...prevColors.slice(0, index), ...prevColors.slice(index + 1)];
                    });
                }}
            />
        </div>
        <div className="pageBottom">
            <button
                type="button"
                onClick={() => {
                    setColors(prevColors => [...prevColors, {
                        r: Math.floor(Math.random() * 255),
                        g: Math.floor(Math.random() * 255),
                        b: Math.floor(Math.random() * 255),
                    }]);
                }}
                style={{width: '100%'}}
            >
                Add
            </button>
            <ColorWheel
                items={colors}
                size='8em'
            />
        </div>
    </div>;
};

export default App;
