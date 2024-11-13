# Benchmarks for sqlite_drizzle

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | postUpgrade         | 13_196_850_035 | 10_479_330_014 | $0.0139340507 | $13_934.05        | <font color="red">+9_348_863</font> |
| 1   | http_request_update | 153_653_390    | 62_051_356     | $0.0000825078 | $82.50            | <font color="red">+144_010</font>   |
| 2   | http_request_update | 81_064_554     | 33_015_821     | $0.0000439001 | $43.90            | <font color="red">+166_378</font>   |
| 3   | http_request_update | 170_685_673    | 68_864_269     | $0.0000915668 | $91.56            | <font color="red">+94_325</font>    |
| 4   | http_request_update | 77_716_254     | 31_676_501     | $0.0000421193 | $42.11            | <font color="red">+56_562</font>    |

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
