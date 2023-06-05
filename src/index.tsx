import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ConfigProvider } from '@vkontakte/vkui/dist/components/ConfigProvider/ConfigProvider'
import { AdaptivityProvider } from '@vkontakte/vkui/dist/components/AdaptivityProvider/AdaptivityProvider'
import { Provider } from 'react-redux'
import { persistor, store } from './store/store'
import { PersistGate } from 'redux-persist/integration/react'
import bridge from '@vkontakte/vk-bridge'

bridge.send('VKWebAppInit')

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <ConfigProvider>
    <AdaptivityProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
         <App />
        </PersistGate>
      </Provider>
    </AdaptivityProvider>
  </ConfigProvider>
)
