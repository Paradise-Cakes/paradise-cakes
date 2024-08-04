resource "aws_acm_certificate" "paradise_cakes" {
  domain_name       = var.environment == "prod" ? "paradisecakesbymegan.com" : "dev.paradisecakesbymegan.com"
  validation_method = "DNS"
}

resource "aws_acm_certificate_validation" "paradise_cakes" {
  certificate_arn         = aws_acm_certificate.paradise_cakes.arn
  validation_record_fqdns = [for record in aws_route53_record.paradise_cakes : record.fqdn]
  depends_on              = [aws_iam_role.cross_account_access_dev]
}
