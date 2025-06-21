import { useEffect, useRef, useState } from "react";

import "../styles/header.css"

export default function Header() {
  const originalText:string = "Welcome to the page";

  const [value, setValue] = useState<null | string>(originalText); 
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const interval = useRef<number | null>(null);

  const handleOver = () => {
    let iteration = 0;
   

    if (interval.current) {
      clearInterval(interval.current);
    }

    interval.current = window.setInterval(() => {
      setValue(originalText
        .split("")
        .map((_, index) => {
          if (index < iteration) {
            return originalText[index];
          }

          return letters[Math.floor(Math.random() * letters.length)];
        })
        .join("")
    ) 

      if (iteration >= originalText.length) {
        clearInterval(interval.current!);
        interval.current = null;
      }

      iteration += 1 / 1.5;
    }, 30);
  };

    useEffect(() => {
    return () => {
      if (interval.current) clearInterval(interval.current);
    };
  }, []);

  return (
    <div className="container" id="head">
      <h1 className="hackedHeader" onMouseOver={handleOver}>
        {value}
      </h1>
    </div>
  );
}
