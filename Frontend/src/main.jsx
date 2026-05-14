import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from '../src/pages/Home'
import Landing from './pages/Landing'
import Login from './pages/Login'
import SignUp from './pages/SignUp.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { Provider } from 'react-redux'
import store from './Store/Store'
import PrivateRoute from './middleware/PrivateRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Landing />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <SignUp />
      },
      {
        path: '/Home',
        element:
          <PrivateRoute>
            <Home />
          </PrivateRoute>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
