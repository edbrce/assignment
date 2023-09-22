'use client';
import { getRecentDocuments } from '@/firebase/firestore/getData';
import React, { useEffect, useState } from 'react';
import { InlinePost } from './InlinePost';
import { QuerySnapshot } from 'firebase/firestore';
import { Post } from '@/app/types';
import { AppContext, useAppContext } from '@/context/AppContext';

const PostList = () => {
    const { setAlert, setAlertMessage } = useAppContext() as AppContext;
    const [posts, setPosts] = useState<QuerySnapshot>();

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
        </>
    );
};

export default PostList;
