# Benchmarks for canister1

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | balance          | 2_449_155    | 1_569_662 | $0.0000020871 | $2.08             | <font color="green">-69_483</font> |
| 1   | account          | 3_808_633    | 2_113_453 | $0.0000028102 | $2.81             | <font color="green">-73_510</font> |
| 2   | balance          | 2_366_248    | 1_536_499 | $0.0000020430 | $2.04             | <font color="green">-71_132</font> |
| 3   | account          | 3_783_257    | 2_103_302 | $0.0000027967 | $2.79             | <font color="green">-81_269</font> |
| 4   | accounts         | 1_273_148    | 1_099_259 | $0.0000014617 | $1.46             | <font color="green">-74_734</font> |
| 5   | transfer         | 3_774_497    | 2_099_798 | $0.0000027920 | $2.79             | <font color="green">-72_108</font> |
| 6   | balance          | 2_369_218    | 1_537_687 | $0.0000020446 | $2.04             | <font color="green">-69_113</font> |
| 7   | account          | 3_786_828    | 2_104_731 | $0.0000027986 | $2.79             | <font color="green">-75_529</font> |
| 8   | balance          | 2_361_215    | 1_534_486 | $0.0000020404 | $2.04             | <font color="green">-76_966</font> |
| 9   | account          | 3_792_168    | 2_106_867 | $0.0000028014 | $2.80             | <font color="green">-65_772</font> |
| 10  | accounts         | 1_270_136    | 1_098_054 | $0.0000014600 | $1.46             | <font color="green">-75_203</font> |
| 11  | trap             | 1_262_657    | 1_095_062 | $0.0000014561 | $1.45             | <font color="green">-67_172</font> |
| 12  | sendNotification | 2_880_372    | 1_742_148 | $0.0000023165 | $2.31             | <font color="green">-31_865</font> |

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

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | transfer            | 2_307_034    | 1_512_813 | $0.0000020115 | $2.01             | <font color="green">-4_459</font> |
| 1   | receiveNotification | 1_509_473    | 1_193_789 | $0.0000015873 | $1.58             | <font color="red">+2_872</font>   |

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
