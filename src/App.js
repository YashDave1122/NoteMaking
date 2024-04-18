import React from 'react';
// import Navbar from './Components/Navbar';
import { Auth0Provider } from '@auth0/auth0-react';
import './App.css';
import Navbar from './Components/Navbar';


function App() {
  return (
    <Auth0Provider
      domain="dev-eucn4cpbhpzb50cx.uk.auth0.com"
      clientId="VYPFqG68jXZQLG49gF7ithW4URxzXPAO"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <Navbar />
    </Auth0Provider>
  );
}

export default App;
