

export interface INotification{
    id: string;
    header: string;
    description: string;
    time: string;
    type: "request" | "won" | "lost" |"Dispute" | "deposit" | "withdraw" ;
    constId:number,
    transactionId:number
}

export const notificationsData: INotification[] = [
  {
    id: "1",
    header: "Contest Request Sent",
    description: "You have sent a contest request to @ArtisanJoe.",
    time: "2025-08-14T09:30:00Z",
    type: "withdraw",
    constId:34,
    transactionId:242
  },
  {
    id: "2",
    header: "Contest Victory",
    description: "Congratulations! You won the design contest hosted by @PixelQueen.",
    time: "2025-08-14T11:15:00Z",
    type: "deposit",
    constId:34,
    transactionId:228
  },
  {
    id: "3",
    header: "Contest Lost",
    description: "Unfortunately, you lost the writing contest hosted by @InkMaster.",
    time: "2025-08-14T12:45:00Z",
    type: "won",
    constId:34,
    transactionId:242
  },
  {
    id: "4",
    header: "Contest in Dispute",
    description: "The contest hosted by @SketchPro is now in dispute.",
    time: "2025-08-14T14:00:00Z",
    type: "request",
    constId:34,
    transactionId:228
  },
  {
    id: "5",
    header: "Transaction Successful",
    description: "Your payment of $50 to @GameHub has been processed successfully.",
    time: "2025-08-14T15:30:00Z",
    type: "lost",
    constId:34,
    transactionId:228
  },
  {
    id: "6",
    header: "Transaction Failed",
    description: "Your payment to @MarketPlace failed. Please try again.You have sent a contest request to @ArtisanJoe.You have sent a contest request to @ArtisanJoe.You have sent a contest request to @ArtisanJoe.You have sent a contest request to @ArtisanJoe.You have sent a contest request to @ArtisanJoe. ",
    time: "2025-08-14T16:10:00Z",
    type: "request",
    constId:34,
    transactionId:228
  }
];
