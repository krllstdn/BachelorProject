#!/bin/bash

source deploy-config.sh

# Check SSH connection
if ssh -i "$KEY_PATH" -q -o BatchMode=yes -o ConnectTimeout=5 "$USER_NAME@$IP" "echo 2>&1"; then
    echo "SSH connection successful"
else
    echo "SSH connection failed"
    exit 1  # Exit the script if SSH connection fails
fi

# NOTE: it was tested only on macos, on linux it might be different
zip -r Application.zip ../Application -x */Frontend/kidney-life/node_modules/**

scp -i $KEY_PATH ./Application.zip $USER_NAME@$IP:/home/$USER_NAME

ssh -i $KEY_PATH $USER_NAME@$IP <<EOF
    sudo apt-get update
    sudo apt-get install -y unzip make
    sudo rm -r Application
    sudo unzip Application.zip
    rm Application.zip
    cd Application
    sudo make dc-prod-up
EOF

# remove zip file
rm Application.zip


# Installation of the latest version of docker-compose for the linux machine
# sudo curl -L https://github.com/docker/compose/releases/download/v2.24.3/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose
# sudo chmod +x /usr/local/bin/docker-compose
# sudo mv /usr/local/bin/docker-compose /usr/bin/docker-compose
# docker-compose -v