import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import HeroList from '../components/HeroList';
import HeroDetails from '../components/HeroDetails';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Switch>
                <Route path="/" component={HeroList} exact={true} />
                <Route path="/hero/:id" component={HeroDetails} />
            </Switch>
        </div>
    </BrowserRouter>
)

export default AppRouter;