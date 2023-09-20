"use client";
import { useAuthContext } from '@/context/AuthContext';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function UserSection() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { user } = useAuthContext() as { user: any };

    useEffect(() => {
        if (user == null) {
            setIsLoggedIn(false)
        } else {
            setIsLoggedIn(true)
        }
    }, [user])


    return (
        <div className="flex flex-row">


            <div className="flex items-center justify-between">
                <Link href="/signin">
                    <span className="lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-200 text-sm text-gray-900 font-bold rounded-xl">Login</span>
                </Link>
            </div>

            <div className="flex items-center justify-between">
                <Link href="/signup">
                    <span className="lg:inline-block py-2 px-6 bg-yellow-400 hover:bg-yellow-600 text-sm text-black font-bold rounded-xl">Register</span>
                </Link>
            </div>



        </div >


    )
}