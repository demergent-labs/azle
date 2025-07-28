# Benchmarks for bitcoinjs_lib

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name | Instructions   | Cycles         | USD           | USD/Million Calls | Change                                     |
| --- | ----------- | -------------- | -------------- | ------------- | ----------------- | ------------------------------------------ |
| 0   | 1           | 48_330_808     | 53_330_808     | $0.0000730632 | $73.06            | <font color="green">-48_781_612_979</font> |
| 1   | 1           | 931_740_696    | 936_740_696    | $0.0012833348 | $1_283.33         | <font color="red">+876_921_166</font>      |
| 2   | 1           | 6_810_299_901  | 6_815_299_901  | $0.0093369609 | $9_336.96         | <font color="red">+5_873_686_370</font>    |
| 3   | 1           | 6_657_492_761  | 6_662_492_761  | $0.0091276151 | $9_127.61         | <font color="green">-154_494_365</font>    |
| 4   | 1           | 12_384_331_608 | 12_389_331_608 | $0.0169733843 | $16_973.38        | <font color="red">+5_725_276_744</font>    |
| 5   | 1           | 931_602_448    | 936_602_448    | $0.0012831454 | $1_283.14         | <font color="green">-11_459_342_268</font> |
| 6   | 1           | 3_334_696_509  | 3_339_696_509  | $0.0045753842 | $4_575.38         | <font color="red">+2_398_055_333</font>    |
| 7   | 1           | 11_320_997_796 | 11_325_997_796 | $0.0155166170 | $15_516.61        | <font color="red">+7_979_860_781</font>    |
| 8   | 1           | 11_327_674_836 | 11_332_674_836 | $0.0155257645 | $15_525.76        | <font color="green">-287_740</font>        |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- |
| 0   | init                | 48_829_943_787 | 48_834_943_787 | $0.0669038730 | $66_903.87        |
| 1   | http_request_update | 54_819_530     | 59_819_530     | $0.0000819528 | $81.95            |
| 2   | http_request_update | 936_613_531    | 941_613_531    | $0.0012900105 | $1_290.01         |
| 3   | http_request_update | 6_811_987_126  | 6_816_987_126  | $0.0093392724 | $9_339.27         |
| 4   | http_request_update | 6_659_054_864  | 6_664_054_864  | $0.0091297552 | $9_129.75         |
| 5   | http_request_update | 12_390_944_716 | 12_395_944_716 | $0.0169824443 | $16_982.44        |
| 6   | http_request_update | 936_641_176    | 941_641_176    | $0.0012900484 | $1_290.04         |
| 7   | http_request_update | 3_341_137_015  | 3_346_137_015  | $0.0045842077 | $4_584.20         |
| 8   | http_request_update | 11_327_962_576 | 11_332_962_576 | $0.0155261587 | $15_526.15        |
| 9   | http_request_update | 11_334_381_276 | 11_339_381_276 | $0.0155349523 | $15_534.95        |

---

**Note on calculations:**

- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).
