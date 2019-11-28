import {BlockchainEvent} from 'meteor/populous:api'

export default async function eventLogger(source, event, returnValues) {
  const blockchainEvent = new BlockchainEvent({
    source,
    type: event,
    data: returnValues,
  });

  blockchainEvent.save();
}
