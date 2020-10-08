import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

const NotFoundPage = () => {
  return (
    <div className="page-not-found">
      <p className="page-not-found__title"> Opps, requested page not found!</p>
      <p className="page-not-found__message">
        Please click <Link to="/">Here</Link> for Home page.
      </p>
    </div>
  );
};

export default NotFoundPage;
