import React from 'react';

const RequestsIcon = (props) => {
  const {color} = props;
  return (
    <div className="text-center">
      <svg width="40px" height="30px" viewBox="0 0 40 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
        <title>Requests</title>
        <desc>Created with Sketch.</desc>
        <defs></defs>

        <g id="a-header" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(-1226.000000, -12.000000)" strokeLinecap="round">
          <g id="header" stroke="#E4F0FF" strokeWidth="2">
            <g id="Page-1">
              <g transform="translate(1226.000000, 12.000000)">
                <path d="M21.0455,6.0586 L35.0455,6.0586" id="Stroke-1" stroke={color}></path>
                <path d="M5,5.3663 L7.673,8.0393 C7.765,8.1323 7.914,8.1323 8.006,8.0393 L13.045,3.0003" id="Stroke-3" stroke={color}></path>
                <path d="M21.0455,15.0586 L34.0455,14.9996" id="Stroke-5" stroke={color}></path>
                <path d="M5,14.3663 L7.673,17.0393 C7.765,17.1323 7.914,17.1323 8.006,17.0393 L13.045,12.0003" id="Stroke-7" stroke={color}></path>
                <path d="M21.0977,24.0655 L35.0977,24.0655" id="Stroke-9" stroke={color}></path>
                <path d="M5.0523,23.3731 L7.7253,26.0461 C7.8173,26.1381 7.9663,26.1381 8.0583,26.0461 L13.0973,21.0071" id="Stroke-11" stroke={color}></path>
              </g>
            </g>
          </g>
        </g>
      </svg>
      <div className="overlay"></div>
    </div>
  );
};

export default RequestsIcon;
