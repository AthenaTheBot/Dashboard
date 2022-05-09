import axios from "axios";
import { config, cache } from "../index";
import { User } from "../constants";

const getCurrentUser = async (
  accessToken: string,
  force?: boolean
): Promise<User | null> => {
  const cachedUser = cache.users.get(accessToken);

  if (!force && cachedUser) return cachedUser;

  try {
    const serverRes = await axios.get(config.oauthEndpoints.getCurrentUser, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    cache.users.set(accessToken, serverRes.data);

    setTimeout(
      () => cache.users.delete(accessToken),
      config.cacheTimeouts.users * 1000
    );

    return serverRes.data;
  } catch (err: any) {
    if (!err?.data?.retry_after) {
      console.log(err);
    }
    return null;
  }
};

export default getCurrentUser;
