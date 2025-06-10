import { createRoot } from 'react-dom/client';

const App = () => <h1>Hello, world!</h1>;

createRoot(document.getElementById('root')!).render(<App />);