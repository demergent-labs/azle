# Benchmarks for canister1

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name      | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                  |
| --- | ---------------- | ------------- | ------------- | ------------- | ----------------- | --------------------------------------- |
| 0   | postUpgrade      | 4_891_745_946 | 3_557_288_378 | $0.0047300196 | $4_730.01         | <font color="green">-650_513_263</font> |
| 1   | stableMap0Remove | 2_058_089     | 1_413_235     | $0.0000018791 | $1.87             | <font color="green">-2_152</font>       |
| 2   | stableMap1Remove | 2_741_576     | 1_686_630     | $0.0000022427 | $2.24             | <font color="red">+11_615</font>        |
| 3   | stableMap2Remove | 2_063_208     | 1_415_283     | $0.0000018819 | $1.88             | <font color="green">-93</font>          |
| 4   | stableMap3Remove | 3_568_737     | 2_017_494     | $0.0000026826 | $2.68             | <font color="red">+2_240</font>         |
| 5   | stableMap4Remove | 5_498_934     | 2_789_573     | $0.0000037092 | $3.70             | <font color="red">+11_994</font>        |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name      | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ---------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade      | 5_542_259_209 | 4_217_493_683 | $0.0056078748 | $5_607.87         |
| 1   | stableMap0Remove | 2_060_241     | 1_414_096     | $0.0000018803 | $1.88             |
| 2   | stableMap1Remove | 2_729_961     | 1_681_984     | $0.0000022365 | $2.23             |
| 3   | stableMap2Remove | 2_063_301     | 1_415_320     | $0.0000018819 | $1.88             |
| 4   | stableMap3Remove | 3_566_497     | 2_016_598     | $0.0000026814 | $2.68             |
| 5   | stableMap4Remove | 5_486_940     | 2_784_776     | $0.0000037028 | $3.70             |

# Benchmarks for canister2

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name      | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                  |
| --- | ---------------- | ------------- | ------------- | ------------- | ----------------- | --------------------------------------- |
| 0   | postUpgrade      | 4_881_667_321 | 3_553_256_928 | $0.0047246591 | $4_724.65         | <font color="green">-650_592_306</font> |
| 1   | stableMap5Remove | 2_363_455     | 1_535_382     | $0.0000020416 | $2.04             | <font color="green">-2_051</font>       |
| 2   | stableMap6Remove | 3_652_556     | 2_051_022     | $0.0000027272 | $2.72             | <font color="red">+11_015</font>        |
| 3   | stableMap7Remove | 1_889_905     | 1_345_962     | $0.0000017897 | $1.78             | <font color="red">+601</font>           |
| 4   | stableMap8Remove | 1_929_583     | 1_361_833     | $0.0000018108 | $1.81             | <font color="red">+2_483</font>         |
| 5   | stableMap9Remove | 2_974_363     | 1_779_745     | $0.0000023665 | $2.36             | <font color="red">+6_566</font>         |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name      | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ---------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade      | 5_532_259_627 | 4_213_493_850 | $0.0056025564 | $5_602.55         |
| 1   | stableMap5Remove | 2_365_506     | 1_536_202     | $0.0000020426 | $2.04             |
| 2   | stableMap6Remove | 3_641_541     | 2_046_616     | $0.0000027213 | $2.72             |
| 3   | stableMap7Remove | 1_889_304     | 1_345_721     | $0.0000017894 | $1.78             |
| 4   | stableMap8Remove | 1_927_100     | 1_360_840     | $0.0000018095 | $1.80             |
| 5   | stableMap9Remove | 2_967_797     | 1_777_118     | $0.0000023630 | $2.36             |

# Benchmarks for canister3

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name       | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                  |
| --- | ----------------- | ------------- | ------------- | ------------- | ----------------- | --------------------------------------- |
| 0   | postUpgrade       | 4_943_955_911 | 3_578_172_364 | $0.0047577884 | $4_757.78         | <font color="green">-650_084_531</font> |
| 1   | stableMap10Remove | 2_555_946     | 1_612_378     | $0.0000021439 | $2.14             | <font color="red">+5_666</font>         |
| 2   | stableMap11Remove | 7_494_353     | 3_587_741     | $0.0000047705 | $4.77             | <font color="red">+16_000</font>        |
| 3   | stableMap12Remove | 4_885_254     | 2_544_101     | $0.0000033828 | $3.38             | <font color="red">+22_056</font>        |
| 4   | stableMap13Remove | 2_772_804     | 1_699_121     | $0.0000022593 | $2.25             | <font color="red">+13_736</font>        |
| 5   | stableMap14Remove | 7_642_027     | 3_646_810     | $0.0000048491 | $4.84             | <font color="red">+33_971</font>        |
| 6   | stableMap15Remove | 4_855_950     | 2_532_380     | $0.0000033672 | $3.36             | <font color="red">+9_757</font>         |
| 7   | stableMap16Remove | 3_001_442     | 1_790_576     | $0.0000023809 | $2.38             | <font color="red">+21_793</font>        |
| 8   | stableMap17Remove | 3_138_703     | 1_845_481     | $0.0000024539 | $2.45             | <font color="red">+30_058</font>        |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name       | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ----------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade       | 5_594_040_442 | 4_238_206_176 | $0.0056354156 | $5_635.41         |
| 1   | stableMap10Remove | 2_550_280     | 1_610_112     | $0.0000021409 | $2.14             |
| 2   | stableMap11Remove | 7_478_353     | 3_581_341     | $0.0000047620 | $4.76             |
| 3   | stableMap12Remove | 4_863_198     | 2_535_279     | $0.0000033711 | $3.37             |
| 4   | stableMap13Remove | 2_759_068     | 1_693_627     | $0.0000022520 | $2.25             |
| 5   | stableMap14Remove | 7_608_056     | 3_633_222     | $0.0000048310 | $4.83             |
| 6   | stableMap15Remove | 4_846_193     | 2_528_477     | $0.0000033620 | $3.36             |
| 7   | stableMap16Remove | 2_979_649     | 1_781_859     | $0.0000023693 | $2.36             |
| 8   | stableMap17Remove | 3_108_645     | 1_833_458     | $0.0000024379 | $2.43             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
