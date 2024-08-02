resource "aws_iam_role" "cross_account_access" {
  count = var.environment == "prod" ? 0 : 1
  name  = "pc_dev_cross_account_access"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Principal = {
          AWS = "arn:aws:iam::${var.prod_aws_account_id}:root"
        },
        Action = "sts:AssumeRole"
      }
    ]
  })
}

resource "aws_iam_role_policy" "route53_access_policy" {
  count = var.environment == "prod" ? 0 : 1
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

resource "aws_iam_role_policy" "prod_assume_dev_role_policy" {
  count = var.environment == "prod" ? 0 : 1
  name  = "AssumeDevRolePolicy"
  role  = "YourProdRoleName" # Replace with your actual role name

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect   = "Allow",
        Action   = "sts:AssumeRole",
        Resource = "arn:aws:iam::${var.dev_aws_account_id}:role/pc_dev_cross_account_access"
      }
    ]
  })
}

