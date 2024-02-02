"use client";

interface FormInput {
	labelText?: string;
	id: string;
	type: string;
	name: string;
}

const FormInput = ({ name, type, labelText, id }: FormInput) => {
	return (
		<>
			<label htmlFor={id}>{labelText}</label>
			<input type={type} name={name} id={id} className='p-2 rounded-md' />
		</>
	);
};

export default FormInput;
