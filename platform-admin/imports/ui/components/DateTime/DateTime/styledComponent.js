import styled from 'styled-components';
import DateTime from "./component";

export default styled(DateTime)`
  .form-control:disabled, .form-control[readonly] {
    background: none !important;
  }
`;