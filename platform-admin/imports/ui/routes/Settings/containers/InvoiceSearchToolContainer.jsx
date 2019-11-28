import { Meteor } from 'meteor/meteor';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { withTracker } from 'meteor/react-meteor-data';

import InvoiceSearchTool from '../components/InvoiceSearchTool';
import { loadInvoiceDetail } from '../modules/actions';

const mapStateToProps = ({ settings }) => {
  return {
    invoiceSearch: settings.invoiceSearch
  };
};

const mapDispatchToProps = dispatch =>
  ({
    formActions: bindActionCreators({
      loadInvoiceDetail
    }, dispatch)
  });

const reduxData = connect(
  mapStateToProps,
  mapDispatchToProps
);

const meteorData = withTracker(() => {
  return {
  };
});

export default compose(reduxData, meteorData)(InvoiceSearchTool);