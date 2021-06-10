/**
 * This controller handles Typicode requests and activities.
 *
 * @author Tana Mharapara
 *
 * Used anonymous functions to store the controller actions in exportable variables.
 *
 * What I would've done if I had more time:
 * - Made the EXTERNAL_BASE_PATH field less generic if there was more than one external endpoint.
 * - Extended this controller to make use of the albums, photos, todos and users endpoints.
 * - Applied validation on the create and update methods of the whole Post object i.e. validateChangeRequestData
 */

const Post = require("../models/post.model");
const fetch = require('node-fetch');

// The assumption is that this is the only external base path.
const EXTERNAL_BASE_PATH = process.env.TYPICODE_JSON_BASE_PATH;

const successfulRequestMsg = 'Request processed successfully.';
const failedRequestMsg = 'Something went wrong, please check the code and the error message below.';


// Create a single post.
exports.createPost = (async (req, res) => {
    const reqMethod = 'POST';
    const methodName = 'createPost';

    try {
        // Assigning values to the post object
        var post = new Post();
        post.fill({userId: req.body.userId, title: req.body.title, body: req.body.body});

        // Validate request
        // const reqValidation = validateChangeRequestData(post, res);
        //
        // if (reqValidation.status === 400) {
        //     logRequestResultToConsole(reqMethod, methodName, reqValidation.status.message);
        //
        //     return reqValidation;
        // }

        // Storing the request options after validation
        const requestOptions = {
            method: reqMethod,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(post)
        };

        const apiResponse = await fetch(
            EXTERNAL_BASE_PATH + '/posts',
            requestOptions
        );

        const apiResponseJson = await apiResponse.json();
        logRequestResultToConsole(reqMethod, methodName, successfulRequestMsg);

        res.send(apiResponseJson);
    } catch (err) {
        logRequestResultToConsole(reqMethod, methodName, failedRequestMsg);
        console.log(err);
        res.status(500).send(failedRequestMsg);
    }
});

// Find a single post with an id.
exports.findPostById = (async (req, res) => {
    const id = req.params.id;
    const reqMethod = 'GET';
    const methodName = 'findPostById';

    try {
        // Validate request
        const reqValidation = validateChangeRequestId(id, res);

        if (reqValidation.status === 400) {
            logRequestResultToConsole(reqMethod, methodName, reqValidation.status.message);

            return reqValidation;
        }

        const apiResponse = await fetch(
            EXTERNAL_BASE_PATH + '/posts/' + id
        );

        const apiResponseJson = await apiResponse.json();
        logRequestResultToConsole(reqMethod, methodName, successfulRequestMsg);

        res.send(apiResponseJson);
    } catch (err) {
        logRequestResultToConsole(reqMethod, methodName, failedRequestMsg);
        console.log(err);
        res.status(500).send(failedRequestMsg);
    }
});

// Update a single post with an id.
exports.updatePostById = (async (req, res) => {
    const id = req.params.id;
    const reqMethod = 'PUT';
    const methodName = 'updatePostById';

    try {
        // Assigning values to the post object - using the id from the path in case the API consumer changes it
        var post = new Post(req.body.userId,
            id,
            req.body.title,
            req.body.body);

        // Validate request
        // const reqValidation = validateChangeRequestData(post, res);
        //
        // if (reqValidation.status === 400) {
        //     logRequestResultToConsole(reqMethod, methodName, reqValidation.status.message);
        //
        //     return reqValidation;
        // }

        // Storing the request options after validation
        const requestOptions = {
            method: reqMethod,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(post)
        };

        const apiResponse = await fetch(
            EXTERNAL_BASE_PATH + '/posts/' + id,
            requestOptions
        );

        const apiResponseJson = await apiResponse.json();
        logRequestResultToConsole(reqMethod, methodName, successfulRequestMsg);

        res.send(apiResponseJson);
    } catch (err) {
        logRequestResultToConsole(reqMethod, methodName, failedRequestMsg);
        console.log(err);
        res.status(500).send(failedRequestMsg);
    }
});

