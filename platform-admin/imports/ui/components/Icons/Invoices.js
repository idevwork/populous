import React from 'react';

const InvoicesIcon = (props) => {
  const {color} = props;
  return (
    <div className="text-center">
      <svg width="40px" height="30px" viewBox="0 0 40 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
        <title>Invoices</title>
        <desc>Created with Sketch.</desc>
        <defs></defs>
        <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="a-header" transform="translate(-1019.000000, -12.000000)" strokeWidth="2" stroke="#E4F0FF">
            <g id="header">
              <g>
                <g id="Page-1">
                  <g transform="translate(1019.000000, 12.000000)">
                    <polygon id="Stroke-1" points="12 28 30 28 30 5 12 5" stroke={color}></polygon>
                    <path d="M17,10 L25,10" id="Stroke-3" strokeLinecap="round" stroke={color}></path>
                    <path d="M17,14 L25,14" id="Stroke-4" strokeLinecap="round" stroke={color}></path>
                    <path d="M17,22 L23,22" id="Stroke-5" strokeLinecap="round" stroke={color}></path>
                    <polyline id="Stroke-6" points="8 24 8 1 26 1" stroke={color}></polyline>
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

export default InvoicesIcon;
