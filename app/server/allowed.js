/**
 * Hard coded users
 */
const allowed = [
    {
        email: "parse.pass.port@gmail.com",
        type: "super"
    }
]

export const GetType = (email) => {
    return allowed.find(a => a.email === email).type
}
