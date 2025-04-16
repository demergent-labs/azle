# Benchmarks for canister1

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | balance          | 2_517_033    | 1_596_813 | $0.0000021232 | $2.12             | <font color="green">-1_605</font> |
| 1   | account          | 3_884_684    | 2_143_873 | $0.0000028506 | $2.85             | <font color="red">+2_541</font>   |
| 2   | balance          | 2_444_047    | 1_567_618 | $0.0000020844 | $2.08             | <font color="red">+6_667</font>   |
| 3   | account          | 3_870_727    | 2_138_290 | $0.0000028432 | $2.84             | <font color="red">+6_201</font>   |
| 4   | accounts         | 1_348_534    | 1_129_413 | $0.0000015017 | $1.50             | <font color="red">+652</font>     |
| 5   | transfer         | 3_851_701    | 2_130_680 | $0.0000028331 | $2.83             | <font color="red">+5_096</font>   |
| 6   | balance          | 2_447_130    | 1_568_852 | $0.0000020861 | $2.08             | <font color="red">+8_799</font>   |
| 7   | account          | 3_871_401    | 2_138_560 | $0.0000028436 | $2.84             | <font color="red">+9_044</font>   |
| 8   | balance          | 2_443_719    | 1_567_487 | $0.0000020842 | $2.08             | <font color="red">+5_538</font>   |
| 9   | account          | 3_863_947    | 2_135_578 | $0.0000028396 | $2.83             | <font color="red">+6_007</font>   |
| 10  | accounts         | 1_348_940    | 1_129_576 | $0.0000015020 | $1.50             | <font color="red">+3_601</font>   |
| 11  | trap             | 1_333_578    | 1_123_431 | $0.0000014938 | $1.49             | <font color="red">+3_749</font>   |
| 12  | sendNotification | 2_914_177    | 1_755_670 | $0.0000023345 | $2.33             | <font color="red">+1_940</font>   |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | balance          | 2_518_638    | 1_597_455 | $0.0000021241 | $2.12             |
| 1   | account          | 3_882_143    | 2_142_857 | $0.0000028493 | $2.84             |
| 2   | balance          | 2_437_380    | 1_564_952 | $0.0000020809 | $2.08             |
| 3   | account          | 3_864_526    | 2_135_810 | $0.0000028399 | $2.83             |
| 4   | accounts         | 1_347_882    | 1_129_152 | $0.0000015014 | $1.50             |
| 5   | transfer         | 3_846_605    | 2_128_642 | $0.0000028304 | $2.83             |
| 6   | balance          | 2_438_331    | 1_565_332 | $0.0000020814 | $2.08             |
| 7   | account          | 3_862_357    | 2_134_942 | $0.0000028388 | $2.83             |
| 8   | balance          | 2_438_181    | 1_565_272 | $0.0000020813 | $2.08             |
| 9   | account          | 3_857_940    | 2_133_176 | $0.0000028364 | $2.83             |
| 10  | accounts         | 1_345_339    | 1_128_135 | $0.0000015000 | $1.50             |
| 11  | trap             | 1_329_829    | 1_121_931 | $0.0000014918 | $1.49             |
| 12  | sendNotification | 2_912_237    | 1_754_894 | $0.0000023334 | $2.33             |

# Benchmarks for canister2

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | transfer            | 2_307_203    | 1_512_881 | $0.0000020116 | $2.01             | <font color="green">-4_290</font> |
| 1   | receiveNotification | 1_509_568    | 1_193_827 | $0.0000015874 | $1.58             | <font color="red">+2_967</font>   |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | transfer            | 2_311_493    | 1_514_597 | $0.0000020139 | $2.01             |
| 1   | receiveNotification | 1_506_601    | 1_192_640 | $0.0000015858 | $1.58             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
