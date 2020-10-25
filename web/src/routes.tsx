import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Landing from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap';
import CreateOrphanage from './pages/CreateOrphanage';
import Orphanage from './pages/Orphanage';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing}></Route>
                <Route path="/app" component={OrphanagesMap}></Route>
                <Route path="/orphanages/create" component={CreateOrphanage}></Route>
                <Route path="/orphanage/:id" component={Orphanage}></Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;