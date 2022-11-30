import { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";
import { AwsProvider } from "./.gen/providers/aws/provider"
import { StaticWebSite } from "./staticwebsite";

class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    new AwsProvider(this, "AWS", {
      region: "us-east-1"
    });

    new StaticWebSite(this, "bucket-staticwebsite-poc-1234");
  }
}

const app = new App();
new MyStack(app, "cdktf-staticwebsite");
app.synth();
