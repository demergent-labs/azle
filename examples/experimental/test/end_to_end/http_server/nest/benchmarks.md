# Benchmarks for api

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name         | Instructions   | Cycles        | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | -------------- | ------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init                | 12_726_331_425 | 9_891_122_570 | $0.0131519289 | $13_151.92        | <font color="red">+879_352_906</font> |
| 1   | http_request_update | 44_542_436     | 18_406_974    | $0.0000244752 | $24.47            | <font color="green">-7_791</font>     |
| 2   | http_request_update | 44_393_984     | 18_347_593    | $0.0000243962 | $24.39            | <font color="red">+19_888</font>      |
| 3   | http_request_update | 43_458_214     | 17_973_285    | $0.0000238985 | $23.89            | <font color="green">-30_732</font>    |
| 4   | http_request_update | 53_172_226     | 21_858_890    | $0.0000290651 | $29.06            | <font color="green">-10_232</font>    |
| 5   | http_request_update | 45_118_998     | 18_637_599    | $0.0000247819 | $24.78            | <font color="red">+49_516</font>      |
| 6   | http_request_update | 45_017_776     | 18_597_110    | $0.0000247280 | $24.72            | <font color="red">+24_592</font>      |
| 7   | http_request_update | 44_172_888     | 18_259_155    | $0.0000242787 | $24.27            | <font color="red">+30_531</font>      |
| 8   | http_request_update | 47_444_924     | 19_567_969    | $0.0000260189 | $26.01            | <font color="red">+62_308</font>      |
| 9   | http_request_update | 44_899_888     | 18_549_955    | $0.0000246653 | $24.66            | <font color="red">+27_557</font>      |
| 10  | http_request_update | 44_797_080     | 18_508_832    | $0.0000246106 | $24.61            | <font color="red">+27_811</font>      |
| 11  | http_request_update | 43_951_542     | 18_170_616    | $0.0000241609 | $24.16            | <font color="red">+32_596</font>      |
| 12  | http_request_update | 47_220_127     | 19_478_050    | $0.0000258994 | $25.89            | <font color="red">+69_365</font>      |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions   | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 11_846_978_519 | 9_139_381_407 | $0.0121523613 | $12_152.36        |
| 1   | http_request_update | 44_550_227     | 18_410_090    | $0.0000244793 | $24.47            |
| 2   | http_request_update | 44_374_096     | 18_339_638    | $0.0000243857 | $24.38            |
| 3   | http_request_update | 43_488_946     | 17_985_578    | $0.0000239149 | $23.91            |
| 4   | http_request_update | 53_182_458     | 21_862_983    | $0.0000290706 | $29.07            |
| 5   | http_request_update | 45_069_482     | 18_617_792    | $0.0000247555 | $24.75            |
| 6   | http_request_update | 44_993_184     | 18_587_273    | $0.0000247149 | $24.71            |
| 7   | http_request_update | 44_142_357     | 18_246_942    | $0.0000242624 | $24.26            |
| 8   | http_request_update | 47_382_616     | 19_543_046    | $0.0000259858 | $25.98            |
| 9   | http_request_update | 44_872_331     | 18_538_932    | $0.0000246507 | $24.65            |
| 10  | http_request_update | 44_769_269     | 18_497_707    | $0.0000245958 | $24.59            |
| 11  | http_request_update | 43_918_946     | 18_157_578    | $0.0000241436 | $24.14            |
| 12  | http_request_update | 47_150_762     | 19_450_304    | $0.0000258625 | $25.86            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
