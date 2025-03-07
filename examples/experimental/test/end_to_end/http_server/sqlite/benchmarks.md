# Benchmarks for sqlite

## Current benchmarks Azle version: 0.29.0

| Id  | Method Name         | Instructions   | Cycles        | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | -------------- | ------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | postUpgrade         | 11_914_830_934 | 9_166_522_373 | $0.0121884498 | $12_188.44        | <font color="green">-971_266</font> |
| 1   | http_request_update | 160_171_281    | 64_658_512    | $0.0000859745 | $85.97            | <font color="green">-206_779</font> |
| 2   | http_request_update | 75_131_753     | 30_642_701    | $0.0000407447 | $40.74            | <font color="red">+30_532</font>    |
| 3   | http_request_update | 144_176_993    | 58_260_797    | $0.0000774676 | $77.46            | <font color="red">+84_805</font>    |
| 4   | http_request_update | 83_179_224     | 33_861_689    | $0.0000450249 | $45.02            | <font color="green">-29_085</font>  |

## Baseline benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions   | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade         | 11_915_802_200 | 9_166_910_880 | $0.0121889664 | $12_188.96        |
| 1   | http_request_update | 160_378_060    | 64_741_224    | $0.0000860845 | $86.08            |
| 2   | http_request_update | 75_101_221     | 30_630_488    | $0.0000407284 | $40.72            |
| 3   | http_request_update | 144_092_188    | 58_226_875    | $0.0000774225 | $77.42            |
| 4   | http_request_update | 83_208_309     | 33_873_323    | $0.0000450403 | $45.04            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
