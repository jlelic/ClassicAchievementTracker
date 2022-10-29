import { Character } from "@prisma/client"


export const serializeCharacter = (character: Partial<Character>) => {
    return {
        ...character,
        lastUpdate: character.lastUpdate?.toISOString()
    }
}

export const serializeCharacters = (characters: Partial<Character>[]) => {
    return characters.map(serializeCharacter)
}
