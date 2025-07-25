# Benchmarks for pre_and_post_upgrade

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name | Instructions  | Cycles      | USD           | USD/Million Calls | Change                              |
| --- | ----------- | ------------- | ----------- | ------------- | ----------------- | ----------------------------------- |
| 0   | postUpgrade | 1_000_713_311 | 800_875_324 | $0.0010648999 | $1_064.89         | <font color="red">+4_171_632</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name | Instructions | Cycles      | USD           | USD/Million Calls |
| --- | ----------- | ------------ | ----------- | ------------- | ----------------- |
| 0   | postUpgrade | 996_541_679  | 399_206_671 | $0.0005308131 | $530.81           |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
