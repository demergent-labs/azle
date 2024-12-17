# Benchmarks for manual_reply

## Current benchmarks Azle version: 0.25.0-dontmerge

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | manualUpdate   | 699_013      | 869_605   | $0.0000011563 | $1.15             | <font color="green">-29_295</font> |
| 1   | manualUpdate   | 1_600_986    | 1_230_394 | $0.0000016360 | $1.63             | <font color="green">-29_866</font> |
| 2   | updateBlob     | 1_492_565    | 1_187_026 | $0.0000015784 | $1.57             | <font color="green">-15_140</font> |
| 3   | updateFloat32  | 1_045_675    | 1_008_270 | $0.0000013407 | $1.34             | <font color="green">-15_501</font> |
| 4   | updateInt8     | 1_145_441    | 1_048_176 | $0.0000013937 | $1.39             | <font color="green">-15_014</font> |
| 5   | updateNat      | 1_535_619    | 1_204_247 | $0.0000016013 | $1.60             | <font color="green">-16_234</font> |
| 6   | updateNull     | 1_030_437    | 1_002_174 | $0.0000013326 | $1.33             | <font color="green">-15_727</font> |
| 7   | updateVoid     | 884_403      | 943_761   | $0.0000012549 | $1.25             | <font color="green">-16_451</font> |
| 8   | updateRecord   | 13_021_098   | 5_798_439 | $0.0000077100 | $7.71             | <font color="red">+16_091</font>   |
| 9   | updateReserved | 1_030_765    | 1_002_306 | $0.0000013327 | $1.33             | <font color="green">-15_347</font> |
| 10  | updateString   | 1_284_928    | 1_103_971 | $0.0000014679 | $1.46             | <font color="green">-15_386</font> |
| 11  | updateVariant  | 3_442_338    | 1_966_935 | $0.0000026154 | $2.61             | <font color="green">-17_898</font> |
| 12  | updateFloat32  | 1_042_021    | 1_006_808 | $0.0000013387 | $1.33             | <font color="green">-15_226</font> |
| 13  | replyRaw       | 512_932      | 795_172   | $0.0000010573 | $1.05             | <font color="green">-15_394</font> |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name    | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | -------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | manualUpdate   | 728_308      | 881_323   | $0.0000011719 | $1.17             |
| 1   | manualUpdate   | 1_630_852    | 1_242_340 | $0.0000016519 | $1.65             |
| 2   | updateBlob     | 1_507_705    | 1_193_082 | $0.0000015864 | $1.58             |
| 3   | updateFloat32  | 1_061_176    | 1_014_470 | $0.0000013489 | $1.34             |
| 4   | updateInt8     | 1_160_455    | 1_054_182 | $0.0000014017 | $1.40             |
| 5   | updateNat      | 1_551_853    | 1_210_741 | $0.0000016099 | $1.60             |
| 6   | updateNull     | 1_046_164    | 1_008_465 | $0.0000013409 | $1.34             |
| 7   | updateVoid     | 900_854      | 950_341   | $0.0000012636 | $1.26             |
| 8   | updateRecord   | 13_005_007   | 5_792_002 | $0.0000077015 | $7.70             |
| 9   | updateReserved | 1_046_112    | 1_008_444 | $0.0000013409 | $1.34             |
| 10  | updateString   | 1_300_314    | 1_110_125 | $0.0000014761 | $1.47             |
| 11  | updateVariant  | 3_460_236    | 1_974_094 | $0.0000026249 | $2.62             |
| 12  | updateFloat32  | 1_057_247    | 1_012_898 | $0.0000013468 | $1.34             |
| 13  | replyRaw       | 528_326      | 801_330   | $0.0000010655 | $1.06             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
