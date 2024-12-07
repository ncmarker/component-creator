import React from 'react';
import ReactDOM from 'react-dom/client';
import "react-toastify/ReactToastify.css";
import './index.css';

import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import LoginSignup from './routes/LoginSignup';
import Root from './Root';
import { MyComponents } from './routes/MyComponents';
import { MyInspiration } from './routes/MyInspiration';
import { FindInspiration } from './routes/FindInspiration';
import { CreateComponent } from './routes/CreateComponent';

// populates the createcomponent page with the current component's data
function customizeComponentLoader() {
  const currentComponentId = sessionStorage.getItem('currentComponent') || null;

  if (!currentComponentId) {
    alert('Create a new component or begin editing a previous one in Home page.');
    return redirect('/mycomponents');
  }
  else {
    // GET /component_info/component_id 
    return fetch(`${process.env.REACT_APP_BACKEND_URL}/component_info/${currentComponentId}`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
  }
}


const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginSignup/>
  },
  {
    path: '/',
    element: <Root/>,
    children: [
      {
        path: '/mycomponents',
        element: <MyComponents/>
      },
      {
        path: '/myinspiration',
        element: <MyInspiration/>
      },
      {
        path: '/findinspiration',
        element: <FindInspiration/>
      },
      {
        path: '/createcomponent',
        element: <CreateComponent/>,
        loader: customizeComponentLoader
      }
    ]
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
