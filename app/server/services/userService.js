export const UserType = {
    BASE: "base",
    SUPER: "super"
}
export const userService = {
    authenticate(username, password) {
        if (username !== "admin" && password !== "admin") {
            return null;
        }
    
        const user = {
            id: "9002",
            name: "Web Admin lol",
            email: "admin@example.com"
        };

        return user;
    }
};