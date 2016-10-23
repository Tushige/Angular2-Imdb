"use strict";
var Actor = (function () {
    function Actor(title, description, image, mediaLinks, filmography, occupation) {
        this.title = title;
        this.description = description;
        this.image = image;
        this.mediaLinks = mediaLinks;
        this.filmography = filmography;
        this.occupation = occupation;
        this.title = title;
        this.description = description ? description : null;
        this.image = image;
        this.mediaLinks = mediaLinks;
        this.filmography = filmography;
        this.occupation = occupation;
    }
    return Actor;
}());
exports.Actor = Actor;
//# sourceMappingURL=actor.js.map