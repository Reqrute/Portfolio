import React from 'react';
import '../../styles/accordion.css';

const characters = [
  {
    title: 'Luffy',
    img: 'https://i.pinimg.com/736x/d9/9e/aa/d99eaa8760e73d13b835acecbf5fe888.jpg',
  },
  {
    title: 'Zorro',
    img: 'https://avatars.mds.yandex.net/i?id=77b36da19016d0ce00c0a09e286be6612feb75ca-4353628-images-thumbs&n=13',
  },
  {
    title: 'Sanji',
    img: 'https://avatars.mds.yandex.net/i?id=4c415d47449ae8613e8f6a355be6ac0d_l-5339089-images-thumbs&n=13',
  },
  {
    title: 'Jinbe',
    img: 'https://i.pinimg.com/736x/d8/47/97/d8479727f639c8f991533a9896a042a9.jpg',
  },
  {
    title: 'Brook',
    img: 'https://avatars.mds.yandex.net/i?id=be0c1e4cbcb3963c249384dd88794e24_l-12361708-images-thumbs&n=13',
  },
];

const Accordion: React.FC = () => {
  return (
    <div className="pers-container" id="accordion">
      {characters.map((pers, idx) => (
        <div className="pers-card" key={idx}>
          <img src={pers.img} alt={pers.title} />
          <div className="pers-card__head">{pers.title}</div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
