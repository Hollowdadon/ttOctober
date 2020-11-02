import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Header from './components/Header';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import UserInfoList from './components/UserInfo/UserInfoList';
import UserInfoForm from './components/UserInfo/UserInfoForm';

function App() {
  return (
    <div className='App'>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/signin' render={(props) => <SignIn />} />
          <Route exact path='/signup' render={(props) => <SignUp />} />
          <ProtectedRoute exact path='/admin' role='admin'>
            <UserInfoList />
          </ProtectedRoute>
          <Route exact path='/' render={(props) => <UserInfoForm />} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
