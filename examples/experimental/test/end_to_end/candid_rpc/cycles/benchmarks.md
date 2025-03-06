# Benchmarks for cycles

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name   | Instructions | Cycles    | USD           | USD/Million Calls | Change                          |
| --- | ------------- | ------------ | --------- | ------------- | ----------------- | ------------------------------- |
| 0   | receiveCycles | 1_146_114    | 1_048_445 | $0.0000013941 | $1.39             | <font color="red">+2_872</font> |
| 1   | receiveCycles | 1_230_393    | 1_082_157 | $0.0000014389 | $1.43             | <font color="red">+902</font>   |
| 2   | receiveCycles | 1_230_757    | 1_082_302 | $0.0000014391 | $1.43             | <font color="red">+642</font>   |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name   | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | receiveCycles | 1_143_242    | 1_047_296 | $0.0000013926 | $1.39             |
| 1   | receiveCycles | 1_229_491    | 1_081_796 | $0.0000014384 | $1.43             |
| 2   | receiveCycles | 1_230_115    | 1_082_046 | $0.0000014388 | $1.43             |

# Benchmarks for intermediary

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | sendCycles       | 10_570_418   | 4_818_167 | $0.0000064066 | $6.40             | <font color="green">-17_432</font> |
| 1   | sendCyclesNotify | 1_715_012    | 1_276_004 | $0.0000016967 | $1.69             | <font color="green">-739</font>    |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | sendCycles       | 10_587_850   | 4_825_140 | $0.0000064158 | $6.41             |
| 1   | sendCyclesNotify | 1_715_751    | 1_276_300 | $0.0000016971 | $1.69             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
