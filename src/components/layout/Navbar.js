import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Navbar = ({ icon, title }) => {
  //   static defaultProps = {
  //     // Even if you don't pass these in App.js, the parameters will be set to default
  //     title: 'Github Finder',
  //     icon: 'fab fa-github',
  //   };
  //   static propTypes = {
  //     title: PropTypes.string.isRequired,
  //     icon: PropTypes.string.isRequired,
  //   };

  return (
    <div className='navbar bg-primary'>
      <h1>
        <i className={icon}></i>
        {title}
      </h1>
      <ul>
        {/* if you use a tag when you've searched for smth and then go to about page and return, the search-result is cleared... state is cleared
                meaning that is not client-side routing... we need client-side routing... use Link to make state intact*/}
        <li>
          <Link to='/'>Home</Link>
          {/* <a href='/'>Home</a> */}
        </li>
        <li>
          <Link to='/about'>About</Link>
          {/* <a href='/about'>About</a> */}
        </li>
      </ul>
    </div>
  );
};

Navbar.defaultProps = {
  // Even if you don't pass these in App.js, the parameters will be set to default
  title: 'Github Finder',
  icon: 'fab fa-github',
};
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default Navbar;
