 import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { dbConnect } from 'config/dbConnect';
import User from 'models/user';
import bcryptjs from 'bcryptjs';


export const authOptions = {
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            name: "BookitCredentials",
            credentials: {
                email: { label: "email", type: "text", placeholder: "doe@gmail.com" },
                password: { label: "password", type: "password" }
              },
            async authorize(credentials, req) {
                dbConnect();
                const { email, password } = credentials;
                if (!email || !password) {
                    throw new Error('Please enter credentials');
                }
                const user = await User.findOne({ email }).select('+password');
                if (!user) {
                    throw new Error('Invalid credentials');
                }
                const isPasswordMatched = await bcryptjs.compare(password, user.password);

                if (!isPasswordMatched) {
                    throw new Error('Invalid credentials');
                }
                return user
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            user && (token.user = user)
           token.id = user.id
           return token
        },
        async session({ session, token }){
            session.user = token.user
            return session
        },
    },
    secret: process.env.NEXTAUTH_SECRET
}


export default NextAuth(authOptions)

