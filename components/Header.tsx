import React from 'react'

import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

function Header() {
    return (
        <nav className='navbar'>
            <div className='navbar-container'>
                <h2>Expense Tracker</h2>
                <div>
                    {/* SHOW WHEN SIGNED OUT */}
                    <SignedOut>
                        <SignInButton />
                    </SignedOut>
                    {/* SHOW WHEN SIGNED IN */}
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </div>
        </nav>
    )
}

export default Header