import React from 'react';

const UploadContractIcon = ({height = 100, width=92, style}) => {

  return (
    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
         {...{height: height + 'px', width: width + 'px'}} style={style}
         viewBox="0 0 92 100" version="1.1">
      <g id="add-invoice" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="add-invoice-b-dt" transform="translate(-978.000000, -727.000000)" strokeWidth="2" stroke="#5CA0F6">
          <g id="invoice-upload-empty" transform="translate(926.000000, 663.000000)">
            <g id="Group-5" transform="translate(52.000000, 64.000000)">
              <g id="Page-1" transform="translate(13.000000, 4.000000)">
                <polygon id="Stroke-1" points="66 91 0 91 0 0 54 0 66 11"/>
                <path d="M9,14 L25,14" id="Stroke-3"/>
                <path d="M9,27 L56,27" id="Stroke-4"/>
                <path d="M9,36 L44,36" id="Stroke-5"/>
                <path d="M9,45 L38,45" id="Stroke-6"/>
                <path d="M9,54 L33,54" id="Stroke-7"/>
                <polyline id="Stroke-8" points="54 0 54 11 66 11"/>
                <path d="M24,80.7402 C26.896,80.7402 33.655,70.1202 34.621,68.1882 C35.586,66.2582 33.655,79.7752 34.621,79.7752 C35.586,79.7752 37.517,73.9812 39.448,73.0162 C41.379,72.0512 41.634,76.2232 44.276,77.8442 C49,80.7402 57.351,78.3382 60,79.0002" id="Stroke-10"/>
                <path d="M43,45 L51,45" id="Stroke-12"/>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );

};

export default UploadContractIcon;
