import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/test';

// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE } from './dfx_generated/audio_recorder/audio_recorder.did';

// TODO to be more thorough we could test all of the error cases as well

let global_user: any;
let global_recording: any;

export function getTests(
    audio_recorder_canister: ActorSubclass<_SERVICE>
): Test {
    return () => {
        it('creates a user in stable memory', async () => {
            const user = await audio_recorder_canister.createUser('lastmjs');

            const expectedUsername = 'lastmjs';
            const expectedRecordingCount = 0;

            global_user = user;

            expect(user.username).toBe(expectedUsername);
            expect(user.recordingIds).toHaveLength(expectedRecordingCount);
        });

        it('creates a recording in stable memory', async () => {
            const result = await audio_recorder_canister.createRecording(
                Uint8Array.from([0, 1, 2, 3, 4]),
                'First recording',
                global_user.id
            );

            if ('Err' in result) {
                throw new Error(JSON.stringify(result.Err, null, 2));
            }

            const recording = result.Ok;
            global_recording = recording;
            global_user.recordingIds = [recording.id];

            expect(recording.audio).toHaveLength(5);
            expect(recording.name).toBe('First recording');
            expect(recording.userId).toStrictEqual(global_user.id);
        });

        it('reads users from stable memory', async () => {
            const result = await audio_recorder_canister.readUsers();

            expect(result).toStrictEqual([global_user]);
        });

        it('reads recordings from stable memory', async () => {
            const result = await audio_recorder_canister.readRecordings();

            expect(result).toHaveLength(1);
            expect(result[0].id).toStrictEqual(global_recording.id);
            expect(result[0].createdAt).toBe(global_recording.createdAt);
            expect(result[0].name).toBe(global_recording.name);
            expect(result[0].userId).toStrictEqual(global_recording.userId);
        });

        it('reads user by id from stable memory', async () => {
            const result = await audio_recorder_canister.readUserById(
                global_user.id
            );

            expect(result).toStrictEqual([global_user]);
        });

        it('reads recording by id from stable memory', async () => {
            const result = await audio_recorder_canister.readRecordingById(
                global_recording.id
            );

            expect(result).toStrictEqual([global_recording]);
        });

        it('deletes recording from stable memory', async () => {
            const delete_recording_result =
                await audio_recorder_canister.deleteRecording(
                    global_recording.id
                );

            if ('Err' in delete_recording_result) {
                throw new Error(
                    JSON.stringify(delete_recording_result.Err, null, 2)
                );
            }

            const read_recordings_result =
                await audio_recorder_canister.readRecordings();
            const read_users_result = await audio_recorder_canister.readUsers();

            expect(read_recordings_result).toHaveLength(0);
            expect(read_users_result).toHaveLength(1);
            expect(read_users_result[0].recordingIds).toHaveLength(0);
        });

        it('deletes user from stable memory', async () => {
            const create_recording_result =
                await audio_recorder_canister.createRecording(
                    Uint8Array.from([]),
                    'second recording',
                    global_user.id
                );

            if ('Err' in create_recording_result) {
                throw new Error(
                    JSON.stringify(create_recording_result.Err, null, 2)
                );
            }

            const read_users_before_result =
                await audio_recorder_canister.readUsers();
            const read_recordings_before_result =
                await audio_recorder_canister.readRecordings();

            const delete_user_result = await audio_recorder_canister.deleteUser(
                global_user.id
            );

            if ('Err' in delete_user_result) {
                throw new Error(
                    JSON.stringify(delete_user_result.Err, null, 2)
                );
            }

            const read_users_after_result =
                await audio_recorder_canister.readUsers();
            const read_recordings_after_result =
                await audio_recorder_canister.readRecordings();

            expect(read_users_before_result).toHaveLength(1);
            expect(read_users_before_result[0].recordingIds.length).toBe(1);
            expect(read_recordings_before_result).toHaveLength(1);
            expect(read_recordings_before_result[0].userId).toStrictEqual(
                global_user.id
            );
            expect(read_users_after_result).toHaveLength(0);
            expect(read_recordings_after_result).toHaveLength(0);
        });
    };
}
