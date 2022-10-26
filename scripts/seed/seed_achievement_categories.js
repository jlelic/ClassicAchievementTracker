const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const data = DATA.map(c => ({
    ...c,
    parentId: c.parentId < 0 ? null : c.parentId
})).sort((a,b) => {
    if(!a.parentId) {
        return -1
    }
    if(!b.parentId) {
        return 1
    }
    const parentDiff =  a.parentId - b.parentId
    if(!parentDiff) {
        return a.id - b.id
    }
    return parentDiff
})

async function main() {
    const createMany = await prisma.achievementCategory.createMany({
        data
    })
    console.log(createMany)
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
