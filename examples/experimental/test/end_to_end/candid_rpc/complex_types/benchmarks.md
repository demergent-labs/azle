# Benchmarks for complex_types

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name    | Instructions | Cycles     | USD           | USD/Million Calls | Change                             |
| --- | -------------- | ------------ | ---------- | ------------- | ----------------- | ---------------------------------- |
| 0   | createUser     | 80_696_805   | 32_868_722 | $0.0000437046 | $43.70            | <font color="red">+114_727</font>  |
| 1   | createThread   | 164_294_482  | 66_307_792 | $0.0000881675 | $88.16            | <font color="red">+23_863</font>   |
| 2   | createPost     | 86_849_221   | 35_329_688 | $0.0000469768 | $46.97            | <font color="green">-18_190</font> |
| 3   | createReaction | 173_151_893  | 69_850_757 | $0.0000928785 | $92.87            | <font color="red">+34_426</font>   |

## Baseline benchmarks Azle version: 0.25.0-alpha

| Id  | Method Name    | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | -------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | createUser     | 80_582_078   | 32_822_831 | $0.0000436435 | $43.64            |
| 1   | createThread   | 164_270_619  | 66_298_247 | $0.0000881548 | $88.15            |
| 2   | createPost     | 86_867_411   | 35_336_964 | $0.0000469865 | $46.98            |
| 3   | createReaction | 173_117_467  | 69_836_986 | $0.0000928601 | $92.86            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
