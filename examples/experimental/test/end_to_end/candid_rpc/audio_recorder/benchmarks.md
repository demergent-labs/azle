# Benchmarks for audio_recorder

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name     | Instructions | Cycles     | USD           | USD/Million Calls | Change                            |
| --- | --------------- | ------------ | ---------- | ------------- | ----------------- | --------------------------------- |
| 0   | createUser      | 14_191_917   | 6_266_766  | $0.0000083327 | $8.33             | <font color="red">+33_399</font>  |
| 1   | createRecording | 34_671_574   | 14_458_629 | $0.0000192252 | $19.22            | <font color="red">+120_668</font> |
| 2   | deleteRecording | 48_592_886   | 20_027_154 | $0.0000266295 | $26.62            | <font color="red">+92_900</font>  |
| 3   | createRecording | 34_489_665   | 14_385_866 | $0.0000191285 | $19.12            | <font color="red">+63_734</font>  |
| 4   | deleteUser      | 34_128_673   | 14_241_469 | $0.0000189365 | $18.93            | <font color="red">+87_839</font>  |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name     | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | --------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | createUser      | 14_158_518   | 6_253_407  | $0.0000083150 | $8.31             |
| 1   | createRecording | 34_550_906   | 14_410_362 | $0.0000191610 | $19.16            |
| 2   | deleteRecording | 48_499_986   | 19_989_994 | $0.0000265801 | $26.58            |
| 3   | createRecording | 34_425_931   | 14_360_372 | $0.0000190946 | $19.09            |
| 4   | deleteUser      | 34_040_834   | 14_206_333 | $0.0000188897 | $18.88            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
