import {Invoice,} from 'meteor/populous:api';
import {
  blockchainActionTypes,
  blockchainActionStatuses,
  userProviderStatuses,
} from 'meteor/populous:constants';


export default async function newInvoice(blockchainAction, nonce) {
  const invoice = await Invoice.findOne(blockchainAction.invoiceId);

  if (invoice) {
    await invoice.addToBlockchain(nonce, false);

    return true;
  }
}
