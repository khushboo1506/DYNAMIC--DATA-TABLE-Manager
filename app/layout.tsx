import Providers from "../src/app/providers"



export const metadata = {
  title: 'Dynamic Data Table Manager',
  description: 'Next.js + Redux Toolkit + MUI project (v3)',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
