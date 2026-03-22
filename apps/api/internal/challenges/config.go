package challenges

type ChallengeSeedFile struct {
	Challenges []ChallengeSeed `yaml:"challenges"`
}

type ChallengeSeed struct {
	Title       string `yaml:"title"`
	Slug        string `yaml:"slug"`
	Description string `yaml:"description"`
	Category    string `yaml:"category"`
	Difficulty  string `yaml:"difficulty"`
	Points      int    `yaml:"points"`
	IsActive    bool   `yaml:"is_active"`
	Author      string `yaml:"author"`
	FileURL     string `yaml:"file_url"`
	ExternalURL string `yaml:"external_url"`
}