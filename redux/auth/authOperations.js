import firebase from "../../firebase/config";
import { authSlice } from "./authReducer";
import { auth } from "../../firebase/config";

// const { updateUserProfile } = authSlice.actions;

// Registration
export const authSignUpUser =
  ({ email, password, login }) =>
  async (dispatch, getState) => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      const user = await auth.currentUser;

      await user.updateProfile(user, {
        displayName: login,
      });

      const updateUserSuccess = await auth.currentUser;

      const { uid, displayName } = await auth.currentUser;

      // const userUpdated = auth.currentUser;
      const userUpdateProfile = {
        login: displayName,
        userId: uid,
      };

      console.log("uid", uid, "displayName", displayName);

      dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
      console.log("authSignUpUser", user);
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

// Login

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      console.log("authSignInUser", user);
    } catch (error) {
      console.log("error", error);
      console.log("error.code", error.code);
      console.log("error.message", error.message);
    }
  };
// export const authSignOutUser = () = async (dispatch, getState) => {}
