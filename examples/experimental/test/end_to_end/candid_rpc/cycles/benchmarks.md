# Benchmarks for cycles

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name   | Instructions | Cycles    | USD           | USD/Million Calls | Change                          |
| --- | ------------- | ------------ | --------- | ------------- | ----------------- | ------------------------------- |
| 0   | receiveCycles | 1_147_115    | 1_048_846 | $0.0000013946 | $1.39             | <font color="red">+2_349</font> |
| 1   | receiveCycles | 1_232_428    | 1_082_971 | $0.0000014400 | $1.43             | <font color="red">+2_166</font> |
| 2   | receiveCycles | 1_234_081    | 1_083_632 | $0.0000014409 | $1.44             | <font color="red">+2_400</font> |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name   | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | receiveCycles | 1_144_766    | 1_047_906 | $0.0000013934 | $1.39             |
| 1   | receiveCycles | 1_230_262    | 1_082_104 | $0.0000014388 | $1.43             |
| 2   | receiveCycles | 1_231_681    | 1_082_672 | $0.0000014396 | $1.43             |

# Benchmarks for intermediary

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls | Change                          |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- | ------------------------------- |
| 0   | sendCycles       | 10_588_504   | 4_825_401 | $0.0000064162 | $6.41             | <font color="red">+8_102</font> |
| 1   | sendCyclesNotify | 1_724_111    | 1_279_644 | $0.0000017015 | $1.70             | <font color="red">+4_009</font> |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | sendCycles       | 10_580_402   | 4_822_160 | $0.0000064119 | $6.41             |
| 1   | sendCyclesNotify | 1_720_102    | 1_278_040 | $0.0000016994 | $1.69             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
