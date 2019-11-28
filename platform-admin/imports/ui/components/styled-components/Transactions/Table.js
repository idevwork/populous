import styled from 'styled-components';
import { Card, NavItem, Table } from 'reactstrap';

export const TransitionTable = styled(Table)`
  font-size: 13px;
  margin-bottom: 10px;

   thead {
    border-top: none !important;
    color: #615e5e;
    font-size: 12px;

    tr {
      border-top: none !important;

      th:first-child {
        padding-left: 17px;
      }

      th:nth-child(6), th:nth-child(5) {
        text-align: center;
        padding-right: 52px;
      }
      
      th {
        border-top: none !important;
        font-weight: 100;
        padding-left: 0;
        padding-bottom: 8px;
      }
    }
   }

   tbody {
    color: #454647;

    tr:nth-child(odd){
      background-color: #f9fbfd;
    }
    
    tr {
      border: 2px solid #e1e5eb;

      td {
        div {
          justify-content: center;
        }
        
        button {
          padding: 0 !important;
        }
      }
    }
  }

  td {
    padding: 0;
    padding-top: 1px;
    vertical-align: middle;
  }
`;

export const InvoiceTable = styled(Table)`
  font-size: 13px;
  margin-bottom: 10px;

   thead {
    border-top: none !important;
    color: #615e5e;

    tr {
      border-top: none !important;
      
      th {
        white-space: nowrap;
        text-align: center;
        border-top: none !important;
        font-weight: 100;
        padding-bottom: 8px;
      }
    }
   }

   tbody {
    color: #454647;

    tr:nth-child(odd){
      background-color: #f9fbfd;
    }
    
    tr {
      border: 2px solid #e1e5eb;

      td {
        white-space: nowrap;
        vertical-align: middle;
        text-align: center;
        
        div {
          justify-content: center;
        }
        
        button {
          padding: 0 !important;
          margin: 0;
        }
      }
    }
  }
`;

export const Thead = styled.thead`
`
