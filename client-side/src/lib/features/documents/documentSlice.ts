// features/documents/documentsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../lib/store";
import API from "@/lib/utils/api";
import { deleteCookie } from "cookies-next";
import { redirect } from "next/navigation";

interface Document {
  id: string;
  title: string;
  link: string;
}

interface DocumentsState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  documents: Document[];
  currentDocument: Document | null;
}

const initialState: DocumentsState = {
  status: "idle",
  error: null,
  documents: [],
  currentDocument: null,
};

export const fetchAllDocuments = createAsyncThunk(
  "documents/fetchAll",
  async (id: string, thunkAPI) => {
    try {
      const response = await API.get("/documents/fetchAll", { params: { id } });
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
          "An error has occured !"
      );
    }
  }
);

export const fetchDocument = createAsyncThunk(
  "documents/fetch",
  async (id: string, thunkAPI) => {
    try {
      const response = await API.get("/documents/fetchSingleDocument", {
        params: { id },
      });
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
          "An error has occured !"
      );
    }
  }
);

export const addDocument = createAsyncThunk(
  "documents/add",
  async ({ title, file }: { title: string; file: File }, thunkAPI) => {
    try {
      const response = await API.post(
        "api/file/create/",
        { title, file },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response.data.message ??
          error.response.data.detail ??
          "An error has occured !"
      );
    }
  }
);

export const updateDocument = createAsyncThunk(
  "documents/update",
  async ({ id, title }: { id: string; title: string }, thunkAPI) => {
    try {
      const response = await API.put(`api/file/update/${id}/`, {
        title: title,
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response.data.detail ??
          error.response.data.message ??
          "Something went wrong!"
      );
    }
  }
);

export const deleteDocument = createAsyncThunk(
  "documents/delete",
  async (id: string, thunkAPI) => {
    try {
      const response = await API.delete(`api/file/destroy/${id}/`);
      return response.data;
    } catch (error: any) {
      if (error.response.status === 401 || error.response.status === 403) {
        deleteCookie("auth_token");
        redirect(`/sign-in`);
      }

      return thunkAPI.rejectWithValue(
        error.response.data.detail ??
          error.response.data.message ??
          "Something went wrong!"
      );
    }
  }
);

export const documentsSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {
    reset: () => initialState,
    resetError: (state) => {
      state.error = "";
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
      .addCase(fetchAllDocuments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchAllDocuments.fulfilled,
        (state, action: PayloadAction<Document[]>) => {
          state.status = "succeeded";
          state.error = null;
        }
      )
      .addCase(
        fetchAllDocuments.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.error = action.payload;
        }
      )
      .addCase(fetchDocument.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchDocument.fulfilled,
        (state, action: PayloadAction<Document>) => {
          state.status = "succeeded";
          state.error = null;
        }
      )
      .addCase(fetchDocument.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addDocument.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addDocument.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(addDocument.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateDocument.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updateDocument.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = "succeeded";
          state.error = null;
        }
      )
      .addCase(updateDocument.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteDocument.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        deleteDocument.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = "succeeded";
          state.error = null;
        }
      )
      .addCase(deleteDocument.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { reset, resetError, resetErrorAndStatus, resetStatus } =
  documentsSlice.actions;

export default documentsSlice.reducer;

export const selectDocuments = (state: RootState) => state.documents;
