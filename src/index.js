import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import './index.css'
import App from './App'
import ScrollToTop from './ScrollToTop'

import store from './app/store'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <ScrollToTop>
      <Provider store={store}>
        <App />
      </Provider>
    </ScrollToTop>
  </BrowserRouter>
  // </React.StrictMode>
)

// https://pt.finalsite.com/school-websites/custom-design-portfolio
// https://mui.com/pt/material-ui/react-drawer/
// https://www.aism.co.mz/





// navegacao (programaticamente ativa/desativar link)
// error handling
// Dr. Jahit request

// can delete only his CV -----------------------------
// password automatic update problema  ------------------------------------
// form validation ----------------------------- (falta users)




// footer
// Team grid
// 'Not found'
// Dr. Jahit request

// Heruko