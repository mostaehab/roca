import FileUpload from "./FileUpload";

const Form = ({ onSubmitForm }) => {
  return (
    <main>
      <div className="container max-w-[90%] mx-auto py-[50px]">
        <h3 className="text-[24px]">Fill in required fields</h3>
        <span className="text-[#959595]">
          Enter your personal and company information.
        </span>
        <form
          className="mt-[50px] flex flex-wrap justify-between"
          onSubmit={onSubmitForm}
        >
          <div className="w-[100%] lg:w-[calc(50%-10px)] mb-[40px]">
            <label htmlFor="name">
              <p className="text-[18px]">
                Name*
                <span className="inline-block text-center w-[25px] h-[25px] bg-[#B18F13] text-white rounded-full">
                  1
                </span>
              </p>
              <span className="text-[#959595]">
                Fill in this field with your personal name
              </span>
            </label>
            <input
              className="bg-[#F8F8F8] block mt-[10px] rounded-2xl border-2 border-[#DADADA] px-[20px] py-[20px] w-full"
              type="text"
              placeholder="Name"
              name="name"
              id="name"
              required
            ></input>
          </div>
          <div className="w-[100%] lg:w-[calc(50%-10px)] mb-[40px]">
            <label htmlFor="address">
              <p className="text-[18px]">
                Address*
                <span className="inline-block text-center w-[25px] h-[25px] bg-[#B18F13] text-white rounded-full">
                  2
                </span>
              </p>
              <span className="text-[#959595]">
                Fill in this field with your address
              </span>
            </label>
            <input
              className="bg-[#F8F8F8] block mt-[10px] rounded-2xl border-2 border-[#DADADA] px-[20px] py-[20px] w-full"
              type="text"
              placeholder="Address"
              name="address"
              id="address"
              required
            ></input>
          </div>
          <div className="w-[100%] lg:w-[calc(50%-10px)] mb-[60px]">
            <label htmlFor="companyName">
              <p className="text-[18px]">
                Company's Name*
                <span className="inline-block text-center w-[25px] h-[25px] bg-[#B18F13] text-white rounded-full">
                  3
                </span>
              </p>
              <span className="text-[#959595]">
                Fill in this field with your company&rsquo;s name
              </span>
            </label>
            <input
              className="bg-[#F8F8F8] block mt-[10px] rounded-2xl border-2 border-[#DADADA] px-[20px] py-[20px] w-full"
              type="text"
              placeholder="Company's Name"
              name="companyName"
              id="companyName"
              required
            ></input>
          </div>
          <div className="w-[100%] lg:w-[calc(50%-10px)] mb-[60px]">
            <label htmlFor="companyNumber">
              <p className="text-[18px]">
                Company's Number*
                <span className="inline-block text-center w-[25px] h-[25px] bg-[#B18F13] text-white rounded-full">
                  4
                </span>
              </p>
              <span className="text-[#959595]">
                Fill in this field with company's number
              </span>
            </label>
            <input
              className="bg-[#F8F8F8] block mt-[10px] rounded-2xl border-2 border-[#DADADA] px-[20px] py-[20px] w-full"
              type="text"
              placeholder="Company's Number"
              name="companyNumber"
              id="companyNumber"
              required
            ></input>
          </div>
          <hr className="flex-none block w-full"></hr>

          <div className="my-[60px]">
            <h3 className="text-[24px]">Upload Files</h3>
            <span className="text-[#959595]">
              Upload your financial documents for submission.
            </span>
          </div>

          <div className="w-full flex flex-col lg:flex-row mb-20">
            <div className="w-[100%] lg:w-[calc(50%-10px)]">
              <p className="text-[20px] mb-[20px]">Finance Agreements</p>
              <span className="text-[#A6A6A6] block w-[100%] mb-5 lg:w-[70%]">
                Upload your any documentations to be viewed for your accounts.
                Example: Morgage Agreements, HP Agreements...etc
              </span>
            </div>

            <div className="flex flex-col w-[100%] lg:w-[calc(50%-10px)]">
              <FileUpload></FileUpload>
            </div>
          </div>

          <div className="w-full flex flex-col lg:flex-row mb-20">
            <div className="w-[100%] lg:w-[calc(50%-10px)]">
              <p className="text-[20px] mb-[20px]">Bank Statment</p>
              <span className="text-[#A6A6A6] block w-[100%] mb-5 lg:w-[70%]">
                Upload your company's bank statements. Bank statements show your
                financial transactions, including deposits, withdrawals, and
                balances. They are important for verifying your financial
                activities and maintaining accurate records
              </span>
            </div>

            <div className="flex flex-col w-[100%] lg:w-[calc(50%-10px)]">
              <FileUpload></FileUpload>
            </div>
          </div>

          <div className="w-full flex flex-col lg:flex-row mb-20">
            <div className="w-[100%] lg:w-[calc(50%-10px)]">
              <p className="text-[20px] mb-[20px]">Receipts</p>
              <span className="text-[#A6A6A6] block w-[100%] mb-5 lg:w-[70%]">
                Provide your receipts for various expenses. Receipts are proof
                of your business expenditures and are necessary for accounting
                and tax purposes. They help in tracking spending and verifying
                expense claims.
              </span>
            </div>

            <div className="flex flex-col w-[100%] lg:w-[calc(50%-10px)]">
              <FileUpload></FileUpload>
            </div>
          </div>

          <div>
            <input
              type="submit"
              value="Send"
              className="cursor-pointer bg-[#B18F13] py-[15px] px-[40px] rounded-full text-white mt-[20px]"
            ></input>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Form;
