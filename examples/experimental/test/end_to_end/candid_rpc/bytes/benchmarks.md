# Benchmarks for bytes_canister

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls | Change                          |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- | ------------------------------- |
| 0   | getBytes    | 1_973_945    | 1_379_578  | $0.0000018344 | $1.83             | <font color="red">+3_643</font> |
| 1   | getBytes    | 2_645_466    | 1_648_186  | $0.0000021915 | $2.19             | <font color="green">-616</font> |
| 2   | getBytes    | 9_731_416    | 4_482_566  | $0.0000059603 | $5.96             | <font color="red">+1_656</font> |
| 3   | getBytes    | 79_931_211   | 32_562_484 | $0.0000432974 | $43.29            | <font color="red">+4_279</font> |
| 4   | getBytes    | 157_924_895  | 63_759_958 | $0.0000847797 | $84.77            | <font color="red">+2_370</font> |

## Baseline benchmarks Azle version: 0.25.0-alpha

| Id  | Method Name | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ----------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | getBytes    | 1_970_302    | 1_378_120  | $0.0000018324 | $1.83             |
| 1   | getBytes    | 2_646_082    | 1_648_432  | $0.0000021919 | $2.19             |
| 2   | getBytes    | 9_729_760    | 4_481_904  | $0.0000059595 | $5.95             |
| 3   | getBytes    | 79_926_932   | 32_560_772 | $0.0000432951 | $43.29            |
| 4   | getBytes    | 157_922_525  | 63_759_010 | $0.0000847784 | $84.77            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
