# Benchmarks for event_loop

## Current benchmarks Azle version: 0.33.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls | Change |
|-----------|-------------|------------|--------|-----|--------------|-------|
| 0 | testOrdering0 | 3_716_772 | 8_716_772 | $0.0000119420 | $11.94 | <font color="green">-79_468</font> |
| 1 | testOrdering2 | 3_640_866 | 8_640_866 | $0.0000118380 | $11.83 | <font color="green">-106_409</font> |
| 2 | testOrdering4 | 3_696_465 | 8_696_465 | $0.0000119142 | $11.91 | <font color="green">-94_078</font> |
| 3 | testOrdering6 | 738_499 | 5_738_499 | $0.0000078617 | $7.86 | <font color="red">+18_559</font> |
| 4 | testOrdering8 | 3_558_019 | 8_558_019 | $0.0000117245 | $11.72 | <font color="green">-91_585</font> |
| 5 | testOrdering10 | 787_098 | 5_787_098 | $0.0000079283 | $7.92 | <font color="red">+22_763</font> |
| 6 | testOrdering12 | 3_640_276 | 8_640_276 | $0.0000118372 | $11.83 | <font color="green">-105_663</font> |
| 7 | testOrdering13 | 651_238 | 5_651_238 | $0.0000077422 | $7.74 | <font color="red">+23_024</font> |
| 8 | testOrdering14 | 651_263 | 5_651_263 | $0.0000077422 | $7.74 | <font color="red">+23_876</font> |
| 9 | testOrdering15 | 653_452 | 5_653_452 | $0.0000077452 | $7.74 | <font color="red">+23_313</font> |
| 10 | testOrdering16 | 649_922 | 5_649_922 | $0.0000077404 | $7.74 | <font color="red">+21_682</font> |
| 11 | testOrdering17 | 681_061 | 5_681_061 | $0.0000077831 | $7.78 | <font color="red">+24_482</font> |
| 12 | testOrdering18 | 652_480 | 5_652_480 | $0.0000077439 | $7.74 | <font color="red">+23_875</font> |
| 13 | testOrdering19 | 762_328 | 5_762_328 | $0.0000078944 | $7.89 | <font color="red">+23_769</font> |
| 14 | testOrdering20 | 696_566 | 5_696_566 | $0.0000078043 | $7.80 | <font color="red">+24_077</font> |

## Baseline benchmarks Azle version: 0.32.0
| Id | Method Name | Instructions | Cycles | USD | USD/Million Calls |
|-----------|-------------|------------|--------|-----|--------------|
| 0 | testOrdering0 | 3_796_240 | 8_796_240 | $0.0000120508 | $12.05 |
| 1 | testOrdering2 | 3_747_275 | 8_747_275 | $0.0000119838 | $11.98 |
| 2 | testOrdering4 | 3_790_543 | 8_790_543 | $0.0000120430 | $12.04 |
| 3 | testOrdering6 | 719_940 | 5_719_940 | $0.0000078363 | $7.83 |
| 4 | testOrdering8 | 3_649_604 | 8_649_604 | $0.0000118500 | $11.84 |
| 5 | testOrdering10 | 764_335 | 5_764_335 | $0.0000078971 | $7.89 |
| 6 | testOrdering12 | 3_745_939 | 8_745_939 | $0.0000119819 | $11.98 |
| 7 | testOrdering13 | 628_214 | 5_628_214 | $0.0000077107 | $7.71 |
| 8 | testOrdering14 | 627_387 | 5_627_387 | $0.0000077095 | $7.70 |
| 9 | testOrdering15 | 630_139 | 5_630_139 | $0.0000077133 | $7.71 |
| 10 | testOrdering16 | 628_240 | 5_628_240 | $0.0000077107 | $7.71 |
| 11 | testOrdering17 | 656_579 | 5_656_579 | $0.0000077495 | $7.74 |
| 12 | testOrdering18 | 628_605 | 5_628_605 | $0.0000077112 | $7.71 |
| 13 | testOrdering19 | 738_559 | 5_738_559 | $0.0000078618 | $7.86 |
| 14 | testOrdering20 | 672_489 | 5_672_489 | $0.0000077713 | $7.77 |



---

**Note on calculations:**
- All calculations assume a 13-node subnet
- Cycles are calculated using the formula: base_fee + per_instruction_fee \* number_of_instructions
- base_fee: 5_000_000 cycles
- per_instruction_fee: 1 cycle
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.37 (as of June 27, 2025)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/references/cycles-cost-formulas).