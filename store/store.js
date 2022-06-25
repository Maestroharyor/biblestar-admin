import { applyMiddleware, createStore } from 'redux';
import { persistReducer } from 'redux-persist';
import { persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './rootReducer';

const bindMiddleware = middleware => {
    if (process.env.NODE_ENV !== 'production') {
        const { composeWithDevTools } = require('redux-devtools-extension');
        return composeWithDevTools(applyMiddleware(...middleware));
    }
    return applyMiddleware(...middleware);
};

const persistConfig = {
    key: 'bible-star',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
            persistedReducer,
        );

export const persistor = persistStore(store); 