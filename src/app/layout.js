import '@/app/globals.css';
import RemoveInjectedAttributes from '@/components/RemoveInjectedAttributes';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className="antialiased">
        <RemoveInjectedAttributes>
          {children}
        </RemoveInjectedAttributes>
      </body>
    </html>
  );
}
