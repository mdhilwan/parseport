import moment from 'moment';
import { NextResponse } from 'next/server';
import { v4 } from 'uuid';

export const doNewClientUserTable = async () => {
    try {
        const result = await sql`CREATE TABLE clientuser ( userId varchar(255) PRIMARY KEY, company varchar(255), companyAddress varchar(255), companyNumber varchar(255), userEmail varchar(255), sessionId varchar(255), issueDateTime varchar(255), invalidDateTime varchar(255) );`;
        return NextResponse.json({ result }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}

export const doNewScansTable = async () => {
    try {
        const result = await sql`CREATE TABLE scans ( scanId varchar(255) PRIMARY KEY, userEmail varchar(255), company varchar(255), dateTimeStamp varchar(255) );`;
        return NextResponse.json({ result }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}

export const doNewPdfsTable = async () => {
    try {
        const result = await sql`CREATE TABLE pdfs ( pdfId varchar(255) PRIMARY KEY, userEmail varchar(255), company varchar(255), dateTimeStamp varchar(255) );`;
        return NextResponse.json({ result }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}

export const doGetByEmail = async (userEmail) => {
    const { rows } = await sql`SELECT * FROM clientuser WHERE userEmail = ${userEmail};`
    return rows
}

const isEmailExist = async (userEmail) => {
    const getByEmail = await doGetByEmail(userEmail)
    return getByEmail.length > 0
}

const getInvalidDateTime = () => moment(new Date()).add(7, 'days').format("DD-MM-YYYY hh:mm:ss")
const getDateTimeStamp = () => moment(new Date()).format("DD-MM-YYYY hh:mm:ss")

export const doAdd = async (request) => {
    const { data: { company, companyAddress, companyNumber, userEmail, sessionId, issueDateTime, invalidDateTime } } = await request.json();
    const exist = await isEmailExist(userEmail)
    if (exist) {
        return NextResponse.json({ error: `userEmail: ${userEmail} already exist` }, { status: 500 })
    }
    try {
        const result = await sql`INSERT INTO clientuser ( userId, company, companyAddress, companyNumber, userEmail, sessionId, issueDateTime, invalidDateTime ) VALUES (${v4()}, ${company}, ${companyAddress}, ${companyNumber}, ${userEmail}, ${sessionId}, ${issueDateTime}, ${invalidDateTime});`;
        return NextResponse.json({ result }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}

export const doLogin = async (request) => {
    const { data: { userEmail } } = await request.json();
    const exist = await isEmailExist(userEmail)
    if (!exist) {
        return NextResponse.json({ error: `userEmail: ${userEmail} does not exist` }, { status: 500 })
    }
    try {
        const result = await sql`UPDATE clientuser SET sessionId = ${v4()}, issueDateTime = ${getDateTimeStamp()}, invalidDateTime = ${getInvalidDateTime()} WHERE userEmail = ${userEmail};`
        return NextResponse.json({ result }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}

export const doLogout = async (request) => {
    const { data: { userEmail } } = await request.json();
    const exist = await isEmailExist(userEmail)
    if (!exist) {
        return NextResponse.json({ error: `userEmail: ${userEmail} does not exist` }, { status: 500 })
    }
    try {
        const result = await sql`UPDATE clientuser SET sessionId = '', issueDateTime = '', invalidDateTime = '' WHERE userEmail = ${userEmail};`
        return NextResponse.json({ result }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}

/** 
 * user scan passport
 * Store scan date-time stamp, userEmail, company who did the scan
 * */
export const doScan = async (request) => {
    const { data: { userEmail, company } } = await request.json();
    const exist = await isEmailExist(userEmail)
    if (!exist) {
        return NextResponse.json({ error: `userEmail: ${userEmail} does not exist` }, { status: 500 })
    }
    try {
        const result = await sql`INSERT INTO scans SET scanId = ${v4()}, userEmail = ${userEmail}, company = ${company}, dateTimeStamp = ${getDateTimeStamp()};`
        return NextResponse.json({ result }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}

/**
 * user generate pdf
 * Store pdf date-time stamp, userEmail, company who did the scan
 */
export const doPdf = async (request) => {
    const { data: { userEmail, company } } = await request.json();
    const exist = await isEmailExist(userEmail)
    if (!exist) {
        return NextResponse.json({ error: `userEmail: ${userEmail} does not exist` }, { status: 500 })
    }
    try {
        const result = await sql`INSERT INTO pdfs SET pdfId = ${v4()}, userEmail = ${userEmail}, company = ${company}, dateTimeStamp = ${getDateTimeStamp()};`
        return NextResponse.json({ result }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}