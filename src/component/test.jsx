import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/view/Home';
import Login from './components/view/Login';
import Register from './components/view/Register';
import UserIndex from './components/view/UserIndex';
import Profile from './components/view/Profile';
import EditProfile from './components/view/EditProfile';
import EditPassword from './components/view/EditPassword';
import Reset from './components/view/Reset';
import DocumentIndex from './components/view/DocumentIndex';
import CreateDocument from './components/view/CreateDocument';
import EditDocument from './components/view/EditDocument';
import Detail from './components/view/Detail';
import EditFile from './components/view/EditFile';
import Mengajukan from './components/view/Mengajukan';
import Diajukan from './components/view/Diajukan';
import CreateSignature from './components/view/CreateSignature';
import SignDoc from './components/view/SignDoc';
import Nav from './components/view/Nav';
import SendSign from './components/view/SendSign';
import Sign from './components/view/Sign';
import TemplateView from './components/view/TemplateView';
import Template from './components/view/Template';
import Signers from './components/view/Signers';
import React from 'react';
import Header from './Header';
import Footer from './Footer';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
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
        <Route path="/dokumen2/:dokument" component={Detail} />
        <Route path="/fileDoc2/:document_id" component={EditFile} />
        <Route path="/mengajukan2" component={Mengajukan} />
        <Route path="/diajukan2" component={Diajukan} />
        <Route path="/signature2/create" component={CreateSignature} />
        <Route path="/SignDoc2/:document_id/:user_id" component={SignDoc} />
        <Route path="/index2" component={Nav} />
        <Route path="/sendsign2" component={SendSign} />
        <Route path="/sign2" component={Sign} />
        <Route path="/tview2" component={TemplateView} />
        <Route path="/template2" component={Template} />
        <Route path="/signers2" component={Signers} />
      </Switch>
    </Router>
  );
}

export default App;
