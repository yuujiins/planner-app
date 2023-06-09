// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom/client';
import './stylesheet/application.scss';
import {BrowserRouter} from "react-router-dom";
import App from "../app";


document.addEventListener('DOMContentLoaded', () => {
  const root = ReactDOM.createRoot(document.getElementById('root'))

  root.render(
    <React.StrictMode>

      <BrowserRouter>
            <App/>
      </BrowserRouter>
    </React.StrictMode>
  );
})
