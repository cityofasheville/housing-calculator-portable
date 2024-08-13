import React, { Component } from "react";

class FeedbackHeadline extends Component {
  /**
   * Function to evaluate monthly housing expenses against monthly income, considering household size
   *
   * @param referenceIncome     The Median income for given household size
   * @param actualIncome        Actual reported income
   * @param monthlyExpense      Monthly expense, as calculated for region
   * @returns {object}
   */
  evaluateAffordability = (referenceIncome, actualIncome, monthlyExpense) => {
    let evaluation = {
      monthlyExpenseOK: false,
      monthlyExpenseRatio: 0,
      amiPosition: "",
    };

    if (actualIncome < referenceIncome * 0.3) {
      evaluation.amiPosition = `${this.props.seedConstants.headlineText.under} 30%`;
    } else if (actualIncome >= referenceIncome * 0.3 && actualIncome < referenceIncome * 0.5) {
      evaluation.amiPosition = "30% - 50%";
    } else if (actualIncome >= referenceIncome * 0.5 && actualIncome < referenceIncome * 0.6) {
      evaluation.amiPosition = "50% - 60%";
    } else if (actualIncome >= referenceIncome * 0.6 && actualIncome < referenceIncome * 0.8) {
      evaluation.amiPosition = "60% - 80%";
    } else if (actualIncome >= referenceIncome * 0.8 && actualIncome < referenceIncome) {
      evaluation.amiPosition = "80% - 100%";
    } else if (actualIncome >= referenceIncome && actualIncome < referenceIncome * 1.2) {
      evaluation.amiPosition = "100% - 120%";
    } else if (actualIncome >= referenceIncome * 1.2) {
      evaluation.amiPosition = `${this.props.seedConstants.headlineText.over} 120% AMI`;
    }

    evaluation.monthlyExpenseRatio = Math.round((monthlyExpense / (actualIncome / 12)) * 100);

    if (monthlyExpense <= (actualIncome / 12) * 0.33) {
      evaluation.monthlyExpenseOK = true;
    }

    return evaluation;
  };

  componentDidMount() {
    if (typeof window.$ === "function") {
      window.$('[data-toggle="tooltip"]').tooltip();
    }
  }

  componentDidUpdate() {
    if (typeof window.$ === "function") {
      window.$('[data-toggle="tooltip"]').tooltip();
    }
  }

  render() {
    let monthlyExpenseClass = "text-success";
    let affordabilityAlert = false;
    let affordabilityCheck = this.evaluateAffordability(
      this.props.formData.amiReferenceIncome,
      this.props.formData.grossHouseholdIncome,
      this.props.formData.totalMonthlyHousingCosts
    );

    if (affordabilityCheck.monthlyExpenseRatio > 33) {
      monthlyExpenseClass = "text-danger";
      affordabilityAlert = true;
    } else if (
      affordabilityCheck.monthlyExpenseRatio > 25 &&
      affordabilityCheck.monthlyExpenseRatio <= 33
    ) {
      monthlyExpenseClass = "";
    }

    return (
      <article className="container">
        <div className="row">
          <header className=" col-xs-12 my-4">
            <h2 className="mb-3">
              {this.props.seedConstants.headlineText.heading}:{" "}
              <span className={monthlyExpenseClass}>
                ${new Intl.NumberFormat().format(this.props.formData.totalMonthlyHousingCosts)}
              </span>
            </h2>
            <p className="mb-3">
              {affordabilityAlert && (
                <span className="text-danger">
                  {this.props.seedConstants.headlineText.attention}{" "}
                </span>
              )}
              {this.props.seedConstants.headlineText.thatIs}{" "}
              {affordabilityCheck.monthlyExpenseRatio}%{" "}
              {this.props.seedConstants.headlineText.ofGrossMonthlyIncome}.
            </p>
            <div className="mb-3 alert alert-secondary" role="alert">
              <p>
                {`${this.props.seedConstants.headlineText.inAVL}                
                ${this.props.formData.householdSize} 
                ${this.props.seedConstants.headlineText.peopleWithIncomeOf}   
                $${new Intl.NumberFormat().format(this.props.formData.grossHouseholdIncome)} 
                ${this.props.seedConstants.headlineText.isInThe} `}
                <mark>
                  {this.props.seedConstants.headlineText.amiBand}: {affordabilityCheck.amiPosition}
                </mark>
                .
              </p>
              <p className="">
                <a
                  href={this.props.seedConstants.amiReference}
                  className="btn btn-secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {this.props.seedConstants.headlineText.learnMoreAMI}
                </a>
              </p>
            </div>
          </header>
        </div>
      </article>
    );
  }
}

export default FeedbackHeadline;
