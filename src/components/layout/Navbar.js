import React from 'react';
import PropTypes from 'prop-types';

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
