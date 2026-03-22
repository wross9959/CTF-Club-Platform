import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Challenge } from "@/types/challenge";
import { difficultyLabel } from "@/lib/utils/challenge-utils";

type ChallengeCardProps = {
  challenge: Challenge;
};

export default function ChallengeCard({ challenge }: ChallengeCardProps) {
  return (
    <Card className="border-white/10 bg-white/60 shadow-sm backdrop-blur-sm">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-lg text-(--primary)">
            {challenge.title}
          </CardTitle>

          <Badge variant={challenge.is_active ? "default" : "secondary"}>
            {challenge.is_active ? "Active" : "Locked"}
          </Badge>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="capitalize">
            {challenge.category}
          </Badge>
          <Badge variant="outline">
            {difficultyLabel(challenge.difficulty)}
          </Badge>
          <Badge variant="outline">{challenge.points} pts</Badge>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm leading-6 text-zinc-600">
          {challenge.description}
        </p>
      </CardContent>

      <CardFooter>
        <Button asChild className="bg-(--accent) text-white hover:opacity-90">
          <Link href={`/challenges/${challenge.slug}`}>View Challenge</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}