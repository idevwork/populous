import styled from 'styled-components';
import { Card, NavItem, ModalHeader } from 'reactstrap';

export const TransitionModalHeader = styled(ModalHeader)`
  h4 {
    font-weight: bold;
    color: #a5acb5;
  }
`;

export const TransitionModalBody = styled.div`
  padding: 20px 33px;

  .form-control-plaintext {
    color: #434445;
  }

  .text-uppercase {
    margin-bottom: 0px;
  }
`;
