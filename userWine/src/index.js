import React from 'react';
import ReactDOM from 'react-dom';
import UserWine from "./UserWine";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<UserWine />, document.querySelector("#root"))

serviceWorker.unregister();