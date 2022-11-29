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

    const identifier = Math.floor(Math.random() * (9999999 - 1000000) + 1000000) 
    
    new StaticWebSite(this, "bucket-staticwebsite-poc-" + identifier);
  }
}

const app = new App();
new MyStack(app, "cdktf-staticwebsite");
app.synth();
