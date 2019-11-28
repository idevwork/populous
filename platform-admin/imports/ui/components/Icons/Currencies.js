import React from 'react';

const CurrenciesIcon = (props) => {
  const {color} = props;
  return (
    <div className="text-center">
      <svg width="40px" height="30px" viewBox="0 0 40 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
        <title>Currencies</title>
        <desc>Created with Sketch.</desc>
        <defs></defs>
        <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="a-header" transform="translate(-1123.000000, -12.000000)">
            <g id="header">
              <g>
                <g id="Page-1">
                  <g transform="translate(1123.000000, 12.000000)">
                    <path d="M20.5,7.5 C20.5,8.328 19.829,9 19,9 C18.171,9 17.5,8.328 17.5,7.5 C17.5,6.672 18.171,6 19,6 C19.829,6 20.5,6.672 20.5,7.5" id="Fill-3" fill={color}></path>
                    <path d="M17,19 L16,19 C15.448,19 15,18.553 15,18 L15,11 C15,10.447 15.448,10 16,10 L17,10 L17,19 Z" id="Fill-7" fill={color}></path>
                    <path d="M32,15 C32,22.18 26.18,28 19,28 C11.82,28 6,22.18 6,15 C6,7.82 11.82,2 19,2 C26.18,2 32,7.82 32,15 Z" id="Stroke-1" stroke={color} strokeWidth="2"></path>
                    <path d="M19,15 L19,23" id="Stroke-5" stroke={color} strokeWidth="2" strokeLinecap="round"></path>
                    <path d="M21,11 L19,11 L19,18 L21,18 C22.104,18 23,17.104 23,16 L23,13 C23,11.896 22.104,11 21,11 Z" id="Stroke-9" stroke={color} strokeWidth="2"></path>
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

export default CurrenciesIcon;
