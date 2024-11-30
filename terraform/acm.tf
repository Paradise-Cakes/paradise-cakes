data "aws_acm_certificate" "paradise_cakes" {
  domain = var.environment == "prod" ? "megsparadisecakes.com" : "dev.megsparadisecakes.com"
}