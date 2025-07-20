import React from "react";

const Featured = () => {
 
    return (
        <div className="w-full px-6 min-h-[800px]">
            <div className="flex items-center gap-2 mb-3">
                <div className="relative inline-block group cursor-pointer">
                    <div className="absolute top-0 left-0 h-full bg-red-500 rounded-sm transition-all duration-500 w-3 group-hover:w-full z-0"></div>
                    <h3 className="relative z-10 px-6 py-1 text-red-500 font-semibold transition-colors duration-500 group-hover:text-white">
                        Featured
                    </h3>
                </div>
            </div>

            <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
                <h2 className="text-3xl font-bold text-gray-800 whitespace-nowrap">
                    New Arrival
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Large Box */}
                <div className="relative overflow-hidden min-h-[550px] flex items-end bg-black">
                    <img src="public/PS5.png" alt="PlayStation 5" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-opacity-50" />
                    <div className="relative z-10 p-8 w-full">
                        <h2 className="text-2xl font-bold text-white mb-2">PlayStation 5</h2>
                        <p className="text-white text-sm">Black and White Version of PS5 <br /> coming out on asle</p>
                        <button className="mt-3 relative text-white px-1 py-2 group cursor-pointer">
                            Shop Now
                            <span className="absolute left-0 bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
                        </button>
                    </div>
                </div>

                {/* Right Section */}
                <div className="grid grid-rows-2 gap-4 h-full">
                    {/* Top Box */}
                    <div className="relative overflow-hidden min-h-[200px] flex items-end">
                        <img src="public/women.png" alt="Women's Collection" className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-opacity-50" />
                        <div className="relative z-10 p-7 w-full">
                            <h3 className="text-2xl font-semibold text-white">Women's Collection</h3>
                            <p className="text-sm text-white mt-1">Featured woman collections that <br /> give you another vibe.</p>
                            <button className="mt-2 relative text-white px-1 py-2 group cursor-pointer">
                                Shop Now
                                <span className="absolute left-0 bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
                            </button>
                        </div>
                    </div>

                    {/* Bottom Two Boxes */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Box 1 */}
                        <div className="relative bg-black overflow-hidden min-h-[150px] flex items-end group">
                            <img src="Public/e5659d572977438364a41d7e8c9d1e9a794d43ed.png" alt="Speakers"
                                className="absolute inset-0 w-full h-full object-contain scale-90 object-left" />
                            <div className="absolute inset-0 bg-opacity-50" />
                            <div className="relative z-10 p-7 w-full">
                                <h4 className="text-2xl font-medium text-white">Speakers</h4>
                                <p className="text-sm text-white mt-1">Amazon wireless speakers</p>
                                <button className="mt-1 relative text-white px-1 py-2 group cursor-pointer">
                                    Shop Now
                                    <span className="absolute left-0 bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
                                </button>
                            </div>
                        </div>

                        {/* Box 2 */}
                        <div className="relative bg-black overflow-hidden min-h-[150px] flex items-end group">
                            <img src="Public/15315cd15102562cf220504d288fa568eaa816dd.png" alt="Perfume"
                                className="absolute inset-0 w-full h-full object-contain scale-90 object-left" />
                            <div className="absolute inset-0 bg-opacity-50" />
                            <div className="relative z-10 p-7 w-full">
                                <h4 className="text-2xl font-medium text-white">Perfume</h4>
                                <p className="text-sm text-white mt-1">Gucci intense oud EDP</p>
                                <button className="mt-1 relative text-white px-1 py-2 group cursor-pointer">
                                    Shop Now
                                    <span className="absolute left-0 bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Featured;
