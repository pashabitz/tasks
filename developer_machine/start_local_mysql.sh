docker run --name tasks-db -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password1 -d mysql
echo "Waiting for 30 for mysql to come up..."
sleep 30
DIR="$(cd "$(dirname "$0")" && pwd)"
mysqlsh root:password1@localhost:3306 -f $DIR/dev_db_setup.sql
