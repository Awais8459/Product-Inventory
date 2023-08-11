const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return User.create(userBody);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (userId) => {
  return User.findById(userId).select('name role location id'); // Include 'location' field
};



/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;

};

const getUserLocationsByRole = async (role) => {
  const users = await User.find({ role });
  const locations = users.map(user=>({
    id: user._id,
    name: user.name,
    location: user.location
  }));
  return locations;
};
const getUserLocationByRoleAndUserId = async (role, userId) => {
  const user = await User.findOne({ role, _id: userId });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const userLocation = {
    id: user._id,
    name: user.name,
    location: user.location
  };
  return userLocation
};

const getUsersByRole = async (role) => {
  const users = await User.find({ role });
  return users;
};

const findNearbyUsers = async (coordinates, maxDistance, role) => {
  try {
    // const users = await User.aggregate([
    //   {
    //     $geoNear: {
    //       near: {
    //         type: 'Point',
    //         coordinates,
    //       },
    //       distanceField: 'distance',
    //       maxDistance,
    //       spherical: true,
    //     },
    //   },
    //   {
    //     $match: {
    //       role: role
    //     }
    //   },
    // ]);
    const users = await User.aggregate([
      {
        $match: {
          role: role
        }
      },
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates,
          },
          distanceField: 'distance',
          maxDistance,
          spherical: true,
        },
      }
    ]);

    return users;
  } catch (error) {
    console.error('Error in findNearbyUsers service:', error);
    throw error;
  }
};



// exports.findNearbyUsers = async (coordinates, role) => {
//   const nearbyUsers = await User.aggregate([
//     {
//       $geoNear: {
//         near: {
//           type: 'Point',
//           coordinates: coordinates,
//         },
//         distanceField: 'distance',
//         maxDistance: 10000, // 10 kilometers
//         query: {
//           role: role,
//         },
//         spherical: true,
//       },
//     },
//   ]);

//   return nearbyUsers;
// };




module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  getUserLocationsByRole,
  getUserLocationByRoleAndUserId,
  getUsersByRole,
  findNearbyUsers
};
