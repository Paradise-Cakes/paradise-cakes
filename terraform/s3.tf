resource "aws_s3_bucket" "paradise_cakes_bucket" {
  bucket = "paradise-cakes-us-east-1"
  tags = {
    Name = "bucket for paradisecakesbymegan.com"
  }
  force_destroy = true
  acl           = "private"

  versioning {
    enabled = true
  }

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }
}
