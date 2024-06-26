'use client';
import { useAuthContext } from '@/context/AuthContext';
import { addPost } from '@/firebase/firestore/addData';
import { TextField } from '@mui/material';
import { Timestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AppUser, Post } from '../types';
import { validateTextField } from '../utils/validation';
import { AppContext, useAppContext } from '@/context/AppContext';

export default function Page(): JSX.Element {
    const { user } = useAuthContext() as { user: AppUser };
    const { setLoading, setAlert, setAlertMessage } =
        useAppContext() as AppContext;
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const router = useRouter();

    useEffect(() => {
        setLoading(false);
        if (!user) {
            router.push('/signin');
        }
    }, [user]);

    const handleForm = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        setLoading(true);

        const isValid = validateTextField(title) && validateTextField(body);

        if (!isValid) {
            setAlert(true);
            setLoading(false);
            setAlertMessage(
                'Fields must be non-blank and only contain letters or basic characters'
            );
            return;
        }

        const postId = uuidv4();
        const secondsSinceEpoch = Math.round(Date.now() / 1000);
        const timestamp = new Timestamp(secondsSinceEpoch, 0);
        const postData: Omit<Post, 'id'> = {
            title,
            body,
            author: user.displayName || 'unknown user',
            timestamp,
            authorId: user.uid
        };
        // Attempt to sign up with provided email and password
        const error = await addPost(postId, postData);

        if (error) {
            setAlert(true);
            setLoading(false);
            setAlertMessage(error.message);
            return;
        }

        setLoading(false);
        router.push(`/post?postId=${postId}`);
    };

    return user ? (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="w-full max-w-2xl">
                <form
                    onSubmit={handleForm}
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                >
                    <h1 className="text-3xl font-bold mb-6 text-black">Post</h1>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Title
                        </label>
                        <TextField
                            onChange={(e) => setTitle(e.target.value)}
                            id="title"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="post"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Post
                        </label>
                        <TextField
                            onChange={(e) => setBody(e.target.value)}
                            id="body"
                            multiline
                            rows={8}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-black focus:shadow-outline"
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
    ) : (
        <></>
    );
}
