import { useState, useRef } from 'react';

/**
 * Two approaches to validating input:
 * 1) Use a ref to validate input value on form submit.
 * 2) Use state to validate input when it changes/blurs.
 *
 */

const SimpleInput = (props) => {
	// Ref approach
	const nameInputRef = useRef();
	//State approach
	const [enteredName, setEnteredName] = useState('');
	const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
	const [enteredNameTouched, setEnteredNameTouched] = useState(false);

	const nameInputChangeHander = (event) => {
		setEnteredName(event.target.value);

		/**
		 * You can't check enteredName to check validity here because
		 * setEnteredName() has been run in the line above, meaning
		 * React has only scheduled this state change to happen and not
		 * actually made it.
		 *
		 * Instead, use the event value to check validity.
		 */
		if (event.target.value.trim() !== '') {
			setEnteredNameIsValid(true);
		}
	};

	const nameInputBlurHandler = (event) => {
		setEnteredNameTouched(true);

		if (enteredName.trim() === '') {
			setEnteredNameIsValid(false);
		}
	};

	const formSubmissionHandler = (event) => {
		event.preventDefault();
		setEnteredNameTouched(true);

		// Value taken from input change handler
		console.log(enteredName);

		if (enteredName.trim() === '') {
			setEnteredNameIsValid(false);
			return;
		}

		setEnteredNameIsValid(true);

		// Value taken from input ref on submission
		const enteredValue = nameInputRef.current.value;
		console.log(enteredValue);

		/**
		 * How to reset input after submission...
		 */
		// NOT a good idea to set ref value yourself as only React should change
		// the DOM
		nameInputRef.current.value = '';
		// Set to blank and put value={enteredName} as in put attribute
		setEnteredName('');
	};

	const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

	const nameInputClasses = nameInputIsInvalid
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
					ref={nameInputRef}
					value={enteredName}
				/>
				{nameInputIsInvalid && (
					<p className="error-text">Name must not be empty.</p>
				)}
			</div>
			<div className="form-actions">
				<button>Submit</button>
			</div>
		</form>
	);
};

export default SimpleInput;
