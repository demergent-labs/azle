import '../experimental';

import { acceptMessage } from './accept_message';
import { argDataRaw } from './arg_data_raw';
import { call } from './call';
import { callRaw } from './call_raw';
import { caller } from './caller';
import { candidCompiler } from './candid_compiler';
import { candidDecode } from './candid_decode';
import { candidEncode } from './candid_encode';
import { canisterBalance } from './canister_balance';
import { canisterVersion } from './canister_version';
import { chunk } from './chunk';
import { clearTimer } from './clear_timer';
import { dataCertificate } from './data_certificate';
import { id } from './id';
import { instructionCounter } from './instruction_counter';
import { isController } from './is_controller';
import { methodName } from './method_name';
import { msgCyclesAccept } from './msg_cycles_accept';
import { msgCyclesAvailable } from './msg_cycles_available';
import { msgCyclesRefunded } from './msg_cycles_refunded';
import { notify } from './notify';
import { notifyRaw } from './notify_raw';
import { performanceCounter } from './performance_counter';
import { print } from './print';
import { reject } from './reject';
import { rejectCode } from './reject_code';
import { rejectMessage } from './reject_message';
import { reply } from './reply';
import { setCertifiedData } from './set_certified_data';
import { setOutgoingHttpOptions } from './set_outgoing_http_options';
import { setTimer } from './set_timer';
import { setTimerInterval } from './set_timer_interval';
import { time } from './time';
import { trap } from './trap';

export * from './types';

/** API entrypoint for interacting with the Internet Computer */
export const ic = {
    acceptMessage,
    argDataRaw,
    call,
    callRaw,
    caller,
    candidCompiler,
    candidDecode,
    candidEncode,
    canisterBalance,
    canisterVersion,
    chunk,
    clearTimer,
    dataCertificate,
    id,
    instructionCounter,
    isController,
    methodName,
    msgCyclesAccept,
    msgCyclesAvailable,
    msgCyclesRefunded,
    notify,
    notifyRaw,
    performanceCounter,
    print,
    reject,
    rejectCode,
    rejectMessage,
    reply,
    setCertifiedData,
    setOutgoingHttpOptions,
    setTimer,
    setTimerInterval,
    time,
    trap
};
