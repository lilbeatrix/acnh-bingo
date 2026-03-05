import { useState, useEffect } from 'react'

type Villager = {
  id: string
  name: string
  image: string
}

// Mock Villager Pool (30 Popular Villagers)
const VILLAGER_POOL: Villager[] = [
  { id: '1', name: 'Marshal', image: 'https://ui-avatars.com/api/?name=Marshal&background=E8E3DF&color=635952&bold=true' },
  { id: '2', name: 'Raymond', image: 'https://ui-avatars.com/api/?name=Raymond&background=D1D5DB&color=374151&bold=true' },
  { id: '3', name: 'Judy', image: 'https://ui-avatars.com/api/?name=Judy&background=FBCFE8&color=831843&bold=true' },
  { id: '4', name: 'Sherb', image: 'https://ui-avatars.com/api/?name=Sherb&background=BAE6FD&color=0C4A6E&bold=true' },
  { id: '5', name: 'Shino', image: 'https://ui-avatars.com/api/?name=Shino&background=FECACA&color=7F1D1D&bold=true' },
  { id: '6', name: 'Sasha', image: 'https://ui-avatars.com/api/?name=Sasha&background=A7F3D0&color=064E3B&bold=true' },
  { id: '7', name: 'Ankha', image: 'https://ui-avatars.com/api/?name=Ankha&background=FDE047&color=713F12&bold=true' },
  { id: '8', name: 'Zucker', image: 'https://ui-avatars.com/api/?name=Zucker&background=FED7AA&color=7C2D12&bold=true' },
  { id: '9', name: 'Marina', image: 'https://ui-avatars.com/api/?name=Marina&background=F9A8D4&color=831843&bold=true' },
  { id: '10', name: 'Bob', image: 'https://ui-avatars.com/api/?name=Bob&background=DDD6FE&color=4C1D95&bold=true' },
  { id: '11', name: 'Stitches', image: 'https://ui-avatars.com/api/?name=Stitches&background=FDBA74&color=7C2D12&bold=true' },
  { id: '12', name: 'Diana', image: 'https://ui-avatars.com/api/?name=Diana&background=E9D5FF&color=4C1D95&bold=true' },
  { id: '13', name: 'Beau', image: 'https://ui-avatars.com/api/?name=Beau&background=FDBA74&color=7C2D12&bold=true' },
  { id: '14', name: 'Lolly', image: 'https://ui-avatars.com/api/?name=Lolly&background=D1D5DB&color=374151&bold=true' },
  { id: '15', name: 'Maple', image: 'https://ui-avatars.com/api/?name=Maple&background=FDE047&color=713F12&bold=true' },
  { id: '16', name: 'Merengue', image: 'https://ui-avatars.com/api/?name=Merengue&background=FECACA&color=7F1D1D&bold=true' },
  { id: '17', name: 'Fauna', image: 'https://ui-avatars.com/api/?name=Fauna&background=FED7AA&color=7C2D12&bold=true' },
  { id: '18', name: 'Rosie', image: 'https://ui-avatars.com/api/?name=Rosie&background=DDD6FE&color=4C1D95&bold=true' },
  { id: '19', name: 'Cherry', image: 'https://ui-avatars.com/api/?name=Cherry&background=FECACA&color=7F1D1D&bold=true' },
  { id: '20', name: 'Apollo', image: 'https://ui-avatars.com/api/?name=Apollo&background=E5E7EB&color=1F2937&bold=true' },
  { id: '21', name: 'Molly', image: 'https://ui-avatars.com/api/?name=Molly&background=FEF08A&color=713F12&bold=true' },
  { id: '22', name: 'Lily', image: 'https://ui-avatars.com/api/?name=Lily&background=A7F3D0&color=064E3B&bold=true' },
  { id: '23', name: 'Dom', image: 'https://ui-avatars.com/api/?name=Dom&background=FECACA&color=7F1D1D&bold=true' },
  { id: '24', name: 'Audie', image: 'https://ui-avatars.com/api/?name=Audie&background=FDBA74&color=7C2D12&bold=true' },
  { id: '25', name: 'Whitney', image: 'https://ui-avatars.com/api/?name=Whitney&background=E0E7FF&color=312E81&bold=true' },
  { id: '26', name: 'Fang', image: 'https://ui-avatars.com/api/?name=Fang&background=D1D5DB&color=374151&bold=true' },
  { id: '27', name: 'Ketchup', image: 'https://ui-avatars.com/api/?name=Ketchup&background=FCA5A5&color=7F1D1D&bold=true' },
  { id: '28', name: 'Poppy', image: 'https://ui-avatars.com/api/?name=Poppy&background=FCA5A5&color=7F1D1D&bold=true' },
  { id: '29', name: 'Punchy', image: 'https://ui-avatars.com/api/?name=Punchy&background=E5E7EB&color=1F2937&bold=true' },
  { id: '30', name: 'Roald', image: 'https://ui-avatars.com/api/?name=Roald&background=BFDBFE&color=1E3A8A&bold=true' },
]

