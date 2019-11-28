import React, {Fragment} from 'react';
import { Label, Modal, ModalHeader, ModalBody, Form, Row, Col, FormGroup, Input } from 'reactstrap';
import { H3, LABEL,  P } from '../../../components/styled-components/Typography/index';
import {PrimaryButton} from '../../../components/styled-components/Buttons';

class ChangeFeeModal extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      dailyFee: this.props.fees.dailyFee,
      dailyPenaltyFee: this.props.fees.dailyPenaltyFee,
      advancedPercentage: this.props.fees.advancedPercentage,
      populousMonthFee: this.props.fees.populousMonthFee
    };
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { submitChangeFeeForm } = this.props
    const { dailyFee, dailyPenaltyFee, advancedPercentage, populousMonthFee } = this.state
    submitChangeFeeForm({dailyFee: Number(dailyFee), dailyPenaltyFee: Number(dailyPenaltyFee),
      advancedPercentage: Number(advancedPercentage), populousMonthFee: Number(populousMonthFee)})
  }

  render() {
    const {
      dailyFee, dailyPenaltyFee, advancedPercentage, populousMonthFee
    } = this.state;
    const { isOpen, toggle } = this.props

    return (
      <Modal isOpen={isOpen} toggle={toggle} className="custom">
        <ModalHeader toggle={toggle}>Change Fees</ModalHeader>
        <ModalBody>
          <Form className="form custom" onSubmit={this.handleSubmit}>
            <Row>
              <Col sm="6">
                <FormGroup>
                  <LABEL for="dailyFee">Daily Rate (%)</LABEL>
                  <Input name="dailyFee" id="dailyFee" type="number" step="any" value={dailyFee} onChange={this.handleChange} />
                </FormGroup>
              </Col>
              <Col sm="6">
                <FormGroup>
                  <LABEL for="monthlyFee">Monthly Rate (%)</LABEL>
                  <Input id="monthlyFee" type="number" step="any" value={dailyFee * 30} readOnly/>
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <LABEL for="advancedPercentage">Advanced Percentage (%)</LABEL>
              <Input name="advancedPercentage" id="advancedPercentage" type="number" step="any" value={advancedPercentage} onChange={this.handleChange} />
            </FormGroup>
            <Row>
              <Col sm="6">
                <FormGroup>
                  <LABEL for="populousMonthFee">Monthly Populous Fee (%)</LABEL>
                  <Input name="populousMonthFee" id="populousMonthFee" type="number" step="any" value={populousMonthFee} onChange={this.handleChange} />
                </FormGroup>
              </Col>
              <Col sm="6">
                <FormGroup>
                  <LABEL for="dailyPenaltyFee">Late Payment Fee (%)</LABEL>
                  <Input name="dailyPenaltyFee" id="dailyPenaltyFee" type="number" step="any" value={dailyPenaltyFee} onChange={this.handleChange} />
                </FormGroup>
              </Col>
            </Row>
            <div className="d-flex justify-content-center align-content-center m-t-20">
              <PrimaryButton>Change Fees</PrimaryButton>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    );

  };
}

export default ChangeFeeModal;
