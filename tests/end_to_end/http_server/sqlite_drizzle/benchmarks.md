# Benchmarks for sqlite_drizzle

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls | Change                               |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- | ------------------------------------ |
| 0   | postUpgrade         | 13_205_548_136 | 10_482_809_254 | $0.0139386770 | $13_938.67        | <font color="red">+18_046_964</font> |
| 1   | http_request_update | 153_529_648    | 62_001_859     | $0.0000824420 | $82.44            | <font color="red">+20_268</font>     |
| 2   | http_request_update | 80_853_572     | 32_931_428     | $0.0000437879 | $43.78            | <font color="green">-44_604</font>   |
| 3   | http_request_update | 170_858_020    | 68_933_208     | $0.0000916584 | $91.65            | <font color="red">+266_672</font>    |
| 4   | http_request_update | 77_675_979     | 31_660_391     | $0.0000420979 | $42.09            | <font color="red">+16_287</font>     |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- |
| 0   | postUpgrade         | 13_187_501_172 | 10_475_590_468 | $0.0139290784 | $13_929.07        |
| 1   | http_request_update | 153_509_380    | 61_993_752     | $0.0000824312 | $82.43            |
| 2   | http_request_update | 80_898_176     | 32_949_270     | $0.0000438117 | $43.81            |
| 3   | http_request_update | 170_591_348    | 68_826_539     | $0.0000915166 | $91.51            |
| 4   | http_request_update | 77_659_692     | 31_653_876     | $0.0000420892 | $42.08            |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
