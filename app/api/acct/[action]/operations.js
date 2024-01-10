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

export const doGetByEmail = async (userEmail) => {
    const { rows } = await sql`SELECT * FROM clientuser WHERE userEmail = ${userEmail};`
    return rows
}

export const doInsert = async (company, companyAddress, companyNumber, userEmail, sessionId = "", issueDateTime = "", invalidDateTime = "") => {
    const result = await sql`INSERT INTO clientuser ( userId, company, companyAddress, companyNumber, userEmail, sessionId, issueDateTime, invalidDateTime ) VALUES (${v4()}, ${company}, ${companyAddress}, ${companyNumber}, ${userEmail}, ${sessionId}, ${issueDateTime}, ${invalidDateTime});`;
    return result
}

export const doAdd = async (request) => {
    try {
        const { data: { company, companyAddress, companyNumber, userEmail, sessionId, issueDateTime, invalidDateTime } } = await request.json();
        const getByEmail = await doGetByEmail(userEmail)
        const exist = getByEmail.length > 0;
        if (exist) {
            return NextResponse.json({ error: `userEmail: ${userEmail} already exist` }, { status: 500 })
        } else {
            const result = await doInsert(company, companyAddress, companyNumber, userEmail, sessionId, issueDateTime, invalidDateTime)
            return NextResponse.json({ result }, { status: 200 })
        }
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}

export const doLogin = async (request) => {
    const { data: { userEmail } } = await request.json();
    const getByEmail = await doGetByEmail(userEmail)
    const exist = getByEmail.length > 0;
    if (exist) {
        try {
            const result = await sql`UPDATE clientuser SET sessionId = ${v4()}, issueDateTime = ${moment(new Date()).format("DD-MM-YYYY hh:mm:ss")}, invalidDateTime = ${moment(new Date()).add(7, 'days').format("DD-MM-YYYY hh:mm:ss")} WHERE userEmail = ${userEmail};`
            return NextResponse.json({ result }, { status: 200 })
        } catch (error) {
            return NextResponse.json({ error }, { status: 500 })
        }
    } else {
        return NextResponse.json({ error: `userEmail: ${userEmail} already exist` }, { status: 500 })
    }
}

export const doLogout = async (request) => {
    const { data: { userEmail } } = await request.json();
    const getByEmail = await doGetByEmail(userEmail)
    const exist = getByEmail.length > 0;
    if (exist) {
        try {
            const result = await sql`UPDATE clientuser SET sessionId = '', issueDateTime = '', invalidDateTime = '' WHERE userEmail = ${userEmail};`
            return NextResponse.json({ result }, { status: 200 })
        } catch (error) {
            return NextResponse.json({ error }, { status: 500 })
        }
    } else {
        return NextResponse.json({ error: `userEmail: ${userEmail} already exist` }, { status: 500 })
    }
}