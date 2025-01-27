# Benchmarks for bitcoin

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name              | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ------------------------ | ------------ | ---------- | ------------- | ----------------- |
| 0   | getBalance               | 159_550_119  | 64_410_047 | $0.0000856441 | $85.64            |
| 1   | getUtxos                 | 161_506_535  | 65_192_614 | $0.0000866847 | $86.68            |
| 2   | getCurrentFeePercentiles | 158_026_106  | 63_800_442 | $0.0000848335 | $84.83            |
| 3   | sendTransaction          | 158_344_929  | 63_927_971 | $0.0000850031 | $85.00            |
| 4   | getCurrentFeePercentiles | 157_962_325  | 63_774_930 | $0.0000847996 | $84.79            |

## Baseline benchmarks Azle version: No previous benchmarks

No benchmarks reported

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
