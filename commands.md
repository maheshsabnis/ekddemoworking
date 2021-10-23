[SUBSCIPTION-ID-OF-AWS].dkr.ecr.us-east-2.amazonaws.com/eksdemoecr

aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin [SUBSCIPTION-ID-OF-AWS].dkr.ecr.us-east-2.amazonaws.com/eksdemoecr

docker tag eksdemo:0.0.1 [SUBSCIPTION-ID-OF-AWS].dkr.ecr.us-east-2.amazonaws.com/eksdemoecr:0.0.1

docker push [SUBSCIPTION-ID-OF-AWS].dkr.ecr.us-east-2.amazonaws.com/eksdemoecr:0.0.1


C:\Users\acer\.kube

eksctl create cluster -f cluster.json --kubeconfig=C:\Users\acer\.kube\config

aws eks --region us-east-2 update-kubeconfig --name EKS-node-Cluster 


aws ec2 describe-subnets --filters "Name=vpc-id,Values=vpc-05849ee4f0b22a12b" | Where-Object 'MapPublicIpOnLaunch\|SubnetId\|VpcId\|State'


# Run the fllowing commands to get IP Address of the Nodes

 kubectl get nodes -o wide


# used these commands for awsdeply.yml form the folowing URL
https://aws.amazon.com/premiumsupport/knowledge-center/eks-kubernetes-services-cluster/


kubectl expose deployment my-deployment  --type=ClusterIP  --name=my-service