data "aws_route53_zone" "paradise_cakes" {
  name         = var.environment == "prod" ? "paradisecakesbymegan.com" : "dev.paradisecakesbymegan.com"
  private_zone = false
}

resource "aws_route53_record" "paradise_cakes_validation_record" {
  for_each = {
    for dvo in aws_acm_certificate.paradise_cakes.domain_validation_options : dvo.domain_name => {
      name    = dvo.resource_record_name
      record  = dvo.resource_record_value
      type    = dvo.resource_record_type
      zone_id = data.aws_route53_zone.paradise_cakes.zone_id
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = each.value.zone_id
}

# resource "aws_route53_record" "paradise_cakes_main" {
#   zone_id = data.aws_route53_zone.paradise_cakes.zone_id
#   name    = var.environment == "prod" ? "paradisecakesbymegan.com" : "dev.paradisecakesbymegan.com"
#   type    = "A"

#   alias {
#     name                   = aws_cloudfront_distribution.pc_cloud_distribution.domain_name
#     zone_id                = aws_cloudfront_distribution.pc_cloud_distribution.hosted_zone_id
#     evaluate_target_health = false
#   }
# }

resource "aws_route53_record" "paradise_cakes_dev_ns" {
  count   = var.environment == "prod" ? 1 : 0
  zone_id = data.aws_route53_zone.paradise_cakes.zone_id
  name    = "dev.paradisecakesbymegan.com"
  type    = "NS"
  ttl     = 300

  records = [
    "ns-1757.awsdns-27.co.uk",
    "ns-1270.awsdns-30.org",
    "ns-820.awsdns-38.net",
    "ns-222.awsdns-27.com",
  ]
}

resource "aws_route53_record" "www" {
  zone_id = data.aws_route53_zone.paradise_cakes.zone_id
  name    = var.environment == "prod" ? "www.paradisecakesbymegan.com" : "www.dev.paradisecakesbymegan.com"
  type    = "CNAME"
  ttl     = 300

  records = var.environment == "prod" ? ["paradisecakesbymegan.com"] : ["dev.paradisecakesbymegan.com"]
}
