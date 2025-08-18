# Benchmarks for proxy

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | icrc1_transfer | 14_993_666 | 19_993_666 | $0.0000273913 | $27.39 | <font color="green">-468_083</font> |
| 1 | icrc2_approve | 18_512_535 | 23_512_535 | $0.0000322122 | $32.21 | <font color="green">-540_926</font> |
| 2 | icrc2_transfer_from | 17_443_960 | 22_443_960 | $0.0000307482 | $30.74 | <font color="green">-540_813</font> |
| 3 | icrc2_allowance | 10_077_781 | 15_077_781 | $0.0000206566 | $20.65 | <font color="green">-334_001</font> |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | icrc1_transfer | 15_461_749 | 20_461_749 | $0.0000280326 | $28.03 |
| 1 | icrc2_approve | 19_053_461 | 24_053_461 | $0.0000329532 | $32.95 |
| 2 | icrc2_transfer_from | 17_984_773 | 22_984_773 | $0.0000314891 | $31.48 |
| 3 | icrc2_allowance | 10_411_782 | 15_411_782 | $0.0000211141 | $21.11 |



---

**Note on calculations:**
- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).