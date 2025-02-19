# Benchmarks for bitcoin_psbt

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- |
| 0   | init                | 16_062_983_683 | 12_825_783_473 | $0.0170540595 | $17_054.05        |
| 1   | http_request_update | 175_914_761    | 70_955_904     | $0.0000943479 | $94.34            |
| 2   | http_request_update | 175_840_147    | 70_926_058     | $0.0000943083 | $94.30            |
| 3   | http_request_update | 176_661_877    | 71_254_750     | $0.0000947453 | $94.74            |
| 4   | http_request_update | 175_840_248    | 70_926_099     | $0.0000943083 | $94.30            |
| 5   | http_request_update | 175_777_127    | 70_900_850     | $0.0000942747 | $94.27            |
| 6   | http_request_update | 176_588_204    | 71_225_281     | $0.0000947061 | $94.70            |
| 7   | http_request_update | 175_846_862    | 70_928_744     | $0.0000943118 | $94.31            |
| 8   | http_request_update | 178_478_694    | 71_981_477     | $0.0000957116 | $95.71            |
| 9   | http_request_update | 174_483_051    | 70_383_220     | $0.0000935865 | $93.58            |
| 10  | http_request_update | 176_438_564    | 71_165_425     | $0.0000946265 | $94.62            |
| 11  | http_request_update | 183_612_649    | 74_035_059     | $0.0000984422 | $98.44            |
| 12  | http_request_update | 176_172_265    | 71_058_906     | $0.0000944849 | $94.48            |
| 13  | http_request_update | 175_838_915    | 70_925_566     | $0.0000943076 | $94.30            |
| 14  | http_request_update | 176_586_129    | 71_224_451     | $0.0000947050 | $94.70            |
| 15  | http_request_update | 174_403_544    | 70_351_417     | $0.0000935442 | $93.54            |
| 16  | http_request_update | 176_752_594    | 71_291_037     | $0.0000947936 | $94.79            |
| 17  | http_request_update | 176_265_419    | 71_096_167     | $0.0000945344 | $94.53            |
| 18  | http_request_update | 175_714_597    | 70_875_838     | $0.0000942415 | $94.24            |
| 19  | http_request_update | 176_553_493    | 71_211_397     | $0.0000946877 | $94.68            |
| 20  | http_request_update | 174_451_384    | 70_370_553     | $0.0000935696 | $93.56            |
| 21  | http_request_update | 174_290_572    | 70_306_228     | $0.0000934841 | $93.48            |

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
