# Benchmarks for cycles

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name   | Instructions | Cycles    | USD           | USD/Million Calls | Change                          |
| --- | ------------- | ------------ | --------- | ------------- | ----------------- | ------------------------------- |
| 0   | receiveCycles | 1_144_745    | 1_047_898 | $0.0000013934 | $1.39             | <font color="red">+1_503</font> |
| 1   | receiveCycles | 1_229_796    | 1_081_918 | $0.0000014386 | $1.43             | <font color="red">+305</font>   |
| 2   | receiveCycles | 1_232_229    | 1_082_891 | $0.0000014399 | $1.43             | <font color="red">+2_114</font> |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name   | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | receiveCycles | 1_143_242    | 1_047_296 | $0.0000013926 | $1.39             |
| 1   | receiveCycles | 1_229_491    | 1_081_796 | $0.0000014384 | $1.43             |
| 2   | receiveCycles | 1_230_115    | 1_082_046 | $0.0000014388 | $1.43             |

# Benchmarks for intermediary

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | sendCycles       | 10_584_784   | 4_823_913 | $0.0000064142 | $6.41             | <font color="green">-3_066</font> |
| 1   | sendCyclesNotify | 1_719_849    | 1_277_939 | $0.0000016992 | $1.69             | <font color="red">+4_098</font>   |

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
