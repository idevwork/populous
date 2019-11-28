import React from 'react';
import { Row, Col, CardBody } from 'reactstrap';
import moment from "moment";

import { BidCard } from '../../../components/styled-components/Invoices/Invoice';
import { LinkButton } from '../../../components/styled-components/Buttons';
import { Lead, Small } from '../../../components/styled-components/Typography';
import BidModal from './BidModal';
import { trimStringLength } from '../../../utils/trimStringLength';
import '/imports/ui/libs/styles/invoice.css';

const initialState = {
  bidModal: false
};


class BidItem extends React.Component {
  state = initialState;

  _calculateRaisedBid(bid) {
    return bid.bidders.reduce((prevSum, bidder) => {
      return ((prevSum|| 0) + bidder.amount)
    }, 0);
  }

  toggleModal = () => {
    this.setState({
      bidModal: !this.state.bidModal,
    });
  }

  render() {
    const { bid, bidUsers, crowdsale, invoice } = this.props,
          { names: { isGroup, groupName }, amount, createdAt } = bid,
          initiator = bidUsers[bid.userId],
          createdAtMoment = moment(bid.createdAt);

    const bidName = isGroup ? groupName || 'Anonymous' : (initiator && (bid.isAnonymous ? 'Anonymous' : initiator.fullName()));
    const timeForDisplay = bid.formatDate(createdAtMoment);
    const isWinning = bid.isWinner;
    const isReached = (isGroup && bid.sortAmount === amount);
    const className = `bid-card ${isWinning && 'success'}`;

    return (
      <BidCard className={className}>
        <CardBody>
          { isWinning && <div className="bid-card-label">Winning bid</div> }
          <div className="bid-card-body">
            <div className="icon">
              <img src={ isGroup ? '/images/icons/ico-users.png' : '/images/icons/ico-user.png'} height="30" />
            </div>
            <div className="name">
              <Lead className="m-b-10">{trimStringLength(bidName, 30)}</Lead>
              <div className="d-flex d-lg-flex align-items-center">
                <Small className="m-r-10">{timeForDisplay}</Small>
              </div>
            </div>
            <div className="mobile-divider"/>
            <div className="goal-bid">
              { isGroup &&
                <Small className="mb-2">Goal bid</Small>
              }
              { isGroup &&
                <Lead>{(amount).toFixed(2)}</Lead>
              }
            </div>
            <div className="current-bid">
              <Small className="mb-2">{ isGroup ? 'Raised bid' : 'Bid' }</Small>
              <Lead>{ (isGroup ? this._calculateRaisedBid(bid) : amount).toFixed(2) }</Lead>
            </div>
            <div className="return">
              <Small className="mb-2">Return</Small>
              <Lead>{bid.getReturnParams(invoice, bid.amount).returnPercentage} %</Lead>
            </div>
            <div className="actions">
              { <LinkButton md onClick={this.toggleModal}>View</LinkButton> }
            </div>
          </div>
        </CardBody>
        <BidModal isOpen={this.state.bidModal} toggle={this.toggleModal} bid={bid} invoice={invoice} users={bidUsers} />
      </BidCard>
    );
  }
};

export default BidItem;
