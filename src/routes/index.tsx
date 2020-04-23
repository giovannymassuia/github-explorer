import React from 'react';
import { Switch, Route, BrowserRouter, HashRouter } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Repository from '../pages/Repository';

const Routes: React.FC = () => (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/respositories/:repository+" component={Repository} />
    </Switch>
  </BrowserRouter>
);

// const Routes: React.FC = () => (
//   <HashRouter basename={process.env.PUBLIC_URL}>
//     <Switch>
//       <Route path="/" exact component={Dashboard} />
//       <Route path="/respositories/:repository+" component={Repository} />
//     </Switch>
//   </HashRouter>
// );

export default Routes;
