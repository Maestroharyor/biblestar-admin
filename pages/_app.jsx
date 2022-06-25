import React, {useEffect} from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {store, persistor} from '../store/store';
import MasterLayout from '../components/layouts/MasterLayout';
import 'antd/dist/antd.css';
import 'tailwindcss/tailwind.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
    <Provider store={store}>
      <MasterLayout>
        <Component {...pageProps} />
      </MasterLayout>
    </Provider>
  );
}

export default MyApp
