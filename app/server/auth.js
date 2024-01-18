import { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { IsAllowedUser } from "./allowed";
import { HttpActions } from "../api/httpActions";

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
                return true
            }
            return false
        },
        async session({ session }) {
            const { res: { result } } = await HttpActions.GetUserByEmail(session.user.email)
            if (session.user.email && result.active) {
                return session
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