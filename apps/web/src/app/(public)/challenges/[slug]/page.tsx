import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layouts/navbar";
import PageContainer from "@/components/layouts/page-container";
import { getChallengeBySlug } from "@/lib/api/challenges";
import FlagSubmitForm from "@/components/challenges/flag-submit-form";
import { getMe } from "@/lib/api/auth";

type ChallengeDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ChallengeDetailPage({
  params,
}: ChallengeDetailPageProps) {
  const { slug } = await params;
  const [challenge, user] = await Promise.all([ getChallengeBySlug(slug), getMe()]);
  if (!challenge) {
    notFound();
  }
  if (!user) {
    return (
      <div className="rounded-2xl border border-white/10 bg-black/10 p-6">
        <h2 className="text-lg font-semibold text-primary">Submit Flag</h2>
        <p className="mt-2 text-sm text-foreground">
          You must be logged in to submit a flag.
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar platformName="COTW" />

      <PageContainer>
        <div className="py-10">
          <Link
            href="/challenges"
            className="text-sm font-medium text-accent hover:opacity-80"
          >
            ← Back to challenges
          </Link>

          <div className="mt-6 rounded-2xl border border-white/10 bg-black/10 p-8 shadow-sm backdrop-blur-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-wide text-accent">
                  {challenge.category}
                </p>
                <h1 className="mt-2 text-4xl font-bold tracking-tight text-primary">
                  {challenge.title}
                </h1>
                <p className="mt-2 text-sm text-foreground">
                  Difficulty: {challenge.difficulty} · {challenge.points} pts
                </p>
              </div>

              <div className="rounded-full border border-white/10 px-4 py-2 text-sm">
                {challenge.is_active ? "Active" : "Locked"}
              </div>
            </div>

            <div className="mt-8 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-primary">Description</h2>
                <p className="mt-3 whitespace-pre-line text-sm leading-7 text-foreground">
                  {challenge.description}
                </p>
              </div>

              {challenge.author ? (
                <div>
                  <h2 className="text-lg font-semibold text-primary">Author</h2>
                  <p className="mt-2 text-sm text-foreground">{challenge.author}</p>
                </div>
              ) : null}

              {(challenge.file_url || challenge.external_url) ? (
                <div>
                  <h2 className="text-lg font-semibold text-primary">Resources</h2>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {challenge.file_url ? (
                      <a
                        href={challenge.file_url}
                        className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:opacity-90"
                      >
                        Download File
                      </a>
                    ) : null}

                    {challenge.external_url ? (
                      <a
                        href={challenge.external_url}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg border border-white/10 px-4 py-2 text-sm font-medium hover:bg-black/5"
                      >
                        Open External Link
                      </a>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="mt-8">
          <FlagSubmitForm slug={challenge.slug} isActive={challenge.is_active} user={user} />
        </div>
      </PageContainer>
    </main>
  );
}