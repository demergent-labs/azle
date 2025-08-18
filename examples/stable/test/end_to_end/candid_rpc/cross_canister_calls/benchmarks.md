# Benchmarks for canister1

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | balance | 2_379_492 | 7_379_492 | $0.0000101099 | $10.10 | <font color="green">-69_663</font> |
| 1 | account | 3_690_838 | 8_690_838 | $0.0000119064 | $11.90 | <font color="green">-117_795</font> |
| 2 | balance | 2_300_882 | 7_300_882 | $0.0000100022 | $10.00 | <font color="green">-65_366</font> |
| 3 | account | 3_678_275 | 8_678_275 | $0.0000118892 | $11.88 | <font color="green">-104_982</font> |
| 4 | accounts | 1_268_502 | 6_268_502 | $0.0000085878 | $8.58 | <font color="green">-4_646</font> |
| 5 | transfer | 3_672_421 | 8_672_421 | $0.0000118812 | $11.88 | <font color="green">-102_076</font> |
| 6 | balance | 2_299_903 | 7_299_903 | $0.0000100009 | $10.00 | <font color="green">-69_315</font> |
| 7 | account | 3_663_358 | 8_663_358 | $0.0000118688 | $11.86 | <font color="green">-123_470</font> |
| 8 | balance | 2_299_158 | 7_299_158 | $0.0000099998 | $9.99 | <font color="green">-62_057</font> |
| 9 | account | 3_670_035 | 8_670_035 | $0.0000118779 | $11.87 | <font color="green">-122_133</font> |
| 10 | accounts | 1_265_380 | 6_265_380 | $0.0000085836 | $8.58 | <font color="green">-4_756</font> |
| 11 | trap | 1_250_551 | 6_250_551 | $0.0000085633 | $8.56 | <font color="green">-12_106</font> |
| 12 | sendNotification | 2_761_035 | 7_761_035 | $0.0000106326 | $10.63 | <font color="green">-119_337</font> |

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
| 0 | transfer | 2_283_471 | 7_283_471 | $0.0000099784 | $9.97 | <font color="green">-23_563</font> |
| 1 | receiveNotification | 1_492_353 | 6_492_353 | $0.0000088945 | $8.89 | <font color="green">-17_120</font> |

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