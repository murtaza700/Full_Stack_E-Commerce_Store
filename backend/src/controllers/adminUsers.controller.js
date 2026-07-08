import User from '../models/user.model.js'

export const getAllUsersAdmin = async (req, res) => {
    try {
        const { search = '', sort = '-createdAt' } = req.query;

        let userFilterQuery = {};

        if (search && search.trim() !== '') {
            const cleanSearchToken = search.trim();

            if (cleanSearchToken.match(/^[0-9a-fA-F]{24}$/)) {
                userFilterQuery._id = cleanSearchToken;
            } else {

                userFilterQuery.$or = [
                    { fullName: { $regex: cleanSearchToken, $options: 'i' } },
                    { email: { $regex: cleanSearchToken, $options: 'i' } }
                ];
            }
        }

        const filteredRegisteredUsers = await User.find(userFilterQuery)
            .select('-password')
            .sort(sort);

        return res.status(200).json({
            success: true,
            count: filteredRegisteredUsers.length,
            users: filteredRegisteredUsers
        });

    } catch (serverError) {
        console.error("Backend Error inside filtered getAllUsersAdmin:", serverError);
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