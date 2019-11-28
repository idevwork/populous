import React from 'react';

const UsersIcon = (props) => {
  const {color} = props;
  return (
    <div className="text-center">
      <svg width="40px" height="30px" viewBox="0 0 40 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
        <title>Users</title>
        <desc>Created with Sketch.</desc>
        <defs></defs>
        <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="a-header" transform="translate(-916.000000, -12.000000)" strokeWidth="2" stroke="#E4F0FF">
            <g id="header">
              <g>
                <g id="Page-1">
                  <g transform="translate(916.000000, 12.000000)">
                    <path d="M19.41,21 L19.41,21 C16.66,21 14.41,18.484 14.41,15.41 L14.41,12.589 C14.41,9.515 16.66,7 19.41,7 C22.16,7 24.41,9.516 24.41,12.59 L24.41,15.411 C24.41,18.485 22.16,21 19.41,21 Z" id="Stroke-1" stroke={color}></path>
                    <path d="M16.4095,20 C11.9755,21.5 9.9395,24.227 9.9395,29" id="Stroke-3" strokeLinecap="round" stroke={color}></path>
                    <path d="M28.8797,29 C28.8797,24.227 26.6697,21.5 22.4097,20" id="Stroke-5" strokeLinecap="round" stroke={color}></path>
                    <path d="M36.8197,24 C36.8197,19.227 34.6107,16.5 30.3497,15" id="Stroke-7" strokeLinecap="round" stroke={color}></path>
                    <path d="M1.9998,24 C1.9998,19.227 4.2098,16.5 8.4698,15" id="Stroke-9" strokeLinecap="round" stroke={color}></path>
                    <path d="M27.3817,15.998 C30.1167,15.978 32.3497,13.473 32.3497,10.411 L32.3497,7.59 C32.3497,4.516 30.0997,2 27.3497,2 C25.4677,2 23.8207,3.179 22.9677,4.908" id="Stroke-11" stroke={color}></path>
                    <path d="M15.8514,4.9072 C14.9984,3.1782 13.3514,2.0002 11.4704,2.0002 C8.7204,2.0002 6.4704,4.5152 6.4704,7.5902 L6.4704,10.4112 C6.4694,13.4722 8.7024,15.9782 11.4374,15.9982" id="Stroke-13" stroke={color}></path>
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

export default UsersIcon;
