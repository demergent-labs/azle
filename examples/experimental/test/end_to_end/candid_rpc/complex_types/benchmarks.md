# Benchmarks for complex_types

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name    | Instructions | Cycles     | USD           | USD/Million Calls | Change                             |
| --- | -------------- | ------------ | ---------- | ------------- | ----------------- | ---------------------------------- |
| 0   | createUser     | 80_708_323   | 32_873_329 | $0.0000437107 | $43.71            | <font color="red">+126_245</font>  |
| 1   | createThread   | 164_418_950  | 66_357_580 | $0.0000882337 | $88.23            | <font color="red">+148_331</font>  |
| 2   | createPost     | 86_819_021   | 35_317_608 | $0.0000469608 | $46.96            | <font color="green">-48_390</font> |
| 3   | createReaction | 173_118_785  | 69_837_514 | $0.0000928608 | $92.86            | <font color="red">+1_318</font>    |

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
