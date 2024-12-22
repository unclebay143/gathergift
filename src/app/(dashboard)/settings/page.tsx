export const dynamic = "force-dynamic";

import React from "react";
import { SettingsDashboard } from "./settings";
import { getCurrentUser } from "@/service/users/user.server";

const Page = async () => {
  const currentUser = await getCurrentUser();
  return <SettingsDashboard initialData={currentUser} />;
};

export default Page;
