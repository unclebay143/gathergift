import * as React from "react";
import { CreateUpdateWish } from "./CreateUpdateWish";

export default async function CreateUpdateWishPage({
  params,
}: {
  params: Promise<{ action: string }>;
}) {
  const action = (await params).action;

  return (
    <div className='relative container mx-auto px-4 py-8 min-h-[90vh] flex justify-between flex-col'>
      <CreateUpdateWish action={action} />
    </div>
  );
}
