# Create a Node.js + Express Project
1. USe all required dewpendencies
2. CReate Dockerfile and .dockerignore file
# CReate a docker image
    - docker build . -t eksdemo:v1
# Test the app from the image
    - docker run -p 9070:9070 --name=mycont eksdemo:v1
# Download the AWS CLI and eksctl
# Configure the aws configure on the dev maching by providing
    - Download the AWS CLI tool

# Download the EKSCTL Tool
    - Elastic Kubernetes Service CLuster Tool creation CLI
    https://docs.aws.amazon.com/eks/latest/userguide/eksctl.html    
# Run the command to configure the AWS from the dev. MAchine
    - aws configure
    - Enter the following details, make sure that you have the access key
        - AccessKeyId, SecretAccessKey , Region, Format
# Make sure that, your subscription has access right to perform operations like
    - aws configure
    - create ECR
    - cerate EKS
    - CReate a Repository on AWS for Pushing Images
# The Elastic Container Repository (ECR)
    - aws ecr create-repository --repository-name [REPOSITORY-NAME] --region [REGION]
e.g.
     - aws ecr create-repository --repository-name eksdemoecr --region us-east-2
Repository details will be as follows
{
    "repository": {
        "repositoryArn": "arn:aws:ecr:us-east-2:[SUBSCIPTION-ID-OF-AWS]:repository/eksdemoecr",
        "registryId": "[SUBSCIPTION-ID-OF-AWS]",
        "repositoryName": "eksdemoecr",
        "repositoryUri": "[SUBSCIPTION-ID-OF-AWS].dkr.ecr.us-east-2.amazonaws.com/eksdemoecr",
        "createdAt": "2021-10-19T16:29:22+05:30",
        "imageTagMutability": "MUTABLE",
        "imageScanningConfiguration": {
            "scanOnPush": false
        },
        "encryptionConfiguration": {
            "encryptionType": "AES256"
        }
    }
}
# Login on the ECR

-   The command is as below

- aws ecr get-login-password --region [REGIOn-NAME] | docker login --username AWS       --password-stdin [SUBSCRIPTION-ID-OF-AWS].dkr.ecr.us-east-2.amazonaws.com/[REPOSITORY-NAME]
e.g.
- aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin [SUBSCIPTION-ID-OF-AWS].dkr.ecr.us-east-2.amazonaws.com/eksdemoecr

# PUSH the DOcker Image from the Local to ECR

# Tag the Docker Image to ECR-NAME
docker tag [IAMEG-NAME]:[TAG-NAME] [SUBSCRIPTION-ID-OF-AWS].dkr.ecr.[REGION-NAME].amazonaws.com/[REPOSITORY-NAME]:[TAG]
e.g.
    - docker tag eksdemo:v1 [SUBSCIPTION-ID-OF-AWS].dkr.ecr.us-east-2.amazonaws.com/eksdemoecr:v1

# Push the newly tagged Image
- docker push [SUBSCIPTION-ID-OF-AWS].dkr.ecr.us-east-2.amazonaws.com/eksdemoecr:v1
Creating EKS

# EKS is a CLuster Manager Service provide by AWS for managing Microservices based apps
    - Nodes to Host PODS
    - PODS to Host COntainers
    - COntainer to Host image

# The Modifications in e project 
- IN the project add a 'kube' folder and add deplopyment.yml and service.yml in it
- All Nodes are EC 2 Instances
- EC 2 Pricing is applied
- FOr the cluster creation
- Manage Security Groups
- Manage the Public and Private Communication across Nodes in the cluster
- The IAM Role is Mandatory for Cluster Creation
- Use the 'CloudFormation' Template to CReate the Cluster with EC2 Configuration Subnets Public and Private Cominucations
#  USing the Following JSON Schema for the CLuster Creation
- Use the following URL for Creating VPM, SubNets and Security Groups for the EKS Cluser Creation
    - VPC: The Node
    - SubNet: Used for INter COmmunication
    - Security Group : For Managing Public COmmunication to the CLusre from Outside
https://amazon-eks.s3.us-west-2.amazonaws.com/cloudformation/2020-06-10/amazon-eks-vpc-private-subnets.yaml
 - Go to CloudFormation form AWS Portal
 - CLick on 'Create Stack'
 - Select the 'Template Source' as 'Amazon S3 URL'
 - Paste the Above URL in it
 - CLick on Next
 - ENter Stack NAme
 - Here we can see the Public and Private Subnet IPs for CLuster
 - CLick on Next
 - CLick on Next
 - CLick on Create Stack
 - The Stack will be created
 - The Cloud Formation Stack will be created with the FOllowing Information
    - VPC-ID, an Id of VM that will be used by the cluster to manage deployment
    - SecurityGroup
    - Set of Rules for In-Boud and Out-Bound Calls or COmmunications SubnetIds
    - Private and Public Ids for internal and external counications

    - Create a Cluster.yml or Cluster.json file for defining the Stack Information for creating Cluster
        On Windows Machine put this JSON file in
        c:\users[USER-NAME].kube\config
        On Mac and Linux Machine
        ~/.kube/config

- Create a CLuster using Cluster.json using the following command

    - eksctl create cluster -f cluster.json --kubeconfig=c:\users{user}.kube\config

    - Once the cluster is created set the cutrrent K8S configuration for the newly created cluster

     - aws eks --region us-east-2 update-kubeconfig --name EKS-node-Cluster-b2
# deploy the service usig following commnds

    - kubectl apply -f .\kube\deployment.yml kubectl apply -f .\kube\service.yml

- Get the runing node
    - kubectl get nodes
- Get the Ceated pods
    - kubectl get pods
- The Pod may generate following issues
    - ErrorPullImage
    - CrahsLoopback
    - Rollback
then make sure that the image is created properly


- Deploy the Service
    - kubectl apply -f [Deployment-File-Name].yml
        - Create a POD and image will be added into it
    - kubectl apply -f [Service-File-Name].yml
        - Deploy the service
        - Expose the service on Port
            - targetPort: For Container
            - port: for Internal service COmmunication
            - NodePort: Exposed by the Pods in Node
                - TCP based Port, this is used for Public COmunication
    NOTE: Ypu can have a single deployment and service file        


- You can describe  teh Pods using Following command
    - kubectl describe pod [POD-NAME]

- Get list of deployed services
    - kubectl get svc

- You MUST get the public IPs of the Node, run the following command to get the public IP
    -  kubectl get nodes -o wide  
        - Note: The above command shoes public IPs aka External IPs for nodes
        - The one that does not show publiuc IP is internal Private subnet group node for internal communication  

To access the service, add the NodePOrt into the security group of the cluster in the Inbound and outbouud connection


# K8S Service DEployment Types on Clusters
    - Cluster
        - Nodes, Local VM that is having K8 Master Controller Service Running. THis also has IP Addresses
            - Pods, Logical Sections in eachg node for containing Microservice Containers
                - Containers
                    - The Image
                    - Each COntainer contain a single Image
                    - These containers COmmunicates with each other using Private ports
    - Internal IPs aka Private IPs
        - These are called as  'ClusterIPs'
            - These are used for INternal COmmunciations across Nodes with all its resoureces
    - NodePort
        - The Public Port the will be linkied with Private Port or Tareget Port to Communicate
            - To access the NodePort, the Node's Piblic IP must be configured with the Port in security Group
    - LoadBalalcer
        - The Pure Public Dateway for the COmmunication                
