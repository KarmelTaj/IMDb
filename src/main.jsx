import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Home from './components/Home/Home.jsx';
import Login from './components/Login/Login.jsx'
import SignUp from './components/SignUp/SignUp.jsx';
import ErrorPage from './components/error-page.jsx';
import MovieDetailsPage, { loader as movieDetailsPageLoader } from './components/Movies/MovieDetailsPage.jsx';
import './index.css'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/movies/:movieID",
    element: <MovieDetailsPage />,
    loader: movieDetailsPageLoader,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/movies/:movieID/rate-movie",
        errorElement: <ErrorPage />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
