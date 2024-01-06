import { Loading } from "#components";
// import { cx } from "#utils";
import { useState } from "react";
import { Auth } from "#contexts/AuthProvider";
import useData from "#hook/useData";

export default function User() {
    // const [getDatas, setGetDatas] = useState([]);
    const { isUser } = Auth();
    const [path, setPath] = useState(() => {
        if (isUser.isFB) return "facebook";
        if (isUser.isGg) return "google";
        if (isUser.isLine) return "line";
        if (isUser.isEmail) return "email";
    });

    const [data, loadung, refetch] = useData({
        url: `/user/user/${path}`,
        method: "GET",
    });

    return (
        <div className='animate-zoomIn'>
            <div className='max-w-sm  rounded-lg  border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800'>
                {loadung && <Loading />}

                <div className='flex justify-end px-4 pt-4'>
                    <button
                        id='dropdownButton'
                        data-dropdown-toggle='dropdown'
                        className='inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5'
                        type='button'
                    >
                        <span className='sr-only'>Open dropdown</span>
                        <svg
                            className='w-5 h-5'
                            aria-hidden='true'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='currentColor'
                            viewBox='0 0 16 3'
                        >
                            <path d='M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z' />
                        </svg>
                    </button>
                    <div
                        id='dropdown'
                        className='z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700'
                    >
                        <ul className='py-2' aria-labelledby='dropdownButton'>
                            <li>
                                <a
                                    href='#'
                                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                                >
                                    Edit
                                </a>
                            </li>
                            <li>
                                <a
                                    href='#'
                                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                                >
                                    Export Data
                                </a>
                            </li>
                            <li>
                                <a
                                    href='#'
                                    className='block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                                >
                                    Delete
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='flex flex-col overflow-hidden px-3 pb-10'>
                    {data?.img && (
                        <img
                            src={data?.img}
                            alt=''
                            className='mx-auto max-w-20 rounded-full shadow-xl'
                        />
                    )}
                    <h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>
                        {data?.username}
                    </h5>
                    {data &&
                        Object.values(data).map((item, idx) => (
                            <div key={idx} className='flex w-full flex-wrap'>
                                <span className='text-base text-gray-600 dark:text-gray-400'>
                                    {Object.keys(data)[idx]}: &nbsp;
                                </span>
                                <span className='text-sm text-gray-500 dark:text-gray-300'>
                                    {item} &nbsp;
                                </span>
                            </div>
                        ))}
                    <div className='mt-4 flex md:mt-6'>
                        <a
                            href='#'
                            className='inline-flex items-center rounded-lg bg-blue-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                        >
                            Add friend
                        </a>
                        <button
                            onClick={() => refetch()}
                            className='ms-3 inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700'
                        >
                            Refetch
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
