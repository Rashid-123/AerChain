export interface Task {
    _id: string;
    title: string;
    description?:string;
    priority: "low" | "medium" | "high";
    status: "To Do" | "In Progress" | "Done";
    dueDate? : string | null;
    createdAt?: string;
    updatedAt?: string;
}

export interface TasksState {
    tasks: Task[];
    loading: boolean;
    error: string | null ;

    filters:{
        search: string ;
        status: string ;
        priority: string ;
    }
}