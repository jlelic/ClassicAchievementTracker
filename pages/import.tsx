import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useRef} from "react";
import { useSession, signIn, signOut } from "next-auth/react"

const Home: NextPage = () => {

    const onSend = async () => {
        await fetch('/api/import',{method: 'POST', body: textareaRef.current!.value})
    }

    const textareaRef = useRef<HTMLTextAreaElement>(null)

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    Import achievement data:
                </h1>

                <textarea ref={textareaRef}/>
                <button onClick={onSend}>SEND IT</button>
            </main>
        </div>
    )
}

export default Home
