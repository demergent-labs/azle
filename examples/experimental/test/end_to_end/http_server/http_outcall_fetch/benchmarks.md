⚠️ **WARNING: Benchmark process failed for version 0.31.0**

# Benchmarks for server

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                               |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------ |
| 0   | init                | 7_694_221_069 | 5_878_278_427 | $0.0078161705 | $7_816.17         | <font color="red">+59_209_312</font> |
| 1   | http_request_update | 194_398_276   | 78_349_310    | $0.0001041787 | $104.17           | <font color="red">+135_055</font>    |
| 2   | http_request_update | 194_391_942   | 78_346_776    | $0.0001041754 | $104.17           | <font color="red">+110_691</font>    |
| 3   | http_request_update | 193_797_652   | 78_109_060    | $0.0001038593 | $103.85           | <font color="red">+58_204</font>     |
| 4   | http_request_update | 190_334_700   | 76_723_880    | $0.0001020174 | $102.01           | <font color="red">+298_466</font>    |
| 5   | http_request_update | 194_050_219   | 78_210_087    | $0.0001039936 | $103.99           | <font color="green">-655</font>      |
| 6   | http_request_update | 190_785_596   | 76_904_238    | $0.0001022573 | $102.25           | <font color="red">+196_629</font>    |
| 7   | http_request_update | 190_683_385   | 76_863_354    | $0.0001022029 | $102.20           | <font color="green">-11_728</font>   |
| 8   | http_request_update | 190_659_286   | 76_853_714    | $0.0001021901 | $102.19           | <font color="red">+28_051</font>     |
| 9   | http_request_update | 190_912_867   | 76_955_146    | $0.0001023249 | $102.32           | <font color="red">+208_633</font>    |
| 10  | http_request_update | 190_905_734   | 76_952_293    | $0.0001023212 | $102.32           | <font color="red">+277_139</font>    |
| 11  | http_request_update | 190_958_528   | 76_973_411    | $0.0001023492 | $102.34           | <font color="red">+153_048</font>    |
| 12  | http_request_update | 190_880_503   | 76_942_201    | $0.0001023077 | $102.30           | <font color="red">+252_303</font>    |
| 13  | http_request_update | 190_998_174   | 76_989_269    | $0.0001023703 | $102.37           | <font color="red">+146_482</font>    |
| 14  | http_request_update | 195_620_157   | 78_838_062    | $0.0001048286 | $104.82           | <font color="red">+36_418</font>     |
| 15  | http_request_update | 196_086_539   | 79_024_615    | $0.0001050767 | $105.07           | <font color="red">+167_146</font>    |
| 16  | http_request_update | 226_362_508   | 91_135_003    | $0.0001211795 | $121.17           | <font color="green">-34_967</font>   |
| 17  | http_request_update | 191_775_172   | 77_300_068    | $0.0001027836 | $102.78           | <font color="red">+138_654</font>    |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_635_011_757 | 5_854_594_702 | $0.0077846789 | $7_784.67         |
| 1   | http_request_update | 194_263_221   | 78_295_288    | $0.0001041069 | $104.10           |
| 2   | http_request_update | 194_281_251   | 78_302_500    | $0.0001041165 | $104.11           |
| 3   | http_request_update | 193_739_448   | 78_085_779    | $0.0001038283 | $103.82           |
| 4   | http_request_update | 190_036_234   | 76_604_493    | $0.0001018587 | $101.85           |
| 5   | http_request_update | 194_050_874   | 78_210_349    | $0.0001039940 | $103.99           |
| 6   | http_request_update | 190_588_967   | 76_825_586    | $0.0001021527 | $102.15           |
| 7   | http_request_update | 190_695_113   | 76_868_045    | $0.0001022091 | $102.20           |
| 8   | http_request_update | 190_631_235   | 76_842_494    | $0.0001021752 | $102.17           |
| 9   | http_request_update | 190_704_234   | 76_871_693    | $0.0001022140 | $102.21           |
| 10  | http_request_update | 190_628_595   | 76_841_438    | $0.0001021738 | $102.17           |
| 11  | http_request_update | 190_805_480   | 76_912_192    | $0.0001022678 | $102.26           |
| 12  | http_request_update | 190_628_200   | 76_841_280    | $0.0001021735 | $102.17           |
| 13  | http_request_update | 190_851_692   | 76_930_676    | $0.0001022924 | $102.29           |
| 14  | http_request_update | 195_583_739   | 78_823_495    | $0.0001048092 | $104.80           |
| 15  | http_request_update | 195_919_393   | 78_957_757    | $0.0001049878 | $104.98           |
| 16  | http_request_update | 226_397_475   | 91_148_990    | $0.0001211981 | $121.19           |
| 17  | http_request_update | 191_636_518   | 77_244_607    | $0.0001027098 | $102.70           |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
