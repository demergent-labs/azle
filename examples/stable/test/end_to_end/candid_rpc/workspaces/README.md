# Candid RPC Tests with Workspaces

This directory contains tests for validating the usage of azle with various workspace configurations.

## Test Approach

These tests are designed to verify that canisters in different workspace configurations properly use the azle library from the expected location. Rather than testing against specific published versions of azle, we:

1. Create a test-specific version of azle (with version `999.999.999-{suffix}`) for each canister
2. Package it locally using `npm pack` (see `prepare_test_package.ts`)
3. Install dependencies for each test canister
4. Deploy each canister
5. Verify that each canister reports the correct test-specific version when deployed

This approach eliminates the maintenance burden of keeping tests up-to-date with specific azle versions, while still verifying that each canister properly imports azle from the expected location.
