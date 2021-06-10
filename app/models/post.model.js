/**
 * Post Model
 *
 * @author Tana Mharapara
 *
 * @exports Post
 */


/**
 * @constructor
 *
 * @param {number} userId - the User ID responsible for the Post
 * @param {number} id - the Post ID
 * @param {string} title - the Post Title
 * @param {string} body - the Post Body
 *
 * @return Post
 */
function Post(userId, id, title, body) {
    this.userId = userId || null;
    this.id = id || null;
    this.title = title || null;
    this.body  = body  || null;
}

Post.prototype.getUserId = function() {
    return this.userId;
};

Post.prototype.setUserId = function(userId) {
    this.userId = userId;
};

Post.prototype.getId = function() {
    return this.id;
};

Post.prototype.setId = function(id) {
    this.id = id;
};

Post.prototype.getTitle = function() {
    return this.title;
};

Post.prototype.setTitle = function(title) {
    this.title = title;
};

Post.prototype.getBody = function() {
    return this.body;
};

Post.prototype.setBody = function(body) {
    this.body = body;
};

Post.prototype.equals = function(otherPost) {
    return otherPost.getUserId() == this.getUserId()
        && otherPost.getId() == this.getId()
        && otherPost.getTitle() == this.getTitle()
        && otherPost.getBody() == this.getBody();
};

Post.prototype.fill = function(newFields) {
    for (var field in newFields) {
        if (this.hasOwnProperty(field) && newFields.hasOwnProperty(field)) {
            if (this[field] !== 'undefined') {
                this[field] = newFields[field];
            }
        }
    }
};

// Export the Post function
module.exports = Post;