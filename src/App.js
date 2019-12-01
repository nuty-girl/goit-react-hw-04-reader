import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import styles from './App.module.css';
import routes from './routes';
import Reader from './Components/Reader/Reader';
import publications from './path/to/publications.json';

const App = () => (
  <BrowserRouter>
    <div className={styles.App}>
      <Switch>
        <Route
          exact
          path={routes.READER}
          // eslint-disable-next-line react/jsx-props-no-spreading
          render={props => <Reader {...props} items={publications} />}
        />
        <Redirect to={routes.FIRST_PAGE} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
