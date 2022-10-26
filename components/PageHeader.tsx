import AuthHeader from './AuthHeader'

import styles from '/styles/Header.module.css'
import Link from 'next/link'

export default () => {
    return <div className={styles.header}>
        <Link href="/">
            <div className={styles.title}/>
        </Link>
        {/*<AuthHeader/>*/}
    </div>
}
