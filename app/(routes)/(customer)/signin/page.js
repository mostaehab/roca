import Header from "@/components/Header";
const page = () => {
  return (
    <div>
      <Header subtitle="Sign In"></Header>
      <div className="container mx-auto flex flex-col justify-center items-center">
        <div className="w-[50%] my-[180px]">
          <form>
            <div className="mb-7">
              <label for="username">
                <p className="text-[18px]">
                  Name*
                  <span className="inline-block text-center w-[25px] h-[25px] bg-[#B18F13] text-white rounded-full">
                    1
                  </span>
                </p>
              </label>
              <input
                className="bg-[#F8F8F8] block mt-[10px] rounded-2xl border-2 border-[#DADADA] px-[20px] py-[20px] w-full"
                type="text"
                placeholder="Name"
                name="username"
                id="username"
                required
              ></input>
            </div>

            <div className="mb-7">
              <label for="password">
                <p className="text-[18px]">
                  Password*
                  <span className="inline-block text-center w-[25px] h-[25px] bg-[#B18F13] text-white rounded-full">
                    2
                  </span>
                </p>
              </label>
              <input
                className="bg-[#F8F8F8] block mt-[10px] rounded-2xl border-2 border-[#DADADA] px-[20px] py-[20px] w-full"
                type="password"
                placeholder="Password"
                name="password"
                id="password"
                required
              ></input>
            </div>

            <input
              type="submit"
              value="Sign In"
              className="cursor-pointer bg-[#B18F13] py-[15px] px-[40px] rounded-full text-white mt-[20px]"
            ></input>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
