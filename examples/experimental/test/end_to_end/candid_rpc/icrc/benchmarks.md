# Benchmarks for proxy

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 5_614_512_270 | 4_246_394_908 | $0.0056463039 | $5_646.30         |
| 1   | icrc1_transfer      | 96_179_071    | 39_061_628    | $0.0000519391 | $51.93            |
| 2   | icrc2_approve       | 103_767_841   | 42_097_136    | $0.0000559753 | $55.97            |
| 3   | icrc2_transfer_from | 101_442_200   | 41_166_880    | $0.0000547384 | $54.73            |
| 4   | icrc2_allowance     | 87_624_678    | 35_639_871    | $0.0000473893 | $47.38            |

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
