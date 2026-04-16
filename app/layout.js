export const metadata = {
  title: "David · VVD Baarn",
  description: "Politiek Assistent · VVD Baarn",
  robots: "noindex",
  icons: {
    icon: "/favicon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
