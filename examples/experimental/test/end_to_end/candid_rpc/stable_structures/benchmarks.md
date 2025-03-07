# Benchmarks for canister1

## Current benchmarks Azle version: 0.29.0

| Id  | Method Name      | Instructions  | Cycles        | USD           | USD/Million Calls | Change                            |
| --- | ---------------- | ------------- | ------------- | ------------- | ----------------- | --------------------------------- |
| 0   | postUpgrade      | 4_889_933_084 | 3_556_563_233 | $0.0047290554 | $4_729.05         | <font color="red">+234_958</font> |
| 1   | stableMap0Remove | 2_048_435     | 1_409_374     | $0.0000018740 | $1.87             | <font color="red">+2_464</font>   |
| 2   | stableMap1Remove | 2_727_529     | 1_681_011     | $0.0000022352 | $2.23             | <font color="red">+7_054</font>   |
| 3   | stableMap2Remove | 2_052_158     | 1_410_863     | $0.0000018760 | $1.87             | <font color="red">+1_774</font>   |
| 4   | stableMap3Remove | 3_554_541     | 2_011_816     | $0.0000026751 | $2.67             | <font color="red">+606</font>     |
| 5   | stableMap4Remove | 5_474_291     | 2_779_716     | $0.0000036961 | $3.69             | <font color="red">+10_060</font>  |

## Baseline benchmarks Azle version: 0.28.0

| Id  | Method Name      | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ---------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade      | 4_889_698_126 | 3_556_469_250 | $0.0047289305 | $4_728.93         |
| 1   | stableMap0Remove | 2_045_971     | 1_408_388     | $0.0000018727 | $1.87             |
| 2   | stableMap1Remove | 2_720_475     | 1_678_190     | $0.0000022314 | $2.23             |
| 3   | stableMap2Remove | 2_050_384     | 1_410_153     | $0.0000018750 | $1.87             |
| 4   | stableMap3Remove | 3_553_935     | 2_011_574     | $0.0000026747 | $2.67             |
| 5   | stableMap4Remove | 5_464_231     | 2_775_692     | $0.0000036908 | $3.69             |

# Benchmarks for canister2

## Current benchmarks Azle version: 0.29.0

| Id  | Method Name      | Instructions  | Cycles        | USD           | USD/Million Calls | Change                            |
| --- | ---------------- | ------------- | ------------- | ------------- | ----------------- | --------------------------------- |
| 0   | postUpgrade      | 4_879_979_538 | 3_552_581_815 | $0.0047237615 | $4_723.76         | <font color="red">+66_685</font>  |
| 1   | stableMap5Remove | 2_350_531     | 1_530_212     | $0.0000020347 | $2.03             | <font color="red">+372</font>     |
| 2   | stableMap6Remove | 3_634_074     | 2_043_629     | $0.0000027174 | $2.71             | <font color="green">-3_307</font> |
| 3   | stableMap7Remove | 1_876_809     | 1_340_723     | $0.0000017827 | $1.78             | <font color="green">-2_623</font> |
| 4   | stableMap8Remove | 1_915_255     | 1_356_102     | $0.0000018032 | $1.80             | <font color="green">-4_362</font> |
| 5   | stableMap9Remove | 2_957_864     | 1_773_145     | $0.0000023577 | $2.35             | <font color="green">-5_771</font> |

## Baseline benchmarks Azle version: 0.28.0

| Id  | Method Name      | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ---------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade      | 4_879_912_853 | 3_552_555_141 | $0.0047237260 | $4_723.72         |
| 1   | stableMap5Remove | 2_350_159     | 1_530_063     | $0.0000020345 | $2.03             |
| 2   | stableMap6Remove | 3_637_381     | 2_044_952     | $0.0000027191 | $2.71             |
| 3   | stableMap7Remove | 1_879_432     | 1_341_772     | $0.0000017841 | $1.78             |
| 4   | stableMap8Remove | 1_919_617     | 1_357_846     | $0.0000018055 | $1.80             |
| 5   | stableMap9Remove | 2_963_635     | 1_775_454     | $0.0000023608 | $2.36             |

# Benchmarks for canister3

## Current benchmarks Azle version: 0.29.0

| Id  | Method Name       | Instructions  | Cycles        | USD           | USD/Million Calls | Change                             |
| --- | ----------------- | ------------- | ------------- | ------------- | ----------------- | ---------------------------------- |
| 0   | postUpgrade       | 4_941_839_418 | 3_577_325_767 | $0.0047566628 | $4_756.66         | <font color="red">+143_070</font>  |
| 1   | stableMap10Remove | 2_540_246     | 1_606_098     | $0.0000021356 | $2.13             | <font color="green">-3_784</font>  |
| 2   | stableMap11Remove | 7_447_525     | 3_569_010     | $0.0000047456 | $4.74             | <font color="green">-13_260</font> |
| 3   | stableMap12Remove | 4_850_977     | 2_530_390     | $0.0000033646 | $3.36             | <font color="green">-22_691</font> |
| 4   | stableMap13Remove | 2_758_397     | 1_693_358     | $0.0000022516 | $2.25             | <font color="green">-6_219</font>  |
| 5   | stableMap14Remove | 7_600_459     | 3_630_183     | $0.0000048269 | $4.82             | <font color="red">+5_652</font>    |
| 6   | stableMap15Remove | 4_833_866     | 2_523_546     | $0.0000033555 | $3.35             | <font color="green">-7_619</font>  |
| 7   | stableMap16Remove | 2_987_129     | 1_784_851     | $0.0000023733 | $2.37             | <font color="green">-3_785</font>  |
| 8   | stableMap17Remove | 3_121_874     | 1_838_749     | $0.0000024449 | $2.44             | <font color="green">-5_087</font>  |

## Baseline benchmarks Azle version: 0.28.0

| Id  | Method Name       | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ----------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade       | 4_941_696_348 | 3_577_268_539 | $0.0047565867 | $4_756.58         |
| 1   | stableMap10Remove | 2_544_030     | 1_607_612     | $0.0000021376 | $2.13             |
| 2   | stableMap11Remove | 7_460_785     | 3_574_314     | $0.0000047527 | $4.75             |
| 3   | stableMap12Remove | 4_873_668     | 2_539_467     | $0.0000033767 | $3.37             |
| 4   | stableMap13Remove | 2_764_616     | 1_695_846     | $0.0000022549 | $2.25             |
| 5   | stableMap14Remove | 7_594_807     | 3_627_922     | $0.0000048239 | $4.82             |
| 6   | stableMap15Remove | 4_841_485     | 2_526_594     | $0.0000033595 | $3.35             |
| 7   | stableMap16Remove | 2_990_914     | 1_786_365     | $0.0000023753 | $2.37             |
| 8   | stableMap17Remove | 3_126_961     | 1_840_784     | $0.0000024476 | $2.44             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
