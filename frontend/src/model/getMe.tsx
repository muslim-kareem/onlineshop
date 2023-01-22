import axios from "axios";

export default async function getMe () {
  try {
    const user = await axios.get("/api/app-users/me");
    return user.data
  } catch (e) {
    return null;
  }
}
