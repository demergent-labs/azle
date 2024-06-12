# Environment Variables

-   [AZLE_AUTORELOAD](#azle_autoreload)
-   [AZLE_DOCKERFILE_HASH](#azle_dockerfile_hash)
-   [AZLE_IDENTITY_STORAGE_MODE](#azle_identity_storage_mode)
-   [AZLE_INSTRUCTION_COUNT](#azle_instruction_count)
-   [AZLE_PROPTEST_NUM_RUNS](#azle_proptest_num_runs)
-   [AZLE_PROPTEST_PATH](#azle_proptest_path)
-   [AZLE_PROPTEST_QUIET](#azle_proptest_quiet)
-   [AZLE_PROPTEST_SEED](#azle_proptest_seed)
-   [AZLE_PROPTEST_VERBOSE](#azle_proptest_verbose)
-   [AZLE_SKIP_COMPILER_INFO](#azle_skip_compiler_info)
-   [AZLE_TEST_FETCH](#azle_test_fetch)
-   [AZLE_UPLOADER_IDENTITY_NAME]()
-   [AZLE_USE_DOCKERFILE](#azle_use_dockerfile)
-   [AZLE_VERBOSE](#azle_verbose)
-   [AZLE_WASMEDGE_QUICKJS_DIR](#azle_wasmedge_quickjs_dir)

## AZLE_AUTORELOAD

Set this to `true` to enable autoreloading of your TypeScript/JavaScript code when making any changes to `.ts` or `.js` files in your project.

## AZLE_DOCKERFILE_HASH

Set this to the hash that you would like Azle to use when determining the container image, container, and `wasmedge-quickjs` directory names. The container image file and `wasmedge-quickjs` directory will be stored at `~/.config/azle`. The hash is the final part of each of those names.

## AZLE_IDENTITY_STORAGE_MODE

Used for automated testing.

## AZLE_INSTRUCTION_COUNT

Set this to `true` to see rough instruction counts just before JavaScript execution completes for calls.

## AZLE_PROPTEST_NUM_RUNS

Used for automated testing.

## AZLE_PROPTEST_PATH

Used for automated testing.

## AZLE_PROPTEST_QUIET

Used for automated testing.

## AZLE_PROPTEST_SEED

Used for automated testing.

## AZLE_PROPTEST_VERBOSE

Used for automated testing.

## AZLE_SKIP_COMPILER_INFO

Used internally in the Dockerfile.

## AZLE_TEST_FETCH

Used for automated testing.

## AZLE_UPLOADER_IDENTITY_NAME

Change the name of the `dfx` identity added as a controller for uploading large assets and autoreload.

## AZLE_USE_DOCKERFILE

Set this to `true` to force Azle to build the container image locally from the internal Dockerfile instead of attempting to download the container image.

## AZLE_VERBOSE

Set this to `true` to enable more logging output during `dfx deploy`.

## AZLE_WASMEDGE_QUICKJS_DIR

Set this to the path that you would like Azle to use to find the `wasmedge-quickjs` directory. The default is `~/.config/azle/wasmedge-quickjs_[current Dockerfile hash]`.
