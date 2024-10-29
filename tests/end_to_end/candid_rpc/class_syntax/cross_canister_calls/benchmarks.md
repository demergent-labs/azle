# Benchmarks for canister1

## Current benchmarks Azle version: 0.24.2-rc.93

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | balance          | 2_294_409    | 1_507_763 | $0.0000020048 | $2.00             | <font color="green">-1_616</font> |
| 1   | account          | 3_631_585    | 2_042_634 | $0.0000027160 | $2.71             | <font color="green">-3_704</font> |
| 2   | balance          | 2_215_843    | 1_476_337 | $0.0000019630 | $1.96             | <font color="green">-1_997</font> |
| 3   | account          | 3_616_448    | 2_036_579 | $0.0000027080 | $2.70             | <font color="red">+3_028</font>   |
| 4   | accounts         | 1_651_206    | 1_250_482 | $0.0000016627 | $1.66             | <font color="green">-1_948</font> |
| 5   | transfer         | 3_570_168    | 2_018_067 | $0.0000026834 | $2.68             | <font color="red">+7_597</font>   |
| 6   | balance          | 2_212_248    | 1_474_899 | $0.0000019611 | $1.96             | <font color="green">-1_666</font> |
| 7   | account          | 3_606_746    | 2_032_698 | $0.0000027028 | $2.70             | <font color="red">+1_518</font>   |
| 8   | balance          | 2_209_500    | 1_473_800 | $0.0000019597 | $1.95             | <font color="green">-1_579</font> |
| 9   | account          | 3_609_664    | 2_033_865 | $0.0000027044 | $2.70             | <font color="red">+28</font>      |
| 10  | accounts         | 1_649_903    | 1_249_961 | $0.0000016620 | $1.66             | <font color="green">-1_549</font> |
| 11  | trap             | 1_622_686    | 1_239_074 | $0.0000016476 | $1.64             | <font color="red">+125</font>     |
| 12  | sendNotification | 2_660_051    | 1_654_020 | $0.0000021993 | $2.19             | <font color="red">+4_720</font>   |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | balance          | 2_296_025    | 1_508_410 | $0.0000020057 | $2.00             |
| 1   | account          | 3_635_289    | 2_044_115 | $0.0000027180 | $2.71             |
| 2   | balance          | 2_217_840    | 1_477_136 | $0.0000019641 | $1.96             |
| 3   | account          | 3_613_420    | 2_035_368 | $0.0000027064 | $2.70             |
| 4   | accounts         | 1_653_154    | 1_251_261 | $0.0000016638 | $1.66             |
| 5   | transfer         | 3_562_571    | 2_015_028 | $0.0000026793 | $2.67             |
| 6   | balance          | 2_213_914    | 1_475_565 | $0.0000019620 | $1.96             |
| 7   | account          | 3_605_228    | 2_032_091 | $0.0000027020 | $2.70             |
| 8   | balance          | 2_211_079    | 1_474_431 | $0.0000019605 | $1.96             |
| 9   | account          | 3_609_636    | 2_033_854 | $0.0000027044 | $2.70             |
| 10  | accounts         | 1_651_452    | 1_250_580 | $0.0000016629 | $1.66             |
| 11  | trap             | 1_622_561    | 1_239_024 | $0.0000016475 | $1.64             |
| 12  | sendNotification | 2_655_331    | 1_652_132 | $0.0000021968 | $2.19             |

# Benchmarks for canister2

## Current benchmarks Azle version: 0.24.2-rc.93

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls | Change                           |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- | -------------------------------- |
| 0   | transfer            | 2_169_524    | 1_457_809 | $0.0000019384 | $1.93             | <font color="red">+12_144</font> |
| 1   | receiveNotification | 1_387_762    | 1_145_104 | $0.0000015226 | $1.52             | <font color="red">+4_519</font>  |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | transfer            | 2_157_380    | 1_452_952 | $0.0000019319 | $1.93             |
| 1   | receiveNotification | 1_383_243    | 1_143_297 | $0.0000015202 | $1.52             |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
