import moment from 'moment'
import { NextResponse } from 'next/server'
import { v4 } from 'uuid'
import { sql } from '@vercel/postgres'
import { getServerAuthSession } from '@/app/server/auth'
import jwt from 'jsonwebtoken'

const doGetByEmail = async (userEmail) => {
  const { rows } =
    await sql`SELECT * FROM clientuser WHERE userEmail = ${userEmail};`
  return rows
}

const isEmailExist = async (userEmail) => {
  const getByEmail = await doGetByEmail(userEmail)
  return getByEmail.length > 0
}

const getInvalidDateTime = () =>
  moment(new Date()).add(10, 'minutes').format('DD-MM-YYYY hh:mm:ss')
const getDateTimeStamp = () => moment(new Date()).format('DD-MM-YYYY hh:mm:ss')
const doReturn200 = (result) =>
  NextResponse.json({ result: result }, { status: 200 })
const doReturn500 = (error) =>
  NextResponse.json({ error: error }, { status: 500 })

export const doNewClientUserTable = async () => {
  try {
    const result =
      await sql`CREATE TABLE clientuser ( userId varchar(255) PRIMARY KEY, company varchar(255), companyAddress varchar(255), companyNumber varchar(255), userEmail varchar(255), sessionId varchar(255), issueDateTime varchar(255), invalidDateTime varchar(255) );`
    return doReturn200(result)
  } catch (error) {
    return doReturn500(error)
  }
}

export const doNewScansTable = async () => {
  try {
    const result =
      await sql`CREATE TABLE scans ( scanId varchar(255) PRIMARY KEY, userEmail varchar(255), company varchar(255), dateTimeStamp varchar(255) );`
    return doReturn200(result)
  } catch (error) {
    return doReturn500(error)
  }
}

export const doNewPdfsTable = async () => {
  try {
    const result =
      await sql`CREATE TABLE pdfs ( pdfId varchar(255) PRIMARY KEY, userEmail varchar(255), company varchar(255), dateTimeStamp varchar(255) );`
    return doReturn200(result)
  } catch (error) {
    return doReturn500(error)
  }
}

export const doAdd = async (request) => {
  const {
    data: {
      company,
      companyAddress,
      companyNumber,
      userEmail,
      sessionId = '',
      issueDateTime = '',
      invalidDateTime = '',
    },
  } = await request.json()
  if (!userEmail) {
    return doReturn500(`userEmail: missing`)
  }
  const exist = await isEmailExist(userEmail)
  if (exist) {
    return doReturn500(`userEmail: ${userEmail} already exist`)
  }
  try {
    const result =
      await sql`INSERT INTO clientuser ( userId, company, companyAddress, companyNumber, userEmail, sessionId, issueDateTime, invalidDateTime, active ) VALUES (${v4()}, ${company}, ${companyAddress}, ${companyNumber}, ${userEmail}, ${sessionId}, ${issueDateTime}, ${invalidDateTime}, true);`
    return doReturn200(result)
  } catch (error) {
    return doReturn500(error)
  }
}

export const doLogin = async (request) => {
  const {
    data: { userEmail },
  } = await request.json()
  if (!userEmail) {
    return doReturn500(`userEmail: missing`)
  }
  const exist = await isEmailExist(userEmail)
  if (!exist) {
    return doReturn500(`userEmail: ${userEmail} does not exist`)
  }
  try {
    const sessionId = v4()
    await sql`UPDATE clientuser SET sessionId = ${sessionId}, issueDateTime = ${getDateTimeStamp()}, invalidDateTime = ${getInvalidDateTime()} WHERE userEmail = ${userEmail};`
    return doReturn200({ sessionid: sessionId })
  } catch (error) {
    return doReturn500(error)
  }
}

export const doLogout = async (request) => {
  const {
    data: { userEmail },
  } = await request.json()
  if (!userEmail) {
    return doReturn500(`userEmail: missing`)
  }
  const exist = await isEmailExist(userEmail)
  if (!exist) {
    return doReturn500(`userEmail: ${userEmail} does not exist`)
  }
  try {
    const result =
      await sql`UPDATE clientuser SET sessionId = '', issueDateTime = '', invalidDateTime = '' WHERE userEmail = ${userEmail};`
    return doReturn200(result)
  } catch (error) {
    return doReturn500(error)
  }
}

/**
 * user scan passport
 * Store scan date-time stamp, userEmail, company who did the scan
 * */
export const doScan = async (request) => {
  const {
    data: { userEmail, company },
  } = await request.json()
  if (!userEmail) {
    return doReturn500(`userEmail: missing`)
  }
  const exist = await isEmailExist(userEmail)
  if (!exist) {
    return doReturn500(`userEmail: ${userEmail} does not exist`)
  }
  try {
    const result =
      await sql`INSERT INTO scans ( scanId, userEmail, company, dateTimeStamp ) VALUES (${v4()}, ${userEmail}, ${company}, ${getDateTimeStamp()});`
    return doReturn200(result)
  } catch (error) {
    return doReturn500(error)
  }
}

