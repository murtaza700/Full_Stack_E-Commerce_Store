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
            message: 'Users retrieved successfully.',
            count: filteredRegisteredUsers.length,
            users: filteredRegisteredUsers
        });

    } catch (serverError) {
        console.error("Backend Error inside filtered getAllUsersAdmin:", serverError);
        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again!"
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
                message: "Account not found!"
            });
        }

        if (req.user && req.user.id.toString() === targetUserIdToken.toString()) {
            return res.status(400).json({
                success: false,
                message: "You cannot delete your own account!"
            });
        }

        await User.findByIdAndDelete(targetUserIdToken);

        return res.status(200).json({
            success: true,
            message: "Account deleted successfully!"
        });
    } catch (serverError) {
        console.error("Backend Error inside deleteUserAccountAdmin:", serverError);
        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again!"
        });
    }
};