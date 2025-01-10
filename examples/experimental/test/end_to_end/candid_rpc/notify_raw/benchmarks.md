# Benchmarks for canister1

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | sendNotification | 1_632_296    | 1_242_918 | $0.0000016527 | $1.65             | <font color="green">-2_482</font> |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | sendNotification | 1_634_778    | 1_243_911 | $0.0000016540 | $1.65             |

# Benchmarks for canister2

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions | Cycles  | USD           | USD/Million Calls | Change                            |
| --- | ------------------- | ------------ | ------- | ------------- | ----------------- | --------------------------------- |
| 0   | receiveNotification | 860_025      | 934_010 | $0.0000012419 | $1.24             | <font color="green">-6_165</font> |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions | Cycles  | USD           | USD/Million Calls |
| --- | ------------------- | ------------ | ------- | ------------- | ----------------- |
| 0   | receiveNotification | 866_190      | 936_476 | $0.0000012452 | $1.24             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
