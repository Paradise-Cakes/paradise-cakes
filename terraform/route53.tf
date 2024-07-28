resource "aws_route53_zone" "paradise_cakes" {
  name = var.environment == "prod" ? "paradisecakesbymegan.com" : "dev.paradisecakesbymegan.com"
}

resource "aws_route53_record" "paradise_cakes" {
  for_each = {
    for dvo in aws_acm_certificate.paradise_cakes.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = aws_route53_zone.paradise_cakes.zone_id
}

resource "aws_route53_record" "paradise_cakes_record" {
  zone_id = aws_route53_zone.paradise_cakes.zone_id
  name    = var.environment == "prod" ? "paradisecakesbymegan.com" : "dev.paradisecakesbymegan.com"
  type    = "A"
  alias {
    name                   = aws_cloudfront_distribution.pc_cloud_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.pc_cloud_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}
