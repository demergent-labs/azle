# Benchmarks for ledger_canister

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name       | Instructions | Cycles    | USD           | USD/Million Calls | Change                              |
| --- | ----------------- | ------------ | --------- | ------------- | ----------------- | ----------------------------------- |
| 0   | getAccountBalance | 4_957_536    | 2_573_014 | $0.0000034213 | $3.42             | <font color="red">+78_544</font>    |
| 1   | getTransferFee    | 2_114_242    | 1_435_696 | $0.0000019090 | $1.90             | <font color="green">-5_652</font>   |
| 2   | executeTransfer   | 13_340_230   | 5_926_092 | $0.0000078797 | $7.87             | <font color="green">-145_464</font> |
| 3   | executeTransfer   | 13_361_505   | 5_934_602 | $0.0000078911 | $7.89             | <font color="green">-102_296</font> |
| 4   | getBlocks         | 5_745_432    | 2_888_172 | $0.0000038403 | $3.84             | <font color="red">+9_428</font>     |
| 5   | getSymbol         | 1_626_093    | 1_240_437 | $0.0000016494 | $1.64             | <font color="red">+8_865</font>     |
| 6   | getName           | 1_626_232    | 1_240_492 | $0.0000016494 | $1.64             | <font color="red">+7_028</font>     |
| 7   | getDecimals       | 1_623_801    | 1_239_520 | $0.0000016482 | $1.64             | <font color="red">+7_202</font>     |
| 8   | getArchives       | 1_620_601    | 1_238_240 | $0.0000016465 | $1.64             | <font color="red">+4_393</font>     |
| 9   | executeTransfer   | 13_346_846   | 5_928_738 | $0.0000078833 | $7.88             | <font color="green">-114_021</font> |
| 10  | getAccountBalance | 4_893_590    | 2_547_436 | $0.0000033872 | $3.38             | <font color="red">+105_853</font>   |
| 11  | executeTransfer   | 13_332_336   | 5_922_934 | $0.0000078755 | $7.87             | <font color="green">-117_413</font> |
| 12  | executeTransfer   | 13_343_351   | 5_927_340 | $0.0000078814 | $7.88             | <font color="green">-125_535</font> |
| 13  | executeTransfer   | 14_149_266   | 6_249_706 | $0.0000083100 | $8.31             | <font color="green">-132_734</font> |
| 14  | executeTransfer   | 14_127_990   | 6_241_196 | $0.0000082987 | $8.29             | <font color="green">-167_448</font> |

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
