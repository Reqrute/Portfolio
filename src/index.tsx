import { createRoot } from 'react-dom/client';
import Header from './components/header';
import './styles/main.css';

const App = () => {
  return <>
    <Header/>
  </>;
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);