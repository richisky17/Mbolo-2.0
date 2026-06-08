import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="h-full py-20">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 text-emerald-500 animate-spin" />

        <div className="flex flex-col items-center gap-1">
          <h3 className="font-semibold text-xl text-white">Cargando cursos...</h3>
          <p className="text-gray-400 text-sm">Esto no tomará mucho tiempo.</p>
        </div>
      </div>
    </div>
  );
};

export default Loading;