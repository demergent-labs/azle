# Benchmarks for canister

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name     | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | --------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | measureSum      | 938_717      | 965_486   | $0.0000012838 | $1.28             | <font color="green">-67_344</font> |
| 1   | measureSumTimer | 1_248_396    | 1_089_358 | $0.0000014485 | $1.44             | <font color="red">+1_127</font>    |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name     | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | --------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | measureSum      | 1_006_061    | 992_424   | $0.0000013196 | $1.31             |
| 1   | measureSumTimer | 1_247_269    | 1_088_907 | $0.0000014479 | $1.44             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
