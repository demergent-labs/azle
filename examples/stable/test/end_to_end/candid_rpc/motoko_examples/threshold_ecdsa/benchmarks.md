# Benchmarks for threshold_ecdsa

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | publicKey | 8_820_080 | 13_820_080 | $0.0000189335 | $18.93 | <font color="green">-425_911</font> |
| 1 | sign | 8_917_903 | 13_917_903 | $0.0000190675 | $19.06 | <font color="green">-419_867</font> |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | publicKey | 9_245_991 | 14_245_991 | $0.0000195170 | $19.51 |
| 1 | sign | 9_337_770 | 14_337_770 | $0.0000196427 | $19.64 |



---

**Note on calculations:**
- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).