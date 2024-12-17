import connectMongoose from "@/lib/mongodb";
import { User } from "@/model/users";
import { Wish } from "@/model/wish";
import type { Wish as WishType, Wishes } from "@/types";
import mongoose from "mongoose";

export const getPublicWishes = async () => {
  let wishes;
  try {
    await connectMongoose();

    wishes = await Wish.aggregate([
      { $match: { visibility: "PUBLIC", isArchived: false } },
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

export const getPublicWish = async (username: string, id: string) => {
  try {
    if (!username || !id) return null;

    await connectMongoose();

    const user = await User.findOne({ username });

    if (!user) return null;

    const result = await Wish.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
          owner: new mongoose.Types.ObjectId(user._id),
          visibility: "PUBLIC",
          isArchived: false,
        },
      },
      {
        $lookup: {
          from: "wishitems",
          localField: "_id",
          foreignField: "wish",
          as: "items",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "owner",
          foreignField: "_id",
          as: "owner",
          pipeline: [
            {
              $project: {
                _id: 1,
                photo: 1,
                firstName: 1,
                lastName: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: {
          path: "$owner",
        },
      },
      {
        $unwind: {
          path: "$items",
        },
      },
      {
        $lookup: {
          from: "contributor",
          let: { itemsIds: "$items._id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$wishItem", "$$itemsIds"] } } },
            {
              $group: {
                _id: null,
                contributed_amount: { $sum: "$amount" },
              },
            },
          ],
          as: "contributed_amount_data",
        },
      },
      {
        $addFields: {
          "items.contributed_amount": {
            $ifNull: [
              {
                $arrayElemAt: [
                  "$contributed_amount_data.contributed_amount",
                  0,
                ],
              },
              0,
            ],
          },
        },
      },

      {
        $group: {
          _id: "$_id",
          owner: { $first: "$owner" },
          items: { $push: "$items" },
          title: { $first: "$title" },
          visibility: { $first: "$visibility" },
          isArchived: { $first: "$isArchived" },
          currency: { $first: "$currency" },
          target_amount: { $first: "$target_amount" },
        },
      },
      {
        $lookup: {
          from: "contributor",
          let: { itemsIds: "$items._id" },
          pipeline: [
            { $match: { $expr: { $in: ["$wishItem", "$$itemsIds"] } } },
            {
              $group: {
                _id: null,
                total_contributed_amount: { $sum: "$amount" },
              },
            },
          ],
          as: "total_contributed_amount_data",
        },
      },

      {
        $addFields: {
          total_contributed_amount: {
            $ifNull: [
              {
                $arrayElemAt: [
                  "$total_contributed_amount_data.total_contributed_amount",
                  0,
                ],
              },
              0,
            ],
          },
        },
      },

      {
        $project: {
          _id: 1,
          title: 1,
          items: 1,
          owner: 1,
          currency: 1,
          total_contributed_amount: 1,
          visibility: 1,
          isArchived: 1,
          target_amount: 1,
        },
      },
    ]);

    if (result.length === 0) {
      return null;
    }

    const wish = result[0];

    return JSON.parse(JSON.stringify(wish)) as WishType;
  } catch (error) {
    console.log(error);
    return null;
  }
};
