# Deploying S3 as a Static Website with CDKTF
The AWS S3 is a useful service that is able to configure as a Static WebSite to deploy any page or site so, this repository contains a basic Stack deployed in CDK for Terraform (CDFTF) with the essentials configurations to access it through the internet. 

> Due to this is a basic CDKTF stack, the website must be implemented manually from this repository [Link](https://github.com/jdiegobonp/react-staticwebsite)

## Pre-requisites

- Terraform
- CDK for Terraform
- AWS CLI
- AWS credentials where you want to deploy this static website with sufficient permissions in S3 and IAM.
- Configure the AWS provider for terraform creating the environment variables [Link](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)

**Installation**

1. Clone this repository and go to the root folder.
2. Execute the following commands. 

```sh
cdktf get
cdktf deploy --auto-approve
```

> If you want to take a look at the documentation for the CDKTF commands, go to this [Link](https://developer.hashicorp.com/terraform/cdktf/cli-reference/commands)

3. Go to another folder and execute the following commands:

```sh
git clone https://github.com/jdiegobonp/react-staticwebsite
cd react-staticwebsite
npm install
npm run build
aws s3 cp ./build/ s3://<bucket name>/ --recursive
```

4. Check the stack outputs and identify the endpoint and copy it.
5. Open a web browser and paste the endpoint in the URL (identified above).

**Clean Up**

To delete the resources deployed in the above steps execute the following steps:

1. Go to CDKTF folder and execute the following command:

```sh
aws s3 rm s3://<bucket name> --recursive
cdktf destroy --auto-approve
```