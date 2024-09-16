import { useNavigate } from 'react-router-dom';
import React from 'react';

function withNavigate(Component) {
  function ComponentWithNavigateProp(props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  }

  return ComponentWithNavigateProp;
}

export default withNavigate;
