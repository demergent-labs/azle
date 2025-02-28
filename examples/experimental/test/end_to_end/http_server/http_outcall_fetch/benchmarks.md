⚠️ **WARNING: Benchmark process failed for version 0.28.0**

# Benchmarks for server

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | init                | 7_631_252_346 | 5_853_090_938 | $0.0077826794 | $7_782.67         | <font color="red">+704_272</font>   |
| 1   | http_request_update | 194_371_554   | 78_338_621    | $0.0001041645 | $104.16           | <font color="red">+1_069_372</font> |
| 2   | http_request_update | 194_185_814   | 78_264_325    | $0.0001040657 | $104.06           | <font color="red">+1_008_737</font> |
| 3   | http_request_update | 193_749_485   | 78_089_794    | $0.0001038337 | $103.83           | <font color="red">+923_201</font>   |
| 4   | http_request_update | 190_167_450   | 76_656_980    | $0.0001019285 | $101.92           | <font color="red">+972_346</font>   |
| 5   | http_request_update | 194_148_718   | 78_249_487    | $0.0001040460 | $104.04           | <font color="red">+1_075_537</font> |
| 6   | http_request_update | 190_717_157   | 76_876_862    | $0.0001022209 | $102.22           | <font color="red">+1_078_876</font> |
| 7   | http_request_update | 190_825_496   | 76_920_198    | $0.0001022785 | $102.27           | <font color="red">+1_074_358</font> |
| 8   | http_request_update | 190_681_823   | 76_862_729    | $0.0001022021 | $102.20           | <font color="red">+1_033_714</font> |
| 9   | http_request_update | 190_905_414   | 76_952_165    | $0.0001023210 | $102.32           | <font color="red">+938_724</font>   |
| 10  | http_request_update | 190_908_499   | 76_953_399    | $0.0001023226 | $102.32           | <font color="red">+1_026_084</font> |
| 11  | http_request_update | 191_045_032   | 77_008_012    | $0.0001023952 | $102.39           | <font color="red">+1_170_583</font> |
| 12  | http_request_update | 190_887_415   | 76_944_966    | $0.0001023114 | $102.31           | <font color="red">+1_026_962</font> |
| 13  | http_request_update | 190_951_044   | 76_970_417    | $0.0001023453 | $102.34           | <font color="red">+825_217</font>   |
| 14  | http_request_update | 195_691_495   | 78_866_598    | $0.0001048665 | $104.86           | <font color="red">+1_064_122</font> |
| 15  | http_request_update | 196_074_807   | 79_019_922    | $0.0001050704 | $105.07           | <font color="red">+927_211</font>   |
| 16  | http_request_update | 226_448_353   | 91_169_341    | $0.0001212251 | $121.22           | <font color="red">+780_465</font>   |
| 17  | http_request_update | 191_758_388   | 77_293_355    | $0.0001027747 | $102.77           | <font color="red">+1_021_609</font> |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_630_548_074 | 5_852_809_229 | $0.0077823048 | $7_782.30         |
| 1   | http_request_update | 193_302_182   | 77_910_872    | $0.0001035957 | $103.59           |
| 2   | http_request_update | 193_177_077   | 77_860_830    | $0.0001035292 | $103.52           |
| 3   | http_request_update | 192_826_284   | 77_720_513    | $0.0001033426 | $103.34           |
| 4   | http_request_update | 189_195_104   | 76_268_041    | $0.0001014113 | $101.41           |
| 5   | http_request_update | 193_073_181   | 77_819_272    | $0.0001034740 | $103.47           |
| 6   | http_request_update | 189_638_281   | 76_445_312    | $0.0001016470 | $101.64           |
| 7   | http_request_update | 189_751_138   | 76_490_455    | $0.0001017071 | $101.70           |
| 8   | http_request_update | 189_648_109   | 76_449_243    | $0.0001016523 | $101.65           |
| 9   | http_request_update | 189_966_690   | 76_576_676    | $0.0001018217 | $101.82           |
| 10  | http_request_update | 189_882_415   | 76_542_966    | $0.0001017769 | $101.77           |
| 11  | http_request_update | 189_874_449   | 76_539_779    | $0.0001017726 | $101.77           |
| 12  | http_request_update | 189_860_453   | 76_534_181    | $0.0001017652 | $101.76           |
| 13  | http_request_update | 190_125_827   | 76_640_330    | $0.0001019063 | $101.90           |
| 14  | http_request_update | 194_627_373   | 78_440_949    | $0.0001043006 | $104.30           |
| 15  | http_request_update | 195_147_596   | 78_649_038    | $0.0001045773 | $104.57           |
| 16  | http_request_update | 225_667_888   | 90_857_155    | $0.0001208100 | $120.81           |
| 17  | http_request_update | 190_736_779   | 76_884_711    | $0.0001022313 | $102.23           |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
