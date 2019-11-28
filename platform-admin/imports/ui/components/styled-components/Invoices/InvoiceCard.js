import styled from 'styled-components';
import { invoiceStatuses } from 'meteor/populous:constants';


export const MainText = styled.span`
  font-size: 19px;
  color: #434445;
  white-space: nowrap;
  margin-right: ${(props) => (props.withMargin ? '25px': 0)};

  @media (max-width: 768px){
  display: block;
  margin-right: 0;
  margin-bottom: 10px;
}
`;

export const Status = styled.span`
  margin-right: 25px;
  padding: 10px 20px 12px;
  border-radius: 1px;
  border: solid 2px #f5f7fa;
  font-weight: bold;
  line-height: 0.75;
  letter-spacing: 0.8px;
  font-size: 16px;
  display: inline-block;
  vertical-align: top;
  color: ${(props) => {
    switch (props.status) {
      case invoiceStatuses.auctionOpen:
        return props.theme.colors.green;
      case invoiceStatuses.auctionFailed:
        return props.theme.colors.slateGrey;
      case invoiceStatuses.awaitingContract:
        return props.theme.colors.darkBlue;
      case invoiceStatuses.auctionPending:
        return props.theme.colors.coolGrey;
      case invoiceStatuses.repaymentPending:
        return props.theme.colors.blue;
      case invoiceStatuses.auctionClosed:
        return props.theme.colors.red;
      case invoiceStatuses.auctionRejected:
        return props.theme.colors.red;
      case invoiceStatuses.repaymentPaid:
        return props.theme.colors.coolGrey;
      case invoiceStatuses.repaymentLate:
        return props.theme.colors.slateGrey;
      default:
        return props.theme.colors.slateGrey;
    }
  }};
  @media (max-width: 991px) {
    padding: 7px 14px;
    font-size: 14px;
    letter-spacing: 0.7px;
  }
  @media (min-width: 768px) and (max-width: 1199px) {
    float: right;
    margin-right: 0;
  }
  @media (min-width: 1200px) {
    margin-left: 20px;
  }
`;

export const SubText= styled.span`
  font-size: 14px;
  color: #636466;
  margin-right: ${(props) => (props.withMargin ? '25px': 0)};
`;

export const TableHead = styled.div`
  color: #636466;
  font-size: 14px;
  text-align: right;
  white-space: nowrap;
  @media (max-width: 768px){
    text-align: left;
  }
`;

export const CardInfo = styled.div`
  @media (max-width: 768px){
    margin: 10px 0;
    background: #FAFBFC;
    margin-left: -15px;
    margin-right: -15px;
    padding: 10px 15px ;
  }
`
