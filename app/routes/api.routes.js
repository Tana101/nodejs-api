module.exports = app => {
    const typicodeController = require("../controllers/typicode.controller.js");

    var router = require("express").Router();

    /**
     * Endpoints for singular Post result sets
     *
     * @see "Routes" here: https://jsonplaceholder.typicode.com/
     */
    // Create a new Post post entry.
    router.post("/typicode/posts/createPost", typicodeController.createPost);

    // Retrieve (read) a single Post post entry.
    router.get("/typicode/posts/:id", typicodeController.findPostById);

    // Update a single Post post entry.
    router.put("/typicode/posts/:id", typicodeController.updatePostById);

    // Delete a single Post post entry.
    router.delete("/typicode/posts/:id", typicodeController.deletePostById);

    /**
     * Endpoints for multiple Post result sets
     *
     * @see "Routes" here: https://jsonplaceholder.typicode.com/
     */
    // Retrieve (read) all Post post entries.
    router.get("/typicode/posts", typicodeController.findAllPosts);

    // Retrieve (read) all Post comment entries for a single post.
    router.get("/typicode/posts/:id/comments", typicodeController.findCommentsByPostId);

    app.use('/api', router);
};