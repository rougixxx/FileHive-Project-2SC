import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../lib/store";
import API from "@/lib/utils/api";
import { setCookie, deleteCookie } from "cookies-next";

interface User {
  id: string;
  first_name: string;
  last_name: string;
  isVerified: boolean;
  email: string;
}

interface AuthState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string;
  user: User | null;
}

const initialState: AuthState = {
  status: "idle",
  error: "",
  user: null,
};
export const login = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await API.post("auth/login", credentials);
      const data = response.data;
      if (data) {
        setCookie("auth_token", data.acess_token, {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        });
        return data;
      } else {
        return thunkAPI.rejectWithValue("No data found");
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response.data.message ??
          error.response.data.messages[0].message ??
          "An error occurred"
      );
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (
    credentials: {
      email: string;
      first_name: string;
      last_name: string;
      password: string;
    },
    thunkAPI
  ) => {
    try {
      const response = await API.post("auth/register", credentials);
      const data = response.data;
      if (data) {
        return data;
      } else {
        return thunkAPI.rejectWithValue("No data found");
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response.data.message ??
          error.response.data.detail ??
          "An error occurred"
      );
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_) => {
  localStorage.removeItem("ally-supports-cache");
  deleteCookie("auth_token");
  deleteCookie("csrftoken");
  deleteCookie("sessionid");
});

export const sendResetPassword = createAsyncThunk(
  "auth/sendResetPassword",
  async (email: string, thunkAPI) => {
    try {
      const response = await API.post("auth/receive-reset", { email });
      const data = response.data;
      if (data) {
        return data;
      } else {
        return thunkAPI.rejectWithValue("No data found");
      }
    } catch (error: any) {
      if (error.response.data.detail) {
        return thunkAPI.rejectWithValue(error.response.data.detail);
      }
      if (error.response.status === 404) {
        return thunkAPI.rejectWithValue("User not found");
      } else {
        return thunkAPI.rejectWithValue(
          error.response.data.messages[0].message ?? "An error occurred"
        );
      }
    }
  }
);

export const verifyReset = createAsyncThunk(
  "auth/verifyReset",
  async ({ uid64, token }: { uid64: string; token: string }, thunkAPI) => {
    try {
      const response = await API.post(`auth/verify-reset/${uid64}/${token}`);
      const data = response.data;
      if (data) {
        return data;
      } else {
        return thunkAPI.rejectWithValue("No data found");
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue("Verification failed");
    }
  }
);

export const verify = createAsyncThunk(
  "auth/verifyUser",
  async ({ uid64, token }: { uid64: string; token: string }, thunkAPI) => {
    try {
      await API.get(`auth/verify/${uid64}/${token}`);
    } catch (error: any) {
      return thunkAPI.rejectWithValue("Verification failed");
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => initialState,
    resetError: (state) => {
      state.error = "";
    },
    resetUser: (state) => {
      state.user = null;
    },
    resetErrorAndStatus: (state) => {
      state.status = "idle";
      state.error = "";
    },
    resetStatus: (state) => {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = "";
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(signup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signup.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.error = "";
      })
      .addCase(signup.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(sendResetPassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        sendResetPassword.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = "succeeded";
          state.user = action.payload;
          state.error = "";
        }
      )
      .addCase(
        sendResetPassword.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.error = action.payload;
        }
      )

      .addCase(verifyReset.pending, (state) => {
        state.status = "loading";
      })
      .addCase(verifyReset.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = "";
      })
      .addCase(verifyReset.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(verify.pending, (state) => {
        state.status = "loading";
      })
      .addCase(verify.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = "";
      })
      .addCase(verify.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {
  reset,
  resetError,
  resetUser,
  resetErrorAndStatus,
  resetStatus,
} = authSlice.actions;

export default authSlice.reducer;

export const selectAuth = (state: RootState) => state.auth;
