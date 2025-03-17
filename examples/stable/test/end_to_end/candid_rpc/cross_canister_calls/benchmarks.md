⚠️ **WARNING: Benchmark process failed for version 0.30.0**

# Benchmarks for canister1

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls | Change                           |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- | -------------------------------- |
| 0   | balance          | 2_518_638    | 1_597_455 | $0.0000021241 | $2.12             | <font color="red">+57_395</font> |
| 1   | account          | 3_882_143    | 2_142_857 | $0.0000028493 | $2.84             | <font color="red">+52_378</font> |
| 2   | balance          | 2_437_380    | 1_564_952 | $0.0000020809 | $2.08             | <font color="red">+47_697</font> |
| 3   | account          | 3_864_526    | 2_135_810 | $0.0000028399 | $2.83             | <font color="red">+55_671</font> |
| 4   | accounts         | 1_347_882    | 1_129_152 | $0.0000015014 | $1.50             | <font color="red">+51_877</font> |
| 5   | transfer         | 3_846_605    | 2_128_642 | $0.0000028304 | $2.83             | <font color="red">+50_517</font> |
| 6   | balance          | 2_438_331    | 1_565_332 | $0.0000020814 | $2.08             | <font color="red">+47_331</font> |
| 7   | account          | 3_862_357    | 2_134_942 | $0.0000028388 | $2.83             | <font color="red">+50_089</font> |
| 8   | balance          | 2_438_181    | 1_565_272 | $0.0000020813 | $2.08             | <font color="red">+44_505</font> |
| 9   | account          | 3_857_940    | 2_133_176 | $0.0000028364 | $2.83             | <font color="red">+42_428</font> |
| 10  | accounts         | 1_345_339    | 1_128_135 | $0.0000015000 | $1.50             | <font color="red">+49_115</font> |
| 11  | trap             | 1_329_829    | 1_121_931 | $0.0000014918 | $1.49             | <font color="red">+49_716</font> |
| 12  | sendNotification | 2_912_237    | 1_754_894 | $0.0000023334 | $2.33             | <font color="red">+1_448</font>  |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | balance          | 2_461_243    | 1_574_497 | $0.0000020936 | $2.09             |
| 1   | account          | 3_829_765    | 2_121_906 | $0.0000028214 | $2.82             |
| 2   | balance          | 2_389_683    | 1_545_873 | $0.0000020555 | $2.05             |
| 3   | account          | 3_808_855    | 2_113_542 | $0.0000028103 | $2.81             |
| 4   | accounts         | 1_296_005    | 1_108_402 | $0.0000014738 | $1.47             |
| 5   | transfer         | 3_796_088    | 2_108_435 | $0.0000028035 | $2.80             |
| 6   | balance          | 2_391_000    | 1_546_400 | $0.0000020562 | $2.05             |
| 7   | account          | 3_812_268    | 2_114_907 | $0.0000028121 | $2.81             |
| 8   | balance          | 2_393_676    | 1_547_470 | $0.0000020576 | $2.05             |
| 9   | account          | 3_815_512    | 2_116_204 | $0.0000028139 | $2.81             |
| 10  | accounts         | 1_296_224    | 1_108_489 | $0.0000014739 | $1.47             |
| 11  | trap             | 1_280_113    | 1_102_045 | $0.0000014654 | $1.46             |
| 12  | sendNotification | 2_910_789    | 1_754_315 | $0.0000023327 | $2.33             |

# Benchmarks for canister2

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls | Change                          |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- | ------------------------------- |
| 0   | transfer            | 2_311_493    | 1_514_597 | $0.0000020139 | $2.01             | <font color="red">+977</font>   |
| 1   | receiveNotification | 1_506_601    | 1_192_640 | $0.0000015858 | $1.58             | <font color="red">+1_635</font> |

## Baseline benchmarks Azle version: 0.29.0

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | transfer            | 2_310_516    | 1_514_206 | $0.0000020134 | $2.01             |
| 1   | receiveNotification | 1_504_966    | 1_191_986 | $0.0000015849 | $1.58             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
