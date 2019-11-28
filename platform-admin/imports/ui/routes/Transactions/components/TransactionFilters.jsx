import React from 'react';
import {
  Row,
  Col,
  FormGroup,
  Label,
} from 'reactstrap';
import { StyledInput } from '../../../components/styled-components/Inputs';
import { Mute } from '../../../components/styled-components/Typography';
import { transactionsSort } from "../modules/constants";

class TransactionFilters extends React.Component {
  render() {
    return (
      <Row className="justify-content-end">
        <Col xs={{size: '8', offset: 1}} className="p-0">
          <FormGroup className="d-flex">
            <Mute className="m-t-auto">
              Type
            </Mute>
            <Col>{this.getSortBy()}</Col>
           <Mute className="m-t-auto">
              Status
            </Mute>
            <Col>{this.getSortBy()}</Col>
            <Col>
              <StyledInput 
                className="p-l-0"
                type="text" 
                name="search" 
                placeholder="Search..." 
                onChange={this.search}>
              </StyledInput>
            </Col>
          </FormGroup>
        </Col>
      </Row>
    );
  }

  getSortBy() {
    const { sortBy } = this.props.filters;
    const options = [];

    for (const value in transactionsSort) {
      options.push(
        <option value={value} key={value}>
          {transactionsSort[value].label}
        </option>
      );
    }

    return (
      <StyledInput className="p-l-0" type="select" name="sort-by" value={sortBy} onChange={this.sortByChange}>
        {options}
      </StyledInput>
    );
  }
  
  search(){

  }

  sortByChange = event => {
    const { nativeEvent: { target: { value } } } = event;
    const { updateSortBy } = this.props;

    updateSortBy(value);
  };

  fullTextOnChange = event => {
    const { updateFullTextSearch } = this.props;
    const { nativeEvent: { target: { value } } } = event;
    updateFullTextSearch(value);
  };

  perPageChange = event => {
    const { updatePerPage } = this.props;
    const { nativeEvent: { target: { value } } } = event;
    updatePerPage(value);
  };
}

export default TransactionFilters;
