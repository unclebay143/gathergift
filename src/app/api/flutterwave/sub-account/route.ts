import { NextRequest, NextResponse } from "next/server";

const POST = async (request: NextRequest) => {
  try {
    const { account_name, email, mobilenumber, country } = await request.json();

    if (!account_name || !email || !mobilenumber || !country) {
      return NextResponse.json(
        { message: "One of the required data not provided" },
        { status: 400 }
      );
    }

    const json = await fetch(
      process.env.NEXT_PUBLIC_FLUTTER_WAVE_ENDPOINT_URL!,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_FLUTTER_WAVE_FLWSECK_TEST_KEY}`,
        },
        body: JSON.stringify({
          account_name,
          email: "test3@gmail.com", // flutterwave seems to want 1 email per sub-account
          mobilenumber,
          country,
        }),
      }
    );

    const res = await json.json();

    if (res.status !== "success") {
      return NextResponse.json(
        { message: "Something went wrong." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        account_reference: res.data.account_reference,
        barter_id: res.data.barter_id,
        message: "Sub-account Wallet created.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
};

export { POST };