/**
 * user generate pdf
 * Store pdf date-time stamp, userEmail, company who did the scan
 */
export const doPdf = async (request) => {
  const {
    data: { userEmail, company },
  } = await request.json()
  if (!userEmail) {
    return doReturn500(`userEmail: missing`)
  }
  const exist = await isEmailExist(userEmail)
  if (!exist) {
    return doReturn500(`userEmail: ${userEmail} does not exist`)
  }
  try {
    const result =
      await sql`INSERT INTO pdfs SET pdfId = ${v4()}, userEmail = ${userEmail}, company = ${company}, dateTimeStamp = ${getDateTimeStamp()};`
    return doReturn200(result)
  } catch (error) {
    return doReturn500(error)
  }
}

/**
 * get user by email
 * return user table
 */
export const getUser = async (request) => {
  const {
    data: { userEmail },
  } = await request.json()
  if (!userEmail) {
    return doReturn500(`userEmail: missing`)
  }
  const exist = await isEmailExist(userEmail)
  if (!exist) {
    return doReturn500(`userEmail: ${userEmail} does not exist`)
  }
  try {
    const { rows } =
      await sql`SELECT * FROM clientuser WHERE useremail = ${userEmail};`
    return doReturn200(rows.at(0))
  } catch (error) {
    return doReturn500(error)
  }
}

/**
 * get all users
 * extract users list from table
 */
export const getAllUser = async () => {
  try {
    const { rows } = await sql`SELECT * FROM clientuser;`
    return doReturn200(rows)
  } catch (error) {
    return doReturn500(error)
  }
}

/**
 * deactivate a user
 */
export const deactivateUser = async (request) => {
  const {
    data: { userEmail },
  } = await request.json()
  if (!userEmail) {
    return doReturn500(`userEmail: missing`)
  }
  const exist = await isEmailExist(userEmail)
  if (!exist) {
    return doReturn500(`userEmail: ${userEmail} does not exist`)
  }
  try {
    const { rows } =
      await sql`UPDATE clientuser SET active = false WHERE useremail = ${userEmail};`
    return doReturn200(rows)
  } catch (error) {
    return doReturn500(error)
  }
}

/**
 * delete a user
 */
export const deleteUser = async (request) => {
  const {
    data: { userEmail },
  } = await request.json()
  if (!userEmail) {
    return doReturn500(`userEmail: missing`)
  }
  const exist = await isEmailExist(userEmail)
  if (!exist) {
    return doReturn500(`userEmail: ${userEmail} does not exist`)
  }
  try {
    const { rows } =
      await sql`DELETE FROM clientuser WHERE useremail = ${userEmail};`
    return doReturn200(rows)
  } catch (error) {
    return doReturn500(error)
  }
}

export const generateVisa = async (request) => {
  const { data } = await request.json()
  console.log(data)

  const authSession = await getServerAuthSession()
  const tokenForApi = `${btoa(JSON.stringify(authSession))}`
  const jwtForApi = jwt.sign(tokenForApi, process.env.NEXTAUTH_SECRET)
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/generate/${data.documentNumber}`,
    {
      method: 'POST',
      body: JSON.stringify({ data: data }),
      headers: new Headers({
        'content-type': 'application/json',
        cookie: `token=${jwtForApi}`,
      }),
    }
  )
}

/**
 * activate a user
 */
export const activateUser = async (request) => {
  const {
    data: { userEmail },
  } = await request.json()
  if (!userEmail) {
    return doReturn500(`userEmail: missing`)
  }
  const exist = await isEmailExist(userEmail)
  if (!exist) {
    return doReturn500(`userEmail: ${userEmail} does not exist`)
  }
  try {
    const { rows } =
      await sql`UPDATE clientuser SET active = true WHERE useremail = ${userEmail};`
    return doReturn200(rows)
  } catch (error) {
    return doReturn500(error)
  }
}

/**
 * get all companies
 * extract companies list from table
 */
export const getAllCompanies = async () => {
  try {
    const result =
      await sql`SELECT DISTINCT company, companyaddress, companynumber FROM clientuser;`
    return doReturn200(result)
  } catch (error) {
    return doReturn500(error)
  }
}

/**
 * get scans history
 * retrieve scans history from table `scan`
 */
export const getScansHistory = async () => {
  try {
    const result = await sql`SELECT * FROM scans;`
  } catch (error) {
    return doReturn500(error)
  }
}

/**
 * get pdfs history
 * retrieve pdfs history from table `pdf`
 */
export const getPdfsHistory = async () => {
  try {
    const result = await sql`SELECT * FROM pdfs;`
  } catch (error) {
    return doReturn500(error)
  }
}
