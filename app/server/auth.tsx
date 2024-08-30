import moment from 'moment'
import { getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { HttpActions } from '../api/httpActions'

const isSessionIdExpired = (invalidDateTime: moment.MomentInput) => {
  return (
    moment().diff(moment(invalidDateTime, 'DD-MM-YYYY hh:mm:ss'), 'minutes') >=
    0
  )
}

export const authOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }: { user: any }) {
      const {
        res: { result },
      } = await HttpActions.GetUserByEmail(user.email)
      if (user.email && result.active) {
        const {
          res: {
            result: { sessionid },
          },
        } = await HttpActions.UserLogin(user.email)
        return !!sessionid
      }
      return false
    },
    async session({ session }: { session: any }) {
      let {
        res: { result },
      } = await HttpActions.GetUserByEmail(session.user.email)
      if (session.user.email && result.active) {
        if (isSessionIdExpired(result.invaliddatetime)) {
          const {
            res: {
              result: { sessionid },
            },
          } = await HttpActions.RefreshSessionId(session.user.email)
          result.sessionid = sessionid
        }

        return {
          ...session,
          sessionId: result.sessionid,
        }
      }
      return {}
    },
    async jwt({ token, account }: { token: any; account: any }) {
      const {
        res: { result },
      } = await HttpActions.GetUserByEmail(token.email)
      if (token.email && result.active && account) {
        return token
      }
      return {}
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

// @ts-ignore
export const getServerAuthSession = () => getServerSession(authOptions)
