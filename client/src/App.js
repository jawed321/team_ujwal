import React from 'react'
import { Container } from '@material-ui/core';
import logo from './images/download.png';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails'
import EditForm from './components/EditForm/EditForm'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import EditPassword from './components/EditPassword/EditPassword';
import Form from './components/Form/Form'
import Form1 from './components/Form1/Form1'
import Teampage from './components/Teampage';

function App() {
    const user = JSON.parse(localStorage.getItem('profile'));
    console.log('userrrr')
    console.log(user);
    //defaultToaster();
    return (
        <div>
            <ToastContainer/>
            <BrowserRouter>
                <Container maxWidth="xl">
                    <Navbar logo={logo} />
                    <Switch>
                        <Route path="/" exact component={() => <Redirect to="/posts" />} />
                        <Route path="/team" exact component={Teampage} />
                        <Route path="/posts" exact component={Home} />
                        <Route path="/posts/newpost" exact component={Form} />
                        <Route path="/posts/editpost/:id" exact component={Form1} />
                        <Route path="/editprofile" exact component={EditForm} />
                        <Route path="/changepassword" exact component={EditPassword} />
                        <Route path="/posts/search" exact component={Home} />
                        <Route path="/posts/:id" exact component={PostDetails} />
                        <Route path="/auth" exact component={() => (user ? <Redirect to="/posts" /> : <Auth />)}/> 
                    </Switch>
                </Container>
            </BrowserRouter>
        </div>
    )
}

export default App
