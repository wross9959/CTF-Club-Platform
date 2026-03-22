package config

import (
	"os"

	"gopkg.in/yaml.v3"
)

type Config struct {
	Platform struct {
		Name		 	string `yaml:"name"`
		ShortName   	string `yaml:"short_name"`
		SiteURL	 		string `yaml:"site_url"`
		SupportEmail 	string `yaml:"support_email"`
		Timezone    	string `yaml:"timezone"`
	} `yaml:"platform"`

	Branding struct {
		HeroTitle  		string `yaml:"hero_title"`
		HeroSubtitle 	string `yaml:"hero_subtitle"`
		LogoURL    		string `yaml:"logo_url"`
		PrimaryColor 	string `yaml:"primary_color"`
		AccentColor 	string `yaml:"accent_color"`
		BackgroundColor	string `yaml:"background_color"`
		ForegroundColor string `yaml:"foreground_color"`
	} `yaml:"branding"`

	Database struct {
		URL 			string `yaml:"url"`
	} `yaml:"database"`
}

func Load(path string) (*Config, error) {
	data, err := os.ReadFile(path)

	if err != nil { return nil, err }

	var cfg Config
	if err := yaml.Unmarshal(data, &cfg); err != nil { return nil, err }

	return &cfg, nil
}