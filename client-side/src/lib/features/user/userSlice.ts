import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../lib/store";
import API from "@/lib/utils/api";
import { deleteCookie } from "cookies-next";
import { redirect } from "next/navigation";
interface User {
  first_name: string;
  last_name: string;
  profilePicture: string | File;
}

interface UserState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  user: User | null;
}

const initialState: UserState = {
  status: "idle",
  error: null,
  user: null,
};

export const fetchUserData = createAsyncThunk(
  "user/fetch",
  async (id: string, thunkAPI) => {
    try {
      const response = await API.get("/get-current-user", { params: { id } });
      const data = response.data;
      if (data) {
        return data;
      } else {
        return thunkAPI.rejectWithValue("No data found");
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response.data.detail ??
          error.response.data.message ??
          "An error occurred"
      );
    }
  }
);
export const updateUser = createAsyncThunk(
  "user/update",
  async (user: User, thunkAPI) => {
    try {
      const body =
        typeof user.profilePicture === "string"
          ? {
              first_name: user.first_name,
              last_name: user.last_name,
            }
          : user;
      const response = await API.put("update-user", body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const data = response.data;
      if (data) {
        return data;
      } else {
        return thunkAPI.rejectWithValue("No data found");
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error:
          error.response.data.detail ??
          error.response.data.message ??
          "An error occurred",
        status: error.response.status,
      });
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const response = await API.post("auth/reset", { email, password });
      const data = response.data;
      if (data) {
        return data;
      } else {
        return thunkAPI.rejectWithValue("No data found");
      }
    } catch (error: any) {
      if (error.response.status === 403) {
        return thunkAPI.rejectWithValue(
          "User not verified (verification email sent)"
        );
      } else if (error.response.status === 404) {
        return thunkAPI.rejectWithValue("User not found");
      } else {
        return thunkAPI.rejectWithValue(
          error.response.data.detail ??
            error.response.data.message ??
            "An error occurred"
        );
      }
    }
  }
);

export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async (
    {
      old_password,
      new_password,
    }: { old_password: string; new_password: string },
    thunkAPI
  ) => {
    try {
      const response = await API.put("update-password", {
        old_password,
        new_password,
      });
      const data = response.data;
      if (data) {
        return data;
      } else {
        return thunkAPI.rejectWithValue("No data found");
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error:
          error.response.data.detail ??
          error.response.data.message ??
          "An error occurred",
        status: error.response.status,
      });
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: () => initialState,
    resetErrorUser: (state) => {
      state.error = "";
    },
    resetUserUser: (state) => {
      state.user = null;
    },
    resetErrorAndStatusUser: (state) => {
      state.status = "idle";
      state.error = "";
    },
    resetStatusUser: (state) => {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchUserData.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.status = "succeeded";
          state.user = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchUserData.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload.error;
        console.log(action.payload.status);

        if (action.payload.status === 401 || action.payload.status === 403) {
          setTimeout(() => {
            deleteCookie("auth_token");
            window.location.pathname = `/sign-in`;
          }, 2000);
        }
      })
      .addCase(resetPassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetPassword.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = "";
      })
      .addCase(resetPassword.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updatePassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updatePassword.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = "succeeded";
          state.error = "";
        }
      )
      .addCase(updatePassword.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload.error;
        if (action.payload.status === 401 || action.payload.status === 403) {
          setTimeout(() => {
            deleteCookie("auth_token");
            window.location.pathname = `/sign-in`;
          }, 2000);
        }
      });
  },
});

export const {
  resetUser,
  resetErrorUser,
  resetUserUser,
  resetErrorAndStatusUser,
  resetStatusUser,
} = userSlice.actions;

export default userSlice.reducer;

export const selectUser = (state: RootState) => state.user;
