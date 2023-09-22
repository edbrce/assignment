'use client';
import { getRecentDocuments } from '@/firebase/firestore/getData';
import React, { useEffect, useState } from 'react';
import { InlinePost } from './InlinePost';
import { QuerySnapshot } from 'firebase/firestore';
import { Post } from '@/app/types';
import { Alert, Snackbar } from '@mui/material';

const PostList = () => {
    const [posts, setPosts] = useState<QuerySnapshot>();
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = async () => {
        const posts = await getRecentDocuments();

        const { result, error } = posts;

        if (error) {
            setAlert(true);
            setAlertMessage(error.message);
            return { title: '', body: '', author: '', timestamp: null };
        }

        setPosts(result);
    };

    return (
        <>
            <div>
                {posts &&
                    posts.docs.map((post) => (
                        <div key={post.id}>
                            <InlinePost
                                {...({ ...post.data(), id: post.id } as Post)}
                            />
                        </div>
                    ))}
            </div>
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
        </>
    );
};

export default PostList;
