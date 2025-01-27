# Benchmarks for basic_bitcoin

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 8_779_007_825 | 6_712_193_130 | $0.0089250018 | $8_925.00         |
| 1   | http_request_update | 174_123_912   | 70_239_564    | $0.0000933954 | $93.39            |
| 2   | http_request_update | 174_128_579   | 70_241_431    | $0.0000933979 | $93.39            |
| 3   | http_request_update | 174_446_306   | 70_368_522    | $0.0000935669 | $93.56            |
| 4   | http_request_update | 174_109_788   | 70_233_915    | $0.0000933879 | $93.38            |
| 5   | http_request_update | 174_145_212   | 70_248_084    | $0.0000934068 | $93.40            |
| 6   | http_request_update | 174_552_462   | 70_410_984    | $0.0000936234 | $93.62            |
| 7   | http_request_update | 174_178_643   | 70_261_457    | $0.0000934246 | $93.42            |
| 8   | http_request_update | 176_633_984   | 71_243_593    | $0.0000947305 | $94.73            |
| 9   | http_request_update | 172_916_562   | 69_756_624    | $0.0000927533 | $92.75            |
| 10  | http_request_update | 174_698_352   | 70_469_340    | $0.0000937010 | $93.70            |
| 11  | http_request_update | 181_683_752   | 73_263_500    | $0.0000974163 | $97.41            |
| 12  | http_request_update | 174_568_721   | 70_417_488    | $0.0000936320 | $93.63            |
| 13  | http_request_update | 174_017_899   | 70_197_159    | $0.0000933391 | $93.33            |
| 14  | http_request_update | 174_638_848   | 70_445_539    | $0.0000936693 | $93.66            |
| 15  | http_request_update | 207_936_717   | 83_764_686    | $0.0001113794 | $111.37           |
| 16  | http_request_update | 175_436_341   | 70_764_536    | $0.0000940935 | $94.09            |
| 17  | http_request_update | 174_928_029   | 70_561_211    | $0.0000938231 | $93.82            |
| 18  | http_request_update | 174_381_428   | 70_342_571    | $0.0000935324 | $93.53            |
| 19  | http_request_update | 174_754_168   | 70_491_667    | $0.0000937307 | $93.73            |
| 20  | http_request_update | 173_168_980   | 69_857_592    | $0.0000928875 | $92.88            |
| 21  | http_request_update | 173_199_368   | 69_869_747    | $0.0000929037 | $92.90            |

## Baseline benchmarks Azle version: No previous benchmarks

No benchmarks reported

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
