# Benchmarks for canister

## Current benchmarks Azle version: 0.30.0

| Id  | Method Name         | Instructions | Cycles      | USD           | USD/Million Calls |
| --- | ------------------- | ------------ | ----------- | ------------- | ----------------- |
| 0   | postUpgrade         | 995_071_568  | 398_618_627 | $0.0005300312 | $530.03           |
| 1   | getUpdateMsgArgData | 1_654_997    | 1_251_998   | $0.0000016647 | $1.66             |
| 2   | getUpdateMsgArgData | 1_627_264    | 1_240_905   | $0.0000016500 | $1.64             |
| 3   | getUpdateMsgArgData | 1_624_929    | 1_239_971   | $0.0000016488 | $1.64             |
| 4   | getUpdateMsgArgData | 1_625_720    | 1_240_288   | $0.0000016492 | $1.64             |
| 5   | getUpdateMsgArgData | 1_629_205    | 1_241_682   | $0.0000016510 | $1.65             |
| 6   | getUpdateMsgArgData | 1_627_222    | 1_240_888   | $0.0000016500 | $1.64             |
| 7   | getUpdateMsgArgData | 1_626_928    | 1_240_771   | $0.0000016498 | $1.64             |
| 8   | getUpdateMsgArgData | 1_623_080    | 1_239_232   | $0.0000016478 | $1.64             |
| 9   | getUpdateMsgArgData | 1_631_541    | 1_242_616   | $0.0000016523 | $1.65             |
| 10  | getUpdateMsgArgData | 1_626_891    | 1_240_756   | $0.0000016498 | $1.64             |

## Baseline benchmarks Azle version: No previous benchmarks

No benchmarks reported

---

**Note on calculations:**

- Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
- base_fee: 590_000 cycles
- per_instruction_fee: 0.4 cycles
- additional_fee_per_billion: 400_000_000 cycles per billion instructions
- USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
