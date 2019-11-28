import React from 'react';


export default ({color= 'green'}) => {

  return (
    <svg width="15px" height="19px" viewBox="0 0 15 19" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      <g id="admin-platform-settings-maintenance-time" stroke="none"
         strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(-812.000000, -322.000000)">
        <g  transform="translate(812.000000, 322.000000)" fill={color}>
          <polyline points="2 11 13.9420192 11 13.9420192 2 2 2"/>
          <polyline
                    transform="translate(2.000000, 9.500000) scale(-1, 1) translate(-2.000000, -9.500000) "
                    points="1 18 3 18 3 1 1 1"/>
        </g>
      </g>
    </svg>
  );
}