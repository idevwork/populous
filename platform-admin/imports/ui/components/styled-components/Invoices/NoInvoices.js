import styled from 'styled-components';
import {NoInvoices as NoInvoicesComponent} from "../../../routes/Invoices/components/NoInvoices";


const NoInvoices = styled(NoInvoicesComponent)`
  margin-top: 30px;
  .propose-wrapper{
    margin-top: 30px;
    text-align: center;
  }
  img{
    max-width: 100%;
  }
  a{
    padding: 14px 38px;
    display: inline-block;
    background: ${props => props.theme.colors.primary};
    text-transform: uppercase;
    color: ${props => props.theme.colors.white};
    font-size: 1em;
    font-weight: 600;
    text-decoration: none;
    &:hover{
      background: ${props => props.theme.colors.secondary};
    }
  }
`;

export default NoInvoices;