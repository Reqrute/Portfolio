import { createRoot } from 'react-dom/client';
import Header from './components/header';
import './styles/main.css';
import HoverSidebar from './components/navigation';
import TicTacToe from './components/games/Tictactoe';


const App = () => {
  return <>
    <HoverSidebar/>
    <Header/>
    <TicTacToe/>
  </>;
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);