import React from 'react';

class PdfReview extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { file, close } = this.props;

    return (
      <div className="pdf-review-wrapper">
        <div className="pdf-review-overlay" onClick={() => close()}></div>
        <img src="/images/icons/ico-cross.svg" className="pdf-review-close-icon" onClick={() => close()} />
        <div className="pdf-review-content">
          <embed width="100%" height="100%" src={`${file}`} />
        </div>
      </div>
    )
  }
};

export default PdfReview;
