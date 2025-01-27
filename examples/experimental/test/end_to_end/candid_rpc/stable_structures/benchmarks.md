# Benchmarks for canister1

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name      | Instructions  | Cycles        | USD           | USD/Million Calls | Change                              |
| --- | ---------------- | ------------- | ------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | postUpgrade      | 5_546_040_704 | 4_219_006_281 | $0.0056098861 | $5_609.88         | <font color="red">+3_781_495</font> |
| 1   | stableMap0Remove | 2_054_490     | 1_411_796     | $0.0000018772 | $1.87             | <font color="green">-5_751</font>   |
| 2   | stableMap1Remove | 2_734_776     | 1_683_910     | $0.0000022390 | $2.23             | <font color="red">+4_815</font>     |
| 3   | stableMap2Remove | 2_058_598     | 1_413_439     | $0.0000018794 | $1.87             | <font color="green">-4_703</font>   |
| 4   | stableMap3Remove | 3_571_887     | 2_018_754     | $0.0000026843 | $2.68             | <font color="red">+5_390</font>     |
| 5   | stableMap4Remove | 5_487_170     | 2_784_868     | $0.0000037030 | $3.70             | <font color="red">+230</font>       |

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

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name      | Instructions  | Cycles        | USD           | USD/Million Calls | Change                              |
| --- | ---------------- | ------------- | ------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | postUpgrade      | 5_535_608_129 | 4_214_833_251 | $0.0056043373 | $5_604.33         | <font color="red">+3_348_502</font> |
| 1   | stableMap5Remove | 2_358_189     | 1_533_275     | $0.0000020387 | $2.03             | <font color="green">-7_317</font>   |
| 2   | stableMap6Remove | 3_640_113     | 2_046_045     | $0.0000027206 | $2.72             | <font color="green">-1_428</font>   |
| 3   | stableMap7Remove | 1_880_084     | 1_342_033     | $0.0000017845 | $1.78             | <font color="green">-9_220</font>   |
| 4   | stableMap8Remove | 1_920_616     | 1_358_246     | $0.0000018060 | $1.80             | <font color="green">-6_484</font>   |
| 5   | stableMap9Remove | 2_966_001     | 1_776_400     | $0.0000023620 | $2.36             | <font color="green">-1_796</font>   |

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

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name       | Instructions  | Cycles        | USD           | USD/Million Calls | Change                              |
| --- | ----------------- | ------------- | ------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | postUpgrade       | 5_598_608_901 | 4_240_033_560 | $0.0056378454 | $5_637.84         | <font color="red">+4_568_459</font> |
| 1   | stableMap10Remove | 2_535_593     | 1_604_237     | $0.0000021331 | $2.13             | <font color="green">-14_687</font>  |
| 2   | stableMap11Remove | 7_450_234     | 3_570_093     | $0.0000047470 | $4.74             | <font color="green">-28_119</font>  |
| 3   | stableMap12Remove | 4_840_633     | 2_526_253     | $0.0000033591 | $3.35             | <font color="green">-22_565</font>  |
| 4   | stableMap13Remove | 2_746_247     | 1_688_498     | $0.0000022451 | $2.24             | <font color="green">-12_821</font>  |
| 5   | stableMap14Remove | 7_583_498     | 3_623_399     | $0.0000048179 | $4.81             | <font color="green">-24_558</font>  |
| 6   | stableMap15Remove | 4_813_981     | 2_515_592     | $0.0000033449 | $3.34             | <font color="green">-32_212</font>  |
| 7   | stableMap16Remove | 2_967_562     | 1_777_024     | $0.0000023629 | $2.36             | <font color="green">-12_087</font>  |
| 8   | stableMap17Remove | 3_101_377     | 1_830_550     | $0.0000024340 | $2.43             | <font color="green">-7_268</font>   |

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
