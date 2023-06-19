import React, { useState } from 'react';
import largeImg from '@/assets/imgs/large.png';
import smallImg from '@/assets/imgs/small.png';
import '@/app.css';
import '@/app.less';

function App() {
    const [count, setCount] = useState(0);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCount(Number(e.target.value));
    }

    return (
        <>
            <img src={smallImg} alt="小于10kb的图片" />
            {/*<img src={largeImg} alt="大于于10kb的图片" />*/}
            {/*<div className='smallImg'></div> /!* 小图片背景容器 *!/*/}
            {/*<div className='bigImg'></div> /!* 大图片背景容器 *!/*/}
        </>
    )
}

export default App;
