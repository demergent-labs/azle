# Benchmarks for sqlite

## Current benchmarks Azle version: 0.28.0

| Id  | Method Name         | Instructions   | Cycles        | USD           | USD/Million Calls | Change                               |
| --- | ------------------- | -------------- | ------------- | ------------- | ----------------- | ------------------------------------ |
| 0   | postUpgrade         | 11_915_519_082 | 9_166_797_632 | $0.0121888158 | $12_188.81        | <font color="green">-525_095</font>  |
| 1   | http_request_update | 147_801_868    | 59_710_747    | $0.0000793956 | $79.39            | <font color="green">-220_370</font>  |
| 2   | http_request_update | 74_922_851     | 30_559_140    | $0.0000406336 | $40.63            | <font color="green">-309_753</font>  |
| 3   | http_request_update | 161_809_166    | 65_313_666    | $0.0000868456 | $86.84            | <font color="red">+17_777_502</font> |
| 4   | http_request_update | 83_155_210     | 33_852_084    | $0.0000450121 | $45.01            | <font color="green">-45_851</font>   |

## Baseline benchmarks Azle version: 0.27.0

| Id  | Method Name         | Instructions   | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | -------------- | ------------- | ------------- | ----------------- |
| 0   | postUpgrade         | 11_916_044_177 | 9_167_007_670 | $0.0121890951 | $12_189.09        |
| 1   | http_request_update | 148_022_238    | 59_798_895    | $0.0000795128 | $79.51            |
| 2   | http_request_update | 75_232_604     | 30_683_041    | $0.0000407983 | $40.79            |
| 3   | http_request_update | 144_031_664    | 58_202_665    | $0.0000773903 | $77.39            |
| 4   | http_request_update | 83_201_061     | 33_870_424    | $0.0000450365 | $45.03            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
