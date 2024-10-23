# Benchmarks for canister1

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | sendNotification | 1_604_051    | 1_231_620 | $0.0000016462 | $1.6462           |

## Baseline benchmarks Azle version: 0.25.0

# Benchmarks for canister2

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions | Cycles  | USD           | USD/Million Calls |
| --- | ------------------- | ------------ | ------- | ------------- | ----------------- |
| 0   | receiveNotification | 907_281      | 952_912 | $0.0000012737 | $1.2737           |

## Baseline benchmarks Azle version: 0.25.0

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee _ number_of_instructions) + (additional_fee_per_billion _ floor(number_of_instructions / 1_billion))
-   Base fee: 590,000 cycles
-   Per instruction fee: 0.4 cycles
-   Additional fee: 400,000,000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.33661 (as of December 18, 2023)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
