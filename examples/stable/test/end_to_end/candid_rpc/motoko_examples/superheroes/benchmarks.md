⚠️ **WARNING: Benchmark process failed for version 0.32.0**

# Benchmarks for superheroes

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                           |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | -------------------------------- |
| 0   | create      | 3_750_287    | 2_090_114 | $0.0000027792 | $2.77             | <font color="red">+6_135</font>  |
| 1   | create      | 4_826_620    | 2_520_648 | $0.0000033516 | $3.35             | <font color="red">+16_622</font> |
| 2   | update      | 5_173_564    | 2_659_425 | $0.0000035362 | $3.53             | <font color="red">+14_550</font> |
| 3   | update      | 3_610_054    | 2_034_021 | $0.0000027046 | $2.70             | <font color="red">+909</font>    |
| 4   | deleteHero  | 1_282_043    | 1_102_817 | $0.0000014664 | $1.46             | <font color="red">+2_372</font>  |
| 5   | deleteHero  | 1_269_661    | 1_097_864 | $0.0000014598 | $1.45             | <font color="red">+5_300</font>  |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | create      | 3_744_152    | 2_087_660 | $0.0000027759 | $2.77             |
| 1   | create      | 4_809_998    | 2_513_999 | $0.0000033428 | $3.34             |
| 2   | update      | 5_159_014    | 2_653_605 | $0.0000035284 | $3.52             |
| 3   | update      | 3_609_145    | 2_033_658 | $0.0000027041 | $2.70             |
| 4   | deleteHero  | 1_279_671    | 1_101_868 | $0.0000014651 | $1.46             |
| 5   | deleteHero  | 1_264_361    | 1_095_744 | $0.0000014570 | $1.45             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
