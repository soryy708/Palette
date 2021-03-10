import React, { useState } from 'react';
import Stripes from './stripes';
import { Color } from './color';

const App: React.FunctionComponent = () => {
    const [stripes, setStripes] = useState<{color: Color}[]>([]);

    return <div className="page flexColumn">
        <div className="pageTop flexColumn">
            <Stripes
                items={stripes}
                onRemove={itemIndex => {
                    const item = stripes[itemIndex];
                    setStripes(prevStripes => {
                        const index = prevStripes.findIndex(it => it === item);
                        if (index === -1) {
                            return prevStripes;
                        }
                        return [...prevStripes.slice(0, index), ...prevStripes.slice(index + 1)];
                    });
                }}
            />
        </div>
        <div className="pageBottom">
            <button
                type="button"
                onClick={() => {
                    setStripes(prevStripes => [...prevStripes, {color: {
                        r: Math.floor(Math.random() * 255),
                        g: Math.floor(Math.random() * 255),
                        b: Math.floor(Math.random() * 255),
                    }}]);
                }}
                style={{width: '100%'}}
            >
                Add
            </button>
        </div>
    </div>;
};

export default App;
