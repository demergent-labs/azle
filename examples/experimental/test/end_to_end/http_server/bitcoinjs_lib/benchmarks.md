# Benchmarks for bitcoinjs_lib

## Current benchmarks Azle version: 0.25.0-dontmerge

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls | Change                                 |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- | -------------------------------------- |
| 0   | init                | 49_714_105_842 | 39_486_232_336 | $0.0525036586 | $52_503.65        | <font color="red">+123_044_144</font>  |
| 1   | http_request_update | 55_346_072     | 22_728_428     | $0.0000302213 | $30.22            | <font color="red">+54_447</font>       |
| 2   | http_request_update | 933_156_549    | 373_852_619    | $0.0004971006 | $497.10           | <font color="green">-7_306_170</font>  |
| 3   | http_request_update | 6_796_211_600  | 5_119_074_640  | $0.0068066800 | $6_806.67         | <font color="green">-28_132_460</font> |
| 4   | http_request_update | 6_644_235_809  | 5_058_284_323  | $0.0067258489 | $6_725.84         | <font color="green">-27_398_859</font> |
| 5   | http_request_update | 12_390_363_394 | 9_756_735_357  | $0.0129732383 | $12_973.23        | <font color="green">-651_304</font>    |
| 6   | http_request_update | 933_183_252    | 373_863_300    | $0.0004971148 | $497.11           | <font color="green">-7_160_525</font>  |
| 7   | http_request_update | 3_342_009_068  | 2_537_393_627  | $0.0033738962 | $3_373.89         | <font color="green">-197_095</font>    |
| 8   | http_request_update | 11_328_751_325 | 8_932_090_530  | $0.0118767328 | $11_876.73        | <font color="green">-81_871</font>     |
| 9   | http_request_update | 11_335_505_254 | 8_934_792_101  | $0.0118803250 | $11_880.32        | <font color="red">+53_133</font>       |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- |
| 0   | init                | 49_591_061_698 | 39_437_014_679 | $0.0524382153 | $52_438.21        |
| 1   | http_request_update | 55_291_625     | 22_706_650     | $0.0000301924 | $30.19            |
| 2   | http_request_update | 940_462_719    | 376_775_087    | $0.0005009865 | $500.98           |
| 3   | http_request_update | 6_824_344_060  | 5_130_327_624  | $0.0068216427 | $6_821.64         |
| 4   | http_request_update | 6_671_634_668  | 5_069_243_867  | $0.0067404215 | $6_740.42         |
| 5   | http_request_update | 12_391_014_698 | 9_756_995_879  | $0.0129735847 | $12_973.58        |
| 6   | http_request_update | 940_343_777    | 376_727_510    | $0.0005009233 | $500.92           |
| 7   | http_request_update | 3_342_206_163  | 2_537_472_465  | $0.0033740010 | $3_374.00         |
| 8   | http_request_update | 11_328_833_196 | 8_932_123_278  | $0.0118767764 | $11_876.77        |
| 9   | http_request_update | 11_335_452_121 | 8_934_770_848  | $0.0118802968 | $11_880.29        |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
