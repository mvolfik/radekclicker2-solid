import type { Component } from 'solid-js';
import { Footer } from './components/footer';
import { Header } from './components/header';
import { Leaderboard } from './components/leaderboard';

import { RadekButton } from './components/radek-button';
import { RadekCount } from './components/radek-count';
import { Shop } from './components/shop';

const App: Component = () => {
    return (
        <div class='bg-gradient-to-br from-[#79c4ee]/[.8] to-[#6a81b5]/[.8] pt-2'>
            <Header />
            <div class="flex flex-col flex-nowrap items-center justify-start gap-10 py-2 min-h-screen pb-40">
                <RadekCount />
                <RadekButton />
                <Leaderboard />
                <Shop />
            </div>
            <Footer />
        </div>
    );
};

export default App;
