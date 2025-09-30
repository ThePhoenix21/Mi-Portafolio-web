import { useState, useEffect, useRef } from "react";

type TypewriterTextProps = {
  text: string;
  className?: string;       // estilos opcionales que se pasan desde fuera
  speed?: number;           // tiempo entre cada letra en ms
  baseClassName?: string;   // estilos base por defecto, combinables con className
};

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text = "", 
  baseClassName = "text-xl md:text-2xl text-muted-foreground leading-relaxed",
  className = "",          // estilos opcionales
  speed = 80,
}) => {
  const [displayText, setDisplayText] = useState("");
  const indexRef = useRef(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    setDisplayText("");
    indexRef.current = 0;

    intervalRef.current = window.setInterval(() => {
      if (indexRef.current < text.length) {
        const nextChar = text[indexRef.current] ?? "";
        setDisplayText((prev) => prev + nextChar);
        indexRef.current++;
      } else {
        if (intervalRef.current !== null) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
    }, speed);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [text, speed]);

  return <p className={`${baseClassName} ${className}`}>{displayText}</p>;
};
