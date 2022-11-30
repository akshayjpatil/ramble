import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import * as React from 'react';

import createEmotionCache from '../createEmotionCache';
import theme from '../theme';
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

type MyAppProps = AppProps & {
	emotionCache?: EmotionCache;
};

export default function App(props: MyAppProps) {
	const {
		Component,
		emotionCache = clientSideEmotionCache,
		pageProps: { session, ...pageProps },
	} = props;
	const queryClient = new QueryClient();
	return (
		<QueryClientProvider client={queryClient}>
			<SessionProvider session={session}>
				<CacheProvider value={emotionCache}>
					<Head>
						<meta
							name='viewport'
							content='initial-scale=1, width=device-width'
						/>
					</Head>
					<ThemeProvider theme={theme}>
						{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
						<CssBaseline />
						<Component {...pageProps} />
					</ThemeProvider>
				</CacheProvider>
			</SessionProvider>
		</QueryClientProvider>
	);
}
