# Benchmarks for canister1

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name      | Instructions  | Cycles        | USD           | USD/Million Calls | Change                            |
| --- | ---------------- | ------------- | ------------- | ------------- | ----------------- | --------------------------------- |
| 0   | postUpgrade      | 4_889_698_126 | 3_556_469_250 | $0.0047289305 | $4_728.93         | <font color="red">+4_606</font>   |
| 1   | stableMap0Remove | 2_045_971     | 1_408_388     | $0.0000018727 | $1.87             | <font color="green">-4_549</font> |
| 2   | stableMap1Remove | 2_720_475     | 1_678_190     | $0.0000022314 | $2.23             | <font color="green">-3_862</font> |
| 3   | stableMap2Remove | 2_050_384     | 1_410_153     | $0.0000018750 | $1.87             | <font color="green">-930</font>   |
| 4   | stableMap3Remove | 3_553_935     | 2_011_574     | $0.0000026747 | $2.67             | <font color="red">+2_067</font>   |
| 5   | stableMap4Remove | 5_464_231     | 2_775_692     | $0.0000036908 | $3.69             | <font color="green">-8_013</font> |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name      | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ---------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade      | 4_889_693_520 | 3_556_467_408 | $0.0047289280 | $4_728.92         |
| 1   | stableMap0Remove | 2_050_520     | 1_410_208     | $0.0000018751 | $1.87             |
| 2   | stableMap1Remove | 2_724_337     | 1_679_734     | $0.0000022335 | $2.23             |
| 3   | stableMap2Remove | 2_051_314     | 1_410_525     | $0.0000018755 | $1.87             |
| 4   | stableMap3Remove | 3_551_868     | 2_010_747     | $0.0000026736 | $2.67             |
| 5   | stableMap4Remove | 5_472_244     | 2_778_897     | $0.0000036950 | $3.69             |

# Benchmarks for canister2

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name      | Instructions  | Cycles        | USD           | USD/Million Calls | Change                              |
| --- | ---------------- | ------------- | ------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | postUpgrade      | 4_879_912_853 | 3_552_555_141 | $0.0047237260 | $4_723.72         | <font color="green">-212_295</font> |
| 1   | stableMap5Remove | 2_350_159     | 1_530_063     | $0.0000020345 | $2.03             | <font color="green">-537</font>     |
| 2   | stableMap6Remove | 3_637_381     | 2_044_952     | $0.0000027191 | $2.71             | <font color="red">+2_027</font>     |
| 3   | stableMap7Remove | 1_879_432     | 1_341_772     | $0.0000017841 | $1.78             | <font color="red">+3_338</font>     |
| 4   | stableMap8Remove | 1_919_617     | 1_357_846     | $0.0000018055 | $1.80             | <font color="red">+4_443</font>     |
| 5   | stableMap9Remove | 2_963_635     | 1_775_454     | $0.0000023608 | $2.36             | <font color="red">+2_600</font>     |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name      | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ---------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade      | 4_880_125_148 | 3_552_640_059 | $0.0047238389 | $4_723.83         |
| 1   | stableMap5Remove | 2_350_696     | 1_530_278     | $0.0000020348 | $2.03             |
| 2   | stableMap6Remove | 3_635_354     | 2_044_141     | $0.0000027180 | $2.71             |
| 3   | stableMap7Remove | 1_876_094     | 1_340_437     | $0.0000017823 | $1.78             |
| 4   | stableMap8Remove | 1_915_174     | 1_356_069     | $0.0000018031 | $1.80             |
| 5   | stableMap9Remove | 2_961_035     | 1_774_414     | $0.0000023594 | $2.35             |

# Benchmarks for canister3

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name       | Instructions  | Cycles        | USD           | USD/Million Calls | Change                             |
| --- | ----------------- | ------------- | ------------- | ------------- | ----------------- | ---------------------------------- |
| 0   | postUpgrade       | 4_941_696_348 | 3_577_268_539 | $0.0047565867 | $4_756.58         | <font color="green">-30_904</font> |
| 1   | stableMap10Remove | 2_544_030     | 1_607_612     | $0.0000021376 | $2.13             | <font color="red">+3_915</font>    |
| 2   | stableMap11Remove | 7_460_785     | 3_574_314     | $0.0000047527 | $4.75             | <font color="red">+4_924</font>    |
| 3   | stableMap12Remove | 4_873_668     | 2_539_467     | $0.0000033767 | $3.37             | <font color="red">+14_667</font>   |
| 4   | stableMap13Remove | 2_764_616     | 1_695_846     | $0.0000022549 | $2.25             | <font color="red">+7_524</font>    |
| 5   | stableMap14Remove | 7_594_807     | 3_627_922     | $0.0000048239 | $4.82             | <font color="red">+6_153</font>    |
| 6   | stableMap15Remove | 4_841_485     | 2_526_594     | $0.0000033595 | $3.35             | <font color="red">+10_251</font>   |
| 7   | stableMap16Remove | 2_990_914     | 1_786_365     | $0.0000023753 | $2.37             | <font color="red">+3_854</font>    |
| 8   | stableMap17Remove | 3_126_961     | 1_840_784     | $0.0000024476 | $2.44             | <font color="red">+7_945</font>    |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name       | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ----------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade       | 4_941_727_252 | 3_577_280_900 | $0.0047566031 | $4_756.60         |
| 1   | stableMap10Remove | 2_540_115     | 1_606_046     | $0.0000021355 | $2.13             |
| 2   | stableMap11Remove | 7_455_861     | 3_572_344     | $0.0000047500 | $4.75             |
| 3   | stableMap12Remove | 4_859_001     | 2_533_600     | $0.0000033689 | $3.36             |
| 4   | stableMap13Remove | 2_757_092     | 1_692_836     | $0.0000022509 | $2.25             |
| 5   | stableMap14Remove | 7_588_654     | 3_625_461     | $0.0000048207 | $4.82             |
| 6   | stableMap15Remove | 4_831_234     | 2_522_493     | $0.0000033541 | $3.35             |
| 7   | stableMap16Remove | 2_987_060     | 1_784_824     | $0.0000023732 | $2.37             |
| 8   | stableMap17Remove | 3_119_016     | 1_837_606     | $0.0000024434 | $2.44             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
