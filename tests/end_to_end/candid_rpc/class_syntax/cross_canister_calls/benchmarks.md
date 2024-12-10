# Benchmarks for canister1

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | balance          | 2_258_560    | 1_493_424 | $0.0000019858 | $1.98             | <font color="green">-38_238</font> |
| 1   | account          | 3_590_309    | 2_026_123 | $0.0000026941 | $2.69             | <font color="green">-55_508</font> |
| 2   | balance          | 2_209_349    | 1_473_739 | $0.0000019596 | $1.95             | <font color="green">-12_200</font> |
| 3   | account          | 3_582_832    | 2_023_132 | $0.0000026901 | $2.69             | <font color="green">-40_202</font> |
| 4   | accounts         | 1_645_847    | 1_248_338 | $0.0000016599 | $1.65             | <font color="green">-14_598</font> |
| 5   | transfer         | 3_550_267    | 2_010_106 | $0.0000026728 | $2.67             | <font color="green">-19_043</font> |
| 6   | balance          | 2_208_210    | 1_473_284 | $0.0000019590 | $1.95             | <font color="green">-11_408</font> |
| 7   | account          | 3_580_585    | 2_022_234 | $0.0000026889 | $2.68             | <font color="green">-36_185</font> |
| 8   | balance          | 2_204_332    | 1_471_732 | $0.0000019569 | $1.95             | <font color="green">-7_180</font>  |
| 9   | account          | 3_580_547    | 2_022_218 | $0.0000026889 | $2.68             | <font color="green">-36_041</font> |
| 10  | accounts         | 1_646_710    | 1_248_684 | $0.0000016603 | $1.66             | <font color="green">-5_185</font>  |
| 11  | trap             | 1_600_413    | 1_230_165 | $0.0000016357 | $1.63             | <font color="green">-24_990</font> |
| 12  | sendNotification | 2_619_827    | 1_637_930 | $0.0000021779 | $2.17             | <font color="green">-28_224</font> |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | balance          | 2_296_798    | 1_508_719 | $0.0000020061 | $2.00             |
| 1   | account          | 3_645_817    | 2_048_326 | $0.0000027236 | $2.72             |
| 2   | balance          | 2_221_549    | 1_478_619 | $0.0000019661 | $1.96             |
| 3   | account          | 3_623_034    | 2_039_213 | $0.0000027115 | $2.71             |
| 4   | accounts         | 1_660_445    | 1_254_178 | $0.0000016676 | $1.66             |
| 5   | transfer         | 3_569_310    | 2_017_724 | $0.0000026829 | $2.68             |
| 6   | balance          | 2_219_618    | 1_477_847 | $0.0000019650 | $1.96             |
| 7   | account          | 3_616_770    | 2_036_708 | $0.0000027081 | $2.70             |
| 8   | balance          | 2_211_512    | 1_474_604 | $0.0000019607 | $1.96             |
| 9   | account          | 3_616_588    | 2_036_635 | $0.0000027081 | $2.70             |
| 10  | accounts         | 1_651_895    | 1_250_758 | $0.0000016631 | $1.66             |
| 11  | trap             | 1_625_403    | 1_240_161 | $0.0000016490 | $1.64             |
| 12  | sendNotification | 2_648_051    | 1_649_220 | $0.0000021929 | $2.19             |

# Benchmarks for canister2

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls | Change                           |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- | -------------------------------- |
| 0   | transfer            | 2_190_599    | 1_466_239 | $0.0000019496 | $1.94             | <font color="red">+25_567</font> |
| 1   | receiveNotification | 1_414_783    | 1_155_913 | $0.0000015370 | $1.53             | <font color="red">+27_352</font> |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | transfer            | 2_165_032    | 1_456_012 | $0.0000019360 | $1.93             |
| 1   | receiveNotification | 1_387_431    | 1_144_972 | $0.0000015224 | $1.52             |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
