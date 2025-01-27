# Benchmarks for wallet_backend

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | 0           | 5_391_393    | 2_746_557 | $0.0000036520 | $3.65             |
| 1   | 0           | 5_332_715    | 2_723_086 | $0.0000036208 | $3.62             |
| 2   | 2           | 5_673_296    | 2_859_318 | $0.0000038019 | $3.80             |
| 3   | 2           | 5_670_168    | 2_858_067 | $0.0000038003 | $3.80             |
| 4   | 1           | 5_668_521    | 2_857_408 | $0.0000037994 | $3.79             |
| 5   | 1           | 5_665_824    | 2_856_329 | $0.0000037980 | $3.79             |
| 6   | 0           | 5_332_037    | 2_722_814 | $0.0000036204 | $3.62             |
| 7   | 0           | 5_338_212    | 2_725_284 | $0.0000036237 | $3.62             |
| 8   | 3           | 13_770_858   | 6_098_343 | $0.0000081088 | $8.10             |
| 9   | 0           | 5_330_757    | 2_722_302 | $0.0000036198 | $3.61             |
| 10  | 0           | 5_334_525    | 2_723_810 | $0.0000036218 | $3.62             |

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
