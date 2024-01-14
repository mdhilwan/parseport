/**
 * Hard coded users
 */
const allowed = [
    {
        email: "parse.pass.port@gmail.com",
        type: "super"
    },
    {
        email: "mdhilwan@gmail.com"
    }
]

export const IsAllowedUser = (email) => {
    return allowed.map(a => a.email).includes(email)
}

export const GetType = (email) => {
    return allowed.find(a => a.email === email).type
}
