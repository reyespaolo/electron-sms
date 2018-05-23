import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import asyncComponent from './hoc/AsyncComponent';
// const AsyncSampleRoute = asyncComponent(()=> import('./components/SampleRoute/SampleRoute'))
// const AsyncSampleComponent = asyncComponent(()=> import('./components/SampleComponent/SampleComponent'))
import Modem from './containers/Modem/Modem';
import SendSMS from './containers/SendSMS/SendSMS';


const mainRoute =  (
    <div>
      <Switch>
        <Route exact path="/" component={Modem}/>
        <Route exact path="/modem" component={Modem}/>
        <Route exact path="/sendsms" component={SendSMS}/>

        <Route render={() => <h1>Not Found</h1>}/>
        {/* <Route exact path="/:paramsId" component={SampleComponent}/> */}
        {/* <Redirect from="/" to="sample_route" /> */}
      </Switch>
    </div>
);

export {
  mainRoute,
}

// import AsyncSampleRoute from './components/SampleRoute/SampleRoute';
// import AsyncSampleComponent from './components/SampleComponent/SampleComponent';
