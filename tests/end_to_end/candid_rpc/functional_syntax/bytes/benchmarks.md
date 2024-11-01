# Benchmarks for bytes_canister

## Current benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | getBytes    | 1_970_302    | 1_378_120  | $0.0000018324 | $1.83             |
| 1   | getBytes    | 2_646_082    | 1_648_432  | $0.0000021919 | $2.19             |
| 2   | getBytes    | 9_729_760    | 4_481_904  | $0.0000059595 | $5.95             |
| 3   | getBytes    | 79_926_932   | 32_560_772 | $0.0000432951 | $43.29            |
| 4   | getBytes    | 157_922_525  | 63_759_010 | $0.0000847784 | $84.77            |

## Baseline benchmarks Azle version: No previous benchmarks

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
