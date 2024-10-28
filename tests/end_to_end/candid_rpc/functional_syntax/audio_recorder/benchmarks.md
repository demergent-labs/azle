# Benchmarks for audio_recorder

## Current benchmarks Azle version: 0.24.2-rc.88

| Id  | Method Name     | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | --------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | createUser      | 14_155_401   | 6_252_160  | $0.0000083133 | $8.31             |
| 1   | createRecording | 34_633_486   | 14_443_394 | $0.0000192049 | $19.20            |
| 2   | deleteRecording | 48_508_682   | 19_993_472 | $0.0000265847 | $26.58            |
| 3   | createRecording | 34_434_503   | 14_363_801 | $0.0000190991 | $19.09            |
| 4   | deleteUser      | 34_136_108   | 14_244_443 | $0.0000189404 | $18.94            |

## Baseline benchmarks Azle version: 0.24.2-rc.88

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
