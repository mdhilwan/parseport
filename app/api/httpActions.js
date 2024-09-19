import {
  ACTIVATE_USER,
  ADD_NEW_USER,
  CLEAR_SCAN_COUNT,
  DEACTIVATE_USER,
  DELETE_USER,
  GET_ALL_USER,
  GET_SCANS_BY_USER,
  GET_USER_BY_EMAIL,
  USER_DO_EXCEL,
  USER_DO_PDF,
  USER_DO_SCAN,
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

let scanCount = 0
let execDoScan

const completeDoScan = async ({ userEmail, company }) => {
  const res = await doFetchPost(USER_DO_SCAN, {
    data: {
      userEmail,
      company,
      scanCount,
    },
  })
  scanCount = 0
  return { res: await res.json(), email: userEmail }
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
    const resObj = await res.json()
    const filtered = resObj.result.map((r) => ({
      company: r.company,
      companyaddress: r.companyaddress,
      companynumber: r.companynumber,
      useremail: r.useremail,
      active: true,
      scancount: 0,
      downloadcount: 0,
    }))

    await Promise.all(
      filtered.map((f) =>
        doFetchPost(GET_SCANS_BY_USER, {
          data: { userEmail: f.useremail },
        })
      )
    ).then(async (res) =>
      Promise.all(
        res.map(async (data, index) => {
          const jsonData = await data.json()
          filtered[index].scancount = jsonData.result.length
        })
      )
    )

    return { res: { result: filtered } }
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
  async ClearScanCount(userEmail) {
    const res = await doFetchPost(CLEAR_SCAN_COUNT, {
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
  async DoScan({ userEmail, company }) {
    scanCount++
    clearTimeout(execDoScan)
    execDoScan = setTimeout(() => {
      return completeDoScan({
        userEmail,
        company,
      })
    }, 5000)
  },
  async DoPdf({ userEmail, company }) {
    const res = await doFetchPost(USER_DO_PDF, {
      data: {
        userEmail,
        company,
      },
    })
    return { res: await res.json(), email: userEmail }
  },
  async DoExcel({ userEmail, company }) {
    const res = await doFetchPost(USER_DO_EXCEL, {
      data: {
        userEmail,
        company,
      },
    })
    return { res: await res.json(), email: userEmail }
  },
}
