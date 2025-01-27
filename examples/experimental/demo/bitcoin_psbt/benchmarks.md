# Benchmarks for bitcoin_psbt

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- |
| 0   | init                | 17_791_266_982 | 13_917_096_792 | $0.0185051461 | $18_505.14        |
| 1   | http_request_update | 176_038_454    | 71_005_381     | $0.0000944137 | $94.41            |
| 2   | http_request_update | 175_933_422    | 70_963_368     | $0.0000943579 | $94.35            |
| 3   | http_request_update | 176_869_544    | 71_337_817     | $0.0000948558 | $94.85            |
| 4   | http_request_update | 176_171_680    | 71_058_672     | $0.0000944846 | $94.48            |
| 5   | http_request_update | 176_201_623    | 71_070_649     | $0.0000945005 | $94.50            |
| 6   | http_request_update | 176_921_910    | 71_358_764     | $0.0000948836 | $94.88            |
| 7   | http_request_update | 176_120_658    | 71_038_263     | $0.0000944574 | $94.45            |
| 8   | http_request_update | 178_878_783    | 72_141_513     | $0.0000959244 | $95.92            |
| 9   | http_request_update | 174_880_012    | 70_542_004     | $0.0000937976 | $93.79            |
| 10  | http_request_update | 176_410_299    | 71_154_119     | $0.0000946115 | $94.61            |
| 11  | http_request_update | 184_305_328    | 74_312_131     | $0.0000988106 | $98.81            |
| 12  | http_request_update | 176_684_085    | 71_263_634     | $0.0000947571 | $94.75            |
| 13  | http_request_update | 176_136_026    | 71_044_410     | $0.0000944656 | $94.46            |
| 14  | http_request_update | 177_111_166    | 71_434_466     | $0.0000949843 | $94.98            |
| 15  | http_request_update | 174_935_124    | 70_564_049     | $0.0000938269 | $93.82            |
| 16  | http_request_update | 177_254_483    | 71_491_793     | $0.0000950605 | $95.06            |
| 17  | http_request_update | 176_634_278    | 71_243_711     | $0.0000947306 | $94.73            |
| 18  | http_request_update | 176_262_440    | 71_094_976     | $0.0000945329 | $94.53            |
| 19  | http_request_update | 177_026_760    | 71_400_704     | $0.0000949394 | $94.93            |
| 20  | http_request_update | 174_957_847    | 70_573_138     | $0.0000938390 | $93.83            |
| 21  | http_request_update | 174_840_564    | 70_526_225     | $0.0000937766 | $93.77            |

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
