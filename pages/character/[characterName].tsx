import type { GetServerSidePropsContext, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '/styles/Home.module.css'
import { Achievement, Character, PlayerAchievement, PrismaClient } from '@prisma/client'
import AchievementCategorySelector from '../../components/AchievementCategorySelector'
import { useEffect, useState } from 'react'
import { AchievementCategory } from '../../lib/achievement-categories'
import achievementStyles from '/styles/Achievement.module.css'
import characterStyles from '/styles/Character.module.css'
import clsx from 'clsx'
import { getDaysAgoString, numToDateString } from '../../lib/utils'

interface FullPlayerAchievement extends PlayerAchievement {
    achievement: Achievement,
    character: Character,
}

interface CharacterPageProps {
    playerAchievements: FullPlayerAchievement []
}

const CharacterPage: NextPage<CharacterPageProps> = (props) => {

    const { playerAchievements } = props

    const [selectedCategory, setSelectedCategory] = useState<AchievementCategory | null>(null)
    const [displayedAchievements, setDisplayedAchievements] = useState<FullPlayerAchievement[]>(playerAchievements)

    useEffect(() => {
        setDisplayedAchievements(
            playerAchievements.filter(a => !selectedCategory || (a.achievement as Achievement) .categoryId === selectedCategory.id)
        )
    }, [selectedCategory, playerAchievements])


    const onCategorySelected = (category: AchievementCategory | null) => {
        setSelectedCategory(category)
    }

    return (

            <main className={styles.main}>
                <h2>
                    Overview of <span className={playerAchievements[0].character.class}>{playerAchievements[0].character.name}</span>
                </h2>
                <div className={characterStyles.content}>
                    <div className={characterStyles.selector}>
                        <AchievementCategorySelector onCategorySelected={onCategorySelected}/>
                    </div>
                    <div className={characterStyles.achievements}>
                        {displayedAchievements.length > 0 ? displayedAchievements.map((playerAchievement, index) => {
                            const { achievement, character, date } = playerAchievement
                            return <div key={achievement.id} className={achievementStyles.card}>

                                <div className={achievementStyles.iconWrapper}>
                                    <div
                                        className={achievementStyles.icon}
                                        style={{
                                            backgroundImage: `url(/icons/${achievement.icon}.jpg)`,
                                        }}
                                    />
                                </div>
                                <div className={achievementStyles.middleWrapper}>
                                    <div className={achievementStyles.title}>
                                        {achievement.name}
                                    </div>
                                    <div className={achievementStyles.description}>
                                        {achievement.description}
                                    </div>
                                    <div className={achievementStyles.name}>
                                        Earned by {character.name} {getDaysAgoString(date)}
                                    </div>

                                </div>
                                <div className={achievementStyles.pointsWrapper}>
                                    <div className={clsx(
                                        achievementStyles.points,
                                        achievement.points <= 10 ? achievementStyles.bronze :
                                            achievement.points <= 25 ? achievementStyles.silver :
                                                achievementStyles.gold,
                                    )}>
                                        {achievement.points}
                                    </div>
                                    <div className={achievementStyles.date}>
                                        {numToDateString(date)}
                                    </div>
                                </div>
                            </div>
                        })
                        :
                            <div className={characterStyles.notFound}>No achievements in this category</div>}
                    </div>
                    <div className={clsx(characterStyles.selector, characterStyles.pad)}>
                    </div>
                </div>
            </main>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {

    const prisma = new PrismaClient()

    const rawName = context.params?.characterName
    if (!(typeof rawName === 'string')) {
        throw 'No character name'
    }

    const name = rawName.slice(0, 1).toLocaleUpperCase() + rawName.slice(1).toLocaleLowerCase()

    const characterAchievements = await prisma.playerAchievement.findMany({
        where: {
            character: {
                name,
                realm: 'Earthshaker'
            }
        },
        select: {
            achievement: true,
            date: true,
            character: {
                select: {
                    name: true,
                    class: true
                }
            }
        },
        orderBy: {
            date: 'desc'
        }
    })

    return {
        props: {
            playerAchievements: characterAchievements
        }, // will be passed to the page component as props
    }
}

export default CharacterPage
