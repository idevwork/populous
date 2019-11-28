import styled from 'styled-components';
import PdfPreviewComponent from '../PdfPreview';

const PdfPreview = styled(PdfPreviewComponent)`
  position: relative;
  border: 2px solid ${props => props.theme.newColors.lightGray};
  overflow: hidden;
  height: ${props => props.height}px;
  width: ${props => props.width ? props.width+'px' : '100%'};
  margin: auto;
  
  .file-name{
    background: ${props => props.theme.colors.white};
    text-align: left;
    padding: 6px;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    color: ${props => props.theme.colors.coolGrey};
    font-size: 12px;
    
    .inner{
      overflow: hidden;
      white-space: nowrap;
    }
  }

  .ReactPDF__Document {
    user-select: none;
  }

  .pdf-preview-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: none;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,.5);
    cursor: ${props => props.invoice ? 'default' : 'pointer'};

    .icon {
      margin-right: 30px;
      color: #fff;
      font-size: 32px;
      cursor: pointer;
    }
  }

  &:hover {
    .pdf-preview-overlay {
      display: flex;
    }
  }
`;

export default PdfPreview;
