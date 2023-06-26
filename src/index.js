import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './Apps';
import Login from './components/Login';

const port = 8080; // Ganti dengan port yang Anda inginkan

ReactDOM.render(
  <h1>TEST HOSTING</h1>,
  document.getElementById('root')
);

// ReactDOM.render(
//   <React.StrictMode>
//     <div id="root">
//       <Login />
//     </div>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

