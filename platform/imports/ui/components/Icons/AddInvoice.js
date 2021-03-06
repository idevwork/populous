import React from 'react';

const AddInvoiceIcon = (props) => {
  const {color} = props;
  return (
    <div className="text-center">
      <svg width="40px" height="30px" viewBox="0 0 40 30" version="1.1" xmlns="http://www.w3.org/2000/svg" 
     xlink="http://www.w3.org/1999/xlink">
        <title>Add Invoice</title>
        <desc>Created with Sketch.</desc>
        <defs></defs>
        <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="b-header" transform="translate(-812.000000, -12.000000)" fill={color}>
              <g id="header">
                  <g id="Group" transform="translate(690.000000, 0.000000)">
                      <g id="menu" transform="translate(110.000000, 12.000000)">
                          <g id="add-invoice-btn">
                              <path d="M27,15 L23,15 C22.448,15 22,15.447 22,16 C22,16.553 22.448,17 23,17 L27,17 C27.552,17 28,16.553 28,16 C28,15.447 27.552,15 27,15 L27,15 Z M40,21 L38,21 L38,19 C38,18.447 37.552,18 37,18 C36.448,18 36,18.447 36,19 L36,21 L34,21 C33.448,21 33,21.447 33,22 C33,22.553 33.448,23 34,23 L36,23 L36,25 C36,25.553 36.448,26 37,26 C37.552,26 38,25.553 38,25 L38,23 L40,23 C40.552,23 41,22.553 41,22 C41,21.447 40.552,21 40,21 L40,21 Z M43,22 C43,18.691 40.309,16 37,16 C33.691,16 31,18.691 31,22 C31,25.309 33.691,28 37,28 C40.309,28 43,25.309 43,22 L43,22 Z M29.589,25 C29.212,24.072 29,23.062 29,22 C29,18.28 31.555,15.155 35,14.264 L35,4 L19,4 L19,25 L29.589,25 Z M45,22 C45,26.411 41.411,30 37,30 C34.48,30 32.232,28.826 30.765,27 L17,27 L17,2 L37,2 L37,14 C41.411,14 45,17.589 45,22 L45,22 Z M23,13 L31,13 C31.552,13 32,12.553 32,12 C32,11.447 31.552,11 31,11 L23,11 C22.448,11 22,11.447 22,12 C22,12.553 22.448,13 23,13 L23,13 Z M22,8 C22,7.447 22.448,7 23,7 L31,7 C31.552,7 32,7.447 32,8 C32,8.553 31.552,9 31,9 L23,9 C22.448,9 22,8.553 22,8 L22,8 Z" id="Page-1"></path>
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

export default AddInvoiceIcon;
