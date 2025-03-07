# Benchmarks for wallet

## Current benchmarks Azle version: 0.29.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls | Change                     |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- | -------------------------- |
| 0   | add_to_whitelist | 1_540_129    | 1_206_051 | $0.0000016036 | $1.60             | <font color="red">0</font> |
| 1   | wallet_receive   | 1_791_615    | 1_306_646 | $0.0000017374 | $1.73             | <font color="red">0</font> |
| 2   | wallet_receive   | 1_782_446    | 1_302_978 | $0.0000017325 | $1.73             | <font color="red">0</font> |
| 3   | wallet_receive   | 1_778_629    | 1_301_451 | $0.0000017305 | $1.73             | <font color="red">0</font> |
| 4   | wallet_receive   | 1_775_542    | 1_300_216 | $0.0000017289 | $1.72             | <font color="red">0</font> |
| 5   | wallet_receive   | 1_774_789    | 1_299_915 | $0.0000017285 | $1.72             | <font color="red">0</font> |
| 6   | wallet_receive   | 1_777_742    | 1_301_096 | $0.0000017300 | $1.73             | <font color="red">0</font> |
| 7   | wallet_receive   | 1_773_541    | 1_299_416 | $0.0000017278 | $1.72             | <font color="red">0</font> |
| 8   | wallet_receive   | 1_775_628    | 1_300_251 | $0.0000017289 | $1.72             | <font color="red">0</font> |
| 9   | wallet_receive   | 1_777_913    | 1_301_165 | $0.0000017301 | $1.73             | <font color="red">0</font> |
| 10  | wallet_receive   | 1_771_487    | 1_298_594 | $0.0000017267 | $1.72             | <font color="red">0</font> |
| 11  | wallet_receive   | 1_776_081    | 1_300_432 | $0.0000017291 | $1.72             | <font color="red">0</font> |
| 12  | wallet_receive   | 1_772_660    | 1_299_064 | $0.0000017273 | $1.72             | <font color="red">0</font> |

## Baseline benchmarks Azle version: 0.28.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | add_to_whitelist | 1_540_129    | 1_206_051 | $0.0000016036 | $1.60             |
| 1   | wallet_receive   | 1_791_615    | 1_306_646 | $0.0000017374 | $1.73             |
| 2   | wallet_receive   | 1_782_446    | 1_302_978 | $0.0000017325 | $1.73             |
| 3   | wallet_receive   | 1_778_629    | 1_301_451 | $0.0000017305 | $1.73             |
| 4   | wallet_receive   | 1_775_542    | 1_300_216 | $0.0000017289 | $1.72             |
| 5   | wallet_receive   | 1_774_789    | 1_299_915 | $0.0000017285 | $1.72             |
| 6   | wallet_receive   | 1_777_742    | 1_301_096 | $0.0000017300 | $1.73             |
| 7   | wallet_receive   | 1_773_541    | 1_299_416 | $0.0000017278 | $1.72             |
| 8   | wallet_receive   | 1_775_628    | 1_300_251 | $0.0000017289 | $1.72             |
| 9   | wallet_receive   | 1_777_913    | 1_301_165 | $0.0000017301 | $1.73             |
| 10  | wallet_receive   | 1_771_487    | 1_298_594 | $0.0000017267 | $1.72             |
| 11  | wallet_receive   | 1_776_081    | 1_300_432 | $0.0000017291 | $1.72             |
| 12  | wallet_receive   | 1_772_660    | 1_299_064 | $0.0000017273 | $1.72             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
