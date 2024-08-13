import React, { Component } from "react";
import FeedbackRow from "./FeedbackRow";

class FeedbackDetails extends Component {
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
    let monthlyExpenseRatio = Math.round(
      (this.props.formData.totalMonthlyHousingCosts /
        (this.props.formData.grossHouseholdIncome / 12)) *
        100
    );
    let monthlyExpenseClass = "text-success";
    let valueClass = "text-right ";

    if (monthlyExpenseRatio > 33) {
      monthlyExpenseClass = "text-danger";
    } else if (monthlyExpenseRatio > 25 && monthlyExpenseRatio <= 33) {
      monthlyExpenseClass = "";
    }

    return (
      <section className="px-0">
        <h2>{this.props.seedConstants.tableText.monthlyHeading}</h2>
        <div className="table-responsive-sm">
          <table className="table table-hover table-bordered">
            <thead className="thead-light font-weight-bold">
              <tr>
                <th className="text-left">{this.props.seedConstants.tableText.tableItem}</th>
                <th className="text-right">{this.props.seedConstants.tableText.tableValue}</th>
              </tr>
            </thead>
            <tbody>
              <FeedbackRow
                key="grossHouseholdIncomeMonthly"
                rowClass="bg-light font-weight-bold"
                buttonID="grossHouseholdIncomeMonthly"
                valueClass={valueClass}
                label={this.props.seedConstants.grossMonthlyIncome.label}
                value={`$${new Intl.NumberFormat().format(
                  Math.round(this.props.formData.grossHouseholdIncome / 12)
                )}`}
                tooltip={this.props.seedConstants.grossMonthlyIncome.narrativeText}
                iconStyles={this.props.iconStyles}
              />
              <FeedbackRow
                key="loanPayment"
                buttonID="loanPayment"
                valueClass={valueClass}
                label={`${this.props.seedConstants.loanPayment.label} ${(
                  this.props.formData.mortgageRate * 100
                ).toFixed(2)}%)`}
                value={`$${new Intl.NumberFormat().format(this.props.formData.loanPayment)}`}
                tooltip={this.props.seedConstants.loanPayment.narrativeText}
                iconStyles={this.props.iconStyles}
              />
              <FeedbackRow
                key="cityTax"
                buttonID="cityTax"
                valueClass={valueClass}
                label={`${this.props.seedConstants.cityTax.label} (at ${(
                  this.props.seedConstants.cityTax.rate * 100
                ).toFixed(4)}%)`}
                value={`$${new Intl.NumberFormat().format(this.props.formData.cityTax)}`}
                tooltip={`${this.props.seedConstants.cityTax.narrativeText}`}
                iconStyles={this.props.iconStyles}
              />
              <FeedbackRow
                key="countyTax"
                buttonID="countyTax"
                valueClass={valueClass}
                label={`${this.props.seedConstants.countyTax.label} (at ${(
                  this.props.seedConstants.countyTax.rate * 100
                ).toFixed(4)}%)`}
                value={`$${new Intl.NumberFormat().format(this.props.formData.countyTax)}`}
                tooltip={`${this.props.seedConstants.countyTax.narrativeText}`}
                iconStyles={this.props.iconStyles}
              />
              <FeedbackRow
                key="schoolTax"
                buttonID="schoolTax"
                valueClass={valueClass}
                label={`${this.props.seedConstants.schoolTax.label} (at ${(
                  this.props.seedConstants.schoolTax.rate * 100
                ).toFixed(4)}%)`}
                value={`$${new Intl.NumberFormat().format(this.props.formData.schoolTax)}`}
                tooltip={`${this.props.seedConstants.schoolTax.narrativeText}`}
                iconStyles={this.props.iconStyles}
              />
              <FeedbackRow
                key="homeownersInsurance"
                buttonID="homeownersInsurance"
                valueClass={valueClass}
                label={this.props.seedConstants.homeownersInsurance.label}
                value={`$${new Intl.NumberFormat().format(
                  this.props.formData.homeownersInsurance
                )}`}
                tooltip={`${this.props.seedConstants.homeownersInsurance.narrativeText}`}
                iconStyles={this.props.iconStyles}
              />
              <FeedbackRow
                key="mortgageInsurance"
                buttonID="mortgageInsurance"
                valueClass={valueClass}
                label={this.props.seedConstants.mortgageInsurance.label}
                value={`$${new Intl.NumberFormat().format(this.props.formData.mortgageInsurance)}`}
                tooltip={`${this.props.seedConstants.mortgageInsurance.narrativeText}`}
                iconStyles={this.props.iconStyles}
              />
              {this.props.formData.addHoaFees && (
                <FeedbackRow
                  key="hoaFees"
                  buttonID="hoaFees"
                  valueClass={valueClass}
                  label={this.props.seedConstants.hoaFees.label}
                  value={`$${new Intl.NumberFormat().format(this.props.formData.hoaFees)}`}
                  tooltip={`${this.props.seedConstants.hoaFees.narrativeText}`}
                  iconStyles={this.props.iconStyles}
                />
              )}
              <FeedbackRow
                key="totalMonthlyHousingCosts"
                rowClass="bg-light font-weight-bold"
                valueClass={valueClass + monthlyExpenseClass}
                buttonID="totalMonthlyHousingCosts"
                label={this.props.seedConstants.totalyMonthlyCosts.label}
                value={`$${new Intl.NumberFormat().format(
                  this.props.formData.totalMonthlyHousingCosts
                )}`}
                tooltip={this.props.seedConstants.totalyMonthlyCosts.narrativeText}
                iconStyles={this.props.iconStyles}
              />
            </tbody>
          </table>
        </div>
      </section>
    );
  }
}

export default FeedbackDetails;
