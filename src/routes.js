import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import RegisterUser from './pages/RegisterUser';
import Profile from './pages/Profile';
import ProfileUser from './pages/ProfileUser';
import NewIncident from './pages/NewIncident';
import NewPublication from './pages/NewPublication';
import UpdateIncident from './pages/UpdateIncident';
import Publications from './pages/Publications';
import PublicationsUser from './pages/PublicationsUser';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/register" component={Register} />
                <Route path="/registerUser" component={RegisterUser} />
                <Route path="/profile" component={Profile} />
                <Route path="/publications" component={Publications} />
                <Route path="/publicationsUser" component={PublicationsUser} />
                <Route path="/profileUser" component={ProfileUser} />
                <Route path="/pubs/new" component={NewPublication} />
                <Route path="/posts/new" component={NewIncident} />
                <Route path="/posts/update" component={UpdateIncident} />
            </Switch>
        </BrowserRouter>
    );
}