import { createRoot } from 'react-dom/client';
import Header from './components/header';
import './styles/main.css';
import HoverSidebar from './components/navigation';

const App = () => {
  return <>
    <HoverSidebar/>
    <Header/>
  </>;
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);