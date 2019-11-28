import React from 'react';
import Dropzone from 'react-dropzone';
import UploadIcon from '../../../components/Icons/UploadIcon';

const AddDocumentDropzone = ({upload, fileType, invoice,
  color="#5ca0f6", size='30'}) => {

  const uploadWrapper = (acceptedFiles) => {
    upload(acceptedFiles, fileType, invoice);
  };

  return (
    <div style={{cursor: 'pointer'}}>
      <Dropzone
        onDrop={uploadWrapper}
        accept=".pdf, .png, .jpg, .jpeg"
        className="custom-dropzone"
      >
        <UploadIcon color={color} size={size} />
      </Dropzone>
    </div>
  );
}

export default AddDocumentDropzone;
