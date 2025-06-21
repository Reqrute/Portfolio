import React, { useEffect, useState } from 'react';
import '../../styles/slider-elem.css';

const slides = [
  {
    title: 'Slide 1',
    text: 'This is the first slide.',
    img: 'https://images.unsplash.com/photo-1538998073820-4dfa76300194?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Slide 2',
    text: 'This is the second slide.',
    img: 'https://images.unsplash.com/photo-1447875569765-2b3db822bec9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Slide 3',
    text: 'This is the third slide.',
    img: 'https://images.unsplash.com/photo-1598896824620-05d70c4dd6ec?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

const Slider: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [blinkKey, setBlinkKey] = useState(0);

  const goTo = (newIndex: number) => {
    const wrappedIndex = (newIndex + slides.length) % slides.length;
    setIndex(wrappedIndex);
    setBlinkKey((prev) => prev + 1); 
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goTo(index - 1);
      if (e.key === 'ArrowRight') goTo(index + 1);
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [index]); 

  return (
    <div className="sb-slider">
      <div className="sb-slide" key={blinkKey}>
        <h2>{slides[index].title}</h2>
        <img src={slides[index].img} alt={slides[index].title} />
        <p>{slides[index].text}</p>
      </div>

      <div className="sb-controls">
        <button className="sb-btn" onClick={() => goTo(index - 1)}>
          &larr;
        </button>
        <button className="sb-btn" onClick={() => goTo(index + 1)}>
          &rarr;
        </button>
      </div>

      <div className="sb-steps">
        {slides.map((_, i) => (
          <span key={i} className={`sb-dot ${i === index ? 'sb-active' : ''}`} />
        ))}
      </div>
    </div>
  );
};

export default Slider;
