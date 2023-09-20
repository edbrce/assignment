"use client"
import { getRecentDocuments } from '@/firebase/firestore/getData';
import React, { useEffect, useState } from 'react';
import { InlinePost } from './InlinePost';
import { QuerySnapshot, Timestamp } from 'firebase/firestore';
import { Post } from '@/app/types';

const PostList = () => {
    const [posts, setPosts] = useState<QuerySnapshot>();

    useEffect(() => {
        getPosts();
    }, [])

    const getPosts = async () => {
        // const posts = await getRecentDocuments();

        // const { result, error } = posts;

        // if (error || !result) {
        //     throw new Error(error);
        // }

        // setPosts(result);

        setPosts({
            docs: [
                {
                    data: () => ({
                        title: 'test title',
                        body: 'this is a body',
                        author: 'tom',
                        timestamp: new Timestamp(Math.round(Date.now() / 1000), 0)
                    }),
                    id: 'f9b13c23-db51-457b-9620-c57b80a2cc60 '
                },
                {
                    data: () => ({
                        title: 'Another title',
                        body: 'this is a cool post',
                        author: 'mike',
                        timestamp: new Timestamp(Math.round(Date.now() / 1000), 0)
                    })
                },
                {
                    data: () => ({
                        title: 'Yet another post title',
                        body: 'woah so many posts',
                        author: 'eddie',
                        timestamp: new Timestamp(Math.round(Date.now() / 1000), 0)
                    })
                },

            ]
        } as any);
    }



    return (
        <div>
            {posts && posts.docs.map((post) => (
                <div key={post.id}>
                    <InlinePost {...{ ...post.data(), id: post.id } as Post} />
                </div>
            ))}
        </div>
    )
}

export default PostList;