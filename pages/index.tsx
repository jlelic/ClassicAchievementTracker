import type { GetServerSidePropsContext, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '/styles/Home.module.css'
import playerStyles from '/styles/PlayerTable.module.css'
import { PrismaClient } from '@prisma/client'
import { serializeCharacters } from '../lib/serializers'
import AchievementCategorySelector from '../components/AchievementCategorySelector'
import Link from 'next/link'
import clsx from 'clsx'
import {format as formatTimeAgo} from 'timeago.js'

interface HomePageProps {
    tableData: any[];
}

const Home: NextPage<HomePageProps> = (props) => {

    const { tableData } = props

    return (
            <main className={styles.main}>
                <div>
                    <h2>Overview for &lt;Nebula&gt; Earthshaker</h2>
                </div>
                <div>
                    <div className={clsx(playerStyles.row, playerStyles.header)}>
                        <div className={clsx(playerStyles.index)}>
                            #
                        </div>
                        <div className={clsx(playerStyles.name)}>
                            Name
                        </div>
                        <div className={clsx(playerStyles.count)}>
                            Total
                        </div>
                        <div className={clsx(playerStyles.points)}>
                            Points
                        </div>
                        <div className={clsx(playerStyles.date)}>
                            Updated
                        </div>
                    </div>
                    {tableData.map((character, index) => <div
                        key={character.name}
                        className={playerStyles.row}
                    >
                        <div className={clsx(playerStyles.cell, playerStyles.index)}>
                            {index + 1}.
                        </div>
                        <div className={clsx(playerStyles.cell, playerStyles.name, character.class)}>
                            <Link href={`/character/${character.name}`}>
                                {character.name}
                            </Link>
                        </div>
                        <div className={clsx(playerStyles.cell, playerStyles.count)}>
                            {character.achievementCount}
                        </div>
                        <div className={clsx(playerStyles.cell, playerStyles.points)}>
                            {character.achievementPoints}
                        </div>
                        <div className={clsx(playerStyles.cell, playerStyles.date)}>
                            {formatTimeAgo(character.lastUpdate)}
                            {/*{moment(character.lastUpdate).fromNow()}*/}
                        </div>
                    </div>)}
                </div>
            </main>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {

    const prisma = new PrismaClient()

    const leaderboard = await prisma.character.findMany({
        select: {
            name: true,
            achievementCount: true,
            achievementPoints: true,
            guild: true,
            lastUpdate: true,
            class: true
        },
        orderBy: {
            achievementPoints: 'desc',
        },
        take: 20
    })

    return {
        props: {
            tableData: serializeCharacters(leaderboard)
        },
    }
}

export default Home
