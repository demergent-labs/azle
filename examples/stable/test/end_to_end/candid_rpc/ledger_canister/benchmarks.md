# Benchmarks for ledger_canister

## Current benchmarks Azle version: 0.26.0

| Id  | Method Name       | Instructions | Cycles    | USD           | USD/Million Calls | Change                              |
| --- | ----------------- | ------------ | --------- | ------------- | ----------------- | ----------------------------------- |
| 0   | getAccountBalance | 5_254_673    | 2_691_869 | $0.0000035793 | $3.57             | <font color="green">-41_133</font>  |
| 1   | getTransferFee    | 2_314_335    | 1_515_734 | $0.0000020154 | $2.01             | <font color="green">-19_632</font>  |
| 2   | executeTransfer   | 14_191_386   | 6_266_554 | $0.0000083324 | $8.33             | <font color="green">-114_911</font> |
| 3   | executeTransfer   | 14_198_598   | 6_269_439 | $0.0000083363 | $8.33             | <font color="green">-112_083</font> |
| 4   | getBlocks         | 6_123_833    | 3_039_533 | $0.0000040416 | $4.04             | <font color="green">-71_324</font>  |
| 5   | getSymbol         | 1_293_030    | 1_107_212 | $0.0000014722 | $1.47             | <font color="green">-510_050</font> |
| 6   | getName           | 1_293_503    | 1_107_401 | $0.0000014725 | $1.47             | <font color="green">-513_082</font> |
| 7   | getDecimals       | 1_291_226    | 1_106_490 | $0.0000014713 | $1.47             | <font color="green">-512_626</font> |
| 8   | getArchives       | 1_289_119    | 1_105_647 | $0.0000014701 | $1.47             | <font color="green">-511_610</font> |
| 9   | executeTransfer   | 14_171_132   | 6_258_452 | $0.0000083217 | $8.32             | <font color="green">-131_414</font> |
| 10  | getAccountBalance | 5_182_177    | 2_662_870 | $0.0000035407 | $3.54             | <font color="green">-35_687</font>  |
| 11  | executeTransfer   | 14_154_946   | 6_251_978 | $0.0000083131 | $8.31             | <font color="green">-131_587</font> |
| 12  | executeTransfer   | 14_182_786   | 6_263_114 | $0.0000083279 | $8.32             | <font color="green">-116_944</font> |
| 13  | executeTransfer   | 15_010_504   | 6_594_201 | $0.0000087681 | $8.76             | <font color="green">-136_175</font> |
| 14  | executeTransfer   | 15_026_199   | 6_600_479 | $0.0000087765 | $8.77             | <font color="green">-119_013</font> |

## Baseline benchmarks Azle version: 0.25.0

| Id  | Method Name       | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | getAccountBalance | 5_295_806    | 2_708_322 | $0.0000036012 | $3.60             |
| 1   | getTransferFee    | 2_333_967    | 1_523_586 | $0.0000020259 | $2.02             |
| 2   | executeTransfer   | 14_306_297   | 6_312_518 | $0.0000083936 | $8.39             |
| 3   | executeTransfer   | 14_310_681   | 6_314_272 | $0.0000083959 | $8.39             |
| 4   | getBlocks         | 6_195_157    | 3_068_062 | $0.0000040795 | $4.07             |
| 5   | getSymbol         | 1_803_080    | 1_311_232 | $0.0000017435 | $1.74             |
| 6   | getName           | 1_806_585    | 1_312_634 | $0.0000017454 | $1.74             |
| 7   | getDecimals       | 1_803_852    | 1_311_540 | $0.0000017439 | $1.74             |
| 8   | getArchives       | 1_800_729    | 1_310_291 | $0.0000017423 | $1.74             |
| 9   | executeTransfer   | 14_302_546   | 6_311_018 | $0.0000083916 | $8.39             |
| 10  | getAccountBalance | 5_217_864    | 2_677_145 | $0.0000035597 | $3.55             |
| 11  | executeTransfer   | 14_286_533   | 6_304_613 | $0.0000083831 | $8.38             |
| 12  | executeTransfer   | 14_299_730   | 6_309_892 | $0.0000083901 | $8.39             |
| 13  | executeTransfer   | 15_146_679   | 6_648_671 | $0.0000088405 | $8.84             |
| 14  | executeTransfer   | 15_145_212   | 6_648_084 | $0.0000088398 | $8.83             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
