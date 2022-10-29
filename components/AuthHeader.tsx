import {signIn, signOut, useSession} from "next-auth/react";

import styles from '/styles/Header.module.css'

export default function AuthHeader(){
    const {data: session} = useSession()
    if (session) {
        return (
            <div className={styles.auth}>
                Signed in as {session.user!.name} <br/>
                <div className='button' onClick={() => signOut()}>Sign out</div>
            </div>
        )
    }
    return (
        <div className={styles.auth}>
            <div className='button' onClick={() => signIn()}>Sign in</div>
        </div>
    )
}
