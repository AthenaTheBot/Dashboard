import axios from "axios";
import { config } from "../index";
import { AccessTokenResponse } from "../constants";

const exchangeToken = async (
  token: string
): Promise<AccessTokenResponse | null> => {
  try {
    const serverRes = await axios({
      url: config.oauthEndpoints.tokenExchange,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: `grant_type=authorization_code&client_id=${config.auth.clientId}&client_id=${config.auth.clientId}&client_secret=${config.auth.clientSecret}&redirect_uri=${config.auth.redirectUri}&code=${token}`,
    });

    return serverRes.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default exchangeToken;
