# Benchmarks for bytes_canister

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls | Change                           |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- | -------------------------------- |
| 0   | getBytes    | 1_988_363    | 1_385_345  | $0.0000018421 | $1.84             | <font color="red">+19_393</font> |
| 1   | getBytes    | 2_660_022    | 1_654_008  | $0.0000021993 | $2.19             | <font color="red">+8_731</font>  |
| 2   | getBytes    | 9_743_001    | 4_487_200  | $0.0000059665 | $5.96             | <font color="red">+3_635</font>  |
| 3   | getBytes    | 79_943_156   | 32_567_262 | $0.0000433037 | $43.30            | <font color="red">+5_222</font>  |
| 4   | getBytes    | 157_938_337  | 63_765_334 | $0.0000847869 | $84.78            | <font color="red">+9_664</font>  |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | getBytes    | 1_968_970    | 1_377_588  | $0.0000018317 | $1.83             |
| 1   | getBytes    | 2_651_291    | 1_650_516  | $0.0000021946 | $2.19             |
| 2   | getBytes    | 9_739_366    | 4_485_746  | $0.0000059646 | $5.96             |
| 3   | getBytes    | 79_937_934   | 32_565_173 | $0.0000433009 | $43.30            |
| 4   | getBytes    | 157_928_673  | 63_761_469 | $0.0000847817 | $84.78            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
