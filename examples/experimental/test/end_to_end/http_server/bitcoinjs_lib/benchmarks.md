# Benchmarks for bitcoinjs_lib

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls | Change                                 |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- | -------------------------------------- |
| 0   | init                | 49_716_081_372 | 39_487_022_548 | $0.0525047093 | $52_504.70        | <font color="red">+131_960_031</font>  |
| 1   | http_request_update | 55_346_071     | 22_728_428     | $0.0000302213 | $30.22            | <font color="red">+85_907</font>       |
| 2   | http_request_update | 933_156_543    | 373_852_617    | $0.0004971006 | $497.10           | <font color="green">-7_362_396</font>  |
| 3   | http_request_update | 6_796_291_873  | 5_119_106_749  | $0.0068067227 | $6_806.72         | <font color="green">-29_192_798</font> |
| 4   | http_request_update | 6_643_668_818  | 5_058_057_527  | $0.0067255474 | $6_725.54         | <font color="green">-27_243_343</font> |
| 5   | http_request_update | 12_389_983_396 | 9_756_583_358  | $0.0129730362 | $12_973.03        | <font color="green">-405_174</font>    |
| 6   | http_request_update | 933_183_257    | 373_863_302    | $0.0004971148 | $497.11           | <font color="green">-7_144_329</font>  |
| 7   | http_request_update | 3_341_921_037  | 2_537_358_414  | $0.0033738494 | $3_373.84         | <font color="red">+475_447</font>      |
| 8   | http_request_update | 11_328_743_579 | 8_932_087_431  | $0.0118767287 | $11_876.72        | <font color="red">+244_989</font>      |
| 9   | http_request_update | 11_334_850_241 | 8_934_530_096  | $0.0118799766 | $11_879.97        | <font color="red">+467_163</font>      |

## Baseline benchmarks Azle version: 0.25.0-alpha

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- |
| 0   | init                | 49_584_121_341 | 39_434_238_536 | $0.0524345240 | $52_434.52        |
| 1   | http_request_update | 55_260_164     | 22_694_065     | $0.0000301756 | $30.17            |
| 2   | http_request_update | 940_518_939    | 376_797_575    | $0.0005010164 | $501.01           |
| 3   | http_request_update | 6_825_484_671  | 5_130_783_868  | $0.0068222494 | $6_822.24         |
| 4   | http_request_update | 6_670_912_161  | 5_068_954_864  | $0.0067400372 | $6_740.03         |
| 5   | http_request_update | 12_390_388_570 | 9_756_745_428  | $0.0129732517 | $12_973.25        |
| 6   | http_request_update | 940_327_586    | 376_721_034    | $0.0005009147 | $500.91           |
| 7   | http_request_update | 3_341_445_590  | 2_537_168_236  | $0.0033735965 | $3_373.59         |
| 8   | http_request_update | 11_328_498_590 | 8_931_989_436  | $0.0118765984 | $11_876.59        |
| 9   | http_request_update | 11_334_383_078 | 8_934_343_231  | $0.0118797282 | $11_879.72        |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
