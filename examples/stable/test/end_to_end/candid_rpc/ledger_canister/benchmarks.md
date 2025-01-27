# Benchmarks for ledger_canister

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name       | Instructions | Cycles    | USD           | USD/Million Calls | Change                              |
| --- | ----------------- | ------------ | --------- | ------------- | ----------------- | ----------------------------------- |
| 0   | getAccountBalance | 5_309_377    | 2_713_750 | $0.0000036084 | $3.60             | <font color="red">+363_608</font>   |
| 1   | getTransferFee    | 2_331_275    | 1_522_510 | $0.0000020244 | $2.02             | <font color="red">+220_074</font>   |
| 2   | executeTransfer   | 14_291_989   | 6_306_795 | $0.0000083860 | $8.38             | <font color="red">+940_022</font>   |
| 3   | executeTransfer   | 14_299_493   | 6_309_797 | $0.0000083899 | $8.38             | <font color="red">+943_529</font>   |
| 4   | getBlocks         | 6_188_919    | 3_065_567 | $0.0000040762 | $4.07             | <font color="red">+437_825</font>   |
| 5   | getSymbol         | 1_802_837    | 1_311_134 | $0.0000017434 | $1.74             | <font color="red">+181_515</font>   |
| 6   | getName           | 1_803_780    | 1_311_512 | $0.0000017439 | $1.74             | <font color="red">+176_518</font>   |
| 7   | getDecimals       | 1_803_045    | 1_311_218 | $0.0000017435 | $1.74             | <font color="red">+176_883</font>   |
| 8   | getArchives       | 1_798_953    | 1_309_581 | $0.0000017413 | $1.74             | <font color="red">+172_597</font>   |
| 9   | executeTransfer   | 14_310_624   | 6_314_249 | $0.0000083959 | $8.39             | <font color="red">+958_403</font>   |
| 10  | getAccountBalance | 5_220_458    | 2_678_183 | $0.0000035611 | $3.56             | <font color="red">+316_252</font>   |
| 11  | executeTransfer   | 14_263_432   | 6_295_372 | $0.0000083708 | $8.37             | <font color="red">+947_738</font>   |
| 12  | executeTransfer   | 14_276_185   | 6_300_474 | $0.0000083776 | $8.37             | <font color="red">+943_453</font>   |
| 13  | executeTransfer   | 15_112_703   | 6_635_081 | $0.0000088225 | $8.82             | <font color="red">+983_885</font>   |
| 14  | executeTransfer   | 15_122_043   | 6_638_817 | $0.0000088274 | $8.82             | <font color="red">+1_014_054</font> |

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
