# Benchmarks for canister

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name                      | Instructions  | Cycles      | USD           | USD/Million Calls | Change                              |
| --- | -------------------------------- | ------------- | ----------- | ------------- | ----------------- | ----------------------------------- |
| 0   | postUpgrade                      | 1_002_136_711 | 801_444_684 | $0.0010656570 | $1_065.65         | <font color="red">+4_724_984</font> |
| 1   | setInspectMessageCanisterVersion | 956_682       | 972_672     | $0.0000012933 | $1.29             | <font color="green">-4_783</font>   |
| 2   | getUpdateCanisterVersion         | 1_571_507     | 1_218_602   | $0.0000016203 | $1.62             | <font color="green">-4_373</font>   |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name                      | Instructions | Cycles      | USD           | USD/Million Calls |
| --- | -------------------------------- | ------------ | ----------- | ------------- | ----------------- |
| 0   | init                             | 997_411_727  | 399_554_690 | $0.0005312759 | $531.27           |
| 1   | setInspectMessageCanisterVersion | 961_465      | 974_586     | $0.0000012959 | $1.29             |
| 2   | getUpdateCanisterVersion         | 1_575_880    | 1_220_352   | $0.0000016227 | $1.62             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
