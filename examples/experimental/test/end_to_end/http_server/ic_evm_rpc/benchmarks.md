# Benchmarks for server

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                                |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------- |
| 0   | init                | 7_541_053_726 | 5_817_011_490 | $0.0077347057 | $7_734.70         | <font color="red">+31_547</font>      |
| 1   | http_request_update | 173_212_364   | 69_874_945    | $0.0000929106 | $92.91            | <font color="red">+1_155_175</font>   |
| 2   | http_request_update | 173_823_685   | 70_119_474    | $0.0000932358 | $93.23            | <font color="red">+932_397</font>     |
| 3   | http_request_update | 224_620_187   | 90_438_074    | $0.0001202528 | $120.25           | <font color="green">-3_127_511</font> |
| 4   | http_request_update | 224_451_577   | 90_370_630    | $0.0001201631 | $120.16           | <font color="green">-3_078_066</font> |
| 5   | http_request_update | 2_339_175_453 | 1_736_260_181 | $0.0023086531 | $2_308.65         | <font color="green">-3_349_832</font> |
| 6   | http_request_update | 224_890_895   | 90_546_358    | $0.0001203968 | $120.39           | <font color="green">-3_347_402</font> |
| 7   | http_request_update | 226_419_783   | 91_157_913    | $0.0001212099 | $121.20           | <font color="green">-3_309_036</font> |
| 8   | http_request_update | 225_061_909   | 90_614_763    | $0.0001204877 | $120.48           | <font color="green">-3_298_499</font> |
| 9   | http_request_update | 225_234_018   | 90_683_607    | $0.0001205793 | $120.57           | <font color="green">-3_191_098</font> |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_541_022_179 | 5_816_998_871 | $0.0077346889 | $7_734.68         |
| 1   | http_request_update | 172_057_189   | 69_412_875    | $0.0000922962 | $92.29            |
| 2   | http_request_update | 172_891_288   | 69_746_515    | $0.0000927398 | $92.73            |
| 3   | http_request_update | 227_747_698   | 91_689_079    | $0.0001219162 | $121.91           |
| 4   | http_request_update | 227_529_643   | 91_601_857    | $0.0001218002 | $121.80           |
| 5   | http_request_update | 2_342_525_285 | 1_737_600_114 | $0.0023104347 | $2_310.43         |
| 6   | http_request_update | 228_238_297   | 91_885_318    | $0.0001221772 | $122.17           |
| 7   | http_request_update | 229_728_819   | 92_481_527    | $0.0001229699 | $122.96           |
| 8   | http_request_update | 228_360_408   | 91_934_163    | $0.0001222421 | $122.24           |
| 9   | http_request_update | 228_425_116   | 91_960_046    | $0.0001222765 | $122.27           |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
