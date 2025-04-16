# Benchmarks for canister

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name         | Instructions | Cycles      | USD           | USD/Million Calls | Change                                  |
| --- | ------------------- | ------------ | ----------- | ------------- | ----------------- | --------------------------------------- |
| 0   | postUpgrade         | 996_162_639  | 399_055_055 | $0.0005306115 | $530.61           | <font color="green">-118_623_859</font> |
| 1   | getUpdateMsgArgData | 1_901_558    | 1_350_623   | $0.0000017959 | $1.79             | <font color="green">-121_368</font>     |
| 2   | getUpdateMsgArgData | 2_042_542    | 1_407_016   | $0.0000018709 | $1.87             | <font color="red">+50_183</font>        |
| 3   | getUpdateMsgArgData | 1_886_236    | 1_344_494   | $0.0000017877 | $1.78             | <font color="green">-85_587</font>      |
| 4   | getUpdateMsgArgData | 2_041_859    | 1_406_743   | $0.0000018705 | $1.87             | <font color="red">+51_921</font>        |
| 5   | getUpdateMsgArgData | 2_044_167    | 1_407_666   | $0.0000018717 | $1.87             | <font color="red">+52_557</font>        |
| 6   | getUpdateMsgArgData | 1_883_686    | 1_343_474   | $0.0000017864 | $1.78             | <font color="green">-80_184</font>      |
| 7   | getUpdateMsgArgData | 1_874_232    | 1_339_692   | $0.0000017813 | $1.78             | <font color="green">-116_979</font>     |
| 8   | getUpdateMsgArgData | 2_043_282    | 1_407_312   | $0.0000018713 | $1.87             | <font color="red">+52_995</font>        |
| 9   | getUpdateMsgArgData | 2_040_022    | 1_406_008   | $0.0000018695 | $1.86             | <font color="red">+49_360</font>        |
| 10  | getUpdateMsgArgData | 1_884_033    | 1_343_613   | $0.0000017866 | $1.78             | <font color="green">-109_420</font>     |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions  | Cycles      | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ----------- | ------------- | ----------------- |
| 0   | postUpgrade         | 1_114_786_498 | 846_504_599 | $0.0011255718 | $1_125.57         |
| 1   | getUpdateMsgArgData | 2_022_926     | 1_399_170   | $0.0000018604 | $1.86             |
| 2   | getUpdateMsgArgData | 1_992_359     | 1_386_943   | $0.0000018442 | $1.84             |
| 3   | getUpdateMsgArgData | 1_971_823     | 1_378_729   | $0.0000018333 | $1.83             |
| 4   | getUpdateMsgArgData | 1_989_938     | 1_385_975   | $0.0000018429 | $1.84             |
| 5   | getUpdateMsgArgData | 1_991_610     | 1_386_644   | $0.0000018438 | $1.84             |
| 6   | getUpdateMsgArgData | 1_963_870     | 1_375_548   | $0.0000018290 | $1.82             |
| 7   | getUpdateMsgArgData | 1_991_211     | 1_386_484   | $0.0000018436 | $1.84             |
| 8   | getUpdateMsgArgData | 1_990_287     | 1_386_114   | $0.0000018431 | $1.84             |
| 9   | getUpdateMsgArgData | 1_990_662     | 1_386_264   | $0.0000018433 | $1.84             |
| 10  | getUpdateMsgArgData | 1_993_453     | 1_387_381   | $0.0000018448 | $1.84             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
