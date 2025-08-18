# Benchmarks for server

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | 1 | 37_147_870 | 42_147_870 | $0.0000577426 | $57.74 | <font color="green">-7_707_523_728</font> |
| 1 | 3 | 1_415_967 | 6_415_967 | $0.0000087899 | $8.78 | <font color="green">-43_038_710</font> |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | init | 7_744_671_598 | 7_749_671_598 | $0.0106170501 | $10_617.05 |
| 1 | http_request_update | 44_454_677 | 49_454_677 | $0.0000677529 | $67.75 |
| 2 | candidUpdate | 1_436_014 | 6_436_014 | $0.0000088173 | $8.81 |

# Benchmarks for server_init_and_post_upgrade

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | 3 | 8_352_757_858 | 8_357_757_858 | $0.0114501283 | $11_450.12 | <font color="red">+584_343_295</font> |
| 1 | 1 | 37_622_421 | 42_622_421 | $0.0000583927 | $58.39 | <font color="green">-7_319_791</font> |
| 2 | 5 | 1_784_274 | 6_784_274 | $0.0000092945 | $9.29 | <font color="green">-14_103</font> |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | postUpgrade | 7_768_414_563 | 7_773_414_563 | $0.0106495780 | $10_649.57 |
| 1 | http_request_update | 44_942_212 | 49_942_212 | $0.0000684208 | $68.42 |
| 2 | candidUpdate | 1_798_377 | 6_798_377 | $0.0000093138 | $9.31 |



---

**Note on calculations:**
- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).