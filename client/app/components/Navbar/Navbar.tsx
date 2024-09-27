import { useAuth } from "@/hooks/useAuth";
import { Navbar } from "flowbite-react";
import { Loader2 } from "lucide-react";
import { FaSearch, FaPlus, FaBell } from "react-icons/fa";

export default function NavbarComponent({ title }: { title: string }) {
    const { loading, user } = useAuth();

    return loading ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="flex items-center justify-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        </div>
    ) : (
        <Navbar fluid rounded>
            <Navbar.Brand>
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    {title}
                </span>
            </Navbar.Brand>
            <div className="flex items-center">
                <div className="relative">
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Search"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaSearch className="h-5 w-5 text-gray-400" />
                    </div>
                </div>
                <button className="ml-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                    <FaPlus className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </button>
                <button className="ml-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                    <FaBell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </button>
                {user && (
                    <div className="ml-4 flex items-center">
                        <img
                            className="h-8 w-8 rounded-full"
                            src={user.profilePicture}
                            alt="User profile"
                        />
                        <div className="ml-2">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {user.firstName} {user.lastName}
                            </div>
                            <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                {user.roles?.name}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Navbar>
    );
}
