import {apiSlice} from  '../../../app/api/apiSlice';

export const gameApiSlice = apiSlice.injectEndpoints({

endpoints: (builder) => ({
    createGame: builder.mutation({
        query: (game) => ({ 
            url: '/game/play',
            method: 'POST',
            body: { },
        }),
    }),
    getNextGame: builder.mutation({
        query: (game) => ({
            url: '/game/answer',
            method: 'POST',
            body: { ...game },
        }),
    }),
}),
});

export const { useCreateGameMutation, useGetNextGameMutation } = gameApiSlice;