import { redirect } from "next/navigation";
import { getActiveChild, getStarBalance } from "@/lib/child/queries";
import { InstallHint } from "@/components/install-hint";
import { HomeCarousel } from "./carousel";

export default async function HomePage() {
  const child = await getActiveChild();

  if (!child) {
    redirect("/onboarding/assessment");
  }

  const gamesEnabled = (child.games_enabled as Record<string, boolean>) ?? {
    memory_match: true,
    sorting: true,
    visual_search: true,
    corsi_block: true,
  };

  const starBalance = await getStarBalance(child.id);

  return (
    <>
      <HomeCarousel
        childName={child.display_name}
        gamesEnabled={gamesEnabled}
        starBalance={starBalance}
      />
      <InstallHint />
    </>
  );
}
