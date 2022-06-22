import { Rust } from '../../../../../types';

import { generateIcObjectFunctionAcceptMessage } from './accept_message';
import { generateIcObjectFunctionCaller } from './caller';
import { generateIcObjectFunctionCanisterBalance } from './canister_balance';
import { generateIcObjectFunctionCanisterBalance128 } from './canister_balance128';
import { generateIcObjectFunctionId } from './id';
import { generateIcObjectFunctionMsgCyclesAccept } from './msg_cycles_accept';
import { generateIcObjectFunctionMsgCyclesAccept128 } from './msg_cycles_accept128';
import { generateIcObjectFunctionMsgCyclesAvailable } from './msg_cycles_available';
import { generateIcObjectFunctionMethodName } from './method_name';
import { generateIcObjectFunctionPrint } from './print';
import { generateIcObjectFunctionTime } from './time';
import { generateIcObjectFunctionTrap } from './trap';

export function generateIcObjectFunctions(): Rust {
    const icObjectFunctionAcceptMessage: Rust =
        generateIcObjectFunctionAcceptMessage();
    const icObjectFunctionCaller: Rust = generateIcObjectFunctionCaller();
    const icObjectFunctionCanisterBalance: Rust =
        generateIcObjectFunctionCanisterBalance();
    const icObjectFunctionCanisterBalance128: Rust =
        generateIcObjectFunctionCanisterBalance128();
    const icObjectFunctionId: Rust = generateIcObjectFunctionId();
    const icObjectFunctionMethodName: Rust =
        generateIcObjectFunctionMethodName();
    const icObjectFunctionMsgCyclesAccept: Rust =
        generateIcObjectFunctionMsgCyclesAccept();
    const icObjectFunctionMsgCyclesAccept128: Rust =
        generateIcObjectFunctionMsgCyclesAccept128();
    const icObjectFunctionMsgCyclesAvailable: Rust =
        generateIcObjectFunctionMsgCyclesAvailable();
    const icObjectFunctionPrint: Rust = generateIcObjectFunctionPrint();
    const icObjectFunctionTime: Rust = generateIcObjectFunctionTime();
    const icObjectFunctionTrap: Rust = generateIcObjectFunctionTrap();

    return `
        ${icObjectFunctionAcceptMessage}
        ${icObjectFunctionCaller}
        ${icObjectFunctionCanisterBalance}
        ${icObjectFunctionCanisterBalance128}
        ${icObjectFunctionId}
        ${icObjectFunctionMethodName}
        ${icObjectFunctionMsgCyclesAccept}
        ${icObjectFunctionMsgCyclesAccept128}
        ${icObjectFunctionMsgCyclesAvailable}
        ${icObjectFunctionPrint}
        ${icObjectFunctionTime}
        ${icObjectFunctionTrap}
  `;
}
