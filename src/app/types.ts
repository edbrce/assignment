import { User } from "firebase/auth";
import { Timestamp } from "firebase/firestore";

export type Post = {
    title: string;
    body: string;
    author: string;
    timestamp: Timestamp;
    id: string;
    authorId: string;
}

export type AppUser = User & { isAdmin: boolean };