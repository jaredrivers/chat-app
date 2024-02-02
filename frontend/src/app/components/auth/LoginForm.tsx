"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import FormInput from "./FormInput";

const LoginForm = () => {
	interface IFormData {
		email: string;
		password: string;
	}
	let initalForm: IFormData = {
		email: "",
		password: "",
	};

	const [formData, setFormData] = useState<IFormData>(initalForm);
	const [error, setError] = useState<boolean>(false);

	const handleInputChange = (e: ChangeEvent<HTMLFormElement>) => {
		console.log(error);
		if (error) {
			setError(false);
		}
		let field = e.target.name;
		let value = e.target.value;
		initalForm = { ...initalForm, [field]: value };
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		for (let value of Object.values(initalForm)) {
			if (value.trim() === "") {
				setError(true);
			}
		}
		console.log(initalForm);
	};

	return (
		<form
			onChange={handleInputChange}
			className='flex flex-col p-2 border border-red-500 space-y-1'
			onSubmit={handleSubmit}
		>
			<FormInput type='email' name='email' id='email' labelText='Email' />
			<FormInput
				type='password'
				name='password'
				id='password'
				labelText='Password'
			/>
			<span className={`text-red-500 font-medium ${!error && "invisible"}`}>
				Please complete the form.
			</span>
			<button
				type='submit'
				disabled={error}
				className='p-2 bg-green-200 rounded-md hover:bg-green-300/60 disabled:bg-green-100/50'
			>
				Login
			</button>
		</form>
	);
};

export default LoginForm;
