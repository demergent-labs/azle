# Benchmarks for bytes_canister

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | getBytes | 1_966_136 | 6_966_136 | $0.0000095436 | $9.54 | <font color="green">-51_177</font> |
| 1 | getBytes | 2_585_082 | 7_585_082 | $0.0000103916 | $10.39 | <font color="green">-38_262</font> |
| 2 | getBytes | 9_484_935 | 14_484_935 | $0.0000198444 | $19.84 | <font color="red">+134_181</font> |
| 3 | getBytes | 77_888_839 | 82_888_839 | $0.0001135577 | $113.55 | <font color="red">+1_937_001</font> |
| 4 | getBytes | 153_880_149 | 158_880_149 | $0.0002176658 | $217.66 | <font color="red">+3_933_916</font> |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | getBytes | 2_017_313 | 7_017_313 | $0.0000096137 | $9.61 |
| 1 | getBytes | 2_623_344 | 7_623_344 | $0.0000104440 | $10.44 |
| 2 | getBytes | 9_350_754 | 14_350_754 | $0.0000196605 | $19.66 |
| 3 | getBytes | 75_951_838 | 80_951_838 | $0.0001109040 | $110.90 |
| 4 | getBytes | 149_946_233 | 154_946_233 | $0.0002122763 | $212.27 |



---

**Note on calculations:**
- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).