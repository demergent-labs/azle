# Benchmarks for counter

## Current benchmarks Azle version: 0.25.0-dontmerge

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls | Change                           |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- | -------------------------------- |
| 0   | incrementCount | 1_505_115    | 1_192_046 | $0.0000015850 | $1.58             | <font color="red">+7_023</font>  |
| 1   | incrementCount | 1_482_732    | 1_183_092 | $0.0000015731 | $1.57             | <font color="red">+10_800</font> |
| 2   | incrementCount | 1_482_565    | 1_183_026 | $0.0000015730 | $1.57             | <font color="red">+15_548</font> |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | incrementCount | 1_498_092    | 1_189_236 | $0.0000015813 | $1.58             |
| 1   | incrementCount | 1_471_932    | 1_178_772 | $0.0000015674 | $1.56             |
| 2   | incrementCount | 1_467_017    | 1_176_806 | $0.0000015648 | $1.56             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
