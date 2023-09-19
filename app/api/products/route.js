import prisma from "@/utils/prisma";

export async function GET(req) {
  try {
    // get page and lastCursor from query
    const url = new URL(req.url);

    const take = url.searchParams.get("take");
    const lastCursor = url.searchParams.get("lastCursor");

    let result = await prisma.product.findMany({
      take: take ? parseInt(take) : 10,
      ...(lastCursor && {
        skip: 1, // Do not include the cursor itself in the query result.
        cursor: {
          id: lastCursor,
        },
      }),
      orderBy: {
        name: "desc",
      },
    });

    if (result.length == 0) {
      return Response.json(
        {
          data: [],
          metaData: {
            lastCursor: null,
            hasNextPage: false,
          },
        },
        { status: 200 }
      );
    }

    const lastPostInResults = result[result.length - 1];
    const cursor = lastPostInResults.id;

    const nextPage = await prisma.product.findMany({
      // Same as before, limit the number of events returned by this query.
      take: take ? parseInt(take) : 7,
      skip: 1, // Do not include the cursor itself in the query result.
      cursor: {
        id: cursor,
      },
    });

    const data = {
      data: result,
      metaData: {
        lastCursor: cursor,
        hasNextPage: nextPage.length > 0,
      },
    };

    return Response.json(data, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 403 });
  }
}
