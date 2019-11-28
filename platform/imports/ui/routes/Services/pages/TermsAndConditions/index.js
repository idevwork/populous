import React from 'react';
import styled from 'styled-components';

import TableOfContent from '../../components/TableOfContent'
import Divider from '../../components/Divider'
import OrderSection from '../../components/OrderSection'

class TermsAndConditions extends React.Component {
  render() {
    const orders = [
      "Registered Users and the populous World Ltd IoM Rules",
      "Sale and Purchase of Receivables by Trade",
      "Registered User Accounts",
      "Payments",
      "Fees, Charges and Taxes",
      "Collections from the Invoice Buyer, the Invoice Seller or Debtors",
      "General Warranties and Undertakings",
      "Invoice Seller Warranties and Undertakings",
      "Funder Warranties and Undertakings",
      "Repurchase Of Receivables",
      "Invoice Seller Information",
      "Termination and Enforcement of Rights",
      "The Populous Platform",
      "Compensation and Set-off",
      "Our Liability",
      "General",
      "Definitions and Interpretation"
    ]

    const registerLists = [
      {
        order: '1.1',
        subTitle: 'Registered Users: You will not become a Registered User until we have approved your application to become a Registered User, or such later date on which any conditions for registration as a Registered User have been satisfied, we may approve or reject any application, and we may attach conditions to our acceptance of such application.'
      },
      {
        order: '1.2',
        subTitle: 'Registered User Agreement: This Registered User Agreement contains the terms that determine the rights and obligations between the Invoice Seller, the Invoice Buyer and populous World Ltd. in the populous platform rules by accepting the populous World Ltd.. Trading Registered User platform Rules’ in our DocHub document you agree that you have read, understand, and accept the terms and conditions contained in the populous World Ltd. Trading Registered User Rules, Each time you use the services of the populous World Ltd. Trading platform you agree to be bound by the latest version of the populous platform Limited Trading Registered User Rules.'
      },
      {
        order: '1.3',
        subTitle: 'populous World Ltd. rights to verify: We may at any time request that you provide any information relating to you or your use of the populous World Ltd. Trading platform as we consider necessary or desirable.'
      },
      {
        order: '1.4',
        subTitle: 'Status checks: You authorize us at all times to undertake credit, identity and anti-money laundering checks and searches on you, your officers, and beneficial owners, if any. You accept that any information received by us will form part of our ongoing records.'
      },
      {
        order: '1.5',
        subTitle: 'Confidential Information: We will only use any Confidential Information concerning you for the purposes of carrying our credit risk assessments, preventing fraud or money laundering and exercising our rights under the Registered User Agreement and/or any Trade, and for those purposes we may at any time use, divulge or communicate to our professional representatives or advisers or as may be required by law or any legal or regulatory authority or credit reference agencies any such Confidential Information, We will use our best endeavours to prevent the unauthorised publication or disclosure of any such confidential information.'
      }
    ]

    const saleLists = [
      {
        order: '2.1',
        subTitle: 'Competitive Trade: A Receivable may be sold by Competitive Trade as follows:'
      },
      {
        order: '(1)',
        subTitle: 'The Invoice Seller shall List the Receivable in accordance with the procedures set out in the Registered User Guidance on the Populous World Ltd. Website Platform and by paying the Listing Fee,'
      },
      {
        order: '(2)',
        subTitle: 'The Invoice Seller is entitled to limit the parameters of the Minimum Advance Percentage, Maximum Discount Rate and Buy Now Discount Rate before submitting the Receivable for Bids.'
      },
      {
        order: '(3)',
        subTitle: 'If the Trade goes live, Bids within the Maximum Discount Rate and Buy Now Discount Rate will be uploaded during the Listing Period in accordance with the procedures and order of priority, if any, contained in the Registered User Guidance.'
      },
      {
        order: '(4)',
        subTitle: 'The contract to sell the Receivable will come into effect and be fully binding at the moment when the Populous Platform allocates the Receivable to successful Bids and the Trade closes,'
      },
      {
        order: '2.2',
        subTitle: 'Relisting Trades: We may relist a Trade if the Advanced Amount has not reached the Minimum Advance Percentage by the end of the Listing Period, so long as the aggregate number of Re lists taken together will not exceed the Total Relist Requests set by the Seller.'
      },
      {
        order: '2.3',
        subTitle: 'Accepting Partial Receivable: If the whole of the Receivable in a Trade is not purchased, we will use the Invoice Seller’s preset Minimum Advance Percentage to determine whether the Invoice Seller accepts or rejects the Partial Receivable.'
      },
      {
        order: '2.4',
        subTitle: 'Bidding: As Funder or Invoice Buyer you may not make any Bid which is larger than the digital value of your Digital Asset Wallet Account.'
      },
      {
        order: '2.5',
        subTitle: 'Won Bid: As an Invoice Buyer you unconditionally and irrevocably authorise and instruct the smart system to enter into a contract on your behalf to purchase the Receivable in a Competitive Trade, if your Bid is within the Maximum Discount Rate and is rated by the Populous World Ltd. Platform as one of the most competitive Bids at the closing of the Trade, and the Advanced Digital Asset Amount for the Trade reaches the Minimum Advance Percentage; and, in so far as necessary, in each case you agree that any Bid made by you will be deemed to have been made on your behalf. For the avoidance of doubt, subject to clause 4.2. the Proceeds of the whole of the Receivable converted by the Populous Exchange to digital assets will be applied towards the repayment of the Digital Asset Advance you make in respect of a Partial Receivable.'
      },
      {
        order: '2.6',
        subTitle: 'Multiple Invoice Buyers: In any Trade in which more than one Invoice Buyer’s Bid to purchase a share in the Receivable is successful, (a) the rights and obligations of each of the Invoice Buyers under or arising out of the Trade, and (b) the Invoice Buyers obligation to pay any Advanced Digital Asset Amount, Invoice Funder’s/ Buyer’s Gain, Late Payment Fee and Repurchase Price to each Invoice Buyer, will be limited to the proportion that their filled Bids bears to the Maximum Digital Asset Advance able Amount.'
      },
      {
        order: '2.7',
        subTitle: 'True sale: Each Trade will take effect as an unconditional sale of the entire legal and beneficial interest in the Traded Receivable to the Invoice Buyers to the extent of their proportionate interest in the Receivable.'
      },
      {
        order: '2.8',
        subTitle: 'Trust undertaking: Upon each Trade, the Invoice Buyers will hold all rights under the Trade, including the Traded Receivable, to the extent of their proportionate interest in the Receivable.'
      },
      {
        order: '2.9',
        subTitle: 'Assignment: As Invoice Seller you agree to assign to the Invoice Buyer your future Traded Receivables with full title guarantee.'
      },
      {
        order: '2.10',
        subTitle: 'Invoice Seller trust: In respect of each Traded Receivable, as Invoice Seller you agree that: '
      },
      {
        order: '(1)',
        subTitle: 'if, for any reason, title to or the benefit of the Receivable fails to vest in the Invoice Buyer absolutely and effectively, the Invoice Seller will hold on trust for the Invoice Buyer absolutely the Receivable and/or its Related Rights and any Proceeds, separate from the Invoice Seller’s own monies: '
      },
      {
        order: '(2)',
        subTitle: 'the Invoice Seller will hold on trust for the Invoice Buyer any bad debt relief (or similar relief) obtained by the Invoice Seller in respect of a Receivable which the Invoice Seller have assigned or purportedly assigned to the Invoice Buyer.'
      },
      {
        order: '2.11',
        subTitle: 'Perfection of assignment: If we require, as Invoice Seller you will promptly and at your own expense: '
      },
      {
        order: '(1)',
        subTitle: 'execute, stamp and deliver to us a formal written assignment of any Traded Receivable, in the form that the Invoice Buyer may require; and/or '
      },
      {
        order: '(2)',
        subTitle: 'take any other action necessary to perfect the assignment to us of, or our title to. or the trust in our favour in relation to, any Traded Receivable and the Proceeds of the same.'
      }
    ]

    const accountLists = [
      {
        order: '3.1',
        subTitle: 'Populous World Ltd authority: Populous World Ltd. grants the Invoice Buyer and Invoice Seller a continuing mandate and authority to operate and to administer Registered User Accounts being Digital Asset Wallet Accounts, designated with either name. In addition to the Registered User Account, Populous World Ltd. may maintain any other accounts including a Populous Digital Asset Account as we may consider desirable for the purpose of purchasing or selling Receivables using digital assets, including a Digital Asset Pooled Account.'
      },
      {
        order: '3.2',
        subTitle: 'Registered User Accounts: Populous World Ltd. will hold any Registered User’s Digital Assets from time to time received by us following a digital asset sale by the Invoice Buyer or Invoice Seller, on the trusts set out in the Populous World Ltd. Rules. Registered User’s Digital Assets may be co-mingled with other Registered User’s Digital Assets in a Digital Asset Pooled Account.'
      },
      {
        order: '3.3',
        subTitle: 'Invoice Seller’sRegistered User Digital Wallet Account: The balance of an Invoice Seller’s Registered User Digital Asset Wallet Account will constitute a mixed digital asset fund deriving from the Digital Asset Proceeds of Traded Receivables and Non-Traded Receivables. Invoice Seller will hold the digital asset fund on trust for the Invoice Seller and the Invoice Buyers as tenants in common to the extent of their respective beneficial interests as measured by the proportion each owns in the Traded Receivables (Invoice Buyers) and Non-Traded Receivables (Invoice Seller).'
      },
      {
        order: '3.4',
        subTitle: 'Populous smart contracts may debit an Invoice Seller’s Registered User Account with the following: '
      },
      {
        order: '(1)',
        subTitle: 'Upon the receipt of any Digital Asset Proceeds of Traded Receivables, (a) the Advanced Digital Asset Amount, and (b) the Populous Fees/charges in digital assets; '
      },
      {
        order: '(2)',
        subTitle: 'the Late Payment Fee in digital assets, if any, in respect of any Traded Receivable;'
      },
      {
        order: '(3)',
        subTitle: 'the Repurchase Penalty Fee , if any, in digital assets in respect of any Traded Receivable. No Repurchase Fee shall be charged if there is no demand to repurchase a Receivable; '
      },
      {
        order: '(4)',
        subTitle: 'the Repurchase Price, if any, in digital assets in respect of any Traded Receivable; '
      },
      {
        order: '(5)',
        subTitle: 'any unallocated Receivable Proceeds, if any, in digital assets under clause 6.4; '
      },
      {
        order: '(6)',
        subTitle: 'any digital assets actually, contingently or prospectively payable by the Invoice Invoice Seller to Populous or the Invoice Buyer as trustee.'
      },
      {
        order: '3.5',
        subTitle: 'Invoice Buyer’s Registered User Digital Wallet Account: The balance of an Invoice Buyer’s Registered User Digital Wallet Account will comprise digital assets derived from Trades entered into on behalf of the Invoice Buyer, including any other digital asset payments received for the account of the Invoice Buyer as purchased from the Populous Digital Asset Exchange.'
      },
      {
        order: '3.6',
        subTitle: 'Invoice Buyer may debit their Registered User Digital Wallet Account with any digital assets value that are or may become payable from the Invoice Buyer whether as trustee or for Invoice Buyer’s own benefit.'
      },
      {
        order: '3.7',
        subTitle: 'Reserve: Invoice Buyer may also from time to time apply a Reserve to the Invoice Buyer’s Registered User Digital Asset Account. The amount of the Reserve must be maintained and may not be withdrawn without Invoice Buyer’s approval.'
      },
      {
        order: '3.8',
        subTitle: 'Application of Digital Assets: Any digital asset which for the time being the Invoice Buyer holds on these trusts is held: '
      },
      {
        order: '(1)',
        subTitle: 'for the Registered Users for whom that digital asset is held according to their respective interests in it; '
      },
      {
        order: '(2)',
        subTitle: 'on Invoice Buyer ‘s insolvency, for the payment of the costs properly attributable to the distribution of the money in accordance with clause 3.8(1) above; and '
      },
      {
        order: '(3)',
        subTitle: 'subject to clauses 3.8(1) and 3.8(2) above, for us.'
      },
      {
        order: '3.9',
        subTitle: 'Other accounts: To the extent that any Registered User is beneficially entitled to a part of any other account maintained bv Populous, including the Digital Asset Pooled Account, Populous will be entitled at any time to debit such account with all Populous World Ltd fees, charges and expenses and any other sum actually, contingently or prospectively payable by the Registered User to Populous as trustee or for Populous’s own benefit.'
      },
      {
        order: '3.10',
        subTitle: 'Populous World Ltd. monies: At any time we debit a Digital Asset Registered User Account or other such account with a digital asset ,such asset will represent the amount of any Populous World Ltd. Fees and/or any other charge, fee, expenses or indemnity payment that is due to us and beneficial title to the digital assets representing the value of liabilities as stated herein will immediately pass to us.'
      },
    ]

    const paymentLists = [
      {
        order: '4.1',
        subTitle: 'Payments to Invoice Sellers: If you are an Invoice Seller, subject to the Populous World Ltd. rules, the Invoice Buyer will transfer to you: '
      },
      {
        order: '(1)',
        subTitle: 'at the conclusion of any Trade, digital assets equal to the Advanced Amount calculated in digital Assets less the Platform and other Fees or charges; '
      },
      {
        order: '(2)',
        subTitle: 'Upon receiving any Digital Assets as Proceeds of a Traded Receivable, digital assets representing a sum equal to the Proceeds less the Advanced Amount including the Populous Fees, the Platform Fee, the Late Payment Fee, Repurchase Penalty Fee and/or any other sums you owe to us: '
      },
      {
        order: '(3)',
        subTitle: 'Subject to clause 6.4, upon receiving any Digital Assets as Proceeds of Non-Traded Receivables, those digital assets as Proceeds less any sums you owe to us.'
      },
      {
        order: '4.2',
        subTitle: 'Payments to Invoice Buyer’s/ Funders: If you are an Invoice Buyer / Funder, Populous will credit your Digital Asset Wallet directly in digital assets as follows: '
      },
      {
        order: '(1)',
        subTitle: 'upon receiving Digital Asset Proceeds of Traded Receivables, digital assets representing an amount equal to your proportion of: (a) the Advanced Amount previously credited to Populous Bank Account to purchase the Digital Assets, and (b) the smart contract assessed value of Digital Assets, less (c) the Populous World Ltd. Funder Commission; '
      },
      {
        order: '(2)',
        subTitle: 'your proportion of any digital assets for the payment made by an Invoice Seller to Populous towards the Repurchase Price of a Traded Receivable, less the Repurchase Fee and/or any other sums you owe to Populous.'
      },
      {
        order: '4.3',
        subTitle: 'Payments: Populous will directly transfer any digital asset payments representing due payments calculated in digital assets into the Invoice Seller’s Digital Wallet Account. For Invoice Buyer’s / Funders, the Invoice Seller may make payment to you by crediting digital assets representing the sum due to your Digital Asset Wallet Account.'
      },
      {
        order: '4.4',
        subTitle: 'Timing: Subject to the Invoice Seller’s rights under the Populous World Ltd.. Rules, the Invoice Seller will use their reasonable commercial endeavour to pay any digital assets representing any money due to the Invoice Buyer within two Business Days to the Invoice Buyer.'
      },
      {
        order: '4.5',
        subTitle: 'Certificate: For the purpose of determining both the Invoice Buyer and Invoice Seller’s liability to pay, and the amount they are liable to pay in Digital Assets to Populous Digital Wallet Account, both the Invoice Seller and Invoice Buyer agree to rely on the valuation by the Populous smart contract and a certificate in writing signed by anyone of Populous directors stating the amount at any particular date due will be conclusive evidence (save for manifest error), in any legal or insolvency proceedings. In certifying the amounts due, Populous will be entitled to take into account all their liabilities (whether actual or contingent) and to make a reasonable estimate of any liability in digital assets where its amount cannot immediately be ascertained.'
      },
    ]

    const feeLists = [
      {
        order: '5.1',
        subTitle: 'Populous Fees: Invoice Buyer(s) and Invoice Seller must always pay in digital assets, the Receivable Purchase Price fees, commissions, charges and expenses in the relevant part of the Populous World Ltd. Fee and Commission Schedule (Part A for Invoice Sellers and Part B for Funders). Any amount owed to Populous and not debited from the digital wallet of either party’s Registered User Account must be paid immediately in accordance with the Populous invoice.'
      },
      {
        order: '5.2',
        subTitle: 'Platform Fee: The Face Value of the Receivable multiplied by Populous’s platform fee percentage according to Fee Schedule as may be published and amended, from time to time, on Populous’s website and shall be paid in digital assets to Populous Digital Wallet Account.'
      },
      {
        order: '5.3',
        subTitle: 'Funders Fee: The Face Value of the Receivable multiplied by the weighted average discount rate given by the Invoice Purchaser’s funders shall be paid in its equivalent in digital assets directly by the relevant party to the Funder’s Digital Wallet Account.'
      },
      {
        order: '5.4',
        subTitle: 'Late Payment Fee: The Late Payment Fee paid in digital assets will be calculated in accordance to the formula: (Funders Fee/Duration) X Late Days '
      },
      {
        order: 'Where:',
        subTitle: 'Duration means the number of days starting from the Closed Date of a successful auction to the Due Date of the Traded Receivable. Late Days means the number of days between the Due Date of the Traded Receivable and the Remittance Date or Repurchase Date (in the case of a repurchase).'
      }
    ]

    const collectionLists = [
      {
        order: '6.1',
        subTitle: 'Sale rights: Subject to the Terms and Conditions of the Invoice Discounting Agreement, for as long as either the Invoice Buyer or Populous World Ltd. holds any Traded Receivable on trust, either the Invoice Buyer and/or Populous World (and for the avoidance of doubt, not the Invoice Seller)will have the right (but are not obliged) to collect and enforce payment of the Receivable in the manner and to the extent as either may decide, including: '
      },
      {
        order: '(1)',
        subTitle: 'Invoice Buyer or Populous may bring, carry on, defend or compromise (upon any terms as they see fit) any legal proceedings or form of alternative dispute resolution in Invoice Buyer or Populous World Ltd. or their agent’s name (but are not obliged to do so), and for that purpose may engage collection agents, solicitors or barristers or other professionals as we feel necessary;'
      },
      {
        order: '(2)',
        subTitle: 'we may demand, exercise, obtain, enforce or otherwise deal with the Related Rights in whatever way we may think suitable (or refrain from so doing); '
      },
      {
        order: '(3)',
        subTitle: 'we may allow a the Invoice Buyer, the Invoice Seller or a Debtor a longer period to pay or agree to accept less than the Face Value.'
      },
      {
        order: '6.2',
        subTitle: 'Agency for collection: Upon the sale of any Receivable, as Invoice Seller you will automatically be appointed as either the Invoice Buyer’s or our agent, and you irrevocably accept to act as the Invoice Buyer’s or our agent, for the purpose of administering, collecting and enforcing the Traded Receivable for us and at your own expense, in which case you agree: '
      },
      {
        order: '(1)',
        subTitle: 'to give appropriate and accurate instructions to the Invoice Buyer or a Debtor to make payment to your Digital Asset Wallet Registered User Account (including its number and sort code); '
      },
      {
        order: '(2)',
        subTitle: 'to observe and comply with all requirements or instructions given by us with regard to the methods of collecting and enforcing Receivables;'
      },
      {
        order: '(3)',
        subTitle: 'that we may (in your name or on our own account) instruct the Invoice Buyer or a Debtor to make payment into your Digital Asset Wallet Registered User Account, a digital asset suspense account, or a Digital Asset Wallet Pooled Account; '
      },
      {
        order: '(4)',
        subTitle: 'that we may vary or terminate your appointment as agent at any time; (5) that you will not hold yourself out as our agent for any other purpose.'
      },
      {
        order: '6.3',
        subTitle: 'Trust of Proceeds: Whether or not as Invoice Seller you remain our collection agent, if at any time you receive or recover any Proceeds in respect of a Traded Receivable, you: '
      },
      {
        order: '(1)',
        subTitle: 'must not bank for your own account the Proceeds; '
      },
      {
        order: '(2)',
        subTitle: 'must immediately convert the Proceeds into a Digital Asset Wallet Account at our exchange and pay the Digital Assets into your Digital Asset Wallet Registered User Account or into a bank account as directed by us; '
      },
      {
        order: '(3)',
        subTitle: 'will hold the Proceeds on trust for us pending receipt by us of it. This trust will terminate, in relation to any Proceeds, as soon as we receive the same.'
      },
      {
        order: '6.4',
        subTitle: 'Dealings with unallocated Receivable Proceeds: As Invoice Seller you unconditionally and irrevocably authorise us, at any time when we have grounds to believe that you owe or may owe any money to us, or any of your Traded Receivables are outstanding: '
      },
      {
        order: '(1)',
        subTitle: 'to transfer the Proceeds of any of your Traded Receivables or Non-Traded Receivables received by us or credited to your Registered User Account having exchanged same for digital assets to a Digital Asset suspense account, and/or to hold the digital Assets which have been exchanged for the Proceeds in a Digital Asset suspense account for as long as we may consider necessary for us to determine: '
      },
      {
        order: '(a)',
        subTitle: 'whether or not they are the Proceeds of a Traded Receivable or Non-Traded Receivable; '
      },
      {
        order: '(b)',
        subTitle: 'the amount, if any, you owe or may in future owe to any Purchasing Funder and/or us (and making such determinations we will be entitled to make a reasonable estimate of any contingent liabilities); '
      },
      {
        order: '(c)',
        subTitle: 'whether or not you have any remaining contingent liabilities; '
      },
      {
        order: '(2)',
        subTitle: 'having made such determinations, (at all times retaining sufficient Digital Assets converted from monies in the suspense account to meet your contingent liabilities), to transfer the amounts in Digital Assets owed by you to the Digital Asset Pooled Account to be applied to meet your actual liabilities in whole or part having previously exchanged the monies into digital assets..'
      }
    ]

    const undertakingLists = [
      {
        order: '7.1',
        subTitle: 'Powers and Authority of Registered Users: You represent and warrant to us and to each Registered User that: '
      },
      {
        order: '(1)',
        subTitle: 'by agreeing to be bound by the Registered User Agreement you have not and will not violate any law, regulation, judicial order, Security Interest, other contract applicable to you; '
      },
      {
        order: '(2)',
        subTitle: 'all incorporation documents, authorisations. banking details, financial, trading and other information provided by or on behalf of you to us is true and accurate in all material respects and does not omit any material fact; '
      },
      {
        order: '(3)',
        subTitle: 'no Receivable Listed or Bid made by you is for money laundering purposes or in contravention of any applicable law.'
      },
      {
        order: '7.2',
        subTitle: 'Registered User undertakings: You undertake to us and each other Registered User to: '
      },
      {
        order: '(1)',
        subTitle: 'use the Populous World Ltd. Platform, and the Licensed Materials in full compliance with the Populous World Ltd. rules and the Registered User Guidance; '
      },
      {
        order: '(2)',
        subTitle: 'comply, in all material respects, with all applicable laws affecting your participation in and use of the Populous World Ltd. Platform; '
      },
      {
        order: '(3)',
        subTitle: 'not at any time after becoming a Registered User use, divulge or communicate to any person (except to your professional representatives or advisers or as may be required by law or any legal or regulatory authority) any Confidential Information, and will use your best endeavours to prevent the unauthorised publication or disclosure of any Confidential Information, and will only use Confidential Information for the purposes of proposing, considering or making transactions through the Populous World Ltd. Platform.'
      },
      {
        order: '7.3',
        subTitle: 'Non-Solicitation: You undertake to us that you will not, either on your own account or with any other person, and whether directly or indirectly at any time that you are a Registered User and for a period of 6 months thereafter, entice away or attempt to entice away 01- authorise the taking of such action by any other person, any Registered User (or any person that has been a Registered User within 12 months of the date on which the exiting Registered User’s Registered registration ended).'
      },
      {
        order: '7.4',
        subTitle: 'Business Finance: You undertake to us that you will not at any time that you are a Registered User contact any other Registered User in order to: '
      },
      {
        order: '(1)',
        subTitle: 'offer to sell to or purchase from another Registered User any receivable, other than through the Populous World Ltd. Platform, whether or not the receivables have been Listed previously: '
      },
      {
        order: '(2)',
        subTitle: 'cause or encourage the Registered User to acquire any Business Finance.'
      }
    ]

    const invoiceUndertakingLists = [
      {
        order: '8.1',
        subTitle: 'Invoice Seller Warranties: By submitting a Registered User Application and each time you List a Receivable, you represent and warrant, or will be treated as having represented and warranted, to us that: '
      },
      {
        order: '(1)',
        subTitle: 'you have told us about every material fact which you know, or ought to know, that might influence us or a potential Funder or Invoice Buyer in deciding whether to offer to purchase the Receivable or in determining whether to attach any conditions to your Registered registration; '
      },
      {
        order: '(2)',
        subTitle: 'all accounts and other information supplied by you via the .Populous World Ltd. Platform are accurate and complete, and that you have authority to provide the Invoice Buyer, the Invoice Seller or a Debtor Information to us for analysis and disclosure to Funders.'
      },
      {
        order: '8.2',
        subTitle: 'Use of Business Finance: You undertake to us: '
      },
      {
        order: '(1)',
        subTitle: 'you will not, without our prior written consent, enter into any Business Finance which does or might affect your Receivables; '
      },
      {
        order: '(2)',
        subTitle: 'you will immediately notify us in writing of: '
      },
      {
        order: '(a)',
        subTitle: 'the existence and give full particulars of each Business Finance agreement which you have entered or intend to enter to, including any invoice finance facility and any secured or unsecured loan facilities; '
      },
      {
        order: '(b)',
        subTitle: 'any legal disputes in which you are involved; at the time you become a Registered User, and for the duration of the Registered User Agreement, immediately as such facilities, disputes and liabilities arise or are proposed.'
      },
      {
        order: '8.3',
        subTitle: 'Warranties as to information: Each time you List a Receivable, you represent and warrant to us and to each Funder or Invoice Buyer that:'
      },
      {
        order: '(1)',
        subTitle: 'all the particulars in your Profile and that the Invoice Buyer, the Invoice Seller or a Debtor Information are correct and complete; '
      },
      {
        order: '(2)',
        subTitle: 'since such particulars were last provided to us, no Termination Event has occurred.'
      },
      {
        order: '8.4',
        subTitle: 'Warranties as to Listed Receivables: Each time the Invoice Seller Lists a Receivable, you the Invoice Seller represents and warrant to us and each Purchasing Funder or Invoice Buyer that, in relation to the Receivable: '
      },
      {
        order: '(1)',
        subTitle: 'all the particulars given in the Listing are correct and complete; '
      },
      {
        order: '(2)',
        subTitle: 'the Receivable is not a Defaulted Receivable; '
      },
      {
        order: '(3)',
        subTitle: 'the Sales and Purchase Agreement giving rise to the Receivable: '
      },
      {
        order: '(a)',
        subTitle: 'is valid, binding and enforceable against the Invoice Buyer, the Invoice Seller or a Debtor; '
      },
      {
        order: '(b)',
        subTitle: 'is governed by England & Wales United Kingdom laws and provides for the Invoice Buyer, the Invoice Seller or a Debtor’s submission to the jurisdiction of the England & Wales United Kingdom courts; '
      },
      {
        order: '(c)',
        subTitle: 'contains no prohibition preventing you holding the Receivable and its Proceeds 011 trust; '
      },
      {
        order: '(d)',
        subTitle: 'provides for payment on or before the Invoice Due Date;'
      },
      {
        order: '(e)',
        subTitle: 'does not provide for cash on delivery, or sale or return; '
      },
      {
        order: '(f)',
        subTitle: 'is made in the ordinary course of your business; '
      },
      {
        order: '(g)',
        subTitle: 'does not contain any prohibition preventing the Receivable from being assigned to a third party; '
      },
      {
        order: '(h)',
        subTitle: 'permits you to assign the Receivable to a third party; '
      },
      {
        order: '(4)',
        subTitle: 'you have performed all obligations required for enforcement of the Receivable; '
      },
      {
        order: '(5)',
        subTitle: 'you are the legal and beneficial owner of the Receivable; '
      },
      {
        order: '(6)',
        subTitle: 'the Receivable has not previously been sold or offered for sale to us or any person; '
      },
      {
        order: '(7)',
        subTitle: 'the Face Value is the amount due in respect of the Receivable, and you have fully disclosed in the Listing any rebate, prompt payment, bulk order discount, credit note or the like; '
      },
      {
        order: '(8)',
        subTitle: 'The Invoice Buyer, the Invoice Seller or a Debtor has not, and will not assert any, right of set-off, deduction, abatement, defence or counterclaim in respect of the Receivable; '
      },
      {
        order: '(9)',
        subTitle: 'The Invoice Buyer, the Invoice Seller or a Debtor is creditworthy and is not insolvent; '
      },
      {
        order: '(10)',
        subTitle: 'The Invoice Buyer, the Invoice Seller or a Debtor is not a relative or officer of you, or an associate; '
      },
      {
        order: '(11)',
        subTitle: 'The Receivable does not arise (a) from the sale of your capital assets, (b) under any loan, hire purchase, leasing or consumer credit sale agreement: '
      },
      {
        order: '(12)',
        subTitle: 'there are no Security Interests, trusts, tracing or other third party claims, and you have not entered into any factoring, securitisation program or other similar arrangement, which may adversely affect enforcement of the Receivable.'
      },
      {
        order: '8.5',
        subTitle: 'Invoice Seller undertakings: As Invoice Seller, you undertake to us that, at any time when you have a live Trade or any outstanding Traded Receivable you will: '
      },
      {
        order: '(1)',
        subTitle: 'tell us immediately if you become aware of any of the following: '
      },
      {
        order: '(a)',
        subTitle: 'any dispute (whether justifiable or not) between you and at the Invoice Buyer, the Invoice Seller or a Debtor and any claim or attempt by the Invoice Buyer, the Invoice Seller or a Debtor to pay less than the Face Value: '
      },
      {
        order: '(b)',
        subTitle: 'if you purchase Goods from or owe any money to the Invoice Buyer or a Debtor or there are any contracts or other arrangements between you and the Invoice Buyer or a Debtor, which could reduce the Face Value; '
      },
      {
        order: '(c)',
        subTitle: 'any Termination Event occurs;'
      },
      {
        order: '(2)',
        subTitle: 'immediately notify us the moment you have reasonable grounds to believe that any Traded Receivable is or likely to become a Defaulted Receivable; '
      },
      {
        order: '(3)',
        subTitle: 'not (without our express written consent) vary any payment terms or settlement discount in respect of any Traded Receivable nor waive, vary, rescind or terminate any Sales and Purchase Agreement. nor raise any credit note, nor instruct the Invoice Buyer or a Debtor to make payment in respect of any Traded Receivable to any account other than your Digital Asset Wallet Registered User Account; '
      },
      {
        order: '(4)',
        subTitle: 'Promptly perform any continuing obligations under any Sales and Purchase Agreement and try to resolve promptly any Invoice Buyer or Debtor’s disputes and claims; '
      },
      {
        order: '(5)',
        subTitle: 'promptly tell us of any other matters (such as issue of credit notes or allowance of early payment or purchase discounts) which may cause the Face Value to be reduced or extinguished.'
      },
      {
        order: '8.6',
        subTitle: 'Repetition: The representations, warranties and undertakings contained in clause 8 will be repeated daily from the date of Listing until the Remittance Date of the Traded Receivable.'
      }
    ]

    const funderUndertakings = [
      {
        order: '9.1',
        subTitle: 'Funder warranties: As Funder, by applying to become a Registered User you hereby represent and warrant to us: '
      },
      {
        order: '(1)',
        subTitle: 'there are no agreements or arrangements affecting you which prevent the purchase of the Receivables; '
      },
      {
        order: '(2)',
        subTitle: 'you will decide to make a Bid based on your own assessment of the material facts and will not rely upon any representations express or implied made by us; and '
      },
      {
        order: '(3)',
        subTitle: 'you have the legal power and authority to offer to purchase and to pay for the Receivables in accordance with your Bid and the Populous World Ltd. rules; and each time you make a Bid you will be treated as having repeated the same representations and warranties set out at clause 9.1 (1) and 9.1 (3) above to us and to the Invoice Seller who Listed the Receivable.'
      },
      {
        order: '9.2',
        subTitle: 'Funder undertaking: You undertake to use Profiles, Invoice Buyer, the Invoice Seller or a Debtor Information and all Confidential Information (including Populous World Ltd. analytics and registered user transaction data) that you may receive from us for the sale purpose of entering or considering whether to enter transactions through the Populous World Ltd. subject to the terms and conditions of this Registered Users Agreement including disclaimers.'
      }
    ]

    const receivables = [
      {
        order: '10.1',
        subTitle: 'Repurchase: We may (but are not obliged to) require an Invoice Seller to repurchase a Traded Receivable using digital assets upon or at any time after the occurrence of a Termination Event, or we have grounds to believe that the Receivable is or has become or is likely to become a Defaulted Receivable. The Invoice Seller must repurchase the Traded Receivable by 60 days after the Due Date of the Traded Receivable. The Invoice Seller must then pay to us the Repurchase Price.'
      },
      {
        order: '10.2',
        subTitle: 'Repurchase Price: The Repurchase Price, in respect of any day on which a Traded Receivable is outstanding, will be calculated in accordance with the formula: '
      },
      {
        order: '',
        subTitle: 'IFF + A + LPF + RPF] - C; where '
      },
      {
        order: '',
        subTitle: 'FF is the Funders Fee '
      },
      {
        order: '',
        subTitle: 'A is the Advanced Amount '
      },
      {
        order: '',
        subTitle: 'LPF is the Late Payment Fee '
      },
      {
        order: '',
        subTitle: 'RPF is the Repurchase Penalty Fee, if it is overdue by 30 days or more '
      },
      {
        order: '',
        subTitle: 'C is any sum actually received in cleared funds and applied by us in or towards the discharge, in whole or in part, of the Traded Receivable.'
      },
      {
        order: '10.3',
        subTitle: 'Retransfer: Upon payment In full by the Invoice Seller of the Repurchase Price and all sums in digital assets owed to us under the Populous World Ltd. rules, the beneficial interest in the Traded Receivable will re-vest in the Invoice Seller. Upon the Invoice Seller’s request and at its expense. we will execute a confirmation of the re-assignment to the Registered User of any such Receivable.'
      }
    ]

    const sellerInfo = [
      {
        order: '11.1',
        subTitle: 'Supply information upon request: As Invoice Seller you will supply to us (promptly upon our request and wherever possible via the website) or at our option make available for inspection by us the following documents and/or information: copies of Invoices and all debit and credit notes or other documents evidencing how a Traded Receivable has been reduced, paid or otherwise satisfied; '
      },
      {
        order: '(1)',
        subTitle: 'proofs of delivery or other evidence that you have Delivered Goods according to the Sales and Purchase Agreement; '
      },
      {
        order: '(2)',
        subTitle: 'any other information and evidence as we may require relating to any Traded Receivable and/or Sales and Purchase Agreement and/or Related Rights; '
      },
      {
        order: '(3)',
        subTitle: 'any financial or other information we may request relating to your business or affairs.'
      },
      {
        order: '11.2',
        subTitle: 'Populous World Ltd. verifications: As Invoice Seller you authorise us at any time to contact the Invoice Buyer or Debtors to seek any information we may require in relation to the Traded Receivable.'
      }
    ]

    const enforcementLists = [
      {
        order: '12.1',
        subTitle: 'On notice: Your Registered User Agreement may be terminated at any time upon fourteen (14) days prior written notice given by us to you, or by you to us.'
      },
      {
        order: '12.2',
        subTitle: 'Termination Events: Each of the following will be a Termination Event, upon or at any time after the occurrence of which we may terminate your Registered User Agreement by written notice: '
      },
      {
        order: '(1)',
        subTitle: 'you breach or threaten to breach any warranty, undertaking or other obligation given or undertaken by you in the Populous World Ltd. Rules, or any related guarantee or security; '
      },
      {
        order: '(2)',
        subTitle: 'you fail to pay any sum due from you to us under the Populous World Ltd. rules; '
      },
      {
        order: '(3)',
        subTitle: 'you are determined by us to have (or to have attempted to) hack into or otherwise interfere with the Populous World Ltd. Platform, or we have reason to believe you have committed or attempted to commit any act of fraud on or through the Populous World Ltd. Platform; '
      },
      {
        order: '(4)',
        subTitle: 'you or either the Invoice Buyer, the Invoice Seller or a Debtor becomes insolvent; '
      },
      {
        order: '(5)',
        subTitle: 'you fail to pay any sum due under any other financing facility made available by any person to you or otherwise breach the terms of any such facility; '
      },
      {
        order: '(6)',
        subTitle: 'you cease to carry on the business conducted by you when you became a Registered User; '
      },
      {
        order: '(7)',
        subTitle: 'we consider there is a serious deterioration in your financial condition or in your creditworthiness or in your operating performance or your management and control or in your general day to day administration and organisation or in your sales ledger administration or credit control procedures; '
      },
      {
        order: '(8)',
        subTitle: 'any lender or holder of a Security Interest who has waived or released its rights to your Receivables, withdraws or attempts to withdraw, the waiver or release or otherwise asserts any interest in your Receivables.'
      },
      {
        order: '12.3',
        subTitle: 'Populous World Ltd. rights after Termination Event: On the expiry of the period of notice to terminate a Seller Registered User Agreement, or (if we so elect) at any time after a Termination Event has occurred (whether we have chosen to exercise our right to terminate the Registered User Agreement), we may do all or any of the following: '
      },
      {
        order: '(1)',
        subTitle: 'suspend your rights to participate in the Populous World Ltd. Platform and/or cancel any of your Listings (without releasing any of your obligations or liabilities to us or other Registered users). '
      },
      {
        order: '(2)',
        subTitle: 'Require you to repurchase any or all your outstanding Traded Receivables; '
      },
      {
        order: '(3)',
        subTitle: 'demand immediate payment of any Repurchase Price then or prospectively owing by you to us, and any and all fees and charges (and, if we cannot calculate the precise amount of any liability owing on the date of making a provision for it or a demand for payment, we may use a reasonable estimate in making the provision or demand); '
      },
      {
        order: '(4)',
        subTitle: 'refuse requests for withdrawals from, or apply a Reserve to, your Registered User Account, and retain the account balance or Reserve amount pending the settlement of all sums then or prospectively owing by you to us.'
      },
      {
        order: '12.4',
        subTitle: 'Seller’s position: As Invoice Seller, you agree that after a Termination Event occurs you will at your own expense, provide all assistance requested by us to enable us to collect any Traded Receivable,'
      },
      {
        order: '12.5',
        subTitle: 'Effect of termination: Except as otherwise provided, termination of your Registered User Agreement will not affect our respective rights or obligations in respect of (a) any of your outstanding Traded Receivables, (b) all transactions or events having their inception prior to the termination, including the continued running of all fees, charges and expenses payable by you and our rights to set-off monies or combine accounts, and (c) any Confidential Information.'
      }
    ]

    const platformInfoList = [
      {
        order: '13.1',
        subTitle: 'License: We grant you a non-exclusive, non-transferable and revocable license to use, access and communicate through the Populous World Ltd. Platform, and to use the Licensed Materials solely for the purposes contemplated by the Populous World Ltd. rules (together “the License”),'
      },
      {
        order: '13.2',
        subTitle: 'Property: You will at all times recognise and respect our property and copyright in the Populous World Ltd. Platform and/or the terms of License and you may not copy or otherwise deal with the same without our written consent and you must safeguard and keep them confidential. We are entitled to compile and formulate Profiles, Populous World Ltd. Analytics and Registered User Transaction Data and such Profiles, Populous World Ltd. Analytics and Registered User Transaction Data and the information contained in them will be our sole and exclusive property.'
      },
      {
        order: '13.3',
        subTitle: 'Your use of the Populous World Ltd. platform: You agree that we may immediately at any time without notice to you suspend your access to the Populous World Ltd. Platform, thereby preventing you from Listing or Bidding (without releasing any of your obligations and liabilities to us or other Registered Users), You also agree that: '
      },
      {
        order: '(1)',
        subTitle: 'you will keep confidential all user identification numbers, passwords and other security processes and devices provided bv us and ensure that only your authorised employees or agents have access to the Populous World Ltd. Platform; '
      },
      {
        order: '(2)',
        subTitle: 'you are solely responsible for all Listings, Bids or other transactions or actions that take place using the Populous World Ltd. Platform in your name that are carried out by any person, whether or not duly authorised, if you could or should have reasonably prevented them from accessing the Populous World Ltd. Platform: '
      },
      {
        order: '(3)',
        subTitle: 'we have the absolute right not to act on your or any Registered User’s instructions if we consider there is a risk that by taking or refraining to take action we may violate any law, regulation or other requirement of any governmental or other authority.'
      },
      {
        order: '13.4',
        subTitle: 'Invoice Seller’s rights: If you are an Invoice Seller, we may immediately at any time without notice to you, impose or vary conditions relating to your use of the Populous World Ltd. Platform, including: '
      },
      {
        order: '(1)',
        subTitle: 'setting a limit on the value or volume of Receivables you may List; '
      },
      {
        order: '(2)',
        subTitle: 'prohibiting you Listing any category of your Receivables, or any specific Receivable,'
      }
    ]

    const rightLists = [
      {
        order: '14.1',
        subTitle: 'Compensation: You will compensate us in full for all losses, actions, proceedings, costs, claims, demands, awards, orders, expenses and liabilities (including reasonable legal fees) incurred by us at any time (and any additional administrative time incurred by us charged at such rate as we may reasonably determine) directly or indirectly as a result of:'
      },
      {
        order: '(1)',
        subTitle: 'any breach of your obligations under the Populous World Ltd. Rules or preserving or enforcing our rights under the Populous World Ltd. rules; '
      },
      {
        order: '(2)',
        subTitle: 'exercising any of our rights to collect Receivables or dealing with disputes relating to a Receivable; '
      },
      {
        order: '(3)',
        subTitle: 'the occurrence of a Termination Event; '
      },
      {
        order: '(4)',
        subTitle: 'obtaining or enforcing a release of Receivables and Related Rights or waiver of rights, from any person with a Security Interest:'
      },
      {
        order: '(5)',
        subTitle: 'your fraud or will ful misconduct, misuse of any technology or any intellectual property rights licensed to you; '
      },
      {
        order: '(6)',
        subTitle: 'the transmission to us or our receipt of incorrect, incomplete, inaccurate information failure to receive a message or upload in each case however caused; '
      },
      {
        order: '(7)',
        subTitle: 'accepting and/or acting upon any electronic message or other communication, information or instructions purporting to come from you even if that information or those instructions subsequently prove to have been incorrect or unauthorised by you (except to the extent that we have been grossly negligent and/or fraudulent); '
      },
      {
        order: '(8)',
        subTitle: 'collecting and/or crediting to your Registered User Account (or any other account nominated by us) any Non-Traded Receivable or any check or other negotiable instrument payable to you or endorsed in your favour; '
      },
      {
        order: '(9)',
        subTitle: 'any claim by the Invoice Buyer, the Invoice Seller or a Debtor against us.'
      },
      {
        order: '14.2',
        subTitle: 'Populous World Ltd. set-off: We may (but are not obliged to) at any time without notice to you: '
      },
      {
        order: '(1)',
        subTitle: 'set-off against our liability to you any liability you owe to us, and for that purpose may make a reasonable estimate of any amounts contingently or prospectively due from you to us, and may debit sufficient digital assets from your Digital Asset Wallet Registered User Account; '
      },
      {
        order: '(2)',
        subTitle: 'appropriate and set-off against any liability you owe to us any Proceeds received in relation to any of your Traded Receivables or Non-Traded Receivables; '
      },
      {
        order: '(3)',
        subTitle: 'combine or consolidate all or any of your Registered User Accounts with us, and if necessary to give effect to such right. we may convert digital assets currencies at our Website’s prevailing spot rate of exchange.'
      }
    ]

    const liabilityLists = [
      {
        order: '15.1',
        subTitle: 'Commercial risks: You agree that you. and not us, assume and accept all risks associated with entering into transactions using the Populous World Ltd. Platform, including: '
      },
      {
        order: '(1)',
        subTitle: 'whether there is or may be a breach of any warranty or undertaking given by any other Registered User under the Populous World Ltd. rules; '
      },
      {
        order: '(2)',
        subTitle: 'the identity, solvency, creditworthiness, and good faith of other Registered Users such as the Invoice Buyer, the Invoice Seller or a Debtor; '
      },
      {
        order: '(3)',
        subTitle: 'that all information provided by any Registered User about (a) its financial condition, trading history and trading prospects and any other material facts about itself, and (b) its Sales and Purchase Agreements and Receivables (whether Listed or Traded, or not) and any other material facts relating to its business, are genuine, complete and accurate; '
      },
      {
        order: '(4)',
        subTitle: 'whether a Listed Receivable will be paid by the Invoice Buyer, the Invoice Seller or a Debtor, in whole or part.'
      },
      {
        order: '15.2',
        subTitle: 'No Populous World Ltd. warranties: We make no representation or warranty of any kind (express or implied): '
      },
      {
        order: '(1)',
        subTitle: 'by providing the Licensed Materials and all information on and data contained within the Populous World Ltd. Platform, which is provided on an “as is” and “as available” basis; '
      },
      {
        order: '(2)',
        subTitle: 'by verifying any information provided by an Invoice Seller; '
      },
      {
        order: '(3)',
        subTitle: 'that use of or access to the Populous World Ltd. Platform will be uninterrupted, error free or free of computer viruses or computer bugs, or that defects will be corrected, or give any warranty otherwise as to their functionality, accuracy, or reliability.'
      },
      {
        order: '15.3',
        subTitle: 'Our liability: We (including our directors, agents and employees) shall not be liable to you in contract, tort (including negligence) or otherwise for: '
      },
      {
        order: '1)',
        subTitle: 'any consequential, secondary or indirect loss, injury or damage, '
      },
      {
        order: '2)',
        subTitle: 'any business losses. such as loss of data, profits, anticipated savings, revenue. business, opportunity, goodwill, reputation, or '
      },
      {
        order: '3)',
        subTitle: 'business interruption or for any losses which are not reasonably foreseeable by us arising, directly or indirectly from: '
      },
      {
        order: '(1)',
        subTitle: 'events outside our reasonable control that prevent us from doing something, including restrictions on convertibility or transferability of funds, requisitions, involuntary transfers, fire, flood, explosion, acts of God, civil commotion, strikes or industrial action of any kind, riots, insurrection, terrorism, war or acts of government; '
      },
      {
        order: '(2)',
        subTitle: 'use or loss of use, data or profits arising out of or in connection with the Populous World Ltd. Rules or the use or reproduction of Licensed Materials, including the use of or inability to use the Populous World Ltd. Platform or the inability to obtain access to or to transact over the Populous World Ltd. Platform; '
      },
      {
        order: '(3)',
        subTitle: 'the conversion of monies owing to you from one currency to another at your request for no fee or from monies to digital assets; '
      },
      {
        order: '(4)',
        subTitle: 'any error, fraud or misconduct attributable, directly or indirectly, to any act or omission on the part of any other Registered User or person other than us; '
      },
      {
        order: '(5)',
        subTitle: 'any unauthorised use of the Populous World Ltd. Platform attributable, directly or indirectly, to any act or omission on the part or any other Registered User or person other than us; '
      },
      {
        order: '(6)',
        subTitle: 'any misuse by any other Registered User of any Registered User’s Profile, the Invoice Buyer, the Invoice Seller or a Debtor lnformatlon, Populous World Ltd. Analytics or Registered User Transaction Data provided by us; '
      },
      {
        order: '(7)',
        subTitle: 'any breach by a Registered User of its obligations of confidentiality.'
      },
      {
        order: '15.4',
        subTitle: 'Limit of our liability: Regardless of the previous clauses, if we are found liable, our liability to you, whether arising in contract, restitution or tort (including negligence) will be limited to the greater of: (a) GBP 25,000.00 (twenty five thousand British Pounds Sterling) or (b) the amount of any Platform Fees or Populous World Ltd. Funder Commissions paid by you in the 6 months preceding the date of the claim.'
      },
      {
        order: '15.5',
        subTitle: 'Not excluded: Nothing in clause 15 shall limit or exclude our liability for fraudulent misrepresentation, for death or personal injury resulting from our negligence or the negligence of our agents or employees or for any other liability that cannot be limited or excluded by law.'
      }
    ]

    const generalLists = [
      {
        order: '16.1',
        subTitle: 'Transfers: Your Registered User Agreement is personal to you and you may not transfer or hold on trust any of your rights and responsibilities under the agreement without our written consent. For business reasons, we may transfer any of our rights and responsibilities under your Registered User Agreement or any Traded Receivable without your permission.'
      },
      {
        order: '16.2',
        subTitle: 'Variations: We may vary any part of your Registered User Agreement by giving you 14 days notice of a proposed variation by uploading the same to the Populous World Ltd. Platform and/or by email. If you do not agree to the proposal, you may within 14 days of receiving notice immediately terminate your Registered User Agreement by written notice to us. All amended terms will automatically be effective 14 days after they are posted or sent bye-mail. and/or if you subsequently list a Receivable or make a bid.'
      },
      {
        order: '16.3',
        subTitle: 'No waiver: No waiver under your Registered User Agreement by us is effective unless it is in writing, identified as a waiver to your Registered User Agreement, and signed by our authorised representative. Any waiver authorised on one occasion is effective only in that instance and only for the purpose stated, and does not operate as a waiver on any future occasion. Failure, delay and course of dealing shall not constitute a waiver.'
      },
      {
        order: '16.4',
        subTitle: 'Illegality: If any provision of the Populous World Ltd. rules is held to be wholly or partially invalid, void or for any reason unenforceable, the provision or part shall be struck out and will not affect the validity and enforceability of the remaining provisions.'
      },
      {
        order: '16.5',
        subTitle: 'Whole agreement: Your Registered User Agreement constitutes the whole agreement between you and other Registered Users and supersedes all previous agreements and understandings relating to the subject matter.'
      },
      {
        order: '16.6',
        subTitle: 'Priority: In title event of conflict between any terms of your Registered User Agreement, the conflict will be resolved according to the following order of priority: (a) the Populous World Ltd. rules, (b) the Registered User Guidance.'
      },
      {
        order: '16.7',
        subTitle: 'Notices: We may give any notice required under the Populous World Ltd. rules in writing by post or email to you to the current address held in our records, or posting a message to you on the Populous World Ltd. Platform. You may specify additional or different address information by sending the details in writing (including email) to us. All notices and other communications sent between you and us will be effective upon delivery, except where emailed or posting a message, in which case they are effective upon sending or posting.'
      },
      {
        order: '16.8',
        subTitle: 'Complaints: If you wish to make a formal complaint about the services we provide to you under the Registered User Agreement, you may do so at any time by post, email or telephone at such addresses or on such telephone numbers as notified to you from time to time on Populous World Ltd.’s website.'
      },
      {
        order: '16.9',
        subTitle: 'Governing law and jurisdiction: The Law of England & Wales United Kingdom governs your Registered User Agreement and all Trades. The courts of England & Wales in the United Kingdom have exclusive jurisdiction to hear any dispute arising out of or in connection with your Registered User Agreement and all Trades and all parties irrevocably submit to such Jurisdiction.'
      }
    ]

    const definitionLists = [
      {
        order: '17.1',
        subTitle: 'Defined terms: In the Populous World Ltd. rules and vour Registered User Agreement (references to which will always incorporate the Schedule), Populous World Ltd. “we” and “us” are references to Populous World Ltd. and the following terms are used: '
      },
      {
        order: '“Advanced Amount”',
        subTitle: 'means the amount payable to the Invoice Seller by us on account of the funded amount '
      },
      {
        order: '“Advance Percentage”',
        subTitle: 'means the stipulated percentage of the Face Value of a Receivable '
      },
      {
        order: '“Bid”',
        subTitle: 'means an offer made to purchase a proportion of a Receivable for specified Funder Gain, including Bids made by clicking the “Buy Now” or “Bid” button on the Populous World Ltd. Platform '
      },
      {
        order: '“Business Day”',
        subTitle: 'means any day (other than a Saturday or Sunday) on which banks are open for general business in England & Wales in the United Kingdom '
      },
      {
        order: '“Business Finance”',
        subTitle: 'means all forms of finance agreements available to businesses other than equity finance and the trading through buying and selling of Receivables on the Populous World Ltd. Platform '
      },
      {
        order: '“Buy Now Discount Rate”',
        subTitle: 'means the stipulated percentage of the Face Value of a Receivable provided by Invoice Seller that will be used for the minimum Funders Fee for the Maximum Advance-able Amount. '
      },
      {
        order: '“Closed Date”',
        subTitle: 'means the date after a successful auction is listed '
      },
      {
        order: '“Competitive Trade”',
        subTitle: 'means process of selling a Receivable through the Populous World Ltd. Platform at the best competing Bids stipulating the Funder Gain and Advance Percentage, including the contract of sale of the Receivable '
      },
      {
        order: '“Confidential Information”',
        subTitle: 'means all information in whatever form relating to us or any other Registered user (including a previous Registered User) which is disclosed or made available to a Registered User of the Populous World Ltd. Platform (including to any of their employees, representatives or advisers) by us or over the Populous World Ltd. Platform including (a) the terms of the Populous World Ltd. Rules, (b) any information that would be regarded as confidential by a reasonable business person relating to the business, affairs, the Invoice Buyer, the Invoice Seller or Debtors, clients or suppliers of a Registered User, and (c) any information or analysis derived from Confidential Information; but not including any information that (d) is or becomes generally available to the public other than as a result of a disclosure in breach of the Populous World Ltd. Rules, (e) was available to or lawfully in the possession of a Registered User prior to any disclosure by us or over the Populous World Ltd. Platform, or (f) is trivial, obvious or useless. '
      },
      {
        order: '“Customer” and “The Invoice Buyer or the Invoice Seller or a Debtor”',
        subTitle: 'are used interchangeably and means a person registered as a User who incurs or who may incur any indebtedness under a Sales and Purchase Agreement '
      },
      {
        order: '"The Invoice Buyer, the Invoice Seller or Debtor Information"',
        subTitle: 'means information relating to the Invoice Buyer, the Invoice Seller or a Debtor '
      },
      {
        order: '"Defaulted Receivable"',
        subTitle: 'means a Receivable (a) payable by the Invoice Buyer, the Invoice Seller or a Debtor who the Invoice Seller knows or ought to know is Insolvent, or who disputes or is likely to dispute its liability to pay or pay the Receivable by the Invoice Due Date, or (b) which should reasonably be considered as uncollectible, or (c) is not paid within 60 days after the Due Date '
      },
      {
        order: '"Delivered"',
        subTitle: 'means in relation to Goods: physical delivery to (or to the order of) (a) the Invoice Buyer, the Invoice Seller or a Debtor; (b) the Invoice Buyer, the Invoice Seller or a Debtor taking the risk in the Goods; or (c) complete performance of the Sales and Purchase Agreement ("deliver" and "delivery" are to be similarly construed) '
      },
      {
        order: '"Due Date"',
        subTitle: 'means the payment due date of the Receivable '
      },
      {
        order: '"Face Value"',
        subTitle: 'means the full amount of a Listed Receivable (including any applicable tax or duty) appearing on the face of the Invoice and before any discount for prompt payment or otherwise '
      },
      {
        order: '"Free Cash Balance"',
        subTitle: 'means the total funds held in a Funder Registered User account minus all outstanding bids, unsettled trades and pending withdraws. '
      },
      {
        order: '"Funder"',
        subTitle: 'means an Invoice Buyer and includes a Registered User granted access to the Populous World Ltd. Platform to Bid for Receivables by Trade '
      },
      {
        order: '"Funder Gain"',
        subTitle: 'means the amount a Funder expects to earn from a won Bid. '
      },
      {
        order: '"Funders Fee"',
        subTitle: 'means an amount an Invoice Seller must forfeit as a fee from the Non-Advanced Amount of a receivable. '
      },
      {
        order: '"Goods"',
        subTitle: 'means any goods or services the subject of a Sales and Purchase Agreement A person is "Insolvent" if (a) it is or deemed to be unable to pay its debts or to be insolvent, (b) it ceases to trade or we have reason to believe it has ceased to trade, (c) any step is taken with a view to it entering into any insolvency process or arrangement, (d) an administrator, receiver, liquidator or trustee in bankruptcy is appointed over it or its assets, (e) it is insolvent within the meaning of the Bankruptcy Ordinance or the Companies (Winding Up and Miscellaneous Provisions) Ordinance '
      },
      {
        order: '"England & Wales”',
        subTitle: 'means the territory of England & Wales in the United Kingdom. '
      },
      {
        order: '"GBP"',
        subTitle: 'means the British Pound Sterling. '
      },
      {
        order: '"Invoice"',
        subTitle: 'means the original sales document or electronic record of a Receivable '
      },
      {
        order: '"Invoice Issue Date"',
        subTitle: 'means the date an Invoice is issued or created by an Invoice Seller. '
      },
      {
        order: '"Invoice Buyer"',
        subTitle: 'means a Registered User granted access to the Populous World Ltd. Platform to buy Receivables by Trade and includes any person who incurs or who may incur any indebtedness under a Sales and Purchase Agreement including a person who is a Buyer of an Invoice on the platform and who purchases the trade debt of an Invoice at a discount using the value ascribed by the smart contract to the Populous digital assets called Poken or PPT. '
      },
      {
        order: '"Invoice Seller"',
        subTitle: 'means a Registered User granted access to the Populous World Ltd. Platform to sell Receivables by Trade '
      },
      {
        order: '"Licensed Materials"',
        subTitle: 'means the Invoice Seller Profiles, Registered User Transaction Data and other information provided by us or any of our authorised agents on the Populous World Ltd. Platform '
      },
      {
        order: '"Listing"',
        subTitle: 'means an Invoice Seller uploading details of a Receivable onto the Populous World Ltd. Platform so as to invite Bids (and "Listed" and to "List" are to be similarly construed) '
      },
      {
        order: '"Listing Period"',
        subTitle: 'means the period commencing at the time when the Invoice Seller Lists a Receivable and ending in 24 hours "Maximum Advance Percentage" means the stipulated percentage of the Face Value of a Receivable provided by Populous World Ltd. '
      },
      {
        order: '"Maximum Advanceable Amount"',
        subTitle: 'means the Maximum Advance Percentage of the The Invoice Buyer, the Invoice Seller or a Debtor which. Populous World Ltd. has approved multiplied by the Face Value of the Traded Receivable '
      },
      {
        order: '"Maximum Discount Rate"',
        subTitle: 'means tile stipulated percentage of the Face Value of a Receivable provided by Invoice Seller that will be used for the maximum Funders Fee'
      },
      {
        order: '"Registered User"',
        subTitle: 'means any person, partnership, company or other legal entity which has agreed to be bound by the Populous World Ltd. Rules and who we have described as a Member/Registered User and accepted as a Registered User '
      },
      {
        order: '"Registered User Account"',
        subTitle: 'means a Digital Asset Wallet account with us, designated with the name of a Registered User '
      },
      {
        order: '"Registered User Agreement"',
        subTitle: 'means the agreement made when a person is unconditionally accepted as a Registered User and incorporating the Populous World Ltd. Rules, Populous World Ltd. Fee and Commission Schedule, Privacy Notice and the Registered User Guidance '
      },
      {
        order: '"Registered User Funds"',
        subTitle: 'means all money to be used towards the purchase of Digital Assets whether held on a Registered User Account or owing and payable or passing through a payment, settlement or clearance system, representing (as the case may be) (a) part or all the Advanced Amount for the purchase of Digital Assets, (b) the Proceeds of a Traded Receivable or a Non-Traded Receivable '
      },
      {
        order: '"Registered User Guidance"',
        subTitle: 'means all guidance and instructions from time to time made available by us to Registered Users through the Populous World Ltd. Platform in relation to trading Receivables '
      },
      {
        order: '"Registered User Transaction Data"',
        subTitle: 'means data and other information compiled by us relating to transactions by an Invoice Seller in Listed and Traded Receivables as well and includes data on the Invoice Buyer, the Invoice Seller or a Debtor. '
      },
      {
        order: '"Minimum Advance Percentage"',
        subTitle: 'means the stipulated percentage of the Face Value of a Receivable provided by Invoice Seller '
      },
      {
        order: '"Non-Traded Receivable"',
        subTitle: `means an Invoice Seller's Receivable that has not been sold by a Trade, or any other monies received by us for the account of the Invoice Seller (whether or not the Proceeds of a Receivable) `
      },
      {
        order: '"Partial Receivable"',
        subTitle: 'means any Bid previously made in respect of a part of any Receivable which is not the whole of the Receivable '
      },
      {
        order: '"Platform Fee"',
        subTitle: 'is more particularly described in Clause 5.2. '
      },
      {
        order: '"Digital Asset Pooled Account"',
        subTitle: 'means any general digital asset account used exclusively by us to co-mingle Registered User Digital Asset Funds due arising out of Trades '
      },
      {
        order: '"Proceeds"',
        subTitle: 'means any cash, check, bills of exchange, negotiable and non-negotiable instruments, letters of credit, electronic payments or any form of payment made by the Invoice Buyer, the Invoice Seller or a Debtor in or towards the Populous exchange for digital asset in respect of Receivable (and in all case sits Related Rights) '
      },
      {
        order: '"Profile"',
        subTitle: `means information on Registered Users/Debtors collated by us, including the Registered User's corporate status, business, and financial and trading performance `
      },
      {
        order: '"Purchasing Funder"',
        subTitle: 'means the Funder who has purchased a Receivable by Trade and includes an Invoice Buyer. '
      },
      {
        order: '"Populous World Ltd. Analytics"',
        subTitle: 'means the results of our information, data and statistical analysis, with respect to Invoice Sellers and the Invoice Buyers or Debtors '
      },
      {
        order: '"Populous World Ltd. Fee and Commission Schedule"',
        subTitle: 'means the Populous World Ltd. Fee and Commission Schedule attached hereto '
      },
      {
        order: '"Populous World Ltd. Fees"',
        subTitle: 'mean all fees, commissions, charges and expenses set out in tile Populous World Ltd. Fee and Commission Schedule '
      },
      {
        order: '"Populous World Ltd. Funder Commission"',
        subTitle: 'means the fee payable to us by the Purchasing Funder on each Trade '
      },
      {
        order: '"Populous World Ltd. Platform"',
        subTitle: 'means tile web-based trading exchange, related databases and supporting software operated by us, but excluding equipment, software and telecommunications configurations or links belonging to a Registered User or any third party'
      },
      {
        order: '"Receivable(s)"',
        subTitle: 'means the present, future or contingent obligation of the Invoice Buyer or the Invoice Seller or a Debtor to make payment under a Sales and Purchase Agreement together with (in all cases) its Related Rights or where the context allows a part of such obligation or its Related Rights, including (a) the future right to recover sums due following the determination, assessment or agreement of the amount of the obligation, (b) all duties and charges '
      },
      {
        order: '"Related Rights"',
        subTitle: `means (a) all the Invoice Seller's rights under the Sales and Purchase Agreement; (b) all remittances, instruments, security, bonds, guarantees and indemnities relating to Receivable; (c) all documents, ledgers, databases and computer files (including operating systems) recording or evidencing performance of a Sales and Purchase Agreement; (d) all Goods returned to or repossessed by the Invoice Seller or rejected by an Invoice Buyer, the Invoice Seller or a Debtor and all documents of title to such Goods; (e) any credit insurance in respect of an Receivable; (f) interest `
      },
      {
        order: '"Relist"',
        subTitle: 'means to list a new Trade while carrying over any Winning Bids and parameters from the previous unsuccessful Trade '
      },
      {
        order: '"Remittance Date"',
        subTitle: 'means the date that Proceeds are received in Populous World Ltd. Bank Account from the Invoice Seller or Invoice Buyer for their purchase of digital assets from Populous World or the date that proceeds are received by the Invoice Buyer or Seller for their sale of Populous digital Assets to Populous and includes the date of the receipt of Funders Fee, Late Payment Fee and other fees. '
      },
      {
        order: '"Repurchase Date"',
        subTitle: 'means the date that the Invoice Seller transfers to Populous World Ltd. the Repurchase Price. '
      },
      {
        order: '"Repurchase Penalty Fee"',
        subTitle: 'means 0.5% of the Face Value payable to us but only if the Traded Receivable is overdue by 30 days or more. '
      },
      {
        order: '"Repurchase Price"',
        subTitle: 'means the amount which the Invoice Seller may become required to pay to us to repurchase a Traded Receivable, calculated in accordance with the formula in clause 10.2 '
      },
      {
        order: '"Reserve"',
        subTitle: `means an amount applied to a Registered User's Account so as to restrict the amount which may be payable to the Registered User `
      },
      {
        order: '"Security Interest"',
        subTitle: 'means any mortgage, charge, pledge, trust, assignment or assignation by way of security, hypothecation, lien, or any other arrangement for the purpose of or having a similar effect to creating security or any title retention rights '
      },
      {
        order: '"Sales and Purchase Agreement"',
        subTitle: 'means a contract for the sale or supply of Goods to an Invoice Seller or a Debtor or Customer '
      },
      {
        order: '"Termination Event"',
        subTitle: 'means all events described in clause 12.2 '
      },
      {
        order: '"Total Relist Requests"',
        subTitle: 'means the maximum number of times that a Trade may be relist set by the Invoice Seller '
      },
      {
        order: '"Trade"',
        subTitle: 'means a Competitive Trade '
      },
      {
        order: '"Traded Receivable"',
        subTitle: 'means all the Receivable that is the subject of a Trade and which remains outstanding, including (in all cases) its Related Rights'
      },
      {
        order: '17.2',
        subTitle: 'Interpretation: In these Populous World Ltd. Rules: '
      },
      {
        order: '(1)',
        subTitle: 'headings are for ease of reference only and do not affect the meaning of any clause; '
      },
      {
        order: '(2)',
        subTitle: 'references to any part of the Registered User Agreement will be construed as references to that part in force for the time being and as amended, varied or notated from time to time; '
      },
      {
        order: '(3)',
        subTitle: 'a discretion which we may exercise (an act or decision that we may do or decide), may be exercised in our sole and absolute discretion and without giving any reason; '
      },
      {
        order: '(4)',
        subTitle: 'a provision of law is a reference to that provision as amended or re-enacted; '
      },
      {
        order: '(5)',
        subTitle: '“including” or “includes” means including or includes without limitation; '
      },
      {
        order: '(6)',
        subTitle: '“material facts” means those facts, circumstances or opinions about the identity, business, financial condition or trading relationships of a Registered User, The Invoice Buyer, the Invoice Seller or a Debtor or other person which are reasonably likely to influence the decisions of a commercial person considering a financial transaction involving anyone of them;'
      },
      {
        order: '(7)',
        subTitle: '“writing” or “written” includes a telex, fax, e-mail or comparable means of writing; '
      },
      {
        order: '(8)',
        subTitle: 'any undertaking not to do any act or thing includes an undertaking not to permit or suffer the doing of that act or thing, and each undertaking will be given separately and not jointly and severally; '
      },
      {
        order: '(9)',
        subTitle: 'the singular includes the plural and vice versa; '
      },
      {
        order: '(10)',
        subTitle: 'a time of day is a reference to England & Wales United Kingdom time, and a ‘month’ is a calendar month; '
      },
      {
        order: '(11)',
        subTitle: 'a “person” is a reference to any individual person, corporation, firm, company, partnership, joint venture, unincorporated body of persons, or any state or any agency of a state, whether or not a separate legal entity.'
      },
    ]

    return (
      <StyledDiv>
        <div className="hero-section">
          <div className="section-wrapper">
            <div className="title">Terms And Conditions</div>
          </div>
        </div>

        <div class="table-section">
          <div className="title-wrapper">
            <div class="title">THE RULES OF POPULOUS PLATFORM TRADING</div>
            <div class="sub-title">Registered Users Invoice Trading Platform</div>          
          </div>
          
          <TableOfContent title="ORDER OF CLAUSES" contents={orders} />
          <div className="divider-wrapper">
            <Divider width="300" color="#42B6FB" />          
          </div>

          <OrderSection
            title="1. REGISTERED USERS AND THE POPULOUS WORLD LTD IOM RULES"
            lists={registerLists}
          />
          
          <div className="divider-wrapper">
            <Divider width="300" color="#42B6FB" />          
          </div>

          <OrderSection
            title="2. SALE AND PURCHASE OF RECEIVABLES BY TRADE"
            lists={saleLists}
          />

          <div className="divider-wrapper">
            <Divider width="300" color="#42B6FB" />          
          </div>

          <OrderSection
            title="3. REGISTERED USER ACCOUNTS"
            lists={accountLists}
          />

          <div className="divider-wrapper">
            <Divider width="300" color="#42B6FB" />          
          </div>

          <OrderSection
            title="4. PAYMENTS"
            lists={paymentLists}
          />

          <div className="divider-wrapper">
            <Divider width="300" color="#42B6FB" />          
          </div>

          <OrderSection
            title="5. FEES, CHARGES AND TAXES"
            lists={feeLists}
          />

          <div className="divider-wrapper">
            <Divider width="300" color="#42B6FB" />          
          </div>

          <OrderSection
            title="6. COLLECTIONS FROM THE INVOICE BUYER, THE INVOICE SELLER OR DEBTORS"
            lists={collectionLists}
          />

          <div className="divider-wrapper">
            <Divider width="300" color="#42B6FB" />          
          </div>

          <OrderSection
            title="7. GENERAL WARRANTIES AND UNDERTAKINGS"
            lists={undertakingLists}
          />

          <div className="divider-wrapper">
            <Divider width="300" color="#42B6FB" />          
          </div>

          <OrderSection
            title="8. INVOICE SELLER WARRANTIES AND UNDERTAKINGS"
            lists={invoiceUndertakingLists}
          />

          <div className="divider-wrapper">
            <Divider width="300" color="#42B6FB" />          
          </div>

          <OrderSection
            title="9. FUNDER WARRANTIES AND UNDERTAKINGS"
            lists={funderUndertakings}
          />

          <div className="divider-wrapper">
            <Divider width="300" color="#42B6FB" />          
          </div>

          <OrderSection
            title="10. REPURCHASE OF RECEIVABLES"
            lists={receivables}
          />

          <div className="divider-wrapper">
            <Divider width="300" color="#42B6FB" />          
          </div>

          <OrderSection
            title="11. INVOICE SELLER INFORMATION"
            lists={sellerInfo}
          />

          <div className="divider-wrapper">
            <Divider width="300" color="#42B6FB" />          
          </div>

          <OrderSection
            title="12. TERMINATION AND ENFORCEMENT OF RIGHTS"
            lists={enforcementLists}
          />

          <div className="divider-wrapper">
            <Divider width="300" color="#42B6FB" />          
          </div>

          <OrderSection
            title="13. THE POPULOUS PLATFORM"
            lists={platformInfoList}
          />

          <div className="divider-wrapper">
            <Divider width="300" color="#42B6FB" />          
          </div>

          <OrderSection
            title="14. COMPENSATION AND SET-OFF"
            lists={rightLists}
          />

          <div className="divider-wrapper">
            <Divider width="300" color="#42B6FB" />          
          </div>

          <OrderSection
            title="15. OUR LIABILITY"
            lists={liabilityLists}
          />

          <div className="divider-wrapper">
            <Divider width="300" color="#42B6FB" />          
          </div>

          <OrderSection
            title="16. GENERAL"
            lists={generalLists}
          />

          <div className="divider-wrapper">
            <Divider width="300" color="#42B6FB" />          
          </div>

          <OrderSection
            title="17. DEFINITIONS AND INTERPRETATION"
            lists={definitionLists}
          />

        </div>
      </StyledDiv>
    )
  }
}

const StyledDiv = styled.div`
  .hero-section {
    background: url('/img/terms-background.png') no-repeat;
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

  .table-section {
    padding: 50px 240px;

    .title-wrapper {
      > .title {
        font-size: 24px;
        font-weight: bold;
        line-height: 32px;
        text-align: center;
      }
  
      > .sub-title {
        font-size: 18px;
        font-weight: 500;
        line-height: 24px;
        text-align: center;
        margin-bottom: 50px;
      }
    }
  }

  .divider-wrapper {
    width: 100%;
    padding-top: 30px;
    padding-bottom: 30px;
    display: flex;
    justify-content: center;
  }
`

export default TermsAndConditions
