
export interface ParsedTaskFields {
    title: string ;
    description? : string;
    priority?: "low" | "medium" | "high";
    dueDate? : string | null ;
    status : string;
}

export interface FinalTaskResponse extends ParsedTaskFields {
    transcript : string;
    dueDate: string | null;
}