resource "aws_route53_zone" "paradise_cakes" {
  count = var.environment == "prod" ? 1 : 0
  name  = "paradisecakesbymegan.com"
}

resource "aws_route53_record" "paradise_cakes" {
  count   = var.environment == "prod" ? 1 : 0
  zone_id = aws_route53_zone.paradise_cakes[0].zone_id
  name    = "paradisecakesbymegan.com"
  type    = "A"
  alias {
    name                   = aws_cloudfront_distribution.pc_cloud_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.pc_cloud_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "paradise_cakes_dev" {
  count   = var.environment == "prod" ? 0 : 1
  zone_id = aws_route53_zone.paradise_cakes[0].zone_id
  name    = "dev.paradisecakesbymegan.com"
  type    = "A"
  alias {
    name                   = aws_cloudfront_distribution.pc_cloud_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.pc_cloud_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}
