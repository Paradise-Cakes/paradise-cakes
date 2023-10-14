resource "aws_s3_bucket" "paradise_cakes_bucket" {
  bucket = "paradisecakesbymegan.com"
  tags = {
    Name = "bucket for paradisecakesbymegan.com"
  }
  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}

resource "aws_s3_bucket_policy" "paradise_cakes_s3_policy" {
  bucket = aws_s3_bucket.paradise_cakes_bucket.id
  policy = data.aws_iam_policy_document.paradise_cakes_s3_policy.json
}

data "aws_iam_policy_document" "paradise_cakes_s3_policy" {
  statement {
    principals {
      type        = "AWS"
      identifiers = ["*"]
    }

    actions = [
      "s3:GetObject",
    ]

    resources = [
      aws_s3_bucket.paradise_cakes_bucket.arn,
      "${aws_s3_bucket.paradise_cakes_bucket.arn}/*",
    ]
  }
}
