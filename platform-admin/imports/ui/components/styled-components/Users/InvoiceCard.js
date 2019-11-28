import styled from 'styled-components';
import { invoiceStatuses } from 'meteor/populous:constants';

export const MainText = styled.div`
  font-size: 19px;
  color: #434445;
  text-align: center;
  margin-right: ${props => (props.withMargin ? '10px' : 0)};

  @media (max-width: 768px) {
    display: block;
    margin-right: 0;
    margin-bottom: 10px;
  }
`;

export const Status = styled.span`
  margin-right: 25px;
  padding: 3px 11px 1px; 
  border: solid 2px #F5F7FA;
  text-transform: uppercase;
  font-size: 12px;
  color: '#797B7D';
  @media (max-width: 568px){
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
  text-align: center;
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

export const HistoryCardWrapper = styled.div`
  border: 2px solid ${props => props.theme.colors.paleGrey};
  padding: 12px;
  border-top: none;

  .img {
    display: inline-block;
    float: left;
    width: 70px;
    height: 100%;
    padding-top: 10px;
  }

  .info {
    display: inline-block;
    float: left;
    width: calc(100% - 70px);
    height: 100%;
  }
`;