// Delete a single post with an id.
exports.deletePostById = (async (req, res) => {
    const id = req.params.id;
    const reqMethod = 'DELETE';
    const methodName = 'deletePostById';

    try {
        // Validate request
        const reqValidation = validateChangeRequestId(id, res);

        if (reqValidation.status === 400) {
            logRequestResultToConsole(reqMethod, methodName, reqValidation.status.message);

            return reqValidation;
        }

        // Storing the request options after validation
        const requestOptions = {
            method: reqMethod
        };

        const apiResponse = await fetch(
            EXTERNAL_BASE_PATH + '/posts/' + id,
            requestOptions
        );

        const apiResponseJson = await apiResponse.json();
        logRequestResultToConsole(reqMethod, methodName, successfulRequestMsg);

        res.send(apiResponseJson);
    } catch (err) {
        logRequestResultToConsole(reqMethod, methodName, failedRequestMsg);
        console.log(err);
        res.status(500).send(failedRequestMsg);
    }
});

// Retrieve all post entries from the resource.
exports.findAllPosts = (async (req, res) => {
    const reqMethod = 'GET';
    const methodName = 'findAllPosts';

    try {
        // It is not necessary to validate this GET request.

        const apiResponse = await fetch(
            EXTERNAL_BASE_PATH + '/posts'
        );

        const apiResponseJson = await apiResponse.json();
        logRequestResultToConsole(reqMethod, methodName, successfulRequestMsg);

        res.send(apiResponseJson);
    } catch (err) {
        logRequestResultToConsole(reqMethod, methodName, failedRequestMsg);
        console.log(err);
        res.status(500).send(failedRequestMsg);
    }
});

// Find comments with a post id.
exports.findCommentsByPostId = (async (req, res) => {
    const id = req.params.id;
    const reqMethod = 'GET';
    const methodName = 'findCommentsByPostId';

    try {
        // Validate request
        const reqValidation = validateChangeRequestId(id, res);

        if (reqValidation.status === 400) {
            logRequestResultToConsole(reqMethod, methodName, reqValidation.status.message);

            return reqValidation;
        }

        const apiResponse = await fetch(
            EXTERNAL_BASE_PATH + '/posts/' + id + '/comments'
        );

        const apiResponseJson = await apiResponse.json();
        logRequestResultToConsole(reqMethod, methodName, successfulRequestMsg);

        res.send(apiResponseJson);
    } catch (err) {
        logRequestResultToConsole(reqMethod, methodName, successfulRequestMsg);
        console.log(err);
        res.status(500).send(failedRequestMsg);
    }
});


/**
 * Helper Functions:
 */

// Validation for single item requests.
// Named this "...ChangeRequest..." to maintain its generic nature because it is applied on both update and delete methods.
function validateChangeRequestId(id, res) {
    if (!id || isNaN(id)) {
        res.status(400).send({
            message: "Id cannot be empty."
        });
    }

    return res;
}

// Validation for single entry Post requests.
function validateChangeRequestData(postObj, res) {
    let isValid = true;
    let validationMsg = '';

    for (var field in postObj) {
        if (Object.prototype.hasOwnProperty.call(postObj, field)) {
            if (field === 'userId' || field === 'id') {
                if (isNaN(postObj[field])) {
                    validationMsg = ((!validationMsg) ? validationMsg : + ', ' + validationMsg);
                    isValid = false;
                }
            }
        } else {
            validationMsg = ((!validationMsg) ? validationMsg : + ', ' + validationMsg);
            isValid = false;
        }
    }

    return res;
}

// Validation for single entry Post requests.
function logRequestResultToConsole(requestMethod, name, message) {
    console.log('[' + requestMethod + '] ' + name + ': ' + message);
}
