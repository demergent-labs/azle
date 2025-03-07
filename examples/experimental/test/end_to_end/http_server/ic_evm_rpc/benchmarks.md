# Benchmarks for server

## Current benchmarks Azle version: 0.29.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                             |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ---------------------------------- |
| 0   | init                | 7_541_041_353 | 5_817_006_541 | $0.0077346991 | $7_734.69         | <font color="green">-12_373</font> |
| 1   | http_request_update | 173_271_956   | 69_898_782    | $0.0000929423 | $92.94            | <font color="red">+59_592</font>   |
| 2   | http_request_update | 173_850_066   | 70_130_026    | $0.0000932498 | $93.24            | <font color="red">+26_381</font>   |
| 3   | http_request_update | 224_564_828   | 90_415_931    | $0.0001202234 | $120.22           | <font color="green">-55_359</font> |
| 4   | http_request_update | 224_508_990   | 90_393_596    | $0.0001201937 | $120.19           | <font color="red">+57_413</font>   |
| 5   | http_request_update | 2_339_229_454 | 1_736_281_781 | $0.0023086818 | $2_308.68         | <font color="red">+54_001</font>   |
| 6   | http_request_update | 224_954_851   | 90_571_940    | $0.0001204308 | $120.43           | <font color="red">+63_956</font>   |
| 7   | http_request_update | 226_518_940   | 91_197_576    | $0.0001212627 | $121.26           | <font color="red">+99_157</font>   |
| 8   | http_request_update | 225_086_155   | 90_624_462    | $0.0001205006 | $120.50           | <font color="red">+24_246</font>   |
| 9   | http_request_update | 225_165_373   | 90_656_149    | $0.0001205428 | $120.54           | <font color="green">-68_645</font> |

## Baseline benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 7_541_053_726 | 5_817_011_490 | $0.0077347057 | $7_734.70         |
| 1   | http_request_update | 173_212_364   | 69_874_945    | $0.0000929106 | $92.91            |
| 2   | http_request_update | 173_823_685   | 70_119_474    | $0.0000932358 | $93.23            |
| 3   | http_request_update | 224_620_187   | 90_438_074    | $0.0001202528 | $120.25           |
| 4   | http_request_update | 224_451_577   | 90_370_630    | $0.0001201631 | $120.16           |
| 5   | http_request_update | 2_339_175_453 | 1_736_260_181 | $0.0023086531 | $2_308.65         |
| 6   | http_request_update | 224_890_895   | 90_546_358    | $0.0001203968 | $120.39           |
| 7   | http_request_update | 226_419_783   | 91_157_913    | $0.0001212099 | $121.20           |
| 8   | http_request_update | 225_061_909   | 90_614_763    | $0.0001204877 | $120.48           |
| 9   | http_request_update | 225_234_018   | 90_683_607    | $0.0001205793 | $120.57           |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
