import User from '../models/user.model.js'

export const getAllUsersAdmin = async (req, res) => {
    try {
        const allRegisteredUsers = await User.find().select('-password').sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: allRegisteredUsers.length,
            users: allRegisteredUsers
        });
    } catch (serverError) {
        console.error("Backend Error inside getAllUsersAdmin:", serverError);
        return res.status(500).json({
            success: false,
            message: "Internal server data acquisition matrix error. Awaiting node logs triage."
        });
    }
};

export const deleteUserAccountAdmin = async (req, res) => {
    try {
        const targetUserIdToken = req.params.id;

        const userAccountMatchNode = await User.findById(targetUserIdToken);
        if (!userAccountMatchNode) {
            return res.status(404).json({
                success: false,
                message: "Targeted profile profile reference not found inside database indices bounds."
            });
        }

        if (req.user && req.user._id.toString() === targetUserIdToken.toString()) {
            return res.status(400).json({
                success: false,
                message: "Administrative protocol breach: Self-destruction of active session token is disallowed."
            });
        }

        await User.findByIdAndDelete(targetUserIdToken);

        return res.status(200).json({
            success: true,
            message: "Client identity credentials record wiped off database registries successfully!"
        });
    } catch (serverError) {
        console.error("Backend Error inside deleteUserAccountAdmin:", serverError);
        return res.status(500).json({
            success: false,
            message: "Internal terminal endpoint processing conflict. Please check console clusters definitions."
        });
    }
};