⚠️ **WARNING: Benchmark process failed for version 0.30.0**

# Benchmarks for consumer

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ----------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init        | 7_524_593_960 | 5_810_427_584 | $0.0077259512 | $7_725.95         |

## Baseline benchmarks Azle version: No previous benchmarks

No benchmarks reported

# Benchmarks for wallet

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | add_to_whitelist | 1_542_617    | 1_207_046 | $0.0000016050 | $1.60             | <font color="red">+2_488</font>   |
| 1   | wallet_receive   | 1_793_415    | 1_307_366 | $0.0000017384 | $1.73             | <font color="red">+1_800</font>   |
| 2   | wallet_receive   | 1_780_722    | 1_302_288 | $0.0000017316 | $1.73             | <font color="green">-1_724</font> |
| 3   | wallet_receive   | 1_776_626    | 1_300_650 | $0.0000017294 | $1.72             | <font color="green">-2_003</font> |
| 4   | wallet_receive   | 1_778_313    | 1_301_325 | $0.0000017303 | $1.73             | <font color="red">+2_771</font>   |
| 5   | wallet_receive   | 1_778_256    | 1_301_302 | $0.0000017303 | $1.73             | <font color="red">+3_467</font>   |
| 6   | wallet_receive   | 1_774_422    | 1_299_768 | $0.0000017283 | $1.72             | <font color="green">-3_320</font> |
| 7   | wallet_receive   | 1_775_546    | 1_300_218 | $0.0000017289 | $1.72             | <font color="red">+2_005</font>   |
| 8   | wallet_receive   | 1_776_318    | 1_300_527 | $0.0000017293 | $1.72             | <font color="red">+690</font>     |
| 9   | wallet_receive   | 1_776_814    | 1_300_725 | $0.0000017295 | $1.72             | <font color="green">-1_099</font> |
| 10  | wallet_receive   | 1_780_578    | 1_302_231 | $0.0000017315 | $1.73             | <font color="red">+9_091</font>   |
| 11  | wallet_receive   | 1_775_034    | 1_300_013 | $0.0000017286 | $1.72             | <font color="green">-1_047</font> |
| 12  | wallet_receive   | 1_774_711    | 1_299_884 | $0.0000017284 | $1.72             | <font color="red">+2_051</font>   |

## Baseline benchmarks Azle version: 0.29.0

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
