'use client';
import { Post } from '@/app/types';
import { AppContext, useAppContext } from '@/context/AppContext';
import { getDocument } from '@/firebase/firestore/getData';
import { Divider } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
    const { setLoading, setAlert, setAlertMessage } =
        useAppContext() as AppContext;
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('');
    const [timestamp, setTimestamp] = useState<string | null>(null);
    const searchParams = useSearchParams();
    const router = useRouter();
    const postId = searchParams.get('postId');

    useEffect(() => {
        setLoading(true);
        if (!postId) {
            router.push('/');
            return;
        }
        getData(postId).then((data) => {
            if (!data) {
                router.push('/');
                return;
            }
            const { title, body, author, timestamp } = data as Post;

            setTitle(title);
            setBody(body);
            setAuthor(author);
            setTimestamp(timestamp && timestamp.toDate().toLocaleString());
            setLoading(false);
        });
    }, []);

    const getData = async (postId: string) => {
        const { result, error } = await getDocument('posts', postId);

        if (error || !result || !result.data()) {
            setAlert(true);
            setLoading(false);
            setAlertMessage(
                error ? error.message : 'No data found for this post'
            );
            router.push('/');
            return { title, body, authorId: '' };
        }

        const data = result.data() as Post;
        return data;
    };

    return (
        <div className="flex flex-col p-28">
            <div className="w-full bg-white rounded shadow p-6">
                <div className="flex flex-row justify-between">
                    <div className="font-bold text-m">{author}</div>

                    <div className="italic text-m">{timestamp}</div>
                </div>

                <div className="text-6xl font-bold py-8">{title}</div>

                <Divider />

                <div className="text-3xl py-12 whitespace-pre-line">{body}</div>
            </div>
        </div>
    );
}
