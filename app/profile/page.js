import { getServerSession } from "next-auth/next";
import Image from "next/image";
import { redirect } from "next/navigation";
import prisma from "@/utils/prismaClient";

import { authOption } from "@/app/api/auth/[...nextauth]/route";

const getSessionData = async () => {
  let session = await getServerSession(authOption);
  if (!session) {
    redirect("/");
    return;
  }
  return session;
};

let fetchUser = async (id) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      name: true,
      email: true,
      address: true,
      id: true,
      image: true,
    },
  });
};

const Profile = async () => {
  const data = await getSessionData();
  let user = await fetchUser(data.user.id);

  return (
    <section className="bg-gradient-to-r from-indigo-200 from-10% via-sky-200 via-30% to-indigo-200 to-90%">
      <div className="container mx-auto px-4 py-16 bg-blueGray-200">
        <div className="flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg ">
          <div className="px-6">
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-3/12 px-4">
                <div className="">
                  <Image
                    alt={`${data?.user.image}`}
                    width={120}
                    height={120}
                    src={data?.user.image}
                    className="shadow-xl rounded-full h-auto align-middle border-none  -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                <div className=" mt-32 sm:mt-0">
                  <button
                    className="bg-gradient-to-b from-gray-700 to-blue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs py-1 px-3 rounded-2xl outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    <a href="https://github.com/Mursalin80">
                      <Image
                        src="/github.svg"
                        alt="git Logo"
                        className="dark:invert"
                        width={30}
                        height={15}
                        priority
                      />
                    </a>
                  </button>
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4 lg:order-1">
                <div className="flex justify-center py-4 lg:pt-4 pt-8">
                  <div className="mr-4 p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                      22
                    </span>
                    <span className="text-sm text-blueGray-400">Friends</span>
                  </div>
                  <div className="mr-4 p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                      10
                    </span>
                    <span className="text-sm text-blueGray-400">Photos</span>
                  </div>
                  <div className="lg:mr-4 p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                      89
                    </span>
                    <span className="text-sm text-blueGray-400">Comments</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-12">
              <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2">
                {data.user.name}
              </h3>
              <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                Pakistan , Sargodha
              </div>
              <div className="mb-2 text-blueGray-600 mt-10">
                <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                Web Developer
              </div>
              <div className="mb-2 text-blueGray-600">
                <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                {data?.user.email}
                <pre>{JSON.stringify(...user.address, null, 2)}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className=" bg-blueGray-200 pt-8 pb-6 mt-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-6/12 px-4 mx-auto text-center">
              <div className="text-sm text-blueGray-500 font-semibold py-1">
                Made with{" "}
                <a
                  href="https://www.creative-tim.com/product/notus-js"
                  className="text-blueGray-500 hover:text-gray-800"
                  target="_blank"
                >
                  @
                </a>{" "}
                by{" "}
                <a
                  href="https://www.creative-tim.com"
                  className="text-blueGray-500 hover:text-blueGray-800"
                  target="_blank"
                >
                  {" "}
                  Creative Tim
                </a>
                .
              </div>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Profile;
