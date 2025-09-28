import { useState, useEffect } from "react";

export type AnimatedTextType = {
    phrases: string[];
    index: number; // índice actual de la frase a mostrar
    onAnimationEnd?: () => void; // callback para avisar que terminó
}

// Todos los caracteres del teclado (mayúsculas, minúsculas, símbolos y números)
const chars = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~¡!¿?/|°`;

export const AnimatedText: React.FC<AnimatedTextType> = ({ phrases, index, onAnimationEnd }) => {
    const [displayText, setDisplayText] = useState(phrases[index] || "");

    // Animación gradual
    const scrambleTo = (newText: string) => {
        let current = displayText.split("");
        let target = newText.split("");
        let visibleLength = current.length;
        let frame = 0;

        const maxChanges = 50;
        const minChanges = 12;

        const startDelayMin = 5;  // mínimo 10 frames sin moverse
        const startDelayMax = 40;  // máximo 20 frames sin moverse

        const startDelays: number[] = [];
        const changes: number[] = [];

        for (let i = 0; i < Math.max(current.length, target.length); i++) {
            startDelays[i] = Math.floor(Math.random() * (startDelayMax - startDelayMin + 1)) + startDelayMin;
            changes[i] = Math.floor(Math.random() * (maxChanges - minChanges + 1)) + minChanges;
        }

        const interval = setInterval(() => {
            frame++;

            //incrementamos la longitud del array segun si el nuevo array es más o menos largo
            if (visibleLength < target.length && frame % 2 === 0) {
                visibleLength++;
                current.push(chars[Math.floor(Math.random() * chars.length)]);
            }
            if (visibleLength > target.length && frame % 3 === 0) {
                visibleLength--;
                current.pop();
            }

            // Cambiar caracteres gradualmente
            for (let i = 0; i < visibleLength; i++) {
                // Espacios fijos
                if (target[i] === " ") {
                    current[i] = " ";
                    continue;
                }

                // Antes de su turno, mostramos el carácter viejo tal cual
                if (frame < startDelays[i]) {
                    continue;
                }

                // Cuando llega su turno, pero aún no ha terminado su cambio
                if (frame < startDelays[i] + changes[i]) {
                    current[i] = chars[Math.floor(Math.random() * chars.length)];
                } 
                // Cuando ya terminó su cambio
                else {
                    current[i] = target[i] || "";
                }
            }

            setDisplayText(current.join(""));

            // Terminar animación cuando coincidan
            if (current.join("") === target.join("")) {
                clearInterval(interval);
                onAnimationEnd?.(); // avisamos que terminó
            }
        }, 65); // Velocidad general del cambio
    };

    useEffect(() => {
        scrambleTo(phrases[index]);
    }, [index]);

    return (
        <span className="text-xs w-full font-mono tracking-wider text-green-500 leading-tight flex justify-start pt-2">
        {displayText}
        </span>
    );
};
