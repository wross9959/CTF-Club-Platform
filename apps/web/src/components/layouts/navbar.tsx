import Link from "next/link";
import PageContainer from "./page-container";

type NavbarProps = {
  platformName?: string;
};

export default function Navbar({
  platformName = "CTF Club Platform",
}: NavbarProps) {
  return (
    <header className="border-b border-white/10 bg-(--background)">
      <PageContainer>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-lg font-bold tracking-tight text-(--primary)">
            {platformName}
          </Link>

          <nav className="flex items-center gap-6 text-sm text-(--foreground)">
            <Link href="/" className="transition-opacity hover:opacity-80">
              Home
            </Link>
            <Link href="/challenges" className="transition-opacity hover:opacity-80">
              Challenges
            </Link>
            <Link href="/scoreboard" className="transition-opacity hover:opacity-80">
              Scoreboard
            </Link>
            <Link href="/login" className="transition-opacity hover:opacity-80">
              Login
            </Link>
          </nav>
        </div>
      </PageContainer>
    </header>
  );
}