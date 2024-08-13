import React from 'react';

function CalculatorForm(props) {
  let submitState = '';
  let submitStyle = {};
  let submitText = 'Click to Update Results';
  let hoaState = '';
  let hoaStyle = {};
  let percentDown = ((props.formData.downPayment / props.formData.purchasePrice) * 100).toFixed(1);
  let mortgageRate = (props.formData.mortgageRate * 100).toFixed(2);
  let downPaymentStyle = 'text-success';

  if (percentDown < 20) {
    downPaymentStyle = 'text-danger';
  }

  // Submit button will be 'disabled' if there are no changes to submit
  if (props.formSubmitted) {
    submitState = 'disabled';
    submitStyle = { opacity: 0.33 };
    submitText = 'Results Have Been Updated';
  }

  if (!props.formData.addHoaFees) {
    hoaState = 'disabled';
    hoaStyle = { opacity: 0.33 };
  }

  return (
    <form className="container my-4 px-0" onSubmit={(e) => e.preventDefault()}>
      <div className="form-group">
        <label htmlFor="grossHouseholdIncome">
          <span className="h5">{props.formSetup.grossHouseholdIncome.label}</span>
          {props.touched.grossHouseholdIncome && props.errors.grossHouseholdIncome ? (
            <span className="text-danger">{` ${props.errors.grossHouseholdIncome}`}</span>
          ) : (
            ''
          )}
        </label>
        <br />
        <output className="mx-0 h6" id="grossHouseholdIncome">{`$${new Intl.NumberFormat().format(
          props.formData.grossHouseholdIncome
        )}`}</output>
        <input
          className="form-control"
          type="range"
          id="grossHouseholdIncome"
          name="grossHouseholdIncome"
          min={props.formSetup.grossHouseholdIncome.min}
          max={props.formSetup.grossHouseholdIncome.max}
          step={props.formSetup.grossHouseholdIncome.step}
          value={props.formData.grossHouseholdIncome}
          onChange={props.changeHandler}
          onBlur={props.blurHandler}
        />
      </div>

      <div className="form-group">
        <label htmlFor="householdSize">
          <span className="h5">{props.formSetup.householdSize.label}</span>
          {props.touched.householdSize && props.errors.householdSize ? (
            <span className="text-danger">{` ${props.errors.householdSize}`}</span>
          ) : (
            ''
          )}
        </label>
        <br />
        <output
          className="mx-0 h6"
          id="householdSize"
        >{`${props.formData.householdSize} person(s)`}</output>
        <input
          className="form-control"
          style={{ maxWidth: 160 + 'px' }}
          type="range"
          id="householdSize"
          name="householdSize"
          min={props.formSetup.householdSize.min}
          max={props.formSetup.householdSize.max}
          step={props.formSetup.householdSize.step}
          value={props.formData.householdSize}
          onChange={props.changeHandler}
          onBlur={props.blurHandler}
        />
      </div>

      <div className="form-group">
        <label htmlFor="purchasePrice">
          <span className="h5">{props.formSetup.purchasePrice.label}</span>
          {props.touched.purchasePrice && props.errors.purchasePrice ? (
            <span className="text-danger">{` ${props.errors.purchasePrice}`}</span>
          ) : (
            ''
          )}
        </label>
        <br />
        <output className="mx-0 h6" id="purchasePrice">{`$${new Intl.NumberFormat().format(
          props.formData.purchasePrice
        )}`}</output>
        <input
          className="form-control"
          type="range"
          id="purchasePrice"
          name="purchasePrice"
          min={props.formSetup.purchasePrice.min}
          max={props.formSetup.purchasePrice.max}
          step={props.formSetup.purchasePrice.step}
          value={props.formData.purchasePrice}
          onChange={props.changeHandler}
          onBlur={props.blurHandler}
        />
      </div>

      <div className="form-group">
        <label htmlFor="downPayment">
          <span className="h5">{props.formSetup.downPayment.label}</span>
          {props.touched.downPayment && props.errors.downPayment ? (
            <span className="text-danger">{` ${props.errors.downPayment}`}</span>
          ) : (
            ''
          )}
        </label>
        <br />
        <output className="mx-0 h6" id="downPayment">
          {`$${new Intl.NumberFormat().format(props.formData.downPayment)}`}{' '}
          <span className={downPaymentStyle}>({percentDown}%)</span>
        </output>
        <input
          className="form-control"
          type="range"
          id="downPayment"
          name="downPayment"
          min={props.formSetup.downPayment.min}
          max={props.formData.purchasePrice}
          step={props.formSetup.downPayment.step}
          value={
            props.formData.downPayment < props.formData.purchasePrice
              ? props.formData.downPayment
              : props.formData.purchasePrice
          }
          onChange={props.changeHandler}
          onBlur={props.blurHandler}
        />
      </div>

      <div className="form-group">
        <label htmlFor="mortgageRate">
          <span className="h5">{props.formSetup.mortgageRate.label}</span>
          {props.touched.mortgageRate && props.errors.mortgageRate ? (
            <span className="text-danger">{` ${props.errors.mortgageRate}`}</span>
          ) : (
            ''
          )}
        </label>
        <br />
        <output className="mx-0 h6" id="mortgageRate">{`${mortgageRate}%`}</output>
        <input
          className="form-control"
          type="range"
          id="mortgageRate"
          name="mortgageRate"
          min={props.formSetup.mortgageRate.min}
          max={props.formSetup.mortgageRate.max}
          step={props.formSetup.mortgageRate.step}
          value={props.formData.mortgageRate}
          onChange={props.changeHandler}
          onBlur={props.blurHandler}
        />
      </div>

      <div className="form-group">
        <div className="form-check form-check-inline">
          <input
            type="checkbox"
            className="mr-2"
            id="addHoaFees"
            name="addHoaFees"
            onChange={props.changeHandler}
          />
          <label className="form-check-label h5" htmlFor="addHoaFees">
            {props.formSetup.hoaFees.label}
          </label>
        </div>
        <br />
        <output
          className="mx-0 h6"
          id="purchasePrice"
          style={hoaStyle}
        >{`$${new Intl.NumberFormat().format(props.formData.hoaFees)}`}</output>
        <input
          className="form-control"
          type="range"
          id="hoaFees"
          name="hoaFees"
          min={props.formSetup.hoaFees.min}
          max={props.formSetup.hoaFees.max}
          step={props.formSetup.hoaFees.step}
          value={props.formData.hoaFees}
          onChange={props.changeHandler}
          onBlur={props.blurHandler}
          disabled={hoaState}
        />
      </div>

      <div className="form-group form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="closingInCash"
          name="closingInCash"
          onChange={props.changeHandler}
        />
        <label className="form-check-label" htmlFor="closingInCash">
          {props.formSetup.payClosingWithDownPayment.label}
        </label>
      </div>
    </form>
  );
}

export default CalculatorForm;
