# Benchmarks for ledger_canister

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name       | Instructions | Cycles    | USD           | USD/Million Calls | Change                              |
| --- | ----------------- | ------------ | --------- | ------------- | ----------------- | ----------------------------------- |
| 0   | getAccountBalance | 4_840_404    | 2_526_161 | $0.0000033590 | $3.35             | <font color="green">-38_588</font>  |
| 1   | getTransferFee    | 2_095_480    | 1_428_192 | $0.0000018990 | $1.89             | <font color="green">-24_414</font>  |
| 2   | executeTransfer   | 13_211_707   | 5_874_682 | $0.0000078114 | $7.81             | <font color="green">-273_987</font> |
| 3   | executeTransfer   | 13_186_982   | 5_864_792 | $0.0000077982 | $7.79             | <font color="green">-276_819</font> |
| 4   | getBlocks         | 5_681_311    | 2_862_524 | $0.0000038062 | $3.80             | <font color="green">-54_693</font>  |
| 5   | getSymbol         | 1_609_893    | 1_233_957 | $0.0000016408 | $1.64             | <font color="green">-7_335</font>   |
| 6   | getName           | 1_611_927    | 1_234_770 | $0.0000016418 | $1.64             | <font color="green">-7_277</font>   |
| 7   | getDecimals       | 1_608_206    | 1_233_282 | $0.0000016399 | $1.63             | <font color="green">-8_393</font>   |
| 8   | getArchives       | 1_605_460    | 1_232_184 | $0.0000016384 | $1.63             | <font color="green">-10_748</font>  |
| 9   | executeTransfer   | 13_197_434   | 5_868_973 | $0.0000078038 | $7.80             | <font color="green">-263_433</font> |
| 10  | getAccountBalance | 4_792_358    | 2_506_943 | $0.0000033334 | $3.33             | <font color="red">+4_621</font>     |
| 11  | executeTransfer   | 13_171_171   | 5_858_468 | $0.0000077898 | $7.78             | <font color="green">-278_578</font> |
| 12  | executeTransfer   | 13_221_258   | 5_878_503 | $0.0000078165 | $7.81             | <font color="green">-247_628</font> |
| 13  | executeTransfer   | 13_964_134   | 6_175_653 | $0.0000082116 | $8.21             | <font color="green">-317_866</font> |
| 14  | executeTransfer   | 13_973_660   | 6_179_464 | $0.0000082166 | $8.21             | <font color="green">-321_778</font> |

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
