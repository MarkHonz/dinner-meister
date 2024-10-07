'use server';

import z from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createUser, deleteUser, findUserByEmail } from '@/lib/user-db';
import { hashUserPassword, verifyPassword } from '@/lib/hash';
import { createAuthSession, destroyAuthSession } from '@/lib/auth';

export const userSubmit = async (previousState, formData) => {
	const name = formData.get('name').trim();
	const password = formData.get('password').trim();
	const email = formData.get('email').trim();
	let response = {
		errors: [],
		success: false,
	};

	// Create a schema for the form data
	const schema = z.object({
		name: z.string().min(2),
		password: z.string().min(6),
		email: z.string().email(),
	});

	try {
		// Validate the form data
		schema.parse({
			name,
			password,
			email,
		});
	} catch ({ errors }) {
		// console.log('error:', error.errors[0].message);
		// console.log('errors:', errors);
		errors.map((error) => {
			response.errors.push(error);
		});
		return response;
	}

	const hashedPassword = hashUserPassword(password);

	// Create the user
	const user = await createUser({
		name,
		email,
		password: hashedPassword,
	});
	await createAuthSession(user.id); // Create a session for the user
	// redirect('/'); // Redirect to the home page
	response.success = true; // Set the success flag to true
	console.log('SUCCESS!');
	revalidatePath('/', 'layout'); // Revalidate the layout path
	return response; // Return the response object
};

export const userLogin = async (previousState, formData) => {
	const email = formData.get('email').trim();
	const password = formData.get('password').trim();
	let response = {
		errors: [],
		success: false,
	};

	// Create a schema for the form data
	const schema = z.object({
		email: z.string().email(),
		password: z.string().min(6),
	});

	try {
		// Validate the form data
		schema.parse({
			email,
			password,
		});
	} catch ({ errors }) {
		errors.map((error) => {
			response.errors.push(error);
		});
		return response;
	}

	const user = await findUserByEmail(email);
	if (user == null) {
		response.errors.push({ message: 'User not found' });
		return response;
	}

	const isValid = verifyPassword(user.password, password);
	if (isValid == false) {
		response.errors.push({ message: 'Invalid password' });
		return response;
	}

	await createAuthSession(user.id); // Create a session for the user
	// redirect('/'); // Redirect to the home page
	response.success = true; // Set the success flag to true
	return response; // Return the response object
};

export const userDelete = async (id) => {
	try {
		await deleteUser(id);
		console.log(`deleted ${id}`);
		revalidatePath('/', 'layout');
	} catch (error) {
		console.log('error:', error);
	}
};

export const userAuth = (formMode, previousState, formData) => {
	if (formMode === 'login') return userLogin(previousState, formData);
	return userSubmit(previousState, formData);
};

export const userLogout = async () => {
	await destroyAuthSession();
	redirect('/');
};
