import AchievementCategories from '../lib/achievement-categories.json'
import { useState } from 'react'
import { AchievementCategory } from '../lib/achievement-categories'

import styles from '/styles/Selector.module.css'
import clsx from 'clsx'

const parentCategories = AchievementCategories
    .filter(category => !(category.parentId > 0))


const childCategories: { [id: number]: AchievementCategory[] } = {}

parentCategories.forEach(parent => childCategories[parent.id] = [])

AchievementCategories.forEach(category => {
    const { parentId } = category
    if (parentId > 0) {
        childCategories[parentId].push(category)
    }
})

interface AchievementCategorySelectorProps {
    onCategorySelected: (category: AchievementCategory | null) => void
}

export default function AchievementCategorySelector(props: AchievementCategorySelectorProps) {

    const { onCategorySelected } = props
    const [selectedCategory, setSelectedCategory] = useState<AchievementCategory | null>(null)

    const selectCategory = (category: AchievementCategory) => {
        if (selectedCategory === category) {
            setSelectedCategory(null)
            onCategorySelected(null)
        } else {
            setSelectedCategory(category)
            onCategorySelected(category)
        }
    }

    if (selectedCategory) {
        console.log(childCategories[selectedCategory.id])
    }

    return <>
        {
            parentCategories.map(category => {
                return <div key={category.id} className={styles.selector}>
                    <div
                        onClick={() => selectCategory(category)}
                        className={clsx(
                            styles.main,
                            styles.category,
                            selectedCategory?.id === category.id && styles.selected,
                        )}
                    >
                        {category.name}
                    </div>
                    {
                        (
                            selectedCategory?.id === category.id
                            || selectedCategory?.parentId === category.id
                        )
                        && <div>
                            {childCategories[category.id].map(child =>
                                <div
                                    key={child.id}
                                    className={clsx(
                                        styles.child,
                                        styles.category,
                                        selectedCategory?.id === child.id && styles.selected,
                                    )}
                                    onClick={() => selectCategory(child)}
                                >
                                    {child.name}
                                </div>)}
                        </div>
                    }
                </div>
            })
        }
    </>
}
