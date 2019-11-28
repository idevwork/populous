import React, { Fragment } from 'react';
import { toastr } from 'react-redux-toastr';
import { Maintenance } from 'meteor/populous:api';
import { Row, Col, Label, FormGroup, Alert } from 'reactstrap';

import { LABEL } from "../../../../components/styled-components/Typography";
import { StyledInput } from "../../../../components/styled-components/Inputs";
import { PrimaryButton } from "../../../../components/styled-components/Buttons";
import DateTimeRange from "../../../../components/DateTime/DateTimeRange";


const initialState = {
  startDateTime: null,
  endDateTime: null,
  severity: 'green',
  description: '',
  error: false,
};

class MaintenanceFrom extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      ...initialState,
    };
  }

  onChange = ({start, end}) => {
    this.setState({ startDateTime: start|| null, endDateTime: end || null});
  };

  onSeverityChange = ({ target: { value } }) => {
    this.setState({ severity: value, })
  };

  onDescriptionChange = ({ target: { value } }) => {
    this.setState({ description: value, })
  };


  onSubmit = (event) => {
    event.preventDefault();
    const { startDateTime, endDateTime, severity, description, } = this.state;

    if (endDateTime.isBefore(startDateTime)) {
      return toastr.error('Error', 'You chose an invalid time period.');
    }

    if (!endDateTime || !startDateTime || endDateTime.diff(startDateTime, 'hours') < 1) {
      return toastr.error('Error', 'Maintenance interval should be at least 1 hour');
    }

    this.setState({ error: null });

    new Maintenance().callMethod('create', {
        startAt: startDateTime.utc().toDate(), endAt: endDateTime.utc().toDate(), severity, description,
      },
      (error) => {
        if (error) {
          return this.setState({ error: error.reason });
        }

        this.setState({ ...initialState });
        toastr.info('Event added to the maintenance schedule');
      });
  };

  render() {
    const { startDateTime, endDateTime, severity, description, error, } = this.state;

    return (
      <Fragment>
        <form className="m-t-20" onSubmit={this.onSubmit}>
          <Row>
            <Col xs="12" sm="8">
              <DateTimeRange
                start={startDateTime}
                end={endDateTime}
                onChange={this.onChange} />
            </Col>
            <Col xs="12" sm="4">
              <FormGroup>
                <LABEL>Severity</LABEL>
                <StyledInput type="select" value={severity} onChange={this.onSeverityChange}>
                  <option value='green'>
                    Green
                  </option>
                  <option value='orange'>
                    Orange
                  </option>
                  <option value='red'>
                    Red
                  </option>
                </StyledInput>
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <LABEL>Description</LABEL>
            <StyledInput type="textarea" rows="3" style={{resize:'none'}}
                         value={description} onChange={this.onDescriptionChange}/>
          </FormGroup>
          <div className="text-center p-t-20">
            <PrimaryButton md>
              Set maintenance time
            </PrimaryButton>
          </div>
        </form>
      </Fragment>
    );
  }
}

export default MaintenanceFrom;
