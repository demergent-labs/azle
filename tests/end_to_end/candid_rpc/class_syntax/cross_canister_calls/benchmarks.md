# Benchmarks for canister1

## Current benchmarks Azle version: 0.24.2-rc.60

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | balance          | 2_291_179    | 1_506_471 | $0.0000020031 | $2.00             | <font color="green">-4_846</font> |
| 1   | account          | 3_634_008    | 2_043_603 | $0.0000027173 | $2.71             | <font color="green">-1_281</font> |
| 2   | balance          | 2_215_919    | 1_476_367 | $0.0000019631 | $1.96             | <font color="green">-1_921</font> |
| 3   | account          | 3_615_027    | 2_036_010 | $0.0000027072 | $2.70             | <font color="red">+1_607</font>   |
| 4   | accounts         | 1_650_129    | 1_250_051 | $0.0000016622 | $1.66             | <font color="green">-3_025</font> |
| 5   | transfer         | 3_568_161    | 2_017_264 | $0.0000026823 | $2.68             | <font color="red">+5_590</font>   |
| 6   | balance          | 2_213_118    | 1_475_247 | $0.0000019616 | $1.96             | <font color="green">-796</font>   |
| 7   | account          | 3_608_626    | 2_033_450 | $0.0000027038 | $2.70             | <font color="red">+3_398</font>   |
| 8   | balance          | 2_207_495    | 1_472_998 | $0.0000019586 | $1.95             | <font color="green">-3_584</font> |
| 9   | account          | 3_612_703    | 2_035_081 | $0.0000027060 | $2.70             | <font color="red">+3_067</font>   |
| 10  | accounts         | 1_647_119    | 1_248_847 | $0.0000016606 | $1.66             | <font color="green">-4_333</font> |
| 11  | trap             | 1_620_893    | 1_238_357 | $0.0000016466 | $1.64             | <font color="green">-1_668</font> |
| 12  | sendNotification | 2_654_571    | 1_651_828 | $0.0000021964 | $2.19             | <font color="green">-760</font>   |

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

## Current benchmarks Azle version: 0.24.2-rc.60

| Id  | Method Name         | Instructions | Cycles    | USD           | USD/Million Calls | Change                           |
| --- | ------------------- | ------------ | --------- | ------------- | ----------------- | -------------------------------- |
| 0   | transfer            | 2_177_316    | 1_460_926 | $0.0000019425 | $1.94             | <font color="red">+19_936</font> |
| 1   | receiveNotification | 1_388_328    | 1_145_331 | $0.0000015229 | $1.52             | <font color="red">+5_085</font>  |

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
