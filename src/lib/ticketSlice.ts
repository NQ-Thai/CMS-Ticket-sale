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

// export const fetchTicketsFromFirestore = (): AppThunk => async (dispatch) => {
//     try {
//         const snapshot = await ticketCollection.get();
//         const tickets = snapshot.docs.map((doc: { data: () => any; }, index: number) => {
//             const data = doc.data();
//             const newTicket: Ticket = {
//                 STT: `${index + 1}`,
//                 SoVe: data.SoVe || '',
//                 BookingCode: data.BookingCode || '',
//                 Checkin: data.Checkin || '',
//                 NgaySuDung: data.NgaySuDung || '',
//                 NgayXuatVe: '',
//                 TinhTrangSuDung: []
//             };
//             return newTicket;
//         });
//         dispatch(setTickets(tickets));
//     } catch (error) {
//         console.error('Error fetching tickets:', error);
//     }
// };

export const { setTickets } = ticketSlice.actions;

export default ticketSlice.reducer;
