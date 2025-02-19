# Benchmarks for bitcoin

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name              | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | ------------------------ | ------------ | ---------- | ------------- | ----------------- |
| 0   | getBalance               | 159_472_978  | 64_379_191 | $0.0000856031 | $85.60            |
| 1   | getUtxos                 | 161_514_290  | 65_195_716 | $0.0000866888 | $86.68            |
| 2   | getCurrentFeePercentiles | 157_762_897  | 63_695_158 | $0.0000846935 | $84.69            |
| 3   | sendTransaction          | 158_276_458  | 63_900_583 | $0.0000849667 | $84.96            |
| 4   | getCurrentFeePercentiles | 157_979_942  | 63_781_976 | $0.0000848090 | $84.80            |

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
