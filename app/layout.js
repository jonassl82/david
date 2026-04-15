export const metadata = {
  title: "David · VVD Baarn",
  description: "Politiek Assistent · VVD Baarn",
  robots: "noindex",
};

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
