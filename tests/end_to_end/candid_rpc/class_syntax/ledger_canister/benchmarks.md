# Benchmarks for ledger_canister

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name       | Instructions | Cycles    | USD           | USD/Million Calls | Change                              |
| --- | ----------------- | ------------ | --------- | ------------- | ----------------- | ----------------------------------- |
| 0   | getAccountBalance | 4_957_453    | 2_572_981 | $0.0000034212 | $3.42             | <font color="red">+78_461</font>    |
| 1   | getTransferFee    | 2_114_219    | 1_435_687 | $0.0000019090 | $1.90             | <font color="green">-5_675</font>   |
| 2   | executeTransfer   | 13_340_184   | 5_926_073 | $0.0000078797 | $7.87             | <font color="green">-145_510</font> |
| 3   | executeTransfer   | 13_361_535   | 5_934_614 | $0.0000078911 | $7.89             | <font color="green">-102_266</font> |
| 4   | getBlocks         | 5_745_356    | 2_888_142 | $0.0000038403 | $3.84             | <font color="red">+9_352</font>     |
| 5   | getSymbol         | 1_623_458    | 1_239_383 | $0.0000016480 | $1.64             | <font color="red">+6_230</font>     |
| 6   | getName           | 1_631_220    | 1_242_488 | $0.0000016521 | $1.65             | <font color="red">+12_016</font>    |
| 7   | getDecimals       | 1_621_614    | 1_238_645 | $0.0000016470 | $1.64             | <font color="red">+5_015</font>     |
| 8   | getArchives       | 1_621_825    | 1_238_730 | $0.0000016471 | $1.64             | <font color="red">+5_617</font>     |
| 9   | executeTransfer   | 13_350_613   | 5_930_245 | $0.0000078853 | $7.88             | <font color="green">-110_254</font> |
| 10  | getAccountBalance | 4_898_762    | 2_549_504 | $0.0000033900 | $3.38             | <font color="red">+111_025</font>   |
| 11  | executeTransfer   | 13_342_015   | 5_926_806 | $0.0000078807 | $7.88             | <font color="green">-107_734</font> |
| 12  | executeTransfer   | 13_353_254   | 5_931_301 | $0.0000078867 | $7.88             | <font color="green">-115_632</font> |
| 13  | executeTransfer   | 14_123_689   | 6_239_475 | $0.0000082964 | $8.29             | <font color="green">-158_311</font> |
| 14  | executeTransfer   | 14_119_954   | 6_237_981 | $0.0000082945 | $8.29             | <font color="green">-175_484</font> |

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
