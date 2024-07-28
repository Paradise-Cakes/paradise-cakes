data "aws_route53_zone" "zone" {
  name         = var.environment == "prod" ? "paradisecakesbymegan.com" : "paradisecakesbymegan.dev"
  private_zone = false
}

resource "aws_route53_record" "paradise_cakes_record" {
  zone_id = data.aws_route53_zone.zone.zone_id
  name    = var.environment == "prod" ? "paradisecakesbymegan.com" : "paradisecakesbymegan.dev"
  type    = "A"
  alias {
    name                   = aws_cloudfront_distribution.pc_cloud_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.pc_cloud_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}
