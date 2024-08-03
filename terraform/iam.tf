data "aws_iam_role" "pc_dev_terraform_deployer" {
  count = var.environment == "prod" ? 0 : 1
  name  = "paradise-cakes-api-development-terraform-deployer"
}

resource "aws_iam_role" "cross_account_access_dev" {
  count = var.environment == "prod" ? 0 : 1
  name  = "pc_dev_cross_account_access"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Principal = {
          AWS = ["arn:aws:iam::${var.prod_aws_account_id}:root", "${data.aws_iam_role.pc_dev_terraform_deployer[0].arn}"]
        },
        Action = "sts:AssumeRole"
      }
    ]
  })
}


resource "aws_iam_role_policy" "route53_access_policy" {
  count = var.environment == "prod" ? 0 : 1
  name  = "route53_access_policy"
  role  = aws_iam_role.cross_account_access_dev[0].name

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
