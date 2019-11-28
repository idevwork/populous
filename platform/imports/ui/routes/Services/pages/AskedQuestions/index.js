import React from 'react';
import styled from 'styled-components';

import Divider from '../../components/Divider'
import AskingCard from '../../components/AskingCard'

class AskedQuestions extends React.Component {
  render() {
    const backInquiries = [
      "Get in contact with us either by phone, email or registering for free on our platform.",
      "We get in touch with you within 24 hours and ask for some details in order to proceed.",
      "You provide your details (usually at this stage if it’s all looking good a meeting is arranged).",
      "Upon verification and risk assessment, provide the invoice that will be payable to ‘Populous World’ to your customer.",
      "Upload said invoice onto our platform which then invites invoice buyers to bid on your invoice.",
      "Receive the cashflow within 24 hours of the auction closing sans interest fee.",
      "Upon repayment, the customer pays the invoice by making a full payment to ‘Populous World’."
    ]

    return (
      <StyledDiv>
        <div className="hero-section">
          <div className="section-wrapper">
            <div className="title">Frequently Asked Questions</div>
          </div>
        </div>

        <div className="main-content">
          <AskingCard title="What is Invoice Finance?">
            <li>
              <b>Invoice Finance </b>
              <span>is a form of funding that instantly unlocks the cash tied up in outstanding sales invoices. Business owners allow invoice buyers to buy invoices at a discounted rate in order to unlock their cash quicker. Once invoices are paid by the invoice debtor, the invoice buyer receives the amount previously agreed upon.</span>
            </li>
          </AskingCard>

          <div className="divider-wrapper">
            <Divider width="300" color="#42B6FB" />
          </div>

          <AskingCard title="How do I transfer from my existing Invoice Discounting provider?">
            <li>
              <span>If you wish to switch to </span>
              <b>Populous World </b>
              <span>from your existing Invoice Discounting provider, we can take care of the process on your behalf.</span>
            </li>

            <li>
              All you need to do is simply contact us and we’ll take care of the process from then onwards. Next steps usually include arranging for one of our Business Development managers to pay you a visit.
            </li>

            <li>
              <span>Once we have finalised the deal, we’ll contact your current </span>
              <b>Invoice Finance </b>
              <span>provider and arrange for a transfer of your invoices to us. Your funds will then be with you within a few hours, taking up to 24 hours.</span>
            </li>
          </AskingCard>

          <div className="divider-wrapper">
            <Divider width="300" color="#42B6FB" />
          </div>

          <AskingCard title="How much will it cost?">
            <li>
              <span>It is free to register yourself on the </span>
              <b>Populous World </b>
              <span>platform, you will never be charged anything apart from when you actually register invoices with </span>
              <b>Populous World; </b>
              <span>this is the only time you will incur fees.</span>
            </li>

            <li>
              With help regarding pricing and fees, this will be confidentially discussed with you during your meeting with one of our Business Development managers.
            </li>
          </AskingCard>

          <div className="divider-wrapper">
            <Divider width="300" color="#42B6FB" />
          </div>

          <AskingCard title="How much can I borrow?">
            <li>
              You can register as many invoices as you like however we do have credit checks in place that may incur limitations on how much you can borrow.
            </li>

            <li>
              <span>Here at </span>
              <b>Populous World, </b>
              <span>we understand that each and every situation is different so therefore this will also be discussed in your meeting with our Business Development managers.</span>
            </li>
          </AskingCard>

          <div className="divider-wrapper">
            <Divider width="300" color="#42B6FB" />
          </div>

          <AskingCard title="How can we use Invoice Factoring to finance our staffing agency?">
            <li>
              Often, successful companies find themselves in a sticky situation regarding cash flow difficulties in paying their staff. This is more usually found in staffing agencies who regularly have to chase down payments from clients while trying to make ends meet and pay their team of employees at the end of the month.
            </li>

            <li>
              <b>Populous World’</b>
              <span>s financial services allows you to access the value of your client invoices when you need it. </span>
              <b>Populous World </b>
              <span>also takes special care in collecting payments; this frees up time for you to be doing what you do best and focus on growing your business.</span>
            </li>
          </AskingCard>

          <div className="divider-wrapper">
            <Divider width="300" color="#42B6FB" />
          </div>

          <AskingCard title="What if I don’t want my customers to know that I am using Invoice Finance?">
            <li>
              <span>With our bespoke service you can choose to use our </span>
              <b>Invoice Discounting </b>
              <span>facility which is strictly confidential. This means that we can help boost your company’s cash flow by releasing funds from unpaid invoices immediately and you deal with your customers in the usual way when recovering payments.</span>
            </li>

            <li>
              This service comes with complete privacy, meaning that your customers will not be made aware that such an arrangement is in place.
            </li>
          </AskingCard>

          <div className="divider-wrapper">
            <Divider width="300" color="#42B6FB" />
          </div>

          <AskingCard title="What is the process from initial enquiry to funds in my bank account?">
            <li>
              <b>Populous World </b>
              <span>aims to make this process as simplistic and easy for you as possible. For this reason exactly we’ve devised some steps that start from an initial enquiry to you receiving funds into your bank account within a few hours:</span>
            </li>

            <div className="inquiries">
              {backInquiries.map((inquiry, index) => (
                <div className="inquiry-wrapper" key={index}>
                  <div className="counter">{index + 1}</div>
                  <div>{inquiry}</div>
                </div>
              ))}
            </div>

            <li>
              This service comes with complete privacy, meaning that your customers will not be made aware that such an arrangement is in place.
            </li>
          </AskingCard>

          <div className="divider-wrapper">
            <Divider width="300" color="#42B6FB" />
          </div>

          <AskingCard title="How long will I be tied up in a contract with you?">
            <li>We do not require fixed lengthy contracts from any of customers, which means you get to take full advantage of our bespoke service and you can choose to factor single invoices rather than your entire ledger on a no contract basis.</li>
            <li>If you’d like to discuss this further, please contact us directly.</li>
          </AskingCard>

          <div className="divider-wrapper">
            <Divider width="300" color="#42B6FB" />
          </div>

          <AskingCard title="Do you finance invoices from clients abroad?">
            <li>
              <span>This is something that </span>
              <b>Populous World </b>
              <span>can facilitate depending on the invoice and can be manageable. However, this does vary on the country as some countries are blacklisted for us.</span>
            </li>

            <li>
              <span>For more information, please arrange a call with one of our team or email us at </span>
              <b>info@populous.world.</b>
            </li>
          </AskingCard>
        </div>
      </StyledDiv>
    )
  }
}

const StyledDiv = styled.div`
  .hero-section {
    background: url('/img/question-background.png') no-repeat;
    background-size: cover;
    background-color: #000000;
    color: white;
    width: 100%;
    height: 20vw;
    display: flex;
    justify-content: center;
    align-items: center;

    .section-wrapper {
      .title {
        font-size: 48px;
        line-height: 60px;
        font-weight: bold;
      }
    }
  }

  .main-content {
    padding: 50px 240px;
    font-size: 14px;
  }

  .divider-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 30px;
  }

  .inquiries {
    margin-bottom: 10px;

    .inquiry-wrapper {
      display: flex;
      align-items: center;
      padding-left: 60px;
      text-align: left;
      margin-bottom: 5px;
  
      .counter {
        width: 24px;
        height: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
        border-radius: 12px;
        border: solid 1px #2E3A4D;
      }
    }
  }
  
`

export default AskedQuestions
