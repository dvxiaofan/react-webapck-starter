import React, {useState, lazy, Suspense} from 'react';
import largeImg from '@/assets/imgs/large.png';
import smallImg from '@/assets/imgs/small.png';
import {Demo1, Demo2} from '@/components';
import '@/app.css';
import '@/app.less';

const LazyDemo = lazy(() => import('@/components/LazyDemo')); // 懒加载

function App() {
    const [count, setCount] = useState(0);
    const [show, setShow] = useState(false);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCount(Number(e.target.value));
    }

    const onClick = () => {
        import('./app.css')
        setShow(!show);
    }

    return (
        <>
            <h2 onClick={onClick}>on Show</h2>
            {show && <Suspense fallback={<div>loading...</div>}> <LazyDemo/>
            </Suspense>}
        </>
    )
}

export default App;
