import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './components/Login.jsx';
import Register from './components/Register.jsx/index.js';
import UserIndex from './components/UserIndex';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import EditPassword from './components/EditPassword';
import Reset from './components/Reset';
import DocumentIndex from './components/DocumentIndex';
import CreateDocument from './components/CreateDocument';
import EditDocument from './components/EditDocument';
import DocumentDetail from './components/DocumentDetail';
import EditFile from './components/EditFile';
import Mengajukan from './components/Mengajukan';
import Diajukan from './components/Diajukan.jsx';
import CreateSignature from './components/CreateSignature';
import SignDocument from './components/SignDocument';
import UserSignDetail from './components/UserSignDetail';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login2" component={Login} />
        <Route path="/register2" component={Register} />
        <Route path="/users2" component={UserIndex} />
        <Route path="/profile2" component={Profile} />
        <Route path="/user2/:user_id" component={EditProfile} />
        <Route path="/change2/:user_id" component={EditPassword} />
        <Route path="/reset2" component={Reset} />
        <Route path="/dokumen2/index" component={DocumentIndex} />
        <Route path="/dokumen2/create" component={CreateDocument} />
        <Route path="/document2/:document_id" component={EditDocument} />
        <Route path="/dokumen2/:dokument" component={DocumentDetail} />
        <Route path="/fileDoc2/:document_id" component={EditFile} />
        <Route path="/mengajukan2" component={Mengajukan} />
        <Route path="/diajukan2" component={Diajukan} />
        <Route path="/signature2/create" component={CreateSignature} />
        <Route path="/SignDoc2/:document_id/:user_id" component={SignDocument} />
        <Route path="/SignUserDoc2/:document_id/:user_id" component={UserSignDetail} />
      </Switch>
    </Router>
  );
}

export default App;
