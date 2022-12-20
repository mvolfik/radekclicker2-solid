import { Component, createSignal } from 'solid-js';
import { radekCount, setRadekCount, radeksPerSecond, setRadeksPerSecond, setWorkerCount, workerCount } from '../game';
import { WORKERS } from '../workers';

// BRUH
export type WorkerProps = {
    worker: typeof WORKERS[0],
    index: number,
};

export const Worker: Component<WorkerProps> = props => {
    const {
        name,
        text,
        img,
        rps,
        cost,
    } = props.worker;
    const index = props.index;

    const buyMe = () => {
        if (!buyable())
            return;

        setRadekCount(radekCount() - calculateCost());
        setRadeksPerSecond(radeksPerSecond() + rps);

        const a = workerCount();
        a[index] += 1;

        setWorkerCount(a);
    };

    const currentWorkers = () => workerCount()[index];

    const calculateCost = () => cost * Math.floor(Math.pow(1.2, currentWorkers()/2));

    const buyable = () => radekCount() >= calculateCost();

    const [anim, setAnim] = createSignal(false);

    const textOverflow = (n: number) => {
        if (n < 100)
            return n.toFixed(1);
        
        n = Math.floor(n);
    
        if (n < 9_000)
            return n.toString();
        else if (n < 999_000)
            return `${(n / 1_000).toFixed(1)} tisíc`;
        else if (n < 999_000_000)
            return `${(n / 1_000_000).toFixed(2)} milionů`;
        else if (n < 999_000_000_000)
            return `${(n / 1_000_000_000).toFixed(2)} miliard`;
        else if (n < 999_000_000_000_000)
            return `${(n / 1_000_000_000_000).toFixed(2)} bilionů`;
        else if (n < 999_000_000_000_000_000)
            return `${(n / 1_000_000_000_000_000).toFixed(2)} kvadrilionů`;
        else
            return 'kurva hodně';
    }

    return (
        <div class='flex flex-row border-4 border-slate-300 items-center rounded-2xl bg-slate-200 shadow-md'>
            <img src={img} alt="RADEK" class='relative m-3 rounded-lg overflow-hidden w-40' />
            <div class='flex flex-col w-full pr-3'>
                <div class='pr-3'>
                    <div class='flex flex-row justify-between'>
                        <div class='flex flex-col mt-3'>
                            <h3 class='font-bold'>{name}</h3>
                            <p class='text-gray-800 text-xs font-extrabold -mt-1 pb-1'>{rps} R/s</p>
                        </div>
                        <div class='mt-4'>
                            <p class='my-auto text-slate-800'>{currentWorkers()}x</p>
                        </div>
                    </div>
                    <p class='text-sm truncate'>{text}</p>
                </div>
                
                <button class={`border shadow my-3 p-1 rounded-xl mx-auto w-full bg-gradient-to-br from-[#79c4ee]/[.8] to-[#6a81b5]/[.8] opacity-40 ${!buyable() && 'cursor-default'} ${buyable() && 'opacity-100 hover:bg-blue-400 '} ${anim() && 'animate-button'}`} onClick={() => {
                        buyMe();
                        setAnim(true);
                    }} onAnimationEnd={() => setAnim(false)}>

                    <span class='font-extrabold'>{textOverflow(calculateCost())} R</span>
                </button>
            </div>
        </div>
    )
};
