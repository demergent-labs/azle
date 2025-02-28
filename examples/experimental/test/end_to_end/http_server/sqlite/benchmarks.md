# Benchmarks for sqlite

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions   | Cycles        | USD           | USD/Million Calls | Change                               |
| --- | ------------------- | -------------- | ------------- | ------------- | ----------------- | ------------------------------------ |
| 0   | postUpgrade         | 11_915_802_200 | 9_166_910_880 | $0.0121889664 | $12_188.96        | <font color="green">-241_977</font>  |
| 1   | http_request_update | 160_378_060    | 64_741_224    | $0.0000860845 | $86.08            | <font color="red">+12_355_822</font> |
| 2   | http_request_update | 75_101_221     | 30_630_488    | $0.0000407284 | $40.72            | <font color="green">-131_383</font>  |
| 3   | http_request_update | 144_092_188    | 58_226_875    | $0.0000774225 | $77.42            | <font color="red">+60_524</font>     |
| 4   | http_request_update | 83_208_309     | 33_873_323    | $0.0000450403 | $45.04            | <font color="red">+7_248</font>      |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name         | Instructions   | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade         | 11_916_044_177 | 9_167_007_670 | $0.0121890951 | $12_189.09        |
| 1   | http_request_update | 148_022_238    | 59_798_895    | $0.0000795128 | $79.51            |
| 2   | http_request_update | 75_232_604     | 30_683_041    | $0.0000407983 | $40.79            |
| 3   | http_request_update | 144_031_664    | 58_202_665    | $0.0000773903 | $77.39            |
| 4   | http_request_update | 83_201_061     | 33_870_424    | $0.0000450365 | $45.03            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
