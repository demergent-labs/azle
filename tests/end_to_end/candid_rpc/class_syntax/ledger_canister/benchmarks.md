# Benchmarks for ledger_canister

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name       | Instructions | Cycles    | USD           | USD/Million Calls | Change                              |
| --- | ----------------- | ------------ | --------- | ------------- | ----------------- | ----------------------------------- |
| 0   | getAccountBalance | 4_945_746    | 2_568_298 | $0.0000034150 | $3.41             | <font color="red">+66_754</font>    |
| 1   | getTransferFee    | 2_111_171    | 1_434_468 | $0.0000019074 | $1.90             | <font color="green">-8_723</font>   |
| 2   | executeTransfer   | 13_351_944   | 5_930_777 | $0.0000078860 | $7.88             | <font color="green">-133_750</font> |
| 3   | executeTransfer   | 13_355_934   | 5_932_373 | $0.0000078881 | $7.88             | <font color="green">-107_867</font> |
| 4   | getBlocks         | 5_751_011    | 2_890_404 | $0.0000038433 | $3.84             | <font color="red">+15_007</font>    |
| 5   | getSymbol         | 1_621_216    | 1_238_486 | $0.0000016468 | $1.64             | <font color="red">+3_988</font>     |
| 6   | getName           | 1_627_262    | 1_240_904 | $0.0000016500 | $1.64             | <font color="red">+8_058</font>     |
| 7   | getDecimals       | 1_626_139    | 1_240_455 | $0.0000016494 | $1.64             | <font color="red">+9_540</font>     |
| 8   | getArchives       | 1_626_379    | 1_240_551 | $0.0000016495 | $1.64             | <font color="red">+10_171</font>    |
| 9   | executeTransfer   | 13_352_320   | 5_930_928 | $0.0000078862 | $7.88             | <font color="green">-108_547</font> |
| 10  | getAccountBalance | 4_904_206    | 2_551_682 | $0.0000033929 | $3.39             | <font color="red">+116_469</font>   |
| 11  | executeTransfer   | 13_315_694   | 5_916_277 | $0.0000078667 | $7.86             | <font color="green">-134_055</font> |
| 12  | executeTransfer   | 13_332_762   | 5_923_104 | $0.0000078758 | $7.87             | <font color="green">-136_124</font> |
| 13  | executeTransfer   | 14_129_111   | 6_241_644 | $0.0000082993 | $8.29             | <font color="green">-152_889</font> |
| 14  | executeTransfer   | 14_108_178   | 6_233_271 | $0.0000082882 | $8.28             | <font color="green">-187_260</font> |

## Baseline benchmarks Azle version: 0.25.0-pre-bifurcation

| Id  | Method Name       | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | getAccountBalance | 4_878_992    | 2_541_596 | $0.0000033795 | $3.37             |
| 1   | getTransferFee    | 2_119_894    | 1_437_957 | $0.0000019120 | $1.91             |
| 2   | executeTransfer   | 13_485_694   | 5_984_277 | $0.0000079571 | $7.95             |
| 3   | executeTransfer   | 13_463_801   | 5_975_520 | $0.0000079455 | $7.94             |
| 4   | getBlocks         | 5_736_004    | 2_884_401 | $0.0000038353 | $3.83             |
| 5   | getSymbol         | 1_617_228    | 1_236_891 | $0.0000016447 | $1.64             |
| 6   | getName           | 1_619_204    | 1_237_681 | $0.0000016457 | $1.64             |
| 7   | getDecimals       | 1_616_599    | 1_236_639 | $0.0000016443 | $1.64             |
| 8   | getArchives       | 1_616_208    | 1_236_483 | $0.0000016441 | $1.64             |
| 9   | executeTransfer   | 13_460_867   | 5_974_346 | $0.0000079439 | $7.94             |
| 10  | getAccountBalance | 4_787_737    | 2_505_094 | $0.0000033309 | $3.33             |
| 11  | executeTransfer   | 13_449_749   | 5_969_899 | $0.0000079380 | $7.93             |
| 12  | executeTransfer   | 13_468_886   | 5_977_554 | $0.0000079482 | $7.94             |
| 13  | executeTransfer   | 14_282_000   | 6_302_800 | $0.0000083806 | $8.38             |
| 14  | executeTransfer   | 14_295_438   | 6_308_175 | $0.0000083878 | $8.38             |

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
