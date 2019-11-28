import styled from 'styled-components';
import {NoInvoices as NoInvoicesComponent} from "../../../routes/Invoices/components/NoInvoices";


const NoInvoices = styled(NoInvoicesComponent)`
  padding-top: 30px;

  h1{
    margin-bottom: 30px;
    font-size: 30px;
  }
  
  .propose-wrapper{
    text-align: center;
  }
  
  img{
    margin-top: -35px;
    margin-bottom: -22px;
    max-width: 100%;
  }
  
  a{
    padding: 14px 38px;
    display: inline-block;
    background: ${props => props.theme.colors.primary};
    text-transform: uppercase;
    color: ${props => props.theme.colors.white};
    font-size: 16px;
    text-decoration: none;
    
    &:hover{
      background: ${props => props.theme.colors.secondary};
    }
  }
`;

export default NoInvoices;