/** @jsx jsx */

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import New from './routes/New';
import PlayerBoard from './routes/PlayerBoard';
import AddWord from './routes/AddWord';
import { jsx } from '@emotion/core';
import Home from './routes/Home';
import { scale } from './style/scale';

const serif = 'Work Sans, system-ui, Helvetica, Arial, sans-serif !important';

const universalStyles = scale({
  fontFamily: serif,
  button: {
    fontFamily: serif
  }
});

export default function App() {
  return (
    <div css={universalStyles}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/new">
            <New />
          </Route>
          <Route path="/board/:id">
            <PlayerBoard />
          </Route>
          <Route path="/words/add">
            <AddWord />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
