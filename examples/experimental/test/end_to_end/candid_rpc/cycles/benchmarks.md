# Benchmarks for cycles

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name   | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | receiveCycles | 1_143_242    | 1_047_296 | $0.0000013926 | $1.39             | <font color="green">-10_772</font> |
| 1   | receiveCycles | 1_229_491    | 1_081_796 | $0.0000014384 | $1.43             | <font color="green">-10_701</font> |
| 2   | receiveCycles | 1_230_115    | 1_082_046 | $0.0000014388 | $1.43             | <font color="green">-11_336</font> |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name   | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | receiveCycles | 1_154_014    | 1_051_605 | $0.0000013983 | $1.39             |
| 1   | receiveCycles | 1_240_192    | 1_086_076 | $0.0000014441 | $1.44             |
| 2   | receiveCycles | 1_241_451    | 1_086_580 | $0.0000014448 | $1.44             |

# Benchmarks for intermediary

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | sendCycles       | 10_587_850   | 4_825_140 | $0.0000064158 | $6.41             | <font color="green">-92_770</font> |
| 1   | sendCyclesNotify | 1_715_751    | 1_276_300 | $0.0000016971 | $1.69             | <font color="green">-2_511</font>  |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | sendCycles       | 10_680_620   | 4_862_248 | $0.0000064652 | $6.46             |
| 1   | sendCyclesNotify | 1_718_262    | 1_277_304 | $0.0000016984 | $1.69             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
