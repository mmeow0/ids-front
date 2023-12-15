import debug from "debug";
import { err, ok, ResultAsync } from "neverthrow";
import Cookies from "js-cookie";

const log = debug("app:lib:auth:pocketbase");

const POCKETBASE_API_URL = "http://127.0.0.1:8080";

export const pocketbase: AuthAdapter = {
  async login({ email, password }) {
    // TODO: add Zod
    const resp = await pocketbase_request<LoginResponse>({
      path: "/login",
      method: "POST",
      body: { email, password },
      fallback_error_message: "error logging in",
    });

    log("[login] resp:", resp);

    if (resp.isErr()) return err(resp.error);

    const { accessToken, message } = resp.value;

    if (message) return err(message);

    Cookies.set("accessToken", accessToken);

    return ok({ token: accessToken });
  },

  async signup({ email, password, name }) {
    if (!name) return err("Not Name");

    // TODO: add Zod
    const resp = await pocketbase_request<SignupResponse>({
      path: "/signup",
      method: "POST",
      body: { email, password, name },
      fallback_error_message: "error logging in",
    });

    log("[signup] resp:", resp);

    if (resp.isErr()) return err(resp.error);

    const { accessToken, message } = resp.value;

    if (message) return err(message);

    Cookies.set("accessToken", accessToken);

    return ok({ token: accessToken });
  },

  async logout() {
    // This is a non-op because PocketBase doesn't have a logout endpoint.
    // since it uses JWTs.
    return;
  },
};

async function pocketbase_request<T>({
  path,
  method = "GET",
  body = null,
  headers = {},
  fallback_error_message = "unknown error",
}: {
  path: string;
  method?: string;
  body?: any;
  headers?: any;
  fallback_error_message?: string;
}) {
  const url = POCKETBASE_API_URL + path;

  log("url:", url);

  const init: RequestInit = {
    method,
    ...(body ? { body: JSON.stringify(body) } : {}),
    headers: { ...headers, "Content-Type": "application/json" },
  };

  log("init:", init);

  const request = fetch(url, init).then((r) => r.json());

  return ResultAsync.fromPromise<T, Error>(
    request,
    () => new Error(fallback_error_message)
  );
}

type SignupResponse = {
  message?: string;
  accessToken: string;
  refreshToken: string;
};

type LoginResponse = {
  message?: string;
  accessToken: string;
  refreshToken: string;
};
