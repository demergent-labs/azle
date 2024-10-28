# Benchmarks for stable_b_tree_map_instruction_threshold

## Current benchmarks Azle version: 0.24.2-rc.85

| Id  | Method Name        | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------ | -------------- | -------------- | ------------- | ----------------- |
| 0   | insertSmallRecord  | 17_354_104_986 | 13_742_231_994 | $0.0182726336 | $18_272.63        |
| 1   | insertMediumRecord | 15_820_926_827 | 12_328_960_730 | $0.0163934492 | $16_393.44        |
| 2   | insertLargeRecord  | 18_222_081_461 | 14_489_422_584 | $0.0192661505 | $19_266.15        |

## Baseline benchmarks Azle version: 0.24.2-rc.85

No benchmarks reported

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
