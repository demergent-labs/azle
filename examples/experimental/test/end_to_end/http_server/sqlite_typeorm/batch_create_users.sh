#!/bin/bash

# Set the number of times to execute the curl command
count=1000  # Change this number as needed

# URL to which the POST request will be sent
url="http://$(dfx canister id sqlite_typeorm).localhost:8000/users/batch/800"

# Loop as many times as specified in the count variable
for ((i=0; i<count; i++))
do
  echo "POST request #$i"
  curl -X POST "$url"
done

echo "All POST requests have finished"
