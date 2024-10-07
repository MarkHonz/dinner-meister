import type { Metadata } from 'next';

type Props = {
	children: Readonly<React.ReactNode>;
};

export const metadata: Metadata = {
	title: 'Dinner-Meister.com',
	description: 'Recipes and meal planning for the busy family',
};

export default function AuthLayout({ children }: Props) {
	return (
		<>
			<header>
				<h3>Hello from auth header</h3>
			</header>
			{children}
		</>
	);
}
