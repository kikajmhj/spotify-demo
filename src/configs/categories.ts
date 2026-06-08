export interface Category {
    id: string;
    name: string;
    color: string;
    icon: string;
}

export const CATEGORIES: Category[]= [

  { id: "pop",      name: "Pop",              color: "hsl(280, 60%, 45%)", icon: "🎤" },
  { id: "k-pop",    name: "K-pop",            color: "hsl(170, 55%, 45%)", icon: "🎧" },
  { id: "hip-hop",  name: "Hip-Hop",          color: "hsl(50, 70%, 50%)",  icon: "🎵" },
  { id: "rock",     name: "Rock",             color: "hsl(0, 60%, 50%)",   icon: "🎸" },
  { id: "r-n-b",    name: "R&B",              color: "hsl(330, 60%, 50%)", icon: "🎶" },
  { id: "indie",    name: "Indie",            color: "hsl(25, 60%, 50%)",  icon: "🎹" },
  { id: "jazz",     name: "Jazz",             color: "hsl(210, 55%, 45%)", icon: "🎷" },
  { id: "classical",name: "Classical",        color: "hsl(140, 40%, 45%)", icon: "🎻" },
  { id: "latin",    name: "Latin",            color: "hsl(15, 70%, 50%)",  icon: "💃" },
  { id: "chill",    name: "Chill",            color: "hsl(195, 55%, 45%)", icon: "🌙" },
  { id: "workout",  name: "Workout",          color: "hsl(95, 50%, 45%)",  icon: "💪" },
  { id: "vietnam",  name: "Vietnamese Music", color: "hsl(300, 65%, 50%)", icon: "🪕" },



];







