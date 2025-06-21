import { useState } from "react";

import "../styles/navigation.css"

export default function HoverSidebar() {
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const items = [
    { label: "Begin", href: "#head" },
    { label: "TicTacToe", href: "#TicTacToe" },
    { label: "Snake game", href: "#snake" },
    { label: "Slider game", href: "#slider-game" },
    { label: "Cards", href: "#cards" },
    { label: "Slider", href: "#slider" },
    { label: "Accordion", href: "#accordion" },
  ];

  return (
    <div
      className="hover-zone"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => {
        setVisible(false);
        setActiveIndex(null);
      }}
    >
      <aside className={`sidebar ${visible ? "show" : ""}`}>
        <div id="menu" data-active-index={activeIndex ?? undefined}>
          <div id="menu-items">
            {items.map((item, index) => (
              <a
                key={item.label}
                className="menu-item"
                href={item.href}
                onMouseOver={() => setActiveIndex(index)}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div id="menu-background-pattern"></div>
          <div id="menu-background-image"></div>
        </div>
      </aside>
    </div>
  );
}
