"use client"
import addData from '@/firebase/firestore/addData';
import React, { useEffect, useState } from 'react';

const PostButton = () => {

    const handleForm = async (event: { preventDefault: () => void }) => {
        event.preventDefault();

        const { result, error } = await addData('testCollection', 'testId', { data: 'data' });

        if (error) {
            console.log(error);
        }

        console.log(result);
    }

    return (
        <form onSubmit={handleForm}>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white font-semibold py-2 rounded"
            >
                Post
            </button>
        </form>
    )
}

export default PostButton;