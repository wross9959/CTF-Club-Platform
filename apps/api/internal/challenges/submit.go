package challenges

type SubmitFlagRequest struct {
	Flag string `json:"flag"`
}

type SubmitFlagResponse struct {
	Correct bool   `json:"correct"`
	Message string `json:"message"`
}