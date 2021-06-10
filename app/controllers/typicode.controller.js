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
 */

const Typicode = require("../models/post.model");
const fetch = require('node-fetch');

// The assumption is that this is the only external base path.
const EXTERNAL_BASE_PATH = process.env.TYPICODE_JSON_BASE_PATH;


// Create a single post.
exports.createPost = (async (req, res) => {
    try {
        // Validate request
        if (!req.body.title) {
            res.status(400).send({
                message: "Content cannot be empty!"
            });
            return;
        }

        // Storing the request options after validation
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title: 'React POST Request Example'})
        };

        // Create Post
        var typicode = new Typicode(req.body.userId,
            req.body.id,
            req.body.title,
            req.body.body);

        const apiResponse = await fetch(
            EXTERNAL_BASE_PATH + '/posts',
            requestOptions
        );

        const apiResponseJson = await apiResponse.json();

        console.log(apiResponseJson);
        res.send('Done – check console log');
    } catch (err) {
        console.log(err);
        res.status(500).send('Something went wrong')
    }
});

// Find a single post with an id.
exports.findPostById = (async (req, res) => {
    const id = req.params.id;

    try {
        // Validate request
        const reqValidation = validateChangeRequestId(id, res);

        if (reqValidation.status === 400) {
            return reqValidation;
        }

        const apiResponse = await fetch(
            EXTERNAL_BASE_PATH + '/posts/' + id
        );

        const apiResponseJson = await apiResponse.json();
        console.log(apiResponseJson);

        res.send(apiResponseJson);
    } catch (err) {
        console.log(err);
        res.status(500).send('Something went wrong.')
    }
});

// Update a single post with an id.
exports.updatePostById = (async (req, res) => {
    const id = req.params.id;

    try {
        // Validate request
        const reqValidation = validateChangeRequestId(id, res);

        if (reqValidation.status === 400) {
            return reqValidation;
        }

        // Storing the request options after validation
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title: 'React PUT Request Example'})
        };

        const apiResponse = await fetch(
            EXTERNAL_BASE_PATH + '/posts/' + id,
            requestOptions
        );

        const apiResponseJson = await apiResponse.json();
        console.log(apiResponseJson);

        res.send(apiResponseJson);
    } catch (err) {
        console.log(err);
        res.status(500).send('Something went wrong.')
    }
});

// Delete a single post with an id.
exports.deletePostById = (async (req, res) => {
    const id = req.params.id;

    try {
        // Validate request
        const reqValidation = validateChangeRequestId(id, res);

        if (reqValidation.status === 400) {
            return reqValidation;
        }

        // Storing the request options after validation
        const requestOptions = {
            method: 'DELETE'
        };

        const apiResponse = await fetch(
            EXTERNAL_BASE_PATH + '/posts/' + id,
            requestOptions
        );

        const apiResponseJson = await apiResponse.json();
        console.log(apiResponseJson);

        res.send(apiResponseJson);
    } catch (err) {
        console.log(err);
        res.status(500).send('Something went wrong.')
    }
});

// Retrieve all post entries from the resource.
exports.findAllPosts = (async (req, res) => {
    try {
        // It is not necessary to validate this GET request.

        const apiResponse = await fetch(
            EXTERNAL_BASE_PATH + '/posts'
        );

        const apiResponseJson = await apiResponse.json();
        console.log('findAllPosts: Request processed successfully');

        res.send(apiResponseJson);
    } catch (err) {
        console.log(err);
        res.status(500).send('Something went wrong.')
    }
});

// Find comments with a post id.
exports.findCommentsByPostId = (async (req, res) => {
    const id = req.params.id;

    try {
        // Validate request
        const reqValidation = validateChangeRequestId(id, res);

        if (reqValidation.status === 400) {
            return reqValidation;
        }

        const apiResponse = await fetch(
            EXTERNAL_BASE_PATH + '/posts/' + id + '/comments'
        );

        const apiResponseJson = await apiResponse.json();
        console.log(apiResponseJson);

        res.send(apiResponseJson);
    } catch (err) {
        console.log(err);
        res.status(500).send('Something went wrong.')
    }
});

// Validation for single item requests.
// Named this "...ChangeRequest..." to maintain its generic nature because it is applied on update or delete methods.
function validateChangeRequestId(id, res) {
    if (!id || isNaN(id)) {
        res.status(400).send({
            message: "Id cannot be empty!"
        });
    }

    return res;
}

// Validation for single entry Post requests.
function validateTypicodeCreateRequest(id, res) {
    if (!id || isNaN(id)) {
        res.status(400).send({
            message: "Id cannot be empty!"
        });
    }

    return res;
}