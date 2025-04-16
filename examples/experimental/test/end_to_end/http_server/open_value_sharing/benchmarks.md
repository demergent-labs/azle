# Benchmarks for consumer

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name | Instructions  | Cycles        | USD           | USD/Million Calls | Change                               |
| --- | ----------- | ------------- | ------------- | ------------- | ----------------- | ------------------------------------ |
| 0   | init        | 7_581_262_705 | 5_833_095_082 | $0.0077560915 | $7_756.09         | <font color="red">+56_668_745</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ----------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init        | 7_524_593_960 | 5_810_427_584 | $0.0077259512 | $7_725.95         |

# Benchmarks for wallet

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | add_to_whitelist | 1_537_268    | 1_204_907 | $0.0000016021 | $1.60             | <font color="green">-5_349</font> |
| 1   | wallet_receive   | 1_790_220    | 1_306_088 | $0.0000017367 | $1.73             | <font color="green">-3_195</font> |
| 2   | wallet_receive   | 1_780_435    | 1_302_174 | $0.0000017315 | $1.73             | <font color="green">-287</font>   |
| 3   | wallet_receive   | 1_776_895    | 1_300_758 | $0.0000017296 | $1.72             | <font color="red">+269</font>     |
| 4   | wallet_receive   | 1_777_129    | 1_300_851 | $0.0000017297 | $1.72             | <font color="green">-1_184</font> |
| 5   | wallet_receive   | 1_775_622    | 1_300_248 | $0.0000017289 | $1.72             | <font color="green">-2_634</font> |
| 6   | wallet_receive   | 1_777_931    | 1_301_172 | $0.0000017301 | $1.73             | <font color="red">+3_509</font>   |
| 7   | wallet_receive   | 1_779_013    | 1_301_605 | $0.0000017307 | $1.73             | <font color="red">+3_467</font>   |
| 8   | wallet_receive   | 1_778_600    | 1_301_440 | $0.0000017305 | $1.73             | <font color="red">+2_282</font>   |
| 9   | wallet_receive   | 1_781_006    | 1_302_402 | $0.0000017318 | $1.73             | <font color="red">+4_192</font>   |
| 10  | wallet_receive   | 1_782_684    | 1_303_073 | $0.0000017327 | $1.73             | <font color="red">+2_106</font>   |
| 11  | wallet_receive   | 1_779_393    | 1_301_757 | $0.0000017309 | $1.73             | <font color="red">+4_359</font>   |
| 12  | wallet_receive   | 1_781_212    | 1_302_484 | $0.0000017319 | $1.73             | <font color="red">+6_501</font>   |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | add_to_whitelist | 1_542_617    | 1_207_046 | $0.0000016050 | $1.60             |
| 1   | wallet_receive   | 1_793_415    | 1_307_366 | $0.0000017384 | $1.73             |
| 2   | wallet_receive   | 1_780_722    | 1_302_288 | $0.0000017316 | $1.73             |
| 3   | wallet_receive   | 1_776_626    | 1_300_650 | $0.0000017294 | $1.72             |
| 4   | wallet_receive   | 1_778_313    | 1_301_325 | $0.0000017303 | $1.73             |
| 5   | wallet_receive   | 1_778_256    | 1_301_302 | $0.0000017303 | $1.73             |
| 6   | wallet_receive   | 1_774_422    | 1_299_768 | $0.0000017283 | $1.72             |
| 7   | wallet_receive   | 1_775_546    | 1_300_218 | $0.0000017289 | $1.72             |
| 8   | wallet_receive   | 1_776_318    | 1_300_527 | $0.0000017293 | $1.72             |
| 9   | wallet_receive   | 1_776_814    | 1_300_725 | $0.0000017295 | $1.72             |
| 10  | wallet_receive   | 1_780_578    | 1_302_231 | $0.0000017315 | $1.73             |
| 11  | wallet_receive   | 1_775_034    | 1_300_013 | $0.0000017286 | $1.72             |
| 12  | wallet_receive   | 1_774_711    | 1_299_884 | $0.0000017284 | $1.72             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
