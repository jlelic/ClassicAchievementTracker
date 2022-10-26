import {PrismaClient} from "@prisma/client";

let achievementsPoints: {[id: number]: number}

export async function loadAchievementsPoints(prisma?: PrismaClient): Promise<{ [id: number]: number }> {
    if (achievementsPoints) {
        return achievementsPoints
    }

    if(!prisma) {
        prisma = new PrismaClient()
    }

    console.log('Loading achievements points')
    const achievements = await prisma.achievement.findMany()

    achievementsPoints = {}
    achievements.forEach(a => {
        achievementsPoints[a.id] = a.points
    })

    return achievementsPoints
}
