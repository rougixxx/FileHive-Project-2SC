const PricingSectino = () => {
  return (
    <section className="container mx-auto    py-8 flex flex-col justify-center items-center">
      <div className="bg-background h-[80vh] w-full pt-24">
        <h2 className="text-6xl font-bold text-blackText text-center">
          Simple. <span className="text-primary">Fair pricing</span>.
        </h2>
        <p className="text-blackText pt-2 text-center">
          Pay for what you use. There is no minimum charge. Always know what
          you&apos;ll pay.
        </p>
      </div>
      <div className="flex justify-center items-center -mt-[40vh]">
        <div className="flex flex-col items-center justify-center bg-white rounded-3xl  shadow-custom p-6">
          <div className="text-blackText text-2xl font-bold py-12 text-center">
            Storage
          </div>
          <p className="text-blueText w-[80%] text-center pb-8">
            Access a complete decentralized storage with simple, pay-as-you-go
            pricing
          </p>
          <span className="text-blackText font-bold text-5xl pb-2 text-center">
            $0.008
          </span>
          <p className="text-blackText font-bold text-xl pb-8 text-center">
            per GB/month
          </p>
          <button className="mb-8 w-[28rem] text-sm bg-primary border-[2px] border-primary text-white rounded-[12px]  px-6 py-[12px] hover:opacity-50 transition-opacity duration-500">
            Get started in minutes
          </button>
          <ul className="flex flex-col gap-2 text-blueText pb-8 text-center">
            <li>Everything you need to storage & share files</li>
            <li>No fees for API requests or data retrievals</li>
            <li>No setup fees, monthly fees, or hidden fees</li>
          </ul>
        </div>
        <div className="w-[40%] flex flex-col items-start rounded-r-3xl justify-center bg-primary pl-24 p-4">
          <div className="text-white text-2xl font-bold py-8">Transfer</div>
          <p className="text-white w-[80%] text-start pb-8">
            Pay only for what you use. There is no minimum charge. You pay for
            all bandwidth into and out of Deupload.
          </p>
          <div className="bg-white rounded-3xl text-primary px-4 py-1 font-semibold text-sm mb-4">
            Inbound
          </div>
          <p className="text-white font-bold text-5xl pb-2">
            $0.006{" "}
            <span className="text-white font-bold text-xl pb-8"> GB/month</span>
          </p>
          <div className="bg-white rounded-3xl text-green-500 px-4 py-1 font-semibold text-sm mt-8 mb-4">
            Outbound
          </div>

          <p className="text-white font-bold text-5xl pb-8">
            $0.006{" "}
            <span className="text-white font-bold text-xl pb-8"> GB/month</span>
          </p>
        </div>
      </div>
      <p className="text-lg text-blueText text-center w-[60%] pt-24 pb-6">
        Never pay for unused storage again. Never pay expensive seats for team
        member again. Only pay for what you use. Don&apos;t get stalled by
        contracts, capacity planning, or price modeling.
      </p>
      <div className="space-x-8 font-semibold">
        <button className="text-sm bg-primary border-[2px] border-primary text-white rounded-[12px]  px-6 py-[10px] hover:opacity-50 transition-opacity duration-500">
          Pricing calculator
        </button>
        <button className="text-sm text-blackText border-[2px] rounded-[12px] border-blackText px-6 py-[10px] hover:bg-blackText hover:text-white transition-all duration-500">
          Comparision
        </button>
      </div>
    </section>
  );
};

export default PricingSectino;
