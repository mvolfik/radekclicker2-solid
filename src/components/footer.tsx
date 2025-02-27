import { Component } from "solid-js";
import { restartProgress } from "../game";
import logo from "./../public/media/Radeksoft_logo.png";

export const Footer: Component = () => {
    return (
        <footer class="w-full bg-slate-200 flex flex-row p-3">
            <div class="flex flex-col w-1/2 pr-2">
                <p class="text-xs pb-1">Radekovy Yeny nelze směnit za jakoukoli jinou měnu</p>
                <p class="text-xs pb-1">Hraní je na vlastní nebezpečí</p>
                <p class="text-xs">v1.0</p>
            </div>
            <div class="flex flex-col w-1/2 pl-2">
                <a href="https://radeksoft.cz"><img src={logo} alt="Radeksoft logo"/></a>
                <p class="pb-2 text-xs">© Radeksoft 2022</p>
                <p class="text-xs underline" onClick={() => {
                    if (confirm("Tato akce nenávratně odstraní všechen tvůj postup. Klikni na 'Ok' jen pokud chceš začít úplně od začátku."))
                        restartProgress();  
                }}>Restart</p>
            </div>
        </footer>
    );
};