# Benchmarks for wallet_backend

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | 0           | 5_385_879    | 2_744_351 | $0.0000036491 | $3.64             |
| 1   | 0           | 5_335_061    | 2_724_024 | $0.0000036221 | $3.62             |
| 2   | 2           | 5_650_439    | 2_850_175 | $0.0000037898 | $3.78             |
| 3   | 2           | 5_657_992    | 2_853_196 | $0.0000037938 | $3.79             |
| 4   | 1           | 5_654_566    | 2_851_826 | $0.0000037920 | $3.79             |
| 5   | 1           | 5_654_927    | 2_851_970 | $0.0000037922 | $3.79             |
| 6   | 0           | 5_329_979    | 2_721_991 | $0.0000036193 | $3.61             |
| 7   | 0           | 5_327_008    | 2_720_803 | $0.0000036178 | $3.61             |
| 8   | 3           | 13_762_824   | 6_095_129 | $0.0000081045 | $8.10             |
| 9   | 0           | 5_324_938    | 2_719_975 | $0.0000036167 | $3.61             |
| 10  | 0           | 5_327_302    | 2_720_920 | $0.0000036179 | $3.61             |

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
