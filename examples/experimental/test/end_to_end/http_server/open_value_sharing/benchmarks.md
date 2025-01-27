# Benchmarks for wallet

## Current benchmarks Azle version: 0.25.0

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | add_to_whitelist | 1_563_404    | 1_215_361 | $0.0000016160 | $1.61             | <font color="red">+131_035</font> |
| 1   | wallet_receive   | 1_853_671    | 1_331_468 | $0.0000017704 | $1.77             | <font color="red">+122_055</font> |
| 2   | wallet_receive   | 1_842_335    | 1_326_934 | $0.0000017644 | $1.76             | <font color="red">+116_736</font> |
| 3   | wallet_receive   | 1_837_195    | 1_324_878 | $0.0000017617 | $1.76             | <font color="red">+111_972</font> |
| 4   | wallet_receive   | 1_839_085    | 1_325_634 | $0.0000017627 | $1.76             | <font color="red">+114_727</font> |
| 5   | wallet_receive   | 1_836_831    | 1_324_732 | $0.0000017615 | $1.76             | <font color="red">+112_769</font> |
| 6   | wallet_receive   | 1_839_232    | 1_325_692 | $0.0000017627 | $1.76             | <font color="red">+115_718</font> |
| 7   | wallet_receive   | 1_838_168    | 1_325_267 | $0.0000017622 | $1.76             | <font color="red">+113_078</font> |
| 8   | wallet_receive   | 1_836_648    | 1_324_659 | $0.0000017614 | $1.76             | <font color="red">+112_065</font> |
| 9   | wallet_receive   | 1_839_136    | 1_325_654 | $0.0000017627 | $1.76             | <font color="red">+115_417</font> |
| 10  | wallet_receive   | 1_839_225    | 1_325_690 | $0.0000017627 | $1.76             | <font color="red">+114_036</font> |
| 11  | wallet_receive   | 1_838_185    | 1_325_274 | $0.0000017622 | $1.76             | <font color="red">+114_466</font> |
| 12  | wallet_receive   | 1_841_327    | 1_326_530 | $0.0000017638 | $1.76             | <font color="red">+117_714</font> |

## Baseline benchmarks Azle version: 0.25.0-dev

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | add_to_whitelist | 1_432_369    | 1_162_947 | $0.0000015463 | $1.54             |
| 1   | wallet_receive   | 1_731_616    | 1_282_646 | $0.0000017055 | $1.70             |
| 2   | wallet_receive   | 1_725_599    | 1_280_239 | $0.0000017023 | $1.70             |
| 3   | wallet_receive   | 1_725_223    | 1_280_089 | $0.0000017021 | $1.70             |
| 4   | wallet_receive   | 1_724_358    | 1_279_743 | $0.0000017016 | $1.70             |
| 5   | wallet_receive   | 1_724_062    | 1_279_624 | $0.0000017015 | $1.70             |
| 6   | wallet_receive   | 1_723_514    | 1_279_405 | $0.0000017012 | $1.70             |
| 7   | wallet_receive   | 1_725_090    | 1_280_036 | $0.0000017020 | $1.70             |
| 8   | wallet_receive   | 1_724_583    | 1_279_833 | $0.0000017018 | $1.70             |
| 9   | wallet_receive   | 1_723_719    | 1_279_487 | $0.0000017013 | $1.70             |
| 10  | wallet_receive   | 1_725_189    | 1_280_075 | $0.0000017021 | $1.70             |
| 11  | wallet_receive   | 1_723_719    | 1_279_487 | $0.0000017013 | $1.70             |
| 12  | wallet_receive   | 1_723_613    | 1_279_445 | $0.0000017012 | $1.70             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
