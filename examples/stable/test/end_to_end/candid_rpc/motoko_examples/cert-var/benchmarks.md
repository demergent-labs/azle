# Benchmarks for cert-var

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | set         | 2_104_740    | 1_431_896 | $0.0000019039 | $1.90             |
| 1   | inc         | 2_338_258    | 1_525_303 | $0.0000020281 | $2.02             |
| 2   | set         | 2_075_982    | 1_420_392 | $0.0000018887 | $1.88             |
| 3   | inc         | 2_341_716    | 1_526_686 | $0.0000020300 | $2.02             |
| 4   | set         | 2_080_878    | 1_422_351 | $0.0000018913 | $1.89             |
| 5   | inc         | 2_341_701    | 1_526_680 | $0.0000020300 | $2.02             |
| 6   | set         | 2_076_813    | 1_420_725 | $0.0000018891 | $1.88             |
| 7   | inc         | 2_340_008    | 1_526_003 | $0.0000020291 | $2.02             |
| 8   | set         | 2_079_231    | 1_421_692 | $0.0000018904 | $1.89             |
| 9   | inc         | 2_340_146    | 1_526_058 | $0.0000020292 | $2.02             |
| 10  | set         | 2_074_561    | 1_419_824 | $0.0000018879 | $1.88             |
| 11  | inc         | 2_338_454    | 1_525_381 | $0.0000020283 | $2.02             |
| 12  | set         | 2_079_283    | 1_421_713 | $0.0000018904 | $1.89             |

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
