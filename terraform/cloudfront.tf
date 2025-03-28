resource "aws_cloudfront_distribution" "pc_cloud_distribution" {
  origin {
    custom_origin_config {
      http_port              = "80"
      https_port             = "443"
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1", "TLSv1.1", "TLSv1.2"]
    }

    domain_name = aws_s3_bucket.paradise_cakes_bucket.website_endpoint
    origin_id   = var.environment == "prod" ? "megsparadisecakes.com" : "dev.megsparadisecakes.com"
  }

  enabled             = true
  default_root_object = "index.html"

  default_cache_behavior {
    viewer_protocol_policy = "redirect-to-https"
    compress               = true
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = var.environment == "prod" ? "megsparadisecakes.com" : "dev.megsparadisecakes.com"
    min_ttl                = 0
    default_ttl            = 86400
    max_ttl                = 31536000

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  custom_error_response {
    error_caching_min_ttl = 3000
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
  }

  aliases = var.environment == "prod" ? ["megsparadisecakes.com", "www.megsparadisecakes.com"] : ["dev.megsparadisecakes.com", "www.dev.megsparadisecakes.com"]

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn = data.aws_acm_certificate.paradise_cakes.arn
    ssl_support_method  = "sni-only"
  }
}

