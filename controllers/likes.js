const Sauce = require("../models/Sauce");

exports.addLikeOrDislike = (req, res, next) => {
    if (req.body.like == 1) {
        Sauce.updateOne(
            { _id: req.params.id },
            {
                $push: { usersLiked: req.body.userId },
                $inc: { likes: req.body.like },
            }
        )
            .then(() => res.status(200).json({ message: "Like ajouté à la sauce" }))
            .catch((error) => res.status(400).json({ error }));
    }

    if (req.body.like == -1) {
        Sauce.updateOne(
            { _id: req.params.id },
            {
                $push: { usersDisliked: req.body.userId },
                $inc: { dislikes: 1 },
            }
        )
            .then(() => res.status(200).json({ message: "Dislike ajouté à la sauce" }))
            .catch((error) => res.status(400).json({ error }));
    }

    if (req.body.like == 0) {
        Sauce.findOne({ _id: req.params.id })
            .then((sauce) => {
                let usersLikedFound = false;
                for (index = 0; index < sauce.usersLiked.length; index++) {
                    if (sauce.usersLiked[index] == req.body.userId) {
                        usersLikedFound = true;
                    }
                }
                // if the user is not in userLiked => that mean he disliked the sauce, so cancel the vote in userDisliked
                if (usersLikedFound == false) {
                    Sauce.updateOne(
                        { _id: req.params.id },
                        {
                            $pull: { usersDisliked: req.body.userId },
                            $inc: { dislikes: -1 },
                        }
                    )
                        .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
                        .catch((error) => res.status(400).json({ error }));
                } else {
                    Sauce.updateOne(
                        { _id: req.params.id },
                        {
                            $pull: { usersLiked: req.body.userId },
                            $inc: { likes: -1 },
                        }
                    )
                        .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
                        .catch((error) => res.status(400).json({ error }));
                }
            });
    }
};