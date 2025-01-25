import { IDL, query, update } from 'azle';

export default class {
    @query([], IDL.Text)
    queryUndefined(): string {
        return 'query hidden undefined';
    }

    @query([], IDL.Text, { hidden: true })
    queryHiddenTrue(): string {
        return 'query hidden true';
    }

    @query([], IDL.Text, { hidden: false })
    queryHiddenFalse(): string {
        return 'query hidden false';
    }

    @update([], IDL.Text)
    updateUndefined(): string {
        return 'update hidden undefined';
    }

    @update([], IDL.Text, { hidden: true })
    updateHiddenTrue(): string {
        return 'update hidden true';
    }

    @update([], IDL.Text, { hidden: false })
    updateHiddenFalse(): string {
        return 'update hidden false';
    }
}
