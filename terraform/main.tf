terraform {
  backend "s3" {
    bucket = "paradise-cakes-tfstate"
    key    = "paradise-cakes.tfstate"
    region = "us-east-1"
  }
}
