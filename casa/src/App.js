import React from 'react';

import { Title, Spring, Summer, Fall, Winter } from './pages';
import { useRoutes } from 'react-router-dom';
import { useState } from 'react';


function App() {
  const [ userId, setUserId ]= useState("");

  const element = useRoutes([
    { path: '/CASAverse', element: <Title/>},
    { path: '/CASAverse/spring', element: <Spring/>},
    { path: '/CASAverse/summer', element: <Summer/>},
    { path: '/CASAverse/fall', element: <Fall/>},
    { path: '/CASAverse/winter', element: <Winter/>},
  ]);

  return element;
}

export default App;
