import { ACTIVATE_USER, ADD_NEW_USER, DEACTIVATE_USER, DELETE_USER, GET_ALL_USER, GET_USER_BY_EMAIL, SAVE_NEW_USER } from "./acct/[action]/route"

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
    },
    async GetAllUsers() {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/acct/${GET_ALL_USER}`
        const res = await fetch(url, {
            ...postHeader
        })
        return res.json()
    },
    async DeactivateUser(userEmail) {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/acct/${DEACTIVATE_USER}`
        const res = await fetch(url, {
            ...postHeader,
            body: JSON.stringify({ data: { userEmail: userEmail } })
        })
        return res.json()
    },
    async ActivateUser(userEmail) {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/acct/${ACTIVATE_USER}`
        const res = await fetch(url, {
            ...postHeader,
            body: JSON.stringify({ data: { userEmail: userEmail } })
        })
        return res.json()
    },
    async DeleteUser(userEmail) {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/acct/${DELETE_USER}`
        const res = await fetch(url, {
            ...postHeader,
            body: JSON.stringify({ data: { userEmail: userEmail } })
        })
        return res.json()
    },
    async AddNewUser({data: {company, companyAddress, companyNumber, userEmail}}) {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/acct/${ADD_NEW_USER}`
        const res = await fetch(url, {
            ...postHeader,
            body: JSON.stringify({ data: { company: company, companyAddress: companyAddress, companyNumber: companyNumber, userEmail: userEmail } })
        })
        const data = await res.json()
        return {res: data, email: userEmail}
    }
}