"use client"
import { useAuthContext } from '@/context/AuthContext';
import addData from '@/firebase/firestore/addData';
import { TextField } from '@mui/material';
import { User } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function Page(): JSX.Element {
    const { user } = useAuthContext() as { user: User };
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const router = useRouter();


    const handleForm = async (event: { preventDefault: () => void }) => {
        event.preventDefault();

        const postId = uuidv4();
        const secondsSinceEpoch = Math.round(Date.now() / 1000)
        // Attempt to sign up with provided email and password
        const { result, error } = await addData('posts', postId, { title, body, author: user.displayName, timestamp: new Timestamp(secondsSinceEpoch, 0) });

        if (error) {
            // Display and log any sign-up errors
            console.log(error);
            throw new Error('error');
        }

        router.push(`/post/${postId}`);
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="w-full max-w-2xl">
                <form onSubmit={handleForm} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h1 className="text-3xl font-bold mb-6 text-black">Post</h1>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                            Title
                        </label>
                        <TextField
                            onChange={(e) => setTitle(e.target.value)}
                            id="title"
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        />

                    </div>
                    <div className="mb-6">
                        <label htmlFor="post" className="block text-gray-700 text-sm font-bold mb-2">
                            Post
                        </label>
                        <TextField
                            onChange={(e) => setBody(e.target.value)}
                            id="body"
                            multiline
                            rows={8}
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-black focus:shadow-outline'
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="w-full bg-yellow-400 text-black font-semibold py-4 rounded"
                        >
                            Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}