// accountService.js (in services folder)
const db = require('../config/dbPg');

// Function to check if an alias is active in the accounts table
async function checkAliasActive(alias) {
    const result = await db.query(
        'SELECT * FROM snapper_accounts WHERE aliascode = $1 AND status = $2',
        [alias, 'active']
    );
    if (result.rows.length === 0) {
        throw new Error(`${alias} is not active or doesn't exist`);
    }
    return result.rows[0];
}

// Function to check if a parent-child relationship exists
async function checkParentChildRelation(senderId, receiverId) {
    const result = await db.query(
        'SELECT * FROM snapper_relations WHERE parent_id = $1 AND child_id = $2',
        [senderId, receiverId]
    );
    if (result.rows.length === 0) {
        throw new Error(`Sender is not authorized to message receiver`);
    }
    return true;
}

// Function to insert task into task table
async function saveTask(details) {
    const { requestId, snapObject, snapType, description, snapDate, snapTime, selectedOas, status } = details;

    await db.query(
        `INSERT INTO task (requestId, snapObject, snapType, description, snapDate, snapTime, selectedOas, status) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [requestId, snapObject, snapType, description, snapDate, snapTime, selectedOas, status]
    );
}

module.exports = { checkAliasActive, checkParentChildRelation, saveTask };
