import { useRef, useState } from 'react'

import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length === 5;

const Checkout = (props) => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        street: true,
        city: true,
        postalCode: true,
        name: true
    })

    const nameInputRef = useRef();
    const cityInputRef = useRef();
    const postalCodeInputRef = useRef();
    const streetInputRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostalCode = postalCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

        setFormInputsValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            postalCode: enteredPostalCodeIsValid
        });

        const formIsValid =
            enteredNameIsValid &&
            enteredStreetIsValid &&
            enteredPostalCodeIsValid &&
            enteredCityIsValid;

        if (!formIsValid) {
            return;
        };

        props.onConfirm({
            name: enteredName,
            city: enteredCity,
            postalCode: enteredPostalCode,
            street: enteredStreet
        });
    };

    const nameControlClasses = `${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`;
    const streetControlClasses = `${classes.control} ${formInputsValidity.street ? '' : classes.invalid}`;
    const postalCodeControlClasses = `${classes.control} ${formInputsValidity.postalCode ? '' : classes.invalid}`;
    const cityControlClasses = `${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`;

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={classes.input}>
                <div className={nameControlClasses}>
                    <label forName='name'>Your Name</label>
                    <input id='name' type='text' ref={nameInputRef} />
                    {!formInputsValidity.name && <p>Please enter a valid name!</p>}
                </div>
                <div className={cityControlClasses}>
                    <label forName='city'>City</label>
                    <input id='city' type='text' ref={cityInputRef} />
                    {!formInputsValidity.city && <p>Please enter a valid city!</p>}
                </div>
                <div className={streetControlClasses}>
                    <label forName='street'>Street</label>
                    <input id='street' type='text' ref={streetInputRef} />
                    {!formInputsValidity.street && <p>Please enter a valid street!</p>}
                </div>
                <div className={postalCodeControlClasses}>
                    <label forName='postal'>Postal Code</label>
                    <input id='postal' type='text' ref={postalCodeInputRef} />
                    {!formInputsValidity.postalCode && <p>Please enter a valid postal code (5 character) !</p>}
                </div>
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>Cancel</button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    )
}

export default Checkout