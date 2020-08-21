import React, { Fragment, Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import UserItem from './components/users/UserItem';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import axios from 'axios';
import Alert from './components/layout/Alert';
import About from './components/pages/About';

// npx create-react-app .   (. stands for current directory)
// npm i axios
// npm i react-router-dom

// function App() {                  // functional based component, in the past used when you don't use state
//   return (
//     <div className='App'>
//       <h1>Hello from React</h1>
//     </div>
//   );
// }

class App extends Component {
  state = {
    users: [],
    loading: false, // there is gonna be a time before we get data,
    repos: [],
    user: {},
    alert: null,
  };
  async componentDidMount() {
    this.setState({ loading: true });
    // console.log('asdf');
    console.log(process.env.REACT_APP_GITHUB_CLIENT_ID); // store global variable in your local environment you can use .env.local
    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    console.log(res.data);
    this.setState({ users: res.data, loading: false });
  }

  // class based component

  foo2 = () => 'Bars2';

  // Search Github users
  searchUsers = async (text) => {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    console.log(res.data);
    this.setState({ users: res.data.items, loading: false });
  };

  // Get a single Github user
  getUser = async (username) => {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    console.log(res.data);
    this.setState({ user: res.data, loading: false });
  };

  // Get users repos
  getUserRepos = async (username) => {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    console.log(res.data);
    this.setState({ repos: res.data, loading: false });
  };

  clearUsers = () => {
    this.setState({ users: [], loading: false });
  };

  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });

    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  render() {
    // console.log('2222');
    const name = 'John Doe';

    const foo = () => 'Bar';

    const showName = true;

    // if (loading) {
    //   return <h4>Loading...</h4>;
    // }

    // {showName && name} ===> 삼항연산자에서 true가 아니면 null 이니 only show name if showName is true

    const { users, loading, user, repos } = this.state;

    return (
      <Router>
        <div className='App'>
          {/* <Navbar title='Github Finder' icon='fab fa-github' /> */}
          <Navbar />
          <div className='container'>
            <Alert alert={this.state.alert} />
            <Switch>
              {/* wrap all our roots in a switch so that it shows one at a time and then we're gonna
                        add a root */}
              <Route
                exact // exact path
                path='/'
                render={(props) => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
              {/* just a whole page */}

              <Route
                /* :login to know which user it is(username/id will be passed)... 
              whatever props is passed in we need to add those */
                exact
                path='/user/:login'
                render={(props) => (
                  <User
                    {...props}
                    getUser={this.getUser}
                    user={user}
                    loading={loading}
                    getUserRepos={this.getUserRepos} // we want to call this within our user component
                    repos={repos}
                  />
                )}
              />
            </Switch>
          </div>
        </div>

        {/* // <div className='App'>
        //   {loading ? (
        //     <h4>Loading...</h4>
        //   ) : (
        //     <h1>
        //       Hello {name} {1 + 1} {name.toUpperCase()} {foo()} {this.foo2()}{' '}
        //       {showName && name}
        //     </h1>
        //   )}
        // </div>
  
        // <h2>This cannot be inserted</h2>  // React needs to have one parent element
  
        // <Fragment>    // if you don't want div. A Ghost Element
        //   <h1>Hello from React</h1>
        // </Fragment>
  
        // <>    // Not recommended
        //   <h1>Hello from React</h1>
        // </> */}
      </Router>
    );
  }
}

export default App;
