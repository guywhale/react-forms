import { useState } from 'react';

/**
 * Two approaches to validating input:
 * 1) Use a ref to validate input value on form submit.
 * 2) Use state to validate input when it changes/blurs.
 *
 */

const SimpleInput = (props) => {
	//State approach
	const [enteredName, setEnteredName] = useState('');
	const [enteredNameTouched, setEnteredNameTouched] = useState(false);
	const [enteredEmail, setEnteredEmail] = useState('');
	const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

	/**
	 * To make code leaner, set enteredNameIsValid by evaluating enteredName.
	 *
	 * As input events change enteredName and enteredNameTouched states, they
	 * trigger a component re-render meaning the enteredNameIsValid will be
	 * adjusted accordingly.
	 */
	const enteredNameIsValid = enteredName.trim() !== '';
	const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

	const emailRegex = /\S+@\S+\.\S+/;
	const enteredEmailIsValid = emailRegex.test(enteredEmail);
	const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

	/**
	 * Add overall form validity that is dependant on validity of name input.
	 *
	 * Submit button is disabled if overall form validity is false.
	 *
	 * If you had any other inputs, they would be added to if statement below.
	 */
	let formIsValid = false;

	if (enteredNameIsValid && enteredEmailIsValid) {
		formIsValid = true;
	}

	const nameInputChangeHander = (event) => {
		setEnteredName(event.target.value);
	};

	const nameInputBlurHandler = (event) => {
		setEnteredNameTouched(true);
	};

	const emailInputChangeHander = (event) => {
		setEnteredEmail(event.target.value);
	};

	const emailInputBlurHandler = (event) => {
		setEnteredEmailTouched(true);
	};

	const formSubmissionHandler = (event) => {
		event.preventDefault();
		setEnteredNameTouched(true);
		setEnteredEmailTouched(true);

		if (!enteredNameIsValid) {
			return;
		}

		// Value taken from input change handler
		console.log(enteredName);
		console.log(enteredEmail);

		/**
		 * How to reset input after submission...
		 * Set to blank and put value={enteredName} as in put attribute
		 */
		setEnteredName('');
		setEnteredEmail('');

		/**
		 * After form submit touched state reset to false, as the data is
		 * cleared and a fresh submission process should begin.
		 */
		setEnteredNameTouched(false);
		setEnteredEmailTouched(false);
	};

	const nameInputClasses = nameInputIsInvalid
		? 'form-control invalid'
		: 'form-control';

	const emailInputClasses = emailInputIsInvalid
		? 'form-control invalid'
		: 'form-control';

	return (
		<form onSubmit={formSubmissionHandler}>
			<div className={nameInputClasses}>
				<label htmlFor="name">Your Name</label>
				<input
					type="text"
					id="name"
					onChange={nameInputChangeHander}
					onBlur={nameInputBlurHandler}
					value={enteredName}
				/>
				{nameInputIsInvalid && (
					<p className="error-text">Name must not be empty.</p>
				)}
			</div>
			<div className={emailInputClasses}>
				<label htmlFor="email">Your Email</label>
				<input
					type="email"
					name="email"
					id="email"
					onChange={emailInputChangeHander}
					onBlur={emailInputBlurHandler}
					value={enteredEmail}
				/>
				{emailInputIsInvalid && <p className="error-text">Email is invalid.</p>}
			</div>
			<div className="form-actions">
				<button disabled={!formIsValid}>Submit</button>
			</div>
		</form>
	);
};

export default SimpleInput;
