const wowheadData = require('./seed_achievements')
const addonData = require('./achievements_raw.json')


console.log(addonData.length)
console.log(wowheadData.length)

const diff = addonData
    .filter(a => ((a.flags & 1) !== 1) )
    .filter(a => !wowheadData.some(w => {
    //console.log('Comparing', w.id, a.id)
    return w.id === a.id
}))

diff.forEach(a => console.log(a.name, a.flags))
console.log(diff.length)
