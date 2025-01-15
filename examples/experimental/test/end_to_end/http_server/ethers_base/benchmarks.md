# Benchmarks for server

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 8_280_030_197 | 6_512_602_078 | $0.0086596116 | $8_659.61         |
| 1   | http_request_update | 174_586_271   | 70_424_508    | $0.0000936414 | $93.64            |
| 2   | http_request_update | 175_322_251   | 70_718_900    | $0.0000940328 | $94.03            |
| 3   | http_request_update | 215_285_220   | 86_704_088    | $0.0001152878 | $115.28           |
| 4   | http_request_update | 215_511_780   | 86_794_712    | $0.0001154083 | $115.40           |
| 5   | http_request_update | 2_349_368_440 | 1_740_337_376 | $0.0023140744 | $2_314.07         |
| 6   | http_request_update | 215_980_327   | 86_982_130    | $0.0001156575 | $115.65           |
| 7   | http_request_update | 195_618_826   | 78_837_530    | $0.0001048279 | $104.82           |
| 8   | http_request_update | 215_583_302   | 86_823_320    | $0.0001154464 | $115.44           |
| 9   | http_request_update | 215_571_877   | 86_818_750    | $0.0001154403 | $115.44           |

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
