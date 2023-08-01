// ticketSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Ticket {
    STT: string;
    SoVe: string;
    BookingCode: string;
    Checkin: string;
    NgaySuDung: string;
    NgayXuatVe: string;
    TinhTrangSuDung: string[];
}

interface TicketState {
    tickets: Ticket[];
}

const initialState: TicketState = {
    tickets: [],
};

const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {
        setTickets: (state, action: PayloadAction<Ticket[]>) => {
            state.tickets = action.payload;
        },
    },
});

export const { setTickets } = ticketSlice.actions;

export default ticketSlice.reducer;
