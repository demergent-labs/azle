# Benchmarks for minimal_dapp

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | count       | 1_233_969    | 1_083_587 | $0.0000014408 | $1.44             | <font color="green">-413</font>   |
| 1   | count       | 1_178_543    | 1_061_417 | $0.0000014113 | $1.41             | <font color="green">-594</font>   |
| 2   | reset       | 1_179_684    | 1_061_873 | $0.0000014119 | $1.41             | <font color="green">-633</font>   |
| 3   | count       | 1_186_833    | 1_064_733 | $0.0000014157 | $1.41             | <font color="green">-1_816</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | count       | 1_234_382    | 1_083_752 | $0.0000014410 | $1.44             |
| 1   | count       | 1_179_137    | 1_061_654 | $0.0000014116 | $1.41             |
| 2   | reset       | 1_180_317    | 1_062_126 | $0.0000014123 | $1.41             |
| 3   | count       | 1_188_649    | 1_065_459 | $0.0000014167 | $1.41             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
