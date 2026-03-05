export default function App() {
  return (
    // Light cream background for a cozy, relaxing vibe
    <div className="min-h-screen bg-[#FFF9F0] flex flex-col items-center justify-center p-6 font-sans">
      
      {/* Game Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#795B46] mb-3 tracking-tight">
          ✈️ Villager Hunting Bingo 🏝️
        </h1>
        <p className="text-[#A2846E] text-lg font-medium">
          Ready your Nook Miles Tickets!
        </p>
      </div>

      {/* Bingo Board Container */}
      <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border-4 border-[#F4E3D3] w-full max-w-3xl">
        
        {/* Placeholder for the 5x5 Grid */}
        <div className="h-80 border-4 border-dashed border-[#F4E3D3] rounded-2xl flex items-center justify-center bg-[#FCF8F4]">
          <p className="text-[#CBAF9B] font-bold text-xl">
            Bingo Grid 5x5 is coming here...
          </p>
        </div>

      </div>
      
    </div>
  )
}