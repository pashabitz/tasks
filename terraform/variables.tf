variable "access_key" {}
variable "secret_key" {}
variable "region" {
  default = "us-west-2"
}
variable "vpc_id" {
  default = "vpc-f8f5a29d"
}

variable "subnets" {
  default = ["subnet-0b72087c", "subnet-0bfdd96e", "subnet-4d36ab14"]
}

variable "db_password" {}
