import Navbar from "@/components/layouts/navbar";
import PageContainer from "@/components/layouts/page-container";
import PageHeader from "@/components/layouts/page-header";
import ChallengeCard from "@/components/challenges/challenge-card";
import { getChallenges } from "@/lib/api/challenges";

export default async function ChallengesPage() {
  const challenges = await getChallenges();

  return (
    <main className="min-h-screen bg-(--background) text-(--foreground)">
      <Navbar platformName="COTW" />

      <PageContainer>
        <PageHeader
          title="Challenges"
          description="Browse active and upcoming challenges across categories."
        />

        <div className="grid gap-6 pb-12 md:grid-cols-2 xl:grid-cols-3">
          {challenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      </PageContainer>
    </main>
  );
}