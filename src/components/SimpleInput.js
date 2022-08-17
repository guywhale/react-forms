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
	const [enteredNameIsValid, setEnteredNameIsValid] = useState(true);

	const nameInputChangeHander = (event) => {
		setEnteredName(event.target.value);
	};

	const formSubmissionHandler = (event) => {
		event.preventDefault();
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

	const nameInputClasses = enteredNameIsValid
		? 'form-control'
		: 'form-control invalid';

	return (
		<form onSubmit={formSubmissionHandler}>
			<div className={nameInputClasses}>
				<label htmlFor="name">Your Name</label>
				<input
					type="text"
					id="name"
					onChange={nameInputChangeHander}
					ref={nameInputRef}
					value={enteredName}
				/>
				{!enteredNameIsValid && (
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
