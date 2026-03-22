import type { CSSProperties } from "react";
import Hero from "@/components/branding/hero";
import FeatureGrid from "@/components/branding/feature-grid";
import Navbar from "@/components/layouts/navbar";
import PageContainer from "@/components/layouts/page-container";
import StatusCard from "@/components/layouts/status-card";
import { getHealth, getPublicConfig } from "@/lib/api/platform";

export default async function HomePage() {
  const [health, config] = await Promise.all([getHealth(), getPublicConfig()]);

  const platformName = config?.platform.name ?? "CTF Club Platform";
  const shortName = config?.platform.short_name ?? "CTF";
  const supportEmail = config?.platform.support_email ?? "Unavailable";
  const timezone = config?.platform.timezone ?? "Unavailable";
  const heroTitle = config?.branding.hero_title ?? "Challenge Platform";
  const heroSubtitle =
    config?.branding.hero_subtitle ?? "Practice, learn, compete.";
  const backendStatus = health?.status ?? "offline";

  const bg = config?.branding.background_color ?? "#f5f5f4";
  const fg = config?.branding.foreground_color ?? "#09090b";
  const primary = config?.branding.primary_color ?? "#0f172a";
  const accent = config?.branding.accent_color ?? "#22c55e";

  return (
    <div
      style={
        {
          "--background": bg,
          "--foreground": fg,
          "--primary": primary,
          "--accent": accent,
        } as CSSProperties
      }
    >
      <main className="min-h-screen bg-(--background) text-(--foreground)">
        <Navbar platformName={platformName} />
        <PageContainer>
          <Hero title={heroTitle} subtitle={heroSubtitle} />
          <FeatureGrid />
          <StatusCard
            platformName={platformName}
            shortName={shortName}
            supportEmail={supportEmail}
            timezone={timezone}
            backendStatus={backendStatus}
          />
        </PageContainer>
      </main>
    </div>
  );
}