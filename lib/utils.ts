import { number } from 'prop-types'

const today = Math.floor((new Date() as any - (new Date('2022-08-31') as any))/(1000*3600*24))

export const getDaysAgoString = (date: number): string => {
    if(!date) {
        return 'before WotLK prepatch'
    }
    const ago = today - date
    if(!ago) {
        return 'today'
    }
    if(ago === 1) {
        return 'yesterday'
    }
    return `${ago} days ago`
}

export const numToDateString = (date: number): string => {
    if(!date) {
        return 'Pre-WotLK'
    }
    if (date <= 30) {
        return `${date}/09/22`
    }
    if (date <= 61) {
        return `${date - 30}/10/22`
    }
    if (date <= 91) {
        return `${date - 61}/10/22`
    }
    if (date <= 122) {
        return `${date - 91}/10/22`
    }
    throw 'Implement other years you lazy bastard'
}
