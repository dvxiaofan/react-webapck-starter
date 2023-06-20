import React, { useState } from 'react';
import largeImg from '@/assets/imgs/large.png';
import smallImg from '@/assets/imgs/small.png';
import { Demo1, Demo2 } from '@/components';
import '@/app.css';
import '@/app.less';

function App() {
    const [count, setCount] = useState(0);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCount(Number(e.target.value));
    }

    return (
        <>
            <div className='smallImg'></div>
            <div className='largeImg'></div>
        </>
    )
}

export default App;
