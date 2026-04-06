"use client";

type Props = {
  hintActive?: boolean;
};

export function NaviCharacter({ hintActive = false }: Props) {
  return (
    <div
      className={`absolute bottom-4 right-4 transition-transform duration-300 ${
        hintActive ? "scale-125" : "scale-100"
      }`}
    >
      <div className="navi-bubble w-14 h-14 flex items-center justify-center">
        {/* Placeholder character — CSS circle with face */}
        <div className="w-10 h-10 rounded-full bg-nolla-accent flex items-center justify-center">
          <div className="flex gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
