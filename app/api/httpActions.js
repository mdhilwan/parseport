import {
  ACTIVATE_USER,
  ADD_NEW_USER,
  DEACTIVATE_USER,
  DELETE_USER,
  GET_ALL_USER,
  GET_USER_BY_EMAIL,
  SAVE_NEW_USER,
  USER_LOGIN,
} from './acct/[action]/route'

const postHeader = { method: 'POST' }
const doFetchPost = (route, body) => {
  if (body) {
    return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/acct/${route}`, {
      ...postHeader,
      body: JSON.stringify(body),
    })
  }
  return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/acct/${route}`, {
    ...postHeader,
  })
}

export const HttpActions = {
  async GetUserByEmail(userEmail) {
    const res = await doFetchPost(GET_USER_BY_EMAIL, {
      data: { userEmail: userEmail },
    })
    return { res: await res.json(), email: userEmail }
  },
  async UserLogin(userEmail) {
    const res = await doFetchPost(USER_LOGIN, {
      data: { userEmail: userEmail },
    })
    return { res: await res.json(), email: userEmail }
  },
  async RefreshSessionId(userEmail) {
    return await this.UserLogin(userEmail)
  },
  async GetAllUsers() {
    const res = await doFetchPost(GET_ALL_USER)
    return { res: await res.json() }
  },
  async DeactivateUser(userEmail) {
    const res = await doFetchPost(DEACTIVATE_USER, {
      data: { userEmail: userEmail },
    })
    return { res: await res.json(), email: userEmail }
  },
  async ActivateUser(userEmail) {
    const res = await doFetchPost(ACTIVATE_USER, {
      data: { userEmail: userEmail },
    })
    return { res: await res.json(), email: userEmail }
  },
  async DeleteUser(userEmail) {
    const res = await doFetchPost(DELETE_USER, {
      data: { userEmail: userEmail },
    })
    return { res: await res.json(), email: userEmail }
  },
  async AddNewUser({
    data: { company, companyAddress, companyNumber, userEmail },
  }) {
    const res = await doFetchPost(ADD_NEW_USER, {
      data: {
        company: company,
        companyAddress: companyAddress,
        companyNumber: companyNumber,
        userEmail: userEmail,
      },
    })
    return { res: await res.json(), email: userEmail }
  },
}
