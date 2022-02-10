from aws_cdk import (
    core,
    aws_ec2,
    aws_ecs,
    aws_ecs_patterns
)


class Ecs2048OnFargateStack(core.Stack):

    def __init__(self, scope: core.Construct, id: str, **kwargs) -> None:
        super().__init__(scope, id, **kwargs)

        # import default VPC
        # vpc = aws_ec2.Vpc.from_lookup(self, 'VPC', is_default = True)

        vpc = aws_ec2.Vpc(
            self, "Vpc",
            max_azs=2
        )

        # ECS cluster
        cluster = aws_ecs.Cluster(
            self, 'Cluster',
            vpc=vpc
        )

        svc = aws_ecs_patterns.ApplicationLoadBalancedFargateService(
            self, 'FargateService',
            cluster=cluster,
            task_image_options={
                "image": aws_ecs.ContainerImage.from_registry("alexwhen/docker-2048"),
                "environment": {
                    "TEST_ENVIRONMENT_VARIABLE1": "test environment variable 1 value"
                }
            },
            desired_count=2
            # image = aws_ecs.ContainerImage.from_registry("alexwhen/docker-2048")
            # container_port = 5000
        )

        core.CfnOutput(self, 'SericeURL', value="http://{}".format(
            svc.load_balancer.load_balancer_dns_name)
        )
