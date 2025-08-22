# Benchmarks for canister1

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | balance | 2_415_588 | 7_415_588 | $0.0000101594 | $10.15 | <font color="green">-33_567</font> |
| 1 | account | 3_638_424 | 8_638_424 | $0.0000118346 | $11.83 | <font color="green">-170_209</font> |
| 2 | balance | 2_240_023 | 7_240_023 | $0.0000099188 | $9.91 | <font color="green">-126_225</font> |
| 3 | account | 3_611_116 | 8_611_116 | $0.0000117972 | $11.79 | <font color="green">-172_141</font> |
| 4 | accounts | 1_210_759 | 6_210_759 | $0.0000085087 | $8.50 | <font color="green">-62_389</font> |
| 5 | transfer | 3_608_467 | 8_608_467 | $0.0000117936 | $11.79 | <font color="green">-166_030</font> |
| 6 | balance | 2_241_198 | 7_241_198 | $0.0000099204 | $9.92 | <font color="green">-128_020</font> |
| 7 | account | 3_613_545 | 8_613_545 | $0.0000118006 | $11.80 | <font color="green">-173_283</font> |
| 8 | balance | 2_237_565 | 7_237_565 | $0.0000099155 | $9.91 | <font color="green">-123_650</font> |
| 9 | account | 3_616_094 | 8_616_094 | $0.0000118040 | $11.80 | <font color="green">-176_074</font> |
| 10 | accounts | 1_205_812 | 6_205_812 | $0.0000085020 | $8.50 | <font color="green">-64_324</font> |
| 11 | trap | 1_193_836 | 6_193_836 | $0.0000084856 | $8.48 | <font color="green">-68_821</font> |
| 12 | sendNotification | 2_766_809 | 7_766_809 | $0.0000106405 | $10.64 | <font color="green">-113_563</font> |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | balance | 2_449_155 | 7_449_155 | $0.0000102053 | $10.20 |
| 1 | account | 3_808_633 | 8_808_633 | $0.0000120678 | $12.06 |
| 2 | balance | 2_366_248 | 7_366_248 | $0.0000100918 | $10.09 |
| 3 | account | 3_783_257 | 8_783_257 | $0.0000120331 | $12.03 |
| 4 | accounts | 1_273_148 | 6_273_148 | $0.0000085942 | $8.59 |
| 5 | transfer | 3_774_497 | 8_774_497 | $0.0000120211 | $12.02 |
| 6 | balance | 2_369_218 | 7_369_218 | $0.0000100958 | $10.09 |
| 7 | account | 3_786_828 | 8_786_828 | $0.0000120380 | $12.03 |
| 8 | balance | 2_361_215 | 7_361_215 | $0.0000100849 | $10.08 |
| 9 | account | 3_792_168 | 8_792_168 | $0.0000120453 | $12.04 |
| 10 | accounts | 1_270_136 | 6_270_136 | $0.0000085901 | $8.59 |
| 11 | trap | 1_262_657 | 6_262_657 | $0.0000085798 | $8.57 |
| 12 | sendNotification | 2_880_372 | 7_880_372 | $0.0000107961 | $10.79 |

# Benchmarks for canister2

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | transfer | 2_285_235 | 7_285_235 | $0.0000099808 | $9.98 | <font color="green">-21_799</font> |
| 1 | receiveNotification | 1_490_911 | 6_490_911 | $0.0000088925 | $8.89 | <font color="green">-18_562</font> |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | transfer | 2_307_034 | 7_307_034 | $0.0000100106 | $10.01 |
| 1 | receiveNotification | 1_509_473 | 6_509_473 | $0.0000089180 | $8.91 |



---

**Note on calculations:**
- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).