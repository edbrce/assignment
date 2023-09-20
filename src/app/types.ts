import { Timestamp } from "firebase/firestore";

export type Post = {
    title: string;
    body: string;
    author: string;
    timestamp: Timestamp;
    id: string;
}