# Benchmarks for server

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | 1 | 37_194_658 | 42_194_658 | $0.0000578067 | $57.80 | <font color="green">-7_707_476_940</font> |
| 1 | 3 | 1_418_948 | 6_418_948 | $0.0000087940 | $8.79 | <font color="green">-43_035_729</font> |

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
| 0 | 3 | 8_336_151_935 | 8_341_151_935 | $0.0114273782 | $11_427.37 | <font color="red">+567_737_372</font> |
| 1 | 1 | 37_653_007 | 42_653_007 | $0.0000584346 | $58.43 | <font color="green">-7_289_205</font> |
| 2 | 5 | 1_786_050 | 6_786_050 | $0.0000092969 | $9.29 | <font color="green">-12_327</font> |

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