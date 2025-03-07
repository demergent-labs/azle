⚠️ **WARNING: Benchmark process failed for version 0.29.0**

# Benchmarks for server

## Current benchmarks Azle version: 0.29.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | init                | 7_630_623_958 | 5_852_839_583 | $0.0077823452 | $7_782.34         | <font color="green">-628_388</font> |
| 1   | http_request_update | 194_309_891   | 78_313_956    | $0.0001041317 | $104.13           | <font color="green">-61_663</font>  |
| 2   | http_request_update | 194_205_130   | 78_272_052    | $0.0001040760 | $104.07           | <font color="red">+19_316</font>    |
| 3   | http_request_update | 193_764_729   | 78_095_891    | $0.0001038418 | $103.84           | <font color="red">+15_244</font>    |
| 4   | http_request_update | 190_196_986   | 76_668_794    | $0.0001019442 | $101.94           | <font color="red">+29_536</font>    |
| 5   | http_request_update | 193_946_994   | 78_168_797    | $0.0001039387 | $103.93           | <font color="green">-201_724</font> |
| 6   | http_request_update | 190_438_245   | 76_765_298    | $0.0001020725 | $102.07           | <font color="green">-278_912</font> |
| 7   | http_request_update | 190_780_120   | 76_902_048    | $0.0001022543 | $102.25           | <font color="green">-45_376</font>  |
| 8   | http_request_update | 190_711_943   | 76_874_777    | $0.0001022181 | $102.21           | <font color="red">+30_120</font>    |
| 9   | http_request_update | 190_795_432   | 76_908_172    | $0.0001022625 | $102.26           | <font color="green">-109_982</font> |
| 10  | http_request_update | 190_739_936   | 76_885_974    | $0.0001022330 | $102.23           | <font color="green">-168_563</font> |
| 11  | http_request_update | 190_861_423   | 76_934_569    | $0.0001022976 | $102.29           | <font color="green">-183_609</font> |
| 12  | http_request_update | 190_754_577   | 76_891_830    | $0.0001022408 | $102.24           | <font color="green">-132_838</font> |
| 13  | http_request_update | 191_019_300   | 76_997_720    | $0.0001023816 | $102.38           | <font color="red">+68_256</font>    |
| 14  | http_request_update | 195_758_137   | 78_893_254    | $0.0001049020 | $104.90           | <font color="red">+66_642</font>    |
| 15  | http_request_update | 196_116_721   | 79_036_688    | $0.0001050927 | $105.09           | <font color="red">+41_914</font>    |
| 16  | http_request_update | 226_315_329   | 91_116_131    | $0.0001211544 | $121.15           | <font color="green">-133_024</font> |
| 17  | http_request_update | 191_654_970   | 77_251_988    | $0.0001027197 | $102.71           | <font color="green">-103_418</font> |

## Baseline benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_631_252_346 | 5_853_090_938 | $0.0077826794 | $7_782.67         |
| 1   | http_request_update | 194_371_554   | 78_338_621    | $0.0001041645 | $104.16           |
| 2   | http_request_update | 194_185_814   | 78_264_325    | $0.0001040657 | $104.06           |
| 3   | http_request_update | 193_749_485   | 78_089_794    | $0.0001038337 | $103.83           |
| 4   | http_request_update | 190_167_450   | 76_656_980    | $0.0001019285 | $101.92           |
| 5   | http_request_update | 194_148_718   | 78_249_487    | $0.0001040460 | $104.04           |
| 6   | http_request_update | 190_717_157   | 76_876_862    | $0.0001022209 | $102.22           |
| 7   | http_request_update | 190_825_496   | 76_920_198    | $0.0001022785 | $102.27           |
| 8   | http_request_update | 190_681_823   | 76_862_729    | $0.0001022021 | $102.20           |
| 9   | http_request_update | 190_905_414   | 76_952_165    | $0.0001023210 | $102.32           |
| 10  | http_request_update | 190_908_499   | 76_953_399    | $0.0001023226 | $102.32           |
| 11  | http_request_update | 191_045_032   | 77_008_012    | $0.0001023952 | $102.39           |
| 12  | http_request_update | 190_887_415   | 76_944_966    | $0.0001023114 | $102.31           |
| 13  | http_request_update | 190_951_044   | 76_970_417    | $0.0001023453 | $102.34           |
| 14  | http_request_update | 195_691_495   | 78_866_598    | $0.0001048665 | $104.86           |
| 15  | http_request_update | 196_074_807   | 79_019_922    | $0.0001050704 | $105.07           |
| 16  | http_request_update | 226_448_353   | 91_169_341    | $0.0001212251 | $121.22           |
| 17  | http_request_update | 191_758_388   | 77_293_355    | $0.0001027747 | $102.77           |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
