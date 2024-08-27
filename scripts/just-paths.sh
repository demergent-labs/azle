#!/bin/bash
EXAMPLE_DIRECTORIES=$(cat << END
[
    {path: "HERE/hello_world", name: "basic_bitcoin", type: "ex"},
    {path: "HERE/hello_world2", name: "large_files", type: "e2e", "syntax": "http"},
    {path: "HERE/hello_world3", name: "bool", type: "prop", "syntax": "crpc", "api": "class"}
]
END
)
EXAMPLE_DIRECTORIES="${EXAMPLE_DIRECTORIES//'%'/'%25'}"
EXAMPLE_DIRECTORIES="${EXAMPLE_DIRECTORIES//$'\n'/'%0A'}"
EXAMPLE_DIRECTORIES="${EXAMPLE_DIRECTORIES//$'\r'/'%0D'}"

echo "$EXAMPLE_DIRECTORIES" | base64
