import { useState } from "react";

export default function HoverSidebar() {
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const items = [
    { label: "Up", href: "#home" },
    { label: "Games", href: "#about" },
    { label: "Interactive", href: "#services" },
    { label: "Tables", href: "#contact" },
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
