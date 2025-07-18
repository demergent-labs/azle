# Benchmarks for canister

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name         | Instructions | Cycles      | USD           | USD/Million Calls | Change                                  |
| --- | ------------------- | ------------ | ----------- | ------------- | ----------------- | --------------------------------------- |
| 0   | postUpgrade         | 995_821_993  | 398_918_797 | $0.0005304304 | $530.43           | <font color="green">-118_964_505</font> |
| 1   | getUpdateMsgArgData | 2_330_976    | 1_522_390   | $0.0000020243 | $2.02             | <font color="red">+308_050</font>       |
| 2   | getUpdateMsgArgData | 1_838_749    | 1_325_499   | $0.0000017625 | $1.76             | <font color="green">-153_610</font>     |
| 3   | getUpdateMsgArgData | 1_828_145    | 1_321_258   | $0.0000017568 | $1.75             | <font color="green">-143_678</font>     |
| 4   | getUpdateMsgArgData | 1_831_449    | 1_322_579   | $0.0000017586 | $1.75             | <font color="green">-158_489</font>     |
| 5   | getUpdateMsgArgData | 1_825_475    | 1_320_190   | $0.0000017554 | $1.75             | <font color="green">-166_135</font>     |
| 6   | getUpdateMsgArgData | 1_823_956    | 1_319_582   | $0.0000017546 | $1.75             | <font color="green">-139_914</font>     |
| 7   | getUpdateMsgArgData | 1_832_308    | 1_322_923   | $0.0000017591 | $1.75             | <font color="green">-158_903</font>     |
| 8   | getUpdateMsgArgData | 1_836_390    | 1_324_556   | $0.0000017612 | $1.76             | <font color="green">-153_897</font>     |
| 9   | getUpdateMsgArgData | 1_830_449    | 1_322_179   | $0.0000017581 | $1.75             | <font color="green">-160_213</font>     |
| 10  | getUpdateMsgArgData | 1_830_936    | 1_322_374   | $0.0000017583 | $1.75             | <font color="green">-162_517</font>     |

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
