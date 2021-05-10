export class InvalidTransfer extends Error {
    public constructor(message: string) {
        super(JSON.stringify({
            default: {
                field: 'default',
                message
            }
        }));
    }
}