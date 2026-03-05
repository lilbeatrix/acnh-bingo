import { useState, useEffect } from 'react'

type Villager = {
  id: string
  name: string
  image: string
}

// Reusable BingoBoard Component
function BingoBoard({ boardName, allVillagers }: { boardName: string, allVillagers: Villager[] }) {
  // State Management
  const [board, setBoard] = useState<Villager[]>([])
  const [stampedCells, setStampedCells] = useState<number[]>([]) // Store index of stamped cells

  // Generate a random Bingo board
  const generateBoard = () => {
    // Ensure we have enough data from API before shuffling
    if (allVillagers.length < 24) return

    // Shuffle the pool and pick the first 24 villagers
    const shuffled = [...allVillagers].sort(() => 0.5 - Math.random())
    const selected = shuffled.slice(0, 24)

    // Insert "Free Space" at index 12
    const freeSpace: Villager = { id: 'free', name: 'FREE SPACE', image: 'https://ui-avatars.com/api/?name=✈️&background=795B46&color=fff' }
    selected.splice(12, 0, freeSpace)

    setBoard(selected)
    setStampedCells([12]) // Auto-stamp the free space!
  }

  // Generate the board when villagers data is loaded
  useEffect(() => {
    if (allVillagers.length > 0) {
      generateBoard()
    }
  }, [allVillagers])

  // Toggle stamp logic
  const toggleStamp = (index: number) => {
    if (index === 12) return // Cannot un-stamp the free space

    setStampedCells((prev) => 
      prev.includes(index) 
        ? prev.filter((i) => i !== index) // Remove stamp
        : [...prev, index] // Add stamp
    )
  }

  return (
    // Responsive container
    <div className="bg-white p-2 md:p-6 rounded-[1.5rem] md:rounded-[2rem] shadow-sm border-4 border-[#F4E3D3] w-full max-w-sm mx-auto">
      
      {/* Board Header */}
      <div className="flex justify-between items-center mb-3 md:mb-4 px-1">
        <h2 className="text-lg md:text-xl font-bold text-[#8A7160]">{boardName}</h2>
        <button 
          onClick={generateBoard}
          className="px-3 py-1 bg-[#F4E3D3] text-[#795B46] text-[10px] md:text-xs font-bold rounded-full shadow-sm hover:bg-[#EBD5C1] transition-colors active:scale-95"
        >
          Reroll
        </button>
      </div>

      {/* The 5x5 Grid */}
      <div className="grid grid-cols-5 gap-1 md:gap-2 auto-rows-fr">
        {board.map((villager, index) => {
          const isStamped = stampedCells.includes(index)

          return (
            <button
              key={`${villager.id}-${index}`}
              onClick={() => toggleStamp(index)}
              // Forced aspect-square and w-full to ensure identical sizing
              className={`relative flex flex-col items-center justify-center p-0.5 md:p-1 rounded-lg md:rounded-xl border-2 transition-all duration-300 w-full aspect-square overflow-hidden ${
                isStamped 
                  ? 'bg-[#E8F3E8] border-[#A3C9A8] transform scale-95 shadow-inner' 
                  : 'bg-white border-[#F0E6DD] hover:border-[#D5C2B3] hover:shadow-md'
              }`}
            >
              {/* Villager Image */}
              <div className={`w-[75%] aspect-square rounded-full overflow-hidden mb-0.5 md:mb-1 transition-opacity bg-[#FFF9F0] border border-[#F4E3D3]/50 ${isStamped && index !== 12 ? 'opacity-40' : 'opacity-100'}`}>
                <img src={villager.image} alt={villager.name} className="w-full h-full object-cover" />
              </div>

              {/* Villager Name */}
              <span className={`text-[7px] md:text-[9px] font-bold text-center leading-tight w-full truncate px-0.5 ${isStamped ? 'text-[#7B9E80]' : 'text-[#8A7160]'}`}>
                {villager.name}
              </span>

              {/* Stamp Mark */}
              {isStamped && index !== 12 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-xl md:text-4xl text-red-500 opacity-80 transform rotate-12 drop-shadow-md">
                    🐾
                  </span>
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function App() {
  const [allVillagers, setAllVillagers] = useState<Villager[]>([])
  const [loading, setLoading] = useState(true)

  // Fetching villagers
  useEffect(() => {
    const fetchVillagers = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/alexislours/ACNHAPI/master/villagers.json')
        const data = await response.json()
        
        const villagerArray = Object.values(data).map((v: any) => ({
          id: v['file-name'],
          name: v['name']['name-USen'],
          image: `https://raw.githubusercontent.com/alexislours/ACNHAPI/master/icons/villagers/${v['file-name']}.png`
        }))

        setAllVillagers(villagerArray)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching villagers:", error)
        setLoading(false)
      }
    }

    fetchVillagers()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-sky-100 flex items-center justify-center">
        <p className="text-[#795B46] font-bold text-xl animate-bounce">🏝️ Fetching 400+ Villagers...</p>
      </div>
    )
  }

  return (
    // Background
    <div className="min-h-screen bg-sky-100 flex flex-col items-center py-8 px-4 font-sans text-[#795B46]">
      
      {/* Game Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight">
          ✈️ Villager Hunting Bingo 🏝️
        </h1>
        <p className="text-[#A2846E] text-lg font-medium">
          Ready your Nook Miles Tickets!
        </p>
      </div>

      {/* Bingo Cards Container (2 Cards) */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        <BingoBoard boardName="Card 1" allVillagers={allVillagers} />
        <BingoBoard boardName="Card 2" allVillagers={allVillagers} />
      </div>

    </div>
  )
}