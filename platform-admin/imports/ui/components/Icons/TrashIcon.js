import React from 'react';

export default (props) => {
  const {color} = props;
  return (
    <svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1"
         xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      <g id="kyc-data" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="kyc-i-dt" transform="translate(-1083.000000, -647.000000)" strokeWidth="2" stroke={color}>
          <g id="Group-8" transform="translate(713.000000, 616.000000)">
            <g id="Group" transform="translate(370.000000, 31.000000)">
              <g id="Page-1" transform="translate(4.000000, 3.000000)">
                <polygon id="Stroke-1" points="3 23 19 23 19 4 3 4"/>
                <path d="M0,4 L22,4" id="Stroke-3"/>
                <path d="M7,4 C7,1.791 8.791,0 11,0 C13.209,0 15,1.791 15,4" id="Stroke-4"/>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}