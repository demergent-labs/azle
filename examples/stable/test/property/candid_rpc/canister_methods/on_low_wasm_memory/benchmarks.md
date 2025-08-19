# Benchmarks for canister

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | addRandomBytes | 1_153_872 | 6_153_872 | $0.0000084308 | $8.43 | <font color="red">+12_291</font> |
| 1 | addRandomBytes | 1_073_810 | 6_073_810 | $0.0000083211 | $8.32 | <font color="red">+9_803</font> |
| 2 | addRandomBytes | 1_075_376 | 6_075_376 | $0.0000083233 | $8.32 | <font color="red">+9_828</font> |
| 3 | addRandomBytes | 1_076_547 | 6_076_547 | $0.0000083249 | $8.32 | <font color="red">+8_167</font> |
| 4 | addRandomBytes | 1_078_835 | 6_078_835 | $0.0000083280 | $8.32 | <font color="red">+976_997</font> |
| 5 | addRandomBytes | 1_077_564 | 6_077_564 | $0.0000083263 | $8.32 |  |
| 6 | addRandomBytes | 1_077_869 | 6_077_869 | $0.0000083267 | $8.32 |  |
| 7 | addRandomBytes | 1_073_785 | 6_073_785 | $0.0000083211 | $8.32 |  |
| 8 | addRandomBytes | 1_076_134 | 6_076_134 | $0.0000083243 | $8.32 |  |
| 9 | addRandomBytes | 1_076_802 | 6_076_802 | $0.0000083252 | $8.32 |  |
| 10 | addRandomBytes | 1_076_265 | 6_076_265 | $0.0000083245 | $8.32 |  |
| 11 | addRandomBytes | 1_077_201 | 6_077_201 | $0.0000083258 | $8.32 |  |
| 12 | addRandomBytes | 1_079_009 | 6_079_009 | $0.0000083282 | $8.32 |  |
| 13 | onLowWasmMemory | 101_234 | 5_101_234 | $0.0000069887 | $6.98 |  |

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