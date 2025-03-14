⚠️ **WARNING: Benchmark process failed for version 0.30.0**

# Benchmarks for counter

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | set         | 1_087_730    | 1_025_092 | $0.0000013630 | $1.36             | <font color="red">+1_945</font>   |
| 1   | inc         | 944_400      | 967_760   | $0.0000012868 | $1.28             | <font color="green">-1_663</font> |
| 2   | inc         | 944_047      | 967_618   | $0.0000012866 | $1.28             | <font color="red">+2_479</font>   |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | set         | 1_085_785    | 1_024_314 | $0.0000013620 | $1.36             |
| 1   | inc         | 946_063      | 968_425   | $0.0000012877 | $1.28             |
| 2   | inc         | 941_568      | 966_627   | $0.0000012853 | $1.28             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
