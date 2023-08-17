const priceData: IPrice[] = [
  {
    bgColor: "bg-[#FFCCC7]",
    title: "Free",
    price: "NT $ 0",
    features: [
      "10 boards can used",
      "1 workspace can enabled",
      "Team size is limit 10 people",
      "History saves 30 records",
    ],
    bottomColor: "bg-[#E2A39D]",
  },
  {
    bgColor: "bg-[#FF7875]",
    title: "Plus",
    price: "NT $ 350",
    features: [
      <span>
        Unlimited boards can used{" "}
        <span className="text-[#F5222D]">with some conditions</span>
      </span>,
      "10 workspace can enabled",
      "Team size is limit 30 people",
      "History saves 100 records",
    ],
    bottomColor: "bg-[#C25350]",
  },
  {
    bgColor: "bg-[#FF4D4F]",
    title: "Pro",
    price: "NT $ 2,400",
    features: [
      <span>
        All items are enabled
        <span className="text-[#F5222D]"> widthout restriction</span> for you
        whole team
      </span>,
    ],
    bottomColor: "bg-[#BE3536]",
  },
];

export default priceData;
