import Link from "next/link";

export default function Navbar(props: any) {
  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-start sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <a
                  href="#"
                  className="text-white font-bold text-xl tracking-wide"
                >
                  CheckLoggers
                </a>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {props.isLoggedIn ? (
                <Link
                  href="/api/logout"
                  className="text-white outline outline-blue-500 py-2 px-4 relative rounded-md p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  Logout
                </Link>
              ) : (
                <div>
                  <Link
                    href="#"
                    className="text-white bg-blue-500 py-2 px-4 relative rounded-md p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    onClick={() => {
                      props.handleLoginOrRegister(true);
                    }}
                  >
                    Login
                  </Link>
                  <Link
                    href="#"
                    className="ml-3 text-white bg-blue-500 py-2 px-4 relative rounded-md p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    onClick={() => {
                      props.handleLoginOrRegister(false);
                    }}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
