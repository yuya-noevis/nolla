import { notFound, redirect } from "next/navigation";
import { BUILDINGS } from "@/lib/buildings";
import { getActiveChild } from "@/lib/child/queries";
import { getInitialDifficulty } from "@/lib/staircase";
import type { GameType } from "@/types/domain";
import type { IQBand } from "@/types/user";
import { GameSession } from "./game-session";

type Props = {
  params: Promise<{ gameType: string }>;
};

const VALID_GAME_TYPES: ReadonlyArray<GameType> = [
  "memory-match",
  "sorting",
  "visual-search",
  "corsi-block",
];

export default async function GamePage({ params }: Props) {
  const { gameType } = await params;

  if (!VALID_GAME_TYPES.includes(gameType as GameType)) {
    notFound();
  }

  const building = BUILDINGS.find((b) => b.gameType === gameType);
  if (!building) notFound();

  const child = await getActiveChild();
  if (!child) redirect("/onboarding");

  const typedGameType = gameType as GameType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const initialParams = getInitialDifficulty(typedGameType as any);

  return (
    <GameSession
      gameType={typedGameType}
      skyGradient={building.skyGradient}
      groundColor={building.groundColor}
      childId={child.id}
      iqBand={(child.iq_band ?? "B2") as IQBand}
      initialParams={initialParams}
      previousMotorBaseline={null}
    />
  );
}
