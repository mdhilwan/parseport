import { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import IsAllowedUser from "./allowed";

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
        async signIn({ user, account, profile, email, credentials }) {
            if (user.email && IsAllowedUser(user.email)) {
                return true
            }
            return false
        },
        async session({ session, user, token }) {
            if (session.user.email && IsAllowedUser(session.user.email)) {
                return session
            }
            return {}
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            if (token.email && IsAllowedUser(token.email)) {
                return token
            }
            return {}
        }
    },
    secret: '2GKB1yaVuv8mZkG/ppx4Jw8h90ZWf8Oa6lU+Yu5C5kY='
};

export const getServerAuthSession = () => getServerSession(authOptions); 