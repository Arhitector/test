import React from 'react'
import ReactDOM from 'react-dom/client'

import { ThemeProvider } from 'theme-ui'
import App from './App'
import { Provider } from './proxy/state';

import { theme } from './theme'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
)
