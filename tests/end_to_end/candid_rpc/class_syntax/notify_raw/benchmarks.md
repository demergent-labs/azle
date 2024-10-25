# Benchmarks for canister1

## Current benchmarks Azle version: 0.24.2-rc.60

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls | Change                          |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- | ------------------------------- |
| 0   | sendNotification | 1_605_764    | 1_232_305 | $0.0000016386 | $1.63             | <font color="red">+1_713</font> |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | sendNotification | 1_604_051    | 1_231_620 | $0.0000016376 | $1.63             |

# Benchmarks for canister2

## Current benchmarks Azle version: 0.24.2-rc.60

| Id  | Method Name         | Instructions | Cycles  | USD           | USD/Million Calls | Change                        |
| --- | ------------------- | ------------ | ------- | ------------- | ----------------- | ----------------------------- |
| 0   | receiveNotification | 907_971      | 953_188 | $0.0000012674 | $1.26             | <font color="red">+690</font> |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions | Cycles  | USD           | USD/Million Calls |
| --- | ------------------- | ------------ | ------- | ------------- | ----------------- |
| 0   | receiveNotification | 907_281      | 952_912 | $0.0000012671 | $1.26             |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
