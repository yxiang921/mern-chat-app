import User from "../models/user.model.js";

export const getUserForSideBar = async (req, res) => {
    try {
        const loggedInUserID = req.user._id;

        const allFilteredUser = await User.find({
            _id: {
                $ne: loggedInUserID
            }
        }).select("-password");

        res.status(200).json(allFilteredUser);

    } catch (error) {
        console.log("Error in getUserForSideBar controller: ", error.message);
        res.status(500).json({ error: "Internal Server Error"});
    }
}