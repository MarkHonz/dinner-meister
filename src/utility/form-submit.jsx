'use client';

import { useFormStatus } from 'react-dom';
import { forwardRef } from 'react';

const FormSubmit = forwardRef(function FormSubmit(
	{ toggleModal, formMode },
	ref
) {
	const { pending } = useFormStatus();
	const status = useFormStatus();

	return (
		<>
			{formMode === 'login' && (
				<button
					type="submit"
					disabled={pending}
					ref={ref}
					method="dialog"
					// onSubmit={toggleModal}
					// onClick={toggleModal}
				>
					{pending ? 'Submitting...' : 'Sign In'}
				</button>
			)}
			{formMode === 'create' && (
				<button
					type="submit"
					disabled={pending}
					ref={ref}
					method="dialog"
					// onSubmit={toggleModal}
					// onClick={toggleModal}
				>
					{pending ? 'Submitting...' : 'Create Account'}
				</button>
			)}
		</>
	);
});

export default FormSubmit;
