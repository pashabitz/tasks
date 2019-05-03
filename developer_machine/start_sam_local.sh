DIR="$(cd "$(dirname "$0")" && pwd)"
sam local start-api -n $DIR/environment.json -t $DIR/../api/template.yaml
