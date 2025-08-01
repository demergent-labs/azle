⚠️ **WARNING: Benchmark process failed for version 0.32.0**

# Benchmarks for canister1

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | sendNotification | 1_749_352    | 1_289_740 | $0.0000017149 | $1.71             | <font color="green">-38_994</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | sendNotification | 1_788_346    | 1_305_338 | $0.0000017357 | $1.73             |

# Benchmarks for canister2

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name         | Instructions | Cycles  | USD           | USD/Million Calls | Change                            |
| --- | ------------------- | ------------ | ------- | ------------- | ----------------- | --------------------------------- |
| 0   | receiveNotification | 981_732      | 982_692 | $0.0000013067 | $1.30             | <font color="green">-1_559</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions | Cycles  | USD           | USD/Million Calls |
| --- | ------------------- | ------------ | ------- | ------------- | ----------------- |
| 0   | receiveNotification | 983_291      | 983_316 | $0.0000013075 | $1.30             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
