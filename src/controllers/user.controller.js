const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');
const { User } = require('../models');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getUserById = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  res.send(user);
});

// const getUser = async (req, res) => {
//   try {
//     const user = await userService.getUserById(req.params.userId)
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };



const getUsersByRole = catchAsync(async (req, res) => {
  const role = req.params.role; // Get the role from the URL parameter
  const users = await userService.getUsersByRole(role);
  res.status(httpStatus.OK).send(users);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  // res.status(httpStatus.NO_CONTENT).send();
  res.status(200).json({ message: 'User successfully deleted' });
});

const getUserLocationsByRole = catchAsync(async (req, res) => {
  const { role } = req.params;
  const locations = await userService.getUserLocationsByRole(role);
  res.status(httpStatus.OK).send(locations);
});

const getUserLocationByRoleAndUserId = catchAsync(async (req, res) => {
  const { role, userId } = req.params;
  const location = await userService.getUserLocationByRoleAndUserId(role, userId);
  res.status(httpStatus.OK).send(location);
});


// const calculateDistance = catchAsync(async (req, res) => {
//   const user1Id = req.query.user1Id; // ID of the first user (customer/retailer/rider)
//   const user2Id = req.query.user2Id; // ID of the second user (customer/retailer/rider)

//   try {
//     const user1 = await userService.getUserById(user1Id);
//     const user2 = await userService.getUserById(user2Id);

//     if (!user1 || !user2) {
//       throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
//     }

//     const distance = calculateDistanceBetweenLocations(user1.location.coordinates, user2.location.coordinates);

//     res.status(httpStatus.OK).send({ distance });
//   } catch (error) {
//     // Handle any service or other errors here
//     res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: error.message });
//   }
// });

// // Helper function to calculate distance between two sets of coordinates
// const calculateDistanceBetweenLocations = (coords1, coords2) => {
//   const earthRadius = 6371000; // Radius of the Earth in meters
//   const [lat1, lon1] = coords1;
//   const [lat2, lon2] = coords2;

//   const dLat = degToRad(lat2 - lat1);
//   const dLon = degToRad(lon2 - lon1);

//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//   const distance = earthRadius * c;

//   return distance;
// };

// // Helper function to convert degrees to radians
// const degToRad = (degrees) => {
//   return degrees * (Math.PI / 180);
// };


const calculateDistance = catchAsync(async (req, res) => {
  const user1Id = req.query.user1Id; // ID of the first user (customer/retailer/rider)
  const user2Id = req.query.user2Id; // ID of the second user (customer/retailer/rider)

  try {
    const user1 = await userService.getUserById(user1Id);
    const user2 = await userService.getUserById(user2Id);

    if (!user1 || !user2) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    // geoNear Agreagation
    const result = await User.aggregate([
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: user1.location.coordinates
          },
          distanceField: 'distance',
          spherical: true
        }
      },
      {
        $match: { _id: user2._id }
      }
    ]);

    if (result.length === 0) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    const distance = result[0].distance;

    res.status(httpStatus.OK).send({ distance });
  } catch (error) {
    // Handle any service or other errors here
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: error.message });
  }
});

// const findNearbyUsers = async (req, res) => {
//   try {
//     const { latitude, longitude, maxDistance, role } = req.params;
//     const coordinates = [parseFloat(latitude), parseFloat(longitude)];

//     const users = await userService.findNearbyUsers(
//       coordinates,
//       parseFloat(maxDistance),
//       role,
//     );

//     res.json(users);
//   } catch (error) {
//     console.error('Error fetching nearby users:', error);
//     res.status(500).json({ error: 'An error occurred while fetching nearby users.' });
//   }
// };

const findNearbyUsers = async (req, res) => {
  try {
    const { latitude, longitude, maxDistance, role } = req.params;
    const coordinates = [parseFloat(latitude), parseFloat(longitude)];

    const users = await userService.findNearbyUsers(
      coordinates,
      parseFloat(maxDistance),
      role,
    );
    // Customize the response to include only specific fields
    const simplifiedUsers = users.map(user => ({
      role: user.role,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      distance: user.distance,
    }));

    res.json(simplifiedUsers);
  } catch (error) {
    console.error('Error fetching nearby users:', error);
    res.status(500).json({ error: 'No user available' });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserLocationsByRole,
  getUserLocationByRoleAndUserId,
  getUsersByRole,
  calculateDistance,
  findNearbyUsers,
};
