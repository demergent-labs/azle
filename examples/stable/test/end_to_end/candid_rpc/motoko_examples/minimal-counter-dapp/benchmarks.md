# Benchmarks for minimal_dapp

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | count | 1_206_300 | 6_206_300 | $0.0000085026 | $8.50 | <font color="green">-28_984</font> |
| 1 | count | 1_151_475 | 6_151_475 | $0.0000084275 | $8.42 | <font color="green">-35_055</font> |
| 2 | reset | 1_149_110 | 6_149_110 | $0.0000084243 | $8.42 | <font color="green">-36_826</font> |
| 3 | count | 1_164_748 | 6_164_748 | $0.0000084457 | $8.44 | <font color="green">-28_537</font> |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | count | 1_235_284 | 6_235_284 | $0.0000085423 | $8.54 |
| 1 | count | 1_186_530 | 6_186_530 | $0.0000084755 | $8.47 |
| 2 | reset | 1_185_936 | 6_185_936 | $0.0000084747 | $8.47 |
| 3 | count | 1_193_285 | 6_193_285 | $0.0000084848 | $8.48 |



---

**Note on calculations:**
- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).