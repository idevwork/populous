import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

const LogoComponent = ({className}) => {
  return (
    <Link to="/" className={classnames('navbar-brand ' + className)}>
      <img src="/images/logo.png" alt="Populous" height="33" /><span className="administrator">Administrator</span>
    </Link>
  );
};

const Logo = styled(LogoComponent)`
  display: flex;
  align-items: flex-end;
  font-size: 20px;
  outline: none;

  img {
    margin-right: 20px;
  }

  .administrator {
    font-family: 'PT Sans', sans-serif;
    font-weight: 700;
    line-height: 1.2;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

export default Logo;
