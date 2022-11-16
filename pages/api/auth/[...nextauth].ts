import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

export default NextAuth({
	// Configure one or more authentication providers
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID as string,
			clientSecret: process.env.GITHUB_SECRET as string,
			// @ts-ignore
			scope: 'read:user',
		}),
		// ...add more providers here
	],
	secret: process.env.JWT_SECTRET,
	callbacks: {
		async session({ session, token, user }) {
			return session;
		},
	},
	debug: false,
});
