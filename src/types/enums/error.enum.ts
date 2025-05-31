export const enum Errors {
    PRISMA_CLIENT_REQUIRED = 'Prisma client is required',
    STATEMENT_NOT_FOUND = 'Statement not found',
    STATEMENT_ID_REQUIRED = 'Statement ID is required',
    REQUEST_BODY_REQUIRED = 'Request body is required',
    NO_STATEMENTS_IN_PROGRESS = 'No statements in progress',
    ERROR_CREATING_STATEMENT = 'Error creating statement',
    ERROR_UPDATING_STATEMENT = 'Error updating statement',
    ERROR_STARTING_STATEMENT = 'Error starting statement',
    ERROR_CANCELLING_STATEMENT = 'Error canceling statement',
    ERROR_CANCELLING_ALL_STATEMENTS = 'Error canceling all statements',
    INVALID_DATE_RANGE = 'Invalid date range provided',
}
