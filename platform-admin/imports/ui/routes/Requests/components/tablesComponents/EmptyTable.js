import React from 'react';
import { connect } from 'react-redux';
import { Label } from 'reactstrap';
import Select from 'react-select';

import { requestTypes } from './constants';
import { onTypeChange } from '../../modules/actionsFilters';

class EmptyTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      type: props.type,
    };
  }

  handleTypeChange(selectedOption) {
    this.setState({type: selectedOption});
    this.props.onTypeChange(selectedOption);
  }

  render() {
    let optionsType = [];
    for (let typeValue in requestTypes) {
      optionsType.push({
        value: typeValue,
        label: requestTypes[typeValue].toUpperCase(),
      });
    }

    return (
      <div>
        <div style={{float: 'right', marginBottom: 20}}>
          <Label for="request-type">Type</Label>
          <Select
            className="custom-selectbox m-r-15"
            style={{ width: '150px' }}
            simpleValue
            value = {this.state.type}
            searchable={false}
            clearable={false}
            onChange={(option) => this.handleTypeChange(option)}
            options={optionsType}
            arrowRenderer={ () => <img src="/images/icons/ico-arrow-down.svg" /> }
          />
        </div>
        <p className="p-10 text-center" style={{border:'#e1e5eb 2px solid', borderRadius: 5, clear: 'both'}}>There is no data to display</p>
      </div>
    );
  }
};

const mapDispatchToProps = (dispatch) => ({
  onTypeChange: (params) => dispatch(onTypeChange(params)),
})

export default connect(null, mapDispatchToProps)(EmptyTable)

