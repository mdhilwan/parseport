import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { userService } from "./services/userService";

export const authOptions = {
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, account, profile }) { 
            if (account && account.type === "credentials") {
                token.userId = account.providerAccountId;
            }
            return token;
        },
        async session({ session, token, user }) {
            session.user.id = token.userId;
            return session;
        },
    },
    pages: {
        signIn: '/login',
    },
    secret: process.env.AUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "username" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const { username, password } = credentials;

                console.log('------- authorize -------')
                console.log(userService.authenticate(username, password))

                return userService.authenticate(username, password); 
            }
        })
    ],
};

export const getServerAuthSession = () => getServerSession(authOptions); 