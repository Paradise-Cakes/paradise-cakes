provider "aws" {
  alias  = "dev"
  region = "us-east-1"

  assume_role {
    role_arn = var.environment == "dev" ? ("arn:aws:iam::%s:role/pc_dev_cross_account_access", var.dev_aws_account_id) : ""
  }
}

data "aws_route53_zone" "paradise_cakes" {
  name         = var.environment == "prod" ? "paradisecakesbymegan.com" : "dev.paradisecakesbymegan.com"
  private_zone = false
}

resource "aws_route53_record" "paradise_cakes" {
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

# resource "aws_route53_record" "paradise_cakes" {
#   count   = var.environment == "prod" ? 1 : 0
#   zone_id = data.aws_route53_zone.paradise_cakes[0].zone_id
#   name    = "paradisecakesbymegan.com"
#   type    = "A"

#   alias {
#     name                   = aws_cloudfront_distribution.pc_cloud_distribution.domain_name
#     zone_id                = aws_cloudfront_distribution.pc_cloud_distribution.hosted_zone_id
#     evaluate_target_health = false
#   }
# }

# resource "aws_route53_record" "paradise_cakes_dev" {
#   count   = var.environment == "prod" ? 0 : 1
#   zone_id = data.aws_route53_zone.paradise_cakes_dev[0].zone_id
#   name    = "dev.paradisecakesbymegan.com"
#   type    = "A"

#   alias {
#     name                   = aws_cloudfront_distribution.pc_cloud_distribution.domain_name
#     zone_id                = aws_cloudfront_distribution.pc_cloud_distribution.hosted_zone_id
#     evaluate_target_health = false
#   }
# }


data "aws_route53_zone" "paradise_cakes_dev" {
  provider = aws.dev
  name     = "dev.paradisecakesbymegan.com"
}

resource "aws_route53_record" "paradise_cakes_dev_ns" {
  count   = var.environment == "prod" ? 1 : 0
  zone_id = data.aws_route53_zone.paradise_cakes.zone_id
  name    = "dev.paradisecakesbymegan.com"
  type    = "NS"

  records = [
    data.aws_route53_zone.paradise_cakes_dev.name_servers[0],
    data.aws_route53_zone.paradise_cakes_dev.name_servers[1],
    data.aws_route53_zone.paradise_cakes_dev.name_servers[2],
    data.aws_route53_zone.paradise_cakes_dev.name_servers[3],
  ]
}
