# Benchmarks for cert-var

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | set         | 2_083_178    | 1_423_271 | $0.0000018925 | $1.89             | <font color="green">-21_562</font> |
| 1   | inc         | 2_326_684    | 1_520_673 | $0.0000020220 | $2.02             | <font color="green">-11_574</font> |
| 2   | set         | 2_062_558    | 1_415_023 | $0.0000018815 | $1.88             | <font color="green">-13_424</font> |
| 3   | inc         | 2_324_813    | 1_519_925 | $0.0000020210 | $2.02             | <font color="green">-16_903</font> |
| 4   | set         | 2_061_503    | 1_414_601 | $0.0000018810 | $1.88             | <font color="green">-19_375</font> |
| 5   | inc         | 2_323_798    | 1_519_519 | $0.0000020205 | $2.02             | <font color="green">-17_903</font> |
| 6   | set         | 2_064_166    | 1_415_666 | $0.0000018824 | $1.88             | <font color="green">-12_647</font> |
| 7   | inc         | 2_321_713    | 1_518_685 | $0.0000020193 | $2.01             | <font color="green">-18_295</font> |
| 8   | set         | 2_061_742    | 1_414_696 | $0.0000018811 | $1.88             | <font color="green">-17_489</font> |
| 9   | inc         | 2_325_626    | 1_520_250 | $0.0000020214 | $2.02             | <font color="green">-14_520</font> |
| 10  | set         | 2_063_056    | 1_415_222 | $0.0000018818 | $1.88             | <font color="green">-11_505</font> |
| 11  | inc         | 2_324_548    | 1_519_819 | $0.0000020209 | $2.02             | <font color="green">-13_906</font> |
| 12  | set         | 2_044_753    | 1_407_901 | $0.0000018720 | $1.87             | <font color="green">-34_530</font> |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | set         | 2_104_740    | 1_431_896 | $0.0000019039 | $1.90             |
| 1   | inc         | 2_338_258    | 1_525_303 | $0.0000020281 | $2.02             |
| 2   | set         | 2_075_982    | 1_420_392 | $0.0000018887 | $1.88             |
| 3   | inc         | 2_341_716    | 1_526_686 | $0.0000020300 | $2.02             |
| 4   | set         | 2_080_878    | 1_422_351 | $0.0000018913 | $1.89             |
| 5   | inc         | 2_341_701    | 1_526_680 | $0.0000020300 | $2.02             |
| 6   | set         | 2_076_813    | 1_420_725 | $0.0000018891 | $1.88             |
| 7   | inc         | 2_340_008    | 1_526_003 | $0.0000020291 | $2.02             |
| 8   | set         | 2_079_231    | 1_421_692 | $0.0000018904 | $1.89             |
| 9   | inc         | 2_340_146    | 1_526_058 | $0.0000020292 | $2.02             |
| 10  | set         | 2_074_561    | 1_419_824 | $0.0000018879 | $1.88             |
| 11  | inc         | 2_338_454    | 1_525_381 | $0.0000020283 | $2.02             |
| 12  | set         | 2_079_283    | 1_421_713 | $0.0000018904 | $1.89             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
