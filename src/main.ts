import { App, Stack, StackProps, Duration } from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecsPatterns from 'aws-cdk-lib/aws-ecs-patterns';
// import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { Construct } from 'constructs';

export class CdkEcs2048FargateDemo extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'VPC', {
      maxAzs: 2,
    });

    const cluster = new ecs.Cluster(this, 'Cluster', {
      vpc: vpc,
    });

    const ecsService2048 =
      new ecsPatterns.ApplicationLoadBalancedFargateService(this, 'Service', {
        cluster: cluster,
        desiredCount: 1,
        taskImageOptions: {
          image: ecs.ContainerImage.fromRegistry('alexwhen/docker-2048'),
          environment: {
            Application: '2048',
            Host: 'Fargate',
          },
        },
      });

    const scaleTarget = ecsService2048.service.autoScaleTaskCount({
      maxCapacity: 3,
      minCapacity: 0,
    });

    scaleTarget.scaleOnCpuUtilization('CpuScaling', {
      targetUtilizationPercent: 50,
      scaleInCooldown: Duration.seconds(60),
    });
  }
}

// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

new CdkEcs2048FargateDemo(app, 'cdk-ecs-2048-on-fargate', { env: devEnv });

app.synth();
