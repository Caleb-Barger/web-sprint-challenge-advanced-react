import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
    render(<CheckoutForm />)
});

test("form shows success message on submit with form details", () => {
    const { getByLabelText, getByTestId, getByText } = render(<CheckoutForm />)

    // fill out the form with some info
    fireEvent.change(getByLabelText(/first name/i), { target: { value: "Caleb" } })
    fireEvent.change(getByLabelText(/last name/i), { target: { value: "Barger" } })
    fireEvent.change(getByLabelText(/address/i), { target: { value: "805 South D St." } })
    fireEvent.change(getByLabelText(/city/i), { target: { value: "Grangeville" } })
    fireEvent.change(getByLabelText(/state/i), { target: { value: "ID" } })
    fireEvent.change(getByLabelText(/zip/i), { target: { value: "83530" } })
    fireEvent.click(getByTestId(/checkout/i))

    // checkout was all good
    expect(getByText(/woo-hoo!/i)).toBeInTheDocument()


});
