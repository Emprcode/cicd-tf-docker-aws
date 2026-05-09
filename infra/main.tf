
resource "aws_key_pair" "deployer" {
  key_name   = "smart-notes-key"
  public_key = file("~/.ssh/smart-notes-key.pub")
}

resource "aws_security_group" "backend_sg" {
  name = "smart-notes-sg"

  ingress {
    from_port   = 8000
    to_port     = 8000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

data "aws_ami" "ubuntu" {
  most_recent = true

  owners = ["099720109477"]

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }
}

resource "aws_instance" "backend" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = var.instance_type
  key_name      = aws_key_pair.deployer.key_name

  vpc_security_group_ids = [
    aws_security_group.backend_sg.id
  ]

  user_data = <<-EOF
              #!/bin/bash
              sudo apt update -y

              # Install Docker
              sudo apt install docker.io -y
              sudo systemctl start docker
              sudo systemctl enable docker

              # Install Git
              sudo apt install git -y

              # Clone repo
              cd /home/ubuntu
              git clone https://github.com/Emprcode/cicd-tf-docker-aws.git

              # Run backend
              cd cicd-tf-docker-aws/backend

              docker build -t smart-notes-backend .

              docker run -d -p 8000:8000 \
                --env-file .env \
                --name smart-notes \
                smart-notes-backend
              EOF

  tags = {
    Name = "smart-notes-backend"
  }
}
