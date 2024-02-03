import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRoutes from './AppRoutes'
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './store'
import './tailwind-index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={AppRoutes()} />
    </Provider>
  </React.StrictMode>,
)
