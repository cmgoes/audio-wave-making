import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

// ** Redux Imports
import { Provider } from 'react-redux'
import { store } from './redux/storeConfig/store'

import "assets/scss/material-kit-react.scss?v=1.10.0";

// pages for this product
import Home from "views/Home";

var hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
