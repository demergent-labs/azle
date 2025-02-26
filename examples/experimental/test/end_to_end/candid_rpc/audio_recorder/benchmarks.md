# Benchmarks for audio_recorder

## Current benchmarks Azle version: 0.27.0

| Id  | Method Name     | Instructions | Cycles     | USD           | USD/Million Calls | Change                              |
| --- | --------------- | ------------ | ---------- | ------------- | ----------------- | ----------------------------------- |
| 0   | createUser      | 14_148_231   | 6_249_292  | $0.0000083095 | $8.30             | <font color="green">-43_686</font>  |
| 1   | createRecording | 34_592_327   | 14_426_930 | $0.0000191831 | $19.18            | <font color="green">-79_247</font>  |
| 2   | deleteRecording | 48_466_454   | 19_976_581 | $0.0000265623 | $26.56            | <font color="green">-126_432</font> |
| 3   | createRecording | 34_383_895   | 14_343_558 | $0.0000190722 | $19.07            | <font color="green">-105_770</font> |
| 4   | deleteUser      | 34_069_057   | 14_217_622 | $0.0000189047 | $18.90            | <font color="green">-59_616</font>  |

## Baseline benchmarks Azle version: 0.26.0

| Id  | Method Name     | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | --------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | createUser      | 14_191_917   | 6_266_766  | $0.0000083327 | $8.33             |
| 1   | createRecording | 34_671_574   | 14_458_629 | $0.0000192252 | $19.22            |
| 2   | deleteRecording | 48_592_886   | 20_027_154 | $0.0000266295 | $26.62            |
| 3   | createRecording | 34_489_665   | 14_385_866 | $0.0000191285 | $19.12            |
| 4   | deleteUser      | 34_128_673   | 14_241_469 | $0.0000189365 | $18.93            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
