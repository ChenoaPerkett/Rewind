const User = require('../models/User');

exports.updateUser = async (req, res) => {
    try {
        const { name, surname, email, image, bio } = req.body;
        const  id = req.params.id;
        const user = await User.findByIdAndUpdate(id, { name, surname, email, image, bio }, { new: true });
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
