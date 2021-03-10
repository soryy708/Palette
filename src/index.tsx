import React from 'react';
import ReactDom from 'react-dom';
import './style/style.scss'; // eslint-disable-line import/no-unassigned-import

const App: React.FunctionComponent = () => {
    return <h1>Hello World!</h1>;
};

ReactDom.render(<App/>, document.getElementById('root'));
