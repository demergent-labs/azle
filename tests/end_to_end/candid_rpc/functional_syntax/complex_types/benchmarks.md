# Benchmarks for complex_types

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name    | Instructions | Cycles     | USD           | USD/Million Calls | Change                              |
| --- | -------------- | ------------ | ---------- | ------------- | ----------------- | ----------------------------------- |
| 0   | createUser     | 80_663_817   | 32_855_526 | $0.0000436870 | $43.68            | <font color="red">+81_739</font>    |
| 1   | createThread   | 164_338_327  | 66_325_330 | $0.0000881908 | $88.19            | <font color="red">+67_708</font>    |
| 2   | createPost     | 86_890_541   | 35_346_216 | $0.0000469988 | $46.99            | <font color="red">+23_130</font>    |
| 3   | createReaction | 173_015_092  | 69_796_036 | $0.0000928057 | $92.80            | <font color="green">-102_375</font> |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name    | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | -------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | createUser     | 80_582_078   | 32_822_831 | $0.0000436435 | $43.64            |
| 1   | createThread   | 164_270_619  | 66_298_247 | $0.0000881548 | $88.15            |
| 2   | createPost     | 86_867_411   | 35_336_964 | $0.0000469865 | $46.98            |
| 3   | createReaction | 173_117_467  | 69_836_986 | $0.0000928601 | $92.86            |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
