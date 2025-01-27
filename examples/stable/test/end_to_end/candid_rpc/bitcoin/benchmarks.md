# Benchmarks for bitcoin

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name              | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------------ | ------------ | --------- | ------------- | ----------------- |
| 0   | getBalance               | 9_245_771    | 4_288_308 | $0.0000057020 | $5.70             |
| 1   | getUtxos                 | 11_374_859   | 5_139_943 | $0.0000068344 | $6.83             |
| 2   | getCurrentFeePercentiles | 5_499_129    | 2_789_651 | $0.0000037093 | $3.70             |
| 3   | sendTransaction          | 7_148_450    | 3_449_380 | $0.0000045865 | $4.58             |
| 4   | getCurrentFeePercentiles | 5_479_557    | 2_781_822 | $0.0000036989 | $3.69             |

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
