import { Currency, PaymentChannels } from "react-native-paystack-webview/production/lib/types";
import { API } from "./api";
import { Logger } from "./logger";

type TransactionType = "contest" | "deposit";
type TransactionState = "pending" | "successful" | "failed";
type TransactionInitiator = "user" | "system";

export interface ITransaction {
  id: number;
  amount: number;
  initiator: TransactionInitiator;
  failureReason?: string | null;
  timeStamp: string;
  state: TransactionState;
  type: TransactionType;
  paymentReference?: string | null;
}

export interface IDepositInfo {
  minAmount: number;
  publicKey: string;
  currency: Currency;
  channels: PaymentChannels;
}

export class Transaction {
  static initiateDeposit = (amount: number, callBackUrl: string) => {
    const url = `/transactions/deposit`;
    return API.POST(url, {
      amount: amount,
      callBackUrl: callBackUrl,
    })
      .then(async (response) => {
        if (response.success && response.data) {
          return response.data;
        }
      })
      .catch((err) => {
        Logger.error(err);
        return null;
      });
  };

  static getTransactions = (page: number, type?: TransactionType | null) => {
    const url = type
      ? `/transactions?page=${page}&type=${type}`
      : `/transactions?page=${page}`;

    return API.GET(url)
      .then(async (response) => {
        if (response.success && Array.isArray(response.data)) {
          return response.data as ITransaction[];
        }
        return [] as ITransaction[];
      })
      .catch((err) => {
        Logger.error(err);
        return [] as ITransaction[];
      });
  };

  static getDepositInfo = () => {
    const url = `/transactions/deposit-info`;
    return API.GET(url)
      .then(async (response) => {
        if (response.success && response.data) {
          return response.data as IDepositInfo;
        }

        return null;
      })
      .catch((err) => {
        Logger.error(err);
        return null;
      });
  };
}
