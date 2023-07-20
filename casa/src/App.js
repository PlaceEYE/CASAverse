import React from 'react';

import { Title, Spring, Summer, Fall, Winter } from './pages';
import { useRoutes } from 'react-router-dom';
import { useState } from 'react';


function App() {
  const [ userId, setUserId ]= useState("");

  const element = useRoutes([
    { path: '/', element: <Title/>},
    { path: '/spring', element: <Spring/>},
    { path: '/summer', element: <Summer/>},
    { path: '/fall', element: <Fall/>},
    { path: '/winter', element: <Winter/>},
  ]);

  return element;
}

export default App;
