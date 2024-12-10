# Benchmarks for http_counter

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls | Change                               |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------ |
| 0   | init                | 5_401_293_561 | 4_161_107_424 | $0.0055328997 | $5_532.89         | <font color="red">+12_661_569</font> |
| 1   | http_request_update | 36_649_944    | 15_249_977    | $0.0000202774 | $20.27            | <font color="red">+35_259</font>     |
| 2   | http_request_update | 36_621_697    | 15_238_678    | $0.0000202624 | $20.26            | <font color="red">+47_123</font>     |
| 3   | http_request_update | 36_878_834    | 15_341_533    | $0.0000203992 | $20.39            | <font color="red">+100_211</font>    |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 5_388_631_992 | 4_156_042_796 | $0.0055261654 | $5_526.16         |
| 1   | http_request_update | 36_614_685    | 15_235_874    | $0.0000202587 | $20.25            |
| 2   | http_request_update | 36_574_574    | 15_219_829    | $0.0000202374 | $20.23            |
| 3   | http_request_update | 36_778_623    | 15_301_449    | $0.0000203459 | $20.34            |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
