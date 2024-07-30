terraform {
  backend "s3" {
    bucket = var.environment == "prod" ? "paradise-cakes-tfstate" : "paradise-cakes-dev-tfstate"
    key    = var.environment == "prod" ? "paradise-cakes.tfstate" : "paradise-cakes-dev.tfstate"
    region = "us-east-1"
  }
}
