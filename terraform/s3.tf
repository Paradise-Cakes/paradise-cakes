resource "aws_s3_bucket" "paradise_cakes_bucket" {
  bucket = "paradisecakesbymegan.com"
  tags = {
    Name = "bucket for paradisecakesbymegan.com"
  }
  acl    = "public-read"
  POLICY = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "AddPerm",
    "Effect": "Allow",
    "Principal": "*",
    "Action": ["s3:GetObject"],
    "Resource": ["arn:aws:s3:::$paradisecakesbymegan.com/*"]
  }]
}
POLICY
  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}
