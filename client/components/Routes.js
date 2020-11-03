// LIBRARIES
import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

// FILES
import AllArtwork from './AllArtwork';
import SingleArtwork from './SingleArtwork'
import LoginScreen from './LoginScreen'
import NewUser from './NewUser'
import Navbar from './Navbar'
import Account from './Account'
import Users from './Users'
import Cart from './Cart'
import ReviewForm from './ReviewForm'

const Routes = () => {
  return (
    <Router>
      <div>
        <Navbar/>
        <Switch>
          <Route exact path="/" component={AllArtwork} />
          <Route exact path="/artworks/:id" component={SingleArtwork} />
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/newuser" component={NewUser} />
          <Route exact path="/account" component={Account} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/review/:id" component={ReviewForm} />
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;

