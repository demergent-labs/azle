# Benchmarks for simple_erc20

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | initializeSupply | 2_230_721 | 7_230_721 | $0.0000099061 | $9.90 | <font color="green">-2_615</font> |
| 1 | transfer | 1_814_699 | 6_814_699 | $0.0000093361 | $9.33 | <font color="green">-19_487</font> |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | initializeSupply | 2_233_336 | 7_233_336 | $0.0000099097 | $9.90 |
| 1 | transfer | 1_834_186 | 6_834_186 | $0.0000093628 | $9.36 |



---

**Note on calculations:**
- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).