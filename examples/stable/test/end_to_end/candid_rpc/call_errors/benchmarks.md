# Benchmarks for call_errors

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name | Instructions | Cycles      | USD           | USD/Million Calls |
| --- | ----------- | ------------ | ----------- | ------------- | ----------------- |
| 0   | test0       | 570_710_138  | 228_874_055 | $0.0003043270 | $304.32           |
| 1   | test1       | 883_211      | 943_284     | $0.0000012543 | $1.25             |
| 2   | test2       | 1_254_661    | 1_091_864   | $0.0000014518 | $1.45             |
| 3   | test3       | 8_682_978    | 4_063_191   | $0.0000054027 | $5.40             |
| 4   | test4       | 411_487_335  | 165_184_934 | $0.0002196415 | $219.64           |
| 5   | test5       | 8_533_650    | 4_003_460   | $0.0000053233 | $5.32             |

## Baseline benchmarks Azle version: No previous benchmarks

No benchmarks reported

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
