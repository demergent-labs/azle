# Benchmarks for ledger_canister

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name       | Instructions | Cycles    | USD           | USD/Million Calls | Change                              |
| --- | ----------------- | ------------ | --------- | ------------- | ----------------- | ----------------------------------- |
| 0   | getAccountBalance | 4_844_594    | 2_527_837 | $0.0000033612 | $3.36             | <font color="green">-34_398</font>  |
| 1   | getTransferFee    | 2_104_620    | 1_431_848 | $0.0000019039 | $1.90             | <font color="green">-15_274</font>  |
| 2   | executeTransfer   | 13_239_031   | 5_885_612 | $0.0000078259 | $7.82             | <font color="green">-246_663</font> |
| 3   | executeTransfer   | 13_210_099   | 5_874_039 | $0.0000078105 | $7.81             | <font color="green">-253_702</font> |
| 4   | getBlocks         | 5_692_689    | 2_867_075 | $0.0000038123 | $3.81             | <font color="green">-43_315</font>  |
| 5   | getSymbol         | 1_615_148    | 1_236_059 | $0.0000016436 | $1.64             | <font color="green">-2_080</font>   |
| 6   | getName           | 1_614_266    | 1_235_706 | $0.0000016431 | $1.64             | <font color="green">-4_938</font>   |
| 7   | getDecimals       | 1_612_679    | 1_235_071 | $0.0000016422 | $1.64             | <font color="green">-3_920</font>   |
| 8   | getArchives       | 1_612_325    | 1_234_930 | $0.0000016420 | $1.64             | <font color="green">-3_883</font>   |
| 9   | executeTransfer   | 13_212_430   | 5_874_972 | $0.0000078118 | $7.81             | <font color="green">-248_437</font> |
| 10  | getAccountBalance | 4_796_160    | 2_508_464 | $0.0000033354 | $3.33             | <font color="red">+8_423</font>     |
| 11  | executeTransfer   | 13_156_875   | 5_852_750 | $0.0000077822 | $7.78             | <font color="green">-292_874</font> |
| 12  | executeTransfer   | 13_208_099   | 5_873_239 | $0.0000078095 | $7.80             | <font color="green">-260_787</font> |
| 13  | executeTransfer   | 13_948_519   | 6_169_407 | $0.0000082033 | $8.20             | <font color="green">-333_481</font> |
| 14  | executeTransfer   | 14_009_382   | 6_193_752 | $0.0000082356 | $8.23             | <font color="green">-286_056</font> |

## Baseline benchmarks Azle version: 0.25.0-alpha

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

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
