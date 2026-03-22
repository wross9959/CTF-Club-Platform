export type HealthResponse = {
    status: string;
};

export type PublicPlatformConfig = {
    platform: {
        name: string;
        short_name: string;
        support_email: string;
        timezone: string;
    };
    branding: {
        hero_title: string;
        hero_subtitle: string;
        logo_url: string;
        primary_color: string;
        accent_color: string;
        background_color?: string;
        foreground_color?: string;
    };
};