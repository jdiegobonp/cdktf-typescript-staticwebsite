import { Construct } from "constructs";
import { TerraformOutput } from "cdktf";
import { S3Bucket } from "./.gen/providers/aws/s3-bucket";
import { S3BucketPolicy } from "./.gen/providers/aws/s3-bucket-policy";
import { S3BucketCorsConfiguration } from "./.gen/providers/aws/s3-bucket-cors-configuration";
import { S3BucketAcl}  from "./.gen/providers/aws/s3-bucket-acl";
import { S3BucketWebsiteConfiguration } from "./.gen/providers/aws/s3-bucket-website-configuration";

export class StaticWebSite extends Construct {
  public website_bucket: S3Bucket;
  constructor(scope: Construct, name: string) {
    super(scope, name);

    /* Creation S3 Bucket */
    this.website_bucket = new S3Bucket(this, "website_bucket", {
      bucket: name,
      tags: {
        Name: name,
        Environment: 'Development',
      },
    });

    /* Website configuration */
    const websiteConfig = new S3BucketWebsiteConfiguration(this, "website_configuration", {
        bucket: this.website_bucket.bucket,
        indexDocument: {
            suffix: "index.html",
        },
        errorDocument: {
            key: "error.html",
        },
    });

  
    /* Attach Allow Access Policy */
    new S3BucketPolicy(this, 'website-policy',{
        bucket: this.website_bucket.bucket,
        policy: JSON.stringify(
        {
            Version: "2012-10-17",
            Statement: [
                {
                    Sid: "PublicRead",
                    Effect: "Allow",
                    Principal: "*",
                    Action: ["s3:GetObject"],
                    Resource: [`${this.website_bucket.arn}`,`${this.website_bucket.arn}/*`],
                },
            ],
        }),
    });

    /* Cors configuration */
    new S3BucketCorsConfiguration(this, 'website-cors-configuration',{
      bucket: this.website_bucket.bucket,

      corsRule: [{
        allowedHeaders : ["*"],
        allowedMethods : ["PUT", "POST"],
        allowedOrigins : ["*"],
        exposeHeaders  : ["ETag"],
        maxAgeSeconds : 3000,
        }
      ],
    });

    /* ACL configuration */
    new S3BucketAcl(this, 'website-acl', {
       bucket: this.website_bucket.bucket,
       acl: "public-read",
    });

    /* Outputs */
    new TerraformOutput(this, 'endpoint', {
       value: websiteConfig.websiteEndpoint,
    });

  }
}