import styled from 'styled-components';


export const WrapperTable = styled.div`
  .table th {
    border: none;
    font-size: 80%;
    font-weight: normal;
    text-transform: uppercase;
    text-align: right;
    vertical-align: middle;
  }
  .table tbody tr td:first-child,
  .tabletfoot tr td:first-child {
    border-right: solid 8px rgba(63, 119,191, 0.03);
  }
  .table tbody tr:first-child td {
    border-top: none;
  }
  .table td {
    border-top: 2px solid #f8f8f8;
    border-right: 3px solid #f8f8f8;
    text-align: right;
  }
  .table td:last-child {
    border-right: none;
  }
  .table tfoot td {
    border-top: 2px solid rgba(63, 119, 191, 0.6);
    font-weight: bold;
  }
  .table.border-table th {
    text-transform: initial;
  }
  .table.border-table td {
    border: 2px solid #E1E5EB !important;
  }
`;