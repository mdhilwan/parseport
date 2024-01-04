const allowed = [
    "parse.pass.port@gmail.com"
]

const IsAllowedUser = (email) => {
    return allowed.includes(email)
}

export default IsAllowedUser;
