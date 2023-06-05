import React from 'react';
import largeImg from './assets/imgs/large.png';
import smallImg from './assets/imgs/small.png';
import './App.css';
import './app.less';

function App() {
    return <div>
        <img src={largeImg} alt="large" />
        <img src={smallImg} alt="small" />
        <div className='smallImg' />
        <div className='largeImg' />
    </div>;
}

export default App;
