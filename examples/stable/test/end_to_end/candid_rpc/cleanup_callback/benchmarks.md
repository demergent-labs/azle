# Benchmarks for cleanup_callback

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name                               | Instructions | Cycles  | USD           | USD/Million Calls |
| --- | ----------------------------------------- | ------------ | ------- | ------------- | ----------------- |
| 0   | getRandomness                             | 969_107      | 977_642 | $0.0000012999 | $1.29             |
| 1   | getRandomnessWithTrapUncaught             | 894_864      | 947_945 | $0.0000012605 | $1.26             |
| 2   | getRandomnessWithTrapCaught               | 897_797      | 949_118 | $0.0000012620 | $1.26             |
| 3   | getRandomnessWithTrapCaughtRejectCallback | 897_776      | 949_110 | $0.0000012620 | $1.26             |
| 4   | getRandomnessWithTrapCaughtPromise        | 919_217      | 957_686 | $0.0000012734 | $1.27             |
| 5   | getRandomnessWithTrapCaughtAndTrapAgain   | 892_815      | 947_126 | $0.0000012594 | $1.25             |
| 6   | deleteAzleGlobalSettleCallbacks           | 993_041      | 987_216 | $0.0000013127 | $1.31             |
| 7   | getRandomnessMsgRejectInReplyCallback     | 585_418      | 824_167 | $0.0000010959 | $1.09             |
| 8   | getRandomnessMsgRejectInRejectCallback    | 582_737      | 823_094 | $0.0000010944 | $1.09             |

## Baseline benchmarks Azle version: No previous benchmarks

No benchmarks reported

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
