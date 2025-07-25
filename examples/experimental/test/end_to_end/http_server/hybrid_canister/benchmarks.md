# Benchmarks for server

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls | Change                                    |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- | ----------------------------------------- |
| 0   | 1           | 37_737_916   | 42_737_916 | $0.0000585509 | $58.55            | <font color="green">-7_482_868_304</font> |
| 1   | 3           | 1_463_728    | 6_463_728  | $0.0000088553 | $8.85             | <font color="green">-42_841_257</font>    |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_520_606_220 | 7_525_606_220 | $0.0103100805 | $10_310.08        |
| 1   | http_request_update | 44_304_985    | 49_304_985    | $0.0000675478 | $67.54            |
| 2   | candidUpdate        | 1_431_620     | 6_431_620     | $0.0000088113 | $8.81             |

# Benchmarks for server_init_and_post_upgrade

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                |
| --- | ----------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | 3           | 7_577_091_139 | 7_582_091_139 | $0.0103874649 | $10_387.46        | <font color="red">+31_651_708</font>  |
| 1   | 1           | 38_271_178    | 43_271_178    | $0.0000592815 | $59.28            | <font color="green">-6_436_604</font> |
| 2   | 5           | 1_830_209     | 6_830_209     | $0.0000093574 | $9.35             | <font color="red">+25_203</font>      |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade         | 7_545_439_431 | 7_550_439_431 | $0.0103441020 | $10_344.10        |
| 1   | http_request_update | 44_707_782    | 49_707_782    | $0.0000680997 | $68.09            |
| 2   | candidUpdate        | 1_805_006     | 6_805_006     | $0.0000093229 | $9.32             |

---

**Note on calculations:**

- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).
