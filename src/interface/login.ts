export interface SuccessResponseLogin {
    message: string,
    user: UserResponse
    token: string
}
export interface ErrorResponseLogin {
    statusMsg : string
    message: string,
    
}
export interface UserResponse {
    
        name: string
        email: string
        role: string
    
}