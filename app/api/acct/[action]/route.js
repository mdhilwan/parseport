import { doAdd, doLogin, doLogout } from './operations';

export async function POST(request, { params: { action } }) {
    switch (action) {
        case "add":
            // new user
            return doAdd(request)
        case "login":
            // user login
            return doLogin(request)
        case "logout":
            // user logout
            return doLogout(request)
        case "scan":
            // user scan passport
            break;
        case "psd":
            // user generate pdf
            break;
        // case "newClientUserTable":
        //     return doNewClientUserTable();
        default:
            break;
    }
}