import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { dbConnect } from 'config/dbConnect';
import User from 'models/user';
import bcryptjs from 'bcryptjs';


export default NextAuth({
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
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
                return Promise.resolve(user);
            },
        }),
    ],
    callbacks: {
        jwt: async ({ user, token }) => {
            user && (token.user = user);
            return Promise.resolve(token);
        },
        session: async ({ session, token }) => {
            session.user = token.user;
            return Promise.resolve(session);
        },
    },
    secret: process.env.NEXTAUTH_SECRET
});
