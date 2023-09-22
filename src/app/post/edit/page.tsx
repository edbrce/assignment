'use client';
import { AppUser, Post } from '@/app/types';
import { validateTextField } from '@/app/utils/validation';
import { useAuthContext } from '@/context/AuthContext';
import { getDocument } from '@/firebase/firestore/getData';
import { updatePost } from '@/firebase/firestore/updateData';
import {
    Alert,
    Backdrop,
    CircularProgress,
    Snackbar,
    TextField
} from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Page(): JSX.Element {
    const { user } = useAuthContext() as { user: AppUser };
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const searchParams = useSearchParams();
    const router = useRouter();
    const postId = searchParams.get('postId');

    useEffect(() => {
        if (!postId) {
            router.push('/');
            return;
        }
        getData(postId).then((data) => {
            const { title, body, authorId } = data;

            if (!(user.isAdmin || user.uid === authorId)) {
                console.log(user.uid, authorId);
                router.push('/');
                return;
            }

            setTitle(title);
            setBody(body);
            setLoading(false);
        });
    }, []);

    const getData = async (postId: string) => {
        const { result, error } = await getDocument('posts', postId);

        if (error) {
            setAlert(true);
            setLoading(false);
            setAlertMessage(error.message);
            return { title, body, authorId: '' };
        }

        const data = result?.data() as Post | undefined;

        if (!data) {
            throw new Error('no data');
        }

        return data;
    };

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

        const newData = {
            title,
            body
        };

        if (!postId) {
            throw new Error('No postId');
        }

        const { error } = await updatePost(postId, newData);

        if (error) {
            setAlert(true);
            setLoading(false);
            setAlertMessage(error.message);
            return;
        }

        router.push(`/post?postId=${postId}`);
    };

    return loading ? (
        <></>
    ) : (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="w-full max-w-2xl">
                <form
                    onSubmit={handleForm}
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                >
                    <h1 className="text-3xl font-bold mb-6 text-black">
                        Edit post
                    </h1>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Title
                        </label>
                        <TextField
                            onChange={(e) => setTitle(e.target.value)}
                            id="title"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            defaultValue={title}
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
                            defaultValue={body}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-black focus:shadow-outline"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="w-full bg-yellow-400 text-black font-semibold py-4 rounded"
                        >
                            Update Post
                        </button>
                    </div>
                </form>
            </div>

            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: (theme) => theme.zIndex.drawer + 1
                }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <Snackbar
                open={alert}
                autoHideDuration={6000}
                onClose={() => setAlert(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setAlert(false)}
                    severity="error"
                    sx={{ width: '100%' }}
                >
                    {alertMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}
