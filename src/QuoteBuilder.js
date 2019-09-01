import React, { useState } from "react";
import { Formik, Field } from "formik";
import * as Yup from 'yup';
import classNames from "classnames";

import { calculateQuote } from "./lib";

const printLocations = [
  { label: "Front", id: "print-front" },
  { label: "Back", id: "print-back" },
  { label: "Right Sleeve", id: "print-right" },
  { label: "Left Sleeve", id: "print-left" },
];

// Input feedback
const InputFeedback = ({ error }) =>
  error ? <div className={classNames("input-feedback")}>{error}</div> : null;

// Checkbox input
const Checkbox = ({
  field: { name, value, onChange, onBlur },
  form: { errors, touched, setFieldValue },
  id,
  label,
  className,
  ...props
}) => {
  return (
    <div>
      <input
        name={name}
        id={id}
        type="checkbox"
        value={value}
        checked={value}
        onChange={onChange}
        onBlur={onBlur}
        className={classNames("radio-button")}
      />
      <label htmlFor={id}>{label}</label>
      {touched[name] && <InputFeedback error={errors[name]} />}
    </div>
  );
};

// Checkbox group
class CheckboxGroup extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange = event => {
    const target = event.currentTarget;
    let valueArray = [...this.props.value] || [];

    if (target.checked) {
      valueArray.push(target.id);
    } else {
      valueArray.splice(valueArray.indexOf(target.id), 1);
    }

    this.props.onChange(this.props.id, valueArray);
  };

  handleBlur = () => {
    // take care of touched
    this.props.onBlur(this.props.id, true);
  };

  render() {
    const { value, error, touched, label, className, children } = this.props;

    const classes = classNames(
      "input-field",
      {
        "is-success": value || (!error && touched), // handle prefilled or user-filled
        "is-error": !!error && touched
      },
      className
    );

    return (
      <div className={classes}>
        <fieldset>
          <legend>{label}</legend>
          {React.Children.map(children, child => {
            return React.cloneElement(child, {
              field: {
                value: value.includes(child.props.id),
                onChange: this.handleChange,
                onBlur: this.handleBlur
              }
            });
          })}
          {touched && <InputFeedback error={error} />}
        </fieldset>
      </div>
    );
  }
}

// Radio input
const RadioButton = ({
  field: { name, value, onChange, onBlur },
  id,
  label,
  className,
  ...props
}) => {
  return (
    <div>
      <input
        name={name}
        id={id}
        type="radio"
        value={id} // could be something else for output?
        checked={id === value}
        onChange={onChange}
        onBlur={onBlur}
        className={classNames("radio-button")}
        {...props}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

// Radio group
const RadioButtonGroup = ({
  value,
  error,
  touched,
  id,
  label,
  className,
  children
}) => {
  const classes = classNames(
    "input-field",
    {
      "is-success": value || (!error && touched), // handle prefilled or user-filled
      "is-error": !!error && touched
    },
    className
  );

  return (
    <div className={classes}>
      <fieldset>
        <legend>{label}</legend>
        {children}
        {touched && <InputFeedback error={error} />}
      </fieldset>
    </div>
  );
};

// standard input
const InputField = ({
  value,
  error,
  touched,
  id,
  label,
  className,
  children,
}) => {
  const classes = classNames(
    "input-field",
    {
      "is-success": value || (!error && touched), // handle prefilled or user-filled
      "is-error": !!error && touched
    },
    className
  );

  return (
    <div className={classes}>
      <fieldset>
        <legend>{label}</legend>
        {children}
        {touched && <InputFeedback error={error} />}
      </fieldset>
    </div>
  );
};


const QuoteBuilder = ({ garment }) => {
  const [isCalculating, setIsCalculating] = useState(false);
  const [quote, setQuote] = useState(null);

  return (
    <div className="quoteBuilder">
      <h1>Get a quote!</h1>
      <Formik
        initialValues={{
          numShirts: "",
          numColors: "",
          printLocations: [],
        }}
        validationSchema={Yup.object().shape({
          numShirts: Yup.number().moreThan(11, "12 shirts is our minimum").lessThan(1001, "To get a quote for more than 1000 shirts, please contact our team directly"),
          numColors: Yup.string().required("At least one color is required"),
          printLocations: Yup.array().required(
            "At least one is required"
          ),
        })}
        onSubmit={(values, actions) => {
          setIsCalculating(true);

          setTimeout(() => {
            const numShirts = parseInt(values.numShirts, 10);
            const numColors = parseInt(values.numColors, 10);
            const numLocations = values.printLocations.filter(l => !!l).length;

            const calculated = calculateQuote(garment.name, numShirts, numColors, numLocations);
            setQuote(`For ${numShirts} ${garment.name} shirts with ${numColors} colors and ${numLocations} print locations, we can quote you at $${calculated}!`);

            actions.setSubmitting(false);
            setIsCalculating(false);
          }, 1500);
        }}
        render={({
          handleSubmit,
          setFieldValue,
          setFieldTouched,
          values,
          errors,
          touched,
          isSubmitting
        }) => (
            <form onSubmit={handleSubmit}>

              {/* <h2>Number of Shirts</h2> */}
              <InputField
                id="numShirts"
                label="Total shirt count"
                value={values.numShirts}
                error={errors.numShirts}
                touched={touched.numShirts}
              >
                <Field type="number" name="numShirts" placeholder="12 - 1000" />
              </InputField>

              {/* <h2>Number of Colors</h2> */}
              <RadioButtonGroup
                id="numColors"
                label="One of these please"
                value={values.numColors}
                error={errors.numColors}
                touched={touched.numColors}
              >
                {[1, 2, 3, 4, 5, 6].map(num =>
                  <Field
                    key={num}
                    component={RadioButton}
                    name="numColors"
                    id={`${num}Color`}
                    label={num}
                  />
                )}
              </RadioButtonGroup>

              {/* <h2>Print Locations</h2> */}
              <CheckboxGroup
                id="printLocations"
                label="Select your location..."
                value={values.printLocations}
                error={errors.printLocations}
                touched={touched.printLocations}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
              >
                {printLocations.map(printLocation =>
                  <Field
                    key={printLocation.id}
                    component={Checkbox}
                    name="printLocations"
                    id={printLocation.id}
                    label={printLocation.label}
                  />)}
              </CheckboxGroup>

              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </form>
          )}
      />
      {isCalculating && <p>Calculating...</p>}
      {!isCalculating && !!quote && <p>{quote}</p>}
    </div>
  )
}

export default QuoteBuilder;
