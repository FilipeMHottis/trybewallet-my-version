type RootState = {
  user: {
    email: string;
    password: string;
    loading: boolean;
    error: string;
    currencyExchange: string;
    money: number;
  };
};

export default RootState;
