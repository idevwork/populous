import React from 'react';

const TransactionsIcon = (props) => {
  const {color} = props;
  return (
    <div className="text-center">
      <svg width="40px" height="30px" viewBox="0 0 40 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
        <title>Transactions</title>
        <desc>Created with Sketch.</desc>
        <defs></defs>
        <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" strokeLinecap="round">
          <g id="a-header" transform="translate(-1227.000000, -12.000000)" strokeWidth="2" stroke="#E4F0FF">
            <g id="header">
              <g>
                <g id="Page-1">
                  <g transform="translate(1227.000000, 12.000000)">
                    <polygon id="Stroke-1" points="3 28 11 28 11 20 3 20" stroke={color}></polygon>
                    <polygon id="Stroke-3" points="15 28 23 28 23 20 15 20" stroke={color}></polygon>
                    <polygon id="Stroke-4" points="15 10 23 10 23 2 15 2" stroke={color}></polygon>
                    <polygon id="Stroke-5" points="27 28 35 28 35 20 27 20" stroke={color}></polygon>
                    <path d="M11,24 L15,24" id="Stroke-7" stroke={color}></path>
                    <path d="M23,24 L27,24" id="Stroke-8" stroke={color}></path>
                    <path d="M35,24 L37,24" id="Stroke-9" stroke={color}></path>
                    <path d="M1,24 L3,24" id="Stroke-11" stroke={color}></path>
                    <path d="M19,19 L19,17" id="Stroke-14" stroke={color}></path>
                    <path d="M19,12 L19,10" id="Stroke-15" stroke={color}></path>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
      <div className="overlay"></div>
    </div>
  );
};

export default TransactionsIcon;
