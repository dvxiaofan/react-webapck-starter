import React, { useState } from 'react';
import largeImg from './assets/imgs/large.png';
import smallImg from './assets/imgs/small.png';
import './App.css';
import './app.less';

function App() {
    const [count, setCount] = useState(0);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCount(Number(e.target.value));
    }

    return (
        <>
            <h2>888888</h2>
            <p>受控组件</p>
            <input type="text" value={count} onChange={onChange} />
            <br />

            <p>非受控组件</p>
            <input type="text"/>
        </>
    )
}

export default App;
