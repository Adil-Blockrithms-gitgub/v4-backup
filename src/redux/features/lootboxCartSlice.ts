import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';

interface CartItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
}

interface LootboxCartState {
  items: CartItem[];
  isEmpty: boolean;
  totalItems: number;
  totalUniqueItems: number;
  cartTotal: string;
}

const initialState: LootboxCartState = {
  items: [],
  isEmpty: true,
  totalItems: 0,
  totalUniqueItems: 0,
  cartTotal: '0',
};

export const lootboxCartSlice = createSlice({
  name: 'lootbox',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      state.isEmpty = state.items.length === 0;
      state.totalItems = state.items.reduce(
        (previousValue, currentValue) => previousValue + currentValue.quantity,
        0
      );
      state.totalUniqueItems = state.items.length;
      state.cartTotal = state.items.reduce(
        (previousValue, currentValue) =>
          String(
            BigInt(previousValue) +
              BigInt(currentValue.quantity) * BigInt(currentValue.price)
          ),
        '0'
      );
    },
    addItem: (
      state,
      action: PayloadAction<{
        item: Omit<CartItem, 'quantity'>;
        quantity?: number;
      }>
    ) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.item.id
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity ?? 1;
      } else {
        state.items.push({
          ...action.payload.item,
          quantity: action.payload.quantity ?? 1,
        });
        ++state.totalUniqueItems;
      }
      state.isEmpty = false;
      state.totalItems += action.payload.quantity ?? 1;
      state.cartTotal = String(
        BigInt(state.cartTotal) +
          BigInt(action.payload.quantity ?? 1) *
            BigInt(action.payload.item.price)
      );
    },
    updateItem: (
      state,
      action: PayloadAction<{
        itemId: CartItem['id'];
        data: Omit<CartItem, 'id' | 'quantity'>;
      }>
    ) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.itemId
      );
      if (!existingItem) {
        return;
      }

      state.cartTotal = String(
        BigInt(state.cartTotal) - BigInt(existingItem.price)
      );
      existingItem.name = action.payload.data.name;
      existingItem.price = action.payload.data.price;
      state.cartTotal = String(
        BigInt(state.cartTotal) + BigInt(existingItem.price)
      );
    },
    updateItemQuantity: (
      state,
      action: PayloadAction<{ itemId: CartItem['id']; quantity: number }>
    ) => {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.itemId
      );
      if (existingItemIndex === -1) {
        return;
      }
      const existingItem = state.items[existingItemIndex];

      state.totalItems -= existingItem.quantity;
      state.cartTotal = String(
        BigInt(state.cartTotal) -
          BigInt(existingItem.quantity) * BigInt(existingItem.price)
      );
      existingItem.quantity = action.payload.quantity ?? 1;
      state.totalItems += existingItem.quantity;
      state.cartTotal = String(
        BigInt(state.cartTotal) +
          BigInt(existingItem.quantity) * BigInt(existingItem.price)
      );
      if (existingItem.quantity === 0) {
        state.items.splice(existingItemIndex, 1);
        state.isEmpty = state.items.length === 0;
        --state.totalUniqueItems;
        state.cartTotal = String(
          BigInt(state.cartTotal) -
            BigInt(existingItem.quantity) * BigInt(existingItem.price)
        );
      }
    },
    removeItem: (state, action: PayloadAction<CartItem['id']>) => {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );
      if (existingItemIndex === -1) {
        return;
      }
      const existingItem = state.items[existingItemIndex];

      state.items.splice(existingItemIndex, 1);
      state.isEmpty = state.items.length === 0;
      state.totalItems -= existingItem.quantity;
      --state.totalUniqueItems;
      state.cartTotal = String(
        BigInt(state.cartTotal) -
          BigInt(existingItem.quantity) * BigInt(existingItem.price)
      );
    },
    emptyCart: (state) => {
      state.items = initialState.items;
      state.isEmpty = initialState.isEmpty;
      state.totalItems = initialState.totalItems;
      state.totalUniqueItems = initialState.totalUniqueItems;
      state.cartTotal = initialState.cartTotal;
    },
  },
});

export const {
  setItems,
  addItem,
  updateItem,
  updateItemQuantity,
  removeItem,
  emptyCart,
} = lootboxCartSlice.actions;

export const selectItems = (state: RootState) => state.lootboxCart.items;

export const selectIsEmpty = (state: RootState) => state.lootboxCart.isEmpty;

export const selectItem = (itemId: CartItem['id']) => (state: RootState) =>
  state.lootboxCart.items.find((item) => item.id === itemId);

export const selectIsCart = (itemId: CartItem['id']) => (state: RootState) =>
  Boolean(state.lootboxCart.items.find((item) => item.id === itemId));

export const selectTotalItems = (state: RootState) =>
  state.lootboxCart.totalItems;

export const selectTotalUniqueItems = (state: RootState) =>
  state.lootboxCart.totalUniqueItems;

export const selectCartTotal = (state: RootState) =>
  state.lootboxCart.cartTotal;

export default lootboxCartSlice.reducer;
