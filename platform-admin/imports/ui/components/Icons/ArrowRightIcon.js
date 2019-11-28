import React from 'react';

export default ({color, rotate = 0, size = 30, ...props}) => {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" version="1.1"
         xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" {...props}>
      <g id="invoice-details" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform={`rotate(${rotate}, 15, 15)`}>
        <g id="invoice-details-i-dt-auction-open-bid-individually" transform='translate(-667.000000, -820.000000)'
           stroke={color} strokeWidth="2">
          <g transform="translate(0.000000, 601.000000)">
            <g transform="translate(242.000000, 101.000000)">
              <g transform="translate(31.000000, 95.000000)">
                <g transform="translate(394.000000, 23.000000)">
                  <g transform="translate(5.000000, 7.000000)">
                    <path d="M20,8 L0.0004,8" />
                    <polyline points="12 16 20 8 12 0"/>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>



  );
}
