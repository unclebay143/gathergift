import axios from "axios";

export const FLUTTER_WAVE_DEFAULT_MOBILE_NUMBER = "010101010";

export const createFlutterSubAccount = async ({
  account_name,
  email,
  mobilenumber,
  country,
}: {
  account_name: string;
  email: string;
  mobilenumber: string;
  country: "US" | "NG";
}) => {
  return axios.post("/api/flutterwave/sub-account", {
    account_name,
    email,
    mobilenumber,
    country,
  });
};
