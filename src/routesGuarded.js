import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';


import SampleComponent from './components/SampleComponent/SampleComponent';
import SampleRoute from './components/SampleRoute/SampleRoute';

const guardedRoutes =  (
    <div>
      <Switch>
        <Redirect from="/" to="sample_route" />
        <Route exact path="/" component={SampleComponent}/>
        <Route exact path="/sample_route" component={SampleRoute}/>
        <Route exact path="/:paramsId" component={SampleComponent}/>
      </Switch>
    </div>
);


export {
  guardedRoutes,
}
