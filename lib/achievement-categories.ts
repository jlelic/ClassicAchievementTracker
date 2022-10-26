import AchievementCategoriesJSON from './achievement-categories.json'

export type AchievementCategory = {
    id: number;
    parentId: number;
    name: string;
}

export type Achievement = {
    id: number;

}

export const AchievementCategories = AchievementCategoriesJSON

const idMap: {[id: number]: AchievementCategory} = {}

AchievementCategories.forEach(a => idMap[a.id] = a)

export const AchievementCategoriesById = idMap
