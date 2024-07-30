resource "aws_acm_certificate" "paradise_cakes" {
  count             = var.environment == "prod" ? 1 : 0
  domain_name       = "paradisecakesbymegan.com"
  validation_method = "DNS"
}

resource "aws_acm_certificate" "paradise_cakes_dev" {
  count             = var.environment == "prod" ? 0 : 1
  domain_name       = "dev.paradisecakesbymegan.com"
  validation_method = "DNS"
}

resource "aws_acm_certificate_validation" "paradise_cakes" {
  count           = var.environment == "prod" ? 1 : 0
  certificate_arn = aws_acm_certificate.paradise_cakes[0].arn
}

resource "aws_acm_certificate_validation" "paradise_cakes_dev" {
  count           = var.environment == "prod" ? 0 : 1
  certificate_arn = aws_acm_certificate.paradise_cakes_dev[0].arn
}
