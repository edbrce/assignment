'use client';
import Link from 'next/link';
import PostList from './components/post/PostList';
import { AppContext, useAppContext } from '@/context/AppContext';

export default function Home() {
    const { setLoading } = useAppContext() as AppContext;

    console.log(process.env.CYPRESS_ADMIN_EMAIL);

    return (
        <main className="flex flex-col items-center justify-between p-24 gap-24">
            <div className="text-2xl">
                <div>
                    <h1>Welcome to IMDb support forums</h1>
                </div>
                <div>
                    <p>
                        Your place to ask for support and connect with other
                        like-minded cinefiles!
                    </p>
                </div>
            </div>

            <div className="flex flex-row gap-[10vw]">
                <div className="flex flex-col items-center basis-3/4 gap-8">
                    <div className="self-start text-lg font-bold">
                        <h1>Recent posts</h1>
                    </div>
                    <div className="self-start w-[50vw]">
                        <PostList />
                    </div>
                </div>

                <div className="flex flex-col items-center basis-1/4 gap-8">
                    <div className="text-lg font-bold">
                        <h1>Join the conversation!</h1>
                    </div>

                    <Link href="/new-post" onClick={() => setLoading(true)}>
                        <span
                            className="py-2 px-6 bg-yellow-400 hover:bg-yellow-600 text-l text-gray-900 font-bold rounded-xl"
                            id="make-post"
                        >
                            Make a post
                        </span>
                    </Link>
                </div>
            </div>
        </main>
    );
}
