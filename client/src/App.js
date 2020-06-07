import React, { useContext } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { AuthContext } from './Contexts/AuthContextProvider'
import { NavBar, Home, Signup, Login, Protected, UnAuthor, NotFound} from './Components'
import ImageUpload from './Components/User/ImageUpload';
import Profile from './Components/User/Profile';

const App = () => {
  const { auth } = useContext(AuthContext)

  return (
    <>
    <NavBar auth={auth} />

    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/signup' component={Signup} />
      <Route exact path='/login' component={Login} />
      <Protected exact auth={auth} path='/upload' component={ImageUpload} />
      <Protected exact auth={auth} path='/profile' component={Profile} />
      <Route exact path="/unauth" component={UnAuthor} />
      <Route path="*" component={NotFound} />
    </Switch>
    </>
  );
}

export default App