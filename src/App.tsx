import React, { useState, lazy, Suspense } from 'react';
import largeImg from '@/assets/imgs/large.png';
import smallImg from '@/assets/imgs/small.png';
import {Demo1, Demo2} from '@/components';
import '@/app.css';
import '@/app.less';

const PreFetchDemo = lazy(() => import(
    /* webpackPrefetch: true */
    /* webpackChunkName: "PreFetchDemo" */
    '@/components/PreFetchDemo'
    )); // 预加载

const PreloadDemo = lazy(() => import(
    /* webpackPreload: true */
    /* webpackChunkName: "PreloadDemo" */
    '@/components/PreloadDemo'
    )); // 预加载

const LazyDemo = lazy(() => import('@/components/LazyDemo')); // 懒加载

function App() {
    const [count, setCount] = useState(0);
    const [show, setShow] = useState(false);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCount(Number(e.target.value));
    }

    const onClick = () => {
        import('./app.css')
        setShow(true);
    }

    return (
        <>
            <h2 onClick={onClick}>on Show</h2>
            {show && (
                <>
                    <Suspense fallback={<div>loading...</div>}>
                        <PreloadDemo />
                    </Suspense>
                    <Suspense fallback={<div>loading...</div>}>
                        <PreFetchDemo />
                    </Suspense>
                </>
            )}
        </>
    )
}

export default App;
