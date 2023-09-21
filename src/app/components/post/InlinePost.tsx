"use client"
import { AppUser, Post } from "@/app/types"
import { Backdrop, CircularProgress, Divider } from "@mui/material";
import { useAuthContext } from "@/context/AuthContext";
import { PostOptions } from "./PostOptions";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const InlinePost = (data: Post) => {
    const [loading, setLoading] = useState(false);
    const { user } = useAuthContext() as { user: AppUser };
    const router = useRouter();
    const { isAdmin, uid } = user || { isAdmin: false, uid: '' };
    const { title, body, id, timestamp, author, authorId } = data;
    const isPostOwner = uid === authorId;
    const link = `/post?postId=${id}`;

    return (
        <><div >
            <div className="flex flex-row p-4 w-[50vw] hover:bg-gray-200 justify-between cursor-pointer">
                <div className="flex flex-col w-[45vw]" onClick={() => { router.push(link); setLoading(true) }}>
                    <div className='font-bold'>
                        {title}
                    </div>
                    <div>
                        {body}
                    </div>
                    <div className="italic">
                        <span className="font-semibold">{author} </span>posted on {timestamp ? timestamp.toDate().toLocaleString() : 'unknown time'}
                    </div>
                </div>
                <PostOptions {...{ isAdmin, isPostOwner, postId: id }} />
            </div>
        </div>
            <Divider />

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}