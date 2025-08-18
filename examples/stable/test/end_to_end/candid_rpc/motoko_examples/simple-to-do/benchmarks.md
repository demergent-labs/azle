# Benchmarks for simple_to_do

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | addTodo | 2_061_951 | 7_061_951 | $0.0000096749 | $9.67 | <font color="green">-22_076</font> |
| 1 | addTodo | 1_769_165 | 6_769_165 | $0.0000092738 | $9.27 | <font color="green">-21_039</font> |
| 2 | completeTodo | 1_037_242 | 6_037_242 | $0.0000082710 | $8.27 | <font color="green">-22_694</font> |
| 3 | clearCompleted | 969_764 | 5_969_764 | $0.0000081786 | $8.17 | <font color="green">-22_084</font> |
| 4 | completeTodo | 1_030_329 | 6_030_329 | $0.0000082616 | $8.26 | <font color="green">-22_404</font> |
| 5 | clearCompleted | 957_062 | 5_957_062 | $0.0000081612 | $8.16 | <font color="green">-18_646</font> |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | addTodo | 2_084_027 | 7_084_027 | $0.0000097051 | $9.70 |
| 1 | addTodo | 1_790_204 | 6_790_204 | $0.0000093026 | $9.30 |
| 2 | completeTodo | 1_059_936 | 6_059_936 | $0.0000083021 | $8.30 |
| 3 | clearCompleted | 991_848 | 5_991_848 | $0.0000082088 | $8.20 |
| 4 | completeTodo | 1_052_733 | 6_052_733 | $0.0000082922 | $8.29 |
| 5 | clearCompleted | 975_708 | 5_975_708 | $0.0000081867 | $8.18 |



---

**Note on calculations:**
- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).