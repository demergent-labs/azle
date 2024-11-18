# Benchmarks for sqlite_drizzle

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | postUpgrade         | 13_197_088_193 | 10_479_425_277 | $0.0139341774 | $13_934.17        | <font color="red">+9_587_021</font> |
| 1   | http_request_update | 153_421_131    | 61_958_452     | $0.0000823843 | $82.38            | <font color="green">-88_249</font>  |
| 2   | http_request_update | 80_696_981     | 32_868_792     | $0.0000437046 | $43.70            | <font color="green">-201_195</font> |
| 3   | http_request_update | 170_530_630    | 68_802_252     | $0.0000914843 | $91.48            | <font color="green">-60_718</font>  |
| 4   | http_request_update | 77_598_313     | 31_629_325     | $0.0000420566 | $42.05            | <font color="green">-61_379</font>  |

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
