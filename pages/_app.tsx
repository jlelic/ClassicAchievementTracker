import '../styles/globals.css'
import Script from 'next/script'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import AuthHeader from '../components/AuthHeader'
import Head from 'next/head'
import PageHeader from '../components/PageHeader'
import styles from '/styles/Home.module.css'

export default function App({
                                Component,
                                pageProps,
                            }: AppProps) {
    return (
        <>
            <SessionProvider session={(pageProps as any).session}>
                <Head>
                    <title>WoWCAT - Classic Achievement Tracker</title>
                </Head>
                <div className={styles.container}>
                    <PageHeader/>
                    <Component {...pageProps} />
                </div>
            </SessionProvider>
        </>
    )
}
