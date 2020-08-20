import React, { Fragment, Component } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import UserItem from './components/users/UserItem';
import Users from './components/users/Users';
import axios from 'axios';

// npx create-react-app .   (. stands for current directory)
// npm i axios

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

  render() {
    // console.log('2222');
    const name = 'John Doe';

    const foo = () => 'Bar';

    const loading = false;

    const showName = true;

    // if (loading) {
    //   return <h4>Loading...</h4>;
    // }

    // {showName && name} ===> 삼항연산자에서 true가 아니면 null 이니 only show name if showName is true

    return (
      <div className='App'>
        {/* <Navbar title='Github Finder' icon='fab fa-github' /> */}
        <Navbar />
        <div className='container'>
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>

      // <div className='App'>
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
      // </>
    );
  }
}

export default App;
