# Benchmarks for wallet_backend

## Current benchmarks Azle version: 0.31.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls | Change                             |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- | ---------------------------------- |
| 0   | 0           | 5_431_073    | 2_762_429 | $0.0000036731 | $3.67             | <font color="red">+1_978</font>    |
| 1   | 0           | 5_370_301    | 2_738_120 | $0.0000036408 | $3.64             | <font color="green">-9_324</font>  |
| 2   | 2           | 5_706_992    | 2_872_796 | $0.0000038199 | $3.81             | <font color="green">-7_318</font>  |
| 3   | 2           | 5_704_457    | 2_871_782 | $0.0000038185 | $3.81             | <font color="green">-4_983</font>  |
| 4   | 1           | 5_697_373    | 2_868_949 | $0.0000038148 | $3.81             | <font color="green">-11_898</font> |
| 5   | 1           | 5_700_404    | 2_870_161 | $0.0000038164 | $3.81             | <font color="green">-2_197</font>  |
| 6   | 0           | 5_373_744    | 2_739_497 | $0.0000036426 | $3.64             | <font color="green">-389</font>    |
| 7   | 0           | 5_373_268    | 2_739_307 | $0.0000036424 | $3.64             | <font color="red">+6_708</font>    |
| 8   | 3           | 13_778_306   | 6_101_322 | $0.0000081127 | $8.11             | <font color="green">-15_659</font> |
| 9   | 0           | 5_376_624    | 2_740_649 | $0.0000036442 | $3.64             | <font color="red">+803</font>      |
| 10  | 0           | 5_373_656    | 2_739_462 | $0.0000036426 | $3.64             | <font color="green">-11_377</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | 0           | 5_429_095    | 2_761_638 | $0.0000036721 | $3.67             |
| 1   | 0           | 5_379_625    | 2_741_850 | $0.0000036458 | $3.64             |
| 2   | 2           | 5_714_310    | 2_875_724 | $0.0000038238 | $3.82             |
| 3   | 2           | 5_709_440    | 2_873_776 | $0.0000038212 | $3.82             |
| 4   | 1           | 5_709_271    | 2_873_708 | $0.0000038211 | $3.82             |
| 5   | 1           | 5_702_601    | 2_871_040 | $0.0000038175 | $3.81             |
| 6   | 0           | 5_374_133    | 2_739_653 | $0.0000036428 | $3.64             |
| 7   | 0           | 5_366_560    | 2_736_624 | $0.0000036388 | $3.63             |
| 8   | 3           | 13_793_965   | 6_107_586 | $0.0000081211 | $8.12             |
| 9   | 0           | 5_375_821    | 2_740_328 | $0.0000036437 | $3.64             |
| 10  | 0           | 5_385_033    | 2_744_013 | $0.0000036486 | $3.64             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
