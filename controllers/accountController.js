// messageController.js
const accountService = require('../services/accountService');

// Handler for processing request from frontend
async function handleMessageRequest(req, res) {
    const { companyAlias, senderAlias, receiverAlias, requestId, snapObject, snapType, description, snapDate, snapTime, selectedOas } = req.body;

    console.log(companyAlias, senderAlias, receiverAlias, requestId, snapObject, snapType, description, snapDate, snapTime, selectedOas);

    try {
        // Step 1: Check if companyAlias, senderAlias, and receiverAlias are active
        await accountService.checkAliasActive(companyAlias);
        const sender = await accountService.checkAliasActive(senderAlias);
        const receiver = await accountService.checkAliasActive(receiverAlias);

        // Step 2: Check if sender is the parent of receiver
        await accountService.checkParentChildRelation(sender.id, receiver.id);

        // Step 3: If all checks pass, save the task to the task table
        const taskDetails = {
            requestId,
            snapObject,
            snapType,
            description,
            snapDate,
            snapTime,
            selectedOas,
            status: 'open'
        };

        await accountService.saveTask(taskDetails);

        // Send success response
        res.status(200).json({ message: 'Task created successfully.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { handleMessageRequest };

