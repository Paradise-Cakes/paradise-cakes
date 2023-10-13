resource "aws_acm_certificate" "paradise_cakes" {
  domain_name       = "paradisecakesbymegan.com"
  validation_method = "DNS"
}

resource "aws_acm_certificate_validation" "paradise_cakes" {
  certificate_arn = aws_acm_certificate.paradise_cakes.arn
}
