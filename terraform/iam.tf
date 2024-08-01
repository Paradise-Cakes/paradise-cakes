resource "aws_iam_role" "cross_account_access" {
  count = var.environment == "prod" ? 1 : 0
  name  = "pc_dev_cross_account_access"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Principal = {
          AWS = "arn:aws:iam::${var.dev_aws_account_id}:root"
        },
        Action = "sts:AssumeRole"
      }
    ]
  })
}

resource "aws_iam_role_policy" "route53_access_policy" {
  count = var.environment == "prod" ? 1 : 0
  name  = "Route53AccessPolicy"
  role  = aws_iam_role.cross_account_access[0].id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action = [
          "route53:ListHostedZones",
          "route53:GetHostedZone",
          "route53:ListResourceRecordSets"
        ],
        Resource = "*"
      }
    ]
  })
}
