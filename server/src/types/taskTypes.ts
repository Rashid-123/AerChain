export type TaskStatus = "To Do" | "In Progress" | "Done" ;
export type TaskPriority = "low" | "medium" | "high" ;

export interface TaskInput {
    title : string;
    description? : string;
    priority? : TaskPriority;
    status? : TaskStatus;
    dueDate? : string | null ;
}

export interface TaskDocument extends TaskInput {
    _id : string ;
    createdAt : Date ;
    updatedAt : Date ;
}

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