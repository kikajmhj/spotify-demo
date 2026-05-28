import { useSyncExternalStore } from "react";
import {
  getAccessToken,
  subscribeToTokenChanges,
} from "../utils/tokenStorage";

const getSnapshot = (): string | undefined => getAccessToken() ?? undefined;
const getServerSnapshot = (): string | undefined => undefined;

const useAccessToken = (): string | undefined =>
  useSyncExternalStore(subscribeToTokenChanges, getSnapshot, getServerSnapshot);

export default useAccessToken;
