provider "aws" {
  access_key = "${var.access_key}"
  secret_key = "${var.secret_key}"
  region     = "${var.region}"
}

module "rds_mysql" {
  source            = "git::https://github.com/tmknom/terraform-aws-rds-mysql.git?ref=tags/1.1.0"
  identifier        = "tasks-dev"
  engine_version    = "5.7.23"
  instance_class    = "db.t3.micro"
  storage_type      = "gp2"
  allocated_storage = 20
  multi_az          = false
  publicly_accessible = true
  deletion_protection = false
  username          = "root"
  password          = "${var.db_password}"

  subnet_ids          = ["${var.subnets}"]
  vpc_id              = "${var.vpc_id}"
  ingress_cidr_blocks = ["0.0.0.0/0"]
}

output "db_instance_address" {
  value = "${module.rds_mysql.db_instance_address}"
}

output "db_instance_endpoint" {
  value = "${module.rds_mysql.db_instance_endpoint}"
}
