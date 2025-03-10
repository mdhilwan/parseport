import { authOptions } from '@/app/server/auth'
import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'
import {
  activateUser,
  clearScanCount,
  deactivateUser,
  deleteUser,
  doAdd,
  doExcel,
  doLogin,
  doLogout,
  doPdf,
  doScan,
  generateVisa,
  getAllCompanies,
  getAllScansByUser,
  getAllUser,
  getPdfsHistory,
  getScansHistory,
  getUser,
  setDemoUser,
  unsetDemoUser,
} from './operations'

/**
 * Example: api/acct/add-new-user
 */
export const ADD_NEW_USER = 'add-new-user'
export const USER_LOGIN = 'user-login'
export const USER_LOGOUT = 'user-logout'
export const USER_DO_SCAN = 'user-scan'
export const USER_DO_PDF = 'user-generate-pdf'
export const USER_DO_EXCEL = 'user-generate-excel'
export const GET_ALL_USER = 'get-all-users'
export const GET_USER_BY_EMAIL = 'get-user-by-email'
export const GET_ALL_COMPANIES = 'get-all-companies'
export const GET_SCANS_HISTORY = 'get-scans-history'
export const GET_SCANS_BY_USER = 'get-scans-by-user'
export const GET_PDFS_HISTORY = 'get-pdfs-history'
export const DEACTIVATE_USER = 'deactivate-user'
export const ACTIVATE_USER = 'activate-user'
export const SET_DEMO_USER = 'set-demo-user'
export const UNSET_DEMO_USER = 'unset-demo-user'
export const DELETE_USER = 'delete-user'
export const CLEAR_SCAN_COUNT = 'clear-scan-count'
export const GENERATE_VISA = 'generate-visa'

// UNUSED
export const NEW_CLIENT_USER_TABLE = 'new-client-user-table'
export const NEW_SCANS_TABLE = 'new-scans-table'
export const NEW_PDFS_TABLE = 'new-pdfs-table'

export async function POST(request, { params: { action } }) {
  const authSession = await getServerSession(authOptions)

  // TODO: AuthSession is invalid on server side

  switch (action) {
    case GET_USER_BY_EMAIL:
      return getUser(request)
    case USER_LOGIN:
      return doLogin(request)
    case ADD_NEW_USER:
      return doAdd(request)
    case USER_LOGOUT:
      return doLogout(request)
    case USER_DO_SCAN:
      return doScan(request)
    case USER_DO_PDF:
      return doPdf(request)
    case GET_ALL_USER:
      return getAllUser()
    case GET_ALL_COMPANIES:
      return getAllCompanies()
    case GET_SCANS_HISTORY:
      return getScansHistory()
    case GET_SCANS_BY_USER:
      return getAllScansByUser(request)
    case GET_PDFS_HISTORY:
      return getPdfsHistory()
    case ACTIVATE_USER:
      return activateUser(request)
    case DEACTIVATE_USER:
      return deactivateUser(request)
    case SET_DEMO_USER:
      return setDemoUser(request)
    case UNSET_DEMO_USER:
      return unsetDemoUser(request)
    case DELETE_USER:
      return deleteUser(request)
    case CLEAR_SCAN_COUNT:
      return clearScanCount(request)
    case GENERATE_VISA:
      return generateVisa(request)
    case USER_DO_EXCEL:
      return doExcel(request)
    // case NEW_CLIENT_USER_TABLE:
    //     return doNewClientUserTable();
    // case NEW_SCANS_TABLE:
    //     return doNewScansTable();
    // case NEW_PDFS_TABLE:
    //     return doNewPdfsTable();
    default:
      return NextResponse.json({ action: `Action not supported "${action}"` })
  }
}
