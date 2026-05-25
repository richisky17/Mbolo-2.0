"use client";

export function GamesButton() {
  const handleClick = () => {
    alert("🚧 En desarrollo. ¡Pronto estará disponible! 🚧");
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center whitespace-nowrap rounded-xl text-sm font-bold tracking-wide uppercase ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-gray-100 transition px-4 py-2 h-[52px] justify-start w-full"
    >
      <img
        src="/games.svg"
        alt="Juegos"
        className="mr-5 md:mr-3 lg:mr-5 w-8 h-8"
      />
      Juegos 🔒
    </button>
  );
}