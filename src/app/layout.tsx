import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';

const roboto = Roboto({ weight: ['400', '900'], subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'World News',
	description: 'News From Around the World',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={roboto.className}>
				<nav className="bg-white flex justify-center items-center border-b w-full top-0 h-[70px] z-50">
					<div className="max-w-[1440px] w-full">Logo</div>
				</nav>
				{children}
			</body>
		</html>
	);
}
