import { GET_USER_BY_EMAIL } from "./acct/[action]/route"

const postHeader = {
    method: 'POST'
}

export const HttpActions = {
    async GetUserByEmail(userEmail) {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/acct/${GET_USER_BY_EMAIL}`
        const res = await fetch(url, {
            ...postHeader,
            body: JSON.stringify({ data: { userEmail: userEmail } })
        })
        return res.json()
    }
}