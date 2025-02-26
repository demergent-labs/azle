# Benchmarks for bytes_canister

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls | Change                             |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- | ---------------------------------- |
| 0   | getBytes    | 1_975_419    | 1_380_167  | $0.0000018352 | $1.83             | <font color="green">-12_944</font> |
| 1   | getBytes    | 2_649_793    | 1_649_917  | $0.0000021938 | $2.19             | <font color="green">-10_229</font> |
| 2   | getBytes    | 9_732_337    | 4_482_934  | $0.0000059608 | $5.96             | <font color="green">-10_664</font> |
| 3   | getBytes    | 79_932_491   | 32_562_996 | $0.0000432980 | $43.29            | <font color="green">-10_665</font> |
| 4   | getBytes    | 157_927_066  | 63_760_826 | $0.0000847809 | $84.78            | <font color="green">-11_271</font> |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | getBytes    | 1_988_363    | 1_385_345  | $0.0000018421 | $1.84             |
| 1   | getBytes    | 2_660_022    | 1_654_008  | $0.0000021993 | $2.19             |
| 2   | getBytes    | 9_743_001    | 4_487_200  | $0.0000059665 | $5.96             |
| 3   | getBytes    | 79_943_156   | 32_567_262 | $0.0000433037 | $43.30            |
| 4   | getBytes    | 157_938_337  | 63_765_334 | $0.0000847869 | $84.78            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
