import React, {Fragment} from 'react';

import {FormLabel} from '../../../../components/styled-components/Invoices/FormLabel';
import {Wrapper} from '../../../../components/styled-components/Invoices/Wrapper';
import {P} from '../../../../components/styled-components/Typography';



const initialState = {
  isAccepted: null,
};

class PersonalizedCheckbox extends React.Component {
  state = initialState;

  componentWillMount() {
    this.handleChecked(this.props.initialValue);
  }

  componentWillUpdate(nextProps, nextState) {
    const {param, handleCheckList} = this.props;
    if (this.state.isAccepted !== nextState.isAccepted) {
      handleCheckList(param, nextState.isAccepted);
    }
  }

  handleChecked = (isAccepted) => {
    this.setState({isAccepted});
  };

  render() {
    const {isAccepted} = this.state;
    const {index, reason} = this.props;

    return (
    <div className="d-flex m-r-20" style={{marginTop: '-3px'}}>
      <Wrapper className='checkbox-personalized m-r-5'>
        <input className='react-bs-select-all'
               type='checkbox'
               name={'checkbox-accept' + index}
               id={'checkbox-accept' + index}
               checked={!!isAccepted}
               onChange={this.handleChecked.bind(this, true)}
        />
        <FormLabel className="p-0 d-flex" htmlFor={'checkbox-accept' + index}>
          <div className='check checkbox-accept'></div>
        </FormLabel>
      </Wrapper>

      <Wrapper className='checkbox-personalized m-r-10'>
        <input className='react-bs-select-all'
               type='checkbox'
               name={'checkbox-reject' + index}
               id={'checkbox-reject' + index}
               checked={isAccepted === null ? false : !isAccepted}
               onChange={this.handleChecked.bind(this, false)}
        />
        <FormLabel className="p-0 d-flex" htmlFor={'checkbox-reject' + index}>
          <div className='check checkbox-reject'></div>
        </FormLabel>
      </Wrapper>

      {reason && <div className="p-l-10 p-t-5"><P>{reason}</P></div>}
    </div>
    )
  }
}

export default PersonalizedCheckbox;
