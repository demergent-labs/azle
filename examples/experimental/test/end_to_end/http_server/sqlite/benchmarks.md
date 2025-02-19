# Benchmarks for sqlite

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name         | Instructions   | Cycles        | USD           | USD/Million Calls | Change                                  |
| --- | ------------------- | -------------- | ------------- | ------------- | ----------------- | --------------------------------------- |
| 0   | postUpgrade         | 11_923_018_395 | 9_169_797_358 | $0.0121928045 | $12_192.80        | <font color="green">-762_106_441</font> |
| 1   | http_request_update | 147_958_163    | 59_773_265    | $0.0000794787 | $79.47            | <font color="green">-803_486</font>     |
| 2   | http_request_update | 75_167_190     | 30_656_876    | $0.0000407635 | $40.76            | <font color="green">-792_892</font>     |
| 3   | http_request_update | 170_780_680    | 68_902_272    | $0.0000916173 | $91.61            | <font color="red">+25_833_792</font>    |
| 4   | http_request_update | 83_225_598     | 33_880_239    | $0.0000450495 | $45.04            | <font color="green">-763_768</font>     |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions   | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade         | 12_685_124_836 | 9_874_639_934 | $0.0131300125 | $13_130.01        |
| 1   | http_request_update | 148_761_649    | 60_094_659    | $0.0000799061 | $79.90            |
| 2   | http_request_update | 75_960_082     | 30_974_032    | $0.0000411852 | $41.18            |
| 3   | http_request_update | 144_946_888    | 58_568_755    | $0.0000778771 | $77.87            |
| 4   | http_request_update | 83_989_366     | 34_185_746    | $0.0000454558 | $45.45            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
