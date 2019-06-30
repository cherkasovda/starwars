import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/app';

ReactDOM.render(<App />, document.getElementById('root'));

function mnb(x, y) {
    return x * y;
}
let result = mnb(5, 10);
console.log(result);  