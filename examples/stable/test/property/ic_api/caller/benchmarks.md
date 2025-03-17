⚠️ **WARNING: Benchmark process failed for version 0.30.0**

# Benchmarks for canister

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name             | Instructions | Cycles      | USD           | USD/Million Calls |
| --- | ----------------------- | ------------ | ----------- | ------------- | ----------------- |
| 0   | postUpgrade             | 998_348_106  | 399_929_242 | $0.0005317739 | $531.77           |
| 1   | getUpdateCaller         | 1_283_849    | 1_103_539   | $0.0000014673 | $1.46             |
| 2   | setInspectMessageCaller | 954_701      | 971_880     | $0.0000012923 | $1.29             |
| 3   | getUpdateCaller         | 1_259_188    | 1_093_675   | $0.0000014542 | $1.45             |

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
