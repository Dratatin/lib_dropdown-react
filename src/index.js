import React from 'react';
import ReactDOM from 'react-dom/client';
import { Dropdown } from './lib/index';
import "./demostyle.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className="demo">
      <Dropdown options={["option1", "option2", "option3", "option4", "option5"]} value={"option1"} name="dropdown-demo" />
    </div>
  </React.StrictMode>
);
