import React, {Fragment} from 'react';
import Select from 'react-select';
import {Row, Col} from 'reactstrap';
import styled from 'styled-components';

import {H3, Small, LABEL} from "../../../../components/styled-components/Typography";
import Loading from '../../../../components/Loading';
import { PrimaryButton } from '../../../../components/styled-components/Buttons';
import EditorModal from './EditorModal';


const initialState = {
  dataModal: null,
  showModal: false,
  positionNewSection: 'last'
};

class TermsAndConditions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...initialState
    };
  }

  handlePositionChange = (position) => {
    this.setState({
      positionNewSection: position,
    })
  };

  toggleModal = (termsId) => {
    const {termsAndConditions} = this.props;
    let section;

    if (termsId) {
      section = termsAndConditions.filter((item)=>(
        item._id === termsId
      ))[0];
    } else {
      const {positionNewSection} = this.state;
      const position = positionNewSection !== 'last' ? positionNewSection + 1 : termsAndConditions.length + 1;
      section = {
        position: position,
        content: null,
        title: null
      }
    }


    this.setState({
      dataModal: section,
      showModal: !this.state.showModal,
    });
  };

  getContent = () => {
    return this.props.termsAndConditions.map((item, index) => {
      let content = item.content;

      // add class "child"
      if (/<p>\(*[0-9]+\)/.test(content)) {
        content = content.replace(/<p>\(*[0-9]+\)/g, (item) => {
          return '<p class="child">' + item.substr(3, item.length);
        });
      }
      //add class "child2"
      if (/<p>\(*[A-Za-z]\)/.test(content)) {
        content = content.replace(/<p>\(*[A-Za-z]\)/g, (item) => {
          return '<p class="child2">' + item.substr(3, item.length);
        });
      }

      return (
        <Row key={index}>
          <Col xs={11}>
            <h4><span className="index">{++index}</span>{item.title}</h4>
          </Col>
          <Col xs={1} className="m-t-20 p-r-15" >
            <span onClick={() => this.toggleModal(item._id)} style={{cursor: 'pointer'}}>
              <img src="/images/icons/ico-edit.svg"/>
            </span>
          </Col>

          <Col xs={12} dangerouslySetInnerHTML={{__html: content}} />
        </Row>
      );
    })
  };

  render() {
    const {lastUpdate, loading, termsAndConditions, formActions, className} = this.props;

    if (loading) {
      return <Loading />;
    }

    const positionOptions = termsAndConditions.map((item) => ({
        value: item.position,
        label: item.title,
      }));

    positionOptions.push({
      value: 'last',
      label: 'Last section',
    });


    return (
    <Col className={className}>
      <Row className={'justify-content-between'}>
        <Col className="p-0">
          <H3>Terms And Conditions</H3>
        </Col>
        <Col className={'text-right'}>
          <Small>Last update: {lastUpdate}</Small>
        </Col>
      </Row>

      {this.getContent()}

      <Row className={'m-t-30 p-t-30 add-section'}>
        <Col xs={12} sm={8}>
          <LABEL>New section after</LABEL>
          <Select
            className="custom-selectbox m-r-15 m-l-5"
            style={{width: '100%'}}
            simpleValue
            value = {this.state.positionNewSection}
            searchable={false}
            onChange={(option) => this.handlePositionChange(option)}
            options={positionOptions}
            arrowRenderer={ () => <img src="/images/icons/ico-arrow-down.svg" /> }
            filterMaxResults={2}
          />
        </Col>
        <Col xs={12} sm={4} className="m-t-20">
          <PrimaryButton className="p-l-15 p-r-20 p-t-10 p-b-10" onClick={() => this.toggleModal(null)}>
            <img src="/images/icons/ico-plus-white.svg" size={12} /> <span className="m-l-15">ADD SECTION</span>
          </PrimaryButton>
        </Col>
      </Row>

      <EditorModal
        isOpen={this.state.showModal}
        toggle={this.toggleModal}
        dataModal={this.state.dataModal}
        className={className}
        termsAndConditions={termsAndConditions}
        formActions={formActions}
      />
    </Col>
    )
  }
}


export default styled(TermsAndConditions)`
  margin-bottom: 50px;

  h4 {
    margin: 28px 0 28px 30px;
    font-size: 22px;
    font-family: 'Poppins', sans-serif;
    text-transform: uppercase;
    font-weight: bold;
    line-height: 1.09;
    color: #636466;
  }
  .index {
    margin: 0 18px 0 -30px;
  }
  p.child {
    margin-left: 50px;
  }
  p.child2 {
    margin-left: 70px;
  }
  p {
    margin-left: 30px;
    margin-bottom: 10px;
    line-height: 1.5;
    font-family: 'PT Sans', sans-serif;
    font-size: 0.875rem;
    @media(min-width: 992px) {
      font-size: 1rem;
    }
  }
  
  .add-section {
    border-top: 2px solid #e1e5eb;
  }
  
  .Select.custom-selectbox {
    display: block;
    width: 100%;
  }
  
  .Select-menu { 
    max-height: 140px;
  }
`