# Benchmarks for complex_types

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | createUser | 18_685_063 | 23_685_063 | $0.0000324485 | $32.44 | <font color="green">-965_095</font> |
| 1 | createThread | 19_897_990 | 24_897_990 | $0.0000341102 | $34.11 | <font color="green">-974_911</font> |
| 2 | createPost | 22_340_240 | 27_340_240 | $0.0000374561 | $37.45 | <font color="green">-1_071_762</font> |
| 3 | createReaction | 25_292_131 | 30_292_131 | $0.0000415002 | $41.50 | <font color="green">-1_190_943</font> |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | createUser | 19_650_158 | 24_650_158 | $0.0000337707 | $33.77 |
| 1 | createThread | 20_872_901 | 25_872_901 | $0.0000354459 | $35.44 |
| 2 | createPost | 23_412_002 | 28_412_002 | $0.0000389244 | $38.92 |
| 3 | createReaction | 26_483_074 | 31_483_074 | $0.0000431318 | $43.13 |



---

**Note on calculations:**
- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).