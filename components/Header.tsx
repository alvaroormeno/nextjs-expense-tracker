import React from 'react'

import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { checkUser } from '@/lib/checkUser'

import { RiMoneyDollarCircleFill } from "react-icons/ri";

const Header = async () => {

    const user = await checkUser()

    return (
        <nav className='navbar'>
            <div className='navbar-container'>
                <div className='logo-container'>
                    <RiMoneyDollarCircleFill size={45}/>
                    <h2>Quick Expense Tracker</h2>
                </div>
                
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