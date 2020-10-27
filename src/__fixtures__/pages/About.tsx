import React, { memo, useMemo } from "react"
import { Helmet } from "react-helmet"


function AboutUs() {

    // memoized values
    const members = useMemo(() => {
        return [
            {
                path: "/static/image/co.png",
                name: "Phạm Thị Huyền",
                career: "Giáo viên truờng THPT Cộng Hiền, Vĩnh Bảo, Hải Phòng",
                role: "Cố vấn về các phuơng pháp vẽ biểu đồ"
            },
            {
                path: "/static/image/phuc.JPG",
                name: "Nguyễn Văn Phúc",
                career: "Học sinh lớp 11b4, truờng THPT Nguyễn Bỉnh Khiêm, Vĩnh Bảo, Hải Phòng",
                role: "Lên ý tuởng dự án, tham gia thiết kế và phát triển"
            },
            {
                path: "/static/image/huyen.JPG",
                name: "Đỗ Thuý Huyền",
                career: "Học sinh lớp 10c1, truờng THPT Nguyễn Bỉnh Khiêm, Vĩnh Bảo, Hải Phòng",
                role: "Thành viên phát triển dự án"
            },
            {
                path: "/static/image/ngoc.JPG",
                name: "Bùi Minh Ngọc",
                career: "Học sinh lớp 10c1, truờng THPT Nguyễn Bỉnh Khiêm, Vĩnh Bảo, Hải Phòng",
                role: "Thành viên phát triển dự án"
            },
            {
                path: "/static/image/son.jpg",
                name: "Lê Văn Sơn",
                career: "Cựu học sinh truờng THPT Nguyễn Bỉnh Khiêm, Vĩnh Bảo, Hải Phòng",
                role: "Thành viên phát triển dự án"
            }
        ]
    }, [])

    return (
        <div className="w-full px-20">
            <Helmet>
                <title>
                    About Us
                </title>
            </Helmet>
            <div className="flex items-center text-gray-600 text-lg h-screen"
                style={{
                    fontFamily: `'Lobster', sans-serif`,
                }}
            >
                <div className="border-gray-400 border-l-4 border-solid py-6 px-16">
                    <p className="text-xl text-red-400">
                        Lời cảm ơn
                    </p>
                    <br />
                    <p>
                        Dự án này, có lẽ sẽ không đến được với các thầy cô, các bạn học sinh của Tổ Quốc Việt Nam nếu như không có sự đóng góp của các thành viên dự án. Cảm ơn sự đóng góp của các bạn, cũng như sự ủng hộ của cộng đồng các bạn trẻ trên toàn thể lãnh thổ đất nước và cả hai mẹ con chị Janet Wang, bạn Tommy đến từ Trung Quốc về bản dịch tiếng Trung. Mong rằng Schart sẽ sẽ đem tới những niềm vui mới cho các bạn trong những tiết học địa lý tới đây.
                    </p>
                    <br />
                    <p className="text-sm">
                        Nhóm phát triển
                    </p>
                </div>
            </div>
            <div className="flex justify-center flex-wrap">
                {members.map((item, idx) => {
                    const info = [
                        { label: "Tên", val: item.name },
                        { label: "Nơi công tác", val: item.career },
                        { label: "Vai trò", val: item.role },
                    ]
                    return (
                        <div key={idx}
                            className="p-4 w-1/2 sm:w-full"
                        >
                            <div className="rounded-md bg-white p-8 flex items-center flex-no-wrap sm:flex-wrap sm:justify-center text-gray-700">
                                <div className="rounded-full w-32 h-32 overflow-hidden flex-grow-0 flex-shrink-0 mr-4 mb-4">
                                    <img src={item.path} alt="member" className="w-full h-full" />
                                </div>
                                <div className="sm:w-full">
                                    {info.map(inf => (
                                        <div className="flex mb-1">
                                            <span className="text-xs mr-2 w-1/4">{inf.label}</span>
                                            <span className="w-3/4">{inf.val}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default memo(AboutUs)
