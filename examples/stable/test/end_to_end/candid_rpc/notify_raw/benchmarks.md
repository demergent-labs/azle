# Benchmarks for canister1

## Current benchmarks Azle version: 0.33.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | sendNotification | 1_699_495    | 6_699_495 | $0.0000091783 | $9.17             | <font color="green">-49_857</font> |

## Baseline benchmarks Azle version: 0.32.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | sendNotification | 1_749_352    | 6_749_352 | $0.0000092466 | $9.24             |

# Benchmarks for canister2

## Current benchmarks Azle version: 0.33.0

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | receiveNotification | 962_604      | 5_962_604 | $0.0000081688 | $8.16             | <font color="green">-19_128</font> |

## Baseline benchmarks Azle version: 0.32.0

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | receiveNotification | 981_732      | 5_981_732 | $0.0000081950 | $8.19             |

---

**Note on calculations:**

- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).
