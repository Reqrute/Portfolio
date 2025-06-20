import { createRoot } from 'react-dom/client';
import Header from './components/header';
import './styles/main.css';
import HoverSidebar from './components/navigation';
import TicTacToe from './components/games/Tictactoe';
import SnakeGame from './components/games/Snake';
import SliderPuzzle from './components/games/Slider';
import HoverCards from './components/interactive/cards';



const App = () => {
  return <>
    <HoverSidebar/>
    <Header/>
    <TicTacToe/>
    <SnakeGame/>
    <SliderPuzzle/>
    <HoverCards/>
  </>;
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);