# Benchmarks for cert-var

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | set         | 2_079_078    | 1_421_631 | $0.0000018903 | $1.89             | <font color="green">-4_100</font>  |
| 1   | inc         | 2_309_960    | 1_513_984 | $0.0000020131 | $2.01             | <font color="green">-16_724</font> |
| 2   | set         | 2_048_501    | 1_409_400 | $0.0000018740 | $1.87             | <font color="green">-14_057</font> |
| 3   | inc         | 2_308_540    | 1_513_416 | $0.0000020123 | $2.01             | <font color="green">-16_273</font> |
| 4   | set         | 2_052_269    | 1_410_907 | $0.0000018760 | $1.87             | <font color="green">-9_234</font>  |
| 5   | inc         | 2_312_547    | 1_515_018 | $0.0000020145 | $2.01             | <font color="green">-11_251</font> |
| 6   | set         | 2_046_388    | 1_408_555 | $0.0000018729 | $1.87             | <font color="green">-17_778</font> |
| 7   | inc         | 2_307_346    | 1_512_938 | $0.0000020117 | $2.01             | <font color="green">-14_367</font> |
| 8   | set         | 2_048_219    | 1_409_287 | $0.0000018739 | $1.87             | <font color="green">-13_523</font> |
| 9   | inc         | 2_309_934    | 1_513_973 | $0.0000020131 | $2.01             | <font color="green">-15_692</font> |
| 10  | set         | 2_050_154    | 1_410_061 | $0.0000018749 | $1.87             | <font color="green">-12_902</font> |
| 11  | inc         | 2_309_221    | 1_513_688 | $0.0000020127 | $2.01             | <font color="green">-15_327</font> |
| 12  | set         | 2_046_758    | 1_408_703 | $0.0000018731 | $1.87             | <font color="red">+2_005</font>    |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | set         | 2_083_178    | 1_423_271 | $0.0000018925 | $1.89             |
| 1   | inc         | 2_326_684    | 1_520_673 | $0.0000020220 | $2.02             |
| 2   | set         | 2_062_558    | 1_415_023 | $0.0000018815 | $1.88             |
| 3   | inc         | 2_324_813    | 1_519_925 | $0.0000020210 | $2.02             |
| 4   | set         | 2_061_503    | 1_414_601 | $0.0000018810 | $1.88             |
| 5   | inc         | 2_323_798    | 1_519_519 | $0.0000020205 | $2.02             |
| 6   | set         | 2_064_166    | 1_415_666 | $0.0000018824 | $1.88             |
| 7   | inc         | 2_321_713    | 1_518_685 | $0.0000020193 | $2.01             |
| 8   | set         | 2_061_742    | 1_414_696 | $0.0000018811 | $1.88             |
| 9   | inc         | 2_325_626    | 1_520_250 | $0.0000020214 | $2.02             |
| 10  | set         | 2_063_056    | 1_415_222 | $0.0000018818 | $1.88             |
| 11  | inc         | 2_324_548    | 1_519_819 | $0.0000020209 | $2.02             |
| 12  | set         | 2_044_753    | 1_407_901 | $0.0000018720 | $1.87             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
