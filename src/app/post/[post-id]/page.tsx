"use client"
import { Post } from "@/app/types";
import { getDocument } from "@/firebase/firestore/getData";
import { Divider } from "@mui/material";
import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { 'post-id': string } }) {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('');
    const [timestamp, setTimestamp] = useState('');
    const postId = params["post-id"];

    const getData = async () => {
        // const { result, error } = await getDocument('posts', postId);
        // const data = result?.data() as Post | undefined;

        // if (!data) {
        //     throw new Error('no data');
        // }

        // const { title, body, author, timestamp } = data;

        const title = 'Title';
        const body = 'This is a post. Woah what a good post this person has written';
        const author = 'bruredwa';
        const timestamp = new Timestamp(Math.round(Date.now() / 1000), 0)
        setTitle(title);
        setBody(body);
        setAuthor(author);
        setTimestamp(timestamp.toDate().toLocaleString())
    }

    useEffect(() => {
        getData();
    }, [])

    return (

        <div className='flex flex-col p-28'>

            <div className="w-full bg-white rounded shadow p-6">

                <div className='flex flex-row justify-between'>
                    <div className='font-bold text-m'>
                        {author}
                    </div>

                    <div className='italic text-m'>
                        {timestamp}
                    </div>

                </div>

                <div className='text-6xl font-bold py-8'>
                    {title}
                </div>

                <Divider />

                <div className='text-3xl py-12'>
                    {body}
                </div>
            </div>

        </div >
    )
}