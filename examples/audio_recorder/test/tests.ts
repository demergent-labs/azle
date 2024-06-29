import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/test';

// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE } from './dfx_generated/audio_recorder/audio_recorder.did';

// TODO to be more thorough we could test all of the error cases as well

let globalUser: any;
let globalRecording: any;

export function getTests(audioRecorderCanister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('creates a user in stable memory', async () => {
            const user = await audioRecorderCanister.createUser('lastmjs');

            const expectedUsername = 'lastmjs';
            const expectedRecordingCount = 0;

            globalUser = user;

            expect(user.username).toBe(expectedUsername);
            expect(user.recordingIds).toHaveLength(expectedRecordingCount);
        });

        it('creates a recording in stable memory', async () => {
            const recording = await audioRecorderCanister.createRecording(
                Uint8Array.from([0, 1, 2, 3, 4]),
                'First recording',
                globalUser.id
            );

            globalRecording = recording;
            globalUser.recordingIds = [recording.id];

            expect(recording.audio).toHaveLength(5);
            expect(recording.name).toBe('First recording');
            expect(recording.userId).toStrictEqual(globalUser.id);
        });

        it('reads users from stable memory', async () => {
            const result = await audioRecorderCanister.readUsers();

            expect(result).toStrictEqual([globalUser]);
        });

        it('reads recordings from stable memory', async () => {
            const result = await audioRecorderCanister.readRecordings();

            expect(result).toHaveLength(1);
            expect(result[0].id).toStrictEqual(globalRecording.id);
            expect(result[0].createdAt).toBe(globalRecording.createdAt);
            expect(result[0].name).toBe(globalRecording.name);
            expect(result[0].userId).toStrictEqual(globalRecording.userId);
        });

        it('reads user by id from stable memory', async () => {
            const result = await audioRecorderCanister.readUserById(
                globalUser.id
            );

            expect(result).toStrictEqual([globalUser]);
        });

        it('reads recording by id from stable memory', async () => {
            const result = await audioRecorderCanister.readRecordingById(
                globalRecording.id
            );

            expect(result).toStrictEqual([globalRecording]);
        });

        it('deletes recording from stable memory', async () => {
            const deleteRecordingResult =
                await audioRecorderCanister.deleteRecording(globalRecording.id);

            if ('Err' in deleteRecordingResult) {
                throw new Error(
                    JSON.stringify(deleteRecordingResult.Err, null, 2)
                );
            }

            const readRecordingsResult =
                await audioRecorderCanister.readRecordings();
            const readUsersResult = await audioRecorderCanister.readUsers();

            expect(readRecordingsResult).toHaveLength(0);
            expect(readUsersResult).toHaveLength(1);
            expect(readUsersResult[0].recordingIds).toHaveLength(0);
        });

        it('deletes user from stable memory', async () => {
            const createRecordingResult =
                await audioRecorderCanister.createRecording(
                    Uint8Array.from([]),
                    'second recording',
                    globalUser.id
                );

            expect(createRecordingResult).toEqual(
                expect.objectContaining({
                    userId: globalUser.id,
                    audio: Uint8Array.from([]),
                    name: 'second recording'
                })
            );

            const readUsersBeforeResult =
                await audioRecorderCanister.readUsers();
            const readRecordingsBeforeResult =
                await audioRecorderCanister.readRecordings();

            const deleteUserResult = await audioRecorderCanister.deleteUser(
                globalUser.id
            );

            expect(deleteUserResult).toEqual(
                expect.objectContaining({
                    id: globalUser.id,
                    username: globalUser.username
                })
            );

            const readUsersAfterResult =
                await audioRecorderCanister.readUsers();
            const readRecordingsAfterResult =
                await audioRecorderCanister.readRecordings();

            expect(readUsersBeforeResult).toHaveLength(1);
            expect(readUsersBeforeResult[0].recordingIds.length).toBe(1);
            expect(readRecordingsBeforeResult).toHaveLength(1);
            expect(readRecordingsBeforeResult[0].userId).toStrictEqual(
                globalUser.id
            );
            expect(readUsersAfterResult).toHaveLength(0);
            expect(readRecordingsAfterResult).toHaveLength(0);
        });
    };
}
