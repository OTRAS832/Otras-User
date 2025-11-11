import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/* -------------------------------------------------------------------------- */
/* 🧠 1️⃣ State Definition */
/* -------------------------------------------------------------------------- */
interface JobData {
  jobTitle: string;
  jobCategory: string;
  fee: number;
}

interface ApplicationData {
  job: JobData;
  otrasId: string;
  center: string;
}

interface UserState {
  otrNumber: string | null;
  otrCondidateId: string | null;
  paymentData: ApplicationData | null;
}

/* -------------------------------------------------------------------------- */
/* 🚀 2️⃣ Initial State */
/* -------------------------------------------------------------------------- */
const initialState: UserState = {
  otrNumber: localStorage.getItem("otrNumber"),
  otrCondidateId: localStorage.getItem("otrCondidateId"),
  paymentData: localStorage.getItem("userotrData")
    ? JSON.parse(localStorage.getItem("userotrData")!)
    : null,
};

/* -------------------------------------------------------------------------- */
/* ⚙️ 3️⃣ Slice Definition */
/* -------------------------------------------------------------------------- */
const otrSlice = createSlice({
  name: "otr",
  initialState,
  reducers: {
    setOtrData: (state, action: PayloadAction<Partial<UserState>>) => {
      if (action.payload.otrNumber !== undefined && action.payload.otrNumber !== null) {
        state.otrNumber = String(action.payload.otrNumber);
        localStorage.setItem("otrNumber", state.otrNumber);
      }
    },

    setOtrCandidateId: (state, action: PayloadAction<Partial<UserState>>) => {
      if (action.payload.otrCondidateId !== undefined && action.payload.otrCondidateId !== null) {
        state.otrCondidateId = String(action.payload.otrCondidateId);
        localStorage.setItem("otrCondidateId", state.otrCondidateId);
      }
    },

    setOtrNumber: (state, action: PayloadAction<string | null>) => {
      state.otrNumber = action.payload;
      if (action.payload) {
        localStorage.setItem("otrNumber", action.payload);
      } else {
        localStorage.removeItem("otrNumber");
      }
    },

    clearUserData: (state) => {
      state.otrNumber = null;
      state.paymentData = null;
      localStorage.removeItem("otrNumber");
      localStorage.removeItem("userotrData");
    },

    setPaymentData: (state, action: PayloadAction<ApplicationData | null>) => {
      state.paymentData = action.payload;
      if (action.payload) {
        localStorage.setItem("userotrData", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("userotrData");
      }
    },
  },
});

/* -------------------------------------------------------------------------- */
/* 📦 4️⃣ Exports */
/* -------------------------------------------------------------------------- */
export const { setOtrData, setOtrNumber, setOtrCandidateId, clearUserData, setPaymentData } =
  otrSlice.actions;
export default otrSlice.reducer;
