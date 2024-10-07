import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import '../styles/globals.scss';
import MainHeader from '@/components/main-header';

type Props = {
	children: React.ReactNode;
	modal: React.ReactNode;
};

const geistSans = localFont({
	src: '../fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
});
const geistMono = localFont({
	src: '../fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
});

export const metadata: Metadata = {
	title: 'Dinner-Meister',
	description: 'Recipes and meal planning for the busy family',
};

export default function RootLayout({ children, modal }: Props) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				{modal}
				<MainHeader />
				{children}
			</body>
		</html>
	);
}
