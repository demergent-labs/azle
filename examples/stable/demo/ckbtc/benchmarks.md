# Benchmarks for wallet_backend

## Current benchmarks Azle version: 0.32.0

| Id  | Method Name       | Instructions | Cycles    | USD           | USD/Million Calls | Change                              |
| --- | ----------------- | ------------ | --------- | ------------- | ----------------- | ----------------------------------- |
| 0   | getBalance        | 4_849_562    | 2_529_824 | $0.0000033638 | $3.36             | <font color="green">-579_533</font> |
| 1   | getBalance        | 4_757_727    | 2_493_090 | $0.0000033150 | $3.31             | <font color="green">-621_898</font> |
| 2   | getDepositAddress | 5_106_597    | 2_632_638 | $0.0000035005 | $3.50             | <font color="green">-607_713</font> |
| 3   | getDepositAddress | 5_099_929    | 2_629_971 | $0.0000034970 | $3.49             | <font color="green">-609_511</font> |
| 4   | updateBalance     | 5_102_146    | 2_630_858 | $0.0000034982 | $3.49             | <font color="green">-607_125</font> |
| 5   | updateBalance     | 5_095_018    | 2_628_007 | $0.0000034944 | $3.49             | <font color="green">-607_583</font> |
| 6   | getBalance        | 4_758_503    | 2_493_401 | $0.0000033154 | $3.31             | <font color="green">-615_630</font> |
| 7   | getBalance        | 4_749_997    | 2_489_998 | $0.0000033109 | $3.31             | <font color="green">-616_563</font> |
| 8   | transfer          | 13_437_948   | 5_965_179 | $0.0000079317 | $7.93             | <font color="green">-356_017</font> |
| 9   | getBalance        | 4_766_089    | 2_496_435 | $0.0000033194 | $3.31             | <font color="green">-609_732</font> |
| 10  | getBalance        | 4_753_604    | 2_491_441 | $0.0000033128 | $3.31             | <font color="green">-631_429</font> |

## Baseline benchmarks Azle version: 0.30.0

| Id  | Method Name | Instructions | Cycles    | USD           | USD/Million Calls |
| --- | ----------- | ------------ | --------- | ------------- | ----------------- |
| 0   | 0           | 5_429_095    | 2_761_638 | $0.0000036721 | $3.67             |
| 1   | 0           | 5_379_625    | 2_741_850 | $0.0000036458 | $3.64             |
| 2   | 2           | 5_714_310    | 2_875_724 | $0.0000038238 | $3.82             |
| 3   | 2           | 5_709_440    | 2_873_776 | $0.0000038212 | $3.82             |
| 4   | 1           | 5_709_271    | 2_873_708 | $0.0000038211 | $3.82             |
| 5   | 1           | 5_702_601    | 2_871_040 | $0.0000038175 | $3.81             |
| 6   | 0           | 5_374_133    | 2_739_653 | $0.0000036428 | $3.64             |
| 7   | 0           | 5_366_560    | 2_736_624 | $0.0000036388 | $3.63             |
| 8   | 3           | 13_793_965   | 6_107_586 | $0.0000081211 | $8.12             |
| 9   | 0           | 5_375_821    | 2_740_328 | $0.0000036437 | $3.64             |
| 10  | 0           | 5_385_033    | 2_744_013 | $0.0000036486 | $3.64             |

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
