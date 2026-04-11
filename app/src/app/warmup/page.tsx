import { redirect } from "next/navigation";
import { getActiveChild } from "@/lib/child/queries";
import { WarmupClient } from "./warmup-client";

export default async function WarmupPage() {
  const child = await getActiveChild();

  if (!child) {
    redirect("/onboarding/assessment");
  }

  return <WarmupClient />;
}
