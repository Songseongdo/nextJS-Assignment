import RecoilProvider from "../components/recoil-provider";
import "../styles/global.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ko">
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				<link
					href="https://fonts.googleapis.com/css2?family=Atma:wght@300;400;500;600;700&display=swap"
					rel="stylesheet"
				/>
			</head>
			<body>
				<RecoilProvider>{children}</RecoilProvider>
			</body>
		</html>
	);
}
