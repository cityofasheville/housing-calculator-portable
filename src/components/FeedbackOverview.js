import React, { Component } from "react";
import FeedbackRow from "./FeedbackRow";

class FeedbackOverview extends Component {
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
    let valueClass = "text-right ";

    return (
      <section className="px-0">
        <h2>{this.props.seedConstants.tableText.overviewHeading}</h2>
        <div className="table-responsive-sm">
          <table className="table table-hover table-bordered">
            <thead className="thead-light">
              <tr>
                <th className="text-left">{this.props.seedConstants.tableText.tableItem}</th>
                <th className="text-right">{this.props.seedConstants.tableText.tableValue}</th>
              </tr>
            </thead>
            <tbody>
              <FeedbackRow
                key="purchasePrice"
                buttonID="purchasePrice"
                valueClass={valueClass}
                label={this.props.seedConstants.homePrice.label}
                value={`$${new Intl.NumberFormat().format(this.props.formData.purchasePrice)}`}
                tooltip={this.props.seedConstants.homePrice.narrativeText}
                iconStyles={this.props.iconStyles}
              />
              <FeedbackRow
                key="downPayment"
                buttonID="downPayment"
                valueClass={valueClass}
                label={this.props.seedConstants.downPayment.label}
                value={`$${new Intl.NumberFormat().format(this.props.formData.downPayment)}`}
                tooltip={this.props.seedConstants.downPayment.narrativeText}
                iconStyles={this.props.iconStyles}
              />
              <FeedbackRow
                key="closingCosts"
                buttonID="closingCosts"
                valueClass={valueClass}
                label={this.props.seedConstants.closingCosts.label}
                value={`$${new Intl.NumberFormat().format(this.props.formData.closingCosts)}`}
                tooltip={`${this.props.seedConstants.closingCosts.narrativeText}`}
                iconStyles={this.props.iconStyles}
                changeHandler={this.props.changeHandler}
              />
              <FeedbackRow
                key="loanAmount"
                buttonID="loanAmount"
                valueClass={valueClass}
                label={this.props.seedConstants.loanAmount.label}
                value={`$${new Intl.NumberFormat().format(this.props.formData.loanAmount)}`}
                tooltip={this.props.seedConstants.loanAmount.narrativeText}
                iconStyles={this.props.iconStyles}
              />
              <FeedbackRow
                key="cashUpFront"
                buttonID="cashUpFront"
                valueClass={valueClass}
                label={this.props.seedConstants.cashUpFront.label}
                value={`$${new Intl.NumberFormat().format(this.props.formData.cashUpFront)}`}
                tooltip={this.props.seedConstants.cashUpFront.narrativeText}
                iconStyles={this.props.iconStyles}
              />
              <FeedbackRow
                key="mortgageRate"
                buttonID="mortgageRate"
                valueClass={valueClass}
                label={this.props.seedConstants.mortgageRate.label}
                value={`${(this.props.formData.mortgageRate * 100).toFixed(2)}%`}
                tooltip={this.props.seedConstants.mortgageRate.narrativeText}
                iconStyles={this.props.iconStyles}
              />
              <FeedbackRow
                key="loanPeriod"
                buttonID="loanPeriod"
                valueClass={valueClass}
                label={this.props.seedConstants.loanPeriod.label}
                value={`${this.props.seedConstants.loanPeriod.lengthInYears} ${this.props.seedConstants.tableText.years}`}
                tooltip={this.props.seedConstants.loanPeriod.narrativeText}
                iconStyles={this.props.iconStyles}
              />
            </tbody>
          </table>
        </div>
      </section>
    );
  }
}

export default FeedbackOverview;
