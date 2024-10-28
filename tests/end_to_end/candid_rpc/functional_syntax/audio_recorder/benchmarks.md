# Benchmarks for audio_recorder

## Current benchmarks Azle version: 0.24.2-rc.85

| Id  | Method Name     | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | --------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | createUser      | 14_150_728   | 6_250_291  | $0.0000083108 | $8.31             |
| 1   | createRecording | 34_624_818   | 14_439_927 | $0.0000192003 | $19.20            |
| 2   | deleteRecording | 48_509_141   | 19_993_656 | $0.0000265850 | $26.58            |
| 3   | createRecording | 34_421_509   | 14_358_603 | $0.0000190922 | $19.09            |
| 4   | deleteUser      | 34_127_556   | 14_241_022 | $0.0000189359 | $18.93            |

## Baseline benchmarks Azle version: 0.24.2-rc.85

No benchmarks reported

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
