import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

//  CLECK PRIVDER
import { ClerkProvider } from "@clerk/nextjs";

// COMPONENTS
import Header from "@/components/Header";

const roboto = Roboto({ weight: '400', subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Expense Tracker",
    description: "Always Track Your Expenses",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={roboto.className}>
                    <Header />
                    <main className="container">
                        {children}
                    </main>
                </body>
            </html>
        </ClerkProvider>
        
    );
}
