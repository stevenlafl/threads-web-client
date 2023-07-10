import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import PostForm from "./PostForm";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Threads - Web Client",
  description: "A Next.JS desktop web client for Meta's Instagram Threads",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const tokenCookie = cookieStore.get("token");
  const usernameCookie = cookieStore.get("username");

  if (tokenCookie) {
    const profileURL = `https://threads.net/@${usernameCookie!.value}`;

    return (
      <html lang="en">
        <body
          className={
            inter.className + "flex items-center justify-center bg-[#101010]"
          }
        >
          <div>
            <div className="flex">
              <div className="w-1/5 text-white pl-32 py-4 h-1/3 mr-32">
                {/* <!--left menu--> */}
                <svg
                  viewBox="0 0 192 192"
                  className="h-12 w-12 text-white"
                  fill="currentColor"
                >
                  <g>
                    <path
                      className="x19hqcy"
                      d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z"
                    ></path>
                  </g>
                </svg>
                <nav className="mt-5 px-2">
                  <a
                    href="/"
                    className="group flex items-center px-2 py-2 text-base leading-6 font-semibold rounded-full bg-[#343638] text-gray-300"
                  >
                    <svg
                      className="mr-4 h-6 w-6 "
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10M9 21h6"
                      />
                    </svg>
                    Home
                  </a>
                  <a
                    href="#"
                    className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-[#343638] hover:text-gray-300"
                  >
                    <svg
                      className="mr-4 h-6 w-6"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                    </svg>
                    Notifications
                  </a>
                  <a
                    href="#"
                    className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-[#343638] hover:text-gray-300"
                  >
                    <svg
                      className="mr-4 h-6 w-6"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    Profile
                  </a>
                  <a
                    href="#"
                    className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-[#343638] hover:text-gray-300"
                  >
                    <svg
                      className="mr-4 h-6 w-6"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    More
                  </a>
                  <button className="bg-[#343638] w-48 mt-5 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full">
                    Post
                  </button>
                </nav>
                <div className="flex-shrink-0 flex hover:bg-gray-00 rounded-full p-4 mt-12 mr-2">
                  <a href="#" className="flex-shrink-0 group block">
                    <div className="flex items-center">
                      {/* <div> */}
                      {/* <img className="inline-block h-10 w-10 rounded-full" src="" alt="" /> */}
                      {/* </div> */}
                      <div className="ml-3">
                        <p className="text-base leading-6 font-medium text-white"></p>
                        <p className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                          <Link href={profileURL} target="_blank">
                            @{usernameCookie!.value}
                          </Link>
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              <div className="w-3/5 border border-[#343638] h-auto  border-t-0">
                <div className="flex">
                  <div className="flex-1 m-2">
                    <h2 className="px-4 py-2 text-xl font-semibold text-white">
                      Home
                    </h2>
                  </div>
                  <div className="flex-1 px-4 py-2 m-2">
                    <a
                      href=""
                      className=" text-2xl font-medium rounded-full text-white hover:bg-[#343638] hover:text-gray-300 float-right"
                      target="_blank"
                    >
                      <svg
                        className="m-2 h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        /*style="--darkreader-inline-fill: currentColor;"*/ data-darkreader-inline-fill=""
                      >
                        <g>
                          <path d="M22.772 10.506l-5.618-2.192-2.16-6.5c-.102-.307-.39-.514-.712-.514s-.61.207-.712.513l-2.16 6.5-5.62 2.192c-.287.112-.477.39-.477.7s.19.585.478.698l5.62 2.192 2.16 6.5c.102.306.39.513.712.513s.61-.207.712-.513l2.16-6.5 5.62-2.192c.287-.112.477-.39.477-.7s-.19-.585-.478-.697zm-6.49 2.32c-.208.08-.37.25-.44.46l-1.56 4.695-1.56-4.693c-.07-.21-.23-.38-.438-.462l-4.155-1.62 4.154-1.622c.208-.08.37-.25.44-.462l1.56-4.693 1.56 4.694c.07.212.23.382.438.463l4.155 1.62-4.155 1.622zM6.663 3.812h-1.88V2.05c0-.414-.337-.75-.75-.75s-.75.336-.75.75v1.762H1.5c-.414 0-.75.336-.75.75s.336.75.75.75h1.782v1.762c0 .414.336.75.75.75s.75-.336.75-.75V5.312h1.88c.415 0 .75-.336.75-.75s-.335-.75-.75-.75zm2.535 15.622h-1.1v-1.016c0-.414-.335-.75-.75-.75s-.75.336-.75.75v1.016H5.57c-.414 0-.75.336-.75.75s.336.75.75.75H6.6v1.016c0 .414.335.75.75.75s.75-.336.75-.75v-1.016h1.098c.414 0 .75-.336.75-.75s-.336-.75-.75-.75z"></path>
                        </g>
                      </svg>
                    </a>
                  </div>
                </div>
                <hr className="border-bg-[#343638]" />
                {children}
              </div>
              <div className="w-2/5 h-12 ml-10">
                {/* <!--right menu--> */}
                <div className="relative text-gray-300 w-80 p-5 pb-0 mr-16">
                  <button type="submit" className="absolute ml-4 mt-3 mr-4">
                    <svg
                      className="h-4 w-4 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      version="1.1"
                      id="Capa_1"
                      x="0px"
                      y="0px"
                      viewBox="0 0 56.966 56.966"
                      /*style="enable-background:new 0 0 56.966 56.966;"*/ xmlSpace="preserve"
                      width="512px"
                      height="512px"
                    >
                      <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                    </svg>
                  </button>
                  <input
                    type="search"
                    name="search"
                    placeholder="Search Threads"
                    className="bg-[#343638] h-10 px-10 pr-5 w-full rounded-full text-sm focus:outline-none bg-purple-white shadow border-0"
                  />
                </div>

                {/* <!--third-people suggetion to follow section--> */}
                <div className="max-w-sm rounded-lg bg-[#343638] overflow-hidden shadow-lg m-4 mr-20">
                  <div className="flex">
                    <div className="flex-1 m-2">
                      <h2 className="px-4 py-2 text-xl w-48 font-semibold text-white">
                        Who to follow
                      </h2>
                    </div>
                  </div>

                  <hr className="border-bg-[#343638]" />

                  {/* <!--first person who to follow-->  */}
                  {/* <div className="flex flex-shrink-0">
                      <div className="flex-1 ">
                          <div className="flex items-center w-48">
                            <div>
                                <img className="inline-block h-10 w-auto rounded-full ml-4 mt-2" src="https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png" alt="" />
                            </div>
                            <div className="ml-3 mt-3">
                                <p className="text-base leading-6 font-medium text-white">
                                  Sonali Hirave
                                </p>
                                <p className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                                  @ShonaDesign
                                </p>
                            </div>
                          </div>
                      </div>
                      <div className="flex-1 px-4 py-2 m-2">
                          <a href="" className=" float-right">
                          <button className="bg-transparent hover:bg-gray-500 text-white font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded-full">
                          Follow
                          </button>  
                          </a>
                      </div>
                    </div>
                    <hr className="border-gray-600" /> */}

                  <div className="flex">
                    <div className="flex-1 p-4">
                      <h2 className="px-4 ml-2 w-48 font-bold text-gray-400">
                        Show more
                      </h2>
                    </div>
                  </div>
                </div>

                <div className="flow-root m-6 inline">
                  <div className="flex-2">
                    <p className="text-sm leading-6 font-medium text-gray-600">
                      Threads
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    );
  } else {
    return (
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    );
  }
}
