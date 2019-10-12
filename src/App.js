import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Header } from './components/layouts';
import Private from './modules/private';
import Public from './modules/public';

@withRouter
class App extends React.Component {
  handleAuth = () => {
    this.props.history.push('/auth/login');
  }
render() {
  return (
  <div className="App">
     <Header handleAuth={this.handleAuth} />
     <Switch>
       <Route exact path="/app" component={Private} />
       <Route path="/" component={Public} />
     </Switch>
  </div>);
}
}

export default App;
