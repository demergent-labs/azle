# Benchmarks for sqlite

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name         | Instructions   | Cycles        | USD           | USD/Million Calls | Change                                 |
| --- | ------------------- | -------------- | ------------- | ------------- | ----------------- | -------------------------------------- |
| 0   | postUpgrade         | 11_916_044_177 | 9_167_007_670 | $0.0121890951 | $12_189.09        | <font color="green">-6_974_218</font>  |
| 1   | http_request_update | 148_022_238    | 59_798_895    | $0.0000795128 | $79.51            | <font color="red">+64_075</font>       |
| 2   | http_request_update | 75_232_604     | 30_683_041    | $0.0000407983 | $40.79            | <font color="red">+65_414</font>       |
| 3   | http_request_update | 144_031_664    | 58_202_665    | $0.0000773903 | $77.39            | <font color="green">-26_749_016</font> |
| 4   | http_request_update | 83_201_061     | 33_870_424    | $0.0000450365 | $45.03            | <font color="green">-24_537</font>     |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name         | Instructions   | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade         | 11_923_018_395 | 9_169_797_358 | $0.0121928045 | $12_192.80        |
| 1   | http_request_update | 147_958_163    | 59_773_265    | $0.0000794787 | $79.47            |
| 2   | http_request_update | 75_167_190     | 30_656_876    | $0.0000407635 | $40.76            |
| 3   | http_request_update | 170_780_680    | 68_902_272    | $0.0000916173 | $91.61            |
| 4   | http_request_update | 83_225_598     | 33_880_239    | $0.0000450495 | $45.04            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
