export default function WowheadLink(props: { achievementId: string }) {
    return <a href={`https://www.wowhead.com/wotlk/achievement=${props.achievementId}`} target='_blank'/>
}
