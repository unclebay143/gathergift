import connectMongoose from "@/lib/mongodb";
import { Wish } from "@/model/wish";
import type { Wishes } from "@/types";

export const getPublicWishes = async () => {
  let wishes;
  try {
    await connectMongoose();

    wishes = await Wish.aggregate([
      { $match: { visibility: "PUBLIC" } },
      {
        $lookup: {
          from: "wishitems",
          localField: "_id",
          foreignField: "wish",
          as: "items",
        },
      },
    ]);
  } catch (error) {
    console.log(error);
    return [];
  }

  return JSON.parse(JSON.stringify(wishes)) as Wishes;
};
