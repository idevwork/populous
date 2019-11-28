import React from 'react';
import { Document, Page } from 'react-pdf/build/entry.noworker';
import { invoiceDocumentTypes } from 'meteor/populous:constants';

import AddDocumentDropzone from './AddDocumentDropzone';
import Loading from '../../../components/InnerLoading';

const PdfPreview = ({currentFile, file, className, toggle, upload, currentInvoice, type}) => {
  return (
    <div className={className}>
      {type === "pdf" ?
        <Document file={file} loading={<Loading />}>
          <Page className="custom" pageNumber={1} />
        </Document>
        :
        <div>
          <img src={file} alt="image preview" style={{width: '100%', height: '100%'}} />
        </div>
      }

      {currentFile &&
      <div className={'file-name'}>
        <div className={'inner'}>
          {currentFile.name}
        </div>
      </div>
      }

      {toggle &&
      <div className="pdf-preview-overlay">
        <img src="/images/icons/ico-zoom-plus.png" height="30" className="icon" onClick={toggle}/>

        { upload &&
        <AddDocumentDropzone
          uploadDocumentFile={file}
          invoice={currentInvoice}
          upload={upload}
          fileType={invoiceDocumentTypes.invoice}
          color='#fff'
          size='35'
        />
        }
      </div>
      }
    </div>
  );
};

export default PdfPreview;
