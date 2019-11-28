import React from 'react';
import { Container, Col, Row, Card, CardHeader, CardBody, CardTitle, CardText, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { NavLink as NavLINK } from 'react-router-dom';

import { H1 } from '../../../components/styled-components/Typography';
import { PrimaryButton } from '../../../components/styled-components/Buttons';
import { StyledInput } from '../../../components/styled-components/Inputs';
import Loading from "../../../components/Loading";

const TemplatesList = ({
  templates,
  loading,
  onKeywordChange,
  history,
  onDelete,
  deleteTemplate,
  editTemplate,
  showDelete,
  closeDeleteModal
}) => {

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <Row className="m-b-30 m-t-30">
        <Col md={'12'} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <H1>
            <NavLINK to="/users" className="m-r-10">
              <img src="/images/icons/ico-arrow-back.svg" />
            </NavLINK>
            Email Templates
          </H1>
          <PrimaryButton onClick={() => { history.push('/add-email-template') }}>Create Template</PrimaryButton>
        </Col>
      </Row>
      <Row>
        <Col md={{ size: 10, offset: 1 }}>
          <Row>
            <Col md={{ size: 6, offset: 3 }} xs={'12'}>
              <StyledInput placeholder='Search...'
                           onChange={data => {
                             const escapeData = data.target.value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
                             onKeywordChange(escapeData)}
                           }
              />
            </Col>
          </Row>
          <Row>
          {
            templates.map((template, index) => (
              <Col md={'4'} className="m-t-30" key={index}>
                <Card className="email-card">
                  <CardHeader>
                    <div className="d-flex justify-content-between">
                      <div>{template.name}</div>
                      <div>
                        <a onClick={() => editTemplate(template)} className="m-r-10 pointer">
                          <img src="/images/icons/ico-edit.png" height="20" />
                        </a>
                        { !template.systemName &&
                          <a onClick={() => onDelete(template)} className="pointer">
                            <img src="/images/icons/delete.png" height="20" />
                          </a>
                        }
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <CardTitle>{template.subject}</CardTitle>
                    <CardText dangerouslySetInnerHTML={{__html: template.body}}></CardText>
                  </CardBody>
                </Card>
              </Col>
            ))
          }
          </Row>
        </Col>
      </Row>
      <Modal isOpen={showDelete} toggle={closeDeleteModal} className="custom">
        <ModalHeader toggle={closeDeleteModal}>Confirmation</ModalHeader>
        <ModalBody>
          Are you sure that you want to remove this template?
        </ModalBody>
        <ModalFooter>
          <PrimaryButton className="m-r-10" onClick={deleteTemplate}>Confirm</PrimaryButton>
          <PrimaryButton onClick={closeDeleteModal} outline>Cancel</PrimaryButton>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default TemplatesList;
