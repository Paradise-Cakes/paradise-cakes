# data "aws_iam_role" "pc_dev_terraform_deployer" {
#   count = var.environment == "prod" ? 0 : 1
#   name  = "paradise-cakes-api-development-terraform-deployer"
# }

# resource "aws_iam_role" "cross_account_access_dev" {
#   count = var.environment == "prod" ? 0 : 1
#   name  = "pc_dev_cross_account_access"

#   assume_role_policy = jsonencode({
#     Version = "2012-10-17",
#     Statement = [
#       {
#         Effect = "Allow",
#         Principal = {
#           AWS = ["arn:aws:iam::${var.prod_aws_account_id}:root", data.aws_iam_role.pc_dev_terraform_deployer[0].arn]
#         },
#         Action = "sts:AssumeRole"
#       }
#     ]
#   })
# }

# resource "aws_iam_policy" "route53_access" {
#   count = var.environment == "prod" ? 0 : 1
#   name  = "route53_access_policy"
#   policy = jsonencode({
#     Version = "2012-10-17",
#     Statement = [
#       {
#         Effect = "Allow",
#         Action = [
#           "route53:ListHostedZones",
#           "route53:GetHostedZone",
#           "route53:ListResourceRecordSets",
#           "route53:ListTagsForResource",
#         ],
#         Resource = "*"
#       }
#     ]
#   })
# }

# resource "aws_iam_role_policy_attachment" "update_trust_policy" {
#   count      = var.environment == "prod" ? 0 : 1
#   policy_arn = aws_iam_policy.route53_access[0].arn

#   role = aws_iam_role.cross_account_access_dev[0].name

#   lifecycle {
#     create_before_destroy = true
#   }
# }
