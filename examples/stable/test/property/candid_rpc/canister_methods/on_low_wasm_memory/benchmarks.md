# Benchmarks for canister

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | addRandomBytes | 1_153_844 | 6_153_844 | $0.0000084308 | $8.43 | <font color="red">+12_263</font> |
| 1 | onLowWasmMemory | 101_171 | 5_101_171 | $0.0000069886 | $6.98 | <font color="green">-962_836</font> |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | addRandomBytes | 1_141_581 | 6_141_581 | $0.0000084140 | $8.41 |
| 1 | addRandomBytes | 1_064_007 | 6_064_007 | $0.0000083077 | $8.30 |
| 2 | addRandomBytes | 1_065_548 | 6_065_548 | $0.0000083098 | $8.30 |
| 3 | addRandomBytes | 1_068_380 | 6_068_380 | $0.0000083137 | $8.31 |
| 4 | onLowWasmMemory | 101_838 | 5_101_838 | $0.0000069895 | $6.98 |



---

**Note on calculations:**
- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).