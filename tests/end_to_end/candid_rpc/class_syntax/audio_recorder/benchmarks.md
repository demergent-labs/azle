# Benchmarks for audio_recorder

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name     | Instructions | Cycles     | USD           | USD/Million Calls | Change                            |
| --- | --------------- | ------------ | ---------- | ------------- | ----------------- | --------------------------------- |
| 0   | createUser      | 11_276_714   | 5_100_685  | $0.0000067822 | $6.78             | <font color="red">+65_756</font>  |
| 1   | createRecording | 31_366_210   | 13_136_484 | $0.0000174672 | $17.46            | <font color="red">+495_605</font> |
| 2   | deleteRecording | 43_941_406   | 18_166_562 | $0.0000241555 | $24.15            | <font color="red">+367_318</font> |
| 3   | createRecording | 31_179_822   | 13_061_928 | $0.0000173681 | $17.36            | <font color="red">+510_888</font> |
| 4   | deleteUser      | 29_984_407   | 12_583_762 | $0.0000167323 | $16.73            | <font color="red">+188_968</font> |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name     | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | --------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | createUser      | 11_210_958   | 5_074_383  | $0.0000067473 | $6.74             |
| 1   | createRecording | 30_870_605   | 12_938_242 | $0.0000172036 | $17.20            |
| 2   | deleteRecording | 43_574_088   | 18_019_635 | $0.0000239602 | $23.96            |
| 3   | createRecording | 30_668_934   | 12_857_573 | $0.0000170963 | $17.09            |
| 4   | deleteUser      | 29_795_439   | 12_508_175 | $0.0000166317 | $16.63            |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
