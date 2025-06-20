import { useState } from "react";
import "../../styles/cards.css";

const cardsData = [
  {
    title: "Apartments",
    description: "Places to be apart. Wait, what?",
    emoji: "🏢",
  },
  {
    title: "Unicorns",
    description: "A single corn. Er, I mean horn.",
    emoji: "🦄",
  },
  {
    title: "Blender Phones",
    description: "These absolutely deserve to exist.",
    emoji: "📞",
  },
  {
    title: "Adios",
    description: "See you...",
    emoji: "👋",
  },
  {
    title: "I mean hello",
    description: "...over here.",
    emoji: "🙋",
  },
  {
    title: "Otters",
    description: "Look at me, imma cute lil fella.",
    emoji: "🦦",
  },
];

export default function HoverCards() {
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const cards = e.currentTarget.querySelectorAll<HTMLElement>(".card");
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div id="cards" onMouseMove={handleMouseMove}>
      {cardsData.map((card, index) => (
        <div key={index} className="card">
        <div className="card-border-glow"></div>
          <div className="card-content">
            <div className="card-image">
              <span className="emoji" role="img" aria-label="icon">{card.emoji}</span>
            </div>
            <div className="card-info-wrapper">
              <div className="card-info">
                <span className="emoji small" role="img" aria-label="icon">{card.emoji}</span>
                <div className="card-info-title">
                  <h3>{card.title}</h3>
                  <h4>{card.description}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
