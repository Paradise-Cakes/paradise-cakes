data "aws_acm_certificate" "paradise_cakes" {
  domain = var.environment == "prod" ? "www.megsparadisecakes.com" : "www.dev.megsparadisecakes.com"
}