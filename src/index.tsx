import 'antd/dist/reset.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import App from './App';
import './index.css';
import store from './lib/store';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);

reportWebVitals();
