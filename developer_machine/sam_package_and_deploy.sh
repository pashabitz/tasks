DIR="$(cd "$(dirname "$0")" && pwd)"
sam package --s3-bucket tasks-deployment --template-file $DIR/../api/template.yaml --output-template-file $DIR/../packaged.yaml
sam deploy --template-file $DIR/../packaged.yaml --stack-name tasks-api --capabilities CAPABILITY_IAM
