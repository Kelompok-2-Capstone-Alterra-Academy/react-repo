export default function Sidebar() {
	return (
		<div>
			<div className="flex">
				<div className="w-52 bg-[#4161FF] h-screen text-center">
					<div className="p-4 mt-6 text-white">
						<h2 className="text-base text">Star<span className="italic font-bold">MyDashboard</span></h2>
					</div>
					<nav className="p-2">
						<ul>
							<li className="py-2 text-sm">
								<a href="#" className=" rounded-md py-2 text-white hover:bg-blue-800 hover:text-white flex  px-6  gap-2">
									<img src="/icon/icon-sidebar2.svg" alt="" /> <p> Chat </p>
								</a>
							</li>
							<li className="py-2 text-sm">
								<a href="#" className=" rounded-md py-2 text-white hover:bg-blue-800 hover:text-white flex px-6 gap-2">
									<img src="/icon/icon-sidebar.svg" alt="" /> <p> Pelanggan </p>
								</a>
							</li>
							<li className="py-2 text-sm">
								<a href="#" className=" rounded-md py-2 text-white hover:bg-blue-800 hover:text-white flex  px-6  gap-2">
									<img src="/icon/icon-sidebar3.svg" alt="" /> <p> Pembelajaran </p>
								</a>
							</li>
							<li className="py-2 text-sm px-4">
								<select className=" rounded-md py-2 bg-white flex w-full px-2 justify-center">
									<option>Kursus Saya</option>
								</select>
							</li>
							<li className="py-2 text-sm px-4">
								<a href="#" className=" rounded-md py-2 text-white border hover:text-white flex justify-center gap-2">
									<img src="/icon/icon-logout.svg" alt="" /> <p> Keluar </p>
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</div>

		</div>
	);
}
