export type BookStatus = "Pending" | "Reading" | "Completed";

export interface Book {
    id: string,
    user_id: string,
    title: string,
    author: string,
    published_date: string | null;
    cover_url: string | null;
    status: BookStatus,
    created_at: string, 
}