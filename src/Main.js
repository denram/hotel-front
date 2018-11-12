import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Hospede from './Hospede';

const Main = () => {
   return <main>
      <Switch>
        <Route exact path={'/'} component={Hospede}/>
      </Switch>
    </main>
};
  
export default Main;