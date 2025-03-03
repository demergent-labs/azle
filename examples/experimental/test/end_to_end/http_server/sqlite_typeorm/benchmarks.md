# Benchmarks for sqlite_typeorm

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls | Change                              |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- | ----------------------------------- |
| 0   | postUpgrade         | 13_376_083_719 | 10_551_023_487 | $0.0140293794 | $14_029.37        | <font color="red">+1_118_219</font> |
| 1   | http_request_update | 101_763_837    | 41_295_534     | $0.0000549094 | $54.90            | <font color="red">+154_129</font>   |
| 2   | http_request_update | 141_226_696    | 57_080_678     | $0.0000758985 | $75.89            | <font color="red">+115_376</font>   |
| 3   | http_request_update | 142_166_074    | 57_456_429     | $0.0000763981 | $76.39            | <font color="red">+222</font>       |
| 4   | http_request_update | 66_269_288     | 27_097_715     | $0.0000360310 | $36.03            | <font color="red">+82_721</font>    |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name         | Instructions   | Cycles         | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | -------------- | ------------- | ----------------- |
| 0   | postUpgrade         | 13_374_965_500 | 10_550_576_200 | $0.0140287847 | $14_028.78        |
| 1   | http_request_update | 101_609_708    | 41_233_883     | $0.0000548275 | $54.82            |
| 2   | http_request_update | 141_111_320    | 57_034_528     | $0.0000758371 | $75.83            |
| 3   | http_request_update | 142_165_852    | 57_456_340     | $0.0000763980 | $76.39            |
| 4   | http_request_update | 66_186_567     | 27_064_626     | $0.0000359870 | $35.98            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
