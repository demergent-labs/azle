⚠️ **WARNING: Benchmark process failed for version 0.31.0**

# Benchmarks for canister

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name               | Instructions | Cycles    | USD           | USD/Million Calls | Change                                  |
| --- | ------------------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------------- |
| 0   | updatePerformanceCounter0 | 1_794_948    | 1_307_979 | $0.0000017392 | $1.73             | <font color="green">-2_733</font>       |
| 1   | updatePerformanceCounter0 | 1_756_375    | 1_292_550 | $0.0000017187 | $1.71             | <font color="green">-588_296_440</font> |
| 2   | updatePerformanceCounter0 | 1_756_162    | 1_292_464 | $0.0000017186 | $1.71             | <font color="green">-588_298_606</font> |
| 3   | updatePerformanceCounter0 | 1_765_057    | 1_296_022 | $0.0000017233 | $1.72             | <font color="green">-588_289_828</font> |
| 4   | updatePerformanceCounter0 | 1_760_337    | 1_294_134 | $0.0000017208 | $1.72             | <font color="green">-588_294_189</font> |
| 5   | updatePerformanceCounter1 | 1_744_692    | 1_287_876 | $0.0000017125 | $1.71             | <font color="green">-5_538</font>       |
| 6   | updatePerformanceCounter1 | 887_477      | 944_990   | $0.0000012565 | $1.25             | <font color="red">+5_366</font>         |
| 7   | updatePerformanceCounter1 | 875_149      | 940_059   | $0.0000012500 | $1.24             | <font color="red">+9_674</font>         |
| 8   | updatePerformanceCounter1 | 873_207      | 939_282   | $0.0000012489 | $1.24             | <font color="red">+5_895</font>         |
| 9   | updatePerformanceCounter1 | 873_215      | 939_286   | $0.0000012489 | $1.24             | <font color="red">+4_000</font>         |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name               | Instructions | Cycles      | USD           | USD/Million Calls |
| --- | ------------------------- | ------------ | ----------- | ------------- | ----------------- |
| 0   | updatePerformanceCounter0 | 1_797_681    | 1_309_072   | $0.0000017406 | $1.74             |
| 1   | updatePerformanceCounter0 | 590_052_815  | 236_611_126 | $0.0003146147 | $314.61           |
| 2   | updatePerformanceCounter0 | 590_054_768  | 236_611_907 | $0.0003146158 | $314.61           |
| 3   | updatePerformanceCounter0 | 590_054_885  | 236_611_954 | $0.0003146158 | $314.61           |
| 4   | updatePerformanceCounter0 | 590_054_526  | 236_611_810 | $0.0003146156 | $314.61           |
| 5   | updatePerformanceCounter1 | 1_750_230    | 1_290_092   | $0.0000017154 | $1.71             |
| 6   | updatePerformanceCounter1 | 882_111      | 942_844     | $0.0000012537 | $1.25             |
| 7   | updatePerformanceCounter1 | 865_475      | 936_190     | $0.0000012448 | $1.24             |
| 8   | updatePerformanceCounter1 | 867_312      | 936_924     | $0.0000012458 | $1.24             |
| 9   | updatePerformanceCounter1 | 869_215      | 937_686     | $0.0000012468 | $1.24             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
