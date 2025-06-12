import { useEffect, useRef, useState } from "react";
import { RiAccountCircleFill } from "react-icons/ri";
import { Link } from "react-router";

const AccountMenu = () => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // 给 e 标注 DOM 的 MouseEvent 类型
        const onClickOutside = (e: MouseEvent) => {
            // e.target 是 EventTarget，要断言成 Node
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", onClickOutside);
        return () => {
            document.removeEventListener("mousedown", onClickOutside);
        };
    }, []);
    return (
        <div className="relative" ref={ref}>
            {/* 这里改成 button 更语义化 */}
            <button
                onClick={() => setOpen((v) => !v)}
                className="sm:hidden flex items-center rounded-full hover:bg-bookingtexthover cursor-pointer px-2 py-1"
            >
                <RiAccountCircleFill size={20} className="text-white" />
            </button>

            {open && (
                <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-md shadow-lg overflow-hidden z-10">
                    <Link
                        to="/my-bookings"
                        className="block px-4 py-2 active:bg-gray-100 focus:bg-gray-100 "
                        onClick={() => setOpen(false)}
                    >
                        My Booking
                    </Link>
                    <Link
                        to="/my-hotels"
                        className="block px-4 py-2 active:bg-gray-100 focus:bg-gray-100"
                        onClick={() => setOpen(false)}
                    >
                        My Hotel
                    </Link>
                    {/* 按需继续添加 */}
                </div>
            )}
        </div>
    );
};

export default AccountMenu;
