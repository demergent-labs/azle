# Benchmarks for audio_recorder

## Current benchmarks Azle version: 0.24.2-rc.60

| Id  | Method Name     | Instructions | Cycles     | USD           | USD/Million Calls |
| --- | --------------- | ------------ | ---------- | ------------- | ----------------- |
| 0   | createUser      | 14_172_541   | 6_259_016  | $0.0000083224 | $8.32             |
| 1   | createRecording | 34_595_741   | 14_428_296 | $0.0000191849 | $19.18            |
| 2   | deleteRecording | 48_498_752   | 19_989_500 | $0.0000265794 | $26.57            |
| 3   | createRecording | 34_440_835   | 14_366_334 | $0.0000191025 | $19.10            |
| 4   | deleteUser      | 34_128_055   | 14_241_222 | $0.0000189361 | $18.93            |

## Baseline benchmarks Azle version: 0.24.2-rc.60

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
