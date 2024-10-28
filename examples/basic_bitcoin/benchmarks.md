# Benchmarks for basic_bitcoin

## Current benchmarks Azle version: 0.24.2-rc.88

| Id  | Method Name         | Instructions  | Cycles        | USD           | USD/Million Calls |
| --- | ------------------- | ------------- | ------------- | ------------- | ----------------- |
| 0   | init                | 6_332_224_922 | 4_933_479_968 | $0.0065599003 | $6_559.90         |
| 1   | http_request_update | 162_481_570   | 65_582_628    | $0.0000872033 | $87.20            |
| 2   | http_request_update | 162_427_663   | 65_561_065    | $0.0000871746 | $87.17            |
| 3   | http_request_update | 162_902_506   | 65_751_002    | $0.0000874271 | $87.42            |
| 4   | http_request_update | 162_311_728   | 65_514_691    | $0.0000871129 | $87.11            |
| 5   | http_request_update | 162_344_861   | 65_527_944    | $0.0000871305 | $87.13            |
| 6   | http_request_update | 162_794_491   | 65_707_796    | $0.0000873697 | $87.36            |
| 7   | http_request_update | 162_466_562   | 65_576_624    | $0.0000871953 | $87.19            |
| 8   | http_request_update | 164_819_239   | 66_517_695    | $0.0000884466 | $88.44            |
| 9   | http_request_update | 161_255_932   | 65_092_372    | $0.0000865514 | $86.55            |
| 10  | http_request_update | 162_937_488   | 65_764_995    | $0.0000874457 | $87.44            |
| 11  | http_request_update | 169_841_860   | 68_526_744    | $0.0000911180 | $91.11            |
| 12  | http_request_update | 162_768_728   | 65_697_491    | $0.0000873560 | $87.35            |
| 13  | http_request_update | 162_562_393   | 65_614_957    | $0.0000872462 | $87.24            |
| 14  | http_request_update | 162_952_167   | 65_770_866    | $0.0000874535 | $87.45            |
| 15  | http_request_update | 161_317_443   | 65_116_977    | $0.0000865841 | $86.58            |
| 16  | http_request_update | 195_014_232   | 78_595_692    | $0.0001045063 | $104.50           |
| 17  | http_request_update | 163_220_754   | 65_878_301    | $0.0000875964 | $87.59            |
| 18  | http_request_update | 162_827_996   | 65_721_198    | $0.0000873875 | $87.38            |
| 19  | http_request_update | 163_207_031   | 65_872_812    | $0.0000875891 | $87.58            |
| 20  | http_request_update | 161_581_817   | 65_222_726    | $0.0000867247 | $86.72            |
| 21  | http_request_update | 161_444_601   | 65_167_840    | $0.0000866517 | $86.65            |

## Baseline benchmarks Azle version: 0.24.2-rc.88

No benchmarks reported

---

**Note on calculations:**

-   Cycles are calculated using the formula: base_fee + (per_instruction_fee \* number_of_instructions) + (additional_fee_per_billion \* floor(number_of_instructions / 1_000_000_000))
-   base_fee: 590_000 cycles
-   per_instruction_fee: 0.4 cycles
-   additional_fee_per_billion: 400_000_000 cycles per billion instructions
-   USD value is derived from the total cycles, where 1 trillion cycles = 1 XDR, and 1 XDR = $1.329670 (as of October 24, 2024)

For the most up-to-date XDR to USD conversion rate, please refer to the [IMF website](https://www.imf.org/external/np/fin/data/rms_sdrv.aspx).
For the most current fee information, please check the [official documentation](https://internetcomputer.org/docs/current/developer-docs/gas-cost#execution).
