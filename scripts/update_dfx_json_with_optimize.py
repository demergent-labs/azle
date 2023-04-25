#!/usr/bin/env python3
import json
import os

# Find all the dfx.json files in the current directory and its subdirectories
for root, _, files in os.walk('.'):
    for file in files:
        if file == 'dfx.json':
            file_path = os.path.join(root, file)
            
            # Load the JSON content from the file
            with open(file_path, 'r') as json_file:
                data = json.load(json_file)

            # Iterate through the canisters and add "optimize": "size" after "wasm"
            for canister in data['canisters'].values():
                if 'wasm' in canister:
                    canister['optimize'] = 'size'

            # Write the updated JSON content back to the file
            with open(file_path, 'w') as json_file:
                json.dump(data, json_file, indent=4)