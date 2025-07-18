# Benchmarks for canister

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name                      | Instructions  | Cycles      | USD           | USD/Million Calls | Change                              |
| --- | -------------------------------- | ------------- | ----------- | ------------- | ----------------- | ----------------------------------- |
| 0   | init                             | 1_001_488_466 | 801_185_386 | $0.0010653122 | $1_065.31         | <font color="red">+4_076_739</font> |
| 1   | setInspectMessageCanisterVersion | 962_346       | 974_938     | $0.0000012963 | $1.29             | <font color="red">+881</font>       |
| 2   | getUpdateCanisterVersion         | 1_580_202     | 1_222_080   | $0.0000016250 | $1.62             | <font color="red">+4_322</font>     |

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
