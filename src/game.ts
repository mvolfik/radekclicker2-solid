import { createEffect, createSignal } from "solid-js";
import { WORKERS } from "./workers";

const createLocalStorageNumberSignal = (key: string, defaultValue: number, saveOnChange: boolean) => {
    const loaded = localStorage.getItem(key);
    let first: number;
    if (!loaded) {
        first = defaultValue;
    } else {
        first = Number.parseFloat(loaded);
    }

    const theSignal = createSignal(first);

    if (saveOnChange) {
        createEffect(() => {
            const [signalValue] = theSignal;
            localStorage.setItem(key, signalValue().toString());
        });
    }

    return theSignal;
};

const createLocalStorageNumberArraySignal = (key: string, defaultValue: number[]) => {
    const loaded = localStorage.getItem(key);
    let first: number[];

    if (!loaded) {
        first = defaultValue;
    } else {
        first = stringToArray(loaded);
    }

    const theSignal = createSignal(first, { equals: false });

    createEffect(() => {
        const [signalValue] = theSignal;
        localStorage.setItem(key, arrayToString(signalValue()));
    });

    return theSignal;
};

const arrayToString = (array: number[]) => {
    return array.join(';');
}

const stringToArray = (s: string) => {
    return s.split(';').map(x => Number.parseFloat(x));
}

export const textOverflow = (n: number) => {
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

export const wordForm = (pocet: number, slova: [string, string, string]) => {
    pocet = Math.abs(pocet);

    if (pocet == 1)
        return slova[0];

    if (pocet < 5 && pocet > 0)
        return slova[1];

    return slova[2];
};

export const [radeksPerSecond, setRadeksPerSecond] = createLocalStorageNumberSignal('radeksPerSecond', 0, false);
export const [radekCount, setRadekCount] = createLocalStorageNumberSignal('radekCount', 0, false);
export const [workerCount, setWorkerCount] = createLocalStorageNumberArraySignal('workerCount', new Array(WORKERS.length).fill(0));
export const [radeksPerClick, setRadeksPerClick] = createLocalStorageNumberSignal('radeksPerClick', 1, true);

const fps = 25;

setInterval(() => {
    setRadekCount(radekCount() + radeksPerSecond() / fps);
}, 1000/fps);

/*
Debug in DevTools with code below.
(absolute value of) wrongPerc should be as low as possible
about 0.004 (0.4 %) on Marian's ThiccPad
TODO: test on phone

setRadeksPerSecond(12345567)
startCount = radekCount()
setTimeout(() => {
   let newCount = radekCount()
   console.log('nC', newCount)
   let diff = newCount - startCount
   console.log('diff', diff)
   let diffPS = diff / 10
   console.log('diffPS', diffPS)
   let wrongPerc = 1 - (diff / (radeksPerSecond()*20))
   console.log('wrongPerc', wrongPerc)
}, 20000)
 */

setInterval(() => {
    console.log('storing to LS', radeksPerSecond(), radekCount());
    localStorage.setItem('radeksPerSecond', radeksPerSecond().toString());
    localStorage.setItem('radekCount', radekCount().toString());
}, 1500);

setInterval(() => {
    console.log('sending radekCount', radekCount());
}, 5000);


const exportToWindow = (obj: {[key: string]: any}) => {
    for (const key in obj) {
        window[key] = obj[key];
    }
}

export const restartProgress = () => {
    setRadekCount(0);
    setRadeksPerSecond(0);
    setRadeksPerClick(1);
    setWorkerCount(new Array(WORKERS.length).fill(0));
}

if (import.meta.env.DEV) {
    exportToWindow({
        radekCount,
        setRadekCount,
        radeksPerSecond,
        setRadeksPerSecond,
        restartProgress,
        workerCount,
        setWorkerCount,
        radeksPerClick,
        setRadeksPerClick,
    });
}
