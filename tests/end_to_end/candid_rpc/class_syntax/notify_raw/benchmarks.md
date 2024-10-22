# Benchmarks for canister1

## Current benchmarks Azle version: 0.25.0

| Execution | Method Name      | Instructions | Cycles    | USD           | USD/Thousand Calls | Change                     |
| --------- | ---------------- | ------------ | --------- | ------------- | ------------------ | -------------------------- |
| 0         | sendNotification | 1,612,115    | 1,234,846 | $0.0000016505 | $0.0017            | <font color="red">0</font> |

## Baseline benchmarks Azle version: 0.25.0

| Execution | Method Name      | Instructions | Cycles    | USD           | USD/Thousand Calls |
| --------- | ---------------- | ------------ | --------- | ------------- | ------------------ |
| 0         | sendNotification | 1,612,115    | 1,234,846 | $0.0000016505 | $0.0017            |

# Benchmarks for canister2

## Current benchmarks Azle version: 0.25.0

| Execution | Method Name         | Instructions | Cycles  | USD           | USD/Thousand Calls | Change                     |
| --------- | ------------------- | ------------ | ------- | ------------- | ------------------ | -------------------------- |
| 0         | receiveNotification | 906,249      | 952,499 | $0.0000012731 | $0.0013            | <font color="red">0</font> |

## Baseline benchmarks Azle version: 0.25.0

| Execution | Method Name         | Instructions | Cycles  | USD           | USD/Thousand Calls |
| --------- | ------------------- | ------------ | ------- | ------------- | ------------------ |
| 0         | receiveNotification | 906,249      | 952,499 | $0.0000012731 | $0.0013            |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions)
-   Base fee: 590,000 cycles
-   Per instruction fee: 0.4 cycles
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.336610 (as of December 18, 2023)

For the most up-to-date fee information, please refer to the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
