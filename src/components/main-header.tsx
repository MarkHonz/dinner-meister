import { userLogout } from '@/actions/user-actions';
import Link from 'next/link';
import React from 'react';

type Props = {};

export default function MainHeader({}: Props) {
	return (
		<>
			<Link href="/sign-in?formMode=login">sign in</Link>
			<form action={userLogout}>
				<button>Logout</button>
			</form>
		</>
	);
}
