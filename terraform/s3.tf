resource "aws_s3_bucket" "paradise_cakes_bucket" {
  bucket = var.environment == "prod" ? "megsparadisecakes.com" : "dev.megsparadisecakes.com"
  tags = {
    Name = var.environment == "prod" ? "bucket for megsparadisecakes.com" : "bucket for dev.megsparadisecakes.com"
  }
  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}

resource "aws_s3_bucket_public_access_block" "paradise_cakes_bucket_pab" {
  bucket = aws_s3_bucket.paradise_cakes_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "paradise_cakes_s3_policy" {
  bucket     = aws_s3_bucket.paradise_cakes_bucket.id
  policy     = data.aws_iam_policy_document.paradise_cakes_s3_policy.json
  depends_on = [aws_s3_bucket_public_access_block.paradise_cakes_bucket_pab]
}

data "aws_iam_policy_document" "paradise_cakes_s3_policy" {
  statement {
    principals {
      type        = "AWS"
      identifiers = ["*"]
    }

    actions = [
      "s3:GetObject",
      "s3:PutBucketPolicy"
    ]

    resources = [
      aws_s3_bucket.paradise_cakes_bucket.arn,
      "${aws_s3_bucket.paradise_cakes_bucket.arn}/*",
    ]
  }
}
