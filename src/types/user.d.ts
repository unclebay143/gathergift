export type User = { 
    first_name: string; 
    last_name: string; 
    email: string; 
    password: string; 
    profile_picture?: string; 
    authProvider: "google" | "credentials"; 
}
