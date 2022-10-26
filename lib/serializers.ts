import { Character, PlayerAchievement } from "@prisma/client"


export const serializeCharacter = (character: Character) => {
    return {
        ...character,
        lastUpdate: character.lastUpdate?.toISOString()
    }
}

export const serializeCharacters = (characters: Character[]) => {
    return characters.map(serializeCharacter)
}

export const serializePlayerAchievement = (playerAchievement: Partial<PlayerAchievement>) => {
    return {
        ...playerAchievement,
        date: playerAchievement.date?.toISOString()
    }
}

export const serializePlayerAchievements = (playerAchievements: Partial<PlayerAchievement>[]) => {
    return playerAchievements.map(serializePlayerAchievement)
}
