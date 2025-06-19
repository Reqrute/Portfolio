import { createRoot } from 'react-dom/client';
import Header from './components/header';
import './styles/main.css';
import HoverSidebar from './components/navigation';
import TicTacToe from './components/games/Tictactoe';
import SnakeGame from './components/games/Snake';
import SliderPuzzle from './components/games/Slider';


const App = () => {
  return <>
    <HoverSidebar/>
    <Header/>
    <TicTacToe/>
    <SnakeGame/>
    <SliderPuzzle/>
  </>;
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);