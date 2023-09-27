const {
    userRegisteration,
    userLoging,
    isAuthUser,
} = require("../controllers/user_controller");
const {
    registerationValidator,
    loginValidator,
    addFriendValidato,
} = require("../middlewares/validator");
const { userAuthentication } = require("../middlewares/userAuth");
const {
    addFriend,
    getPendingRequests,
    acceptFriendRequest,
    rejectFriendRequest,
    getAllFriends,
    getDmUserDetails,
    addFriendToDirectMessageList,
} = require("../controllers/friends_controller");

const router = require("express").Router();

router.post("/register", registerationValidator, userRegisteration);
router.post("/login", loginValidator, userLoging);
router.get("/is-auth-user", userAuthentication, isAuthUser);
router.post("/add-friend", addFriendValidato, userAuthentication, addFriend);
router.get("/get-pending-requests", userAuthentication, getPendingRequests);
router.post("/accept-friend-request", userAuthentication, acceptFriendRequest);
router.delete(
    "/reject-friend-request/:id",
    userAuthentication,
    rejectFriendRequest
);
router.get("/get-all-friends", userAuthentication, getAllFriends);
router.post(
    "/add-friend-to-dm-list",
    userAuthentication,
    addFriendToDirectMessageList
);
router.get("/get-dm-userdetails/:userId", userAuthentication, getDmUserDetails);

module.exports = router;
