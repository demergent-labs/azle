# Benchmarks for canister

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name             | Instructions  | Cycles      | USD           | USD/Million Calls | Change                              |
| --- | ----------------------- | ------------- | ----------- | ------------- | ----------------- | ----------------------------------- |
| 0   | postUpgrade             | 1_001_806_119 | 801_312_447 | $0.0010654811 | $1_065.48         | <font color="red">+3_458_013</font> |
| 1   | getUpdateCaller         | 1_279_617     | 1_101_846   | $0.0000014651 | $1.46             | <font color="green">-4_232</font>   |
| 2   | setInspectMessageCaller | 953_176       | 971_270     | $0.0000012915 | $1.29             | <font color="green">-1_525</font>   |
| 3   | getUpdateCaller         | 1_259_698     | 1_093_879   | $0.0000014545 | $1.45             | <font color="red">+510</font>       |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name             | Instructions | Cycles      | USD           | USD/Million Calls |
| --- | ----------------------- | ------------ | ----------- | ------------- | ----------------- |
| 0   | postUpgrade             | 998_348_106  | 399_929_242 | $0.0005317739 | $531.77           |
| 1   | getUpdateCaller         | 1_283_849    | 1_103_539   | $0.0000014673 | $1.46             |
| 2   | setInspectMessageCaller | 954_701      | 971_880     | $0.0000012923 | $1.29             |
| 3   | getUpdateCaller         | 1_259_188    | 1_093_675   | $0.0000014542 | $1.45             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
