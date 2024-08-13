import React from 'react';
import CalculatorForm from './components/CalculatorForm';
import FeedbackHeadline from './components/FeedbackHeadline';
import FeedbackOverview from './components/FeedbackOverview';
import FeedbackDetails from './components/FeedbackDetails';
import defaultConfiguration from './defaultConfig';

// const { Component, render } = wp.element;

class HousingCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formSubmitted: false,
      tableUpdateNeeded: true,
      tableViewDetails: false,
      formData: {
        purchasePrice: parseInt(props.seedConstants.formSetup.purchasePrice.default),
        mortgageRate: parseFloat(props.seedConstants.formSetup.mortgageRate.default),
        downPayment: parseInt(props.seedConstants.formSetup.downPayment.default),
        householdSize: parseInt(props.seedConstants.formSetup.householdSize.default),
        grossHouseholdIncome: parseInt(props.seedConstants.formSetup.grossHouseholdIncome.default),
        hoaFees: parseInt(props.seedConstants.formSetup.hoaFees.default),
        closingInCash: false,
        addHoaFees: false,
      },
      formErrors: {},
      formTouched: {
        purchasePrice: false,
        downPayment: false,
        householdSize: false,
        grossHouseholdIncome: false,
      },
    };
    this.handleTableToggle = this.handleTableToggle.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.validateIncome = this.validateIncome.bind(this);
    this.validateHomePrice = this.validateHomePrice.bind(this);
    this.validateDownPayment = this.validateDownPayment.bind(this);
    this.validateHouseholdSize = this.validateHouseholdSize.bind(this);
    this.validateHoa = this.validateHoa.bind(this);

    console.log('Const', props.seedConstants);
  }

  /**
   * Copy of Excel's PMT function.
   * Credit: https://gist.github.com/maarten00/23400873d51bf2ec4eeb
   *
   * @param rate_per_period       The interest rate for the loan.
   * @param number_of_payments    The total number of payments for the loan in months.
   * @param present_value         The present value, or the total amount that a series of future payments is worth now;
   *                              Also known as the principal.
   * @param future_value          The future value, or a cash balance you want to attain after the last payment is made.
   *                              If fv is omitted, it is assumed to be 0 (zero), that is, the future value of a loan is 0.
   * @param type                  Optional, defaults to 0. The number 0 (zero) or 1 and indicates when payments are due.
   *                              0 = At the end of period
   *                              1 = At the beginning of the period
   * @returns {number}
   */
  pmt(rate_per_period, number_of_payments, present_value, future_value, type) {
    future_value = typeof future_value !== 'undefined' ? future_value : 0;
    type = typeof type !== 'undefined' ? type : 0;

    if (rate_per_period !== 0.0) {
      // Interest rate exists
      var q = Math.pow(1 + rate_per_period, number_of_payments);
      return (
        -(rate_per_period * (future_value + q * present_value)) /
        ((-1 + q) * (1 + rate_per_period * type))
      );
    } else if (number_of_payments !== 0.0) {
      // No interest rate, but number of payments exists
      return -(future_value + present_value) / number_of_payments;
    }

    return 0;
  }

  prepNumber(textInput, validationType) {
    if (!textInput) {
      return 0;
    }
    let preppedInput = textInput.replace(/[^0-9.]+/g, '');

    // console.log('PREP:', preppedInput, validationType);

    if (validationType === 'float') {
      return parseFloat(preppedInput);
    } else {
      return parseInt(preppedInput.split('.')[0]);
    }
  }

  handleTableToggle(e) {
    e.preventDefault();
    // console.log(e.target.dataset);
    const oldTableViewDetails = this.state.tableViewDetails;
    const incomingViewDetails = e.target.dataset.viewdetails === 'true';

    if (oldTableViewDetails !== incomingViewDetails) {
      this.setState({
        tableViewDetails: incomingViewDetails,
      });
    }
  }

  handleBlur(e) {
    let oldFormData = this.state.formData;
    let newVal;
    let validationType = e.target.name === 'mortgageRate' ? 'float' : 'int';

    if (e.target.type === 'checkbox') {
      newVal = e.target.checked;
    } else {
      newVal = this.prepNumber(e.target.value, validationType);
    }

    // console.log('BLUR', e.target.name, e.target.value, newVal, validationType);

    this.setState({
      formSubmitted: false,
      tableUpdateNeeded: true,
      formData: {
        ...oldFormData,
        [e.target.name]: newVal,
      },
    });
  }

  handleChange(e) {
    let oldFormData = this.state.formData;
    // let computedFormData = this.state.formData;
    let newVal;

    if (e.target.type === 'checkbox') {
      newVal = e.target.checked;
    } else if (e.target.name === 'mortgageRate') {
      newVal = this.prepNumber(e.target.value, 'float');
    } else {
      newVal = this.prepNumber(e.target.value, 'int');
    }

    // console.log(`CHANGE: ${e.target.name} ${e.target.value} ${newVal}`);

    this.setState({
      formSubmitted: false,
      tableUpdateNeeded: true,
      formData: {
        ...oldFormData,
        [e.target.name]: newVal,
      },
    });
  }

  validateHoa(hoa) {
    if (hoa < 0) {
      return 'Error: expected to be $0 or more';
    }

    if (hoa > 5000) {
      return 'Error: expected to be less than $1,500';
    }

    return '';
  }

  validateIncome(income) {
    if (!income) {
      return 'Error: field is required';
    }

    if (income < 1000) {
      return 'Error: expected to be more than $1,000';
    }

    if (income > 5000000) {
      return 'Error: expected to be less than $5,000,000';
    }

    return '';
  }

  validateHomePrice(price) {
    if (!price) {
      return 'Error: field is required';
    }

    if (price < 100000) {
      return 'Error: expected to be more than $100,000';
    }

    if (price > 1500000) {
      return 'Error: expected to be less than $1,500,000';
    }

    return '';
  }

  validateDownPayment(downPayment) {
    if (!downPayment) {
      return 'Error: field is required';
    }

    if (downPayment < 0) {
      return 'Error: expected to be $0 or more';
    }

    if (downPayment > 750000) {
      return 'Error: expected to be less than $750,000';
    }

    return '';
  }

  validateHouseholdSize(size) {
    if (!size) {
      return 'Error: field is required';
    }

    if (size < 1) {
      return 'Error: expected to be more than 1';
    }

    if (size > 8) {
      return 'Error: expected to be 8 or fewer';
    }

    return '';
  }

  componentDidMount() {
    // Crunch default numbers and output initial result set
    if (this.state.tableUpdateNeeded) {
      this.formSubmit();
    }
  }

  componentDidUpdate() {
    if (this.state.tableUpdateNeeded) {
      this.formSubmit();
    }
  }

  formSubmit() {
    // Submit will be 'disabled' if any field is untouched or there are errors
    // NOTE: this condition is partially implemented (no reference to the "touched" object)
    // NOTE: if range inputs prove solid, we can probably remove this condition
    if (Object.keys(this.state.formErrors).length === 0) {
      let incomingFormData = this.state.formData;
      let closingInCash = incomingFormData.closingInCash;
      let addingHoaFees = incomingFormData.addHoaFees;
      // By default, using zero HOA fees. If checkbox ticked (condition below), then will use supplied value.
      let hoaFeeToUse = 0;
      let cashUpFront;
      let loanAmount;
      let closingCosts =
        this.props.seedConstants.closingCosts.fixedAmount +
        Math.round(
          incomingFormData.purchasePrice * this.props.seedConstants.closingCosts.percentageOfLoan
        );
      if (closingInCash) {
        cashUpFront = incomingFormData.downPayment + closingCosts;
        loanAmount = incomingFormData.purchasePrice - incomingFormData.downPayment;
      } else {
        cashUpFront = incomingFormData.downPayment;
        loanAmount = incomingFormData.purchasePrice + closingCosts - incomingFormData.downPayment;
      }
      if (addingHoaFees) {
        hoaFeeToUse = incomingFormData.hoaFees;
      }
      let percentDown = (
        (incomingFormData.downPayment / incomingFormData.purchasePrice) *
        100
      ).toFixed(1);
      let ratePerPeriod = incomingFormData.mortgageRate / 12;
      let loanPeriod = this.props.seedConstants.loanPeriod.lengthInYears * 12;
      let loanPayment = Math.abs(parseInt(this.pmt(ratePerPeriod, loanPeriod, loanAmount)));
      let cityTax = Math.round(
        (incomingFormData.purchasePrice * this.props.seedConstants.cityTax.rate) / 12
      );
      let countyTax = Math.round(
        (incomingFormData.purchasePrice * this.props.seedConstants.countyTax.rate) / 12
      );
      let schoolTax = Math.round(
        (incomingFormData.purchasePrice * this.props.seedConstants.schoolTax.rate) / 12
      );
      let homeownersInsurance =
        this.props.seedConstants.homeownersInsurance.fixedAmount +
        Math.round(
          (incomingFormData.purchasePrice *
            this.props.seedConstants.homeownersInsurance.percentageOfLoan) /
            12
        );
      // Using a basic formula for mortgage insurance when downPayment < 20%
      // Reality is rather complicated: buyer FICO score, % of loan insured (varies, and determined by insurer), % of purchase price borrowed, etc.
      let mortgageInsurance =
        percentDown >= 20
          ? 0
          : this.props.seedConstants.mortgageInsurance.fixedAmount +
            Math.round(
              (loanAmount * this.props.seedConstants.mortgageInsurance.percentageOfLoan) / 12
            );
      let totalMonthlyHousingCosts =
        loanPayment +
        cityTax +
        countyTax +
        schoolTax +
        homeownersInsurance +
        mortgageInsurance +
        hoaFeeToUse;

      const amiValues = Object.entries(this.props.seedConstants.amiByFamilySize);
      const thisPersonAmiRef = amiValues[incomingFormData.householdSize - 1][1];

      this.setState({
        formSubmitted: true,
        tableUpdateNeeded: false,
        formData: {
          ...incomingFormData,
          loanAmount: loanAmount,
          loanPayment: loanPayment,
          cityTax: cityTax,
          countyTax: countyTax,
          schoolTax: schoolTax,
          amiReferenceIncome: thisPersonAmiRef,
          closingCosts: closingCosts,
          cashUpFront: cashUpFront,
          closingInCash: closingInCash,
          homeownersInsurance: homeownersInsurance,
          totalMonthlyHousingCosts: totalMonthlyHousingCosts,
          mortgageInsurance: mortgageInsurance,
        },
      });
    }
  }

  // Assigning validate functions to object keys here for easy dynamic access in onBlur calls
  // NOTE: this method is useful for validating text inputs; I've since shifted to range inputs (sliders)
  // NOTE: if the range inputs seem like good permanent setup, I'll remove unneeded validation pieces like this
  validate = {
    purchasePrice: this.validateHomePrice,
    downPayment: this.validateDownPayment,
    householdSize: this.validateHouseholdSize,
    grossHouseholdIncome: this.validateIncome,
    hoaFees: this.validateHoa,
  };

  render() {
    // console.log('State in render is...');
    // console.log(this.state);

    // dim the results pane when values change
    // let tableStyle = { opacity: 0.33 };
    let btnOverviewClass = 'btn-secondary';
    let btnDetailsClass = 'btn-outline-secondary';
    let buttonState = 'disabled';

    if (this.state.formSubmitted) {
      // tableStyle = { opacity: 1 }
      buttonState = '';
    }

    if (this.state.tableViewDetails) {
      btnOverviewClass = 'btn-outline-secondary';
      btnDetailsClass = 'btn-secondary';
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <CalculatorForm
              formSetup={this.props.seedConstants.formSetup}
              formData={this.state.formData}
              errors={this.state.formErrors}
              touched={this.state.formTouched}
              formSubmitted={this.state.formSubmitted}
              submitHandler={this.formSubmit}
              changeHandler={this.handleChange}
              blurHandler={this.handleBlur}
              focusHandler={this.handleFocus}
            />
          </div>
          <div className="col-md-8 px-3 px-md-5">
            <div>
              <FeedbackHeadline
                formData={this.state.formData}
                seedConstants={this.props.seedConstants}
                iconStyles={this.props.tooltipIconStyles}
                changeHandler={this.handleChange}
              />

              <div
                className="btn-group w-100 mb-4"
                role="group"
                aria-label="Toggle results display between overview and details"
              >
                <button
                  id="overviewButton"
                  type="button"
                  className={`btn ${btnOverviewClass}`}
                  data-viewdetails={false}
                  onClick={this.handleTableToggle}
                  disabled={buttonState}
                >
                  {this.props.seedConstants.tableText.overviewHeading}
                </button>
                <button
                  id="detailsButton"
                  type="button"
                  className={`btn ${btnDetailsClass}`}
                  data-viewdetails={true}
                  onClick={this.handleTableToggle}
                  disabled={buttonState}
                >
                  {this.props.seedConstants.tableText.monthlyHeading}
                </button>
              </div>

              {!this.state.tableViewDetails && (
                <FeedbackOverview
                  formData={this.state.formData}
                  seedConstants={this.props.seedConstants}
                  iconStyles={this.props.tooltipIconStyles}
                  changeHandler={this.handleChange}
                />
              )}

              {this.state.tableViewDetails && (
                <FeedbackDetails
                  formData={this.state.formData}
                  seedConstants={this.props.seedConstants}
                  iconStyles={this.props.tooltipIconStyles}
                  changeHandler={this.handleChange}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

HousingCalculator.defaultProps = {
  // package comes with default values (defaultConfiguration) to make the calculator work
  // these can be overridden by an object with the same structure in whatever page includes this calculator
  seedConstants: defaultConfiguration,
  // the defult icon styles assume font-awesome
  // any similar icon package should work, by passing their styles with this tooltipIconStyles prop
  tooltipIconStyles: 'far fa-question-circle',
};

// the variable homeownershipCalculatorData is defined in the PHP page template and shipped to the frontend via wp_add_inline_script()
// template: /avl/template-parts/slug-specific/homeownership-calculator.php

// ReactDOM.render(
//   <HousingCalculator
//     seedConstants={defaultConfiguration}
//     tooltipIconStyles="icon icon-info-circle"
//   />,
//   document.getElementById('homeownershipCalculatorApp')
// );

export default HousingCalculator;
