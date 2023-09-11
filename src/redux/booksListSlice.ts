import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PayloadAction, AnyAction } from "@reduxjs/toolkit";
import { z } from "zod";

// Для валидации данных в работе с API Google Books и избежания ошибок в работе приложения когда могут
// прийти некорректные данные используется библиотека Zod

const schemaBookList = z.object({
  kind: z.string(),
  totalItems: z.number(),
  items: z.array(
    z.object({
      id: z.string(),
      volumeInfo: z.object({
        title: z.string(),
        authors: z.array(z.string()).optional(),
        categories: z.array(z.string()).optional(),
        imageLinks: z.object({
          smallThumbnail: z.string(),
          thumbnail: z.string(),
        }),
        description: z.string().optional(),
      }),
    })
  ),
});

type IBooksList = z.infer<typeof schemaBookList>;

interface IStateCatalogItems {
  booksList: IBooksList | null;
  status: string;
  error: string | null | undefined;
}

const initialState: IStateCatalogItems = {
  booksList: null,
  status: "",
  error: null,
};

interface ISearchParams {
  value: string;
  category: string;
  sortingBy: string;
  pagination?: number;
}

export const fetchBooksList = createAsyncThunk<
  IBooksList,
  ISearchParams,
  { rejectValue: string }
>(
  "booksList/fetchBooksList",
  async function (searchParams, { rejectWithValue }) {
    const url = searchParams.pagination
      ? `https://books.googleapis.com/books/v1/volumes?q=${
          searchParams.value
        }+${searchParams.category}&startIndex=${
          searchParams.pagination - 1
        }&orderBy=${searchParams.sortingBy}&projection=full&maxResults=30&key=${
          import.meta.env.VITE_API_KEY
        }`
      : `https://books.googleapis.com/books/v1/volumes?q=${
          searchParams.value
        }+${searchParams.category}&orderBy=${
          searchParams.sortingBy
        }&projection=full&maxResults=30&key=${import.meta.env.VITE_API_KEY}`;
    // Если в searchParams присутсвует ключ pagination то url будет с указанием startIndex
    // для пагинации с соответсвующим value - 1 (т.к. index)

    // В соотетсвии с документацией API не содержит поиска по категориям поэтому категория в данном случае включена в условия поиска

    const response = await fetch(url);
    if (!response.ok) {
      return rejectWithValue("Server error");
    }

    const data = await response.json();

    if (!schemaBookList.safeParse(data).success) {
      return rejectWithValue("ZodError");
    }

    // на данный момент при ошибке валидации она показывается пользователю для удобства разработки,

    const validatedData = schemaBookList.parse(data);

    return validatedData;
  }
);

const booksListSlice = createSlice({
  name: "booksList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooksList.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchBooksList.fulfilled,
        (state, action: PayloadAction<IBooksList>) => {
          state.status = "resolved";
          state.booksList = action.payload;
        }
      )
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.status = "rejected";
        state.error = action.payload;
      });
    // Добавил addMatcher чтобы в случае если будут добавляться еще extrareducers не писать отдельно rejected case
  },
});

export default booksListSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}
