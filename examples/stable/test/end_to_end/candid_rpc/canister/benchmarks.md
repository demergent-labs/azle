# Benchmarks for canister

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | canisterNestedReturnType | 6_196_944 | 11_196_944 | $0.0000153398 | $15.33 | <font color="green">-299_379</font> |
| 1 | canisterList | 7_557_936 | 12_557_936 | $0.0000172044 | $17.20 | <font color="red">+584_683</font> |
| 2 | canisterCrossCanisterCall | 2_559_879 | 7_559_879 | $0.0000103570 | $10.35 | <font color="red">+430_169</font> |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | canisterNestedReturnType | 6_496_323 | 11_496_323 | $0.0000157500 | $15.74 |
| 1 | canisterList | 6_973_253 | 11_973_253 | $0.0000164034 | $16.40 |
| 2 | canisterCrossCanisterCall | 2_129_710 | 7_129_710 | $0.0000097677 | $9.76 |

# Benchmarks for some_canister

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | update1 | 1_588_277 | 6_588_277 | $0.0000090259 | $9.02 | <font color="green">-37_891</font> |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | update1 | 1_626_168 | 6_626_168 | $0.0000090779 | $9.07 |



---

**Note on calculations:**
- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).