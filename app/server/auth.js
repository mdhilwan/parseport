import { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { HttpActions } from "../api/httpActions";
import moment from 'moment';

const isSessionIdExpired = (invaliddatetime) => {
    return moment().diff(moment(invaliddatetime, "DD-MM-YYYY hh:mm:ss"), "minutes") >= 0
}

export const authOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async signIn({ user }) {
            const { res: { result } } = await HttpActions.GetUserByEmail(user.email)
            if (user.email && result.active) {
                const { res: { result: { sessionId } } } = await HttpActions.UserLogin(user.email)
                if (sessionId) {
                    return true
                }
                return false
            }
            return false
        },
        async session({ session }) {
            let { res: { result } } = await HttpActions.GetUserByEmail(session.user.email)
            if (session.user.email && result.active) {
                if (isSessionIdExpired(result.invaliddatetime)) {
                    const res = await HttpActions.RefreshSessionId(session.user.email)
                    result = res.result
                }
                return {
                    ...session,
                    sessionId: result.sessionid
                }
            }
            return {}
        },
        async jwt({ token }) {
            const { res: { result } } = await HttpActions.GetUserByEmail(token.email)
            if (token.email && result.active) {
                return token
            }
            return {}
        }
    },
    secret: process.env.NEXTAUTH_SECRET
};

export const getServerAuthSession = () => getServerSession(authOptions); 