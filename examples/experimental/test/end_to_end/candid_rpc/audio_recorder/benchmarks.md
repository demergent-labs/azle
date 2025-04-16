# Benchmarks for audio_recorder

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name     | Instructions | Cycles     | USD           | USD/Million Calls | Change                            |
| --- | --------------- | ------------ | ---------- | ------------- | ----------------- | --------------------------------- |
| 0   | createUser      | 14_135_853   | 6_244_341  | $0.0000083029 | $8.30             | <font color="red">+8_554</font>   |
| 1   | createRecording | 34_570_682   | 14_418_272 | $0.0000191715 | $19.17            | <font color="red">+25_723</font>  |
| 2   | deleteRecording | 48_480_118   | 19_982_047 | $0.0000265695 | $26.56            | <font color="red">+47_664</font>  |
| 3   | createRecording | 34_345_404   | 14_328_161 | $0.0000190517 | $19.05            | <font color="green">-5_655</font> |
| 4   | deleteUser      | 34_032_604   | 14_203_041 | $0.0000188854 | $18.88            | <font color="red">+35_857</font>  |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name     | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | --------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | createUser      | 14_127_299   | 6_240_919  | $0.0000082984 | $8.29             |
| 1   | createRecording | 34_544_959   | 14_407_983 | $0.0000191579 | $19.15            |
| 2   | deleteRecording | 48_432_454   | 19_962_981 | $0.0000265442 | $26.54            |
| 3   | createRecording | 34_351_059   | 14_330_423 | $0.0000190547 | $19.05            |
| 4   | deleteUser      | 33_996_747   | 14_188_698 | $0.0000188663 | $18.86            |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
