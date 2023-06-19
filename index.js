import { createRoot } from 'react-dom/client';

import ItemList from './frontend/ItemList';

import './styles.css';

const App = () => {
    return (
        <ItemList/>
    );
}

const root = createRoot(document.getElementById('root'));
root.render(
    <App/>
)