// Reusable BingoBoard Component
function BingoBoard({ boardName }: { boardName: string }) {
  // State Management
  const [board, setBoard] = useState<Villager[]>([])
  const [stampedCells, setStampedCells] = useState<number[]>([]) // Store index of stamped cells

  // Generate a random Bingo board
  const generateBoard = () => {
    // Shuffle the pool and pick the first 24 villagers
    const shuffled = [...VILLAGER_POOL].sort(() => 0.5 - Math.random())
    const selected = shuffled.slice(0, 24)

    // Insert "Free Space" at index 12
    const freeSpace: Villager = { id: 'free', name: 'FREE SPACE', image: 'https://ui-avatars.com/api/?name=✈️&background=795B46&color=fff' }
    selected.splice(12, 0, freeSpace)

    setBoard(selected)
    setStampedCells([12]) // Auto-stamp the free space!
  }

  // Generate the board on first load
  useEffect(() => {
    generateBoard()
  }, [])

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
      <div className="grid grid-cols-5 gap-1 md:gap-2">
        {board.map((villager, index) => {
          const isStamped = stampedCells.includes(index)

          return (
            <button
              key={`${villager.id}-${index}`}
              onClick={() => toggleStamp(index)}
              className={`relative flex flex-col items-center justify-center p-0.5 md:p-2 rounded-lg md:rounded-xl border-2 transition-all duration-300 aspect-square ${
                isStamped 
                  ? 'bg-[#E8F3E8] border-[#A3C9A8] transform scale-95 shadow-inner' 
                  : 'bg-white border-[#F0E6DD] hover:border-[#D5C2B3] hover:shadow-md'
              }`}
            >
              {/* Villager Image */}
              <div className={`w-full max-w-[35px] md:max-w-[48px] aspect-square rounded-full overflow-hidden mb-0.5 md:mb-1 transition-opacity ${isStamped && index !== 12 ? 'opacity-40' : 'opacity-100'}`}>
                <img src={villager.image} alt={villager.name} className="w-full h-full object-cover" />
              </div>

              {/* Villager Name */}
              <span className={`text-[7px] md:text-[10px] font-bold text-center leading-[1.1] w-full break-words ${isStamped ? 'text-[#7B9E80]' : 'text-[#8A7160]'}`}>
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
  return (
    // Light cream background
    <div className="min-h-screen bg-[#FFF9F0] flex flex-col items-center py-8 px-4 font-sans">
      
      {/* Game Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#795B46] mb-3 tracking-tight">
          ✈️ Villager Hunting Bingo 🏝️
        </h1>
        <p className="text-[#A2846E] text-lg font-medium">
          Ready your Nook Miles Tickets!
        </p>
      </div>

      {/* Bingo Cards Container (2 Cards for local player) */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        <BingoBoard boardName="Card 1" />
        <BingoBoard boardName="Card 2" />
      </div>

    </div>
  )
}