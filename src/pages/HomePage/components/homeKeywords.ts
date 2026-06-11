
const KEYWORDS = [
    "k-pop", "pop", "hip hop", "rock", "r&b",
    "indie", "jazz", "dance", "ballad", "city pop"
];


export const pickRandomKeyword = () =>
    KEYWORDS[Math.floor(Math.random() * KEYWORDS.length)]


export default KEYWORDS;



