export interface ApiResponse<T>{
    success: boolean;
    message: string;
    data?: T,
    error?: string | string[],
    date?: Date,
    path?: string,
    takenTime?: string
}