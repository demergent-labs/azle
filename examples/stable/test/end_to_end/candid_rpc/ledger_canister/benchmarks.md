# Benchmarks for ledger_canister

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name       | Instructions | Cycles    | USD           | USD/Million Calls | Change                              |
| --- | ----------------- | ------------ | --------- | ------------- | ----------------- | ----------------------------------- |
| 0   | getAccountBalance | 5_295_806    | 2_708_322 | $0.0000036012 | $3.60             | <font color="red">+350_037</font>   |
| 1   | getTransferFee    | 2_333_967    | 1_523_586 | $0.0000020259 | $2.02             | <font color="red">+222_766</font>   |
| 2   | executeTransfer   | 14_306_297   | 6_312_518 | $0.0000083936 | $8.39             | <font color="red">+954_330</font>   |
| 3   | executeTransfer   | 14_310_681   | 6_314_272 | $0.0000083959 | $8.39             | <font color="red">+954_717</font>   |
| 4   | getBlocks         | 6_195_157    | 3_068_062 | $0.0000040795 | $4.07             | <font color="red">+444_063</font>   |
| 5   | getSymbol         | 1_803_080    | 1_311_232 | $0.0000017435 | $1.74             | <font color="red">+181_758</font>   |
| 6   | getName           | 1_806_585    | 1_312_634 | $0.0000017454 | $1.74             | <font color="red">+179_323</font>   |
| 7   | getDecimals       | 1_803_852    | 1_311_540 | $0.0000017439 | $1.74             | <font color="red">+177_690</font>   |
| 8   | getArchives       | 1_800_729    | 1_310_291 | $0.0000017423 | $1.74             | <font color="red">+174_373</font>   |
| 9   | executeTransfer   | 14_302_546   | 6_311_018 | $0.0000083916 | $8.39             | <font color="red">+950_325</font>   |
| 10  | getAccountBalance | 5_217_864    | 2_677_145 | $0.0000035597 | $3.55             | <font color="red">+313_658</font>   |
| 11  | executeTransfer   | 14_286_533   | 6_304_613 | $0.0000083831 | $8.38             | <font color="red">+970_839</font>   |
| 12  | executeTransfer   | 14_299_730   | 6_309_892 | $0.0000083901 | $8.39             | <font color="red">+966_998</font>   |
| 13  | executeTransfer   | 15_146_679   | 6_648_671 | $0.0000088405 | $8.84             | <font color="red">+1_017_861</font> |
| 14  | executeTransfer   | 15_145_212   | 6_648_084 | $0.0000088398 | $8.83             | <font color="red">+1_037_223</font> |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name       | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | getAccountBalance | 4_945_769    | 2_568_307 | $0.0000034150 | $3.41             |
| 1   | getTransferFee    | 2_111_201    | 1_434_480 | $0.0000019074 | $1.90             |
| 2   | executeTransfer   | 13_351_967   | 5_930_786 | $0.0000078860 | $7.88             |
| 3   | executeTransfer   | 13_355_964   | 5_932_385 | $0.0000078881 | $7.88             |
| 4   | getBlocks         | 5_751_094    | 2_890_437 | $0.0000038433 | $3.84             |
| 5   | getSymbol         | 1_621_322    | 1_238_528 | $0.0000016468 | $1.64             |
| 6   | getName           | 1_627_262    | 1_240_904 | $0.0000016500 | $1.64             |
| 7   | getDecimals       | 1_626_162    | 1_240_464 | $0.0000016494 | $1.64             |
| 8   | getArchives       | 1_626_356    | 1_240_542 | $0.0000016495 | $1.64             |
| 9   | executeTransfer   | 13_352_221   | 5_930_888 | $0.0000078861 | $7.88             |
| 10  | getAccountBalance | 4_904_206    | 2_551_682 | $0.0000033929 | $3.39             |
| 11  | executeTransfer   | 13_315_694   | 5_916_277 | $0.0000078667 | $7.86             |
| 12  | executeTransfer   | 13_332_732   | 5_923_092 | $0.0000078758 | $7.87             |
| 13  | executeTransfer   | 14_128_818   | 6_241_527 | $0.0000082992 | $8.29             |
| 14  | executeTransfer   | 14_107_989   | 6_233_195 | $0.0000082881 | $8.28             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
