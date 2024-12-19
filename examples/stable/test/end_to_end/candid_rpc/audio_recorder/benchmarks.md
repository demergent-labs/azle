# Benchmarks for audio_recorder

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name     | Instructions | Cycles     | USD           | USD/Million Calls | Change                            |
| --- | --------------- | ------------ | ---------- | ------------- | ----------------- | --------------------------------- |
| 0   | createUser      | 11_274_434   | 5_099_773  | $0.0000067810 | $6.78             | <font color="red">+63_476</font>  |
| 1   | createRecording | 31_367_227   | 13_136_890 | $0.0000174677 | $17.46            | <font color="red">+496_622</font> |
| 2   | deleteRecording | 43_955_908   | 18_172_363 | $0.0000241632 | $24.16            | <font color="red">+381_820</font> |
| 3   | createRecording | 31_170_998   | 13_058_399 | $0.0000173634 | $17.36            | <font color="red">+502_064</font> |
| 4   | deleteUser      | 29_986_452   | 12_584_580 | $0.0000167333 | $16.73            | <font color="red">+191_013</font> |

## Baseline benchmarks Azle version: 0.25.0-alpha

| Id  | Method Name     | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | --------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | createUser      | 11_210_958   | 5_074_383  | $0.0000067473 | $6.74             |
| 1   | createRecording | 30_870_605   | 12_938_242 | $0.0000172036 | $17.20            |
| 2   | deleteRecording | 43_574_088   | 18_019_635 | $0.0000239602 | $23.96            |
| 3   | createRecording | 30_668_934   | 12_857_573 | $0.0000170963 | $17.09            |
| 4   | deleteUser      | 29_795_439   | 12_508_175 | $0.0000166317 | $16.63            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
