import React from 'react';

const UploadIcon = (props) => {
  const {color, size} = props;
  return (
    <div>
      <svg width={size+'px'} height={size+'px'} viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
        <title>ico-upload</title>
        <desc>Created with Sketch.</desc>
        <defs></defs>
        <g id="kyc-data" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="kyc-i-dt" transform="translate(-354.000000, -687.000000)" stroke={color} strokeWidth="2">
            <g id="Group-19" transform="translate(338.000000, 680.000000)">
              <g id="Group-2" transform="translate(16.000000, 7.000000)">
                <g id="Page-1" transform="translate(5.000000, 5.000000)">
                  <path d="M0,13.4142 L0,17.4142 C0,17.9672 0.448,18.4142 1,18.4142 L19,18.4142 C19.553,18.4142 20,17.9672 20,17.4142 L20,13.4142" id="Stroke-1"></path>
                  <path d="M10,1.4142 L10,14.4142" id="Stroke-3"></path>
                  <polyline id="Stroke-5" points="15 5.4142 10 0.4142 5 5.4142"></polyline>
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

export default UploadIcon;
