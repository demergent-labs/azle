# Benchmarks for factorial

## Current benchmarks Azle version: 0.24.2-rc.60

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | fac         | 1_257_707    | 1_093_082 | $0.0000014534 | $1.45             |
| 1   | fac         | 1_255_827    | 1_092_330 | $0.0000014524 | $1.45             |
| 2   | fac         | 1_715_790    | 1_276_316 | $0.0000016971 | $1.69             |
| 3   | fac         | 2_965_498    | 1_776_199 | $0.0000023618 | $2.36             |
| 4   | fac         | 5_504_413    | 2_791_765 | $0.0000037121 | $3.71             |

## Baseline benchmarks Azle version: 0.24.2-rc.60

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
