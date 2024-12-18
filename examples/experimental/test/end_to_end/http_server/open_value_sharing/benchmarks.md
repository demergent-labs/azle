# Benchmarks for wallet

## Current benchmarks Azle version: 0.25.0-dev

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls | Change                            |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- | --------------------------------- |
| 0   | add_to_whitelist | 1_432_369    | 1_162_947 | $0.0000015463 | $1.54             | <font color="red">+12_542</font>  |
| 1   | wallet_receive   | 1_731_616    | 1_282_646 | $0.0000017055 | $1.70             | <font color="red">+18_612</font>  |
| 2   | wallet_receive   | 1_725_599    | 1_280_239 | $0.0000017023 | $1.70             | <font color="red">+8_557</font>   |
| 3   | wallet_receive   | 1_725_223    | 1_280_089 | $0.0000017021 | $1.70             | <font color="red">+1_897</font>   |
| 4   | wallet_receive   | 1_724_358    | 1_279_743 | $0.0000017016 | $1.70             | <font color="red">+169</font>     |
| 5   | wallet_receive   | 1_724_062    | 1_279_624 | $0.0000017015 | $1.70             | <font color="green">-2_148</font> |
| 6   | wallet_receive   | 1_723_514    | 1_279_405 | $0.0000017012 | $1.70             | <font color="green">-2_278</font> |
| 7   | wallet_receive   | 1_725_090    | 1_280_036 | $0.0000017020 | $1.70             | <font color="red">+184</font>     |
| 8   | wallet_receive   | 1_724_583    | 1_279_833 | $0.0000017018 | $1.70             | <font color="green">-4_678</font> |
| 9   | wallet_receive   | 1_723_719    | 1_279_487 | $0.0000017013 | $1.70             | <font color="green">-3_003</font> |
| 10  | wallet_receive   | 1_725_189    | 1_280_075 | $0.0000017021 | $1.70             | <font color="green">-2_380</font> |
| 11  | wallet_receive   | 1_723_719    | 1_279_487 | $0.0000017013 | $1.70             | <font color="green">-1_230</font> |
| 12  | wallet_receive   | 1_723_613    | 1_279_445 | $0.0000017012 | $1.70             | <font color="red">+217</font>     |

## Baseline benchmarks Azle version: 0.25.0-alpha

| Id  | Method Name      | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ---------------- | ------------ | --------- | ------------- | ----------------- |
| 0   | add_to_whitelist | 1_419_827    | 1_157_930 | $0.0000015397 | $1.53             |
| 1   | wallet_receive   | 1_713_004    | 1_275_201 | $0.0000016956 | $1.69             |
| 2   | wallet_receive   | 1_717_042    | 1_276_816 | $0.0000016977 | $1.69             |
| 3   | wallet_receive   | 1_723_326    | 1_279_330 | $0.0000017011 | $1.70             |
| 4   | wallet_receive   | 1_724_189    | 1_279_675 | $0.0000017015 | $1.70             |
| 5   | wallet_receive   | 1_726_210    | 1_280_484 | $0.0000017026 | $1.70             |
| 6   | wallet_receive   | 1_725_792    | 1_280_316 | $0.0000017024 | $1.70             |
| 7   | wallet_receive   | 1_724_906    | 1_279_962 | $0.0000017019 | $1.70             |
| 8   | wallet_receive   | 1_729_261    | 1_281_704 | $0.0000017042 | $1.70             |
| 9   | wallet_receive   | 1_726_722    | 1_280_688 | $0.0000017029 | $1.70             |
| 10  | wallet_receive   | 1_727_569    | 1_281_027 | $0.0000017033 | $1.70             |
| 11  | wallet_receive   | 1_724_949    | 1_279_979 | $0.0000017019 | $1.70             |
| 12  | wallet_receive   | 1_723_396    | 1_279_358 | $0.0000017011 | $1.70             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
