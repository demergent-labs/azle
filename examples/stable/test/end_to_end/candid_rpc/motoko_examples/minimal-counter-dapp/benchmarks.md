# Benchmarks for minimal_dapp

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | count       | 1_242_570    | 1_087_028 | $0.0000014454 | $1.44             | <font color="red">+8_154</font>    |
| 1   | count       | 1_187_519    | 1_065_007 | $0.0000014161 | $1.41             | <font color="green">-13_667</font> |
| 2   | reset       | 1_188_012    | 1_065_204 | $0.0000014164 | $1.41             | <font color="green">-8_572</font>  |
| 3   | count       | 1_193_316    | 1_067_326 | $0.0000014192 | $1.41             | <font color="green">-7_795</font>  |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | count       | 1_234_416    | 1_083_766 | $0.0000014411 | $1.44             |
| 1   | count       | 1_201_186    | 1_070_474 | $0.0000014234 | $1.42             |
| 2   | reset       | 1_196_584    | 1_068_633 | $0.0000014209 | $1.42             |
| 3   | count       | 1_201_111    | 1_070_444 | $0.0000014233 | $1.42             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
