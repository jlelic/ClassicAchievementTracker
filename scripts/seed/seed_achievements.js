const { PrismaClient } = require('@prisma/client')
const rawAchievements = require('./achievements_raw.json')
const allianceList = require('./alliance_achievements_ids.json')
const hordeList = require('./horde_achievements_ids.json')

const allianceSet = new Set(allianceList)
const hordeSet = new Set(hordeList)

const prisma = new PrismaClient()

const achievementOrder = a => {
    if (a.next && a.id > a.next) {
        return a.next - 1
    }
    return a.id
}

const characterAchievements = []

const aMap = {}
const processed = {}

rawAchievements
    .filter(a => (a.flags & 1) !== 1)
    .forEach(a => aMap[a.id] = a)

const achievements = []

Object.keys(aMap).forEach(id => {
    if (processed[id]) {
        return
    }
    let a = aMap[id]
    processed[id] = true
    const stack = []
    while(true) {
        if (!a.next || processed[a.next]) {
            stack.push(a)
            processed[a.id] = true
            while (stack.length) {
                let x = stack.pop()
                // console.log(x.name)
                achievements.push(x)
            }
            break
        }
        stack.push(a)
        processed[a.id] = true
        a = aMap[a.next]
    }
})

// console.log(Object.keys(processed).length)
// console.log(achievements.length)
// console.log('hmmm')

async function main() {
    console.time('Achievements seed')
    for (let i = 0; i < achievements.length; i++) {
        const a = achievements[i]
        const data = {
            id: a.id,
            categoryId: a.categoryId,
            name: a.name,
            description: a.description,
            points: a.points,
            reward: a.reward,
            nextId: a.next,
            icon: a.icon.toString(),
            hidden: false,
            isAlliance: !hordeSet.has(a.id),
            isHorde: !allianceSet.has(a.id)
        }
        console.log(data)
        const create = await prisma.achievement.upsert({
            where: {
                id: a.id
            },
            update: data,
            create: data
        })
        console.log(`Added ${i + 1}/${achievements.length}`)
    }
    console.timeEnd('Achievements seed')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
