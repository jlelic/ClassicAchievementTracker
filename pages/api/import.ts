// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {decodeAddonData, PlayerAchievementData} from "../../lib/decoder";
import {PrismaClient} from "@prisma/client";
import {loadAchievementsPoints} from "../../lib/cache";

type Data = {
    name: string
}


const bulkCreateAchievements = async (prisma: PrismaClient, characterId: string, achievements: PlayerAchievementData[]) => {
    let totalCreatedAchievementsNum = 0
    const chunkSize = 100
    console.log(`Creating ${achievements.length} achievements`)

    for (let i = 0; totalCreatedAchievementsNum < achievements.length; i += chunkSize) {
        const achievementsToAdd = achievements.slice(i, i + chunkSize)
        console.log(`Creating ${i} to ${i + chunkSize}`)
        const createdAchievements = await prisma.playerAchievement.createMany({
            data: achievementsToAdd.map(a => ({
                achievementId: a.achievementId,
                date: a.date,
                characterId: characterId,
            }))
        })
        totalCreatedAchievementsNum += createdAchievements.count
        console.log(`Created ${createdAchievements.count} achievements, ${totalCreatedAchievementsNum} total`)
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const {realm, guild, playersData} = decodeAddonData(req.body)

    const prisma = new PrismaClient()


    const result = {
        created: [],
        updated: [],
        skipped: []
    }

    const achievementsPoints = await loadAchievementsPoints(prisma)

    for (let i = 0; i < playersData.length; i++) {
        const playerData = playersData[i]
        const {name, race, class: className, achievements, time} = playerData
        console.log(`Importing ${name}`)


        const character = await prisma.character.findUnique({
            where: {
                name_realm: {
                    name, realm
                }
            },
            include: {
                achievements: true
            }
        })

        if (!character) {
            // Create new
            console.log(`${name} not found, creating...`)

            const achievementPoints = achievements
                .map(a => achievementsPoints[a.achievementId])
                .reduce((a, b) => a + b, 0)

            const createdCharacter = await prisma.character.create({
                data: {
                    name,
                    realm,
                    lastUpdate: time,
                    race,
                    class: className,
                    achievementPoints,
                    achievementCount: achievements.length,
                    guild,
                }
            })
            console.log(`Created ${name}!`)

            await bulkCreateAchievements(prisma, createdCharacter.id, achievements)


        } else {
            console.log(`Found ${name}`)

            if(time < (character.lastUpdate || 0)) {
                console.log(`Too old data for ${name}, skipping`)
                console.log(time)
                console.log(character.lastUpdate)
                continue
            }

            const alreadyHasAchievement = new Set(character.achievements.map(a => a.achievementId))
            const missingAchievements = achievements.filter(a => !alreadyHasAchievement.has(a.achievementId))
            const points = achievements
                .map(a => achievementsPoints[a.achievementId])
                .reduce((a, b) => a + b, 0)

            await bulkCreateAchievements(prisma, character.id, missingAchievements)
            await prisma.character.update({
                data: {
                    lastUpdate: time,
                    achievementCount: alreadyHasAchievement.size + missingAchievements.length,
                    achievementPoints: points,
                },
                where: {
                    name_realm: {
                        name, realm
                    }
                }
            })
        }
    }
    res.status(200).json({result} as any)
}
